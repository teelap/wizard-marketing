/**
 * Lightweight, dependency-free cookie-consent notice.
 *
 * Self-contained on purpose: it injects its own styles and markup so it works
 * identically across every page regardless of which stylesheet is loaded
 * (the main design system, the standalone links page, or the workshop).
 *
 * Behaviour:
 *   - Shows a bottom banner only until the visitor makes a choice.
 *   - Stores the choice in localStorage ("wiz-cookie-consent" = accepted|declined).
 *   - No external requests, no tracking, no third-party libraries.
 *
 * This is an informational notice that links to the full Cookie Policy. It does
 * not itself set marketing cookies; embeds (YouTube/TikTok) are described in the
 * policy along with how to block them at the browser level.
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'wiz-cookie-consent';

    // Respect a prior decision.
    try {
        if (window.localStorage && localStorage.getItem(STORAGE_KEY)) return;
    } catch (e) {
        // localStorage blocked (private mode / strict settings) — show once, don't persist.
    }

    function persist(value) {
        try {
            if (window.localStorage) localStorage.setItem(STORAGE_KEY, value);
        } catch (e) {
            /* ignore — choice simply won't be remembered */
        }
    }

    function injectStyles() {
        if (document.getElementById('wiz-cc-styles')) return;
        var css = [
            // Compact bottom-right toast on desktop so it never covers the hero
            // CTA or scroll cue; a slim full-width bar on small screens.
            '.wiz-cc{position:fixed;right:1rem;bottom:1rem;z-index:2147483000;',
            'width:min(370px, calc(100% - 2rem));background:#181412;color:#F4EEE0;',
            'border:1px solid rgba(244,238,224,0.18);border-radius:10px;',
            'box-shadow:0 10px 40px rgba(0,0,0,0.45);padding:0.85rem 1rem;',
            'display:flex;flex-wrap:wrap;align-items:center;gap:0.6rem 0.85rem;',
            "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,Arial,sans-serif;",
            'opacity:0;transform:translateY(12px);transition:opacity .35s ease,transform .35s ease;}',
            '.wiz-cc.wiz-cc-in{opacity:1;transform:translateY(0);}',
            '.wiz-cc__text{flex:1 1 100%;font-size:0.8rem;line-height:1.45;margin:0;color:#F4EEE0;}',
            '.wiz-cc__text a{color:#F4EEE0;text-decoration:underline;}',
            '.wiz-cc__actions{display:flex;gap:0.5rem;flex:1 1 100%;}',
            '.wiz-cc__btn{font:inherit;font-size:0.8rem;font-weight:700;letter-spacing:0.3px;',
            'cursor:pointer;border-radius:6px;padding:0.48rem 0.9rem;border:1px solid transparent;flex:1;',
            'transition:background .2s ease,color .2s ease,border-color .2s ease;}',
            '.wiz-cc__btn--accept{background:#c32b39;color:#fff;}',
            '.wiz-cc__btn--accept:hover{background:#a1232e;}',
            '.wiz-cc__btn--decline{background:transparent;color:#F4EEE0;border-color:rgba(244,238,224,0.3);}',
            '.wiz-cc__btn--decline:hover{border-color:rgba(244,238,224,0.7);}',
            '.wiz-cc__btn:focus-visible{outline:2px solid #F4EEE0;outline-offset:2px;}',
            '@media (max-width:520px){.wiz-cc{left:1rem;right:1rem;width:auto;}}',
            '@media (prefers-reduced-motion:reduce){.wiz-cc{transition:none;}}'
        ].join('');
        var style = document.createElement('style');
        style.id = 'wiz-cc-styles';
        style.textContent = css;
        document.head.appendChild(style);
    }

    function build() {
        injectStyles();

        var banner = document.createElement('div');
        banner.className = 'wiz-cc';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-live', 'polite');
        banner.setAttribute('aria-label', 'Cookie notice');

        var text = document.createElement('p');
        text.className = 'wiz-cc__text';
        text.innerHTML = 'This site uses cookies to keep things working and to understand what resonates. ' +
            'Embeds like YouTube and TikTok may set their own. See the ' +
            '<a href="/cookies">Cookie Policy</a>.';

        var actions = document.createElement('div');
        actions.className = 'wiz-cc__actions';

        var decline = document.createElement('button');
        decline.type = 'button';
        decline.className = 'wiz-cc__btn wiz-cc__btn--decline';
        decline.textContent = 'Decline';

        var accept = document.createElement('button');
        accept.type = 'button';
        accept.className = 'wiz-cc__btn wiz-cc__btn--accept';
        accept.textContent = 'Accept';

        function dismiss(choice) {
            persist(choice);
            // Drive Google Consent Mode v2 via the analytics layer (if present).
            try {
                if (window.WizAnalytics) {
                    if (choice === 'accepted') window.WizAnalytics.grantConsent();
                    else window.WizAnalytics.denyConsent();
                }
            } catch (e) { /* analytics optional — never block the UI */ }
            banner.classList.remove('wiz-cc-in');
            window.setTimeout(function () {
                if (banner.parentNode) banner.parentNode.removeChild(banner);
            }, 400);
        }

        decline.addEventListener('click', function () { dismiss('declined'); });
        accept.addEventListener('click', function () { dismiss('accepted'); });

        actions.appendChild(decline);
        actions.appendChild(accept);
        banner.appendChild(text);
        banner.appendChild(actions);
        document.body.appendChild(banner);

        // Trigger the entrance transition on the next frame.
        window.requestAnimationFrame(function () {
            window.requestAnimationFrame(function () { banner.classList.add('wiz-cc-in'); });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', build);
    } else {
        build();
    }
})();
