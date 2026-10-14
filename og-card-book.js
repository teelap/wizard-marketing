/**
 * Eight Dominoes share-card generator.
 *
 * Renders the 1200x630 OG/Twitter card for /eight-dominoes and /media-kit:
 * the book counterpart to og-card.js (the default card for every other page),
 * drawn in the same schoolhouse style so the site's share images match.
 *
 * The cover art is dropped in unmodified: the media kit's usage terms ask
 * that it not be cropped or recoloured, so it sits whole inside an ink frame.
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
const FONTS = ['Fraunces-Black-Soft.ttf', 'Nunito-Black.ttf'].map((f) => path.join(ROOT, 'assets', 'fonts', f));
const COVER = path.join(ROOT, 'dev_assets', 'eight-dominoes-cover.jpg');

const W = 1200;
const H = 630;

// Palette + rainbow order from the summit deck (build_deck.py); mirrors og-card.js and schoolhouse.css.
const INK = '#1B1A17';
const CREAM = '#FFF1D6';
const YELLOW = '#FFC928';
const PINK = '#F6A8CB';
const RAINBOW = ['#12A4A4', '#F6A8CB', '#E5322B', '#FF9473', '#FFC928', '#17271F', '#91DE87', '#8B1D3D', '#5DB6EC'];
const LETTERS = ['#E5322B', '#FF7A33', '#FFC928', '#91DE87', '#5DB6EC', '#F6A8CB', '#12A4A4']; // rainbow-word cycle
const DISPLAY = 'Fraunces 144pt SuperSoft Wonky';
const BODY = 'Nunito';

// Cover geometry. The source art is 1863x2772; these numbers hold that ratio so resvg never stretches it.
const COVER_W = 290;
const COVER_H = Math.round(COVER_W * (2772 / 1863)); // 432
const COVER_X = 824;
const COVER_Y = 74;

/** Downscale an oversized source before embedding it (base64-inlining multi-megabyte originals makes resvg crawl). */
function downscaleToDataUri(file, w, h) {
    const mime = path.extname(file).toLowerCase() === '.jpg' ? 'image/jpeg' : 'image/png';
    const raw = `data:${mime};base64,` + fs.readFileSync(file).toString('base64');
    const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">` +
        `<image href="${raw}" x="0" y="0" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice"/></svg>`;
    const png = new Resvg(svg, { fitTo: { mode: 'original' } }).render().asPng();
    return 'data:image/png;base64,' + Buffer.from(png).toString('base64');
}

function bendSvg() {
    const w = 12, n = RAINBOW.length, o = 6, r0 = 40, xl = 36, yb = H - 34;
    const R = r0 + n * w, cx = xl + R, cy = yb - R;
    const d = (r) => `M ${cx - r} -20 L ${cx - r} ${cy} A ${r} ${r} 0 0 0 ${cx} ${cy + r} L ${W + 20} ${cy + r}`;
    return `<path d="${d(r0 + n * w / 2)}" stroke="${INK}" stroke-width="${n * w + 2 * o}" fill="none"/>` +
        RAINBOW.map((c, i) => `<path d="${d(R - (i + 0.5) * w)}" stroke="${c}" stroke-width="${w + 0.6}" fill="none"/>`).join('');
}

function burstPoints(cx, cy, r1, r2, n) {
    const pts = [];
    for (let i = 0; i < 2 * n; i++) {
        const r = i % 2 ? r2 : r1, a = Math.PI * i / n;
        pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
    }
    return pts.join(' ');
}

/** The site's rainbow word: coloured letters inside a thick ink outline, with a hard drop shadow. */
function rainbowWord(word, x, y, size) {
    const attrs = `x="${x}" y="${y}" font-family="${DISPLAY}" font-size="${size}" font-weight="900"`;
    let k = 0;
    const spans = [...word].map((ch) => {
        const fill = /\p{L}/u.test(ch) ? LETTERS[k++ % LETTERS.length] : INK;
        return `<tspan fill="${fill}">${ch}</tspan>`;
    }).join('');
    const o = Math.round(size * 0.075);
    return `<text ${attrs} fill="${INK}" stroke="${INK}" stroke-width="${Math.round(size * 0.11)}" stroke-linejoin="round" transform="translate(${o} ${o})">${word}</text>` +
        `<text ${attrs} fill="${INK}" stroke="${INK}" stroke-width="${Math.round(size * 0.11)}" stroke-linejoin="round">${word}</text>` +
        `<text ${attrs}>${spans}</text>`;
}

