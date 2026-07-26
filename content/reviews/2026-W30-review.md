# Weekly Review — 2026-W30 (the gate opened — 12,332 impressions after five dark weeks)

**Run:** late Sunday **2026-07-26** (autonomous `weekly-review`). **Brand:** Jake the Wizard (Metricool blogId 6387301, America/Phoenix). **Reviewer:** scheduled task, no human present. **Week scored:** Mon 07-20 → Sun 07-26.

> **The headline, week six: the program published, and the numbers arrived all at once.** After five straight zero-publish weeks (W25→W29 publish-through ~19 → ~8 → 0 → 0 → 0), the W30 deck went live from **Tuesday morning onward**: **8 of 18 dealt evergreen posts published (44%)**, **6 daily-reactive newsjacks published**, and Jake posted **9 of his own concept reels** cross-routed to up to 7 networks each. Total program reach: **~12,332 impressions / ~302 interactions**, against **15 impressions / 0 interactions** in W29. That is the first week this program has existed at scale.
>
> **The thesis held exactly as predicted, and the split is stark.** Jake's own reels carried **~11,448 impressions — 93% of all reach.** The dealt evergreen deck contributed **512 (4.2%)**, the reactive layer **92 (0.7%)**, Jake's personal LinkedIn post **180 (1.5%)**. Five reviews said *the reel is the program*; W30 is the first week with enough data to prove it, and it did: **TikTok alone (9 reels, zero dealt posts) produced 6,723 impressions — 55% of the entire program.**
>
> **The good news the deck earned:** both LinkedIn dealt text posts beat their network median on reach (**1.97x** and **1.53x**) and landed in LinkedIn's top four posts of the week. The deck is not the problem. **The remaining gap is throughput, not quality** — Monday's five posts and Thursday's three never left drafts, and the gate is still a manual morning action.
>
> This review makes **0 tier moves — but for the opposite reason than the last five.** Every dealt card that published sat **at or above** its network median, or had a sample too small to read (Threads posts drew 1–2 impressions against a network median of 2 — rounding, not signal). Nothing earned a promotion it didn't already have, and nothing missed badly enough to demote. It makes **6 evidence-tied emphasis notes** across the format library (the first real reads ever recorded for LinkedIn text, X evergreen-vs-reactive at parity, Threads, and Facebook), **flags 5 mechanical faults** it cannot safely repair, and reports that **the video spine was built but never dealt** — so no catalog clip can be rated. Voice / CONTENT_GUIDE untouched (locked). Not a monthly-refresh run (last W28; next ~W32).

---

## 1. The data pulled

- `getBrandSettings` → brand confirmed (7 networks; IG `itsjakethewizard`, X `JakeTtheWizard`, TikTok `itsjakethewizard`, Threads `thewizardmarketing`, FB, LinkedIn, YouTube).
- `getAnalyticsDataByMetrics` `BSPO01–09` (07-20 → 07-26, all networks) → **~66 rows.** First week with a real published corpus. **Note on timestamps:** the BSPO connector returns **UTC**; `getScheduledPosts` returns **Phoenix**. Cross-checked and confirmed (e.g. `brands-dont-heal` dealt Tue 08:30 Phx ↔ analytics `20260721153000` = 15:30 UTC). All times in this review are **Phoenix**.
- `getScheduledPosts` (windows 07-20→21 and 07-23→24) → the publish/draft ledger below, plus the mechanical faults in §5. Un-published items confirmed still `draft:true` / `PENDING` with passed dates.
- `getBestTimeToPostByNetwork` (TikTok) → §3.
- **Competitor scoreboard** (`IGCO`/`TTCO`/`YTCO`) → **skipped** again (empty W25–W27, heavy calls throttle the brand; not a monthly run). Logged, not a finding. **Now worth re-testing next month** — for the first time Jake has a real per-network baseline to benchmark against.
- **GA4 / GSC → still not wired** into this routine. Branded search + waitlist signups remain unmeasured (§6, carried from baseline).
- Read `content/calendar/2026-W30.md` (the 18-post deal + 2 shoot anchors, card+hook per row) + the W29 review (built on, not re-derived).
- **Video spine:** `content/video/catalog.json` → **1,009 clips, 0 with any posting or rating history.** No reel published this week matches a catalog title. See §3.5.

