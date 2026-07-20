#!/usr/bin/env node
/**
 * build-catalog.js — build / refresh content/video/catalog.json
 * -------------------------------------------------------------------------
 * The VIDEO MEMORY for the content engine. Scans Jake's TikTok back-catalog
 * (the local Google Drive sync), parses each clip's filename for its title +
 * hashtags, JOINS to the knowledge-base transcript index for a written
 * summary + topics + an AI teaching-quality score, dedupes the
 * download-collision copies, and writes one manifest that:
 *   - the weekly-evergreen batch DEALS from (2 reels/day, by subject), and
 *   - the Sunday weekly-review RATES + RETIRES into.
 *
 * status (active|used|retired) and rating (good|ok|bad) travel with each clip
 * across runs. Re-running MERGES: derived fields (title/topic/summary/scores)
 * refresh from source, but the live tracking fields are preserved.
 *
 * Sources (override via env):
 *   JTW_CLIP_DIR  default G:\My Drive\TikTok\Old        (1,150+ .mp4 clips)
 *   JTW_KB_DATA   default C:\Users\jacob\Projects\knowledgebase\_data
 *
 * Usage:
 *   node content/video/build-catalog.js               # fast (no ffprobe)
 *   node content/video/build-catalog.js --durations   # also probe lengths
 *
 * No external deps. ffprobe is optional (read from PATH).
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

// ----------------------------------------------------------------------------
// Config
// ----------------------------------------------------------------------------
const CLIP_DIR = process.env.JTW_CLIP_DIR || 'G:\\My Drive\\TikTok\\Old';
const KB_DATA = process.env.JTW_KB_DATA || 'C:\\Users\\jacob\\Projects\\knowledgebase\\_data';
const OUT = path.join(__dirname, 'catalog.json');
const WANT_DURATIONS = process.argv.includes('--durations');

// Map raw KB topics / clip hashtags -> the subject buckets we deal by. Ordered:
// first match wins for the PRIMARY topic. Keeps two same-subject clips apart in
// the weekly deal (loosely tracks CONTENT_MATRIX §2).
const TOPIC_RULES = [
  ['seo',            /\b(seo|keyword|keywords|backlink|backlinks|serp|ranking|rank|searchconsole|search engine|organic|indexing|crawl)\b/],
  ['local',          /\b(local ?seo|gmb|google ?business|near me|local)\b/],
  ['web-design',     /\b(web ?design|website|websites|wordpress|webflow|landing ?page|page ?speed|html|css|ux|ui|hosting|plugin)\b/],
  ['paid-ads',       /\b(paid ?ads?|google ?ads|facebook ?ads|meta ?ads|ppc|advertising|ad ?budget|retarget|dsp|omnichannel)\b/],
  ['cro',            /\b(cro|conversion|conversions|funnel|checkout|optimi[sz]e|a\/?b ?test|button)\b/],
  ['messaging',      /\b(copywriting|copy|headline|hook|messaging|positioning|offer|value ?prop|differentiat)\b/],
  ['branding',       /\b(brand|branding|personal ?brand|identity|logo|reputation)\b/],
  ['ai-marketing',   /\b(\bai\b|chatgpt|automation|llm|generative|aeo|geo)\b/],
  ['analytics',      /\b(analytic|analytics|data|tracking|ga4|attribution|report|metric|metrics|dashboard)\b/],
  ['email',          /\b(email|newsletter|list|opt ?in|open ?rate)\b/],
  ['social-content', /\b(tiktok|instagram|reels?|shorts?|content|social|video|posting|algorithm|engagement|followers)\b/],
  ['sales',          /\b(sales|pricing|price|leads?|closing|pipeline)\b/],
  ['strategy',       /\b(strategy|marketing|business|growth|smallbiz|small ?business)\b/],
];

// ----------------------------------------------------------------------------
// String helpers
// ----------------------------------------------------------------------------
const HASHTAG = /#[^\s#]+/g;

/** Strip the .mp4 (and malformed ".mp4 (4)") extension + download "(n)" copies. */
function baseName(filename) {
  return filename
    .replace(/\.mp4\b/gi, ' ')       // remove .mp4 token(s), incl. ".mp4 (4)" cases
    .replace(/\s*\(\d+\)\s*/g, ' ')  // remove "(1)" download-copy markers anywhere
    .replace(/\s+/g, ' ')
    .trim();
}

