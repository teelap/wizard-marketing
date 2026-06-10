# Page Improvement Loop — Tracker

Autonomous loop: each iteration picks ONE page and makes it measurably better —
more interesting, more fact-filled, more enticing, more enjoyable, more Jake.
Loop ends when every page below has had **3 passes**.

## Rules (read before every pass)

1. **Source of truth for voice + facts: `VOICE_DOSSIER.md`.** Never invent
   biography, clients, numbers, or guarantees. Self-reported claims stay
   phrased as Jake's claims. Anything in dossier §6 (Open Questions) needs
   verification before publishing.
2. **Don't break the machinery:** Calendly hrefs (analytics fires on them),
   Formspree action + `_form_type` + field names, `magic-form` classes,
   GSAP/`scroll-reveal` patterns, nav/footer structure, asset `?v=` versions.
   `build.js` injects GTM/consent into `public/` — edit ROOT files only.
3. **Art direction is LOCKED** (flat chibi, Ghibli color, hat-over-eyes
   wizards, parchment). Copy/structure/SEO passes only; no art rework.
4. **Better ≠ longer.** Tighten as much as you add. Sentence fingerprint:
   <12 words, two-beat diagnosis, numbers over adverbs, zero hype.
5. Each pass: `node build.js` + `npm run validate` must pass; eyeball in
   preview; then commit (`feat(loop): pass N on <page>`) and push.
6. Mark the pass in the table + log below in the same commit.

## Pass status

| Page | Passes | Last touched |
|---|---|---|
| consulting.html | 1/3 | 2026-06-10 |
| eight-dominoes.html | 0/3 | — |
| index.html | 0/3 | — |
| mastermind.html | 0/3 | — |
| podcast-guest.html | 0/3 | — |
| tools.html | 0/3 | — |
| links.html | 0/3 | — |
| workshop.html | 0/3 | — |
| 404.html | 0/3 | — |
| ai-information.html | 0/3 | — |

Excluded: privacy.html, terms.html, cookies.html (legal — accuracy over
personality), `public/` (build output), `_*.html` (dev scraps).

## Open items (carry between passes)

- [ ] **TikTok handle**: site links `@itsjakethewizard` everywhere; verified
      110K account is `@thewizardmarketing`. Verify in a browser before
      mass-changing links (dossier §6.6).
- [ ] **Dead proof links**: YouTube `6Mz7yKfqEqI` (Inspiring Business) looks
      deleted; More Than a Few Words card should deep-link episode #1162
      (dossier §6.7). Fix during podcast-guest / index passes.
- [ ] **Timeline years** on index (2014/2018 exits) conflict with external
      evidence — propose year-free "Exit #1 / Exit #2" wording to Jake
      (dossier §6.2–6.3). Needs Jake's sign-off.
- [ ] **Session-free guarantee** ("leave without a clear next move = free")
      proposed for consulting — needs Jake's sign-off before publishing.

## Pass log

- **2026-06-10 — consulting.html (pass 1/3).** Sharper hero promise + proof
  line; landscaper 3→9-crews story woven into The Real Problem; "margin
  notes" device debuts (page annotates its own persuasion: jam study, decoy
  effect, speed-to-lead — all sourced); pull-quote aphorism section; 5-item
  FAQ in his voice (no invented guarantees); Service + FAQPage + Breadcrumb
  JSON-LD; sharper meta/OG descriptions; CTA microcopy friction-killers.
