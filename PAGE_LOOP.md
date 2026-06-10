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
| eight-dominoes.html | 1/3 | 2026-06-10 |
| index.html | 1/3 | 2026-06-10 |
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

- [x] **TikTok handle — RESOLVED**: `@itsjakethewizard` verified live via
      TikTok oembed (2026-06-10); `@thewizardmarketing` is the OLD handle.
      Site links are correct — do not change.
- [ ] **Dead proof links**: fixed on index (Videosocials episode +
      MTAFW #1162 deep link). **podcast-guest.html still needs the same
      fixes during its pass** (dossier §6.7).
- [ ] **Timeline years** on index (2014/2018 exits) conflict with external
      evidence — propose year-free "Exit #1 / Exit #2" wording to Jake
      (dossier §6.2–6.3). Needs Jake's sign-off.
- [ ] **Session-free guarantee** ("leave without a clear next move = free")
      proposed for consulting — needs Jake's sign-off before publishing.

## Pass log

- **2026-06-10 — index.html (pass 1/3).** Scene untouched (locked). Fixed
  dead Inspiring Business link → live Videosocials episode page; MTAFW card
  deep-links episode #1162; domino physics line now sourced (Whitehead 1983),
  matching the book page; TikTok timeline entry tells his real origin story
  (400 followers month one → viral video → 10K overnight → 100K+ stayed);
  Person JSON-LD gains BGG designer page (verified) + Share of Brand Voice /
  TikTok SEO in knowsAbout. VERIFIED: @itsjakethewizard is the correct,
  live TikTok handle (oembed check) — dossier's mismatch flag was stale.
- **2026-06-10 — eight-dominoes.html (pass 1/3).** Hook now tells the real
  Whitehead 1983 physics story (cotton wisp → Empire State, ~2B amplification,
  sourced); identity-promise waitlist headline ("Become the clearest message
  in your category"); "In the wild" sourced example under each of the 8
  dominoes (Damasio, Obama button test, iPod, loss aversion, Domino's pun,
  $300M button, Avis, De Beers); founder's note ends on promise + "— Jake"
  sign-off; bottom capture retitled "Read it before your competitors do";
  weekly-email promise unified across both forms; SERP-bait meta description.
  Proposed for Jake (not published): free sample chapter as lead magnet.
- **2026-06-10 — consulting.html (pass 1/3).** Sharper hero promise + proof
  line; landscaper 3→9-crews story woven into The Real Problem; "margin
  notes" device debuts (page annotates its own persuasion: jam study, decoy
  effect, speed-to-lead — all sourced); pull-quote aphorism section; 5-item
  FAQ in his voice (no invented guarantees); Service + FAQPage + Breadcrumb
  JSON-LD; sharper meta/OG descriptions; CTA microcopy friction-killers.