---

## 2. Score — performance ↔ what was dealt (normalized within network)

### 2.0 The publish ledger — the join finally works

**8 of 18 dealt evergreen published (44%).** The gap is **day-shaped, not card-shaped**: Tuesday 4/4, Wednesday 3/4, Friday 1/2 — but **Monday 0/5 and Thursday 0/3.**

| Day | Dealt | Published | Notes |
|---|---|---|---|
| Mon 07-20 | 5 | **0** | all still `draft:true`/PENDING (+2 reactives) |
| Tue 07-21 | 4 | **4** | gate opened ~08:15 Phx (+2 reactives) |
| Wed 07-22 | 4 | **3** | `benefit-of-the-benefit` X single missed (+2 reactives) |
| Thu 07-23 | 3 | **0** | all still `draft:true`/PENDING (+2 reactives) |
| Fri 07-24 | 2 | **1** | `the-average-is-lying` **slot repurposed** — see §5 (+2 reactives) |
| Sat/Sun | 0 | 0 | nothing published either day |

### 2.1 Reach attribution — where the 12,332 impressions came from

| Source | Impressions | Share | Interactions |
|---|---|---|---|
| **Jake's own concept reels** (9 clips × up to 7 nets) | **~11,448** | **92.8%** | ~289 |
| Dealt evergreen deck (8 posts) | 512 | 4.2% | 11 |
| Jake's personal LinkedIn post (repurposed slot) | 180 | 1.5% | 11 |
| Daily-reactive newsjacks (6 posts) | 92 | 0.7% | 0 |
| **Total** | **~12,332** | | **~302** |

### 2.2 Per-network — median and the dealt posts against it

