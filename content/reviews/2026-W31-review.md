# Weekly Review — 2026-W31 (the spine works; the gate is no longer absence, it's selection)

**Run:** late Sunday **2026-08-02** (autonomous `weekly-review`). **Brand:** Jake the Wizard (Metricool blogId 6387301, America/Phoenix). **Reviewer:** scheduled task, no human present. **Week scored:** Mon 07-27 → Sun 08-02.

> **The headline: the video spine published for the first time, and it performed at parity with Jake's own footage — but only 2 of its 14 reels ever left drafts.** Program reach **~8,312 impressions / ~248 interactions**, down 33% from W30's 12,332. The fall is entirely a throughput story: **3 of 27 dealt posts published (11%)**, against 8 of 18 (44%) last week, plus **0 of 10 daily-reactive drafts** (W30: 6).
>
> **The spine's verdict is in, and it is the answer the last five reviews were waiting for.** Two back-catalog clips published. On Instagram they landed at **0.92x and 1.00x the network median** — statistically indistinguishable from Jake's freshly-filmed reels. On TikTok, **1.00x median**. And when Jake manually re-routed one of them to all seven networks, it took **104 imp on LinkedIn = 2.04x median and the top LinkedIn post of the week** — beating both the dealt text post (89) and every one of Jake's own new reels there (median 48). **A three-year-old teaching clip out-performed new footage.** From two clips the spine returned **1,289 impressions — 15.5% of all program reach.**
>
> **And the throughput diagnosis has changed shape, which matters more than the numbers.** W30 concluded the deck was *missed* on the mornings Jake wasn't in the planner. That is no longer true. This week Jake was in Metricool **six days out of seven** — and on every one of them he created and published a brand-new post rather than actioning the queue. He touched the drafts folder on exactly two days and actioned **three** items total. Those three items became the #1 (spine reel on LinkedIn, 2.04x), #3 (dealt LinkedIn text, 1.75x) and a clean at-median IG reel. **When the deck gets touched it beats the network. It is simply not being opened.**
>
> This review makes **0 tier moves** (only one dealt card published all week; it was already Tier A and it beat median). It records the **first two video-catalog ratings in the program's history** (`good` / `ok`), **repairs 12 corrupted catalog entries** and one mis-tag, **retracts a wrong W30 finding** on the evidence, and writes **9 evidence-tied emphasis notes** across all seven platform files — including the first YouTube note ever. Voice / CONTENT_GUIDE untouched (locked). Not a monthly-refresh run (last W28; next ~W32 — now overdue).

---

## 1. The data pulled

- `getBrandSettings` → brand confirmed (7 networks).
- `getAnalyticsDataByMetrics` `BSPO01–09` (07-27 → 08-02, all networks) → 40 published rows. **Timestamps are UTC** on this connector, **Phoenix** on `getScheduledPosts`; all times below are **Phoenix** (verified: spine `what-is-schema` planner 08:33 Phx ↔ analytics `20260729153457` = 15:34 UTC).
- `getScheduledPosts` (four windows: 07-27→28, 07-29→30, 07-31→08-01, 08-02) → the publish/draft ledger in §2.0. Every un-published item confirmed still `draft:true` / `PENDING` with a passed date.
- `getBestTimeToPostByNetwork` (TikTok) → §3.
- **Competitor scoreboard** (`IGCO`/`TTCO`/`YTCO`) → **skipped** again (heavy calls throttle the brand; not a monthly run). Carried to the W32 monthly refresh, where it is now genuinely worth pulling — two weeks of per-network baseline exist to benchmark against.
- **GA4 / GSC → still not wired** into this routine. Branded search and waitlist signups remain invisible (§6.8, carried since baseline).
- Read `content/calendar/2026-W31.md` (13 text posts + 14 spine reels + 7 shoot scripts, card+hook per row) and the W30 review (built on, not re-derived).
- **Video spine:** `content/video/catalog.json` — **1,018 clips**, and for the first time **a real join between a posted reel and a catalog clip**. §2.3 and §4.

