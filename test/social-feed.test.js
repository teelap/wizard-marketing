'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const {
  cleanText, parseDate, zonedToIso, parseYouTubeFeed, normalize, curate, TOP_MIN_VIEWS,
} = require('../api/_social/normalize');
const handler = require('../api/social-feed');

const NOW = Date.parse('2026-09-26T18:00:00Z');

// ─── Fixtures shaped like the real upstream payloads ──────────────────────────
const tiktokRow = (over = {}) => ({
  videoId: '7689690669949996301',
  createTime: '2026-09-26T06:07:19+0200',
  coverImageUrl: 'https://static.metricool.com/tkvideocovers/202609/6387301-7689690669949996301.jpeg',
  shareUrl: 'https://www.tiktok.com/@itsjakethewizard/video/7689690669949996301?utm_campaign=tt4d_open_api&utm_source=1',
  videoDescription: 'fans who talk up your brand bring in buyers. #marketing #smallbusiness',
  viewCount: 144,
  duration: 34,
  reach: 999, // private analytics: must never reach the browser
  ...over,
});
const igRow = (over = {}) => ({
  reelId: '3994335902675108518_23223485312',
  publishedAt: { dateTime: '2026-09-26T02:19:58', timezone: 'Europe/Madrid' },
  url: 'https://www.instagram.com/reel/Dduu1cwigKm/',
  content: 'Ask your AI to review the work.\n\nfollow @itsjakethewizard for daily marketing truth\n\n#ai #claude',
  imageUrl: 'https://scontent-lhr6-1.cdninstagram.com/v/t51/825322527_n.jpg?oe=6ABD5AD3',
  views: 214,
  averageWatchTime: 8.2,
  ...over,
});
const linkedinRow = (over = {}) => ({
  postId: 'urn:li:share:7509618367356395521',
  created: { dateTime: '2026-09-26T16:22:00', timezone: 'Europe/Madrid' },
  url: 'https://www.linkedin.com/feed/update/urn:li:share:7509618367356395521',
  comment: 'Customers pay for the result of a solved problem.\n\nMore here.\n\n#Sales #Marketing',
  impressions: 80,
  type: 'TEXT',
  ...over,
});
const tweetRow = (over = {}) => ({
  tweetId: '2103623585440870557',
  text: 'b2b marketing is an excuse to do worse marketing. https://t.co/C3Z9WgnCMy',
  created: { dateTime: '2026-09-26T01:12:00', timezone: 'Europe/Madrid' },
  url: 'https://x.com/user/status/2103623585440870557',
  username: 'JakeTtheWizard',
  ...over,
});
const threadsRow = (over = {}) => ({
  id: '17934779106385689',
  text: 'curious how many of you have a pipeline full of leads that stall.',
  permalink: 'https://www.threads.com/@thewizardmarketing/post/DdvFBO7Cg1v',
  publishedDate: { dateTime: '2026-09-26T05:33:54', timezone: 'Europe/Madrid' },
  ...over,
});
const YT_XML = `<?xml version="1.0"?><feed>
 <title>Jake the Wizard</title>
 <entry>
  <yt:videoId>MVq_Vmraxyw</yt:videoId>
  <title>Your first hire &amp; why it&#39;s an assistant</title>
  <link rel="alternate" href="https://www.youtube.com/shorts/MVq_Vmraxyw"/>
  <published>2026-09-26T17:52:42+00:00</published>
  <media:group><media:community><media:statistics views="1520"/></media:community></media:group>
 </entry>
 <entry>
  <yt:videoId>abcdefghijk</yt:videoId>
  <title>A long-form talk</title>
  <link rel="alternate" href="https://www.youtube.com/watch?v=abcdefghijk"/>
  <published>2026-09-20T10:00:00+00:00</published>
 </entry>
</feed>`;

// ─── Text + dates ─────────────────────────────────────────────────────────────
test('cleanText strips links, hashtag blocks and follow sign-offs but keeps paragraphs', () => {
  assert.equal(
    cleanText('Ask your AI.\n\nfollow @itsjakethewizard for more\n\n#ai #claude https://t.co/x'),
    'Ask your AI.',
  );
  assert.equal(cleanText('Line one.\n\nLine two #tag.'), 'Line one.\n\nLine two.');
  assert.equal(cleanText('the #1 mistake'), 'the #1 mistake', 'numeric hashtags are real words');
});

