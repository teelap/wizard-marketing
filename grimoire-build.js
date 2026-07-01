/**
 * The Grimoire — content build step for jakethewizard.com.
 *
 * Reads Markdown essays from content/grimoire/*.md and emits, into public/:
 *   - grimoire/<slug>.html   styled, SEO-ready article pages
 *   - grimoire/index.html    the hub (featured + card grid)
 *   - grimoire/feed.xml      an RSS 2.0 feed
 * and injects <url> entries into public/sitemap.xml.
 *
 * No framework. Plain string templates, the same approach build.js already uses.
 * Every asset/link is ROOT-ABSOLUTE ("/styles.css", not "styles.css") because
 * posts are served from a subdirectory (/grimoire/<slug>) under Vercel cleanUrls.
 *
 * Returns the list of generated .html paths so build.js can run the shared
 * analytics/GTM injection over them too.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const MarkdownIt = require('markdown-it');
const { generateCard } = require('./grimoire-og');

const md = new MarkdownIt({
    html: true,         // posts are trusted (authored by Jake); allow raw HTML
    linkify: true,
    typographer: true,  // curly quotes + proper dashes — the "elegant" default
    breaks: false,
});

// Frontmatter fields (e.g. the lead standfirst) render inline WITHOUT raw HTML,
// so a stray tag in the YAML header can never inject markup into the page.
const mdInline = new MarkdownIt({ html: false, linkify: true, typographer: true });

const SITE = {
    origin: process.env.SITE_ORIGIN || 'https://www.jakethewizard.com',
    hubPath: '/grimoire',
    hubTitle: 'The Grimoire',
    // Short brand suffix for the <title> tag (the H1 stays creative; this keeps
    // SERP titles concise and keyword-first). ~18 chars.
    titleSuffix: ' | Jake the Wizard',
    standfirst:
        'Marketing truths, teardowns, and the occasional spell. The thinking behind the sequence, written down. No fluff.',
    formspree: 'https://formspree.io/f/xzdjjjlo',
    defaultImage: '/dev_assets/jake-headshot.png',
    includeDrafts: process.env.GRIMOIRE_DRAFTS === '1',
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

/* ─── small helpers ─────────────────────────────────────────── */

