#!/usr/bin/env node
/**
 * deal-videos.js — deal the week's back-catalog reels from catalog.json
 * -------------------------------------------------------------------------
 * The weekly-evergreen batch runs this to pick the VIDEO SPINE: 2 reels/day
 * (default 14/week), spread across subjects, favoring proven winners, never
 * re-posting a clip inside its cooldown, never the same content (kbId) twice
 * in one deal. It READS the catalog and PRINTS a dealt set — it does not
 * schedule and does not mutate (dealing != committing). After Metricool
 * confirms each draft, the routine calls mark-posted.js to record the use.
 *
 * Selection:
 *   - status !== 'retired' and rating !== 'bad'
 *   - not used within --cooldown weeks (default 12; ~1,000 clips = deep well)
 *   - ranked by: real rating (good) > AI teaching prior > never-used > jitter
 *   - spread across topics (no subject stacks), no duplicate kbId in one deal
 *
 * Platform rotation (default; the Sunday review tunes it): tiktok · instagram
 * (+facebook cross-post) · youtube-short, round-robin, 2 per day Mon-Sun.
 *
 * Usage:
 *   node content/video/deal-videos.js --week 2026-W30
 *   node content/video/deal-videos.js --week 2026-W30 --count 14 --json
 */
'use strict';

const fs = require('fs');
const path = require('path');
const CATALOG = path.join(__dirname, 'catalog.json');

function arg(name, def) {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : def;
}
const WEEK = arg('--week', 'default-week');
const COUNT = parseInt(arg('--count', '14'), 10);
let COOLDOWN_WEEKS = parseInt(arg('--cooldown', '12'), 10);
// Short guard so a clip still sitting unpublished in the planner is not dealt
// again next Monday. Much shorter than the post-publish cooldown.
const DEALT_WINDOW_WEEKS = parseInt(arg('--dealt-window', '3'), 10);
const DEALT_WINDOW_MS = DEALT_WINDOW_WEEKS * 7 * 24 * 3600 * 1000;
const JSON_OUT = process.argv.includes('--json');
const PLATFORMS = ['tiktok', 'instagram', 'youtube'];