test('cleanText truncates on a word boundary with an ellipsis', () => {
  const out = cleanText('word '.repeat(100), 40);
  assert.ok(out.length <= 41, out);
  assert.ok(out.endsWith('word…'), out);
});

test('Metricool wall-clock times convert to real UTC, including across DST', () => {
  assert.equal(zonedToIso('2026-09-26T16:22:00', 'Europe/Madrid'), '2026-09-26T14:22:00.000Z'); // CEST
  assert.equal(zonedToIso('2026-12-01T16:22:00', 'Europe/Madrid'), '2026-12-01T15:22:00.000Z'); // CET
  assert.equal(zonedToIso('2026-09-26T16:22:00', 'Not/AZone'), '2026-09-26T16:22:00.000Z');
  assert.equal(parseDate('2026-09-26T06:07:19+0200'), '2026-09-26T04:07:19.000Z');
  assert.equal(parseDate({ dateTime: '2026-09-26T02:19:58', timezone: 'Europe/Madrid' }), '2026-09-26T00:19:58.000Z');
  assert.equal(parseDate('garbage'), null);
});

// ─── Normalisers ──────────────────────────────────────────────────────────────
test('TikTok rows drop the utm tags and every private metric', () => {
  const [item] = normalize('tiktok', [tiktokRow()]);
  assert.equal(item.url, 'https://www.tiktok.com/@itsjakethewizard/video/7689690669949996301');
  assert.equal(item.text, 'fans who talk up your brand bring in buyers.');
  assert.equal(item.views, 144);
  assert.deepEqual(Object.keys(item).sort(), ['duration', 'id', 'kind', 'network', 'publishedAt', 'text', 'thumb', 'url', 'views']);
});

test('video length is kept when known and omitted when not', () => {
  assert.equal(normalize('tiktok', [tiktokRow({ duration: 34 })])[0].duration, 34);
  assert.equal(normalize('instagram', [igRow({ durationSeconds: 41.4 })])[0].duration, 41);
  assert.ok(!('duration' in normalize('instagram', [igRow()])[0]));
  assert.ok(!('duration' in normalize('tiktok', [tiktokRow({ duration: 0 })])[0]));
});

test('links that do not point at their own network are rejected', () => {
  assert.equal(normalize('tiktok', [tiktokRow({ shareUrl: 'javascript:alert(1)' })]).length, 0);
  assert.equal(normalize('instagram', [igRow({ url: 'https://evil.example/reel/x' })]).length, 0);
  assert.equal(normalize('linkedin', [linkedinRow({ url: 'http://www.linkedin.com/feed/x' })]).length, 0);
});

test('Instagram, LinkedIn, Threads and X rows normalise to the public shape', () => {
  const [ig] = normalize('instagram', [igRow()]);
  assert.equal(ig.text, 'Ask your AI to review the work.');
  assert.equal(ig.averageWatchTime, undefined);
  const [li] = normalize('linkedin', [linkedinRow()]);
  assert.equal(li.kind, 'text');
  assert.equal(li.impressions, undefined);
  const [th] = normalize('threads', [threadsRow()]);
  assert.equal(th.publishedAt, '2026-09-26T03:33:54.000Z');
  const [x] = normalize('x', [tweetRow()]);
  assert.equal(x.url, 'https://x.com/JakeTtheWizard/status/2103623585440870557');
  assert.equal(x.text, 'b2b marketing is an excuse to do worse marketing.');
});

test('post ids that do not match their network shape are rejected', () => {
  assert.equal(normalize('tiktok', [tiktokRow({ videoId: '123/../../evil?x=' })]).length, 0);
  assert.equal(normalize('instagram', [igRow({ reelId: 'a b' })]).length, 0);
  assert.equal(normalize('linkedin', [linkedinRow({ postId: 'javascript:alert(1)' })]).length, 0);
  assert.equal(normalize('threads', [threadsRow({ id: '<img>' })]).length, 0);
  assert.equal(normalize('x', [tweetRow({ tweetId: '12ab' })]).length, 0);
});

test('X replies and retweets are skipped', () => {
  assert.equal(normalize('x', [tweetRow({ text: '@someone agreed' }), tweetRow({ text: 'RT @a: hi' })]).length, 0);
});

test('malformed rows are dropped without throwing', () => {
  assert.deepEqual(normalize('tiktok', [null, 42, {}, { videoId: 'x' }]), []);
  assert.deepEqual(normalize('nope', [tiktokRow()]), []);
  assert.deepEqual(normalize('tiktok', undefined), []);
  assert.equal(normalize('linkedin', [linkedinRow({ comment: '#only #tags' })]).length, 0);
});

