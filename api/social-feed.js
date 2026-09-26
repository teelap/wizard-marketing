/**
 * /api/social-feed — Jake's latest posts from every network, as one small JSON.
 * ----------------------------------------------------------------------------
 * The homepage "Latest posts" section fetches this after load. One request here
 * fans out to Metricool (which already has TikTok, Instagram, LinkedIn and X
 * connected) and YouTube's free RSS feed, cleans every post into the same
 * public shape (see ./_social/normalize.js), and returns the newest few per
 * network plus the most-watched video of the month.
 *
 * Runs on request, never on a schedule: the Vercel CDN caches the response for
 * 30 minutes (and serves the last copy for a day if Metricool is slow or down),
 * so Metricool sees at most a couple of calls an hour however busy the site is.
 *
 * Required env (Vercel → Project → Settings → Environment Variables):
 *   METRICOOL_API_TOKEN   Metricool REST API token (SECRET — never commit).
 *                         app.metricool.com → Account settings → API.
 *                         Until it is set, only YouTube (no key needed) shows.
 * Optional env:
 *   METRICOOL_USER_ID     defaults to Jake's account (4920654)
 *   METRICOOL_BLOG_ID     defaults to the Jake the Wizard brand (6387301)
 *   YOUTUBE_CHANNEL_ID    defaults to @itsjakethewizard
 *
 * Security: the token stays server-side. The response carries public post data
 * only (no reach, impressions, or watch time), and upstream error details are
 * logged, never returned.
 */

'use strict';

const { normalize, curate, parseYouTubeFeed } = require('./_social/normalize');
const HIDDEN = require('./_social/hidden');

const METRICOOL_API = 'https://app.metricool.com/api';
const WINDOW_DAYS = 30;
const PER_NETWORK = 8;
const UPSTREAM_TIMEOUT_MS = 8000;
const MEMO_TTL_MS = 10 * 60 * 1000;

const METRICOOL_SOURCES = [
  { network: 'tiktok', path: '/v2/analytics/posts/tiktok' },
  { network: 'instagram', path: '/v2/analytics/reels/instagram' },
  { network: 'linkedin', path: '/v2/analytics/posts/linkedin' },
  { network: 'x', path: '/v2/analytics/posts/twitter' },
  // Threads is off by Jake's call (2026-09-26): it posts from @thewizardmarketing.
  // The normaliser and the page still support it; to bring the tab back, add:
  // { network: 'threads', path: '/v2/analytics/posts/threads' },
];

const RETRY_AFTER_FAILURE_MS = 60 * 1000;

// Warm Fluid Compute instances reuse these. Whatever reaches the function
// (including cache-busting ?query variants the CDN stores separately), each
// instance calls Metricool at most once per MEMO_TTL_MS, never twice at once,
// and at most once a minute while every source is failing.
let memo = { at: 0, feed: null, failedAt: 0 };
let inflight = null;

function isoNoZone(ms) {
  return new Date(ms).toISOString().slice(0, 19); // Metricool wants 2026-09-01T00:00:00
}

async function getJson(fetchImpl, url, headers) {
  const res = await fetchImpl(url, { headers, signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function fetchMetricool(source, { env, fetchImpl, now }) {
  const q = new URLSearchParams({
    userId: env.METRICOOL_USER_ID || '4920654',
    blogId: env.METRICOOL_BLOG_ID || '6387301',
    from: isoNoZone(now - WINDOW_DAYS * 24 * 60 * 60 * 1000),
    to: isoNoZone(now),
    timezone: 'UTC',
  });
  const body = await getJson(fetchImpl, `${METRICOOL_API}${source.path}?${q}`, {
    'X-Mc-Auth': env.METRICOOL_API_TOKEN,
  });
  return normalize(source.network, Array.isArray(body) ? body : body && body.data);
}

async function fetchYouTube({ env, fetchImpl }) {
  const channel = env.YOUTUBE_CHANNEL_ID || 'UC26G_o-cTFCcPo-CyGf_3YA';
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channel)}`;
  const res = await fetchImpl(url, { signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return normalize('youtube', parseYouTubeFeed(await res.text()));
}

/** Fetch every source in parallel; a failing network is skipped, not fatal. */
async function buildFeed({ env = {}, fetchImpl, now = Date.now(), hidden = HIDDEN }) {
  const jobs = [{ network: 'youtube', run: () => fetchYouTube({ env, fetchImpl }) }];
  if (env.METRICOOL_API_TOKEN) {
    for (const source of METRICOOL_SOURCES) {
      jobs.push({ network: source.network, run: () => fetchMetricool(source, { env, fetchImpl, now }) });
    }
  }
  const settled = await Promise.allSettled(jobs.map((j) => j.run()));
  const byNetwork = {};
  settled.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      byNetwork[jobs[i].network] = result.value;
    } else {
      console.error(`[social-feed] ${jobs[i].network} failed: ${result.reason && result.reason.message}`);
    }
  });
  const { items, top } = curate(byNetwork, { perNetwork: PER_NETWORK, now, hidden });
  return { ok: true, updatedAt: new Date(now).toISOString(), items, top };
}

function emptyFeed(now) {
  return { ok: true, updatedAt: new Date(now).toISOString(), items: [], top: null };
}

/**
 * The feed this instance should serve right now: the memo while it is fresh,
 * the build already in flight if there is one, otherwise a new build. A stale
 * feed beats an empty one, so the last good copy survives a total outage.
 */
function getFeed({ env, fetchImpl, now }) {
  if (memo.feed && now - memo.at < MEMO_TTL_MS) return Promise.resolve(memo.feed);
  if (now - memo.failedAt < RETRY_AFTER_FAILURE_MS) return Promise.resolve(memo.feed || emptyFeed(now));
  if (!inflight) {
    inflight = buildFeed({ env, fetchImpl, now })
      .catch((err) => {
        console.error(`[social-feed] build failed: ${err.message}`);
        return emptyFeed(now);
      })
      .then((feed) => {
        if (feed.items.length) {
          memo = { at: now, feed, failedAt: 0 };
          return feed;
        }
        memo = { ...memo, failedAt: now };
        return memo.feed || feed;
      })
      .finally(() => { inflight = null; });
  }
  return inflight;
}

async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET, HEAD');
    return res.end(JSON.stringify({ ok: false, error: 'method_not_allowed' }));
  }

  const feed = await getFeed({ env: process.env, fetchImpl: fetch, now: Date.now() });

  res.statusCode = 200;
  res.setHeader('Cache-Control', feed.items.length
    ? 'public, max-age=300, s-maxage=1800, stale-while-revalidate=86400'
    : 'public, max-age=60, s-maxage=60');
  return res.end(req.method === 'HEAD' ? undefined : JSON.stringify(feed));
}

module.exports = handler;
module.exports.buildFeed = buildFeed;
module.exports.getFeed = getFeed;
module.exports._resetMemo = () => { memo = { at: 0, feed: null, failedAt: 0 }; inflight = null; };
