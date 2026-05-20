/**
 * Static site builder for jakethewizard.com.
 *
 * Reads index.html, injects the latest YouTube + TikTok embeds into the
 * placeholder containers, and writes the file back. Designed to run in CI
 * (GitHub Actions / Vercel) on every deploy and on a schedule.
 *
 * Configuration (env vars override defaults):
 *   YOUTUBE_CHANNEL_ID   — YouTube channel to pull the latest video from
 *   TIKTOK_USERNAME      — TikTok creator handle (no @)
 *   INDEX_PATH           — Path to the HTML file to mutate (default ./index.html)
 *   FETCH_TIMEOUT_MS     — Per-request timeout (default 10000)
 *   STRICT               — When "1", abort if injection targets are missing
 */

'use strict';

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const xml2js = require('xml2js');

const CONFIG = {
    youtubeChannelId: process.env.YOUTUBE_CHANNEL_ID || 'UC26G_o-cTFCcPo-CyGf_3YA',
    tiktokUsername: process.env.TIKTOK_USERNAME || 'thewizardmarketing',
    indexPath: path.resolve(process.env.INDEX_PATH || './index.html'),
    fetchTimeoutMs: Number(process.env.FETCH_TIMEOUT_MS) || 10_000,
    strict: process.env.STRICT === '1',
};

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

async function updateIndexHtml() {
    console.log('[build] start', { indexPath: CONFIG.indexPath, strict: CONFIG.strict });

    if (!fs.existsSync(CONFIG.indexPath)) {
        throw new Error(`index file not found: ${CONFIG.indexPath}`);
    }

    let html = fs.readFileSync(CONFIG.indexPath, 'utf8');
    const original = html;

    const hasYt = YT_CONTAINER_RE.test(html);
    const hasTt = TT_CONTAINER_RE.test(html);

    if (!hasYt && !hasTt) {
        console.warn('[build] no feed containers present in index.html — nothing to inject. Exiting cleanly.');
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
        console.log('[build] no changes — index.html already up to date.');
        return;
    }

    fs.writeFileSync(CONFIG.indexPath, html);
    console.log(`[build] updated ${CONFIG.indexPath}`);
}

updateIndexHtml().catch((err) => {
    console.error('[build] failed:', err.message);
    process.exit(1);
});
