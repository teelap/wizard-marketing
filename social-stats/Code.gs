/**
 * Jake the Wizard — Social Stats collector (Google Apps Script)
 * ----------------------------------------------------------------------------
 * Pulls daily social + search + booking stats into THIS spreadsheet so Looker
 * Studio can chart "social growth" over time. It runs inside your Google account
 * on a daily time-driven trigger — your computer does NOT need to be on, and no
 * service account is required (a bound script already owns its sheet).
 *
 * WHAT IT COLLECTS (each source is optional + best-effort — a missing token or a
 * failing API never aborts the run; that cell is just left blank and logged):
 *   • YouTube   — subscribers, total views, video count        (YT Data API key)
 *   • Instagram — followers                                     (Meta Page token)
 *   • Facebook  — page followers                                (Meta Page token)
 *   • Bing      — search clicks + impressions (latest day)      (Bing WMT API key)
 *   • Clarity   — sessions (last day)                           (Clarity API token)
 *   • Calendly  — upcoming bookings (next 90 days)              (Calendly PAT)
 *   • TikTok / LinkedIn / X — read from the "Manual" tab (no free API for a
 *     personal-account follower count; you update those numbers when you like).
 *
 * SETUP: see social-stats/README.md in the repo. Short version:
 *   1) Extensions ▸ Apps Script, paste this file.
 *   2) Project Settings ▸ Script properties — add the keys you have (see PROPS).
 *   3) Run setup() once (authorize, create tabs + headers, install daily trigger).
 *   4) Connect this Sheet to Looker Studio and build the Social page.
 *
 * No secrets live in the repo — every token is read from Script Properties.
 */

'use strict';

/** Column order for the Daily tab. Stable — appends rely on it. */
var HEADERS = [
  'Date',
  'YouTube Subscribers', 'YouTube Views', 'YouTube Videos',
  'Instagram Followers', 'Facebook Followers',
  'TikTok Followers', 'LinkedIn Followers', 'X Followers',
  'Bing Clicks', 'Bing Impressions',
  'Clarity Sessions',
  'Calendly Upcoming'
];

var DAILY_TAB = 'Daily';
var MANUAL_TAB = 'Manual';
var LOG_TAB = 'Log';

/** Script Property keys this script reads. Set the ones you have. */
var PROPS = {
  YT_API_KEY: 'YouTube Data API v3 key',
  YT_HANDLE: 'YouTube handle (default: itsjakethewizard)',
  META_PAGE_TOKEN: 'Meta long-lived Page access token',
  META_PAGE_ID: 'Facebook Page ID',
  IG_USER_ID: 'Instagram Business account ID',
  BING_API_KEY: 'Bing Webmaster Tools API key',
  BING_SITE: 'Verified site URL (default: https://www.jakethewizard.com/)',
  CLARITY_TOKEN: 'Microsoft Clarity Data Export token',
  CALENDLY_TOKEN: 'Calendly personal access token'
};

/* ───────────────────────────── Entry points ───────────────────────────── */

/**
 * One-time setup: authorize the script, create the tabs + headers, and install
 * the daily trigger. Run this once from the Apps Script editor.
 */
function setup() {
  ensureTab_(DAILY_TAB, HEADERS);
  ensureTab_(MANUAL_TAB, ['Date', 'TikTok Followers', 'LinkedIn Followers', 'X Followers']);
  ensureTab_(LOG_TAB, ['Timestamp', 'Source', 'Message']);
  createDailyTrigger_();
  collectDaily(); // write a first row immediately so the dashboard isn't empty
  SpreadsheetApp.getActiveSpreadsheet().toast('Setup complete — first row written and daily trigger installed.', 'Social Stats', 8);
}

/**
 * Collect one snapshot and append it to the Daily tab. This is what the daily
 * trigger calls. Safe to run manually any time.
 */
function collectDaily() {
  var sheet = ensureTab_(DAILY_TAB, HEADERS);
  var yt = getYouTube_();
  var meta = getMeta_();
  var bing = getBing_();
  var manual = getLatestManual_();

  var row = [
    todayStr_(),
    yt.subscribers, yt.views, yt.videos,
    meta.instagram, meta.facebook,
    manual.tiktok, manual.linkedin, manual.x,
    bing.clicks, bing.impressions,
    getClaritySessions_(),
    getCalendlyUpcoming_()
  ];
  sheet.appendRow(row);
}

/* ─────────────────────────────── Collectors ───────────────────────────── */

/** YouTube channel statistics by handle. */
function getYouTube_() {
  var out = { subscribers: '', views: '', videos: '' };
  var key = prop_('YT_API_KEY');
  if (!key) return out;
  try {
    var handle = (prop_('YT_HANDLE') || 'itsjakethewizard').replace(/^@/, '');
    var url = 'https://www.googleapis.com/youtube/v3/channels?part=statistics&forHandle=' +
      encodeURIComponent(handle) + '&key=' + encodeURIComponent(key);
    var data = fetchJson_(url, {}, 'youtube');
    var s = data && data.items && data.items[0] && data.items[0].statistics;
    if (s) {
      out.subscribers = num_(s.subscriberCount);
      out.views = num_(s.viewCount);
      out.videos = num_(s.videoCount);
    } else {
      logEvent_('youtube', 'No channel found for handle "' + handle + '"');
    }
  } catch (e) { logEvent_('youtube', String(e)); }
  return out;
}

