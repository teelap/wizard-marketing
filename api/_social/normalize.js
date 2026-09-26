/**
 * Pure helpers behind /api/social-feed.
 * ----------------------------------------------------------------------------
 * Each network hands back a different payload (Metricool for TikTok, Instagram,
 * LinkedIn, Threads and X; YouTube's public RSS feed for YouTube). These
 * functions turn every one of them into the same small public shape and pick
 * what the homepage shows. No I/O lives here, so the rules are unit-tested
 * without touching the network (see test/social-feed.test.js).
 *
 * Public item shape (the ONLY fields that ever reach the browser):
 *   { id, network, kind: 'video'|'text', url, text, thumb?, views?, publishedAt }
 * Private analytics (reach, watch time, impressions) are deliberately dropped.
 */

'use strict';

const TEXT_MAX = 280;
const DAY_MS = 24 * 60 * 60 * 1000;
// A video has to clear this many views before it can be the "most watched"
// pick. Below it, a view count reads as a weakness, so we show nothing.
const TOP_MIN_VIEWS = 1000;
const TOP_WINDOW_DAYS = 30;

// Links we render must point at the network they claim to come from.
const ALLOWED_HOSTS = {
  tiktok: ['www.tiktok.com', 'tiktok.com'],
  instagram: ['www.instagram.com', 'instagram.com'],
  youtube: ['www.youtube.com', 'youtube.com'],
  linkedin: ['www.linkedin.com', 'linkedin.com'],
  threads: ['www.threads.com', 'threads.com', 'www.threads.net', 'threads.net'],
  x: ['x.com', 'twitter.com'],
};

// Post ids feed player URLs and the hidden list, so each must match its
// network's known shape; anything else drops the post.
const ID_FORMATS = {
  tiktok: /^\d{5,25}$/,
  instagram: /^[\w-]{5,60}$/,
  youtube: /^[\w-]{6,20}$/,
  linkedin: /^urn:li:[a-zA-Z]+:\d{5,25}$/,
  threads: /^\d{5,25}$/,
  x: /^\d{5,25}$/,
};

function idOf(value, format) {
  const id = String(value == null ? '' : value);
  return format.test(id) ? id : '';
}

function safeUrl(value, hosts) {
  try {
    const u = new URL(String(value));
    if (u.protocol !== 'https:') return null;
    if (hosts && !hosts.includes(u.hostname)) return null;
    return u;
  } catch {
    return null;
  }
}

/** Offset (ms) of an IANA time zone from UTC at a given instant. */
function tzOffsetMs(epochMs, timeZone) {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
  const p = Object.fromEntries(dtf.formatToParts(new Date(epochMs)).map((x) => [x.type, x.value]));
  return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - epochMs;
}

/**
 * Metricool reports most timestamps as a wall-clock time plus a zone name
 * ({ dateTime: '2026-09-26T16:22:00', timezone: 'Europe/Madrid' }). Convert it
 * to a real UTC instant. The second pass settles times near a DST switch.
 */
function zonedToIso(dateTime, timeZone) {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/.exec(String(dateTime || ''));
  if (!m) return null;
  const wall = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +(m[6] || 0));
  try {
    const first = tzOffsetMs(wall, timeZone || 'UTC');
    const second = tzOffsetMs(wall - first, timeZone || 'UTC');
    return new Date(wall - second).toISOString();
  } catch {
    return new Date(wall).toISOString(); // unknown zone name: treat as UTC
  }
}

/** Accepts ISO strings, "+0200"-style offsets, or Metricool's {dateTime, timezone}. */
function parseDate(value) {
  if (!value) return null;
  if (typeof value === 'object') return zonedToIso(value.dateTime, value.timezone);
  const iso = String(value).replace(/([+-]\d{2})(\d{2})$/, '$1:$2');
  const t = Date.parse(iso);
  return Number.isFinite(t) ? new Date(t).toISOString() : null;
}

/**
 * Captions carry platform furniture that means nothing on a website: links,
 * hashtag blocks, "follow @handle" sign-offs. Strip it, keep line breaks, and
 * cut at a word boundary.
 */
function cleanText(raw, max = TEXT_MAX) {
  let s = String(raw || '').replace(/\r/g, '');
  s = s.replace(/https?:\/\/\S+/g, '');
  s = s.split('\n').filter((line) => !/^\s*follow @\w/i.test(line)).join('\n');
  s = s.replace(/(^|\s)#\p{L}[\p{L}\p{N}_]*/gu, '$1');
  s = s.replace(/[ \t]+/g, ' ').replace(/ +([.,!?;:])/g, '$1')
    .replace(/ *\n */g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > max * 0.6 ? lastSpace : max).replace(/[\s,;:.-]+$/, '')}…`;
}

function num(value) {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

/** Video length in whole seconds, or null when unknown or implausible. */
function seconds(value) {
  const n = num(value);
  return n && n < 6 * 60 * 60 ? Math.round(n) : null;
}

function decodeXml(s) {
  return String(s || '')
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

/** Minimal parser for YouTube's channel Atom feed (a stable, documented format). */
function parseYouTubeFeed(xml) {
  const tag = (block, name) => {
    const m = new RegExp(`<${name}>([\\s\\S]*?)</${name}>`).exec(block);
    return m ? decodeXml(m[1].trim()) : '';
  };
  const attr = (block, name, key) => {
    const m = new RegExp(`<${name}\\b[^>]*\\b${key}="([^"]*)"`).exec(block);
    return m ? decodeXml(m[1]) : '';
  };
  return String(xml || '').split('<entry>').slice(1).map((block) => ({
    videoId: tag(block, 'yt:videoId'),
    title: tag(block, 'title'),
    link: attr(block, 'link', 'href'),
    published: tag(block, 'published'),
    views: attr(block, 'media:statistics', 'views'),
  }));
}

