/**
 * Site-wide social-share card generator.
 *
 * Renders the 1200x630 OG/Twitter card used by every top-level page
 * (index, consulting, eight-dominoes, tools, mastermind, podcast-guest, …).
 * The Grimoire generates its own per-post cards in grimoire-og.js; this is the
 * default card for everything else, drawn in the same schoolhouse style (the
 * summit deck's look) so the two systems match.
 *
 * Why 1200x630: every page declares twitter:card=summary_large_image, which
 * expects a 1.91:1 image. The previous default was a square 1224x1224 headshot,
 * so X/LinkedIn letterboxed or centre-cropped it.
 *
 * Run manually after changing the headshot or the copy below:
 *     node og-card.js
 *
 * Output: dev_assets/jake-og-card-2026.jpg (committed; dev_assets/ is copied into
 * the deploy by build.js). JPEG, not PNG: the rainbow-wall photo is photographic,
 * so PNG lands far heavier where JPEG holds the same quality. Needs ffmpeg on PATH
 * (it also decodes the WebP photo); without it the script stops with an error.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { Resvg } = require('@resvg/resvg-js');

const ROOT = __dirname;
const OUT_JPG = path.join(ROOT, 'dev_assets', 'jake-og-card-2026.jpg');
const OUT_PNG = path.join(ROOT, 'dev_assets', 'jake-og-card-2026.png');
const FONTS = ['Fraunces-Black-Soft.ttf', 'Nunito-Black.ttf'].map((f) => path.join(ROOT, 'assets', 'fonts', f));
const PHOTO = path.join(ROOT, 'dev_assets', 'photos', 'jake-rainbow-wall-5686-1600.webp');

const W = 1200;
const H = 630;

// Palette + rainbow order from the summit deck (build_deck.py); mirrors grimoire-og.js.
const INK = '#1B1A17';
const CREAM = '#FFF1D6';
const YELLOW = '#FFC928';
const RED = '#E5322B';
const PINK = '#F6A8CB';
const RAINBOW = ['#12A4A4', '#F6A8CB', '#E5322B', '#FF9473', '#FFC928', '#17271F', '#91DE87', '#8B1D3D', '#5DB6EC'];
const DISPLAY = 'Fraunces 144pt SuperSoft Wonky';
const BODY = 'Nunito';

/** WebP -> PNG data URI via ffmpeg (resvg only reads PNG/JPEG reliably). Piped, so no temp file. */
function photoDataUri(file) {
    const png = execFileSync('ffmpeg', ['-loglevel', 'error', '-i', file, '-vf', 'scale=900:-1', '-f', 'image2pipe', '-vcodec', 'png', '-'],
        { maxBuffer: 64 * 1024 * 1024 });
    return 'data:image/png;base64,' + png.toString('base64');
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

function buildSvg({ photo }) {
    // TV-framed photo on the right, copy column from x=196.
    const tx = 712, ty = 58, tw = 420, th = 372, tr = 34;
    const burst = burstPoints(742, 430, 86, 70, 16);
    return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="tv"><rect x="${tx}" y="${ty}" width="${tw}" height="${th}" rx="${tr}"/></clipPath>
  </defs>
  <rect width="${W}" height="${H}" fill="${CREAM}"/>
  ${bendSvg()}

  <!-- photo in a TV frame -->
  <g transform="rotate(2 ${tx + tw / 2} ${ty + th / 2})">
    <rect x="${tx + 14}" y="${ty + 14}" width="${tw}" height="${th}" rx="${tr}" fill="${INK}"/>
    <rect x="${tx}" y="${ty}" width="${tw}" height="${th}" rx="${tr}" fill="${INK}"/>
    <image href="${photo}" x="${tx - 60}" y="${ty}" width="${tw + 120}" height="${th}" preserveAspectRatio="xMidYMid slice" clip-path="url(#tv)"/>
    <rect x="${tx}" y="${ty}" width="${tw}" height="${th}" rx="${tr}" fill="none" stroke="${INK}" stroke-width="8"/>
  </g>

  <!-- "Author of Eight Dominoes" starburst -->
  <g transform="rotate(-10 742 430)">
    <polygon points="${burst}" fill="${INK}" transform="translate(8 8)"/>
    <polygon points="${burst}" fill="${PINK}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <text x="737" y="420" text-anchor="middle" font-family="${BODY}" font-size="15" font-weight="900" fill="${INK}" letter-spacing="2">AUTHOR OF</text>
    <text x="737" y="446" text-anchor="middle" font-family="${DISPLAY}" font-size="24" font-weight="900" fill="${INK}">Eight</text>
    <text x="737" y="470" text-anchor="middle" font-family="${DISPLAY}" font-size="24" font-weight="900" fill="${INK}">Dominoes</text>
  </g>

  <!-- kicker + name + role -->
  <rect x="196" y="62" width="300" height="50" rx="25" fill="${INK}"/>
  <text x="220" y="95" font-family="${BODY}" font-size="21" font-weight="900" fill="${CREAM}" letter-spacing="3">JAKE THE WIZARD</text>
  <text x="194" y="236" font-family="${DISPLAY}" font-size="96" font-weight="900" fill="${INK}">Jake</text>
  <text x="194" y="324" font-family="${DISPLAY}" font-size="96" font-weight="900" fill="${INK}">Tlapek</text>
  <text x="198" y="378" font-family="${DISPLAY}" font-size="36" font-weight="900" fill="${RED}">The Wizard of Marketing</text>

  <!-- proof lines -->
  <text x="198" y="424" font-family="${BODY}" font-size="25" font-weight="900" fill="${INK}">13 years in the trenches.</text>
  <text x="198" y="456" font-family="${BODY}" font-size="25" font-weight="900" fill="${INK}">$100M+ in measurable revenue.</text>

  <!-- URL sticker on the band -->
  <g transform="rotate(-3 990 520)">
    <rect x="828" y="487" width="336" height="70" rx="35" fill="${INK}"/>
    <rect x="818" y="477" width="336" height="70" rx="35" fill="${YELLOW}" stroke="${INK}" stroke-width="5"/>
    <text x="986" y="524" text-anchor="middle" font-family="${DISPLAY}" font-size="30" font-weight="900" fill="${INK}">jakethewizard.com</text>
  </g>
</svg>`;
}

function main() {
    for (const f of [...FONTS, PHOTO]) {
        if (!fs.existsSync(f)) throw new Error(`missing required asset: ${f}`);
    }

    const svg = buildSvg({ photo: photoDataUri(PHOTO) });
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
        console.log(`[og-card] wrote ${path.relative(ROOT, OUT_JPG)} — ${W}x${H}, ${kb} KB`);
    } catch (e) {
        console.warn(`[og-card] ffmpeg unavailable (${e.message.split('\n')[0]}) — keeping PNG fallback`);
        console.log(`[og-card] wrote ${path.relative(ROOT, OUT_PNG)} — ${W}x${H}, ${(png.length / 1024).toFixed(0)} KB`);
    }
}

main();