/** Facebook Page + Instagram follower counts via the Meta Graph API. */
function getMeta_() {
  var out = { facebook: '', instagram: '' };
  var token = prop_('META_PAGE_TOKEN');
  if (!token) return out;
  var v = 'v21.0';
  var pageId = prop_('META_PAGE_ID');
  if (pageId) {
    try {
      var fb = fetchJson_('https://graph.facebook.com/' + v + '/' + pageId +
        '?fields=followers_count,fan_count&access_token=' + encodeURIComponent(token), {}, 'facebook');
      out.facebook = num_(fb && (fb.followers_count != null ? fb.followers_count : fb.fan_count));
    } catch (e) { logEvent_('facebook', String(e)); }
  }
  var igId = prop_('IG_USER_ID');
  if (igId) {
    try {
      var ig = fetchJson_('https://graph.facebook.com/' + v + '/' + igId +
        '?fields=followers_count&access_token=' + encodeURIComponent(token), {}, 'instagram');
      out.instagram = num_(ig && ig.followers_count);
    } catch (e) { logEvent_('instagram', String(e)); }
  }
  return out;
}

/** Bing Webmaster Tools — most recent day's clicks + impressions. */
function getBing_() {
  var out = { clicks: '', impressions: '' };
  var key = prop_('BING_API_KEY');
  if (!key) return out;
  try {
    var site = prop_('BING_SITE') || 'https://www.jakethewizard.com/';
    var url = 'https://ssl.bing.com/webmaster/api.svc/json/GetRankAndTrafficStats?siteUrl=' +
      encodeURIComponent(site) + '&apikey=' + encodeURIComponent(key);
    var data = fetchJson_(url, {}, 'bing');
    var rows = data && data.d;
    if (rows && rows.length) {
      var last = rows[rows.length - 1];
      out.clicks = num_(last.Clicks);
      out.impressions = num_(last.Impressions);
    }
  } catch (e) { logEvent_('bing', String(e)); }
  return out;
}

/** Microsoft Clarity — total sessions over the last day. */
function getClaritySessions_() {
  var token = prop_('CLARITY_TOKEN');
  if (!token) return '';
  try {
    var url = 'https://www.clarity.ms/export-data/api/v1/project-live-insights?numOfDays=1';
    var data = fetchJson_(url, { headers: { Authorization: 'Bearer ' + token } }, 'clarity');
    if (!Array.isArray(data)) return '';
    for (var i = 0; i < data.length; i++) {
      if (data[i] && /traffic/i.test(data[i].metricName || '')) {
        var info = data[i].information && data[i].information[0];
        if (info) return num_(info.totalSessionCount != null ? info.totalSessionCount : info.sessionsCount);
      }
    }
  } catch (e) { logEvent_('clarity', String(e)); }
  return '';
}

/** Calendly — count of upcoming scheduled events in the next 90 days. */
function getCalendlyUpcoming_() {
  var token = prop_('CALENDLY_TOKEN');
  if (!token) return '';
  try {
    var headers = { Authorization: 'Bearer ' + token };
    var me = fetchJson_('https://api.calendly.com/users/me', { headers: headers }, 'calendly');
    var uri = me && me.resource && me.resource.uri;
    if (!uri) return '';
    var now = new Date();
    var future = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
    var url = 'https://api.calendly.com/scheduled_events?user=' + encodeURIComponent(uri) +
      '&status=active&min_start_time=' + isoZ_(now) + '&max_start_time=' + isoZ_(future) + '&count=100';
    var ev = fetchJson_(url, { headers: headers }, 'calendly');
    return (ev && ev.collection) ? ev.collection.length : '';
  } catch (e) { logEvent_('calendly', String(e)); }
  return '';
}

/** Most recent manually-entered TikTok / LinkedIn / X follower counts. */
function getLatestManual_() {
  var out = { tiktok: '', linkedin: '', x: '' };
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(MANUAL_TAB);
    if (!sheet) return out;
    var values = sheet.getDataRange().getValues();
    for (var r = values.length - 1; r >= 1; r--) {
      var row = values[r];
      if (row[0] === '' && row[1] === '' && row[2] === '' && row[3] === '') continue;
      out.tiktok = row[1] !== '' ? row[1] : '';
      out.linkedin = row[2] !== '' ? row[2] : '';
      out.x = row[3] !== '' ? row[3] : '';
      break;
    }
  } catch (e) { logEvent_('manual', String(e)); }
  return out;
}

/* ──────────────────────────────── Helpers ─────────────────────────────── */

function prop_(key) {
  var v = PropertiesService.getScriptProperties().getProperty(key);
  return v ? v.trim() : '';
}

function fetchJson_(url, options, source) {
  var opts = options || {};
  opts.muteHttpExceptions = true;
  opts.followRedirects = true;
  var res = UrlFetchApp.fetch(url, opts);
  var code = res.getResponseCode();
  var body = res.getContentText();
  if (code < 200 || code >= 300) {
    logEvent_(source || 'http', 'HTTP ' + code + ': ' + body.slice(0, 300));
    throw new Error('HTTP ' + code);
  }
  return JSON.parse(body);
}

function num_(v) {
  if (v === null || v === undefined || v === '') return '';
  var n = Number(v);
  return isNaN(n) ? '' : n;
}

function todayStr_() {
  var tz = Session.getScriptTimeZone() || 'America/Chicago';
  return Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd');
}

function isoZ_(d) {
  return Utilities.formatDate(d, 'UTC', "yyyy-MM-dd'T'HH:mm:ss'Z'");
}

/** Create a tab with the given header row if it does not already exist. */
function ensureTab_(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function logEvent_(source, message) {
  try {
    var sheet = ensureTab_(LOG_TAB, ['Timestamp', 'Source', 'Message']);
    sheet.appendRow([new Date(), source, String(message).slice(0, 500)]);
  } catch (e) { /* never let logging break a run */ }
}

/** Install a once-per-day trigger for collectDaily (idempotent). */
function createDailyTrigger_() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'collectDaily') return; // already installed
  }
  ScriptApp.newTrigger('collectDaily').timeBased().everyDays(1).atHour(6).create();
}