/** Human title: base name with hashtag tokens (and any stray '#') removed. */
function toTitle(filename) {
  return baseName(filename).replace(HASHTAG, ' ').replace(/#/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Hashtags present in a filename (lowercased, deduped, no leading #). */
function toTags(filename) {
  const out = [];
  const seen = new Set();
  for (const m of baseName(filename).matchAll(HASHTAG)) {
    const t = m[0].slice(1).toLowerCase();
    if (t && !seen.has(t)) { seen.add(t); out.push(t); }
  }
  return out;
}

/** Normalized content key (title only, no tags) — the transcript join key. */
function matchKey(filename) {
  return toTitle(filename).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

/** Normalized full identity (title + tags) — collapses only true download dupes. */
function dedupKey(filename) {
  return baseName(filename).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function slugify(s) {
  return s.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48) || 'clip';
}
function shortHash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(h, 31) + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

// ----------------------------------------------------------------------------
// Knowledge-base transcript index
// ----------------------------------------------------------------------------
function loadJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch (e) { console.warn(`  (could not read ${p}: ${e.message})`); return null; }
}

/**
 * Build the transcript lookup: exact map on the normalized title key, plus the
 * list for prefix matching (KB filenames are truncated to ~90 chars, and clip
 * vs transcript hashtag sets differ, so we match on the TITLE stem, tolerating
 * one side being a prefix of the other).
 */
function buildTranscriptIndex() {
  const transcripts = loadJson(path.join(KB_DATA, 'transcripts-included.json')) || [];
  const ideas = loadJson(path.join(KB_DATA, 'ideas-enriched.json')) || [];

  // Aggregate idea topics per source filename key.
  const topicsByKey = new Map();
  for (const idea of ideas) {
    const fn = idea && idea.source && idea.source.filename;
    if (!fn) continue;
    const k = matchKey(fn);
    if (!k) continue;
    let bag = topicsByKey.get(k);
    if (!bag) { bag = new Map(); topicsByKey.set(k, bag); }
    for (const t of (idea.topics || [])) bag.set(t, (bag.get(t) || 0) + 1);
  }

  const exact = new Map();
  const list = [];
  for (const rec of transcripts) {
    if (!rec || !rec.filename) continue;
    const k = matchKey(rec.filename);
    if (!k) continue;
    const topicBag = topicsByKey.get(k);
    const kbTopics = topicBag
      ? [...topicBag.entries()].sort((a, b) => b[1] - a[1]).map(e => e[0]).slice(0, 5)
      : [];
    const entry = {
      key: k,
      kbId: rec.id || null,
      summary: (rec.summary || '').trim(),
      contentType: rec.content_type || '',
      wordCount: rec.word_count || null,
      priorScore: typeof rec.overall_score === 'number' ? rec.overall_score : null,
      priorTeaching: typeof rec.teaching_quality === 'number' ? rec.teaching_quality : null,
      kbTopics,
    };
    if (!exact.has(k)) exact.set(k, entry);
    list.push(entry);
  }
  return { exact, list };
}

function findTranscript(idx, key) {
  if (!key) return null;
  const hit = idx.exact.get(key);
  if (hit) return hit;
  // Prefix match (guard against short/generic openers).
  if (key.length < 20) return null;
  let best = null, bestLen = 0;
  for (const e of idx.list) {
    if (e.key.length < 20) continue;
    const a = key, b = e.key;
    if (a.startsWith(b) || b.startsWith(a)) {
      const l = Math.min(a.length, b.length);
      if (l > bestLen) { best = e; bestLen = l; }
    }
  }
  return best;
}

// ----------------------------------------------------------------------------
// Topic derivation
// ----------------------------------------------------------------------------
// Derive from the clip's OWN title + hashtags — the reliable, clip-specific
// signal. The KB idea-topics are broad (a Facebook-ads clip can carry a stray
// "Web Design" idea), so they enrich `kbTopics` but never decide the primary.
function deriveTopics(title, tags) {
  const hay = `${title} ${tags.join(' ')}`.toLowerCase();
  const matched = [];
  for (const [bucket, re] of TOPIC_RULES) {
    if (re.test(hay)) matched.push(bucket);
  }
  const primary = matched[0] || 'marketing';
  return { primary, all: matched.length ? matched : ['marketing'] };
}

function priorLabel(score) {
  if (score == null) return null;
  if (score >= 0.8) return 'strong';
  if (score >= 0.6) return 'solid';
  return 'weak';
}

// ----------------------------------------------------------------------------
// Duration (optional)
// ----------------------------------------------------------------------------
let ffprobeOk = true;
function probeDuration(file) {
  if (!ffprobeOk) return null;
  try {
    const out = execFileSync('ffprobe',
      ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', file],
      { encoding: 'utf8', timeout: 15000, stdio: ['ignore', 'pipe', 'ignore'] });
    const d = parseFloat(String(out).trim());
    return isFinite(d) ? Math.round(d) : null;
  } catch (e) {
    if (/ENOENT/.test(e.message)) { ffprobeOk = false; console.warn('  (ffprobe not found — skipping durations)'); }
    return null;
  }
}

// ----------------------------------------------------------------------------
// Build
// ----------------------------------------------------------------------------
function main() {
  if (!fs.existsSync(CLIP_DIR)) {
    console.error(`Clip directory not found: ${CLIP_DIR}\nSet JTW_CLIP_DIR if it moved.`);
    process.exit(1);
  }

  console.log(`Scanning ${CLIP_DIR} ...`);
  const files = fs.readdirSync(CLIP_DIR).filter(f => /\.mp4(\s*\(\d+\))?$/i.test(f));
  console.log(`  ${files.length} video files on disk`);

  console.log(`Loading knowledge-base transcripts from ${KB_DATA} ...`);
  const idx = buildTranscriptIndex();
  console.log(`  ${idx.list.length} transcripts indexed (${idx.exact.size} distinct titles)`);

  // Group by dedup identity (collapse download copies).
  const groups = new Map();
  for (const f of files) {
    const k = dedupKey(f);
    let g = groups.get(k);
    if (!g) { g = []; groups.set(k, g); }
    g.push(f);
  }

  // Preserve live tracking from any existing catalog.
  const prev = fs.existsSync(OUT) ? (loadJson(OUT) || {}) : {};
  const prevById = new Map((prev.clips || []).map(c => [c.id, c]));

  const clips = [];
  let matched = 0, carried = 0;
  const topicCounts = {}, priorCounts = { strong: 0, solid: 0, weak: 0, none: 0 };

  for (const [dk, groupFiles] of groups) {
    // Canonical = shortest filename (usually the copy without the "(1)" suffix).
    groupFiles.sort((a, b) => a.length - b.length);
    const canonical = groupFiles[0];
    let title = toTitle(canonical);
    const tags = toTags(canonical);
    const key = matchKey(canonical);
    const tr = findTranscript(idx, key);
    // Fallback for hashtag-only names; skip a file with no title, no tags, no transcript.
    if (!title) title = tags.length ? tags.join(' ') : canonical.replace(/\.mp4.*$/i, '').trim();
    if (!title && !tags.length && !tr) continue;
    if (tr) matched++;

    const kbTopics = tr ? tr.kbTopics : [];
    const topics = deriveTopics(title, tags);
    topicCounts[topics.primary] = (topicCounts[topics.primary] || 0) + 1;
    const prLabel = tr ? priorLabel(tr.priorScore) : null;
    priorCounts[prLabel || 'none']++;

    const id = `${slugify(key || dk)}-${shortHash(dk)}`;
    const durationSec = WANT_DURATIONS ? probeDuration(path.join(CLIP_DIR, canonical)) : null;

    const rec = {
      id,
      title,
      file: canonical,
      files: groupFiles,
      dupeCount: groupFiles.length,
      tags,
      durationSec,
      topic: topics.primary,
      topics: topics.all,
      hasTranscript: !!tr,
      kbId: tr ? tr.kbId : null,
      kbTopics,
      summary: tr ? tr.summary : '',
      contentType: tr ? tr.contentType : '',
      wordCount: tr ? tr.wordCount : null,
      priorScore: tr ? tr.priorScore : null,
      priorTeaching: tr ? tr.priorTeaching : null,
      ratingPrior: prLabel, // AI teaching-quality prior — NOT real post performance
      // --- live tracking (preserved across runs; set by the routines) ---
      status: 'active',   // active | used | retired
      rating: null,       // good | ok | bad — set by weekly-review from Metricool
      usedDates: [],      // ISO dates this clip was scheduled
      platformsUsed: [],  // networks it was posted to
      notes: '',
    };

    const old = prevById.get(id);
    if (old) {
      rec.status = old.status || rec.status;
      rec.rating = old.rating != null ? old.rating : rec.rating;
      rec.usedDates = Array.isArray(old.usedDates) ? old.usedDates : rec.usedDates;
      rec.platformsUsed = Array.isArray(old.platformsUsed) ? old.platformsUsed : rec.platformsUsed;
      rec.notes = old.notes || rec.notes;
      if (rec.status !== 'active' || rec.rating || rec.usedDates.length) carried++;
    }

    clips.push(rec);
  }

  clips.sort((a, b) => (b.priorScore || 0) - (a.priorScore || 0) || a.title.localeCompare(b.title));

  const manifest = {
    builtAt: new Date().toISOString(),
    clipDir: CLIP_DIR,
    totalFiles: files.length,
    uniqueClips: clips.length,
    matchedTranscripts: matched,
    clips,
  };
  fs.writeFileSync(OUT, JSON.stringify(manifest, null, 2));

  // ---- report ----
  const pct = clips.length ? Math.round((matched / clips.length) * 100) : 0;
  console.log(`\nWrote ${path.relative(process.cwd(), OUT)}`);
  console.log(`  ${files.length} files -> ${clips.length} unique clips (${files.length - clips.length} download-copies collapsed)`);
  console.log(`  ${matched} clips matched a transcript (${pct}% have a written summary + AI score)`);
  if (carried) console.log(`  ${carried} clips carried live status/rating forward from the previous catalog`);
  console.log('\n  Topic distribution (primary):');
  for (const [t, n] of Object.entries(topicCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${String(n).padStart(4)}  ${t}`);
  }
  console.log('\n  AI teaching-quality prior (matched clips only):');
  console.log(`    strong ${priorCounts.strong} · solid ${priorCounts.solid} · weak ${priorCounts.weak} · (no transcript) ${priorCounts.none}`);
}

main();
