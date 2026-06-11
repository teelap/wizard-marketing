/**
 * Branded social-share card generator for The Grimoire.
 * Renders a 1200x630 PNG (parchment + Playfair title + wizard mark) per post,
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

let fontFile = null;
let iconDataUri = '';
let textureDataUri = ''; // downscaled arcane-paper texture (optional)
let initState = null; // null = not tried, true/false = result

function init(root) {
    if (initState !== null) return initState;
    initState = false;
    if (!Resvg) return false;
    try {
        const f = path.join(root, 'assets', 'fonts', 'PlayfairDisplay.ttf');
        if (!fs.existsSync(f)) return false;
        fontFile = f;
        const iconPath = path.join(root, 'dev_assets', 'jake-icon-512.png');
        if (fs.existsSync(iconPath)) {
            iconDataUri = 'data:image/png;base64,' + fs.readFileSync(iconPath).toString('base64');
        }
        // Pre-render the arcane-paper texture once (the 4MB source is too large to
        // embed per card). Optional: cards fall back to plain parchment if it fails.
        try {
            const wp = path.join(root, 'dev_assets', 'wizpaper1.png');
            if (fs.existsSync(wp)) {
                const big = 'data:image/png;base64,' + fs.readFileSync(wp).toString('base64');
                const texSvg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><image href="${big}" x="0" y="0" width="1200" height="630" preserveAspectRatio="xMidYMid slice"/></svg>`;
                const texPng = new Resvg(texSvg, { fitTo: { mode: 'original' } }).render().asPng();
                textureDataUri = 'data:image/png;base64,' + Buffer.from(texPng).toString('base64');
            }
        } catch (e) { textureDataUri = ''; }
        initState = true;
    } catch (e) {
        initState = false;
    }
    return initState;
}

function xesc(s) {
    return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const CONTENT_W = 1040; // 80px margins on each side

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

// Playfair advances at roughly half the point size; size the title down for
// longer headlines so it always fits in <= 4 lines without crowding.
function layoutTitle(title) {
    let F = title.length <= 22 ? 84 : title.length <= 38 ? 76 : title.length <= 55 ? 64 : 54;
    let lines = wrap(title, Math.max(8, Math.floor(CONTENT_W / (0.5 * F))));
    while (lines.length > 3 && F > 48) {
        F -= 8;
        lines = wrap(title, Math.max(8, Math.floor(CONTENT_W / (0.5 * F))));
    }
    if (lines.length > 4) { lines = lines.slice(0, 3); lines.push(lines.pop() + '…'); }
    return { F, lines, lineH: Math.round(F * 1.16) };
}

function buildSvg(title, category) {
    const { F, lines, lineH } = layoutTitle(title);
    const block = lines.length * lineH;
    let first = Math.round(380 - (block - lineH) / 2);
    first = Math.max(330, first);
    if (first + (lines.length - 1) * lineH > 512) first = 512 - (lines.length - 1) * lineH;

    const titleSvg = lines.map((ln, i) =>
        `<text x="80" y="${first + i * lineH}" font-family="Playfair Display" font-size="${F}" font-weight="900" fill="#181412">${xesc(ln)}</text>`
    ).join('\n  ');

    const iconSvg = iconDataUri
        ? `<image href="${iconDataUri}" x="80" y="64" width="56" height="56"/>\n  <text x="150" y="104"`
        : `<text x="80" y="104"`;

    const texture = textureDataUri
        ? `\n  <image href="${textureDataUri}" x="0" y="0" width="1200" height="630" preserveAspectRatio="xMidYMid slice"/>\n  <rect width="1200" height="630" fill="#F8F4EB" fill-opacity="0.62"/>`
        : '';

    return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#F4EEE0"/>${texture}
  <rect x="22" y="22" width="1156" height="586" fill="none" stroke="#1e1208" stroke-opacity="0.22" stroke-width="2" rx="16"/>
  ${iconSvg} font-family="Playfair Display" font-size="30" font-weight="700" fill="#181412" letter-spacing="3">THE GRIMOIRE</text>
  <text x="80" y="250" font-family="Playfair Display" font-size="26" font-weight="700" fill="#c32b39" letter-spacing="4">${xesc(String(category).toUpperCase())}</text>
  <rect x="80" y="270" width="96" height="6" fill="#c32b39"/>
  ${titleSvg}
  <text x="80" y="566" font-family="Playfair Display" font-size="26" font-weight="700" fill="#6b5c52">jakethewizard.com</text>
  <text x="1120" y="566" text-anchor="end" font-family="Playfair Display" font-size="26" font-weight="400" font-style="italic" fill="#6b5c52">By Jake the Wizard</text>
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
            font: { fontFiles: [fontFile], loadSystemFonts: false, defaultFontFamily: 'Playfair Display' },
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