test('YouTube feed parses titles, entities, Shorts thumbnails and views', () => {
  const rows = parseYouTubeFeed(YT_XML);
  assert.equal(rows.length, 2);
  const [short, long] = normalize('youtube', rows);
  assert.equal(short.text, "Your first hire & why it's an assistant");
  assert.equal(short.thumb, 'https://i.ytimg.com/vi_webp/MVq_Vmraxyw/oar2.webp');
  assert.equal(short.views, 1520);
  assert.equal(long.thumb, 'https://i.ytimg.com/vi/abcdefghijk/hqdefault.jpg');
  assert.equal(long.views, null);
});

// ─── Curation ─────────────────────────────────────────────────────────────────
test('curate keeps the newest N per network, newest first overall', () => {
  const tiktok = normalize('tiktok', Array.from({ length: 12 }, (_, i) => tiktokRow({
    videoId: String(100000 + i),
    shareUrl: `https://www.tiktok.com/@itsjakethewizard/video/${100000 + i}`,
    createTime: `2026-09-${String(10 + i).padStart(2, '0')}T12:00:00+0000`,
  })));
  const linkedin = normalize('linkedin', [linkedinRow()]);
  const { items } = curate({ tiktok, linkedin }, { perNetwork: 8, now: NOW });
  assert.equal(items.filter((i) => i.network === 'tiktok').length, 8);
  assert.equal(items[0].network, 'linkedin'); // 2026-09-26 14:22Z is the newest
  assert.equal(items.at(-1).id, '100004'); // the 4 oldest TikToks fell off
  for (let i = 1; i < items.length; i += 1) {
    assert.ok(Date.parse(items[i - 1].publishedAt) >= Date.parse(items[i].publishedAt));
  }
});

test('the top pick is the most-viewed recent video and needs real numbers', () => {
  const quiet = normalize('tiktok', [tiktokRow({ viewCount: TOP_MIN_VIEWS - 1 })]);
  assert.equal(curate({ tiktok: quiet }, { now: NOW }).top, null);

  const old = normalize('instagram', [igRow({ views: 50000, publishedAt: { dateTime: '2026-07-01T10:00:00', timezone: 'UTC' } })]);
  const hit = normalize('tiktok', [tiktokRow({ viewCount: 9536 })]);
  const { top } = curate({ instagram: old, tiktok: hit }, { now: NOW });
  assert.equal(top.views, 9536, 'a video older than 30 days cannot be the pick');
});

test('hidden posts are removed by URL or id and cannot be the top pick', () => {
  const hit = normalize('tiktok', [tiktokRow({ viewCount: 9536 })]);
  const note = normalize('linkedin', [linkedinRow()]);
  const { items, top } = curate({ tiktok: hit, linkedin: note }, {
    now: NOW,
    hidden: [`${hit[0].url}/`, 'urn:li:share:7509618367356395521'],
  });
  assert.deepEqual(items, []);
  assert.equal(top, null);
});

test('the shipped hidden list is an array of strings', () => {
  const hidden = require('../api/_social/hidden');
  assert.ok(Array.isArray(hidden));
  assert.ok(hidden.every((h) => typeof h === 'string'));
});

// ─── Handler ──────────────────────────────────────────────────────────────────
function fakeFetch(routes, calls = []) {
  return async (url, options = {}) => {
    calls.push({ url: String(url), headers: options.headers || {} });
    const hit = routes.find(([match]) => String(url).includes(match));
    if (!hit) return { ok: false, status: 404, json: async () => ({}), text: async () => '' };
    const body = hit[1];
    if (body instanceof Error) throw body;
    return { ok: true, status: 200, json: async () => body, text: async () => body };
  };
}

test('buildFeed without a Metricool token serves YouTube only and never calls Metricool', async () => {
  const calls = [];
  const feed = await handler.buildFeed({ env: {}, fetchImpl: fakeFetch([['youtube.com/feeds', YT_XML]], calls), now: NOW });
  assert.equal(calls.length, 1);
  assert.deepEqual([...new Set(feed.items.map((i) => i.network))], ['youtube']);
});

