---
name: weekly-evergreen
description: >-
  Run the weekly evergreen content batch for Jake the Wizard — plan slot-first and deal a
  DIFFERENT idea to every post (no concept repeats across the week), rotate the angle and
  format, render the visuals, run the QA gate, and load everything into the Metricool
  planner as drafts at best-time slots. Use for the Monday batch, "the weekly batch",
  "this week's content", or as a scheduled routine. Nothing publishes; Jake approves in
  Metricool.
---

# Weekly evergreen batch

Orchestration for the **backbone** of the content engine: a week of posts where **every
post is a different idea** → platform-native, angle-rotated → drafts in Metricool. Plan
**slot-first** — list the slots the cadence needs, then deal a distinct subject to each
from the week's deck. The old "one core atomized into everything" model is dead: even with
rotated angles it made the whole week read like a single point held for seven days (see
`calendar/2026-W25.md` — 28 drafts, all one concept — for the failure it caused). The
reference material lives in the repo and must be **read, not duplicated**:

- `content/README.md` — the loop, the **cadence table (§3)**, the approval workflow (§4).
- `content/CONTENT_GUIDE.md` — voice rules, the **approved stat bank (§2)**, banned list, CTAs, the Eight Dominoes canonical wording.
- `content/CONTENT_MATRIX.md` — the **subject bank (§2)** + 8 Topic Types + variance rules. This is the **subject deck**: the subjects you deal from and the angles you rotate. The anti-repetition engine.
- `content/formats/` — the **format deck**: per-platform libraries of proven post structures + hook banks (`README.md` there has the schema, tiers, and dealing rules). Deal a **format card + hook** to every slot — this is variance dials 3–4, the fix for flat posts. Read the relevant `content/formats/<platform>.md` before writing for that platform.
- `VOICE_DOSSIER.md` (repo root) — Jake's voice + sourcing rules.
- `content/calendar/WEEKLY-TEMPLATE.md` — copy to `content/calendar/2026-Wnn.md` and fill it in.
- `content/Ideas/` — **Jake's permanent library of top concepts.** Pre-digested concept docs (hook, building blocks, "Lines worth keeping," the pushback, per-channel cuts). `_INDEX.md` is the catalog. Draw from it every week — **it is NEVER consumed, stamped, or depleted** (§8). Strong concepts are meant to return, re-angled. Track what you used in the weekly log, not on the concept docs.

Metricool: brand (blogId) **6387301**, timezone **America/Phoenix**. The `mcp__metricool__*`
tools only load in a **fresh** session.

## Hard rules (do not violate)
- **Every post is a different idea.** This is the whole point of the batch. Plan slot-first and deal one distinct subject per post (§2). No concept appears more than **twice** in a week, never twice on the same day, never in back-to-back slots. A week that ships one idea many ways has failed — that monotony is the exact thing this rewrite exists to kill.
- **Nothing publishes.** Every post is `draft: true` (with `autoPublish: true`, so Jake can un-draft to auto-post). He approves in the planner.
- **Stat integrity.** Only numbers from CONTENT_GUIDE §2, and NEVER as a first-person claim ("I've seen 17x", "I built 100k"). The auto-mode classifier blocks those — frame as "a client" / third-person, or omit.
- **Start from a proven structure, never a blank page.** Every post is dealt a **format card + hook** from `content/formats/` (§2) — supplying that structure is exactly what was missing when the X singles came out flat. Tier-weighted ~70/30 proven/experimental; never the same card or hook back-to-back.
- **No slop.** Every piece clears the gate (§5): execute the dealt format, rotate the Topic Type, vary the opening move, lock the voice.

## 1. Pull the inputs (Metricool)
- `getBrandSettings` → confirm brand + timezone.
- `getBestTimeToPostByNetwork` for tiktok / instagram / linkedin / twitter (Threads → reuse IG timing). Only TikTok has real signal so far; the rest fall back to the conventions in `content/platforms/*.md`.
- Skim recent top posts + competitor posts if available. Read last week's `calendar/2026-Wnn.md` to see which **subjects + Topic Types + format cards + hooks** were used (don't re-run them this week).
- **Scoreboard (the feedback loop):** when Metricool analytics are available, tag recent over/under-performers with the **format card** they used and promote/demote tiers in `content/formats/<platform>.md` accordingly (`content/formats/README.md` §6). The library starts from platform best-practice and converges on what works for Jake's audience.

## 2. Build the deck, then deal it — one distinct idea per post
Plan **slot-first, not core-first.** You are not picking one subject and spreading it; you are filling a week of slots, each with a *different* subject.