---

## 2. Score — performance ↔ what was dealt (normalized within network)

### 2.0 The publish ledger — throughput collapsed, and the shape changed

**3 of 27 dealt evergreen items published (11%).** Plus **0 of 10 daily-reactive drafts.** Total: **3 of 37 (8%)**.

| Day | Dealt (text + spine) | Published | Reactives | Notes |
|---|---|---|---|---|
| Mon 07-27 | 3 + 2 | **0** | 0/2 | whole day dark; batch ran 15:16, slots were 16:30–18:30 |
| Tue 07-28 | 3 + 2 | **2** | 0/2 | the one real gate opening — see below |
| Wed 07-29 | 2 + 2 | **1** | 0/2 | spine `what-is-schema` only |
| Thu 07-30 | 4 + 2 | **0** | 0/2 | dark |
| Fri 07-31 | 1 + 2 | **0** | 0/2 | dark |
| Sat 08-01 | 0 + 2 | **0** | — | dark |
| Sun 08-02 | 0 + 2 | **0** | — | dark — Jake also filmed nothing |

**The diagnosis has moved.** Every published item this week carries `creationDate == publicationDate` — i.e. it was **composed fresh in Metricool and sent immediately**, not approved from the queue. Jake was in the planner on **six of seven days** (Mon 10:16, Tue 08:42, Wed 08:33, Thu 12:25, Fri 08:42, Sat 09:31). He was present. The drafts were not opened.

The two exceptions are the whole story: on **Tue 08:42** he opened the spine draft `what-is-a-brand` (uuid `-3619694191171580012`), **expanded it from TikTok-only to all seven networks**, retitled it, and shipped it; at **08:50** he actioned the dealt LinkedIn post `the-objection-is-never-the-objection`. On **Wed 08:33** he shipped the spine's `what-is-schema` as dealt. **Three drafts touched. All three landed at or above their network median, two of them well above.**

### 2.1 Reach attribution — where the 8,312 impressions came from

| Source | Impressions | Share | Interactions | Per unit |
|---|---|---|---|---|
| **Jake's own reels** (6 clips × up to 7 nets) | **6,863** | **82.6%** | 227 | 1,144 |
| **Video spine** (2 back-catalog clips) | **1,289** | **15.5%** | 21 | 645 |
| Dealt evergreen text deck (1 LinkedIn post) | 89 | 1.1% | 3 | 89 |
| IG + FB Stories (2) | 71 | 0.9% | — | 36 |
| Daily-reactive newsjacks | **0** | 0% | 0 | — |
| **Total** | **~8,312** | | **~248** | |

**Read the per-unit column carefully — it is the week's most actionable number.** The spine averaged 645 impressions per clip against Jake's 1,144, which looks like a gap until you split it by *routing*: the clip Jake sent to **all 7 networks** returned **1,086** — level with his own average. The clip dealt to **IG + FB only** returned **203**. **The spine's shortfall is distribution, not content.**

### 2.2 Per-network — median and the dealt items against it

| Network | Posts | Total imp | Median imp | Median ER | Dealt items vs median |
|---|---|---|---|---|---|
| **TikTok** | 7 | **4,288** | 571 | 3.09% | spine `what-is-a-brand` **1.00x** |
| **Instagram** | 7 reels + 2 stories | 2,016 (+71) | 199 | 3.16% | spine **0.92x** and **1.00x** |
| **Facebook** | 7 reels | 1,131 | 203 | ~0% | spine 0.99x and **0.02x** (§5) |
| **LinkedIn** | 8 | 457 | 51 | 2.69% | text **1.75x** · spine **2.04x** |
| **X** | 6 | 338 | 18 | 0% | spine **1.22x** |
| **Threads** | 6 | **8** | 1 | 0% | — (no evergreen dealt by design) |
| **YouTube** | 7 published, **1 reported** | 3 | — | — | connector gap (§5.3) |

### 2.3 The video scoreboard — the first ratings this program has ever recorded

