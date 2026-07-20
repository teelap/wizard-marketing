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
  const [id, isoDate, network] = process.argv.slice(2);
  if (!id || !isoDate || !network) {
    console.error('Usage: node mark-posted.js <clipId> <isoDate> <network>');
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
  clip.usedDates = clip.usedDates || [];
  clip.platformsUsed = clip.platformsUsed || [];
  const already = clip.usedDates.includes(day) && clip.platformsUsed.includes(network);
  if (!clip.usedDates.includes(day)) clip.usedDates.push(day);
  if (!clip.platformsUsed.includes(network)) clip.platformsUsed.push(network);

  fs.writeFileSync(CATALOG, JSON.stringify(manifest, null, 2));
  console.log(`${already ? '(no change) ' : ''}marked ${id} · ${day} · ${network} — used ${clip.usedDates.length}x, on [${clip.platformsUsed.join(', ')}]`);
}

main();
