/**
 * New Lessons Every Day — renders Jake's newest social posts on the homepage.
 * ----------------------------------------------------------------------------
 * Waits until #feed is near the viewport, fetches /api/social-feed once, then
 * builds three things: the month's most-watched video (spotlight), one tab per
 * network that has posts, and a swipeable rail for the chosen network.
 * TikTok and YouTube videos play in an on-page dialog; everything else opens
 * on its own platform in a new tab. All post text is inserted as textContent,
 * never HTML.
 */
(function () {
    'use strict';

    var section = document.getElementById('feed');
    if (!section || !window.fetch) return;

    // Font Awesome 6.7 brand paths (CC BY 4.0), inlined because the site loads FA 6.4.
    var THREADS_PATH = 'M331.5 235.7c2.2 .9 4.2 1.9 6.3 2.8c29.2 14.1 50.6 35.2 61.8 61.4c15.7 36.5 17.2 95.8-30.3 143.2c-36.2 36.2-80.3 52.5-142.6 53h-.3c-70.2-.5-124.1-24.1-160.4-70.2c-32.3-41-48.9-98.1-49.5-169.6V256v-.2C17 184.3 33.6 127.2 65.9 86.2C102.2 40.1 156.2 16.5 226.4 16h.3c70.3 .5 124.9 24 162.3 69.9c18.4 22.7 32 50 40.6 81.7l-40.4 10.8c-7.1-25.8-17.8-47.8-32.2-65.4c-29.2-35.8-73-54.2-130.5-54.6c-57 .5-100.1 18.8-128.2 54.4C72.1 146.1 58.5 194.3 58 256c.5 61.7 14.1 109.9 40.3 143.3c28 35.6 71.2 53.9 128.2 54.4c51.4-.4 85.4-12.6 113.7-40.9c32.3-32.2 31.7-71.8 21.4-95.9c-6.1-14.2-17.1-26-31.9-34.9c-3.7 26.9-11.8 48.3-24.7 64.8c-17.1 21.8-41.4 33.6-72.7 35.3c-23.6 1.3-46.3-4.4-63.9-16c-20.8-13.8-33-34.8-34.3-59.3c-2.5-48.3 35.7-83 95.2-86.4c21.1-1.2 40.9-.3 59.2 2.8c-2.4-14.8-7.3-26.6-14.6-35.2c-10-11.7-25.6-17.7-46.2-17.8H227c-16.6 0-39 4.6-53.3 26.3l-34.4-23.6c19.2-29.1 50.3-45.1 87.8-45.1h.8c62.6 .4 99.9 39.5 103.7 107.7l-.2 .2zm-156 68.8c1.3 25.1 28.4 36.8 54.6 35.3c25.6-1.4 54.6-11.4 59.5-73.2c-13.2-2.9-27.8-4.4-43.4-4.4c-4.8 0-9.6 .1-14.4 .4c-42.9 2.4-57.2 23.2-56.2 41.8l-.1 .1z';

    var NETWORKS = {
        tiktok:    { label: 'TikTok',    icon: 'fab fa-tiktok',      kind: 'video', player: 'tiktok',
                     profile: 'https://www.tiktok.com/@itsjakethewizard', handle: '@itsjakethewizard' },
        instagram: { label: 'Instagram', icon: 'fab fa-instagram',   kind: 'video',
                     profile: 'https://www.instagram.com/itsjakethewizard/', handle: '@itsjakethewizard' },
        youtube:   { label: 'YouTube',   icon: 'fab fa-youtube',     kind: 'video', player: 'youtube',
                     profile: 'https://www.youtube.com/@itsjakethewizard', handle: '@itsjakethewizard' },
        linkedin:  { label: 'LinkedIn',  icon: 'fab fa-linkedin-in', kind: 'text',
                     profile: 'https://www.linkedin.com/in/jacob-tlapek-10b55962/', handle: 'Jacob Tlapek' },
        x:         { label: 'X',         svg: ['0 0 512 512', 'M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z'], kind: 'text',
                     profile: 'https://x.com/JakeTtheWizard', handle: '@JakeTtheWizard' },
        threads:   { label: 'Threads',   svg: ['0 0 448 512', THREADS_PATH], kind: 'text',
                     profile: 'https://www.threads.com/@thewizardmarketing', handle: '@thewizardmarketing' }
    };
    var ORDER = ['tiktok', 'instagram', 'youtube', 'linkedin', 'x', 'threads'];

    var layout = section.querySelector('.feed-layout');
    var spotlight = document.getElementById('feed-spotlight');
    var tabsEl = document.getElementById('feed-tabs');
    var panel = document.getElementById('feed-panel');
    var controls = document.getElementById('feed-rail-controls');
    var follow = document.getElementById('feed-follow');
    var dialog = document.getElementById('feed-player');
    var frame = document.getElementById('feed-player-frame');
    var outLink = document.getElementById('feed-player-out');

    var byNetwork = {};
    var active = null;
    var lastTrigger = null;

    /* ─── tiny helpers ─────────────────────────────────────────────── */

    function el(tag, attrs, children) {
        var node = document.createElement(tag);
        if (attrs) {
            Object.keys(attrs).forEach(function (k) {
                if (attrs[k] == null || attrs[k] === false) return;
                if (k === 'text') node.textContent = attrs[k];
                else if (k === 'className') node.className = attrs[k];
                else node.setAttribute(k, attrs[k] === true ? '' : attrs[k]);
            });
        }
        (children || []).forEach(function (c) { if (c) node.appendChild(c); });
        return node;
    }
    function icon(cls) { return el('i', { className: cls, 'aria-hidden': 'true' }); }

    /** A network's mark: a Font Awesome glyph, or inline SVG for logos newer than the site's FA 6.4. */
    function netIcon(net) {
        if (!net.svg) return icon(net.icon);
        var ns = 'http://www.w3.org/2000/svg';
        var svg = document.createElementNS(ns, 'svg');
        svg.setAttribute('viewBox', net.svg[0]);
        svg.setAttribute('class', 'feed-mark');
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('focusable', 'false');
        var path = document.createElementNS(ns, 'path');
        path.setAttribute('d', net.svg[1]);
        svg.appendChild(path);
        return svg;
    }

    function track(name, params) {
        if (window.WizAnalytics && typeof window.WizAnalytics.track === 'function') window.WizAnalytics.track(name, params);
    }

    var rtf = window.Intl && Intl.RelativeTimeFormat ? new Intl.RelativeTimeFormat('en', { numeric: 'auto' }) : null;
    function ago(iso) {
        var diff = (Date.parse(iso) - Date.now()) / 1000;
        var abs = Math.abs(diff);
        if (!rtf || !isFinite(diff)) return '';
        if (abs < 3600) return rtf.format(Math.round(diff / 60) || -1, 'minute');
        if (abs < 86400) return rtf.format(Math.round(diff / 3600), 'hour');
        if (abs < 86400 * 7) return rtf.format(Math.round(diff / 86400), 'day');
        return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    function compact(n) {
        if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace(/\.0$/, '') + 'M';
        if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
        return String(n);
    }

    function firstLine(text) { return String(text || '').split('\n')[0]; }

    function clock(sec) {
        var s = Math.round(sec);
        return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2);
    }

    function thumb(item) {
        var net = NETWORKS[item.network];
        var box = el('span', { className: 'feed-thumb' }, [
            el('span', { className: 'feed-thumb-fallback', 'aria-hidden': 'true' }, [netIcon(net)])
        ]);
        var img = el('img', { src: item.thumb, alt: '', loading: 'lazy', decoding: 'async', width: '300', height: '400', referrerpolicy: 'no-referrer' });
        // Some Shorts never get a vertical frame: retry with YouTube's standard
        // 4:3 thumbnail (zoomed past its black bars). Anything else that fails,
        // e.g. an expired Instagram image link, falls back to the network mark.
        img.addEventListener('error', function () {
            if (item.network === 'youtube' && !box.classList.contains('is-letterboxed')) {
                box.classList.add('is-letterboxed');
                img.src = 'https://i.ytimg.com/vi/' + encodeURIComponent(item.id) + '/hqdefault.jpg';
                return;
            }
            box.classList.add('is-broken');
        });
        box.appendChild(img);
        if (item.duration) {
            box.appendChild(el('span', { className: 'feed-duration', text: clock(item.duration), 'aria-label': 'Length ' + clock(item.duration) }));
        }
        return box;
    }

    function when(item) {
        var net = NETWORKS[item.network];
        return el('span', { className: 'feed-when' }, [
            netIcon(net),
            el('span', { text: net.label }),
            el('span', { 'aria-hidden': 'true', text: '/' }),
            el('time', { datetime: item.publishedAt, text: ago(item.publishedAt) })
        ]);
    }

    /* ─── video playback ───────────────────────────────────────────── */

    function playerSrc(item) {
        var id = encodeURIComponent(item.id);
        if (item.network === 'tiktok') return 'https://www.tiktok.com/player/v1/' + id + '?autoplay=1&music_info=0&description=0&rel=0&closed_caption=1';
        if (item.network === 'youtube') return 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&playsinline=1&rel=0';
        return null;
    }

    function canPlay(item) { return !!(playerSrc(item) && dialog && typeof dialog.showModal === 'function'); }

    function openPlayer(item, trigger) {
        lastTrigger = trigger;
        var net = NETWORKS[item.network];
        frame.textContent = '';
        frame.appendChild(el('iframe', {
            src: playerSrc(item),
            title: net.label + ' video: ' + firstLine(item.text),
            allow: 'autoplay; encrypted-media; picture-in-picture; fullscreen',
            allowfullscreen: true
        }));
        outLink.href = item.url;
        outLink.textContent = 'Open on ' + net.label;
        dialog.showModal();
        track('social_feed_play', { social_network: item.network, link_url: item.url });
    }

    function closePlayer() { if (dialog.open) dialog.close(); }

    if (dialog) {
        dialog.addEventListener('close', function () {
            frame.textContent = ''; // removing the iframe stops playback
            if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus();
        });
        dialog.addEventListener('click', function (e) { if (e.target === dialog) closePlayer(); });
        document.getElementById('feed-player-close').addEventListener('click', closePlayer);
    }

    /** A video opens in the dialog when it can, otherwise it links out. */
    function videoTrigger(item, className, children, caption) {
        var net = NETWORKS[item.network];
        var label = caption || 'latest video';
        if (canPlay(item)) {
            var btn = el('button', { type: 'button', className: className, 'aria-label': 'Play ' + net.label + ' video: ' + label }, children);
            btn.addEventListener('click', function () { openPlayer(item, btn); });
            return btn;
        }
        return el('a', {
            className: className, href: item.url, target: '_blank', rel: 'noopener noreferrer',
            'aria-label': 'Watch on ' + net.label + ': ' + label + ' (opens ' + net.label + ')'
        }, children);
    }

    /* ─── rendering ────────────────────────────────────────────────── */

    function videoTile(item) {
        var playable = canPlay(item);
        var media = thumb(item);
        media.appendChild(el('span', { className: 'feed-play' + (playable ? '' : ' feed-play--out'), 'aria-hidden': 'true' }, [
            icon(playable ? 'fas fa-play' : 'fas fa-arrow-up-right-from-square')
        ]));
        var caption = firstLine(item.text);
        return el('li', null, [videoTrigger(item, 'feed-tile-link', [
            media,
            when(item),
            el('span', { className: 'feed-tile-caption', text: caption })
        ], caption)]);
    }

    function noteCard(item) {
        var net = NETWORKS[item.network];
        return el('li', null, [el('a', {
            className: 'feed-note-link', href: item.url, target: '_blank', rel: 'noopener noreferrer'
        }, [
            when(item),
            // Single line breaks only: a blank line inside the clamp can end up
            // holding the "…" on its own.
            el('p', { className: 'feed-note-text', text: String(item.text).replace(/\n{2,}/g, '\n') }),
            el('span', { className: 'feed-note-more' }, [document.createTextNode('Read on ' + net.label), icon('fas fa-arrow-up-right-from-square')])
        ])]);
    }

    function renderSpotlight(top) {
        if (!top || !NETWORKS[top.network]) return;
        var net = NETWORKS[top.network];
        var caption = firstLine(top.text);
        var media = thumb(top);
        media.appendChild(el('span', { className: 'feed-play' + (canPlay(top) ? '' : ' feed-play--out'), 'aria-hidden': 'true' }, [
            icon(canPlay(top) ? 'fas fa-play' : 'fas fa-arrow-up-right-from-square')
        ]));
        var seal = el('span', { className: 'feed-seal', 'aria-hidden': 'true' }, [
            el('span', { className: 'feed-seal-num', text: compact(top.views) }),
            el('span', { className: 'feed-seal-unit', text: 'views' })
        ]);
        var mediaWrap = videoTrigger(top, 'feed-spotlight-media', [media, seal], caption);

        var cta = canPlay(top)
            ? el('button', { type: 'button', className: 'btn btn-primary', text: 'Play video' })
            : el('a', { className: 'btn btn-primary', href: top.url, target: '_blank', rel: 'noopener noreferrer', text: 'Watch on ' + net.label });
        if (canPlay(top)) cta.addEventListener('click', function () { openPlayer(top, cta); });

        spotlight.textContent = '';
        spotlight.appendChild(mediaWrap);
        spotlight.appendChild(el('div', { className: 'feed-spotlight-body' }, [
            el('h3', { className: 'feed-spotlight-kicker', text: 'Most watched this month' }),
            el('p', { className: 'feed-spotlight-where' }, [
                netIcon(net),
                document.createTextNode(top.views.toLocaleString('en-US') + ' views on ' + net.label)
            ]),
            el('p', { className: 'feed-spotlight-text', text: top.text }),
            cta
        ]));
        spotlight.hidden = false;
        layout.classList.add('has-spotlight');
    }

    function renderFollow(network) {
        var net = NETWORKS[network];
        follow.textContent = '';
        follow.appendChild(el('a', {
            className: 'btn btn-primary social-btn', href: net.profile, target: '_blank', rel: 'noopener noreferrer'
        }, [netIcon(net), document.createTextNode('Follow on ' + net.label)]));
        follow.appendChild(el('span', { className: 'feed-handle', text: net.handle }));
    }

    function updateArrows() {
        var rail = panel.querySelector('.feed-rail');
        if (!rail) return;
        var btns = controls.querySelectorAll('.feed-arrow');
        var max = rail.scrollWidth - rail.clientWidth - 2;
        controls.hidden = max <= 0;
        btns[0].disabled = rail.scrollLeft <= 2;
        btns[1].disabled = rail.scrollLeft >= max;
    }

    function selectTab(network, focusTab) {
        active = network;
        Array.prototype.forEach.call(tabsEl.children, function (tab) {
            var on = tab.getAttribute('data-network') === network;
            tab.setAttribute('aria-selected', on ? 'true' : 'false');
            tab.tabIndex = on ? 0 : -1;
            if (on) {
                panel.setAttribute('aria-labelledby', tab.id);
                if (focusTab) tab.focus();
            }
        });
        var net = NETWORKS[network];
        var rail = el('ul', { className: 'feed-rail' + (net.kind === 'text' ? ' feed-rail--notes' : '') },
            byNetwork[network].map(net.kind === 'text' ? noteCard : videoTile));
        rail.addEventListener('scroll', updateArrows, { passive: true });
        panel.textContent = '';
        panel.appendChild(rail);
        panel.removeAttribute('aria-busy');
        renderFollow(network);
        updateArrows();
    }

    function renderTabs(networks) {
        tabsEl.textContent = '';
        networks.forEach(function (network) {
            var net = NETWORKS[network];
            var tab = el('button', {
                type: 'button', role: 'tab', id: 'feed-tab-' + network, className: 'feed-tab',
                'data-network': network, 'aria-controls': 'feed-panel', 'aria-selected': 'false', tabindex: '-1'
            }, [netIcon(net), el('span', { text: net.label })]);
            tab.addEventListener('click', function () {
                if (active !== network) {
                    selectTab(network, false);
                    track('social_feed_tab', { social_network: network });
                }
            });
            tabsEl.appendChild(tab);
        });
        // Arrow keys move between tabs (WAI-ARIA tabs pattern, automatic activation).
        tabsEl.addEventListener('keydown', function (e) {
            var i = networks.indexOf(active);
            var next = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1
                : e.key === 'Home' ? 0 : e.key === 'End' ? networks.length - 1 : null;
            if (next === null) return;
            e.preventDefault();
            selectTab(networks[(next + networks.length) % networks.length], true);
        });
    }

    function showError() {
        layout.setAttribute('data-state', 'error');
        panel.removeAttribute('aria-busy');
    }

    function render(feed) {
        var items = (feed && Array.isArray(feed.items)) ? feed.items : [];
        byNetwork = {};
        items.forEach(function (item) {
            if (!NETWORKS[item.network] || !item.url) return;
            (byNetwork[item.network] = byNetwork[item.network] || []).push(item);
        });
        var networks = ORDER.filter(function (n) { return byNetwork[n] && byNetwork[n].length; });
        if (!networks.length) return showError();

        layout.setAttribute('data-state', 'ready');
        renderSpotlight(feed.top);
        renderTabs(networks);
        selectTab(networks[0], false);
    }

    controls.addEventListener('click', function (e) {
        var btn = e.target.closest('.feed-arrow');
        var rail = panel.querySelector('.feed-rail');
        if (!btn || !rail) return;
        rail.scrollBy({ left: Number(btn.getAttribute('data-dir')) * rail.clientWidth * 0.85 });
    });
    window.addEventListener('resize', updateArrows, { passive: true });

    /* ─── load once, when the section is close ─────────────────────── */

    var loaded = false;
    function load() {
        if (loaded) return;
        loaded = true;
        layout.setAttribute('data-state', 'loading');
        fetch('/api/social-feed', { headers: { Accept: 'application/json' } })
            .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
            .then(render)
            .catch(showError);
    }

    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            if (entries.some(function (e) { return e.isIntersecting; })) { io.disconnect(); load(); }
        }, { rootMargin: '900px 0px' });
        io.observe(section);
    } else {
        load();
    }
})();
