/**
 * analytics.js — comprehensive, privacy-aware tracking layer for jakethewizard.com
 * ---------------------------------------------------------------------------------
 * This file is the single source of truth for everything we push into Google Tag
 * Manager's dataLayer. The GTM container + Consent Mode v2 *defaults* are bootstrapped
 * inline in each page's <head> (injected by build.js). This script — loaded `defer`
 * right after that bootstrap — then:
 *
 *   1. Applies any stored cookie-consent decision (grant/deny) on load.
 *   2. Computes session + visitor segmentation (traffic source, UTMs, device,
 *      new vs returning, intent path) and pushes it so every hit is segmentable.
 *   3. Auto-captures journey + conversion events via delegated listeners:
 *        page_data, scroll_depth, cta_click, book_consultation, outbound_click,
 *        nav_click, social_click, email_click, tel_click, file_download,
 *        form_start, form_submit, video_progress.
 *
 * No event sets a cookie or sends data by itself — GTM/GA4 decide that based on
 * the active consent state. Declining consent still allows Google's cookieless
 * modeling (Consent Mode), so we lose as little signal as the law allows.
 *
 * Everything is dependency-free and defensive: a failure in any tracker must never
 * break the page.
 */
(function (window, document) {
    'use strict';

    var dataLayer = (window.dataLayer = window.dataLayer || []);
    function gtag() { dataLayer.push(arguments); }

    var CONSENT_KEY = 'wiz-cookie-consent';        // shared with cookie-consent.js
    var VISITOR_KEY = 'wiz-visitor';               // first-touch + visit count
    var SESSION_KEY = 'wiz-session-src';           // last-touch source for the session

    /** Push a named event to the dataLayer, swallowing any error. */
    function track(eventName, params) {
        try {
            var payload = { event: eventName };
            if (params) {
                for (var k in params) {
                    if (Object.prototype.hasOwnProperty.call(params, k)) payload[k] = params[k];
                }
            }
            dataLayer.push(payload);
        } catch (e) { /* never let tracking break the page */ }
    }

    /* ───────────────────────────── Consent ───────────────────────────── */

    function grantConsent() {
        gtag('consent', 'update', {
            ad_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted',
            analytics_storage: 'granted'
        });
        track('consent_update', { consent_state: 'granted' });
    }

    function denyConsent() {
        gtag('consent', 'update', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied'
        });
        track('consent_update', { consent_state: 'denied' });
    }

    /** Re-apply a previously stored decision so consent survives reloads. */
    function applyStoredConsent() {
        var decision = null;
        try {
            if (window.localStorage) decision = localStorage.getItem(CONSENT_KEY);
        } catch (e) { /* storage blocked */ }
        if (decision === 'accepted') grantConsent();
        else if (decision === 'declined') denyConsent();
        return decision;
    }

    /* ──────────────────────── Visitor / session ──────────────────────── */

    function readJSON(store, key) {
        try { return JSON.parse(store.getItem(key)); } catch (e) { return null; }
    }
    function writeJSON(store, key, value) {
        try { store.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
    }

    /** new vs returning + lifetime visit count (first-party, no PII). */
    function resolveVisitor() {
        var info = { user_type: 'new', visit_count: 1, first_visit: true };
        try {
            if (!window.localStorage) return info;
            var stored = readJSON(localStorage, VISITOR_KEY);
            if (stored && stored.visit_count) {
                info.user_type = 'returning';
                info.visit_count = stored.visit_count + 1;
                info.first_visit = false;
            }
            writeJSON(localStorage, VISITOR_KEY, { visit_count: info.visit_count, ts: Date.now() });
        } catch (e) { /* ignore */ }
        return info;
    }

    /** Classify the traffic source from UTMs first, then referrer. */
    function resolveSource() {
        var params = new URLSearchParams(window.location.search || '');
        var utm = {
            utm_source: params.get('utm_source') || '',
            utm_medium: params.get('utm_medium') || '',
            utm_campaign: params.get('utm_campaign') || '',
            utm_content: params.get('utm_content') || '',
            utm_term: params.get('utm_term') || ''
        };

        var source = utm.utm_source;
        var medium = utm.utm_medium;
        var ref = document.referrer || '';

        if (!source) {
            if (!ref) { source = 'direct'; medium = medium || 'none'; }
            else {
                var host = '';
                try { host = new URL(ref).hostname.replace(/^www\./, ''); } catch (e) { host = ''; }
                if (host && host === window.location.hostname.replace(/^www\./, '')) {
                    source = 'internal'; medium = medium || 'internal';
                } else if (/google\.|bing\.|duckduckgo\.|yahoo\./.test(host)) {
                    source = host; medium = medium || 'organic';
                } else if (/tiktok\.|youtube\.|instagram\.|facebook\.|linkedin\.|t\.co|twitter\.|x\.com/.test(host)) {
                    source = host; medium = medium || 'social';
                } else {
                    source = host || 'referral'; medium = medium || 'referral';
                }
            }
        }

        var result = {
            traffic_source: source,
            traffic_medium: medium,
            utm_source: utm.utm_source,
            utm_medium: utm.utm_medium,
            utm_campaign: utm.utm_campaign,
            utm_content: utm.utm_content,
            utm_term: utm.utm_term,
            landing_page: window.location.pathname,
            referrer: ref
        };

        // Persist last-touch for the session, and first-touch for the visitor.
        try {
            if (window.sessionStorage && !sessionStorage.getItem(SESSION_KEY)) {
                writeJSON(sessionStorage, SESSION_KEY, result);
            }
            if (window.localStorage) {
                var firstTouch = readJSON(localStorage, 'wiz-first-touch');
                if (!firstTouch) writeJSON(localStorage, 'wiz-first-touch', result);
            }
        } catch (e) { /* ignore */ }

        return result;
    }

    function resolveDevice() {
        var w = window.innerWidth || document.documentElement.clientWidth || 0;
        if (w && w < 768) return 'mobile';
        if (w && w < 1024) return 'tablet';
        return 'desktop';
    }

    /** Map the URL path → a stable page_type / category / funnel stage. */
    function resolvePage() {
        var path = window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
        var map = {
            '/': { page_type: 'home', page_category: 'home', funnel_stage: 'awareness' },
            '/index': { page_type: 'home', page_category: 'home', funnel_stage: 'awareness' },
            '/links': { page_type: 'links_hub', page_category: 'hub', funnel_stage: 'awareness' },
            '/consulting': { page_type: 'service', page_category: 'consulting', funnel_stage: 'consideration' },
            '/mastermind': { page_type: 'service', page_category: 'mastermind', funnel_stage: 'consideration' },
            '/book': { page_type: 'offer', page_category: 'book', funnel_stage: 'consideration' },
            '/podcast-guest': { page_type: 'service', page_category: 'podcast', funnel_stage: 'consideration' },
            '/tools': { page_type: 'content', page_category: 'tools', funnel_stage: 'awareness' },
            '/workshop': { page_type: 'content', page_category: 'workshop', funnel_stage: 'awareness' },
            '/ai-information': { page_type: 'content', page_category: 'ai_info', funnel_stage: 'awareness' },
            '/privacy': { page_type: 'legal', page_category: 'privacy', funnel_stage: 'support' },
            '/terms': { page_type: 'legal', page_category: 'terms', funnel_stage: 'support' },
            '/cookies': { page_type: 'legal', page_category: 'cookies', funnel_stage: 'support' }
        };
        return map[path] || { page_type: 'other', page_category: 'other', funnel_stage: 'awareness' };
    }

    /* ────────────────────────── Event helpers ────────────────────────── */

    function closest(el, selector) {
        while (el && el.nodeType === 1) {
            if (el.matches && el.matches(selector)) return el;
            el = el.parentElement;
        }
        return null;
    }

    function sectionOf(el) {
        var sec = closest(el, 'section[id], section[aria-label], footer, nav');
        if (!sec) return 'body';
        return sec.id || sec.getAttribute('aria-label') || sec.tagName.toLowerCase();
    }

    function textOf(el) {
        var t = (el.getAttribute && el.getAttribute('aria-label')) || (el.textContent || '');
        return t.replace(/\s+/g, ' ').trim().slice(0, 120);
    }

    function isExternal(href) {
        if (!href) return false;
        if (/^(mailto:|tel:|javascript:|#)/i.test(href)) return false;
        try { return new URL(href, window.location.href).hostname !== window.location.hostname; }
        catch (e) { return false; }
    }

    var DOWNLOAD_RE = /\.(pdf|zip|docx?|xlsx?|pptx?|csv|mp3|mp4|mov|dmg|pkg|epub)(\?|$)/i;

    function socialNetwork(href) {
        var m = href.match(/(tiktok|youtube|instagram|facebook|linkedin|twitter|x\.com|t\.co)/i);
        return m ? m[1].toLowerCase().replace('x.com', 'twitter').replace('t.co', 'twitter') : 'other';
    }

    /** Map a page + form node → a human-readable, segmentable form name. */
    function formName(form, page) {
        var cls = (form.className || '').toLowerCase();
        var cat = page.page_category;
        if (cat === 'consulting') return 'consulting_intake';
        if (cat === 'mastermind') return 'arcanum_waitlist';
        if (cat === 'podcast') return 'podcast_booking';
        if (cat === 'book') return 'book_waitlist';
        if (cat === 'home') return /dominoes/.test(cls) ? 'eight_dominoes_waitlist' : 'home_contact';
        return form.id || form.getAttribute('name') || 'form';
    }

    /* ─────────────────────────── Click tracking ──────────────────────── */

    function handleClick(evt) {
        var target = evt.target;
        var link = closest(target, 'a[href]');
        var button = closest(target, 'button, [role="button"]');

        // Calendly booking = primary conversion (capture $ value from the URL).
        if (link) {
            var href = link.getAttribute('href') || '';

            if (/calendly\.com/i.test(href)) {
                var detail = /1-hour|60/.test(href) ? '60_minute' : (/30/.test(href) ? '30_minute' : 'unknown');
                var value = detail === '60_minute' ? 750 : (detail === '30_minute' ? 400 : 0);
                track('book_consultation', {
                    booking_type: detail, value: value, currency: 'USD',
                    cta_text: textOf(link), cta_location: sectionOf(link), link_url: href
                });
                return; // calendly is also outbound, but the conversion event is what matters
            }

            if (/^mailto:/i.test(href)) {
                track('email_click', { email: href.replace(/^mailto:/i, ''), cta_location: sectionOf(link) });
                return;
            }
            if (/^tel:/i.test(href)) {
                track('tel_click', { phone: href.replace(/^tel:/i, ''), cta_location: sectionOf(link) });
                return;
            }

            // Social row.
            if (closest(link, '.social-row, .social-btn') || link.matches('.social-btn')) {
                track('social_click', { social_network: socialNetwork(href), link_url: href });
                return;
            }

            // Primary navigation + footer nav = internal journey.
            if (closest(link, '.pill-nav, .nav-links, .links-footer, footer nav')) {
                track('nav_click', {
                    nav_destination: link.getAttribute('data-dest') || link.getAttribute('href'),
                    cta_text: textOf(link), cta_location: sectionOf(link)
                });
                return;
            }

            if (DOWNLOAD_RE.test(href)) {
                track('file_download', { file_url: href, file_name: href.split('/').pop(), cta_location: sectionOf(link) });
                return;
            }

            if (isExternal(href)) {
                var domain = '';
                try { domain = new URL(href, window.location.href).hostname.replace(/^www\./, ''); } catch (e) {}
                track('outbound_click', { link_url: href, link_domain: domain, link_text: textOf(link), cta_location: sectionOf(link) });
                return;
            }

            // Internal CTA-style links (cards, buttons styled as links, hero CTAs).
            if (link.matches('.btn, .link-card, .cta, [data-cta], .offer-cta-group a, .domino-cta')) {
                track('cta_click', {
                    cta_text: textOf(link), cta_destination: link.getAttribute('href'),
                    cta_location: sectionOf(link), cta_type: 'link'
                });
            }
            return;
        }

        // Real <button> CTAs (e.g. form submits handled separately; this is for non-submit buttons).
        if (button && button.matches('.btn, .cta, [data-cta]') && button.type !== 'submit') {
            track('cta_click', { cta_text: textOf(button), cta_location: sectionOf(button), cta_type: 'button' });
        }
    }

    /* ─────────────────────────── Form tracking ───────────────────────── */

    function bindForms(page) {
        var forms = document.querySelectorAll('form');
        Array.prototype.forEach.call(forms, function (form) {
            var name = formName(form, page);
            var started = false;

            form.addEventListener('focusin', function () {
                if (started) return;
                started = true;
                track('form_start', { form_name: name, form_id: form.id || '', form_destination: form.getAttribute('action') || '' });
            }, { passive: true });

            form.addEventListener('submit', function () {
                track('form_submit', {
                    form_name: name, form_id: form.id || '',
                    form_destination: form.getAttribute('action') || '',
                    page_category: page.page_category
                });
            });
        });
    }

    /* ─────────────────────────── Scroll depth ────────────────────────── */

    function bindScrollDepth() {
        var marks = [25, 50, 75, 90];
        var hit = {};
        var ticking = false;

        function check() {
            ticking = false;
            var doc = document.documentElement;
            var scrollable = (doc.scrollHeight - doc.clientHeight);
            if (scrollable <= 0) return;
            var pct = ((window.scrollY || doc.scrollTop) / scrollable) * 100;
            for (var i = 0; i < marks.length; i++) {
                var m = marks[i];
                if (pct >= m && !hit[m]) {
                    hit[m] = true;
                    track('scroll_depth', { percent_scrolled: m });
                }
            }
            if (hit[90]) window.removeEventListener('scroll', onScroll);
        }
        function onScroll() {
            if (!ticking) { ticking = true; window.requestAnimationFrame(check); }
        }
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* ──────────────────── YouTube engagement (optional) ──────────────── */

    function bindYouTube() {
        var frames = document.querySelectorAll('iframe[src*="youtube.com/embed"], iframe[src*="youtube-nocookie.com/embed"]');
        if (!frames.length || window.__wizYT) return;
        // Only wire up if the embed opted into the JS API (enablejsapi=1).
        var apiFrames = Array.prototype.filter.call(frames, function (f) { return /enablejsapi=1/.test(f.src); });
        if (!apiFrames.length) return;
        window.__wizYT = true;

        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);

        window.onYouTubeIframeAPIReady = function () {
            apiFrames.forEach(function (frame) {
                var milestones = {};
                /* global YT */
                new YT.Player(frame, {
                    events: {
                        onStateChange: function (e) {
                            if (e.data === YT.PlayerState.PLAYING && !milestones.start) {
                                milestones.start = true;
                                track('video_progress', { video_provider: 'youtube', video_status: 'start', video_title: frame.title || '' });
                            }
                            if (e.data === YT.PlayerState.ENDED) {
                                track('video_progress', { video_provider: 'youtube', video_status: 'complete', video_title: frame.title || '' });
                            }
                        }
                    }
                });
            });
        };
    }

    /* ─────────────────────────────── Init ────────────────────────────── */

    function init() {
        var page = resolvePage();
        var visitor = resolveVisitor();
        var source = resolveSource();
        var device = resolveDevice();

        applyStoredConsent();

        // One enriched push so GA4 (via GTM) can segment every later hit.
        track('page_data', {
            page_type: page.page_type,
            page_category: page.page_category,
            funnel_stage: page.funnel_stage,
            device_type: device,
            user_type: visitor.user_type,
            visit_count: visitor.visit_count,
            traffic_source: source.traffic_source,
            traffic_medium: source.traffic_medium,
            utm_source: source.utm_source,
            utm_medium: source.utm_medium,
            utm_campaign: source.utm_campaign,
            landing_page: source.landing_page,
            page_path: window.location.pathname,
            page_title: document.title
        });

        document.addEventListener('click', handleClick, true);
        bindForms(page);
        bindScrollDepth();
        bindYouTube();
    }

    // Expose a tiny API for the cookie banner + any inline callers.
    window.WizAnalytics = {
        grantConsent: grantConsent,
        denyConsent: denyConsent,
        track: track
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})(window, document);
