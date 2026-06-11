/* =========================================================
   THE GRIMOIRE — click-to-load YouTube facade
   ---------------------------------------------------------
   Posts render a lightweight thumbnail button instead of a
   full YouTube iframe. The real player (privacy-friendly
   youtube-nocookie.com) is only injected when the visitor
   clicks Play — so the page stays fast and sets no YouTube
   cookies until there's intent. No framework, no deps.
   ========================================================= */
(function () {
    'use strict';

    function buildIframe(id, title) {
        var iframe = document.createElement('iframe');
        iframe.width = '560';
        iframe.height = '315';
        iframe.title = title || 'YouTube video player';
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute(
            'allow',
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        );
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('loading', 'lazy');
        // youtube-nocookie keeps tracking off until the video actually plays.
        iframe.src =
            'https://www.youtube-nocookie.com/embed/' +
            encodeURIComponent(id) +
            '?autoplay=1&rel=0';
        return iframe;
    }

    function activate(facade) {
        var id = facade.getAttribute('data-yt-id');
        if (!id) return;
        var wrap = facade.parentNode;
        var iframe = buildIframe(id, facade.getAttribute('data-yt-title'));
        wrap.replaceChild(iframe, facade);
        // Move focus into the player for keyboard users.
        iframe.focus && iframe.focus();
    }

    document.addEventListener('click', function (event) {
        var facade = event.target.closest && event.target.closest('.yt-facade');
        if (!facade) return;
        event.preventDefault();
        activate(facade);
    });
})();