| Clip | Dealt as | Published | Result vs its network median |
|---|---|---|---|
| **`what-is-a-brand-…-1rlsujq`** | Mon 17:00, **TikTok only** | Tue 08:42, **7 networks** (Jake re-routed) | LinkedIn 104 = **2.04x** (top LI post of week) · X 22 = 1.22x · TikTok 571 = **1.00x** · FB 201 = 0.99x · IG 183 = 0.92x · **~1,086 imp total** |
| **`what-is-schema-…-m13i2c`** | Wed 08:00, IG + FB | Wed 08:33, IG + FB as dealt | IG 199 = **1.00x** (dead on median) · FB 4 = 0.02x (confounded, §5.1) · **203 imp total** |

**Verdicts applied (§4):** `what-is-a-brand` → **`good`**. `what-is-schema` → **`ok`**, held active — its IG number is exactly at median on the surface that matters, and the FB flop has a live alternative explanation, so retiring it would be fitting noise.

**The premise the spine was built on is now measured and it holds:** back-catalog clips perform at parity with new footage. The engine has reach that does not depend on Jake filming — on the weeks its drafts actually ship.

### 2.4 The dealt deck — the one card that published

| Platform | Subject | Card · tier | Result | vs network median |
|---|---|---|---|---|
| LinkedIn | the-objection-is-never-the-objection | **Diagnosis-First Short · A** | 89 imp / 3 int / 3.37% | **1.75x reach**, 1.25x ER |

Every other dealt card — 12 text posts, 12 spine reels, 10 reactives — never left drafts. Running tally of every dealt LinkedIn text post that has ever published: **1.97x · 1.53x · 1.75x**. Three posts, three different cards, two weeks, all above median.

### 2.5 Top 3 / bottom 3 (the why)

**Top 3**
1. **X `google-changed-the-deal` — 254 imp / 6 int = 14.1x the X median.** New X record by 4x (prior 59). A timely platform-news reaction, one line, a Vader riff, video attached: *"Google has changed the deal. Pray they do not alter it further....."* It carries **every interaction X earned all week**. The other five X posts averaged 17. Also took IG's top slot the same day (766 = 3.85x median) and TikTok's #1 (861).
2. **LinkedIn spine reel `what-is-a-brand` — 104 imp / 6 int / 5.77% = 2.04x median reach, 2.15x median ER.** Top LinkedIn post of the week, from a back-catalog clip, on a network the spine's dealer does not currently route to. Jake did this by hand.
3. **TikTok `great-marketing-is-risky` — 767 views / 46 int / 6.00% ER.** Best engagement rate the program has ever recorded on any platform. A short, blunt, CFO-shaped provocation with no teaching payload — worth noting against the concept-education register that has led since W28.

**Bottom 3**
1. **The daily-reactive layer — 10 drafts, 0 published, 0 impressions.** The routine ran every weekday and wrote in-voice, genuinely timely takes (ChatGPT ads opening up, AI Overviews in Search Console, LSAs folding into Google Ads). All ten expired. W30 had 6 published. Timeliness is the one asset that cannot be recovered later — these are now worthless.
2. **Threads — 8 impressions for the entire week, median 1.** Down 82% from W30's 46. The week Threads was handed to the reactive layer is the week the reactive layer published nothing, so the surface received only cross-posted video, which it does not distribute.
3. **Facebook spine reel `what-is-schema` — 4 imp against a FB median of 203 (0.02x).** The single sharpest miss of the week, and the reason W30's container theory had to be re-tested (§5.1).

*Dishonourable mention:* the two rendered carousels (IG 8-slide Swipe-to-Fix, TikTok 10-slide Count Carousel) never published — **fifth consecutive week with no carousel read.**

### 2.6 Trend vs W30

