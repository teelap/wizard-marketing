# Jake the Wizard — Content Engine

**Version:** 1.0 · 2026-06-11
**What this is:** the operating system for Jake's owned content — how we plan it, create it, schedule it, and measure it. Self-contained under `content/`.

> Replaces the abandoned Blotato pipeline. Blotato was removed 2026-06-11 ("it was bad").
> Brand voice lives in `../VOICE_DOSSIER.md`; visual canon in `../JtW-BRAND-ASSET-SYSTEM.md`. Those two stay at repo root because the website copy uses them too.

---

## 0. NORTH STAR

One marketer, every channel, no slop. We use **Metricool as the brain** (planning data + scheduling + analytics) and **our own AI tools as the hands** (copy + images + carousels). Jake's voice and the Eight Dominoes IP are the DNA. The bet for the next quarter: **build the book ("Eight Dominoes," July 2026) waitlist and Jake's authority** by turning one idea a week into platform-native content everywhere his buyers are.

The brand thesis is also a production rule: *"It takes a human to connect with humans; AI is the center of the bell curve."* So AI assists (copy drafts, graphics, scheduling) — but the **point of view, the numbers, the scars, and Jake's face on camera stay human.** We never ship generic AI slop in his name.

---

## 1. THE LOOP

```
   ┌─ 1. PLAN ───────┐    ┌─ 2. CREATE ─────┐    ┌─ 3. SCHEDULE ──┐    ┌─ 4. MEASURE ───┐
   │  Metricool data  │ →  │  Our own tools   │ →  │ Metricool queue │ →  │ Metricool stats │
   └──────────────────┘    └──────────────────┘    └─────────────────┘    └────────┬───────┘
            ▲                                                                        │
            └──────────────────────  learnings feed next week  ─────────────────────┘
```

| Stage | What happens | Tooling |
|---|---|---|
| **1. Plan** | List the week's slots, build the deck, deal one distinct subject per post. Pull best-times, top past posts, competitor posts, trending topics. | Metricool: `get_best_time_to_post`, `get_*_posts`, `get_network_competitors_posts`, `get_analytics`, Hashtag Tracker |
| **2. Create** | Write copy in Jake's voice; generate on-brand graphics/carousels; assemble per-platform. | Claude (copy) · mcp-image (graphics) · Gamma (carousels/docs/pages) · Metricool Adobe Express (template variants) |
| **3. Schedule** | Load drafts into Metricool's planner at best-time slots; Jake approves; publish. | Metricool: `post_schedule_post`, `get_scheduled_posts`, `update_schedule_post` |
| **4. Measure** | Read what hit; tag winners/losers with the **format card** they used; feed the next plan + promote/demote the format-deck tiers (the scoreboard). | Metricool analytics + GA4/GSC for the site/blog |

---

## ⚑ QA GATE — voice pass + stop-slop pass (NON-NEGOTIABLE)

**Hard rule (Jake, 2026-06-11): every piece of text we publish — any platform, any format (captions, threads, carousels, blog, newsletter, replies, ad copy, even a one-line post) — clears these gates before it is scheduled. No exceptions, no "it's just a tweet."**

1. **Voice pass** — align to `CONTENT_GUIDE.md` (the content rulebook) and `../VOICE_DOSSIER.md` §2. Check: diagnosis-first; fragments + tricolons; **numbers as the adjectives**; the anti-fluff oath (BANNED — corporate jargon like synergy / best-in-class / leverage-as-noun; hype superlatives without a number; **exclamation marks**; hedging like "might / could potentially"; guru promises). In-world imperative CTAs ("Send Truth," "Summon the Wizard"), never "Learn more / Submit." Platform nuance: lowercase plainspoken on TikTok/Threads; no emoji on the website, sparing elsewhere. Fingerprint: avg under 12 words/sentence, one idea each, second person, concrete nouns, semicolons never. *Question it answers: does this sound like Jake?*
2. **Spell / typo pass** — read every line for misspellings, missing apostrophes, and non-US spellings. Jake writes American English: *optimize*, *behavior*, *recognize* — never *optimise / behaviour / recognise*. Cheapest gate in the list and the one that had been missing: reviews W25 → W31 all carried "add a typo pass" as an open recommendation, and W32's batch caught two British spellings with it on the first run. *Question it answers: would a careful human have shipped this?*
3. **Stop-slop pass** — run the **`stop-slop` skill** on the draft to strip AI tells (the "it's not just X, it's Y" construction, "in today's landscape," delve/tapestry/realm, hollow rule-of-three, throat-clearing transitions, em-dash overuse, reflexive hedging). *Question it answers: does this sound like a human, not an LLM?* If it reads like AI wrote it, it does not ship.