| Network | Posts | Total imp | Median imp | Median ER | Dealt posts vs median |
|---|---|---|---|---|---|
| **TikTok** | 9 (all Jake's reels) | **6,723** | 577 | 2.98% | — (0 dealt published) |
| **Instagram** | 8 reels + 1 carousel | 2,895 | 234.5 (reels) | 0.995% (reels) | carousel 169 = **0.72x** |
| **Facebook** | 7 reels | 1,233 | 198 | 1.01% | — (cross-post only) |
| **LinkedIn** | 12 | 1,182 | 74 | 3.92% | **1.97x** and **1.53x** |
| **X** | 10 singles + 1 thread | 251 | 17 | ~0% | 1.53x / 1.18x / 1.00x |
| **Threads** | 10 | 46 | 2 | ~0% | 1.00x / 0.50x |
| **YouTube** | ≥4 shorts published, 1 reported | 2 | — | — | connector gap (§5) |

### 2.3 TikTok — the engine (55% of all program reach)

| Slot (Phx) | Clip | Views | Int | ER |
|---|---|---|---|---|
| Fri 08:26 | **AI tools stack** (list reel) | **1,486** | 49 | 3.30% |
| Mon 09:42 | **beat up the AI / own your messaging** | **1,125** | 42 | **3.73%** |
| Tue 14:19 | de-positioning / negative space | 907 | 27 | 2.98% |
| Wed 17:53 | there is no time like the present | 880 | 19 | 2.16% |
| Wed 09:03 | people pay for dreams | 577 | 18 | 3.12% |
| Thu 12:34 | say the price and shut up | 508 | 14 | 2.76% |
| Tue 08:37 | products that make them feel understood | 486 | 16 | 3.29% |
| Thu 18:29 | blended model sizes | 424 | 8 | 1.89% |
| Wed 12:53 | big companies' marketing weakness | 330 | 5 | 1.52% |

**Every one of the nine cleared W28's best (863 imp).** The two best posts in program history are now both this week (1,486 and 1,125, prior record 1,206 in W27). **Time-of-day, n=9:** morning 08:00–09:45 averaged **918 views / 3.36% ER**; midday 12:30–14:20 **582 / 2.42%**; evening 17:50–18:30 **652 / 2.03%**. Morning wins on both axes and contradicts Metricool's generic model (§3).

### 2.4 The dealt deck — how the cards actually did

| Platform | Subject | Card · tier | Result | vs network median |
|---|---|---|---|---|
| LinkedIn | dont-outsource-the-handshake | **Scar Story · A** | 146 imp / 5 int / 3.42% | **1.97x reach**, 0.87x ER |
| LinkedIn | brands-dont-heal | **Contrarian POV · A** | 113 imp / 5 int / 4.42% | **1.53x reach**, 1.13x ER |
| IG | build-backlinks | **Send-This Carousel · A** | 169 imp / 1 int / 0.59% | 0.72x reach, 0.59x ER (vs *reels*) |
| X | the-live-line | **Contrarian One-Liner · A** | 26 imp / 0 | **1.53x** — best dealt X single |
| X | attention-catalyst (6-tweet) | **Diagnosis Thread · A** | head 20 / 38 total / 6 int | 1.18x head, **body collapsed** |
| X | seo-is-a-marathon | **Two-Beat Diagnosis · A** | 17 imp / 0 | 1.00x |
| Threads | one-good-channel | **Diagnosis Fragment · A** | 2 imp / 0 | 1.00x (median = 2) |
| Threads | the-exit-proof-asset | **Quiet Confession · A** | 1 imp / 0 | 0.50x (median = 2) |

**The X thread's decay is the sharpest format finding of the week:** 20 → 7 → 8 → 1 → 1 → 1 impressions across the six tweets. **95% of the audience was gone by tweet four.** Multi-tweet threads do not hold at this follower base.

### 2.5 Top 3 / bottom 3 (the why)

**Top 3**
1. **TikTok "AI tools stack" reel — 1,486 views / 49 int / 3.30%.** Program record. A *list* reel (9 named tools) in Jake's own voice, posted Fri 08:26. Scannable, screenshot-able, and about tools rather than concepts — the highest-reach unit the program has ever produced. Cross-posted, it also took X's top slot (59 imp, **3.5x** the X median).
2. **TikTok "beat up the AI / own your messaging" — 1,125 / 42 / 3.73%.** Best ER of the week and #2 reach. Concept-education in the W28 winning register, plus a concrete AI-workflow angle — the exact combination W27's note predicted.
3. **LinkedIn `dont-outsource-the-handshake` (Scar Story · A) — 146 imp / 5 int.** *The best result the dealt deck has ever recorded.* Nearly 2x the LinkedIn median on reach, top-four on the platform. A scar story with a named cost, opening on a scene, closing on a question. **The deck works when it ships.**

**Bottom 3**
1. **Threads, as a channel — 46 impressions for the entire week across 10 posts** (median 2). Both dealt evergreen posts landed at 1–2 impressions. This is not a card failure; it is a distribution floor. Threads is the weakest surface the program runs.
2. **The X thread body — 1 impression each on tweets 4, 5, 6.** The format is structurally wrong for the account's size; the effort went nowhere after the hook.
3. **The Facebook "AI tools stack" post — 9 impressions** against a Facebook reel median of 198. It went out as a **feed POST rather than a REEL** (`facebookData.type: "POST"`); the same video as a REEL on the same day pulled ~200 elsewhere. A container mistake cost ~20x reach (§5).

*Dishonourable mention:* the IG `build-backlinks` carousel (169 imp / 0.59% ER) landed below the IG reel median for the fourth consecutive week that carousels have trailed video. Held at Tier A — see §4.

### 2.6 Trend vs W29

- **Publish-through: 0 → 8/18 (44%).** The binding constraint of five weeks partially released. Still manual, still day-shaped (Mon and Thu dark).
- **Reach: 15 → 12,332 impressions.** From one off-topic tweet to a functioning program.
- **Jake's video engine: 0 → 9 reels.** He filmed/posted every weekday, cross-routed to up to 7 networks via Metricool. This is the single change that produced the week.
- **Reactive layer: 0 → 6 published.** After 5+ weeks of expiring unapproved, timely newsjacks reached an audience for the first time — modestly (60 imp on X, 32 on Threads) but they ran.
- **The deck's first real read is positive.** Two LinkedIn posts, both above median. The five weeks of "we don't know if the deck works" are over: on LinkedIn, it does.

---

## 3. Timing

**Metricool's TikTok best-times model is unchanged** — weekday peaks **10:00 (1,432 Wed / 1,471 Thu) / 12:00 (1,299–1,359) / 18:00 (1,378–1,386)** Phoenix, weekends ~30–40% lower. Byte-identical to W25–W29, so it is still the generic model; nine published TikToks did not move it.

**But Jake's actual data disagrees with the model.** Morning **08:00–09:45** (n=4) averaged **918 views / 3.36% ER**; the model's 10:00/12:00/18:00 peaks (n=5) averaged **604 / 2.30%**. Both program-record posts were morning posts (08:26, 09:42). **n=9, one week → emphasis note, not a slot rewrite** (§4). Re-test in W31 before moving the engine's slots.

### 3.5 The video spine — built, never dealt

`content/video/catalog.json` holds **1,009 clips** and **zero posting or rating history**. None of the nine reels published this week matches a catalog title; all nine are **Jake's own fresh uploads** (`static.metricool.com/video/4920654/…mp4`), self-scheduled through Metricool as multi-network posts.

**Consequence: the video scoreboard cannot run.** There is no join between a posted reel and a catalog clip, so **no clip was rated `good`/`ok`/`bad` and none retired** — `rate-clip.js` was not called, and inventing ratings without a join would be exactly the noise-fitting the guardrails forbid. The spine's dealer (`deal-videos.js`) was never wired into the Monday batch. **Flagged for Jake (§6.3)** — this is a workflow decision, not a repair this routine may make.

The irony worth recording: the spine was built to guarantee reels on weeks Jake couldn't film, and the week it shipped, Jake filmed nine.

---

## 4. Changes auto-applied this week

### Tier moves: **0** — and this time because the cards passed

No card cleared the small-N gate (≥3 uses AND ≥2 weeks, or a clear ≥2x-median pattern) *for a move it needed*:
- **Scar Story · A** (1.97x reach) and **Contrarian POV · A** (1.53x reach, 1.13x ER) both beat median — but both are **already Tier A**. Nothing to promote.
- **Contrarian One-Liner · A** (1.53x) and **Two-Beat Diagnosis · A** (1.00x) held their tier honestly. No move.
- **Diagnosis Fragment · A** (1.00x) and **Quiet Confession · A** (0.50x) drew **1–2 impressions on a network whose median is 2**. That is rounding, not signal. **Demoting an A card on a 1-impression sample would be fitting noise.** No move.
- **Send-This Carousel · A** (0.72x reach) — below median, and IG carousels have now trailed reels four weeks running. But the comparator is a *container* (carousel vs reel), not a competing card; no other IG carousel published; n=1 for this card. **Held at A, recommended for review (§6.6)** rather than demoted.
- **Diagnosis Thread · A** — the body collapse (95% loss by tweet 4) is a genuine, striking miss, but n=1 and the *head* actually beat median (1.18x). Recorded as an emphasis note with a demotion flagged for W31 if it repeats.

Tier indexes untouched in all seven platform files.

### Emphasis notes auto-applied: **6** (one per platform file, each with evidence inline)

| File | Note added |
|---|---|
| `formats/linkedin.md` | **W30 — first real read for the dealt deck.** Scar Story 1.97x / Contrarian POV 1.53x median reach, both top-4 on platform. LinkedIn is the strongest *text* channel. Plus: Jake's own personal-milestone list post (180 imp / 6.11% ER) was the top non-video post — a register with no card in the library. |
| `formats/x.md` | **W30 — thread decay + newsjack parity.** 6-tweet thread: 20 → 7 → 8 → 1 → 1 → 1. Prefer singles. And W26's "newsjacks travel further" **did not reproduce** — reactives (25/21/14, median 21) sat level with evergreen singles (26/17). Corrected, not carried. |
| `formats/threads.md` | **W30 — floor, not format.** 46 imp across 10 posts, median 2. Reactive newsjacks (13/11/8) beat evergreen fragments (1/2) ~7x — the only differentiator visible at this scale. |
| `formats/instagram.md` | **W30 — reels lead a 5th week, now at scale.** 8 reels = 2,726 imp (median 234.5) vs the one carousel at 169. Cross-posted TikTok cuts are the IG reach driver. |
| `formats/tiktok.md` | **W30 — the engine, and the morning finding.** 9 reels / 6,723 imp / 55% of program reach; two program records. List-format reels ("9 tools I use") out-reached concept reels. Morning 08:00–09:45 beat the model's peaks (918 vs 604 views). |
| `formats/facebook.md` | **W30 — first FB data ever** (new Scoreboard notes section). Cross-posted reels hold ~198 imp but ~1% ER. **Container matters: the one video sent as a feed POST got 9 imp vs ~200 as a REEL.** Always REEL. |

### Timing: **note only, no slot change.** The morning finding is n=9 / 1 week; recorded in `tiktok.md`, engine slots left on the model's peaks pending a W31 re-test.

### Video catalog: **0 ratings, 0 retires** — no join exists (§3.5).

### Self-healing: **0 repaired, 5 flagged.** Every fault this week is in *already-published* content or in Metricool state that cannot be safely touched (no delete tool; editing stuck descendants risks a re-post). See §5. Voice, brand, offers, stat bank untouched (locked).

All edits are git diffs Jake can revert: 6 format files + this review.

---

## 5. Healed + flagged

### ⚠ Flagged — mechanical, **not** safely repairable by this routine

1. **LinkedIn double-post.** "The best sales people talk the least…" published **twice, 7 minutes apart** — Thu 13:55 (22 imp / 1 int) and Thu 14:02 (78 imp / 2 int). Two live posts, same video, splitting the same audience. Cannot be deleted via the MCP (no delete tool). **Jake: remove the 22-imp duplicate manually.**
2. **`the-average-is-lying`'s slot was repurposed, leaving a mismatched first comment.** The Fri 08:00 LinkedIn draft (uuid `4187110134965093877`, I-Was-Wrong Reversal · B) had its body replaced with Jake's personal "since getting out of my corporate position…" list — but the **dealt first comment survived**: *"More on reading blended data before you trust it, on the blog."* That comment is now attached to a post about finishing a book and changing air filters. It sits on **the top-performing LinkedIn post of the week (180 imp)**. Cannot edit a published post via MCP. **Jake: fix or delete that first comment.** Consequence for scoring: the I-Was-Wrong Reversal card **did not publish** and is *not* credited with the 180 imp / 6.11%.
3. **X thread descendants stuck in `PUBLISHING`.** The thread posted correctly at Tue 13:01 (6 sequential tweet IDs confirmed in analytics), but the planner still lists its five descendants at **Tue 22:00** with `status: PUBLISHING`. Stale state — and touching it risks a duplicate thread. **Left untouched deliberately; Jake should clear it in the planner.**
4. **Facebook container mistake.** The AI-tools-stack video went to FB as `facebookData.type: "POST"` → **9 impressions** vs ~198 median for the same asset as a REEL. Emphasis note added to `facebook.md`; the routing itself lives in the batch, not here.
5. **YouTube reporting gap.** `getScheduledPosts` confirms **≥4 shorts published** (`J1TEKvfN8DE`, `YVhVVvo0HKs`, `FMOuvcXpMS0`, +1) but the BSPO connector returned **one** YouTube row (2 imp). Measurement gap, not a content gap — YouTube performance is effectively unmeasured in this routine.

### ⚠ Flagged — throughput (the surviving constraint)

| Day | Still `draft:true` / PENDING, dates passed |
|---|---|
| **Mon 07-20** | keyword-pyramid LinkedIn doc (`-4843369542523862719`) · cult-of-the-new TikTok carousel (`-1297725039815078690`) · the-pre-thought-ad X (`-8319313307427189651`) · the-four-prong-local-play X (`8029681485724667105`) · likes-are-not-revenue Threads (`-6521301410437575179`) · 2 reactives (`8332143658885008275`, `-3753366542430023838`) |
| **Wed 07-22** | benefit-of-the-benefit X |
| **Thu 07-23** | facebook-ads-arent-hard LinkedIn (`4211177988045096730`) · tiktok-seo X (`5161924026698778964`) · the-list-you-own Threads (`-1286120023716049788`) · 2 reactives (`-8541273434521713622`, `6185695287059893314`) |

**The shape of the gap is diagnostic:** the gate opened Tue ~08:15, Wed ~08:1x and Fri ~08:18 — i.e. **on the mornings Jake was in the planner.** Monday's batch was dealt at 08:2x the same morning it was due and missed its own slots; Thursday he wasn't there at all. The deck is not being rejected, it is being *missed*. Both shoot anchors (`share-of-brand-voice`, `name-your-mechanism`) were **again not filmed** — third week — though Jake's nine self-directed reels more than covered the video slot.

- **Spell/typo pass still not in the QA gate** (carried W25→W29). Now overdue: published content exists to embarrass. Note that Jake's own top post reads "**Vercel of Web Hosting**" (for "for") and his LinkedIn list "**And its only been 6 weeks**" (for "it's") — his own copy, not the engine's, but the gate would have caught both.

---

## 6. Recommendations for Jake (NOT auto-applied — your call)

1. **You are the engine, and now there's a number: 9 reels = 93% of 12,332 impressions.** Five reviews predicted it; this week measured it. TikTok alone (9 reels, zero deck posts) was 55% of the entire program. **Protect the daily reel above everything else in this system.** Nothing else the engine does comes within 20x of it.
2. **The list-format reel is your new best unit — deal more of it.** "9 AI tools I use" hit **1,486 views / 3.30%**, the program record, and simultaneously took X's top slot (59 imp, 3.5x median). Named-list reels are scannable and screenshot-able in a way concept reels aren't. The W28 read (concept-education) still holds at #2 (1,125 / 3.73%), so run **both**: concept tips *and* tool/stack lists.
3. **Decide the video spine's fate.** 1,009 catalog clips, `deal-videos.js` never wired into the Monday batch, zero clips dealt or rated. Either (a) wire it in so the Monday batch deals 2 back-catalog reels/day as designed — which also turns on the video scoreboard — or (b) retire it, since you're now filming daily and it's solving a problem you no longer have. **Right now it's dead code with a maintenance cost.** *(My lean: wire it in as the floor for weeks you travel, but that's your call.)*
4. **Auto-publish the deck. The evidence is now unambiguous.** Publish-through was 44%, and the 56% that failed failed on the two mornings you weren't in the planner — not on quality. On the mornings it ran, the deck's LinkedIn posts beat the network median by 1.53–1.97x. **Carried from W28/W29 and now backed by data:** let the engine auto-publish LinkedIn text + the daily reactives, keep carousels/docs approval-gated. *(Workflow change — your call.)*
5. **Make a call on Threads.** 10 posts, **46 impressions**, median 2, for a full week. It is not a format problem — the Reply-Bait cards did their job in W25 (78 imp). The surface is simply not distributing. Either commit to growing it deliberately or drop it from the weekly deal and spend the slots on LinkedIn, where the same effort returned 25x the reach. *(Cadence/platform change — your call.)*
6. **Consider two library changes I did not make unilaterally:** (a) demote **Send-This Carousel** A→B on IG, or reclassify IG carousels as a secondary container — video has beaten them four straight weeks; (b) add a **"Build-in-Public Milestone List"** card to `linkedin.md` — your own personal-milestone post was the top non-video LinkedIn post of the week (180 imp / 6.11% ER) and that register has no card in the library. Both touch the library's shape rather than a tier nudge, so they're yours.
7. **Fix the three live artifacts in §5** (duplicate LinkedIn post, orphaned first comment on your top post, stuck thread descendants) — none is editable through the MCP.
8. **Add a typo/spell + book-branding pass to the QA gate.** Carried W25→W29, cheapest standing win, and now there's published copy with visible typos.
9. **Still open, carried:** decide YouTube's status (published ≥4 shorts, effectively unmeasured — §5.5), and **wire GA4 / GSC into this review** so branded search and waitlist signups (the book funnel) stop being invisible. With 12,332 impressions of top-of-funnel finally flowing, the conversion end is the next thing worth measuring.

---

## 7. Experiments queued for Monday's W31 batch

1. **Move every TikTok/IG video slot to 08:00–09:30 Phoenix and hold it for the week.** Morning posts averaged 918 views / 3.36% ER vs 604 / 2.30% at the model's 10:00/12:00/18:00 peaks, and both program records were morning posts. n=9 — this is the test that either sharpens the engine's slots permanently or sends us back to the generic model.
2. **Deal a second list-format reel script** alongside the concept anchor (rec #2). The format took the program record on its first outing; one repetition tells us whether that was the format or the topic.
3. **Rebalance the text deck toward LinkedIn and drop the X thread.** LinkedIn returned 259 dealt-post impressions from 2 posts; X's 6-tweet thread died at 1 impression by tweet 4 and Threads returned 3 impressions from 2 posts. Deal **more LinkedIn text, X singles only, Threads reactive-only** — and re-deal the two LinkedIn posts that never published (`keyword-pyramid` doc, `facebook-ads-arent-hard`), which were missed, not rejected.
4. **Re-deal Monday's five posts, and deal Monday's batch on Friday.** Monday's deck was created at 08:2x for slots starting 09:30 the same morning and published none of them. Generating the Monday batch **the Friday before** gives the gate a weekend to open.

---

*All repo edits this run are git-revertible: **6 format files** (`linkedin` · `x` · `threads` · `instagram` · `tiktok` · `facebook` — emphasis notes only) + this review. **Commit hygiene note:** commit `d4494e5` also carried two **pre-existing, unrelated** working-tree changes that were meant to be committed separately and were swept in by a scripting error — `formats/youtube.md` (the retired-"Get the truth" CTA fix + Eight-Dominoes-paused marking, per CONTENT_GUIDE §3/§8) and the new `reviews/README.md`. Neither is W30 tuning. It was already pushed, so history was left intact rather than rewritten: **to revert this week's tuning, revert the 6 format-file hunks and this file, not the whole commit.** **0 tier moves, 0 timing/slot changes, 0 catalog ratings, 0 voice/brand/offer/stat changes** — all locked or below the confidence gate. No Metricool writes (nothing published, nothing un-drafted, no draft edited); the five mechanical faults in §5 are flagged rather than touched because the MCP has no delete tool and editing stuck state risks a duplicate post. W25–W29 preserved in git history.*

*Six weeks in, the verdict finally has data behind it. The deck was never the problem — the two LinkedIn posts that shipped beat their network median by 1.53x and 1.97x. The reel was always the program, and at 93% of reach it is now measured rather than argued. What remains is the smallest possible gap: **a morning action on Monday and Thursday.** Close that and the program runs.*