- **Publish-through: 8/18 (44%) → 3/27 (11%).** The binding constraint tightened, and its cause changed from absence to selection.
- **Reach: 12,332 → 8,312 (−33%).** Softened only because Jake filmed 6 reels.
- **Jake's own reels: 9 → 6.** Sunday dark for the first time since the program started publishing.
- **Reactive layer: 6 published → 0.** Full regression to the W25–W29 pattern.
- **The spine: 0 published → 2 published, rated, and validated.** The one thing that moved forward.
- **Per-network medians:** TikTok 577 → 571 (flat). IG 234.5 → 199 (−15%). LinkedIn 74 → 51 (−31%). X 17 → 18 (flat). Threads 2 → 1.

---

## 3. Timing

**Metricool's TikTok best-times model is byte-identical for the seventh straight week** — weekday peaks 10:00 (Wed 1,432 / Thu 1,471) / 12:00 / 18:00 Phoenix. Sixteen published TikToks across two weeks have not moved it. It is the generic model, not this account's.

**W30's morning finding came back split.** W31 morning 08:00–09:45 (n=4): **576 views / 4.20% ER**. Later 10:00–15:10 (n=3): **661 / 3.24%**.

| | Morning (n=8) | Later (n=8) | Edge |
|---|---|---|---|
| Views (W30+W31) | **747** | 629 | 1.19x *(was 1.52x on W30 alone)* |
| ER (W30+W31) | **~3.78%** | ~2.65% | **1.43x — same direction both weeks** |

**Decision: hold the 08:00–09:30 window, on the engagement signal only.** The reach claim is retracted — it did not survive its own test, and at n=8 per cell the remaining gap is noise. Emphasis note applied to `tiktok.md`; slots unchanged. Confound worth naming: the week's two biggest posts were both *later* and both newsjack-flavoured, so **what** was posted may dominate **when**.

---

## 4. Changes auto-applied this week

### Tier moves: **0**

Only one dealt card published all week (**Diagnosis-First Short · A**, 1.75x median). It is already Tier A and it beat its network — nothing to promote, nothing to demote. Every other card scored zero uses because it never left drafts. Tier indexes untouched in all seven platform files. **Seven weeks in, the library still has almost no card-level evidence, and that is a throughput fact, not a measurement failure.**

### Video catalog: **2 clips rated — the first ever** (`content/video/catalog.json`)

| Clip | Verdict | Evidence recorded inline |
|---|---|---|
| `what-is-a-brand-…-1rlsujq` | **`good`** (favored in the next deal) | 7 networks, ~885 imp; LinkedIn 2.04x median and top LI post of the week; TikTok 1.00x; IG 0.92x; FB 0.99x; X 1.22x |
| `what-is-schema-…-m13i2c` | **`ok`** (neutral, held active) | IG 199 = 1.00x IG reel median; FB 4 vs 203 not scored as a miss (n=1, confounded — §5.1) |

**0 retires.** Neither clip cleared the retire bar (≈0 plays across 2 posts, or bottom-decile retention). Retiring on one confounded FB number would be exactly the noise-fitting the guardrails forbid.

### Self-healing: **13 repairs applied**

1. **12 catalog clips carried a false "posted" stamp.** The W31 batch ran `mark-posted.js` on all 14 dealt clips *at deal time*, but 12 never published. Left alone, those `usedDates` entries would (a) lock 12 clips out of the pool for a 12-week cooldown they never earned, and (b) — the real damage — let a future review read them as *posted with zero performance*, rate them `bad`, and **retire good clips**. Cleared `usedDates` and `platformsUsed` on all 12, with the reason written into each clip's `notes`. The 2 that genuinely published keep their stamps.
2. **One mis-tagged clip corrected.** `are-you-going-to-list-your-products-on-tiktok-an-xahhf7` was tagged `topic: email`; it is about listing Amazon products on TikTok Shop and Pinterest. Retagged `social-commerce`. Flagged by the W31 batch as "worth a catalog fix" — done.

**Fix the routine, not just the data:** `mark-posted.js` should be called when Metricool reports **published**, not when the batch creates a draft. As written, its stamp means "dealt," while every consumer of the field reads it as "posted." That is a code change in the batch's tooling, so it is recommended (§6.3), not applied here.

### A wrong finding retracted: **W30's Facebook container claim**

