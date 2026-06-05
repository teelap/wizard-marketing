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

  /* ---------- looping video: honour reduced-motion (show the poster still) ---------- */
  var video = $('#scene-video', hero);
  if (video) {
    if (reduced) { try { video.removeAttribute('autoplay'); video.pause(); } catch (e) {} }
    else { var p = video.play && video.play(); if (p && p.catch) p.catch(function () {}); }
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
