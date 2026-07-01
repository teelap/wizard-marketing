/* =====================================================================
   THE WIZARD'S DESK — Lo-Fi looping hero (minimal).
   The scene is a calm, always-looping background; navigation is the top
   bar only. No hover/click scene effects, no parallax — just the loop,
   an optional music toggle, and a scroll cue. Pairs with scene.css.
   ===================================================================== */
(function () {
  "use strict";
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hero = document.getElementById('scene-hero');
  if (!hero) return;
  function $(s, r) { return (r || document).querySelector(s); }

  /* ---------- looping video: deferred + connection-aware ----------
     The <video> ships with NO sources and preload="none", so it costs 0 bytes
     up front — the poster paints instantly and drives LCP. We attach the sources
     and play only AFTER the page has loaded, and never on reduced-motion,
     Save-Data, or 2G-class links (the poster still stays). */
  var video = $('#scene-video', hero);
  function startScene() {
    if (!video || video.dataset.loaded) return;
    var c = navigator.connection || {};
    var slow = c.saveData === true || /(^|\b)(slow-2g|2g)$/.test(c.effectiveType || '');
    if (slow) return;                     // keep the lightweight poster on constrained links
    video.dataset.loaded = '1';
    var add = function (src, type) {
      if (!src) return;
      var s = document.createElement('source');
      s.src = src; s.type = type;
      video.appendChild(s);
    };
    add(video.getAttribute('data-webm'), 'video/webm');
    add(video.getAttribute('data-mp4'), 'video/mp4');
    try { video.load(); } catch (e) {}
    var p = video.play && video.play();
    if (p && p.catch) p.catch(function () {});
  }
  if (video && !reduced) {
    var idle = window.requestIdleCallback || function (fn) { return setTimeout(fn, 200); };
    if (document.readyState === 'complete') idle(startScene);
    else addEventListener('load', function () { idle(startScene); }, { once: true });
  }

  /* ---------- ambient music: a 5-track playlist, ALWAYS opening with
     "Spellbound Study" (index 0), then looping through the rest forever.
     Muted by default (browsers block audio autoplay); the speaker toggles it.
     `i` resets to 0 on every page load, so every visit starts on Jake's pick. */
  var PLAYLIST = [
    'dev_assets/audio/spellbound-study.mp3',   // always first — Jake's pick
    'dev_assets/audio/spellbook-loops.mp3',
    'dev_assets/audio/moonlit-wand.mp3',
    'dev_assets/audio/moonlit-spellbook.mp3',
    'dev_assets/audio/spellbook-rain.mp3'
  ];
  var Music = {
    muted: localStorage.getItem('wiz-muted') !== 'false',
    i: 0,
    el: null,
    ensure: function () {
      if (this.el) return this.el;
      var a = new Audio();
      a.volume = 0.45;
      a.preload = 'none';
      a.src = PLAYLIST[this.i];
      var self = this;
      a.addEventListener('ended', function () {
        self.i = (self.i + 1) % PLAYLIST.length;   // advance + wrap → loops through all five
        a.src = PLAYLIST[self.i];
        self.play();
      });
      this.el = a;
      return a;
    },
    play: function () { var a = this.ensure(); try { var p = a.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {} },
    pause: function () { if (this.el) { try { this.el.pause(); } catch (e) {} } },
    setMuted: function (m) {
      this.muted = m; localStorage.setItem('wiz-muted', m ? 'true' : 'false');
      if (m) this.pause(); else this.play();
      updateSoundBtn();
    }
  };
  function updateSoundBtn() {
    var b = $('#sceneSoundBtn'); if (!b) return;
    b.innerHTML = '<i class="fas ' + (Music.muted ? 'fa-volume-xmark' : 'fa-volume-high') + '"></i>';
    b.setAttribute('aria-pressed', !Music.muted);
    b.setAttribute('aria-label', Music.muted ? 'Play music' : 'Mute music');
  }
  var sb = $('#sceneSoundBtn');
  if (sb) sb.addEventListener('click', function () { Music.setMuted(!Music.muted); });
  updateSoundBtn();
  // returning visitors who left music ON: resume on their first gesture (autoplay needs one)
  if (!Music.muted) {
    addEventListener('pointerdown', function once() { Music.play(); removeEventListener('pointerdown', once); }, { once: true });
  }

  /* ---------- scroll affordance ("the story continues") ---------- */
  var scrollBtn = $('#scene-scroll');
  if (scrollBtn) scrollBtn.addEventListener('click', function () {
    var next = hero.nextElementSibling;
    if (next && next.scrollIntoView) next.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    else scrollTo({ top: hero.offsetHeight, behavior: reduced ? 'auto' : 'smooth' });
  });
})();