W30 concluded that `facebookData.type: "POST"` cost ~20x reach versus `REEL`, and the W31 batch spent effort explicitly setting `REEL` on that basis. **It did not reproduce.** This week: `type: POST` → **212 / 78 / 203** (median 203); `type: REEL` → **201 / 4 / 209 / 224** (median 205). No gap. All seven landed on `facebook.com/reel/…` URLs and reported as `REEL` — **Meta normalizes an attached video to a Reel regardless of the flag.** W30's read was n=1 and wrong; `facebook.md` now says so. Setting `REEL` explicitly is still correct practice, it is just not a reach lever. This is the second time this routine has had to correct itself on an n=1 claim (W30 corrected W26's newsjack read) — the pattern is worth naming: **single-observation mechanical findings should be logged as hypotheses, not rules.**

### Emphasis notes auto-applied: **9** across all 7 platform files

| File | Note added |
|---|---|
| `formats/instagram.md` | **The spine performs at parity with fresh footage** (0.92x / 1.00x median) — stop treating back-catalog as a fallback tier. Plus: carousels still unread, 5th week. |
| `formats/linkedin.md` | Dealt text beats median a **3rd straight time** (1.97x / 1.53x / 1.75x). Plus: **a back-catalog clip doubled Jake's own new reels here** (104 vs median 48) — and the dealer does not route the spine to LinkedIn. |
| `formats/tiktok.md` | Morning window **held on ER, reach claim retracted** (2-week table). Model byte-identical 7th week. Spine landed at 1.00x median. |
| `formats/x.md` | **New record, 14.1x median** — news + recognizable riff + media, not evergreen one-liners. Plus: 0 dealt singles and 0 reactives published; **Teardown never dealt, 4th carry-forward.** |
| `formats/facebook.md` | **Container finding retracted** with the POST-vs-REEL split. Same-day-second-post offered as the new (low-confidence) candidate. Plus: engagement absent 2nd week (0.27%). |
| `formats/threads.md` | Reach **−82%** in the week the reactive layer went dark — clean confirmation that reactives were the only thing distributing there. |
| `formats/youtube.md` | **First YouTube note ever** (new Scoreboard section): 7 Shorts published, 1 reported — unmeasured, not underperforming. All 4 dealt Shorts never published. |

### Timing / cadence: **no slot changes.** Voice, brand canon, offers, stat bank: **untouched (locked).**

All edits are git diffs Jake can revert: 7 format files + `content/video/catalog.json` + this review.

---

## 5. Healed + flagged

### ⚠ Flagged — mechanical, **not** safely repairable by this routine

1. **Facebook `what-is-schema` at 4 impressions (0.02x median).** Container was correct (`type: REEL`). The one property that distinguishes it: **it was Facebook's second post that day, and the earlier of the two** — the 15:04 post the same day pulled 209. Candidate read: FB throttles a same-day second post. **n=1, low confidence, needs a deliberate test** before the batch changes anything.
2. **YouTube reporting gap — week 2.** `getScheduledPosts` confirms **7 Shorts published**; the BSPO connector returned **1 row (3 imp)**. Six of seven Shorts are invisible. Not a content gap; a measurement gap this routine cannot close from inside Metricool.
3. **10 reactive drafts expired unpublished**, all with passed dates and `draft:true`. Not editable into value — timeliness is gone. Left in place; the MCP has no delete tool and editing stale drafts risks a re-post.
4. **12 spine reels + 12 text posts still sitting as stale drafts** with passed dates. Left untouched for the same reason. Their *content* is fine and re-dealable (§7.2); their Metricool objects are dead weight Jake may want to clear by hand.
5. **The book CTA reappeared, by Jake's own hand.** The dealt first comment on `the-objection-is-never-the-objection` was the blog; the published version reads *"More on breaking the belief underneath the objection in my upcoming book, Eight Dominoes: …/eight-dominoes"*. The book/waitlist CTA has been **paused in the engine since 2026-06-19**. Jake edited this himself, so this is almost certainly him un-pausing it near launch rather than a fault — **but CTAs and offers are locked to this routine, so it is escalated, not applied** (§6.6).