**The order is: draft → spread → angle → format → voice → spell → stop-slop → Jake approves → schedule.** The gate sits *before* the queue — which is the other reason we never auto-publish. The plan-time checks — **spread** (a different subject per post), **angle** ("different Topic Type + hook than last time?"), and **format** ("did it execute its dealt structure, or collapse into a flat statement?") — live in [CONTENT_MATRIX.md](CONTENT_MATRIX.md) §6 and draw on the [format deck](formats/README.md); they govern *variety + structure*, while the voice and stop-slop passes govern *prose quality*. The format pass is the one that catches a flat post before Jake has to. Recorded as a hard constraint in memory (`feedback-content-qa-gate`) so it holds across sessions.

---

## 2. THE MODEL: ONE IDEA PER POST (slot-first, not core-first)

Don't take one idea and spread it across the whole week — even through different lenses, it makes the feed read like a single point held for seven days (the failure mode we hit in W25: 28 drafts, one concept). Instead, plan **slot-first**: list the posts the week's cadence calls for, then **deal a different subject to each** from a deck.

```
            ┌──────────────── THE WEEK'S DECK (the well of subjects) ─────────────────┐
            │  Subject bank (CONTENT_MATRIX §2) · content/Ideas/ concepts ·            │
            │  recent Grimoire posts   (messaging concepts taught plainly, NOT         │
            │  labeled "Dominoes" off-book — CONTENT_GUIDE §6, §8)                     │
            └────────────────────────────────┬────────────────────────────────────────┘
                                              │   deal ONE distinct subject per slot
   TikTok          Instagram       LinkedIn         X                Threads      YouTube       Blog/Newsletter
 carousel = A     carousel = C    doc = E        thread = I       frag = M     short = P     pillar = (a dealt
 reel = B         reel = D        text = F,G,H   singles = J,K…   frag = N…    long = Q      concept) + email
```

Each letter is a *different* subject. Every post is its own idea, in a platform-native format, through a rotated **Topic Type** (myth, pitfall, method, FAQ, story, takeaway, tip, commentary). The **voice stays constant; the subject, angle, hook, and format all rotate.** No subject appears more than twice in a week, never twice in a day, never back-to-back. The subject deck + rotation rules live in [CONTENT_MATRIX.md](CONTENT_MATRIX.md); the **format + hook** dealt to each post come from the per-platform [format deck](formats/README.md) (`content/formats/`, dials 3–4 — proven structures so posts start sharp, not flat).

This costs more net-new thinking than the old "atomize one core" model — but most of the weekly volume is the cheap text channels (X singles, Threads fragments) where a distinct one-line take is fast, and the expensive visuals are only a handful (each now a different idea). **Evergreen is the bouncing backbone; reactive posts ride on top.**

---

## 3. CADENCE BY PLATFORM (starting "steady"; scale during the July push)

| Platform | Steady cadence | Priority | Hero format | Detail |
|---|---|---|---|---|
| **TikTok** | ~1/day (4–7/wk) | ★★★ Primary | Photo carousels + talking-head clips | [tiktok.md](platforms/tiktok.md) |
| **LinkedIn** | 1 carousel + 4 text/wk (2 text w/ static image) + weekly newsletter | ★★★ Primary (B2B) | Document/carousel PDFs | [linkedin.md](platforms/linkedin.md) |
| **Instagram** | 4–5/wk | ★★ Real effort | Carousels + Reels | [instagram.md](platforms/instagram.md) |
| **X / Twitter** | 3–5/day + 1–2 threads/wk | ★★ Real effort (cheap, text) | Threads + hot-takes | [x.md](platforms/x.md) |
| **Threads** | 1–2/day + replies | ★★ High ROI (cheapest) | Text fragments | [threads.md](platforms/threads.md) |
| **YouTube** | 1 long-form/wk + 3–5 Shorts/wk | ★★ Search/authority bet | Long-form + clip Shorts | [youtube.md](platforms/youtube.md) |
| **Facebook** | 3–5/wk (auto cross-post) | ★ Cross-post only | Cross-posted Reels/carousels | [facebook.md](platforms/facebook.md) |