function esc(s) {
    return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function toISODate(v) {
    if (!v) return null;
    if (v instanceof Date) return v.toISOString().slice(0, 10);
    const s = String(v).trim();
    const m = s.match(/^\d{4}-\d{2}-\d{2}/);
    if (m) return m[0];
    const d = new Date(s);
    return isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

function prettyDate(iso) {
    if (!iso) return '';
    const [y, m, d] = iso.split('-').map(Number);
    if (!y || !m || !d) return '';
    return `${MONTHS[m - 1]} ${d}, ${y}`;
}

function toRFC822(iso) {
    if (!iso) return '';
    const d = new Date(iso + 'T12:00:00Z');
    return isNaN(d.getTime()) ? '' : d.toUTCString();
}

function absUrl(p) {
    if (!p) return '';
    if (/^https?:\/\//i.test(p)) return p;
    return SITE.origin + (p.startsWith('/') ? p : '/' + p);
}

function rootPath(p) {
    if (!p) return '';
    if (/^https?:\/\//i.test(p)) return p;
    return p.startsWith('/') ? p : '/' + p;
}

function mdToPlain(s) {
    return String(s == null ? '' : s)
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[*_`~]/g, '')
        .replace(/\s+/g, ' ').trim();
}

function jsonLdScript(obj) {
    const json = JSON.stringify(obj, null, 2).replace(/</g, '\\u003c');
    return `<script type="application/ld+json">\n${json}\n</script>`;
}

/* ─── read + parse posts ────────────────────────────────────── */

function readPosts(contentDir) {
    if (!fs.existsSync(contentDir)) return [];
    const files = fs.readdirSync(contentDir).filter(
        // posts only: skip underscore-prefixed drafts and ALL-CAPS docs (README, CONTENT_RULES)
        (f) => f.endsWith('.md') && !f.startsWith('_') &&
            f.toLowerCase() !== 'readme.md' && !/^[A-Z0-9_]+\.md$/.test(f)
    );

    const posts = files.map((file) => {
        const raw = fs.readFileSync(path.join(contentDir, file), 'utf8');
        const { data, content } = matter(raw);
        const slug = String(data.slug || file.replace(/\.md$/i, '')).trim()
            .toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
            .replace(/-+/g, '-').replace(/^-|-$/g, '');
        if (!slug) throw new Error(`[grimoire] could not derive a valid slug from: ${file}`);
        const bodyHtml = md.render(content);
        const words = content.replace(/```[\s\S]*?```/g, ' ').replace(/[#>*_`~\-]/g, ' ')
            .split(/\s+/).filter(Boolean).length;
        const readMinutes = Number(data.readMinutes) || Math.max(1, Math.round(words / 200));
        const date = toISODate(data.date);
        return {
            slug,
            title: String(data.title || slug).trim(),
            // Optional concise SEO title for the <title> tag; falls back to title.
            metaTitle: String(data.metaTitle || '').trim(),
            description: String(data.description || data.excerpt || '').trim(),
            excerpt: String(data.excerpt || data.description || '').trim(),
            lead: String(data.lead || '').trim(),
            category: String(data.category || 'Marketing').trim(),
            date,
            updated: toISODate(data.updated) || date,
            cover: data.cover ? String(data.cover).trim() : null,
            coverAlt: String(data.coverAlt || data.title || '').trim(),
            youtube: data.youtube ? String(data.youtube).trim() : null,
            draft: data.draft === true,
            readMinutes,
            faq: Array.isArray(data.faq)
                ? data.faq.map((it) => ({ q: String((it && it.q) || '').trim(), a: String((it && it.a) || '').trim() })).filter((x) => x.q && x.a)
                : [],
            bodyHtml,
            url: `${SITE.hubPath}/${slug}`,
        };
    }).filter((p) => SITE.includeDrafts || !p.draft);

    posts.sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
    return posts;
}

/* ─── shared chrome ─────────────────────────────────────────── */

function navHtml() {
    return `    <nav id="navbar" class="pill-nav">
        <div class="nav-content">
            <a href="/" class="logo"><img src="/dev_assets/jake-icon-180.png" alt="Jake Tlapek" class="nav-logo-icon"> THE WIZARD</a>
            <button class="menu-toggle" id="mobile-menu" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="primary-nav">
                <i class="fas fa-bars" aria-hidden="true"></i>
            </button>
            <ul id="primary-nav" class="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/consulting">Consulting</a></li>
                <li><a href="/mastermind">Arcanum</a></li>
                <li><a href="/eight-dominoes">Eight Dominoes</a></li>
                <li><a href="/podcast-guest">Podcast</a></li>
                <li><a href="/tools">Tools</a></li>
                <li><a href="/grimoire" aria-current="page">Grimoire</a></li>
            </ul>
        </div>
    </nav>`;
}

function footerHtml() {
    const link = (href, label) =>
        `<a href="${href}" class="text-night" style="margin:0 0.75rem; font-size:0.8rem;">${label}</a>`;
    return `    <footer class="dark-theme-section">
        <div class="container center-text">
            <div class="footer-logo ink-stamp text-night">The Wizard</div>
            <p class="text-night">&copy; <span id="footer-year">2026</span> Jake Tlapek. All rights reserved. Built with scars.</p>
            <nav aria-label="Footer navigation" style="margin-top:1rem;">
                ${link('/', 'Home')}
                ${link('/consulting', 'Consulting')}
                ${link('/mastermind', 'Arcanum')}
                ${link('/eight-dominoes', 'Eight Dominoes')}
                ${link('/podcast-guest', 'Podcast')}
                ${link('/tools', 'Tools')}
                ${link('/grimoire', 'Grimoire')}
            </nav>
            <nav class="footer-legal" aria-label="Legal links">
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms &amp; Conditions</a>
                <a href="/cookies">Cookie Policy</a>
                <a href="/ai-information">AI Information</a>
            </nav>
        </div>
    </footer>`;
}

function scriptsHtml() {
    return `    <script defer src="/script.js?v=7.6"></script>
    <script defer src="/cookie-consent.js?v=2"></script>
    <script defer src="/grimoire.js?v=1"></script>`;
}

function headHtml({ title, ogTitle, description, canonical, ogType, image, imageW, imageH, imageAlt, articleMeta, jsonLd }) {
    const img = absUrl(image || SITE.defaultImage);
    const ogDims = imageW && imageH ? `\n    <meta property="og:image:width" content="${imageW}">\n    <meta property="og:image:height" content="${imageH}">` : '';
    const altText = esc(imageAlt || ogTitle || title);
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}">
    <meta name="author" content="Jake Tlapek">
    <meta name="theme-color" content="#181412">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${esc(canonical)}" />
    <link rel="icon" type="image/png" sizes="32x32" href="/dev_assets/jake-icon-32.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/dev_assets/jake-icon-180.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="alternate" type="application/rss+xml" title="The Grimoire — Jake Tlapek" href="/grimoire/feed.xml">

    <!-- Open Graph -->
    <meta property="og:type" content="${ogType || 'website'}">
    <meta property="og:url" content="${esc(canonical)}">
    <meta property="og:title" content="${esc(ogTitle || title)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:image" content="${esc(img)}">${ogDims}
    <meta property="og:image:alt" content="${altText}">
    <meta property="og:site_name" content="Jake Tlapek — The Wizard of Marketing">
${articleMeta || ''}
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:title" content="${esc(ogTitle || title)}">
    <meta property="twitter:description" content="${esc(description)}">
    <meta property="twitter:image" content="${esc(img)}">
    <meta property="twitter:image:alt" content="${altText}">

    <link rel="stylesheet" href="/styles.css?v=8.5">
    <link rel="stylesheet" href="/grimoire.css?v=3">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=IM+Fell+English:ital@0;1&display=swap" rel="stylesheet">
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha384-iw3OoTErCYJJB9mCa8LNS2hbsQ7M3C0EpIsO/H5+EGAkPGc6rk+V8i04oW/K5xq0"
          crossorigin="anonymous"
          referrerpolicy="no-referrer">

    ${jsonLd || ''}
</head>`;
}

function page({ head, main }) {
    return `${head}
<body class="parchment-theme">

${navHtml()}

${main}

${footerHtml()}

${scriptsHtml()}
</body>
</html>
`;
}

/* ─── reusable fragments ────────────────────────────────────── */

function ctaHtml() {
    return `<aside class="grimoire-cta" aria-label="Subscribe to Jake's weekly email">
    <p class="grimoire-cta-kicker">The Weekly Truth</p>
    <h2 class="grimoire-cta-title">One marketing truth a week. No fluff.</h2>
    <p class="grimoire-cta-sub">The sequence, not the noise. Unsubscribe anytime.</p>
    <form class="grimoire-cta-form" action="${SITE.formspree}" method="POST">
        <input type="hidden" name="_form_type" value="grimoire">
        <input type="hidden" name="_subject" value="The Grimoire — Newsletter Signup">
        <input type="email" name="email" required autocomplete="email" placeholder="Your best email" aria-label="Your email address">
        <button type="submit" class="btn btn-primary">Send Me the Truth</button>
    </form>
</aside>`;
}

function videoFacadeHtml(id, title) {
    const safeId = esc(id);
    return `<div class="yt-embed">
    <button type="button" class="yt-facade" data-yt-id="${safeId}" data-yt-title="${esc(title)} — play video" aria-label="Play video: ${esc(title)}" style="background-image:url('https://i.ytimg.com/vi/${safeId}/hqdefault.jpg')">
        <span class="yt-play" aria-hidden="true"></span>
    </button>
</div>`;
}

function typeTag(post) {
    return post.youtube
        ? `<span class="grimoire-type"><i class="fas fa-play" aria-hidden="true"></i> Watch + Read</span>`
        : `<span class="grimoire-type">Essay</span>`;
}

function cardHtml(post, { featured } = {}) {
    const classes = ['grimoire-card'];
    if (!post.cover) classes.push('grimoire-card--text');
    const cover = post.cover
        ? `<img class="grimoire-card-cover" src="${esc(rootPath(post.cover))}" alt="${esc(post.coverAlt)}" loading="lazy" decoding="async">`
        : '';
    const foot = `${prettyDate(post.date)} &middot; ${post.readMinutes} min read`;
    return `<a class="${classes.join(' ')}" href="${esc(post.url)}">
    ${cover}
    <div class="grimoire-card-body">
        <div class="grimoire-card-meta">
            <span class="grimoire-cat">${esc(post.category)}</span>
            ${typeTag(post)}
        </div>
        <${featured ? 'h2' : 'h3'} class="grimoire-card-title">${esc(post.title)}</${featured ? 'h2' : 'h3'}>
        <p class="grimoire-card-excerpt">${esc(post.excerpt)}</p>
        <div class="grimoire-card-foot">
            <span>${foot}</span>
            <span class="grimoire-card-readmore">Read &rarr;</span>
        </div>
    </div>
</a>`;
}

/* ─── post page ─────────────────────────────────────────────── */

function renderPost(post, allPosts) {
    const canonical = absUrl(post.url);
    const image = post.ogImage || (post.cover ? rootPath(post.cover) : SITE.defaultImage);

    const articleMeta = [
        post.date ? `    <meta property="article:published_time" content="${post.date}">` : '',
        post.updated ? `    <meta property="article:modified_time" content="${post.updated}">` : '',
        `    <meta property="article:author" content="Jake Tlapek">`,
        `    <meta property="article:section" content="${esc(post.category)}">`,
    ].filter(Boolean).join('\n');

    const faqNode = (post.faq && post.faq.length) ? [{
        '@type': 'FAQPage',
        mainEntity: post.faq.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: mdToPlain(f.a) },
        })),
    }] : [];
    const jsonLd = jsonLdScript({
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'BlogPosting',
                headline: post.title,
                description: post.description,
                image: [absUrl(image)],
                datePublished: post.date || undefined,
                dateModified: post.updated || post.date || undefined,
                author: {
                    '@type': 'Person',
                    name: 'Jake Tlapek',
                    alternateName: 'The Wizard of Marketing',
                    url: SITE.origin + '/',
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'Jake Tlapek — The Wizard of Marketing',
                    logo: { '@type': 'ImageObject', url: absUrl('/dev_assets/jake-icon-512.png') },
                },
                mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
                articleSection: post.category,
                url: canonical,
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
                    { '@type': 'ListItem', position: 2, name: 'The Grimoire', item: absUrl(SITE.hubPath) },
                    { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
                ],
            },
            ...faqNode,
        ],
    });

    const head = headHtml({
        title: `${post.metaTitle || post.title}${SITE.titleSuffix}`,
        ogTitle: post.title,
        description: post.description,
        canonical,
        ogType: 'article',
        image,
        imageW: post.ogCard ? 1200 : undefined,
        imageH: post.ogCard ? 630 : undefined,
        imageAlt: post.title,
        articleMeta,
        jsonLd,
    });

    // Body: swap the {{newsletter}} token for the inline CTA.
    const body = post.bodyHtml.replace(
        /<p>\s*\{\{\s*newsletter\s*\}\}\s*<\/p>/gi,
        ctaHtml()
    );

    const cover = post.cover
        ? `        <img class="grimoire-cover" src="${esc(rootPath(post.cover))}" alt="${esc(post.coverAlt)}" decoding="async">\n`
        : '';
    const video = post.youtube ? '        ' + videoFacadeHtml(post.youtube, post.title) + '\n' : '';
    const lead = post.lead
        ? `        <p class="grimoire-lead">${mdInline.renderInline(post.lead)}</p>\n`
        : '';

    const others = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
    const more = others.length
        ? `    <section class="grimoire-more">
        <h2 class="grimoire-more-title">More from the Grimoire</h2>
        <div class="grimoire-grid">
            ${others.map((p) => cardHtml(p)).join('\n            ')}
        </div>
    </section>`
        : '';

    const faqSection = (post.faq && post.faq.length) ? `            <section class="grimoire-faq" aria-labelledby="grimoire-faq-title">
                <h2 id="grimoire-faq-title" class="grimoire-faq-title">Straight Answers</h2>
                ${post.faq.map((f) => `<details class="grimoire-faq-item">
                    <summary>${esc(f.q)}</summary>
                    <div class="grimoire-faq-a">${mdInline.render(f.a)}</div>
                </details>`).join('\n                ')}
            </section>
` : '';

    const main = `    <main class="grimoire-main">
        <article class="grimoire-article">
            <a href="/grimoire" class="grimoire-back"><i class="fas fa-arrow-left" aria-hidden="true"></i> The Grimoire</a>
            <header class="grimoire-article-header">
                <span class="grimoire-cat">${esc(post.category)}</span>
                <h1 class="grimoire-title">${esc(post.title)}</h1>
                <div class="grimoire-meta">
                    <a class="grimoire-byline" href="/"><img class="grimoire-byline-avatar" src="/dev_assets/jake-avatar-96.webp" alt="" width="28" height="28" loading="lazy" decoding="async"> By Jake the Wizard</a>
                    <span class="dot">&middot;</span><span>${prettyDate(post.date)}</span><span class="dot">&middot;</span><span>${post.readMinutes} min read</span>
                </div>
            </header>
${cover}${video}${lead}            <div class="grimoire-body">
${body}
            </div>
${faqSection}            ${ctaHtml()}
        </article>
${more}
    </main>`;

    return page({ head, main });
}

/* ─── hub page ──────────────────────────────────────────────── */

function renderHub(posts, hubOg) {
    const canonical = absUrl(SITE.hubPath);
    const head = headHtml({
        title: `The Grimoire${SITE.titleSuffix}`,
        ogTitle: 'The Grimoire — Jake Tlapek, The Wizard of Marketing',
        description: SITE.standfirst,
        canonical,
        ogType: 'website',
        image: (hubOg && hubOg.image) || SITE.defaultImage,
        imageW: hubOg && hubOg.card ? 1200 : undefined,
        imageH: hubOg && hubOg.card ? 630 : undefined,
        imageAlt: 'The Grimoire — Jake the Wizard',
        jsonLd: jsonLdScript({
            '@context': 'https://schema.org',
            '@graph': [
                {
                    '@type': 'Blog',
                    name: 'The Grimoire',
                    description: SITE.standfirst,
                    url: canonical,
                    author: { '@type': 'Person', name: 'Jake Tlapek', url: SITE.origin + '/' },
                },
                {
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
                        { '@type': 'ListItem', position: 2, name: 'The Grimoire', item: canonical },
                    ],
                },
            ],
        }),
    });

    let feed;
    if (!posts.length) {
        feed = `        <p class="grimoire-hub-standfirst" style="margin-top:2rem;">The first pages are being written. Check back soon.</p>`;
    } else {
        const [first, ...rest] = posts;
        const featured = `        <div class="grimoire-featured">${cardHtml(first, { featured: true })}</div>`;
        const grid = rest.length
            ? `        <div class="grimoire-grid">
            ${rest.map((p) => cardHtml(p)).join('\n            ')}
        </div>`
            : '';
        feed = featured + '\n' + grid;
    }

    const main = `    <main class="grimoire-main">
        <div class="grimoire-wrap">
            <header class="grimoire-hub-header">
                <span class="eyebrow">Field notes from the trenches</span>
                <h1 class="grimoire-hub-title">The Grimoire</h1>
                <p class="grimoire-hub-standfirst">${esc(SITE.standfirst)}</p>
            </header>
${feed}
            ${ctaHtml()}
        </div>
    </main>`;

    return page({ head, main });
}

/* ─── RSS feed ──────────────────────────────────────────────── */

function renderFeed(posts) {
    const items = posts.map((p) => {
        const link = esc(absUrl(p.url));
        // A literal ]]> in the body would close the CDATA early — split it safely.
        const safeBody = p.bodyHtml.replace(/]]>/g, ']]]]><![CDATA[>');
        return `    <item>
      <title>${esc(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      ${p.date ? `<pubDate>${toRFC822(p.date)}</pubDate>` : ''}
      <category>${esc(p.category)}</category>
      <description>${esc(p.excerpt)}</description>
      <content:encoded><![CDATA[${safeBody}]]></content:encoded>
    </item>`;
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Grimoire — Jake Tlapek</title>
    <link>${absUrl(SITE.hubPath)}</link>
    <atom:link href="${absUrl('/grimoire/feed.xml')}" rel="self" type="application/rss+xml" />
    <description>${esc(SITE.standfirst)}</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;
}

/* ─── sitemap injection ─────────────────────────────────────── */

function injectSitemap(publicDir, posts) {
    const file = path.join(publicDir, 'sitemap.xml');
    if (!fs.existsSync(file)) return;
    let xml = fs.readFileSync(file, 'utf8');
    if (!xml.includes('</urlset>')) return;

    const entry = (loc, lastmod, changefreq, priority) =>
        `  <url>\n    <loc>${esc(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n` +
        `    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;

    const today = (posts[0] && posts[0].updated) || new Date().toISOString().slice(0, 10);
    const urls = [entry(absUrl(SITE.hubPath), today, 'weekly', '0.7')];
    for (const p of posts) {
        urls.push(entry(absUrl(p.url), p.updated || p.date || today, 'monthly', '0.6'));
    }

    xml = xml.replace('</urlset>', urls.join('\n') + '\n</urlset>');
    fs.writeFileSync(file, xml);
}

/* ─── homepage feed ─────────────────────────────────────────── */

/**
 * Render the latest N post cards for injection into the homepage
 * ("Latest from the Grimoire"). Reuses the same card markup as the hub so the
 * homepage stays a single source of truth — new posts surface automatically on
 * the next build, no hardcoded list to go stale.
 *
 * @returns {{ html: string, count: number }} card markup + how many were rendered
 */
function renderHomeFeed({ root, limit = 3 } = {}) {
    const contentDir = path.join(root, 'content', 'grimoire');
    const posts = readPosts(contentDir).slice(0, Math.max(0, limit));
    if (!posts.length) return { html: '', count: 0 };
    return {
        html: posts.map((p) => cardHtml(p)).join('\n                    '),
        count: posts.length,
    };
}

/* ─── orchestrator ──────────────────────────────────────────── */

function buildGrimoire({ root, outputDir }) {
    const contentDir = path.join(root, 'content', 'grimoire');
    const posts = readPosts(contentDir);

    const outDir = path.join(outputDir, 'grimoire');
    fs.mkdirSync(outDir, { recursive: true });

    // Social share cards (1200x630). Each post gets a branded card unless it
    // supplies its own cover; render failures fall back to the default image.
    const ogDir = path.join(outDir, 'og');
    let cardCount = 0;
    for (const post of posts) {
        if (post.cover) { post.ogImage = rootPath(post.cover); post.ogCard = false; continue; }
        const card = generateCard({ root, outDir: ogDir, slug: post.slug, title: post.metaTitle || post.title, category: post.category });
        if (card) { post.ogImage = `${SITE.hubPath}/og/${post.slug}.png`; post.ogCard = true; cardCount++; }
        else { post.ogImage = SITE.defaultImage; post.ogCard = false; }
    }
    const hubCard = generateCard({ root, outDir: ogDir, slug: '_hub', title: 'The Grimoire', category: 'Field Notes' });
    const hubOg = hubCard ? { image: `${SITE.hubPath}/og/_hub.png`, card: true } : { image: SITE.defaultImage, card: false };
    console.log(`[grimoire] OG cards: ${cardCount}/${posts.length}${hubCard ? ' (+hub)' : ''}`);

    const written = [];

    // Hub
    const hubFile = path.join(outDir, 'index.html');
    fs.writeFileSync(hubFile, renderHub(posts, hubOg));
    written.push(hubFile);
    console.log(`[grimoire] hub → grimoire/index.html (${posts.length} post${posts.length === 1 ? '' : 's'})`);

    // Posts
    for (const post of posts) {
        const file = path.join(outDir, `${post.slug}.html`);
        fs.writeFileSync(file, renderPost(post, posts));
        written.push(file);
        console.log(`[grimoire] post → grimoire/${post.slug}.html`);
    }

    // Feed + sitemap
    fs.writeFileSync(path.join(outDir, 'feed.xml'), renderFeed(posts));
    console.log('[grimoire] feed → grimoire/feed.xml');
    injectSitemap(outputDir, posts);
    console.log('[grimoire] sitemap.xml updated');

    return written;
}

module.exports = { buildGrimoire, renderHomeFeed };
