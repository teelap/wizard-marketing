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
    tiktokUsername: process.env.TIKTOK_USERNAME || 'itsjakethewizard',
    indexPath: path.resolve(process.env.INDEX_PATH || path.join(ROOT, 'index.html')),
    outputDir: path.resolve(process.env.OUTPUT_DIR || path.join(ROOT, 'public')),
    fetchTimeoutMs: Number(process.env.FETCH_TIMEOUT_MS) || 10_000,
    strict: process.env.STRICT === '1',
    // Google Tag Manager container ID. Override via env until the real container
    // exists; the placeholder loads nothing (harmless 404) so builds stay safe.
    gtmContainerId: process.env.GTM_CONTAINER_ID || 'GTM-TLXMBN8B',
    // Microsoft Clarity project ID (heatmaps + session recordings). Injected into
    // every page's <head>; consent is driven through WizAnalytics in analytics.js,
    // so Clarity follows the same Accept/Decline decision as GA. Set to '' to skip.
    clarityProjectId: process.env.CLARITY_PROJECT_ID || 'x3vtfizvve',
};

const PUBLIC_FILES = [
    'index.html',
    'workshop.html',
    'links.html',
    'consulting.html',
    'mastermind.html',
    'eight-dominoes.html',
    'podcast-guest.html',
    'tools.html',
    'privacy.html',
    'terms.html',
    'cookies.html',
    'ai-information.html',
    'styles.css',
    'script.js',
    'cookie-consent.js',
    'analytics.js',
    'scene.css',
    'scene.js',
    'workshop.css',
    'workshop.js',
    'parchment-bg-v4.jpg',
    'robots.txt',
    'sitemap.xml',
    'site.webmanifest',
    // IndexNow ownership key — must be served at the site root so Bing can verify
    // submissions made via `npm run indexnow`.
    '32451bfd49b298c9e7229c3f53a31e24.txt',
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
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}?enablejsapi=1" title="Jake Tlapek YouTube Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
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

// EEA + UK + Switzerland: Consent Mode defaults are strict here — analytics AND
// ads are denied until the visitor explicitly accepts. Everywhere else (US et al.)
// analytics AND ads are granted by default so the Meta Pixel, Conversions API, and
// Google Ads signals fire immediately for non-EEA traffic; visitors who Decline are
// then honoured (all storage denied). This mirrors the "maximize signal, stay legal"
// posture: most data the law allows, with a hard wall around the strict regions.
const STRICT_CONSENT_REGIONS = [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU',
    'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES',
    'SE', 'IS', 'LI', 'NO', 'GB', 'CH',
];

function clarityBlock(clarityId) {
    if (!clarityId) return '';
    // Standard Clarity loader. window.clarity is queued synchronously here, so the
    // consent calls wired into WizAnalytics (analytics.js) are safe to fire before
    // the external tag finishes loading. Clarity masks all page content by default.
    return `
<!-- Microsoft Clarity -->
<script>(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,'clarity','script','${clarityId}');</script>
<!-- End Microsoft Clarity -->`;
}

function analyticsHeadBlock(gtmId, clarityId) {
    const regions = JSON.stringify(STRICT_CONSENT_REGIONS);
    return `<!-- wiz-analytics-bootstrap: Consent Mode v2 + dataLayer + GTM -->
<script>
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted',functionality_storage:'granted',security_storage:'granted'});
gtag('consent','default',{region:${regions},ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',true);
</script>
<script defer src="/analytics.js?v=4"></script>
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');</script>
<!-- End Google Tag Manager -->${clarityBlock(clarityId)}`;
}

function analyticsNoscript(gtmId) {
    return `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden" title="gtm"></iframe></noscript>`;
}

/**
 * Inject the GTM + Consent Mode + analytics bootstrap into every built HTML page.
 * Idempotent: a page that already carries the marker is left untouched, so the
 * source files stay clean and only the deployed `public/` copies get tracking.
 */
function injectAnalytics() {
    const headBlock = analyticsHeadBlock(CONFIG.gtmContainerId, CONFIG.clarityProjectId);
    const noscript = analyticsNoscript(CONFIG.gtmContainerId);
    const htmlFiles = PUBLIC_FILES.filter((f) => f.endsWith('.html'));

    for (const file of htmlFiles) {
        const dest = path.join(CONFIG.outputDir, file);
        if (!fs.existsSync(dest)) continue;

        let html = fs.readFileSync(dest, 'utf8');
        if (html.includes('wiz-analytics-bootstrap')) {
            console.log(`[analytics] already present → ${file}`);
            continue;
        }
        if (!/<head[^>]*>/i.test(html) || !/<body[^>]*>/i.test(html)) {
            console.warn(`[analytics] no <head>/<body> in ${file} — skipping`);
            continue;
        }
        html = html.replace(/<head[^>]*>/i, (m) => `${m}\n${headBlock}`);
        html = html.replace(/<body[^>]*>/i, (m) => `${m}\n    ${noscript}`);
        fs.writeFileSync(dest, html);
        console.log(`[analytics] injected (${CONFIG.gtmContainerId}) → ${file}`);
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
    injectAnalytics();

    console.log(`[build] done — output written to ${CONFIG.outputDir}`);
}

main().catch((err) => {
    console.error('[build] failed:', err.message);
    process.exit(1);
});
