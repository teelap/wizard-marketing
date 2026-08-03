#!/usr/bin/env node
/**
 * mark-posted.js — record that a catalog clip was scheduled
 * -------------------------------------------------------------------------
 * Called by the weekly-evergreen batch after Metricool confirms a reel draft.
 * Appends the post date + network to the clip's tracking fields so the dealer
 * respects its cooldown next time. Idempotent (won't double-add).
 *
 * The Sunday weekly-review sets `rating` (good|ok|bad) and can `retire` a clip
 * with retire.js / a direct edit — this script only logs USE, not quality.
 *
 * Usage:
 *   node content/video/mark-posted.js <clipId> <isoDate> <network>
 *   node content/video/mark-posted.js seo-marathon-3ab9 2026-07-21 instagram
 */
'use strict';

const fs = require('fs');
const path = require('path');
const CATALOG = path.join(__dirname, 'catalog.json');

function main() {
  const argv = process.argv.slice(2);
  // --dealt records that the batch DRAFTED this clip; publication is not implied.
  // Without it the script records a real publish (usedDates), which is what starts
  // the 12-week cooldown and what the Sunday review scores. Keeping those apart is
  // the W31 review's §6.3 fix: 12 clips were stamped "posted" at draft time, never
  // published, and would have been retired as duds on evidence that did not exist.
  const dealtOnly = argv.includes('--dealt');
  const [id, isoDate, network] = argv.filter(a => a !== '--dealt');
  if (!id || !isoDate || !network) {
    console.error('Usage: node mark-posted.js <clipId> <isoDate> <network> [--dealt]');
    process.exit(1);
  }
  if (!/^\d{4}-\d{2}-\d{2}/.test(isoDate)) {
    console.error(`Bad date "${isoDate}" — expected ISO YYYY-MM-DD.`);
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(CATALOG, 'utf8'));
  const clip = manifest.clips.find(c => c.id === id);
  if (!clip) {
    console.error(`No clip with id "${id}" in catalog.json.`);
    process.exit(1);
  }

  const day = isoDate.slice(0, 10);
  const dateField = dealtOnly ? 'dealtDates' : 'usedDates';
  const netField = dealtOnly ? 'platformsDealt' : 'platformsUsed';
  clip[dateField] = clip[dateField] || [];
  clip[netField] = clip[netField] || [];
  const already = clip[dateField].includes(day) && clip[netField].includes(network);
  if (!clip[dateField].includes(day)) clip[dateField].push(day);
  if (!clip[netField].includes(network)) clip[netField].push(network);

  fs.writeFileSync(CATALOG, JSON.stringify(manifest, null, 2));
  const verb = dealtOnly ? 'dealt' : 'posted';
  console.log(`${already ? '(no change) ' : ''}marked ${id} · ${day} · ${network} — ${verb} ${clip[dateField].length}x, on [${clip[netField].join(', ')}]`);
}

main();