test('buildFeed sends the token to Metricool only and survives a failing network', async () => {
  const calls = [];
  const feed = await handler.buildFeed({
    env: { METRICOOL_API_TOKEN: 'test-token-only' },
    fetchImpl: fakeFetch([
      ['youtube.com/feeds', YT_XML],
      ['/posts/tiktok', { data: [tiktokRow()] }],
      ['/reels/instagram', { data: [igRow()] }],
      ['/posts/linkedin', new Error('socket hang up')],
      ['/posts/threads', { data: [threadsRow()] }],
      ['/posts/twitter', { data: [tweetRow()] }],
    ], calls),
    now: NOW,
  });
  const networks = new Set(feed.items.map((i) => i.network));
  // LinkedIn failed; Threads is switched off, so it is never requested.
  assert.deepEqual([...networks].sort(), ['instagram', 'tiktok', 'x', 'youtube']);
  assert.ok(!calls.some((c) => c.url.includes('/posts/threads')));
  for (const call of calls) {
    const toMetricool = call.url.startsWith('https://app.metricool.com/');
    assert.equal(call.headers['X-Mc-Auth'], toMetricool ? 'test-token-only' : undefined);
  }
  assert.ok(!JSON.stringify(feed).includes('test-token-only'));
});

function mockRes() {
  return {
    headers: {},
    setHeader(k, v) { this.headers[k] = v; },
    end(body) { this.body = body; },
  };
}

test('handler rejects non-GET methods', async () => {
  const res = mockRes();
  await handler({ method: 'POST' }, res);
  assert.equal(res.statusCode, 405);
  assert.equal(res.headers.Allow, 'GET, HEAD');
});

test('getFeed shares one upstream round between simultaneous requests', async () => {
  handler._resetMemo();
  const calls = [];
  const fetchImpl = fakeFetch([['youtube.com/feeds', YT_XML]], calls);
  const results = await Promise.all([1, 2, 3].map(() => handler.getFeed({ env: {}, fetchImpl, now: NOW })));
  assert.equal(calls.length, 1);
  assert.ok(results.every((f) => f.items.length === 2));
  // A request inside the memo window makes no upstream call at all.
  await handler.getFeed({ env: {}, fetchImpl, now: NOW + 60 * 1000 });
  assert.equal(calls.length, 1);
  handler._resetMemo();
});

test('getFeed serves the last good copy through an outage and backs off retries', async () => {
  handler._resetMemo();
  const good = fakeFetch([['youtube.com/feeds', YT_XML]]);
  await handler.getFeed({ env: {}, fetchImpl: good, now: NOW });

  const calls = [];
  const down = fakeFetch([], calls);
  const later = NOW + 11 * 60 * 1000; // memo has expired
  const first = await handler.getFeed({ env: {}, fetchImpl: down, now: later });
  assert.equal(first.items.length, 2, 'stale beats empty');
  assert.equal(calls.length, 1);
  await handler.getFeed({ env: {}, fetchImpl: down, now: later + 30 * 1000 });
  assert.equal(calls.length, 1, 'no retry within a minute of a failure');
  await handler.getFeed({ env: {}, fetchImpl: down, now: later + 61 * 1000 });
  assert.equal(calls.length, 2, 'retries once the minute has passed');
  handler._resetMemo();
});

test('handler caches a good feed on the CDN and falls back to the last good copy', async () => {
  const realFetch = global.fetch;
  const env = process.env.METRICOOL_API_TOKEN;
  delete process.env.METRICOOL_API_TOKEN;
  handler._resetMemo();
  try {
    global.fetch = fakeFetch([['youtube.com/feeds', YT_XML]]);
    const good = mockRes();
    await handler({ method: 'GET' }, good);
    assert.equal(good.statusCode, 200);
    assert.match(good.headers['Cache-Control'], /s-maxage=1800/);
    assert.equal(JSON.parse(good.body).items.length, 2);

    // Everything upstream now fails, and the memo is young: same payload returned.
    global.fetch = fakeFetch([]);
    const again = mockRes();
    await handler({ method: 'GET' }, again);
    assert.equal(JSON.parse(again.body).items.length, 2);
  } finally {
    global.fetch = realFetch;
    if (env !== undefined) process.env.METRICOOL_API_TOKEN = env;
    handler._resetMemo();
  }
});

test('handler returns an empty, briefly cached feed when nothing is available', async () => {
  const realFetch = global.fetch;
  handler._resetMemo();
  try {
    global.fetch = fakeFetch([]);
    const res = mockRes();
    await handler({ method: 'GET' }, res);
    assert.equal(res.statusCode, 200);
    assert.deepEqual(JSON.parse(res.body).items, []);
    assert.match(res.headers['Cache-Control'], /s-maxage=60\b/);
  } finally {
    global.fetch = realFetch;
  }
});