1. **List the slots.** From the cadence (README §3, and §3 below) write out every post the week needs: platform × format × count (e.g. 1 TikTok carousel, 1 TikTok Reel, 1 IG carousel, 1 IG Reel, 1 LinkedIn doc, 3 LinkedIn text, 1 X thread, ~12 X singles, ~7 Threads, …). This list is the week's shape.
2. **Build the deck** — the well of distinct subjects to deal from:
   - **Subject bank** (CONTENT_MATRIX §2): Share of Brand Voice · TikTok SEO · DSP/omnichannel ads · CRO · AI-in-marketing skepticism · personal brand as exit-proof asset · benefit-of-the-benefit · marketing-news commentary · the Eight Dominoes one at a time. This is the deep, renewable well — re-angled, it never runs dry.
   - **`content/Ideas/` concepts** — Jake's permanent top-concepts library; pre-digested cards you can deal any week. Read `_INDEX.md` and draw freely — just don't re-run a concept you used in the last week or two (check last week's log, §1). **Never mark, retire, or move these** — the bank is a reference well, not an inbox. Ignore `_INDEX.md`, `_CONCEPT-TEMPLATE.md`, `VOICE_DOSSIER.md`, and the legacy `Used/` folder.
   - **Recent Grimoire posts** — each can seed one social atom.
   - The **Eight Dominoes are folded into the deck as ordinary subjects** (Jake's call) — no privileged weekly hero. Near the July launch you may weight the deck toward Dominoes, but they take their turn like anything else.
3. **Deal — subject × angle × format × hook.** Shuffle the deck and deal one **distinct subject per slot** (no subject repeats while unused subjects remain). Give each its own **Topic Type angle** (CONTENT_MATRIX §3), then deal it a **format card + hook** from that platform's `content/formats/<platform>.md`:
   - **Tier-weighted draw** — ~70% Tier-A (proven), ~30% Tier-B/C (experimental). At least one experimental card per platform per week (if it has ≥3 slots). This is the dial that raises the floor without making every post the same shape.
   - **No-repeat window** — no format card more than twice per platform per week, never back-to-back; no hook archetype twice in a row, not more than twice in any 5 consecutive posts.
   - **Pair, don't lock** — respect each card's *Best for* Topic-Type hint, but variety wins.
   The voice stays locked; the subject, angle, format, and hook all vary.
4. **If slots outnumber the deck** (the cheap channels are high-volume): make a second pass, but a recurring subject must use a **different angle** than its first deal, must not land on the same day, must not be adjacent in the queue, and **no subject exceeds 2 posts in the week.** Re-angle the subject bank before you repeat a concept — the bank × 8 angles is dozens of distinct subject×angle combos.
5. **Interleave.** Order the queue so consecutive slots and same-day posts are always different subjects. The feed should never show the same idea twice in a row.

## 3. Write each slot — its own subject, native to its platform (README §3)
Each item below is **one post = one subject** dealt in §2. Different carousels are different ideas; every single is its own idea. (Letters below just mark "a distinct subject each" — not an order.)
- **TikTok:** 8-slide carousel (subject A) + 1 stat-reveal Reel (subject B) + `***SHOOT VIDEO***` talking-head placeholders (each its own subject; script for Jake to film).
- **Instagram:** carousel (subject C) + a back-catalog Reel (subject D).
- **LinkedIn:** 8-slide document/PDF (subject E) + 2–3 text posts (subjects F, G, H — one each).
- **X:** 1 thread (one subject, told across its tweets) + ~10–15 singles, **each single its own subject** from the deck. This channel carries most of the week's variety — lean on the subject bank (CONTENT_MATRIX §2) + stat-bank stories (CONTENT_GUIDE §2) + aphorisms here.
- **Threads:** ~7 fragments, **each its own subject.**
- Register: lowercase, plainspoken on TikTok/Threads; structured diagnosis-first on LinkedIn (CONTENT_GUIDE §11).

## 4. Make the visuals
- **Carousels:** clone a brand deck in `content/assets/` (`domino-02-carousel.html` / `sobv-carousel.html`), render each 1080² `.slide` to PNG (headless Chrome element screenshot — set viewport 1080×1080, `await document.fonts.ready`, tag slides `role=img` for uids).
- **Stat-reveal Reels:** `content/video/render.js` (deterministic `seek(t)` HTML → 1080×1920 MP4; clone `content/video/sobv-reel.html`). Run `npm install --prefix content/video` once; `node content/video/render.js <html> <out.mp4> <dur> 30`.
- **Back-catalog Reels:** ~1,144 clips at `G:\My Drive\TikTok\Old\` — method in `content/drafts/backcatalog-reels.md`.
- **Host for Metricool:** commit the PNG/MP4 to a **SIDE branch** (e.g. `assets/<slug>`), use the `raw.githubusercontent.com` URL in `media[]`. Metricool copies it to its own CDN on create, so the branch is just transient hosting. **NEVER commit media to master** (it already cost 276MB once; `content/assets/clips/*.mp4` + `content/video/*.mp4` are gitignored).

## 5. The gate — every piece, no exceptions
1. **Spread check (the cardinal one)** — across the whole week: is every post a different subject? Does any concept appear more than twice, twice on one day, or in back-to-back slots? If so, re-deal it (§2). Count the distinct subjects; a healthy week is mostly unique.
2. **Angle check** — name each post's Topic Type; rotate them (don't run the same lens twice in a row) and vary the opening move (CONTENT_MATRIX §4, §6).
3. **Format pass** — name each post's **format card**. Did it actually execute that structure and land its dealt hook, or collapse into a flat statement of the idea (reading like the card's *Don't* line)? Re-draft from the skeleton if so. Confirm the deal held: ~70/30 tier mix across the week, no card or hook repeating back-to-back (`content/formats/README.md` §5, §7).
4. **Voice pass** — CONTENT_GUIDE + VOICE_DOSSIER: diagnosis-first, fragments, numbers-as-adjectives, one imperative in-world CTA, no emoji, no exclamation marks.
5. **Stop-slop pass** — run the `stop-slop` skill: no em dashes, no "here's the…" throat-clearing, no hollow rule-of-three, vary rhythm.

## 6. Push to Metricool as DRAFTS
`createScheduledPost` per piece (brand 6387301), at best-time slots. `info` is a JSON object; the proven field set:
`autoPublish:true, draft:true, shortener:false, smartLinkData:{ids:[]}, firstCommentText:"", hasNotReadNotes:false, providers:[{network}], publicationDate:{dateTime, timezone:"America/Phoenix"}, text, media:[], mediaAltText:[], descendants:[]`, plus per-network data:
- `twitterData:{tags:[]}` — X. Thread via `descendants` (each ≤280 chars); link in a trailing descendant or first comment. Use `"twitter"` as the network.
- `instagramData:{type:"POST"|"REEL", showReelOnFeed:true}` — carousel needs ≥1 image; Reel needs a video.
- `linkedinData:{documentTitle, publishImagesAsPDF:true, previewIncluded:true, type:"post"}` — document = the 8 slide PNGs as a PDF; link in `firstCommentText`.
- `threadsData:{allowedCountryCodes:[]}` · `youtubeData:{title, type:"short", privacy:"public", madeForKids:false}` · `tiktokData:{privacyOption:"PUBLIC_TO_EVERYONE", photoCoverIndex:0, title}`.
- Verify the whole set with `getScheduledPosts`.

## 7. Log + report
- Fill `content/calendar/2026-Wnn.md`: every post as a row with its **subject + Topic Type + format card + hook + tier (proven/experimental) + slot** (so the spread is visible and the scoreboard can later tag which structures performed). Note the count of distinct subjects dealt and the proven/experimental ratio. **This log — not the concept docs — is the only record of what was used; the Ideas bank stays pristine.**
- Report to Jake: the week's table (platform · **subject** · angle · slot), the `plannerUrl` each create returns, and any `***SHOOT VIDEO***` items he needs to film.

## 8. The Ideas bank is PERMANENT — never consume it
`content/Ideas/` is Jake's curated library of his best concepts. The batch **draws from it; it never depletes it.**
- **Do NOT** stamp concepts with `Shipped (social):`, **do NOT** move anything to `Used/`, **do NOT** "retire" or "recycle." Every concept stays in the active pool, every week, indefinitely. (This reverses the old lifecycle — Jake's call 2026-06-15: it's his top-concepts library, not a queue to empty.)
- **Usage is tracked in the weekly log only** (§7) plus the "don't re-run last week's subjects" rule (§1). Strong concepts are *meant* to return — re-angled, weeks apart. That's the "unique, returning takes" Jake wants, not a sign the pool is dry.
- The renewable **subject bank** (CONTENT_MATRIX §2) carries the bulk of the week's volume; the Ideas library is the premium material you reach into as often as it fits — without ever using it up.
- *(The blog drafter — a separate scheduled task — may keep its own `Shipped (blog):` note on a concept so it doesn't write a duplicate Grimoire post, but that never removes the concept from this bank.)*
- Report which concepts you drew from this week (for the log). Nothing retires.
