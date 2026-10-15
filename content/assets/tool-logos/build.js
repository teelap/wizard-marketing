#!/usr/bin/env node
/* Redraws each /tools logo in the schoolhouse style: one flat brand colour,
   an ink outline and a hard ink shadow offset down-right, like the six
   illustrated icons. Reads marks.json, writes dev_assets/tools/<slug>.svg.

   Run: node content/assets/tool-logos/build.js
   To add a tool, add its mark to marks.json (path data + bbox) and rerun. */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..', '..');
const OUT_DIR = path.join(ROOT, 'dev_assets', 'tools');
const MARKS = JSON.parse(fs.readFileSync(path.join(__dirname, 'marks.json'), 'utf8'));

// Brand tokens from schoolhouse.css.
const COLORS = {
  ink: '#1B1A17', paper: '#FFFAF0', teal: '#12A4A4', pink: '#F6A8CB', red: '#E5322B',
  salmon: '#FF9473', yellow: '#FFC928', mint: '#91DE87', sky: '#5DB6EC', navy: '#3C3F9F',
  orange: '#FF7A33', maroon: '#8B1D3D', forest: '#17271F',
};

// Canvas is 100 units. The mark fills FIT units on its long side; the outline
// is STROKE units wide (half shows outside the fill) and the shadow drops SHADOW.
const CANVAS = 100;
const FIT = 74;
const STROKE = 8;
const SHADOW = 5;

const fmt = (n) => +n.toFixed(4);

function colorOf(key, slug) {
  const hex = COLORS[key];
  if (!hex) throw new Error(`${slug}: unknown colour "${key}"`);
  return hex;
}

function renderMark(mark) {
  const [x0, y0, x1, y1] = mark.bbox;
  const k = FIT / Math.max(x1 - x0, y1 - y0);
  const tx = (CANVAS - SHADOW) / 2 - ((x0 + x1) / 2) * k;
  const ty = (CANVAS - SHADOW) / 2 - ((y0 + y1) / 2) * k;
  const place = (dx) => `translate(${fmt(tx + dx)} ${fmt(ty + dx)}) scale(${fmt(k)})`;
  const ids = mark.parts.map((_, i) => `${mark.slug}-${i}`);

  const defs = mark.parts.map((p, i) => `<path id="${ids[i]}" d="${p.d}"/>`).join('');
  const shadow = ids.map((id) => `<use href="#${id}"/>`).join('');
  const face = mark.parts
    .map((p, i) => `<use href="#${ids[i]}" fill="${colorOf(p.color || mark.color, mark.slug)}"/>`)
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CANVAS} ${CANVAS}">`
    + `<defs>${defs}</defs>`
    + `<g stroke="${COLORS.ink}" stroke-width="${fmt(STROKE / k)}" stroke-linejoin="round" stroke-linecap="round">`
    + `<g transform="${place(SHADOW)}" fill="${COLORS.ink}">${shadow}</g>`
    + `<g transform="${place(0)}" paint-order="stroke">${face}</g>`
    + `</g></svg>\n`;
}

function buildAll() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const mark of MARKS) {
    const file = path.join(OUT_DIR, `${mark.slug}.svg`);
    fs.writeFileSync(file, renderMark(mark));
    console.log(`[tool-logos] ${path.relative(ROOT, file)}`);
  }
}

if (require.main === module) buildAll();

module.exports = { MARKS, OUT_DIR, renderMark };
