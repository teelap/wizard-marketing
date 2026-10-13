/**
 * Branded social-share card generator for The Grimoire.
 * Renders a 1200x630 PNG (the summit deck's look: cream paper, rainbow bend,
 * Fraunces Black title, wizard hat, yellow URL sticker) per post,
 * so every article has an on-brand OG/Twitter image with zero manual work.
 *
 * Fault-tolerant by design: if the rasterizer or font is unavailable, every
 * function returns null and the build falls back to the default share image —
 * a missing card must NEVER break the site build.
 */

'use strict';

const fs = require('fs');
const path = require('path');

let Resvg = null;
try { ({ Resvg } = require('@resvg/resvg-js')); } catch (e) { Resvg = null; }

let fontFiles = null;
let initState = null; // null = not tried, true/false = result

// Family names as stored inside the TTFs (resvg matches on these).
const DISPLAY = 'Fraunces 144pt SuperSoft Wonky';
const BODY = 'Nunito';

function init(root) {
    if (initState !== null) return initState;
    initState = false;
    if (!Resvg) return false;
    const files = ['Fraunces-Black-Soft.ttf', 'Nunito-Black.ttf'].map((f) => path.join(root, 'assets', 'fonts', f));
    const missing = files.filter((f) => !fs.existsSync(f));
    if (missing.length) {
        console.warn(`[grimoire] OG cards skipped: missing font ${missing.map((f) => path.basename(f)).join(', ')}`);
        return false;
    }
    fontFiles = files;
    const hat = path.join(root, 'assets', 'brand', 'wizard-hat-512.png');
    if (fs.existsSync(hat)) hatDataUri = 'data:image/png;base64,' + fs.readFileSync(hat).toString('base64');
    initState = true;
    return initState;
}

function xesc(s) {
    return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Palette + rainbow order from the summit deck (build_deck.py), same as schoolhouse.js.
const INK = '#1B1A17';
const CREAM = '#FFF1D6';
const YELLOW = '#FFC928';
const RAINBOW = ['#12A4A4', '#F6A8CB', '#E5322B', '#FF9473', '#FFC928', '#17271F', '#91DE87', '#8B1D3D', '#5DB6EC'];

const TITLE_X = 196;
const CONTENT_W = 1120 - TITLE_X;

function wrap(text, maxChars) {
    const words = String(text).split(/\s+/).filter(Boolean);
    const lines = [];
    let cur = '';
    for (const w of words) {
        if (!cur) { cur = w; continue; }
        if ((cur + ' ' + w).length <= maxChars) cur += ' ' + w;
        else { lines.push(cur); cur = w; }
    }
    if (cur) lines.push(cur);
    return lines;
}

// Fraunces Black advances at roughly 0.56 of the point size; size the title down
// for longer headlines so it always fits in <= 4 lines without crowding.
function layoutTitle(title) {
    const perLine = (F) => Math.max(8, Math.floor(CONTENT_W / (0.56 * F)));
    const longestWord = Math.max(...String(title).split(/\s+/).map((w) => w.length));
    let F = title.length <= 22 ? 92 : title.length <= 38 ? 80 : title.length <= 55 ? 68 : 58;
    // A single very long word cannot wrap: shrink until it fits on one line.
    while (perLine(F) < longestWord && F > 36) F -= 4;
    let lines = wrap(title, perLine(F));
    while (lines.length > 3 && F > 50) {
        F -= 6;
        lines = wrap(title, perLine(F));
    }
    if (lines.length > 4) { lines = lines.slice(0, 3); lines.push(lines.pop() + '…'); }
    return { F, lines, lineH: Math.round(F * 1.02) };
}

// The deck's rainbow bend: down the left edge, a 90° turn, then off the right edge.
function bendSvg() {
    const w = 12, n = RAINBOW.length, o = 6, r0 = 40, xl = 36, yb = 630 - 34;
    const R = r0 + n * w, cx = xl + R, cy = yb - R;
    const d = (r) => `M ${cx - r} -20 L ${cx - r} ${cy} A ${r} ${r} 0 0 0 ${cx} ${cy + r} L 1220 ${cy + r}`;
    const casing = `<path d="${d(r0 + n * w / 2)}" stroke="${INK}" stroke-width="${n * w + 2 * o}" fill="none"/>`;
    return casing + RAINBOW.map((c, i) => `<path d="${d(R - (i + 0.5) * w)}" stroke="${c}" stroke-width="${w + 0.6}" fill="none"/>`).join('');
}

// The wizard-hat logo (assets/brand/wizard-hat-512.png, from the redesign's generated art).
let hatDataUri = '';
const hatSvg = () => hatDataUri ? `<image href="${hatDataUri}" x="1014" y="30" width="118" height="118"/>` : '';

function buildSvg(title, category) {
    const { F, lines, lineH } = layoutTitle(title);
    // Centre the title block in the space between the kicker (y≈130) and the band (y≈430).
    const block = (lines.length - 1) * lineH;
    const first = Math.round(Math.max(150 + F * 0.78, 300 - block / 2 + F * 0.36));

    const titleSvg = lines.map((ln, i) =>
        `<text x="${TITLE_X}" y="${first + i * lineH}" font-family="${DISPLAY}" font-size="${F}" font-weight="900" fill="${INK}">${xesc(ln)}</text>`
    ).join('\n  ');

    // Nunito Black 21px + 3px tracking runs ~17.5px a character; long categories are trimmed to fit the row.
    let kicker = `THE GRIMOIRE · ${String(category).toUpperCase()}`;
    const maxChars = Math.floor((1000 - TITLE_X - 48) / 17.5);
    if (kicker.length > maxChars) kicker = kicker.slice(0, maxChars - 1).trimEnd() + '…';
    const kickerW = Math.round(kicker.length * 17.5 + 48);

    return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${CREAM}"/>
  ${bendSvg()}
  <rect x="${TITLE_X}" y="62" width="${kickerW}" height="50" rx="25" fill="${INK}"/>
  <text x="${TITLE_X + 24}" y="95" font-family="${BODY}" font-size="21" font-weight="900" fill="${CREAM}" letter-spacing="3">${xesc(kicker)}</text>
  ${hatSvg()}
  ${titleSvg}
  <g transform="rotate(-3 990 520)">
    <rect x="828" y="487" width="336" height="70" rx="35" fill="${INK}"/>
    <rect x="818" y="477" width="336" height="70" rx="35" fill="${YELLOW}" stroke="${INK}" stroke-width="5"/>
    <text x="986" y="524" text-anchor="middle" font-family="${DISPLAY}" font-size="30" font-weight="900" fill="${INK}">jakethewizard.com</text>
  </g>
</svg>`;
}

/**
 * Render a card to <outDir>/<slug>.png. Returns the absolute file path, or null
 * if rendering is unavailable/failed (caller falls back to the default image).
 */
function generateCard({ root, outDir, slug, title, category }) {
    if (!init(root)) return null;
    try {
        const svg = buildSvg(title, category || 'The Grimoire');
        const resvg = new Resvg(svg, {
            font: { fontFiles, loadSystemFonts: false, defaultFontFamily: BODY },
            fitTo: { mode: 'original' },
        });
        fs.mkdirSync(outDir, { recursive: true });
        const file = path.join(outDir, slug + '.png');
        fs.writeFileSync(file, resvg.render().asPng());
        return file;
    } catch (e) {
        console.warn(`[grimoire] OG card render failed for "${slug}": ${e.message}`);
        return null;
    }
}

module.exports = { generateCard };