### ⚠ Flagged — throughput (the surviving constraint, week 7)

| Day | Still `draft:true` / PENDING, dates passed |
|---|---|
| **Mon 07-27** | calculator-marketer LinkedIn (`152368739385688558`) · the-swipe-file X (`3583642363630273602`) · AI-disruption IG+FB reel (`7263646956712446834`) · 2 reactives |
| **Tue 07-28** | seo-frequency YT short (`7171010309381966112`) · wordpress-security TikTok (`3381770401608453876`) · surgical-tweak IG carousel (`189433370266126936`) · its-all-attention X (`7927853717206614110`) · 2 reactives |
| **Wed 07-29** | keyword-pyramid LinkedIn doc (`-4388172603240722923`, **2nd week missed**) · fb-ad-mistakes TikTok (`-3304430410419256300`) · selling-the-sword X (`3709994868017153715`) · 2 reactives |
| **Thu 07-30** | ab-test YT short (`-5548583359675216154`) · effort-is-the-art LinkedIn (`7782775666599611993`) · big-pharma IG+FB reel (`-8734252630321640869`) · ad-budget X (`3570124899356263402`) · offer-amplifiers TikTok carousel (`-5820614076180116649`) · t-shaped X (`1965086951236452638`) · 2 reactives |
| **Fri 07-31** | multiplatform TikTok (`-6475790834721667560`) · facebook-ads-arent-hard LinkedIn (`-6272169793381446674`, **2nd week missed**) · kpis YT short (`-1919408720451581632`) · devaluation X (`-1865060814319304402`) · 2 reactives |
| **Sat 08-01** | local-launch IG+FB reel (`-2807847510630183497`) · value-prop YT short (`9008446220038392036`) |
| **Sun 08-02** | tiktok-pinterest TikTok (`-4065045972334460839`) · perceived-value IG+FB reel (`-5790555270484115395`) |

