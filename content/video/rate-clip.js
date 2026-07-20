#!/usr/bin/env node
/**
 * rate-clip.js — rate / retire a catalog clip from real performance
 * -------------------------------------------------------------------------
 * The Sunday weekly-review calls this to close the loop: after a reel posts,
 * score it against its network's median and record the verdict so the dealer
 * favors winners and stops re-posting duds. Every call is a git diff Jake can
 * revert (weekly-review guardrail).
 *
 *   rating good  -> favored in the next deal (scored above unrated clips)
 *   rating ok    -> neutral
 *   rating bad   -> deprioritized; pair with --retire to drop it from the pool
 *   --retire     -> status = retired (never dealt again until un-retired)
 *   --active     -> un-retire (status = active) — for a wrong retire
 *
 * Respect small N (weekly-review rule): only rate on a real signal, and prefer
 * to retire only after a clear miss. Put the evidence in --note.
 *
 * Usage:
 *   node content/video/rate-clip.js <clipId> good  --note "3.1x IG median ER, W31"
 *   node content/video/rate-clip.js <clipId> bad   --retire --note "0 plays 2 posts"
 *   node content/video/rate-clip.js <clipId> --active --note "un-retire, mis-tagged"
 */
'use strict';

const fs = require('fs');
const path = require('path');
const CATALOG = path.join(__dirname, 'catalog.json');
const RATINGS = ['good', 'ok', 'bad'];

function flagValue(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 && process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[i + 1] : null;
}

function main() {
  const args = process.argv.slice(2);
  const id = args[0];
  const rating = args.find(a => RATINGS.includes(a)) || null;
  const retire = args.includes('--retire');
  const activate = args.includes('--active');
  const note = flagValue('--note');

  if (!id || id.startsWith('--')) {
    console.error('Usage: node rate-clip.js <clipId> <good|ok|bad> [--retire] [--active] [--note "evidence"]');
    process.exit(1);
  }
  if (!rating && !retire && !activate) {
    console.error('Nothing to do: pass a rating (good|ok|bad), and/or --retire / --active.');
    process.exit(1);
  }
  if (retire && activate) {
    console.error('--retire and --active are contradictory.');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(CATALOG, 'utf8'));
  const clip = manifest.clips.find(c => c.id === id);
  if (!clip) {
    console.error(`No clip with id "${id}" in catalog.json.`);
    process.exit(1);
  }

  if (rating) clip.rating = rating;
  if (retire) clip.status = 'retired';
  if (activate) clip.status = 'active';
  if (note) {
    const stamp = new Date().toISOString().slice(0, 10);
    clip.notes = (clip.notes ? clip.notes + ' | ' : '') + `${stamp}: ${note}`;
  }

  fs.writeFileSync(CATALOG, JSON.stringify(manifest, null, 2));
  console.log(`updated ${id} — status:${clip.status} rating:${clip.rating || 'unrated'}${note ? ` — "${note}"` : ''}`);
}

main();