"Steady" is platform-specific on purpose — X wants volume because it's near-free text; LinkedIn rewards restraint. The total is sustainable because the cheap high-volume channels (X, Threads) carry one-line takes that are fast to write, and the expensive visuals are only a handful a week.

---

## 4. THE APPROVAL WORKFLOW

Two layers, **one approval surface.** Claude generates and runs the QA gate, then drafts everything into **Metricool's planner**; Jake approves there — weekly batch and daily reactive alike. One consistent place to review everything. Email is not in the loop.

### Weekly batch — the backbone (~1 hr, Mondays)
1. **Claude** pulls Metricool data, lists the week's slots, deals a different subject to each from the deck, and generates the set (copy + graphics) per the per-platform rules.
2. Posts are loaded into **Metricool's planner as drafts/pending** at best-time slots.
3. **Jake** opens the planner (web or mobile app), sees real per-platform previews, and approves / edits / reorders in one sitting.
4. Approved → scheduled.

### Daily reactive — the timely layer (~15 min/day)
1. **Claude** scans signals each morning — competitors (Metricool), plus what's moving on X / LinkedIn / marketing news.
2. Claude drafts **1–2 time-sensitive posts**, runs them through the QA gate, and loads them into **Metricool's planner as drafts** at the next good slot — the same place as the weekly batch.
3. Jake reviews the day's drafts in Metricool (~15 min); approving one **bumps an evergreen post back into the queue** — evergreen is the shock absorber, so the calendar stays full without doubling up.

> **To verify next session (Metricool MCP):** whether the API creates true *draft* status vs. a *scheduled* post we approve-by-leaving. If drafts aren't supported via API, the fallback is: review the batch in `content/drafts/` first, then push only greenlit posts to Metricool's schedule. Either way, **nothing publishes without Jake's yes.**

Recurring automation note: making the Monday batch run on its own should be a **claude-commander App / scheduled task** (it runs one pass and exits) — not a background daemon.

---

## 5. THE BLOG (website) ↔ SOCIAL

The site blog — **The Grimoire** (`/grimoire`, posts in `content/grimoire/*.md`) — is the **pillar**; social posts are the **atoms**; YouTube long-form + the newsletter are the **compounding, search-durable layer** TikTok can't be.

- **Blog → social:** a post can seed social atoms — a TikTok/IG carousel, a LinkedIn document, an X thread, Threads fragments, a YouTube Short script — but dealt into the rotation over time, respecting the one-idea-per-post cap (not all in a single week).
- **Social → blog:** top-performing takes + video/podcast transcripts → long-form SEO posts targeting buyer queries ("messaging framework," "share of brand voice," "TikTok SEO") — the same keywords YouTube long-form targets.
- **Blog → newsletter:** posts feed the Resend weekly email and the LinkedIn newsletter (both bypass the feed algorithm; both build the book waitlist).
- **Measurement:** GA4 + GSC already track the site (see memory `google-analytics-setup`); Metricool tracks the social side and the site via its Web connection.

---

## 6. JULY BOOK LAUNCH OVERLAY ("Eight Dominoes")