- **Both W30 re-deals were missed a second time** (`keyword-pyramid`, `facebook-ads-arent-hard`). Two weeks, two misses, on the channel returning 1.75x median. That is the clearest single cost of the gate.
- **Both list-reel shoot scripts (exp #2) went unfilmed**, so the W30 list-reel record has still never been re-tested. All seven shoot anchors unfilmed — fourth consecutive week.
- **Spell/typo pass still not in the QA gate** (carried W25→W30, now W31). Jake's own published copy this week: *"CFOs dont like that"* (for "don't"). The gate would catch it.

---

## 6. Recommendations for Jake (NOT auto-applied — your call)

1. **The gate is now the entire program, and it is a different problem than we thought.** You were in Metricool six days out of seven. On each of those days you composed a brand-new post and sent it; you opened the drafts queue twice. The three drafts you did touch went **2.04x, 1.75x, and 1.00x** their network medians. The deck is not being rejected on quality — the queue is not part of your morning. Either (a) **turn on auto-publish** for LinkedIn text + the daily reactives (recommended since W28, now four weeks running, and the evidence has only got stronger), or (b) make "open drafts" the first action of the reel-posting habit you already have. This one change is worth more than everything else in this list combined.
2. **Route every spine reel to all seven networks — you proved it yourself.** The dealer sends each back-catalog clip to *one* network (or IG+FB). You took one and sent it to seven: **1,086 impressions, and the top LinkedIn post of the week.** The clip that went out as dealt (IG+FB only) got 203. Same pipeline, same asset quality, **5x the return purely from routing.** Queued as experiment #1 for Monday (§7.1) — but it's a routing change to `deal-videos.js`, so say the word if you'd rather it stayed narrow.
3. **`mark-posted.js` is called at the wrong moment.** It stamps a clip as used when the *draft is created*, not when Metricool reports **published**. That corrupted 12 catalog entries this week (repaired, §4) and would have caused a future review to retire good clips as "posted, zero performance." **A one-line change in the batch: call it on publish confirmation, not on create.** Repo change to the tooling, so it's yours.
4. **The reactive layer needs a decision.** Ten in-voice, genuinely timely drafts (ChatGPT ads, AI Overviews in Search Console, LSAs folding into Google Ads) expired unread. Reactive content has a shelf life measured in hours — it is the one thing an approval queue destroys outright. **Either auto-publish it or stop generating it**; running it into a queue is pure waste.
5. **Threads: 8 impressions this week.** Down from 46. Down from 78 in W25. Same effort, and X returned 42x that reach while LinkedIn returned 57x. **Drop it from the weekly deal or commit to growing it deliberately** — carried from W30, and the case got much stronger.
6. **Confirm the book CTA is un-paused.** You added *"my upcoming book, Eight Dominoes"* to the first comment on the objection post; the engine has had that CTA paused since 2026-06-19 and I won't change it without you saying so. If the launch is close enough, tell me and it goes back in the rotation — otherwise the engine keeps closing on consulting / blog / newsletter.
7. **YouTube: 7 Shorts published, 1 measured, two weeks running.** Decide whether to invest in measuring it (a GA4/YouTube Studio pull outside Metricool) or accept it as an unmeasured cross-post surface. Right now this routine is flying blind on a channel with ~979 subs.
8. **Still open, carried:** wire **GA4 / GSC** into this review so branded search and waitlist signups stop being invisible; add a **typo/spell pass** to the QA gate (cheapest standing win, carried since W25); and the **W30 library questions** remain unanswered because nothing published — demote Send-This Carousel A→B on IG, and add a **"Build-in-Public Milestone List"** card to `linkedin.md`.

---

## 7. Experiments queued for Monday's W32 batch

1. **Deal every spine reel to all seven networks, not one.** The single highest-leverage measured change available (§6.2). If the per-clip return holds anywhere near the 1,086 Jake got by hand, 14 reels/week becomes the program's floor rather than its footnote.
2. **Re-deal the whole W31 deck — it was missed, not rejected.** 12 text posts and 12 spine reels never published; the 12 clips are back in the pool (§4). Priority on the two LinkedIn items missed **twice** (`keyword-pyramid` doc, `facebook-ads-arent-hard`) on the channel returning 1.75x median.
3. **Test the news-reaction register deliberately on X.** The 14.1x record was a timely platform-news take with a pop-culture riff and video attached. Deal **one** on purpose — that is the difference between an outlier and a format.
4. **Generate the batch on Friday, not Monday morning.** Third time queued, never done. Monday has now been dark four consecutive weeks, and W31's batch again ran at 15:16 for slots starting 16:30 the same day.
5. **Monthly research refresh is due** (last W28). Fold it into W32: re-validate platform best-practices, and pull the competitor scoreboard (`IGCO`/`TTCO`/`YTCO`) — two weeks of per-network baseline now exist to benchmark against.

---

*All repo edits this run are git-revertible: **7 format files** (`instagram` · `linkedin` · `tiktok` · `x` · `facebook` · `threads` · `youtube` — emphasis notes only, no tier or card-body changes), **`content/video/catalog.json`** (2 ratings, 12 false-stamp repairs, 1 mis-tag fix), and this review. **0 tier moves, 0 timing/slot changes, 0 retires, 0 voice/brand/offer/stat changes** — all locked or below the confidence gate. **No Metricool writes:** nothing published, nothing un-drafted, no draft edited; the faults in §5 are flagged rather than touched because the MCP has no delete tool and editing stale state risks a duplicate post. W25–W30 preserved in git history.*

*Seven weeks in, the two open questions from W30 both got answered this week, and they point opposite ways. **Does the spine hold the floor?** Yes — measured, at parity with new footage, and worth 15.5% of program reach from two clips out of fourteen. **Does the gate open?** No, and the reason changed: it is not absence anymore, it is that the drafts queue is not part of the morning. The program now has two proven engines — Jake's camera and a 1,018-clip back catalogue — and one unproven step between them and the audience. Everything in §6 is a variation on removing that step.*
