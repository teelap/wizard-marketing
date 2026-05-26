/**
 * Static site builder for jakethewizard.com.
 *
 * 1. Injects the latest YouTube + TikTok embeds into index.html (in place),
 *    if the placeholder containers exist.
 * 2. Assembles a clean public/ directory containing only the files that
 *    should be deployed. Vercel/Netlify publish from public/.
 *
 * Configuration (env vars override defaults):
 *   YOUTUBE_CHANNEL_ID   YouTube channel ID to pull the latest video from
 *   TIKTOK_USERNAME      TikTok creator handle (no @)
 *   INDEX_PATH           Path to the HTML file to mutate (default ./index.html)
 *   FETCH_TIMEOUT_MS     Per-request timeout (default 10000)
 *   STRICT               When "1", abort if injection targets are missing
 *   OUTPUT_DIR           Output directory (default ./public)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const xml2js = require('xml2js');

const ROOT = __dirname;

const CONFIG = {
    youtubeChannelId: process.env.YOUTUBE_CHANNEL_ID || 'UC26G_o-cTFCcPo-CyGf_3YA',
    tiktokUsername: process.env.TIKTOK_USERNAME || 'thewizardmarketing',
    indexPath: path.resolve(process.env.INDEX_PATH || path.join(ROOT, 'index.html')),
    outputDir: path.resolve(process.env.OUTPUT_DIR || path.join(ROOT, 'public')),
    fetchTimeoutMs: Number(process.env.FETCH_TIMEOUT_MS) || 10_000,
    strict: process.env.STRICT === '1',
};

const PUBLIC_FILES = [
    'index.html',
    'links.html',
    'consulting.html',
    'mastermind.html',
    'book.html',
    'podcast-guest.html',
    'tools.html',
    'styles.css',
    'script.js',
    'parchment-bg-v4.jpg',
    'robots.txt',
    'sitemap.xml',
    'site.webmanifest',
];

const PUBLIC_DIRS = ['dev_assets'];

const YT_CONTAINER_RE = /<div class="video-wrapper" id="youtube-feed-container">[\s\S]*?<\/div>/;
const TT_CONTAINER_RE = /<div class="video-wrapper tiktok-wrapper" id="tiktok-feed-container">[\s\S]*?<\/div>/;

async function getLatestYouTubeVideoId() {
    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(CONFIG.youtubeChannelId)}`;
    console.log(`[yt] fetching ${url}`);
    const response = await axios.get(url, {
        timeout: CONFIG.fetchTimeoutMs,
        headers: { 'User-Agent': 'wizard-marketing-build/1.0' },
        validateStatus: (s) => s >= 200 && s < 300,
    });

    const result = await new xml2js.Parser().parseStringPromise(response.data);
    const entry = result?.feed?.entry?.[0];
    const videoId = entry?.['yt:videoId']?.[0];
    if (!videoId) {
        throw new Error('YouTube RSS returned no entries with yt:videoId');
    }
    console.log(`[yt] latest video id: ${videoId}`);
    return videoId;
}

function buildTikTokEmbed(username) {
    return `
        <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@${username}" data-unique-id="${username}" data-embed-type="creator" style="max-width: 780px; min-width: 288px;">
            <section><a target="_blank" rel="noopener" href="https://www.tiktok.com/@${username}?refer=creator_embed">@${username}</a></section>
        </blockquote>
        <script async src="https://www.tiktok.com/embed.js"></script>
    `.trim();
}

function injectFeed(html, regex, replacement, label) {
    if (!regex.test(html)) {
        const msg = `[build] target container "${label}" not found in ${CONFIG.indexPath}`;
        if (CONFIG.strict) throw new Error(msg);
        console.warn(`${msg} — skipping (set STRICT=1 to fail).`);
        return { html, changed: false };
    }
    return { html: html.replace(regex, replacement), changed: true };
}

async function injectFeeds() {
    if (!fs.existsSync(CONFIG.indexPath)) {
        throw new Error(`index file not found: ${CONFIG.indexPath}`);
    }

    let html = fs.readFileSync(CONFIG.indexPath, 'utf8');
    const original = html;

    const hasYt = YT_CONTAINER_RE.test(html);
    const hasTt = TT_CONTAINER_RE.test(html);

    if (!hasYt && !hasTt) {
        console.warn('[build] no feed containers present in index.html — nothing to inject.');
        if (CONFIG.strict) throw new Error('STRICT=1 and no feed containers found');
        return;
    }

    if (hasYt) {
        const videoId = await getLatestYouTubeVideoId();
        const replacement = `<div class="video-wrapper" id="youtube-feed-container">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" title="Jake Tlapek YouTube Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
            </div>`;
        ({ html } = injectFeed(html, YT_CONTAINER_RE, replacement, 'youtube-feed-container'));
    }

    if (hasTt) {
        const embed = buildTikTokEmbed(CONFIG.tiktokUsername);
        const replacement = `<div class="video-wrapper tiktok-wrapper" id="tiktok-feed-container">
                ${embed}
            </div>`;
        ({ html } = injectFeed(html, TT_CONTAINER_RE, replacement, 'tiktok-feed-container'));
    }

    if (html === original) {
        console.log('[build] no changes to index.html.');
        return;
    }

    fs.writeFileSync(CONFIG.indexPath, html);
    console.log(`[build] updated ${CONFIG.indexPath}`);
}

function assemblePublic() {
    fs.rmSync(CONFIG.outputDir, { recursive: true, force: true });
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });

    for (const file of PUBLIC_FILES) {
        const src = path.join(ROOT, file);
        const dest = path.join(CONFIG.outputDir, file);
        if (!fs.existsSync(src)) {
            console.warn(`[copy] missing source file: ${file} — skipping`);
            continue;
        }
        fs.copyFileSync(src, dest);
        console.log(`[copy] ${file}`);
    }

    for (const dir of PUBLIC_DIRS) {
        const src = path.join(ROOT, dir);
        const dest = path.join(CONFIG.outputDir, dir);
        if (!fs.existsSync(src)) {
            console.warn(`[copy] missing source dir: ${dir} — skipping`);
            continue;
        }
        fs.cpSync(src, dest, { recursive: true });
        console.log(`[copy] ${dir}/ (recursive)`);
    }
}

async function main() {
    console.log('[build] start', {
        indexPath: CONFIG.indexPath,
        outputDir: CONFIG.outputDir,
        strict: CONFIG.strict,
    });

    await injectFeeds();
    assemblePublic();

    console.log(`[build] done — output written to ${CONFIG.outputDir}`);
}

main().catch((err) => {
    console.error('[build] failed:', err.message);
    process.exit(1);
});