// Deterministic-per-week PRNG so a re-run of the same week is stable, but
// different weeks deal differently.
function hashStr(s) {
  let h = 1779033703 ^ s.length;
  for (let i = 0; i < s.length; i++) { h = Math.imul(h ^ s.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  return h >>> 0;
}
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(hashStr(WEEK));

function lastUsed(c) {
  if (!c.usedDates || !c.usedDates.length) return 0;
  return Math.max(...c.usedDates.map(d => Date.parse(d) || 0));
}
// Last time a clip was DEALT into a draft (whether or not it ever published).
// Separate from usedDates on purpose — see the W31 review §4/§6.3: stamping a
// draft as "posted" locked good clips out for a cooldown they never earned and
// would have had a later review retire them as "posted, zero performance".
function lastDealt(c) {
  if (!c.dealtDates || !c.dealtDates.length) return 0;
  return Math.max(...c.dealtDates.map(d => Date.parse(d) || 0));
}
function score(c) {
  let s = 0;
  if (c.rating === 'good') s += 100;
  else if (c.rating === 'ok') s += 20;
  s += (c.priorScore || 0) * 10;      // AI teaching prior (0..10)
  if (c.hasTranscript) s += 3;         // captionable from a written summary
  if (!c.usedDates || !c.usedDates.length) s += 5; // never posted
  s += rand() * 4;                     // jitter for variety
  return s;
}

function eligible(clips, now, cooldownMs) {
  return clips.filter(c =>
    c.status !== 'retired' &&
    c.rating !== 'bad' &&
    (now - lastUsed(c) > cooldownMs) &&
    (now - lastDealt(c) > DEALT_WINDOW_MS));
}

function deal(clips, now) {
  let cooldownMs = COOLDOWN_WEEKS * 7 * 24 * 3600 * 1000;
  let pool = eligible(clips, now, cooldownMs);
  // Relax cooldown if the well is somehow shallow (heavy prior use).
  while (pool.length < COUNT && COOLDOWN_WEEKS > 1) {
    COOLDOWN_WEEKS = Math.floor(COOLDOWN_WEEKS / 2);
    cooldownMs = COOLDOWN_WEEKS * 7 * 24 * 3600 * 1000;
    pool = eligible(clips, now, cooldownMs);
  }
  pool.sort((a, b) => score(b) - score(a));

  const byTopic = new Map();
  for (const c of pool) {
    if (!byTopic.has(c.topic)) byTopic.set(c.topic, []);
    byTopic.get(c.topic).push(c);
  }
  const topics = [...byTopic.keys()];
  const cap = Math.max(2, Math.ceil(COUNT / Math.min(topics.length || 1, 6)));

  const picked = [];
  const usedKb = new Set();
  const perTopic = {};
  let ti = 0, guard = 0;
  // Round-robin across topics for spread; skip content already dealt (kbId).
  while (picked.length < COUNT && guard++ < 20000 && topics.length) {
    const t = topics[ti++ % topics.length];
    const bucket = byTopic.get(t);
    if (!bucket || !bucket.length || (perTopic[t] || 0) >= cap) continue;
    const idx = bucket.findIndex(c => !(c.kbId && usedKb.has(c.kbId)));
    if (idx < 0) continue;
    const c = bucket.splice(idx, 1)[0];
    if (c.kbId) usedKb.add(c.kbId);
    perTopic[t] = (perTopic[t] || 0) + 1;
    picked.push(c);
  }
  // Fallback fill (rare) if topic caps left us short.
  if (picked.length < COUNT) {
    for (const c of pool) {
      if (picked.length >= COUNT) break;
      if (picked.includes(c)) continue;
      if (c.kbId && usedKb.has(c.kbId)) continue;
      picked.push(c); if (c.kbId) usedKb.add(c.kbId);
    }
  }
  return picked;
}

function main() {
  const manifest = JSON.parse(fs.readFileSync(CATALOG, 'utf8'));
  const now = Date.now();
  const picked = deal(manifest.clips, now);

  const dealt = picked.map((c, i) => {
    const platform = PLATFORMS[i % PLATFORMS.length];
    return {
      slot: i + 1,
      day: Math.floor(i / 2),            // 0=Mon .. 6=Sun (2/day)
      platform,
      crosspost: platform === 'instagram' ? ['facebook'] : [],
      id: c.id,
      title: c.title,
      topic: c.topic,
      file: c.file,
      path: path.join(manifest.clipDir, c.file),
      kbId: c.kbId,
      hasTranscript: c.hasTranscript,
      rating: c.rating,
      ratingPrior: c.ratingPrior,
      priorScore: c.priorScore,
      summary: c.summary,
    };
  });

  if (JSON_OUT) {
    process.stdout.write(JSON.stringify({ week: WEEK, count: dealt.length, cooldownWeeks: COOLDOWN_WEEKS, dealt }, null, 2));
    return;
  }

  const DOW = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  console.log(`\nVIDEO SPINE — ${WEEK} — ${dealt.length} reels (2/day), cooldown ${COOLDOWN_WEEKS}w`);
  console.log('─'.repeat(96));
  for (const d of dealt) {
    const perf = d.rating ? `rated:${d.rating}` : `prior:${d.ratingPrior || 'n/a'}(${d.priorScore ?? '—'})`;
    const net = d.platform + (d.crosspost.length ? `(+${d.crosspost.join(',')})` : '');
    console.log(`${DOW[d.day]} ${String(d.slot).padStart(2)} · ${net.padEnd(20)} · ${d.topic.padEnd(14)} · ${perf}`);
    console.log(`        ${d.title.slice(0, 84)}`);
    if (d.summary) console.log(`        ↳ ${d.summary.slice(0, 84)}`);
  }
  console.log('─'.repeat(96));
  const spread = {};
  for (const d of dealt) spread[d.topic] = (spread[d.topic] || 0) + 1;
  console.log('Topic spread:', Object.entries(spread).map(([t, n]) => `${t}:${n}`).join('  '));
  const withT = dealt.filter(d => d.hasTranscript).length;
  console.log(`Captionable from transcript: ${withT}/${dealt.length}. Files: ${manifest.clipDir}`);
  console.log('Next: caption each through the gate, host via the side-branch pipeline, draft in Metricool, then `node content/video/mark-posted.js <id> <isoDate> <network>`.');
}

main();
