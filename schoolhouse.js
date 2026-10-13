/* Schoolhouse kit: art + motion for jakethewizard.com (2026-10 redesign).
   Shapes are ported from the summit deck builder (build_deck.py) so the site matches the slides.

   Markup hooks:
     .hero > .hero-art                        rainbow bend sized to the hero (.hero--flip mirrors it)
     .rainbow                                 rainbow letters (the deck's rainbow_word)
     .seal[data-fill][data-burst][data-rot]   starburst seal behind a number (data-spin="rev" turns it the other way)
     .sticker[data-burst]                     starburst sticker
     [data-star="yellow"]                     outlined star
     [data-art="arc|arch|record|bulb"]        arch behind a photo, footer arch, vinyl record, lightbulb
     .reveal .topple .hl .tv                  scroll entrances (see schoolhouse.css "entrances")

   Content is never left hidden: hero copy and the hero photo stay visible and only slide or flicker in,
   and if anything here throws, the page falls back to its finished, static state.
   ?static in the URL, or a reduced-motion preference, skips the entrances entirely. */
(function () {
  'use strict';

  const INK = '#1B1A17';
  const C = {teal: '#12A4A4', pink: '#F6A8CB', red: '#E5322B', salmon: '#FF9473', yellow: '#FFC928', black: '#17271F', mint: '#91DE87',
    maroon: '#8B1D3D', sky: '#5DB6EC', navy: '#3C3F9F', orange: '#FF7A33', cream: '#FFF1D6', paper: '#FFFAF0'};
  const RAINBOW = ['teal', 'pink', 'red', 'salmon', 'yellow', 'black', 'mint', 'maroon', 'sky'].map(k => C[k]);
  const f1 = n => n.toFixed(1);
  const svg = (vb, inner, cls = '') => `<svg${cls ? ` class="${cls}"` : ''} viewBox="${vb}" aria-hidden="true" focusable="false">${inner}</svg>`;

  /* ---------- art helpers ---------- */

  /* Stripe band: down from the top, a 90° bend, then off to the right. One path per stroke, ink casing first. */
  function bend(xl, yb, w, colors, r0, o, xr) {
    const n = colors.length, R = r0 + n * w, cx = xl + R, cy = yb - R;
    const d = r => `M ${f1(cx - r)} -12 L ${f1(cx - r)} ${f1(cy)} A ${f1(r)} ${f1(r)} 0 0 0 ${f1(cx)} ${f1(cy + r)} L ${f1(xr)} ${f1(cy + r)}`;
    return [{d: d(r0 + n * w / 2), stroke: INK, width: n * w + 2 * o},
      ...colors.map((c, i) => ({d: d(R - (i + .5) * w), stroke: c, width: w + .6}))];
  }
  /* Concentric rings. Each starts at 9 o'clock so a half-length stroke draws the visible arch left to right. */
  function arcs(cx, cy, ro, w, colors, o = 7) {
    const n = colors.length, rot = `transform="rotate(180 ${cx} ${cy})"`;
    return `<circle cx="${cx}" cy="${cy}" r="${ro - n * w / 2}" stroke="${INK}" stroke-width="${n * w + 2 * o}" fill="none" ${rot}/>` +
      colors.map((c, i) => `<circle cx="${cx}" cy="${cy}" r="${ro - (i + .5) * w}" stroke="${c}" stroke-width="${w + .6}" fill="none" ${rot}/>`).join('');
  }
  /* One starburst polygon. Shadow and burst are drawn as separate, whole-<svg> layers so they can spin
     on the compositor (rotating SVG children with transform-box forces layout every frame). */
  function burstPoly(cx, cy, r1, r2, n, fill, stroke, rot = 0) {
    const pts = [];
    for (let i = 0; i < 2 * n; i++) {
      const r = i % 2 ? r2 : r1, a = Math.PI * i / n + rot * Math.PI / 180;
      pts.push(`${f1(cx + r * Math.cos(a))},${f1(cy + r * Math.sin(a))}`);
    }
    return `<polygon points="${pts.join(' ')}" fill="${fill}"${stroke ? ` stroke="${INK}" stroke-width="${stroke}" stroke-linejoin="round"` : ''}/>`;
  }
  /* Spinning burst layers centred in their own box; CSS nudges them to the deck's offset (see .spin-layer). */
  function burstLayers(size, r1, r2, n, fill, stroke, rot, rev) {
    const c = size / 2, cls = `spin-layer${rev ? ' rev' : ''}`;
    return svg(`0 0 ${size} ${size}`, burstPoly(c, c, r1, r2, n, INK, 0, rot), `${cls} spin-shadow`) +
      svg(`0 0 ${size} ${size}`, burstPoly(c, c, r1, r2, n, fill, stroke, rot), cls);
  }
  function star(cx, cy, r, fill) {
    const pts = [];
    for (let i = 0; i < 10; i++) {
      const rr = i % 2 ? r * .45 : r, a = (-90 + i * 36) * Math.PI / 180;
      pts.push(`${f1(cx + rr * Math.cos(a))},${f1(cy + rr * Math.sin(a))}`);
    }
    return `<polygon points="${pts.join(' ')}" fill="${fill}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
  }
  /* Vinyl record in three stacked layers: the disc, the spinning label, and a fixed glare on top. */
  function record(cx, cy, r) {
    let grooves = '';
    for (let rr = Math.round(r * .36); rr < r - 10; rr += 12) grooves += `<circle cx="${cx}" cy="${cy}" r="${rr}" stroke="#3A3833" stroke-width="2.5" fill="none"/>`;
    const lr = r * .33, lw = lr / 9 * .85;
    let label = arcs(cx, cy, lr, lw, RAINBOW, 4);
    label += `<circle cx="${cx}" cy="${cy}" r="${f1(lr - 9 * lw)}" fill="${C.cream}" stroke="${INK}" stroke-width="4"/><circle cx="${cx}" cy="${cy}" r="8" fill="${INK}"/>`;
    [-1, 1].forEach(sgn => { label += `<circle cx="${f1(cx + sgn * lr * .55)}" cy="${cy}" r="6" fill="${C.cream}" stroke="${INK}" stroke-width="3"/>`; });
    const vb = '0 0 400 400';
    return svg(vb, `<circle cx="${cx + 14}" cy="${cy + 14}" r="${r}" fill="${C.maroon}"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="${INK}"/>${grooves}`) +
      svg(vb, label, 'rec-spin') +
      svg(vb, `<path d="M ${f1(cx - r * .75)} ${f1(cy - r * .45)} A ${f1(r * .87)} ${f1(r * .87)} 0 0 1 ${f1(cx - r * .2)} ${f1(cy - r * .84)}" stroke="#6B675E" stroke-width="9" fill="none" stroke-linecap="round"/>`, 'rec-glare');
  }
  function lightbulb(cx, cy, r) {
    let s = '';
    for (let k = 0; k < 9; k++) {
      const a = (-180 + k * 22.5) * Math.PI / 180;
      s += `<line x1="${f1(cx + (r + 40) * Math.cos(a))}" y1="${f1(cy + (r + 40) * Math.sin(a))}" x2="${f1(cx + (r + 110) * Math.cos(a))}" y2="${f1(cy + (r + 110) * Math.sin(a))}" stroke="${INK}" stroke-width="18" stroke-linecap="round" class="ray" style="--r:${k}"/>`;
    }
    const nw = r * .9, by = cy + r * .82;
    const bulb = `M ${f1(cx - r * .62)} ${f1(by)} A ${r} ${r} 0 1 1 ${f1(cx + r * .62)} ${f1(by)} L ${f1(cx + nw / 2)} ${f1(by + 70)} L ${f1(cx - nw / 2)} ${f1(by + 70)} Z`;
    s += `<path d="${bulb}" fill="${INK}" transform="translate(14 14)"/><path d="${bulb}" fill="${C.yellow}" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>`;
    s += `<path d="M ${cx - 60} ${cy + 36} q 30 -52 60 0 q 30 52 60 0" stroke="${C.orange}" stroke-width="12" fill="none" stroke-linecap="round"/>`;
    s += `<circle cx="${f1(cx - r * .45)}" cy="${f1(cy - r * .35)}" r="${f1(r * .16)}" fill="#FFF6C9"/>`;
    [C.sky, C.teal, C.sky].forEach((col, k) => {
      s += `<rect x="${f1(cx - nw / 2 + 6)}" y="${f1(by + 80 + k * 46)}" width="${f1(nw - 12)}" height="40" rx="14" fill="${col}" stroke="${INK}" stroke-width="8"/>`;
    });
    s += `<path d="M ${cx - 46} ${f1(by + 80 + 3 * 46)} q 46 46 92 0" fill="${INK}"/>`;
    return s;
  }

  /* ---------- paint the art into the page ---------- */

  /* Rainbow letters (deck's rainbow_word). Screen readers get the word from a visually hidden copy;
     the coloured letters are decoration. Built with DOM nodes, never innerHTML, so text stays text. */
  const RW = ['red', 'orange', 'yellow', 'mint', 'sky', 'pink', 'teal'];
  document.querySelectorAll('.rainbow').forEach(el => {
    const text = el.textContent;
    const cols = RW.filter(k => k !== el.dataset.skip).map(k => C[k]);
    const spoken = document.createElement('span');
    spoken.className = 'vh';
    spoken.textContent = text;
    const letters = document.createElement('span');
    letters.className = 'rainbow-letters';
    letters.setAttribute('aria-hidden', 'true');
    let k = 0;
    for (const ch of text) {
      if (/\s/.test(ch)) { letters.append(ch); continue; }
      const s = document.createElement('span');
      s.textContent = ch;
      s.style.setProperty('--k', k);
      if (/\p{L}/u.test(ch)) { s.style.color = cols[k % cols.length]; k++; }
      letters.append(s);
    }
    el.replaceChildren(spoken, letters);
  });

  /* Hero bends: redrawn to each hero's size so the band always hugs the left and bottom edges.
     Paths are updated in place after the first draw so a running paint-in survives a resize. */
  function heroGeometry(hero) {
    const vw = innerWidth, small = vw < 600, mid = vw < 1060;
    const g = {w: small ? 6 : mid ? 10 : 13, xl: small ? 10 : 26, o: small ? 4 : 6, mb: small ? 12 : 24, r0: small ? 24 : 46};
    hero.style.setProperty('--band', `${g.xl + 9 * g.w + g.o}px`);
    return g;
  }
  function drawHero(state) {
    const {hero, art} = state;
    const g = heroGeometry(hero), W = hero.clientWidth, H = hero.clientHeight;
    const specs = bend(g.xl, H - g.mb, g.w, RAINBOW, g.r0, g.o, W + 12);
    if (!state.paths) {
      art.innerHTML = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
        specs.map(p => `<path d="${p.d}" stroke="${p.stroke}" stroke-width="${p.width}" fill="none"/>`).join('') + '</svg>';
      state.paths = [...art.querySelectorAll('path')];
      return;
    }
    const el = art.firstElementChild;
    el.setAttribute('width', W); el.setAttribute('height', H); el.setAttribute('viewBox', `0 0 ${W} ${H}`);
    specs.forEach((p, i) => { state.paths[i].setAttribute('d', p.d); state.paths[i].setAttribute('stroke-width', p.width); });
  }
  const heroes = [];
  document.querySelectorAll('.hero').forEach(hero => {
    const art = hero.querySelector('.hero-art');
    if (!art) return;
    const state = {hero, art, paths: null};
    drawHero(state);
    new ResizeObserver(() => drawHero(state)).observe(hero);
    heroes.push(state);
  });

  document.querySelectorAll('.seal').forEach(el => {
    const d = el.dataset;
    el.insertAdjacentHTML('afterbegin', burstLayers(300, 128, 108, 18, C[d.burst] || C.pink, 7, +d.rot || 0, d.spin === 'rev') +
      svg('0 0 300 300', `<circle cx="156" cy="156" r="94" fill="${INK}"/><circle cx="146" cy="146" r="94" fill="${C[d.fill] || C.sky}" stroke="${INK}" stroke-width="7"/>`));
  });
  document.querySelectorAll('.sticker').forEach(el => {
    el.insertAdjacentHTML('afterbegin', burstLayers(200, 92, 76, 16, C[el.dataset.burst] || C.yellow, 6, 0, false));
  });
  document.querySelectorAll('[data-star]').forEach(el => {
    el.innerHTML = svg('0 0 100 100', `<g transform="translate(6 6)">${star(50, 50, 44, INK)}</g>` + star(50, 50, 44, C[el.dataset.star] || C.yellow));
  });
  document.querySelectorAll('[data-art="arc"]').forEach(el => { el.innerHTML = svg('0 0 660 420', arcs(330, 440, 320, 24, RAINBOW)); });
  document.querySelectorAll('[data-art="arch"]').forEach(el => { el.innerHTML = svg('0 0 1100 520', arcs(550, 580, 540, 30, RAINBOW)); });
  document.querySelectorAll('[data-art="record"]').forEach(el => { el.innerHTML = record(190, 190, 180); });
  document.querySelectorAll('[data-art="bulb"]').forEach(el => { el.innerHTML = svg('-20 -10 440 560', lightbulb(200, 200, 90)); });

  /* Loops (spins, ripples, blinks) pause while their art is off screen, to keep idle CPU near zero. */
  if ('IntersectionObserver' in window) {
    const looping = new IntersectionObserver(entries => entries.forEach(e => e.target.classList.toggle('paused', !e.isIntersecting)),
      {rootMargin: '120px 0px'});
    document.querySelectorAll('.seal, .sticker, .rec, .bulb, .art-star, .tape, .arch, .hero-photo, .rainbow').forEach(el => looping.observe(el));
  }

  /* ---------- entrances ---------- */

  const still = new URLSearchParams(location.search).has('static') || matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (still || !('IntersectionObserver' in window) || !Element.prototype.animate) return;

  /* Hide strokes so they can "paint on". frac .5 draws only the top half of a ring, which is all that shows.
     Lengths are measured when called, so call again right before drawing if layout may have moved. */
  function hideStrokes(shapes, frac = 1) {
    shapes.forEach(sh => {
      const L = sh.getTotalLength(), len = L * frac;
      sh.style.strokeDasharray = `${len} ${L + 1}`;
      sh.style.strokeDashoffset = len;
      sh.dataset.len = len;
    });
  }
  function showStrokes(shapes) {
    shapes.forEach(sh => { sh.style.strokeDasharray = ''; sh.style.strokeDashoffset = ''; });
  }
  /* Shape 0 is the black casing: it trails the last stripe so colour leads and no black slab runs ahead. */
  function drawStrokes(shapes, {dur = 1500, stagger = 30, delay = 0} = {}) {
    shapes.forEach((sh, i) => {
      const len = +sh.dataset.len;
      const a = sh.animate([{strokeDashoffset: len}, {strokeDashoffset: 0}],
        {duration: dur, delay: delay + (i === 0 ? shapes.length - 2 : i - 1) * stagger, easing: 'cubic-bezier(.45,.05,.2,1)', fill: 'forwards'});
      a.onfinish = () => { showStrokes([sh]); a.cancel(); };
    });
  }
  /* Old TV switching on: a bright line opens up into the picture (below-the-fold photos). */
  function tvOn(tv, delay = 0) {
    tv.classList.add('on');
    const img = tv.querySelector('img');
    if (!img) return;
    img.animate([
      {transform: 'scale(.4,.006)', filter: 'brightness(6) saturate(0)'},
      {transform: 'scale(1,.006)', filter: 'brightness(6) saturate(0)', offset: .28},
      {transform: 'scale(1,1)', filter: 'brightness(1.7) saturate(.5)', offset: .55},
      {transform: 'none', filter: 'none'}
    ], {duration: 1000, delay, easing: 'cubic-bezier(.3,.7,.2,1)', fill: 'backwards'});
  }
  /* Hero photo: a quick warm-up flicker. The picture is on screen from the first frame (it is often
     the page's largest paint), so nothing here changes its size or hides it. */
  function tvWarmUp(tv) {
    const img = tv.querySelector('img');
    if (!img) return;
    img.animate([
      {filter: 'brightness(2.2) saturate(0) contrast(1.3)'},
      {filter: 'brightness(1.35) saturate(.5)', offset: .45},
      {filter: 'none'}
    ], {duration: 700, easing: 'ease-out'});
  }
  const fontsReady = () => Promise.race([
    document.fonts && document.fonts.load ? document.fonts.load('900 1em Fraunces').then(() => document.fonts.ready) : Promise.resolve(),
    new Promise(r => setTimeout(r, 1200))
  ]);
  const nextFrame = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

  const root = document.documentElement;
  const rings = [...document.querySelectorAll('[data-art="arc"], [data-art="arch"]')];
  const ringShapes = r => [...r.querySelectorAll('circle')];
  const heroTvs = [...document.querySelectorAll('.hero .tv')];

  /* If anything below throws, drop back to the finished page rather than leave content hidden. */
  function bail() {
    root.classList.remove('anim', 'go');
    heroes.forEach(h => showStrokes(h.paths));
    rings.forEach(r => showStrokes(ringShapes(r)));
  }

  try {
    heroTvs.forEach(tv => tv.classList.add('on'));   // hero photos skip the hidden "TV off" state
    root.classList.add('anim');
    heroes.forEach(h => hideStrokes(h.paths));
    rings.forEach(r => hideStrokes(ringShapes(r), .5));

    requestAnimationFrame(() => {
      root.classList.add('go');
      heroTvs.forEach(tvWarmUp);
    });
    /* The bends paint on once the display font has settled the hero's height. */
    fontsReady().then(nextFrame).then(() => {
      heroes.forEach(h => { hideStrokes(h.paths); drawStrokes(h.paths, {dur: 1700, stagger: 30}); });
    }).catch(bail);

    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      const t = e.target;
      io.unobserve(t);
      t.classList.add('in');                      // reveal first; the flourishes below are optional
      try {
        if (t.matches('.tv')) tvOn(t, 150);
        if (t.matches('[data-art]')) drawStrokes(ringShapes(t), {dur: 1600, stagger: 35, delay: 150});
      } catch (err) {
        t.classList.add('on');
        if (t.matches('[data-art]')) showStrokes(ringShapes(t));
      }
    }), {rootMargin: '0px 0px -8% 0px'});
    document.querySelectorAll('.reveal, .topple, .tv').forEach(el => { if (!el.closest('.hero')) io.observe(el); });
    document.querySelectorAll('.hl').forEach(el => io.observe(el));
    rings.forEach(el => io.observe(el));

    /* Printing shows everything, scrolled to or not. */
    addEventListener('beforeprint', bail);
  } catch (err) {
    bail();
  }
})();
