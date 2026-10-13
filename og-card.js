/**
 * Site-wide social-share card generator.
 *
 * Renders the 1200x630 OG/Twitter card used by every top-level page
 * (index, consulting, eight-dominoes, tools, mastermind, podcast-guest, …).
 * The Grimoire generates its own per-post cards in grimoire-og.js; this is the
 * default card for everything else, drawn in the same parchment style so the
 * two systems match.
 *
 * Why 1200x630: every page declares twitter:card=summary_large_image, which
 * expects a 1.91:1 image. The previous default was a square 1224x1224 headshot,
 * so X/LinkedIn letterboxed or centre-cropped it.
 *
 * Run manually after changing the headshot or the copy below:
 *     node og-card.js
 *
 * Output: dev_assets/jake-og-card-2026.jpg (committed; dev_assets/ is copied into
 * the deploy by build.js). JPEG, not PNG — the parchment texture is
 * photographic, so PNG lands around 1 MB where JPEG holds the same quality in
 * ~150 KB. Falls back to PNG if ffmpeg is unavailable.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { Resvg } = require('@resvg/resvg-js');

const ROOT = __dirname;
const OUT_JPG = path.join(ROOT, 'dev_assets', 'jake-og-card-2026.jpg');
const OUT_PNG = path.join(ROOT, 'dev_assets', 'jake-og-card-2026.png');
const FONT = path.join(ROOT, 'assets', 'fonts', 'PlayfairDisplay.ttf');

const W = 1200;
const H = 630;

// Brand palette — mirrors grimoire-og.js and styles.css.
const PARCHMENT = '#F4EEE0';
const INK = '#181412';
const WAX_RED = '#c32b39';
const MUTED = '#6b5c52';

/**
 * Rasterise an oversized source image down to `size` before embedding it.
 * Base64-inlining the multi-megabyte originals directly makes resvg crawl, so
 * we do a cheap pre-pass exactly as grimoire-og.js does for its paper texture.
 */
function downscaleToDataUri(file, size) {
    const raw = 'data:image/png;base64,' + fs.readFileSync(file).toString('base64');
    const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">` +
        `<image href="${raw}" x="0" y="0" width="${size}" height="${size}" preserveAspectRatio="xMidYMid slice"/></svg>`;
    const png = new Resvg(svg, { fitTo: { mode: 'original' } }).render().asPng();
    return 'data:image/png;base64,' + Buffer.from(png).toString('base64');
}

function textureDataUri(file) {
    const raw = 'data:image/png;base64,' + fs.readFileSync(file).toString('base64');
    const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">` +
        `<image href="${raw}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice"/></svg>`;
    const png = new Resvg(svg, { fitTo: { mode: 'original' } }).render().asPng();
    return 'data:image/png;base64,' + Buffer.from(png).toString('base64');
}

function buildSvg({ headshot, icon, texture }) {
    // Portrait sits right of centre; the copy column runs 80 → 660.
    const CX = 918;   // portrait centre x
    const CY = 315;   // portrait centre y
    const R = 208;   // portrait radius

    return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="portrait"><circle cx="${CX}" cy="${CY}" r="${R}"/></clipPath>
  </defs>

  <rect width="${W}" height="${H}" fill="${PARCHMENT}"/>
  <image href="${texture}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice"/>
  <rect width="${W}" height="${H}" fill="#F8F4EB" fill-opacity="0.62"/>
  <rect x="22" y="22" width="${W - 44}" height="${H - 44}" fill="none" stroke="#1e1208" stroke-opacity="0.22" stroke-width="2" rx="16"/>

  <!-- portrait -->
  <circle cx="${CX}" cy="${CY}" r="${R + 9}" fill="none" stroke="${WAX_RED}" stroke-opacity="0.85" stroke-width="5"/>
  <image href="${headshot}" x="${CX - R}" y="${CY - R}" width="${R * 2}" height="${R * 2}"
         preserveAspectRatio="xMidYMid slice" clip-path="url(#portrait)"/>

  <!-- masthead -->
  <image href="${icon}" x="80" y="64" width="56" height="56"/>
  <text x="150" y="104" font-family="Playfair Display" font-size="30" font-weight="700" fill="${INK}" letter-spacing="3">JAKE THE WIZARD</text>

  <!-- name + role -->
  <text x="80" y="286" font-family="Playfair Display" font-size="88" font-weight="900" fill="${INK}">Jake Tlapek</text>
  <rect x="80" y="318" width="96" height="6" fill="${WAX_RED}"/>
  <text x="80" y="392" font-family="Playfair Display" font-size="40" font-weight="700" fill="${WAX_RED}">The Wizard of Marketing</text>

  <!-- proof line -->
  <text x="80" y="452" font-family="Playfair Display" font-size="29" font-weight="400" fill="${INK}">13 years in the trenches.</text>
  <text x="80" y="492" font-family="Playfair Display" font-size="29" font-weight="400" fill="${INK}">$100M+ in measurable revenue.</text>

  <text x="80" y="566" font-family="Playfair Display" font-size="26" font-weight="700" fill="${MUTED}">jakethewizard.com</text>
  <text x="${W - 80}" y="566" text-anchor="end" font-family="Playfair Display" font-size="26" font-weight="400" font-style="italic" fill="${MUTED}">Author of Eight Dominoes</text>
</svg>`;
}

function main() {
    for (const f of [FONT, path.join(ROOT, 'dev_assets', 'jake-headshot-2026.png')]) {
        if (!fs.existsSync(f)) throw new Error(`missing required asset: ${f}`);
    }

    const headshot = downscaleToDataUri(path.join(ROOT, 'dev_assets', 'jake-headshot-2026.png'), 440);
    const icon = downscaleToDataUri(path.join(ROOT, 'dev_assets', 'jake-icon-2026-512.png'), 112);
    const texture = textureDataUri(path.join(ROOT, 'dev_assets', 'wizpaper1.png'));

    const svg = buildSvg({ headshot, icon, texture });
    const png = new Resvg(svg, {
        font: { fontFiles: [FONT], loadSystemFonts: false, defaultFontFamily: 'Playfair Display' },
        fitTo: { mode: 'original' },
    }).render().asPng();

    fs.writeFileSync(OUT_PNG, png);

    // Transcode to JPEG; keep the PNG only if ffmpeg is missing.
    try {
        execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', OUT_PNG, '-q:v', '2', OUT_JPG]);
        fs.unlinkSync(OUT_PNG);
        const kb = (fs.statSync(OUT_JPG).size / 1024).toFixed(0);
        console.log(`[og-card] wrote ${path.relative(ROOT, OUT_JPG)} — ${W}x${H}, ${kb} KB`);
    } catch (e) {
        console.warn(`[og-card] ffmpeg unavailable (${e.message.split('\n')[0]}) — keeping PNG fallback`);
        console.log(`[og-card] wrote ${path.relative(ROOT, OUT_PNG)} — ${W}x${H}, ${(png.length / 1024).toFixed(0)} KB`);
    }
}

main();
