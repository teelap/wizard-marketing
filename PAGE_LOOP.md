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
7. **NEVER edit HTML via PowerShell Get-Content/Set-Content** — PS 5.1
   mangles UTF-8 (mojibake). Use the Edit tool only. (Learned 2026-06-10;
   repaired via cp1252→utf8 byte round-trip.)

## Pass status

| Page | Passes | Last touched |
|---|---|---|
| consulting.html | 3/3 ✓ | 2026-06-10 |
| eight-dominoes.html | 3/3 ✓ | 2026-06-10 |
| index.html | 3/3 ✓ | 2026-06-10 |
| mastermind.html | 3/3 ✓ | 2026-06-10 |
| podcast-guest.html | 3/3 ✓ | 2026-06-10 |
| tools.html | 3/3 ✓ | 2026-06-10 |
| links.html | 2/3 | 2026-06-10 |
| 404.html | 2/3 | 2026-06-10 |
| ai-information.html | 2/3 | 2026-06-10 |

Excluded: privacy.html, terms.html, cookies.html (legal — accuracy over
personality), workshop.html (ARCHIVED per WORKSHOP_BUILD.md — noindex,
unlinked, "retire later"; don't polish a dead page), `public/` (build
output), `_*.html` (dev scraps).

## Open items (carry between passes)

- [x] **TikTok handle — RESOLVED**: `@itsjakethewizard` verified live via
      TikTok oembed (2026-06-10); `@thewizardmarketing` is the OLD handle.
      Site links are correct — do not change.
