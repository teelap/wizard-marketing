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
- `content/video/catalog.json` — the **video catalog**: ~1,000 back-catalog clips (Jake's TikTok library), each with a title, topic, hashtags, a written summary + AI teaching-quality prior (joined from the knowledge base), and live tracking (`status` / `rating` / `usedDates`). Built by `content/video/build-catalog.js`, dealt by `content/video/deal-videos.js`, logged by `content/video/mark-posted.js`. **The source of truth for the video spine** (the section directly below the hard rules). Unlike the Ideas bank, this one *is* metered — clips have a cooldown, winners are favored, duds retire.

Metricool: brand (blogId) **6387301**, timezone **America/Phoenix**. The `mcp__metricool__*`
tools only load in a **fresh** session.

## Hard rules (do not violate)
- **The video spine ships every run — it is the #1 output.** 2 back-catalog reels/day (14/week), dealt from `content/video/catalog.json`, drafted to Metricool. Every weekly review reaches the same verdict: the reel is the one unit that reliably reaches Jake's warm base, and the weeks it doesn't run the program goes dark (W29). Do the video spine (the section directly below) **before** the text deck, never as an afterthought that gets skipped when the run runs long.
- **Every post is a different idea.** This is the whole point of the batch. Plan slot-first and deal one distinct subject per post (§2). No concept appears more than **twice** in a week, never twice on the same day, never in back-to-back slots. A week that ships one idea many ways has failed — that monotony is the exact thing this rewrite exists to kill.
- **Nothing publishes.** Every post is `draft: true` (with `autoPublish: true`, so Jake can un-draft to auto-post). He approves in the planner.
- **Stat integrity.** Only numbers from CONTENT_GUIDE §2, and NEVER as a first-person claim ("I've seen 17x", "I built 100k"). The auto-mode classifier blocks those — frame as "a client" / third-person, or omit.
- **Start from a proven structure, never a blank page.** Every post is dealt a **format card + hook** from `content/formats/` (§2) — supplying that structure is exactly what was missing when the X singles came out flat. Tier-weighted ~70/30 proven/experimental; never the same card or hook back-to-back.
- **No slop.** Every piece clears the gate (§5): execute the dealt format, rotate the Topic Type, vary the opening move, lock the voice.
- **No book CTA, no "Domino" label (for now).** Jake's call 2026-06-19: the book/waitlist CTA is **paused** and "Get the truth" is **retired**. Don't name "the Dominoes" / "Domino N of 8" / "the Eight Dominoes" framework on a post unless it's specifically about the book — teach the concept plainly (CONTENT_GUIDE §6, §8). Off-book, close on consulting ("Book the call"), the relevant Grimoire post, or the newsletter.

## ▶ THE VIDEO SPINE — 2 back-catalog reels/day (do this first; the reel is the program)
The backbone within the backbone. ~1,000 of Jake's old TikTok clips live locally at `G:\My Drive\TikTok\Old\` (the Google Drive sync; the Drive *API* connector is on the wrong Google account, so we read the **local mount**, which is faster anyway). The catalog (`content/video/catalog.json`) already knows each clip's title, topic, and a written summary + AI score (joined from the knowledge base). Posting **2/day** makes reach independent of whether Jake films this week — the fix every review has asked for.

The dealer is the **video equivalent of §2's subject deal**: one distinct subject per reel, no topic stacked, favor proven, respect a cooldown. Run it, take its set, caption + host + draft each.

1. **Refresh the catalog:** `node content/video/build-catalog.js` — re-scans the clip folder, re-joins knowledge-base transcripts, and **preserves** every clip's `status`/`rating`/`usedDates` (so retirements + winner-marks from past reviews stick). Fast; no ffprobe unless you pass `--durations`.
2. **Deal the week:** `node content/video/deal-videos.js --week 2026-Wnn` → 14 reels (2/day, Mon–Sun), already spread one-topic-each, favoring `rating:good` then high AI prior, skipping `retired`/`bad` and anything used in the last 12 weeks, never the same content (`kbId`) twice. Add `--json` to parse it. Take the dealt set as given — it enforces the same "different idea every post" rule §2 does for text.
3. **Caption each through the gate (§5).** Build the caption from the clip's `summary`; when the exact wording matters, pull the full transcript from `C:\Users\jacob\Projects\knowledgebase\_data\transcripts-included.json` by the clip's `kbId`. **Keyword-first** for TikTok/YouTube SEO — the searchable phrase in the first line, the on-screen note, and the caption (same discipline as the shoot scripts). One in-world imperative CTA; **book CTA paused** (hard rules) — close on the blog, consulting, or follow.
4. **Host + schedule each reel:** copy the clip's `file` from the local folder, host it via the **side-branch pipeline (§4)**, and `createScheduledPost` with the clip URL in `media[]` (§6) at the dealt `platform`/`crosspost`. Default rotation **tiktok · instagram (+facebook) · youtube-short**, 2/day; the Sunday review tunes the mix. Reels are `draft:true` like everything else.
5. **Record the use:** after Metricool confirms each draft, `node content/video/mark-posted.js <id> <isoDate> <network>` — this starts the clip's cooldown and keeps the tracking honest. Then log the reels in the weekly file (§7).

**Jake's own daily video is his to post (his call).** Keep writing **one keyword-first `***SHOOT VIDEO***` talking-head script per day** (in `content/drafts/video-shoot-list.md` / the calendar) so he always has a prompt to film against — but **the batch does not schedule it**; he films and uploads to Metricool himself. The batch owns the 2 automated back-catalog reels/day; his fresh daily reel rides on top.

**This layers on top of the carousels + text — it does not replace them.** It lifts the video channels to ≈ TikTok 5 · Instagram 5 (→ Facebook) · YouTube Shorts 4 per week, scaling the README §3 cadence toward video (the priority).

## 1. Pull the inputs (Metricool)
- `getBrandSettings` → confirm brand + timezone.
- `getBestTimeToPostByNetwork` for tiktok / instagram / linkedin / twitter (Threads → reuse IG timing). Only TikTok has real signal so far; the rest fall back to the conventions in `content/platforms/*.md`.
- Skim recent top posts + competitor posts if available. Read last week's `calendar/2026-Wnn.md` to see which **subjects + Topic Types + format cards + hooks** were used (don't re-run them this week).
- **Scoreboard (the feedback loop):** when Metricool analytics are available, tag recent over/under-performers with the **format card** they used and promote/demote tiers in `content/formats/<platform>.md` accordingly (`content/formats/README.md` §6). The library starts from platform best-practice and converges on what works for Jake's audience.
- **Deal the video spine now** (it's the #1 output): `node content/video/build-catalog.js` then `node content/video/deal-videos.js --week 2026-Wnn` — see the ▶ video-spine section above. Hold the 14 dealt reels alongside the text set; caption/host/draft them in §4–§6.

## 2. Build the deck, then deal it — one distinct idea per post
Plan **slot-first, not core-first.** You are not picking one subject and spreading it; you are filling a week of slots, each with a *different* subject.

1. **List the slots.** From the cadence (README §3, and §3 below) write out every post the week needs: platform × format × count (e.g. 1 TikTok carousel, 1 TikTok Reel, 1 IG carousel, 1 IG Reel, 1 LinkedIn doc, 3 LinkedIn text, 1 X thread, ~12 X singles, ~7 Threads, …). This list is the week's shape.
2. **Build the deck** — the well of distinct subjects to deal from:
   - **Subject bank** (CONTENT_MATRIX §2): Share of Brand Voice · TikTok SEO · DSP/omnichannel ads · CRO · AI-in-marketing skepticism · personal brand as exit-proof asset · benefit-of-the-benefit · marketing-news commentary · the eight messaging concepts one at a time (taught plainly — **NOT labeled "Dominoes" unless the post is book-specific**). This is the deep, renewable well — re-angled, it never runs dry.
   - **`content/Ideas/` concepts** — Jake's permanent top-concepts library; pre-digested cards you can deal any week. Read `_INDEX.md` and draw freely — just don't re-run a concept you used in the last week or two (check last week's log, §1). **Never mark, retire, or move these** — the bank is a reference well, not an inbox. Ignore `_INDEX.md`, `_CONCEPT-TEMPLATE.md`, `VOICE_DOSSIER.md`, and the legacy `Used/` folder.
   - **Recent Grimoire posts** — each can seed one social atom.
   - The **eight messaging concepts are folded into the deck as ordinary subjects** (Jake's call) — no privileged weekly hero, and **taught plainly without the "Domino" / "Eight Dominoes" label** (the audience doesn't know the term; the book branding + waitlist CTA are reserved for book-specific posts and paused for now — Jake's call 2026-06-19). Near the July launch you may turn the book branding back on and weight the deck toward the framework, but for now they take their turn like any other subject.
3. **Deal — subject × angle × format × hook.** Shuffle the deck and deal one **distinct subject per slot** (no subject repeats while unused subjects remain). Give each its own **Topic Type angle** (CONTENT_MATRIX §3), then deal it a **format card + hook** from that platform's `content/formats/<platform>.md`:
   - **Tier-weighted draw** — ~70% Tier-A (proven), ~30% Tier-B/C (experimental). At least one experimental card per platform per week (if it has ≥3 slots). This is the dial that raises the floor without making every post the same shape.
   - **No-repeat window** — no format card more than twice per platform per week, never back-to-back; no hook archetype twice in a row, not more than twice in any 5 consecutive posts.
   - **Pair, don't lock** — respect each card's *Best for* Topic-Type hint, but variety wins.
   The voice stays locked; the subject, angle, format, and hook all vary.
4. **If slots outnumber the deck** (the cheap channels are high-volume): make a second pass, but a recurring subject must use a **different angle** than its first deal, must not land on the same day, must not be adjacent in the queue, and **no subject exceeds 2 posts in the week.** Re-angle the subject bank before you repeat a concept — the bank × 8 angles is dozens of distinct subject×angle combos.
5. **Interleave.** Order the queue so consecutive slots and same-day posts are always different subjects. The feed should never show the same idea twice in a row.

## 3. Write each slot — its own subject, native to its platform (README §3)
Each item below is **one post = one subject** dealt in §2. Different carousels are different ideas; every single is its own idea. (Letters below just mark "a distinct subject each" — not an order.)
- **TikTok:** 8-slide carousel (subject A) + 1 stat-reveal Reel (subject B). *(Back-catalog reels are dealt centrally by the ▶ video spine, not re-dealt here. The `***SHOOT VIDEO***` daily talking-head is Jake's to film + post himself — write the script, don't schedule it.)*
- **Instagram:** carousel (subject C). *(IG also receives its share of the video spine's back-catalog reels — dealt above, not as a separate per-week single here.)*
- **LinkedIn:** 8-slide document/PDF (subject E) + 2–3 text posts (subjects F, G, H — one each).
- **X:** 1 thread (one subject, told across its tweets) + ~10–15 singles, **each single its own subject** from the deck. This channel carries most of the week's variety — lean on the subject bank (CONTENT_MATRIX §2) + stat-bank stories (CONTENT_GUIDE §2) + aphorisms here.
- **Threads:** ~7 fragments, **each its own subject.**
- Register: lowercase, plainspoken on TikTok/Threads; structured diagnosis-first on LinkedIn (CONTENT_GUIDE §11).

## 4. Make the visuals
- **Carousels:** clone a brand deck in `content/assets/` (`domino-02-carousel.html` / `sobv-carousel.html`), render each 1080² `.slide` to PNG (headless Chrome element screenshot — set viewport 1080×1080, `await document.fonts.ready`, tag slides `role=img` for uids).
- **Stat-reveal Reels:** `content/video/render.js` (deterministic `seek(t)` HTML → 1080×1920 MP4; clone `content/video/sobv-reel.html`). Run `npm install --prefix content/video` once; `node content/video/render.js <html> <out.mp4> <dur> 30`.
- **Back-catalog reels (the video spine — 14/week):** already dealt from `content/video/catalog.json` (the ▶ section above); files live at `G:\My Drive\TikTok\Old\`. For each dealt clip: copy its `file` into a temp path, host it on the side branch (below), put the `raw.githubusercontent.com` URL in `media[]`, and after Metricool confirms run `node content/video/mark-posted.js <id> <date> <network>`. (Legacy hand method + the first 10 staged captions: `content/drafts/backcatalog-reels.md`.)
- **Host for Metricool:** commit the PNG/MP4 to a **SIDE branch** (e.g. `assets/<slug>`), use the `raw.githubusercontent.com` URL in `media[]`. Metricool copies it to its own CDN on create, so the branch is just transient hosting. **NEVER commit media to master** (it already cost 276MB once; `content/assets/clips/*.mp4` + `content/video/*.mp4` are gitignored).

## 5. The gate — every piece, no exceptions
1. **Spread check (the cardinal one)** — across the whole week: is every post a different subject? Does any concept appear more than twice, twice on one day, or in back-to-back slots? If so, re-deal it (§2). Count the distinct subjects; a healthy week is mostly unique.
2. **Angle check** — name each post's Topic Type; rotate them (don't run the same lens twice in a row) and vary the opening move (CONTENT_MATRIX §4, §6).
3. **Format pass** — name each post's **format card**. Did it actually execute that structure and land its dealt hook, or collapse into a flat statement of the idea (reading like the card's *Don't* line)? Re-draft from the skeleton if so. Confirm the deal held: ~70/30 tier mix across the week, no card or hook repeating back-to-back (`content/formats/README.md` §5, §7).
4. **Voice pass** — CONTENT_GUIDE + VOICE_DOSSIER: diagnosis-first, fragments, numbers-as-adjectives, one imperative in-world CTA, no emoji, no exclamation marks.
5. **Stop-slop pass** — run the `stop-slop` skill: no em dashes, no "here's the…" throat-clearing, no hollow rule-of-three, vary rhythm.
6. **Video pass (the spine's reels).** For each dealt reel: the caption is **keyword-first** (searchable phrase in line 1 + on-screen note + caption); the clip actually matches its dealt subject (skim the `summary`/transcript — don't caption a backlinks clip as a CRO post); it isn't retired/`bad` or used in the last 12 weeks (the dealer enforces this — sanity-check it held); and the hosted `media[]` URL returns 200 before you schedule. The caption still clears the voice + stop-slop passes above.

## 6. Push to Metricool as DRAFTS
`createScheduledPost` per piece (brand 6387301), at best-time slots. `info` is a JSON object; the proven field set:
`autoPublish:true, draft:true, shortener:false, smartLinkData:{ids:[]}, firstCommentText:"", hasNotReadNotes:false, providers:[{network}], publicationDate:{dateTime, timezone:"America/Phoenix"}, text, media:[], mediaAltText:[], descendants:[]`, plus per-network data:
- `twitterData:{tags:[]}` — X. Thread via `descendants` (each ≤280 chars); link in a trailing descendant or first comment. Use `"twitter"` as the network.
- `instagramData:{type:"POST"|"REEL", showReelOnFeed:true}` — carousel needs ≥1 image; Reel needs a video.
- `linkedinData:{documentTitle, publishImagesAsPDF:true, previewIncluded:true, type:"post"}` — document = the 8 slide PNGs as a PDF; link in `firstCommentText`.
- `threadsData:{allowedCountryCodes:[]}` · `youtubeData:{title, type:"short", privacy:"public", madeForKids:false}` · `tiktokData:{privacyOption:"PUBLIC_TO_EVERYONE", photoCoverIndex:0, title}`.
- **Spine reels:** one `createScheduledPost` per reel with the **hosted clip** in `media:[url]` (a Reel/Short needs the video, not an image) — `instagramData:{type:"REEL", showReelOnFeed:true}`, `youtubeData:{type:"short", …}`, or `tiktokData`. A Facebook cross-post is a second create off the same URL. After each confirms, run `content/video/mark-posted.js`.
- Verify the whole set with `getScheduledPosts`.

## 7. Log + report
- Fill `content/calendar/2026-Wnn.md`: every post as a row with its **subject + Topic Type + format card + hook + tier (proven/experimental) + slot** (so the spread is visible and the scoreboard can later tag which structures performed). Note the count of distinct subjects dealt and the proven/experimental ratio. **This log — not the concept docs — is the only record of what was used; the Ideas bank stays pristine.**
- **Video spine:** log the 14 reels as their own table — day · network · clip `id` · title · topic · prior/rating · `plannerUrl`. Confirm `content/video/mark-posted.js` ran for each (their `usedDates` now include this week). This table is what the Sunday review joins to Metricool performance to set each clip's `rating` and retire the duds. *(Unlike the text log above, the catalog itself is the durable record — the calendar table is just this week's view of it.)*
- Report to Jake: the week's table (platform · **subject** · angle · slot), the **video spine (14 reels)**, the `plannerUrl` each create returns, and the daily `***SHOOT VIDEO***` scripts he'll film + post himself.

## 8. The Ideas bank is PERMANENT — never consume it
`content/Ideas/` is Jake's curated library of his best concepts. The batch **draws from it; it never depletes it.**
- **Do NOT** stamp concepts with `Shipped (social):`, **do NOT** move anything to `Used/`, **do NOT** "retire" or "recycle." Every concept stays in the active pool, every week, indefinitely. (This reverses the old lifecycle — Jake's call 2026-06-15: it's his top-concepts library, not a queue to empty.)
- **Usage is tracked in the weekly log only** (§7) plus the "don't re-run last week's subjects" rule (§1). Strong concepts are *meant* to return — re-angled, weeks apart. That's the "unique, returning takes" Jake wants, not a sign the pool is dry.
- The renewable **subject bank** (CONTENT_MATRIX §2) carries the bulk of the week's volume; the Ideas library is the premium material you reach into as often as it fits — without ever using it up.
- *(The blog drafter — a separate scheduled task — may keep its own `Shipped (blog):` note on a concept so it doesn't write a duplicate Grimoire post, but that never removes the concept from this bank.)*
- Report which concepts you drew from this week (for the log). Nothing retires.

> **The video catalog is the deliberate opposite of this bank.** `content/video/catalog.json` *is* metered: clips carry a 12-week cooldown (via `usedDates`), winners get favored (`rating:good`), and duds retire (`status:retired`, set by the Sunday review). The Ideas bank is a well you never empty; the video catalog is a deck you deal, track, and prune. Don't apply Ideas-bank rules to the catalog, or catalog rules to the Ideas bank.