function buildSvg({ cover }) {
    const burst = burstPoints(712, 158, 80, 65, 16);
    return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${CREAM}"/>
  ${bendSvg()}

  <!-- cover, unmodified, in an ink frame with a hard shadow -->
  <g transform="rotate(3 ${COVER_X + COVER_W / 2} ${COVER_Y + COVER_H / 2})">
    <rect x="${COVER_X + 14}" y="${COVER_Y + 14}" width="${COVER_W}" height="${COVER_H}" rx="6" fill="${INK}"/>
    <image href="${cover}" x="${COVER_X}" y="${COVER_Y}" width="${COVER_W}" height="${COVER_H}"/>
    <rect x="${COVER_X}" y="${COVER_Y}" width="${COVER_W}" height="${COVER_H}" rx="6" fill="none" stroke="${INK}" stroke-width="6"/>
  </g>

  <!-- "Free on Kindle Unlimited" starburst beside the title (kept off the cover art) -->
  <g transform="rotate(10 712 158)">
    <polygon points="${burst}" fill="${INK}" transform="translate(8 8)"/>
    <polygon points="${burst}" fill="${PINK}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <text x="708" y="144" text-anchor="middle" font-family="${BODY}" font-size="15" font-weight="900" fill="${INK}" letter-spacing="2">FREE ON</text>
    <text x="708" y="170" text-anchor="middle" font-family="${DISPLAY}" font-size="24" font-weight="900" fill="${INK}">Kindle</text>
    <text x="708" y="194" text-anchor="middle" font-family="${DISPLAY}" font-size="24" font-weight="900" fill="${INK}">Unlimited</text>
  </g>

  <!-- kicker + title + one plain line -->
  <rect x="196" y="62" width="356" height="50" rx="25" fill="${INK}"/>
  <text x="220" y="95" font-family="${BODY}" font-size="21" font-weight="900" fill="${CREAM}" letter-spacing="3">THE BOOK · OUT NOW</text>
  <text x="194" y="226" font-family="${DISPLAY}" font-size="104" font-weight="900" fill="${INK}">Eight</text>
  ${rainbowWord('Dominoes.', 196, 330, 104)}
  <text x="198" y="392" font-family="${BODY}" font-size="27" font-weight="900" fill="${INK}">A messaging framework that</text>
  <text x="198" y="428" font-family="${BODY}" font-size="27" font-weight="900" fill="${INK}">compounds into awesome clients.</text>
  <text x="198" y="474" font-family="${BODY}" font-size="23" font-weight="900" fill="${INK}" fill-opacity="0.72">By Jake Tlapek · Paperback and Kindle</text>

  <!-- URL sticker on the band -->
  <g transform="rotate(-3 640 548)">
    <rect x="452" y="515" width="400" height="70" rx="35" fill="${INK}"/>
    <rect x="442" y="505" width="400" height="70" rx="35" fill="${YELLOW}" stroke="${INK}" stroke-width="5"/>
    <text x="642" y="552" text-anchor="middle" font-family="${DISPLAY}" font-size="28" font-weight="900" fill="${INK}">jakethewizard.com/book</text>
  </g>
</svg>`;
}

function main() {
    for (const f of [...FONTS, COVER]) {
        if (!fs.existsSync(f)) throw new Error(`missing required asset: ${f}`);
    }

    const svg = buildSvg({ cover: downscaleToDataUri(COVER, COVER_W * 2, COVER_H * 2) });
    const png = new Resvg(svg, {
        font: { fontFiles: FONTS, loadSystemFonts: false, defaultFontFamily: BODY },
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