- [x] **Dead proof links — RESOLVED**: fixed on index AND podcast-guest
      (Videosocials episode + MTAFW #1162 deep links everywhere).
- [x] **4th appearance card — DONE**: Service Providers Edge ep. 162 found
      live at frederickdudek.com (slug says ep-163, title says 162 — their
      CMS quirk; URL verified) and added to podcast-guest.
- [ ] **Timeline years** on index (2014/2018 exits) conflict with external
      evidence — propose year-free "Exit #1 / Exit #2" wording to Jake
      (dossier §6.2–6.3). Needs Jake's sign-off.
- [ ] **Session-free guarantee** ("leave without a clear next move = free")
      proposed for consulting — needs Jake's sign-off before publishing.

## Pass log

- **2026-06-10 — tools.html (pass 3/3 ✓ DONE).** "Stack last reviewed:
  June 2026" stamp backs the freshness claim; meta description names the
  categories and tool count; consulting CTA gains the "From $400. Prices
  on the page." friction-killer.
- **2026-06-10 — podcast-guest.html (pass 3/3 ✓ DONE).** Topics 02 and 06
  now carry "hear it on…" proof links to the actual episodes (MTAFW
  #1162, SPE #162); OG/Twitter cards rewritten for the real audience —
  hosts ("steal-ready questions… everything a host needs on one page").
- **2026-06-10 — mastermind.html (pass 3/3 ✓ DONE).** OG/Twitter cards now
  open with the arcanum definition (was "Opening soon…"); benefits intro
  → "Six things. Each one earns its place."; Eight Dominoes benefit
  cross-links the book page.
- **2026-06-10 — index.html (pass 3/3 ✓ DONE).** Trust row de-awkwarded
  ("Trusted by Fortune 500 teams · Finch · Indie Boards & Cards ·
  Founders on 3 continents" — was "teams at … 3 Continents"); sitemap
  lastmod bumped to 2026-06-10 for the 7 changed pages (legal untouched).
  Scene untouched all three passes, as designed.
- **2026-06-10 — eight-dominoes.html (pass 3/3 ✓ DONE).** Twitter card
  description synced with the physics hook (was a bare "coming soon");
  full-page verification. Page judged complete after the pass-1 rewrite
  (Whitehead story, In-the-wild examples) + pass-2 proof/FAQ — final
  pass intentionally minimal rather than padded.
- **2026-06-10 — consulting.html (pass 3/3 ✓ DONE). ROUND 3 BEGINS.**
  Face-to-face polish: How It Works step 01 now describes the real
  booking flow (Calendly direct for sessions, intake for Half-Days and
  retainers — old copy said "below" and routed everything through the
  form); ghost CTA relabeled "Read the Diagnosis First" to match its
  actual target.
- **2026-06-10 — ai-information.html (pass 2/3). ROUND 2 COMPLETE.**
  Canonical Eight Dominoes list added (the #1 quotable artifact for AI
  retrieval, was missing from the page); NEW /llms.txt (emerging AI-crawler
  standard) with site summary, canonical framework wording, key terms,
  contact — added to build.js PUBLIC_FILES and linked from the page.
- **2026-06-10 — 404.html (pass 2/3).** "The wizard's best guess" — inline
  fuzzy-match of the broken pathname against keyword→route table, shows
  the page the visitor probably meant (works on Vercel, which serves
  404.html with the original path intact); "tell Jake what you were
  looking for" broken-link report line → contact form.
- **2026-06-10 — links.html (pass 2/3).** On-page email capture card
  ("One marketing truth a week") so TikTok visitors convert without a
  click-through; self-contained AJAX handler (script.js isn't loaded on
  this standalone page) firing the exact same
  WizAnalytics CompleteRegistration conversion as the other
  eight_dominoes forms; native-submit fallback if fetch fails.
- **2026-06-10 — tools.html (pass 2/3).** GSC blurb gets his verified
  "Validate Fix = close-elevator-door button" joke (from Hold My Beard);
  ActiveCampaign blurb rewritten around the sequence thesis ("automation
  is sequence made literal"); ItemList JSON-LD for all 20 tools.
- **2026-06-10 — podcast-guest.html (pass 2/3).** 4th verified appearance
  card added: The Service Providers Edge #162 (Frederick Dudek) — the
  episode that carries ALL his flagship stories (17x ROAS, landscaper,
  6.5% button, TikTok SEO); booker-facing proof strip after the hero
  (100K+ followers / 31 episodes hosting his own show, "he knows both
  chairs" / 5-day max reply).
- **2026-06-10 — mastermind.html (pass 2/3).** Pull quote ("the hardest
  system to debug is people" — on why the room matters more than the
  playbook); "Before You Ask" FAQ: members-first pricing honesty, cohort
  timing, "not sure you qualify? join anyway — a no from Jake usually
  comes with a roadmap"; FAQPage JSON-LD.
- **2026-06-10 — index.html (pass 2/3).** Grifters joins the BRUTAL TRUTH
  bio prose, tied to the thesis ("different shelf, same lesson"); the
  homepage framework preview now deep-links the book page's full version
  ("with the famous campaign behind each domino"); WebSite JSON-LD added.
  Scene untouched.
- **2026-06-10 — eight-dominoes.html (pass 2/3).** Author proof strip after
  the hook ($100M+ / 300K Grifters copies "he ships things people use" /
  100K+ truth-telling) bridging game-designer cred to book cred; "Before
  You Ask" 3-item FAQ (ship date honesty, weekly email contents, no
  background needed) + matching FAQPage JSON-LD.
- **2026-06-10 — consulting.html (pass 2/3). ROUND 2 BEGINS.** Proof strip
  after The Real Problem with his three flagship client numbers
  (1.2%→6.5% conversion, 17× ROAS, $1.2M→$10M landscaper — phrased as
  client-file results per dossier rules); "Both include the recording and
  a written action summary" microcopy under the Calendly buttons.
- **2026-06-10 — ai-information.html (pass 1/3). ROUND 1 COMPLETE.**
  Verified-only enrichment: Selected Interviews section (MTAFW #1162,
  Videosocials/Inspiring Business, CanvasRebel May 2024, Search Atlas
  founder video — all URLs verified live); Notable Quotes verbatim bank
  for LLM citation; Share of Brand Voice finally DEFINED (visible FAQ +
  FAQPage LD); Grifters fully attributed (Dave Fulton, IB&C 2016,
  Dystopian Universe, BGG designer link); TikTok platform specificity;
  BGG + SoBV/TikTok SEO in Person LD; review dates bumped to June 10.
- **2026-06-10 — 404.html (pass 1/3).** Rotating fizzle line (6 wizard-voice
  variants per load, Marvel pattern, no-JS fallback keeps default text);
  email capture added ("The page is gone. The weekly truths aren't." →
  eight_dominoes list, AJAX + conversion tracking free via script.js's
  generic Formspree handler); nerd footnote on the real origin of "404"
  (and the CERN Room-404 myth). workshop.html EXCLUDED from loop this
  iteration — WORKSHOP_BUILD.md marks it archived/noindex/"retire later".
- **2026-06-10 — links.html (pass 1/3).** Campaign-first reorder: Eight
  Dominoes now the SINGLE featured card on top (was 3rd, unfeatured, with
  two other cards diluting the red); consulting sub gains "prices on the
  page" friction-killer; signature aphorism tagline under the identity
  block. Deliberately did NOT add UTMs to internal links (would split GA4
  sessions and lose the TikTok referrer) — instead, recommend Jake put
  `?utm_source=tiktok&utm_medium=bio` on the /links URL in his TikTok bio.
- **2026-06-10 — tools.html (pass 1/3).** NEW Share of Brand Voice category
  — his named metric with the two tools he cites on podcasts (SparkToro,
  Search Atlas), intro deep-links the MTAFW episode; AI section now opens
  with his verbatim bell-curve stance (tools save hours, don't replace the
  human); intro gains the philosophy kicker ("tools don't fix a broken
  sequence… that's why this list is short"); BreadcrumbList JSON-LD.
- **2026-06-10 — podcast-guest.html (pass 1/3).** Dead Inspiring Business
  link → live Videosocials episode; MTAFW deep-links #1162; NEW "Steal
  These Questions" section — 7 lift-ready host questions each baiting a
  Jake story (sequence, Share of Brand Voice, TikTok origin, 1.2→6.5%
  button, Grifters, contrarian best-practice, AI skepticism); Copy Bio
  one-click button beside Download Headshot; BreadcrumbList JSON-LD.
  Incident: PowerShell text pipeline mojibake'd the file; repaired
  losslessly via cp1252→utf8 round-trip; rule 7 added.
- **2026-06-10 — mastermind.html (pass 1/3).** Latin definition of "arcanum"
  under the H1 (makes the name land); de-hyped "elite" → "small, curated"
  (numbers-over-adverbs rule); margin note on Napoleon Hill's 1937
  master-mind alliance (Carnegie study) in What You're Joining; margin note
  on the 1975 cookie-jar scarcity study under THIS IS NOT FOR EVERYONE,
  framing the cohort cap as load-bearing honesty; BreadcrumbList JSON-LD.
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
