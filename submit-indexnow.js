/**
 * submit-indexnow.js — one-shot IndexNow submitter for jakethewizard.com.
 *
 * Reads the LIVE sitemap (the deployed one, which includes every Grimoire post), falling
 * back to the built public/sitemap.xml, then notifies IndexNow (Bing + partners) of every URL so they
 * recrawl promptly instead of waiting for the next scheduled crawl. IndexNow verifies
 * ownership by fetching https://<host>/<key>.txt, which build.js ships to the site root.
 *
 * Usage:  npm run indexnow
 *
 * One-shot by design: a single submission pass, then exit. To submit on a schedule,
 * register `npm run indexnow` as an App (claude-commander → Apps) — do NOT turn this
 * into a long-running poller.
 *
 * Env overrides:
 *   INDEXNOW_KEY   ownership key (default: the committed key)
 *   SITE_HOST      host to submit for (default www.jakethewizard.com)
 *   SITEMAP_URL    remote sitemap to read (default https://<SITE_HOST>/sitemap.xml)
 *   SITEMAP_PATH   fallback local sitemap (default ./public/sitemap.xml — run `npm run build` first)
 */
'use strict';

const fs = require('fs');
const path = require('path');

const KEY = process.env.INDEXNOW_KEY || '32451bfd49b298c9e7229c3f53a31e24';
const HOST = process.env.SITE_HOST || 'www.jakethewizard.com';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const SITEMAP_URL = process.env.SITEMAP_URL || `https://${HOST}/sitemap.xml`;
// Fallback only. The root ./sitemap.xml lists static pages alone; the build copies it to
// public/ and appends the Grimoire posts, so the built file is the complete one.
const SITEMAP_PATH = path.resolve(process.env.SITEMAP_PATH || path.join(__dirname, 'public', 'sitemap.xml'));

/** Pull every <loc> URL out of a sitemap document. */
function extractUrls(xml) {
    const urls = [];
    const re = /<loc>\s*([^<\s]+)\s*<\/loc>/gi;
    let m;
    while ((m = re.exec(xml)) !== null) urls.push(m[1].trim());
    return urls;
}

async function readSitemapXml() {
    try {
        const res = await fetch(SITEMAP_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const xml = await res.text();
        if (!xml.includes('<urlset')) throw new Error('response is not a sitemap');
        console.log(`[indexnow] read live sitemap ${SITEMAP_URL}`);
        return xml;
    } catch (err) {
        console.warn(`[indexnow] live sitemap unavailable (${err.message}); falling back to ${SITEMAP_PATH}`);
    }
    if (!fs.existsSync(SITEMAP_PATH)) throw new Error(`sitemap not found: ${SITEMAP_PATH} (run npm run build first)`);
    return fs.readFileSync(SITEMAP_PATH, 'utf8');
}

async function main() {
    const xml = await readSitemapXml();
    const urlList = extractUrls(xml).filter((u) => u.indexOf(HOST) !== -1);
    if (!urlList.length) {
        console.error(`[indexnow] no URLs for host ${HOST} found in sitemap`);
        process.exit(1);
    }

    const body = {
        host: HOST,
        key: KEY,
        keyLocation: `https://${HOST}/${KEY}.txt`,
        urlList,
    };

    console.log(`[indexnow] submitting ${urlList.length} URLs for ${HOST} …`);
    const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(body),
    });
    const text = await res.text().catch(() => '');

    // 200 = accepted; 202 = accepted, key validation pending.
    if (res.status === 200 || res.status === 202) {
        console.log(`[indexnow] OK (${res.status}) — ${urlList.length} URLs submitted.`);
        return;
    }
    console.error(`[indexnow] failed (${res.status}): ${text || '(no body)'}`);
    process.exit(1);
}

main().catch((err) => {
    console.error('[indexnow] error:', err.message);
    process.exit(1);
});
