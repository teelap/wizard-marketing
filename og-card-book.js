/**
 * Eight Dominoes share-card generator.
 *
 * Renders the 1200x630 OG/Twitter card for /eight-dominoes and /media-kit —
 * the book-specific counterpart to og-card.js (which draws the generic
 * author card used by every other page). Same parchment styling, same
 * palette, same 1.91:1 ratio that summary_large_image expects.
 *
 * The cover art is dropped in unmodified: the media kit's usage terms ask
 * that it not be cropped or recoloured, so it is letterboxed onto the
 * parchment rather than bled to the edge.
 *
 * Run manually after the cover or the launch copy changes:
 *     node og-card-book.js
 *
 * Output: dev_assets/eight-dominoes-og.jpg (committed; dev_assets/ is copied
 * into the deploy by build.js). Falls back to PNG if ffmpeg is unavailable.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { Resvg } = require('@resvg/resvg-js');

const ROOT = __dirname;
const OUT_JPG = path.join(ROOT, 'dev_assets', 'eight-dominoes-og.jpg');
const OUT_PNG = path.join(ROOT, 'dev_assets', 'eight-dominoes-og.png');
const FONT = path.join(ROOT, 'assets', 'fonts', 'PlayfairDisplay.ttf');

const W = 1200;
const H = 630;

// Brand palette — mirrors og-card.js, grimoire-og.js and styles.css.
const PARCHMENT = '#F4EEE0';
const INK = '#181412';
const WAX_RED = '#c32b39';
const MUTED = '#6b5c52';

// Cover geometry. The source art is 1863x2772; these numbers hold that ratio
// so resvg never stretches it.
const COVER_W = 300;
const COVER_H = Math.round(COVER_W * (2772 / 1863)); // 446
const COVER_X = 812;
const COVER_Y = Math.round((H - COVER_H) / 2); // vertically centred

/**
 * Rasterise an oversized source down to `w`x`h` before embedding it.
 * Base64-inlining the multi-megabyte originals directly makes resvg crawl,
 * so we do the same cheap pre-pass og-card.js does.
 */
function downscaleToDataUri(file, w, h) {
    const mime = path.extname(file).toLowerCase() === '.jpg' ? 'image/jpeg' : 'image/png';
    const raw = `data:${mime};base64,` + fs.readFileSync(file).toString('base64');
    const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">` +
        `<image href="${raw}" x="0" y="0" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice"/></svg>`;
    const png = new Resvg(svg, { fitTo: { mode: 'original' } }).render().asPng();
    return 'data:image/png;base64,' + Buffer.from(png).toString('base64');
}

function buildSvg({ cover, icon, texture }) {
    return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${PARCHMENT}"/>
  <image href="${texture}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice"/>
  <rect width="${W}" height="${H}" fill="#F8F4EB" fill-opacity="0.62"/>
  <rect x="22" y="22" width="${W - 44}" height="${H - 44}" fill="none" stroke="#1e1208" stroke-opacity="0.22" stroke-width="2" rx="16"/>

  <!-- masthead -->
  <image href="${icon}" x="80" y="60" width="48" height="48"/>
  <text x="142" y="94" font-family="Playfair Display" font-size="26" font-weight="700" fill="${INK}" letter-spacing="3">JAKE THE WIZARD</text>

  <!-- title block -->
  <text x="80" y="214" font-family="Playfair Display" font-size="82" font-weight="900" fill="${INK}" letter-spacing="2">EIGHT</text>
  <text x="80" y="292" font-family="Playfair Display" font-size="82" font-weight="900" fill="${INK}" letter-spacing="2">DOMINOES.</text>
  <rect x="80" y="322" width="96" height="6" fill="${WAX_RED}"/>

  <text x="80" y="382" font-family="Playfair Display" font-size="30" font-weight="400" fill="${INK}">A messaging framework that</text>
  <text x="80" y="420" font-family="Playfair Display" font-size="30" font-weight="400" fill="${INK}">compounds into awesome clients.</text>

  <text x="80" y="486" font-family="Playfair Display" font-size="30" font-weight="700" fill="${WAX_RED}">Out now &#183; Paperback &amp; Kindle</text>

  <text x="80" y="562" font-family="Playfair Display" font-size="24" font-weight="700" fill="${MUTED}">jakethewizard.com</text>

  <!-- cover: shadow plate, then the art, unmodified -->
  <rect x="${COVER_X + 8}" y="${COVER_Y + 10}" width="${COVER_W}" height="${COVER_H}" fill="${INK}" fill-opacity="0.20" rx="3"/>
  <image href="${cover}" x="${COVER_X}" y="${COVER_Y}" width="${COVER_W}" height="${COVER_H}"/>
  <rect x="${COVER_X}" y="${COVER_Y}" width="${COVER_W}" height="${COVER_H}" fill="none" stroke="${INK}" stroke-opacity="0.28" stroke-width="2"/>
</svg>`;
}

function main() {
    const coverSrc = path.join(ROOT, 'dev_assets', 'eight-dominoes-cover.jpg');
    for (const f of [FONT, coverSrc]) {
        if (!fs.existsSync(f)) throw new Error(`missing required asset: ${f}`);
    }

    const cover = downscaleToDataUri(coverSrc, COVER_W * 2, COVER_H * 2);
    const icon = downscaleToDataUri(path.join(ROOT, 'dev_assets', 'jake-icon-512.png'), 112, 112);
    const texture = downscaleToDataUri(path.join(ROOT, 'dev_assets', 'wizpaper1.png'), W, H);

    const svg = buildSvg({ cover, icon, texture });
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
        console.log(`[og-card-book] wrote ${path.relative(ROOT, OUT_JPG)} — ${W}x${H}, ${kb} KB`);
    } catch (e) {
        console.warn(`[og-card-book] ffmpeg unavailable (${e.message.split('\n')[0]}) — keeping PNG fallback`);
        console.log(`[og-card-book] wrote ${path.relative(ROOT, OUT_PNG)} — ${W}x${H}, ${(png.length / 1024).toFixed(0)} KB`);
    }
}

main();