Launch is **July 2026**. The eight messaging concepts live in the weekly deck as ordinary subjects (no privileged "one domino per week" hero — Jake's call, so the feed bounces), but **taught plainly, without the "Domino" / "Eight Dominoes" label** — the cold audience doesn't know the term (Jake's call 2026-06-19; CONTENT_GUIDE §6, §8). **The "Eight Dominoes" branding AND the book/waitlist CTA are reserved for posts specifically about the book and for the launch window — both are paused in the everyday engine until launch is closer.** Near launch: turn the book branding back on, weight the deck toward the framework to tighten the drumbeat, build the waitlist on **owned channels** (Resend email + LinkedIn newsletter) the algorithm can't throttle, and amplify the 2–3 best-performing LinkedIn carousels via **Thought Leader Ads**. One free chapter = the lead magnet, hosted on the blog.

---

## 7. TOOLKIT & GAPS

**Have (confirmed live):** Claude (copy) · mcp-image (still graphics, 9:16/4:5/1:1, brand palette) · Gamma (carousels, docs, webpages) · Google Drive (asset library) · Metricool (schedule + data + Hashtag Tracker + **Adobe Express** design integration) · GA4/GSC (site) · Resend (newsletter).

**Gaps to close (in priority order):**
1. **Short-form video — ADDRESSED (2026-07-20).** The **video spine** now posts **2 back-catalog reels/day** (14/week) automatically, dealt from `content/video/catalog.json` (1,009 clips) by the `weekly-evergreen` batch. Jake stays on camera as the hero — he films + posts one fresh reel/day himself. Still open: motion graphics from stills for stat reveals (partly covered by `content/video/render.js`).
2. **Transcription / clipping tool — SOLVED (2026-07-20).** No Whisper needed: the knowledge base already holds transcripts + written summaries for ~735 clips, and `content/video/build-catalog.js` joins them to the catalog (73% of clips matched). On-demand Whisper stays an option for any unmatched clip we specifically want to feature.
3. **Design at scale.** Gamma + mcp-image cover most; **Canva** shows connected to claude.ai but its tools aren't callable in this environment (verify). *Plan:* lean on mcp-image brand templates + Metricool's Adobe Express for quick variants.
4. **Public media hosting — SOLVED (proven).** The transient **side-branch → `raw.githubusercontent.com`** pipeline hosts each clip/graphic for Metricool to fetch (it copies to its own CDN on create), then the branch is deleted. Handles the 14 reels/week. Vercel Blob is the clean upgrade if volume ever warrants dropping the git housekeeping.

---

## 8. FOLDER STRUCTURE

```
content/
  README.md            ← this file (the plan + workflow)
  platforms/           ← per-platform rulebooks (cadence, formats, algorithm, specs)
    tiktok.md  instagram.md  threads.md  x.md  linkedin.md  facebook.md  youtube.md
  formats/             ← the FORMAT DECK: per-platform proven post structures + hook banks (dials 3–4, the flat-post fix)
    README.md          ← the schema, tiers (A/B/C), the ~70/30 dealing rules, the scoreboard
    x.md  threads.md  linkedin.md  tiktok.md  instagram.md  youtube.md  facebook.md
  calendar/
    WEEKLY-TEMPLATE.md ← the weekly batch planning template
    2026-Wnn.md        ← one file per week (the rolling plan)
  CONTENT_GUIDE.md     ← voice rules + stat bank + banned list + CTAs + Eight Dominoes wording (the content-gen rulebook; the voice pass checks against this)
  CONTENT_MATRIX.md    ← the angle engine: Core → Subtopics → 8 Topic Types + variance/rotation rules (keeps angles from repeating)
  drafts/              ← posts in progress (copy + image refs) before they hit Metricool
  assets/              ← generated graphics / brand template exports
  grimoire/            ← The Grimoire blog: markdown posts served at /grimoire (each post can seed social atoms, metered into the rotation)
```

The "database" is just the calendar: a Markdown/CSV file per week here is the source of truth for *what's planned*; **Metricool's planner is the source of truth for what's scheduled/live.** Keep it lightweight — no real DB needed.

---

## 9. OPEN DECISIONS (need Jake's call)

1. **Video approach — RESOLVED (2026-07-20, Jake's call):** Jake on camera as hero (he films + posts one fresh reel/day himself) **plus** an automated back-catalog **video spine** (2 reels/day from `content/video/catalog.json`). No AI-generated video. Hosting = the proven side-branch pipeline; sources = the TikTok back-catalog only for now (Downloads stash held back).
2. **Brand docs location:** leave `VOICE_DOSSIER.md` + `JtW-BRAND-ASSET-SYSTEM.md` at root (shared with the website), or move copies into `content/brand/`?
3. **X Premium / Verified:** research shows a 2–4x reach boost and it's now a ranking signal. Worth subscribing for the launch?
4. **Facebook Group:** spin up an owned "Eight Dominoes / Share of Brand Voice" Group (5–10x the reach of a Page), or skip Facebook entirely?
5. **Blotato file cleanup — DONE (2026-06-11):** migrated the kit to `CONTENT_GUIDE.md`, stripped Blotato refs from `../JtW-BRAND-ASSET-SYSTEM.md`, and moved the 5 legacy files to `_archive/` (gitignored — purge anytime).