function finish(item) {
  if (!item.id || !item.url || !item.publishedAt) return null;
  if (item.kind === 'text' && !item.text) return null;
  if (item.kind === 'video' && !item.thumb) return null;
  const { duration, ...rest } = item;
  return duration == null ? rest : item;
}

const NORMALIZERS = {
  tiktok(p) {
    const u = safeUrl(p.shareUrl, ALLOWED_HOSTS.tiktok);
    if (u) u.search = ''; // Metricool appends its own utm tags
    const thumb = safeUrl(p.coverImageUrl);
    return finish({
      id: idOf(p.videoId, ID_FORMATS.tiktok), network: 'tiktok', kind: 'video',
      url: u ? u.href : null, text: cleanText(p.videoDescription || p.title),
      thumb: thumb ? thumb.href : null, views: num(p.viewCount), duration: seconds(p.duration),
      publishedAt: parseDate(p.createTime),
    });
  },
  instagram(p) {
    const u = safeUrl(p.url, ALLOWED_HOSTS.instagram);
    const thumb = safeUrl(p.imageUrl);
    return finish({
      id: idOf(p.reelId, ID_FORMATS.instagram), network: 'instagram', kind: 'video',
      url: u ? u.href : null, text: cleanText(p.content),
      thumb: thumb ? thumb.href : null, views: num(p.views), duration: seconds(p.durationSeconds),
      publishedAt: parseDate(p.publishedAt),
    });
  },
  youtube(p) {
    const id = idOf(p.videoId, ID_FORMATS.youtube);
    const u = safeUrl(p.link, ALLOWED_HOSTS.youtube);
    const isShort = !!u && u.pathname.startsWith('/shorts/');
    return finish({
      id, network: 'youtube', kind: 'video', url: u ? u.href : null, text: cleanText(p.title),
      // oar2 is the vertical (original aspect) frame for Shorts; hqdefault suits 16:9 uploads.
      thumb: id ? (isShort ? `https://i.ytimg.com/vi_webp/${id}/oar2.webp` : `https://i.ytimg.com/vi/${id}/hqdefault.jpg`) : null,
      views: num(p.views) || null, publishedAt: parseDate(p.published),
    });
  },
  linkedin(p) {
    const u = safeUrl(p.url, ALLOWED_HOSTS.linkedin);
    return finish({
      id: idOf(p.postId, ID_FORMATS.linkedin), network: 'linkedin', kind: 'text',
      url: u ? u.href : null, text: cleanText(p.comment), publishedAt: parseDate(p.created),
    });
  },
  threads(p) {
    const u = safeUrl(p.permalink, ALLOWED_HOSTS.threads);
    return finish({
      id: idOf(p.id, ID_FORMATS.threads), network: 'threads', kind: 'text',
      url: u ? u.href : null, text: cleanText(p.text), publishedAt: parseDate(p.publishedDate),
    });
  },
  x(p) {
    const raw = String(p.text || '');
    // Replies and retweets read as fragments out of context; only original posts.
    if (/^(RT @|@)/.test(raw.trim())) return null;
    const handle = /^\w{1,15}$/.test(p.username || '') ? p.username : null;
    const id = idOf(p.tweetId, ID_FORMATS.x);
    return finish({
      id, network: 'x', kind: 'text',
      url: handle && id ? `https://x.com/${handle}/status/${id}` : null,
      text: cleanText(raw), publishedAt: parseDate(p.created || p.createdAt),
    });
  },
};

/** Normalise one network's raw rows; malformed rows are dropped, never thrown. */
function normalize(network, rows) {
  const fn = NORMALIZERS[network];
  if (!fn || !Array.isArray(rows)) return [];
  const out = [];
  for (const row of rows) {
    try {
      const item = row && typeof row === 'object' ? fn(row) : null;
      if (item) out.push(item);
    } catch {
      /* one bad row never sinks the network */
    }
  }
  return out;
}

const newestFirst = (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt);

/**
 * Keep the newest `perNetwork` posts from each network, and name the single
 * most-watched video of the last 30 days (if one clears TOP_MIN_VIEWS).
 * `hidden` holds post URLs or ids that must never show (see ./hidden.js).
 */
function curate(byNetwork, { perNetwork = 8, now = Date.now(), hidden = [] } = {}) {
  const blocked = new Set(hidden.map((h) => String(h).trim().replace(/\/$/, '')));
  const visible = (i) => !blocked.has(i.id) && !blocked.has(i.url.replace(/\/$/, ''));
  const items = [];
  const videos = [];
  for (const list of Object.values(byNetwork)) {
    const sorted = list.filter(visible).sort(newestFirst);
    items.push(...sorted.slice(0, perNetwork));
    videos.push(...sorted.filter((i) => i.kind === 'video'));
  }
  const since = now - TOP_WINDOW_DAYS * DAY_MS;
  const top = videos
    .filter((v) => (v.views || 0) >= TOP_MIN_VIEWS && Date.parse(v.publishedAt) >= since)
    .sort((a, b) => b.views - a.views)[0] || null;
  return { items: items.sort(newestFirst), top };
}

module.exports = {
  cleanText, parseDate, zonedToIso, parseYouTubeFeed, normalize, curate,
  TOP_MIN_VIEWS, TEXT_MAX,
};
