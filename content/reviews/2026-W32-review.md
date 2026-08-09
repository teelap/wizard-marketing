# Weekly Review — 2026-W32 (the book launched, the launch didn't; the spine became the program)

**Run:** late Sunday **2026-08-09** (autonomous `weekly-review`). **Brand:** Jake the Wizard (Metricool blogId 6387301, America/Phoenix). **Reviewer:** scheduled task, no human present. **Week scored:** Mon 08-03 → Sun 08-09. **Monthly research refresh: done** (last W28).

> **Eight Dominoes went live on Amazon on Monday. The launch campaign built for it never published.** Nine staged objects — thirteen posts counting the X thread — across LinkedIn, Facebook, Instagram, TikTok, Threads and X, written by Jake himself on Thursday morning, scheduled for Friday 14:00–18:30. **Every one of them is still sitting in the planner as an expired draft.** The single launch post that reached an audience is the one he composed and sent by hand on Thursday afternoon — and it took **342 impressions = 5.90x the LinkedIn median, the largest reach-vs-median any post has recorded on any network in this program's history.** That number is the measure of what the other thirteen were worth.
>
> **The second headline is the one the last six reviews were building toward: the video spine is now the program.** Two back-catalog clips returned **2,001 of the week's 4,421 impressions — 45.3%**, up from 15.5% in W31, from the same two-clip count. The difference is entirely the W32 routing change. And the per-unit numbers have crossed over: the spine averaged **1,000 impressions per clip against 693 for Jake's own freshly-filmed reels.** The dealt clip beat its network median on **four of five measured networks** (LinkedIn 1.31x, X 1.27x, TikTok 1.26x, Instagram 1.21x). Back-catalog is no longer at parity with new footage. On this week's evidence it is ahead.
>
> **Everything else is the gate.** Program reach fell **8,312 → 4,421 (−47%)**. Publish-through fell **3/27 (11%) → 1/26 (3.8%)**. Counting the reactives and the launch blitz, **1 of 45 scheduled objects published — 2.2%.** Wednesday and Sunday were fully dark.
>
> This review makes **0 tier moves** (zero dealt text cards published — week 8). It records **2 `good` video ratings** and the first **correct** publish stamps the catalog has ever had, **verifies the W31 `mark-posted.js` fix held** (0 false stamps against W31's 12), writes **12 evidence-tied emphasis notes** across 7 format files, and completes the **monthly research refresh** with two genuinely new mechanics and one that may explain X's floor structurally. Voice / CONTENT_GUIDE untouched (locked).

---

## 1. The data pulled

- `getBrandSettings` → brand confirmed (7 networks, America/Phoenix).
- `getAnalyticsDataByMetrics` `BSPO01–09` (08-03 → 08-09, all networks) → **25 published rows.** Timestamps on this connector are **UTC**, Phoenix on `getScheduledPosts`; all times below are **Phoenix**.
- `getScheduledPosts` (four windows) → the publish/draft ledger in §2.0. Every un-published item confirmed still `draft:true` / `PENDING` with a passed date.
- `getBestTimeToPostByNetwork` (TikTok) → §3.
- **Competitor scoreboard — pulled for the first time since the roster was built.** X (`TTCO`) returned **14 accounts**; YouTube (`YTCO`) returned **9**. **Instagram (`IGCO`) returned 0 rows** on two separate windows with field IDs verified live against `getAnalyticsAvailableMetrics` — flagged in §5.
- **Monthly research refresh** (§6): four platform searches (LinkedIn, TikTok, Instagram, X).
- **GA4 / GSC → still not wired** into this routine. Carried since baseline, and it now costs more than it used to: there is a real conversion to measure (Amazon book sales) and this review cannot see it.
- Read `content/calendar/2026-W32.md` (12 text posts + 14 spine reels + 7 shoot scripts, card + hook per row) and the W31 review (built on, not re-derived).

---

## 2. Score — performance ↔ what was dealt (normalized within network)

### 2.0 The publish ledger — the worst throughput week on record, on the most important week on record

**1 of 26 dealt evergreen items published (3.8%).** Plus **0 of 10 daily-reactive drafts** and **0 of 9 book-launch objects**. Total: **1 of 45 (2.2%)**.

| Day | Dealt (text + spine) | Published | Reactives | Launch | Notes |
|---|---|---|---|---|---|
| Mon 08-03 | 2 + 2 | **1** | 0/2 | — | book goes live on Amazon; the one publish is a *W31* leftover Jake re-routed by hand |
| Tue 08-04 | 2 + 2 | **1** | 0/2 | — | the dealt all-7 spine reel — the week's proof |
| Wed 08-05 | 3 + 2 | **0** | 0/2 | — | fully dark |
| Thu 08-06 | 3 + 2 | **2** | 0/2 | — | both composed fresh: Jake's own reel + the LinkedIn book post |
| Fri 08-07 | 2 + 2 | **1** | 0/2 | **0/7** | Jake's own reel. The launch blitz (14:00–18:30) never fired |
| Sat 08-08 | 0 + 2 | **1** | — | **0/1** | posted **natively on TikTok, outside Metricool** |
| Sun 08-09 | 0 + 2 | **0** | — | — | fully dark |

**The book-launch campaign, in full — all still `draft:true`, all dates passed:**

| Scheduled | Network | uuid |
|---|---|---|
| Fri 14:00 | X (teaser) | `-57210360006227396` |
| Fri 15:30 | Threads | `-5994232038692206762` |
| Fri 16:00 | LinkedIn (the long launch post) | `8407723965123739925` |
| Fri 16:30 | Facebook | `4658550318122878669` |
| Fri 17:00 | X **+ 5-tweet thread** (Sat 02:00) | `-8630393874530615142` |
| Fri 17:30 | Threads | `-2822588355650436329` |
| Fri 18:00 | Instagram | `-5224488618206081326` |
| Fri 18:30 | TikTok | `-7361255630589964574` |
| Sat 11:00 | Facebook + Instagram | `4232409690798378105` |

Jake created all nine himself on **Thu 08-06 between 08:43 and 12:57**. He was in the planner every weekday. The launch did not fail on effort or on content — it failed on the last click.

### 2.1 Reach attribution — where the 4,421 impressions came from

| Source | Impressions | Share | Interactions | Per unit |
|---|---|---|---|---|
| **Video spine** (2 back-catalog clips, all-7 routed) | **2,001** | **45.3%** | 59 | **1,000** |
| Jake's own reels (3 clips) | 2,078 | 47.0% | 75 | 693 |
| **LinkedIn book announcement** (1 post) | **342** | 7.7% | 10 | 342 |
| Dealt evergreen **text** deck | **0** | 0% | 0 | — |
| Daily-reactive newsjacks | **0** | 0% | 0 | — |
| Book-launch campaign | **0** | 0% | 0 | — |
| **Total** | **4,421** | | **144** | |

**Read the per-unit column — it is the finding of the week.** In W31 the spine returned 645 impressions per clip against Jake's 1,144, and the review attributed the gap to routing rather than content. The routing was fixed. **The spine now returns 1,000 per clip against Jake's 693 — it did not just close the gap, it passed him.** Two clips, so treat the crossover as directional; the direction has now been consistent for two weeks.

### 2.2 Per-network — median and the spine against it

| Network | Posts | Total imp | Median imp | Median ER | Spine clips vs median |
|---|---|---|---|---|---|
| **TikTok** | 5 | **2,829** | 571 | 3.79% | **1.26x** · 0.86x |
| **LinkedIn** | 5 | 577 | 58 | 4.17% | **1.31x** · 0.91x — *(book post **5.90x**)* |
| **Instagram** | 4 reels | 470 | 98 | 2.29% | **2.11x** · **1.21x** |
| **Facebook** | 4 reels | 444 | 104.5 | 0.45% | **2.08x** · 0.71x |
| **X** | 4 | **86** | 20.5 | 0% | **1.27x** · 0.73x |
| **Threads** | 4 | **15** | 4 | 0% | unreported · 1.00x |
| **YouTube** | **4 published, 0 reported** | — | — | — | connector gap (§5.2) |

Instagram's and Facebook's medians roughly halved (199 → 98, 203 → 104.5) while LinkedIn's and X's rose ~14%. With 4–5 posts per network that is composition, not a platform signal — Jake filmed half as much, so the Meta medians reverted toward the spine's level rather than his outliers'.

### 2.3 The video scoreboard — the spine's second read, and it is decisive

| Clip | Dealt as | Published | Result vs its network median |
|---|---|---|---|
| **`how-to-get-more-conversions-by-not-talking-about-fgo509`** | Tue 08:00, **all 7** | Tue 09:42, **all 7 as dealt** | LinkedIn 76 = **1.31x** · X 26 = **1.27x** · TikTok 718 = **1.26x** (top TikTok of the week) · IG 119 = **1.21x** · FB 74 = 0.71x · **~1,013 imp / 35 int** |
| **`it-s-always-better-to-sell-unperceived-value-tha-vbkz67`** | *W31* Sun, IG+FB | Mon 09:37, **all 7** (Jake re-routed) | IG 207 = **2.11x** (top IG of the week) · FB 217 = **2.08x** (top FB of the week) · TikTok 492 = 0.86x · LinkedIn 53 = 0.91x · X 15 = 0.73x · Threads 4 = 1.00x · **~988 imp / 24 int** |

**Verdicts applied (§4): both `good`.** The first clip is the **best-performing dealt item in the program's history** and the first ever to lead a week's reach. The second took the top slot on both Meta surfaces simultaneously.

**Four spine reels have now published across two weeks. None landed below 0.92x its network median; two landed above 2x.** The premise the spine was built on — that the engine can hold reach on weeks Jake cannot film — is no longer a hypothesis.

### 2.4 The dealt text deck, and the competitor benchmark

**Zero of 12 dealt text posts published. Week 8 with almost no card-level evidence.** The LinkedIn `keyword-pyramid` document has now been dealt and missed **three times**; `facebook-ads-arent-hard` three times. Both sit on the channel whose every published dealt post has beaten median.

**Competitor scoreboard (first pull since the roster was built):**

- **X (14 tracked, 9 days).** Engagement is measured per 1,000 followers, so size is controlled for. Peer median **0.0104**. The top two are **Alex Hormozi 0.428** and **Dan Koe 0.313** — who posted **4** and **6** times. The two highest-volume accounts, **Barry Hott (144 posts)** and **Sahil Bloom (139)**, sit at **0.0076** and **0.0139** — roughly 30–50x lower per follower. **Volume is not the lever on X for this peer set.** Supports the existing prefer-singles posture; argues against padding X's slot count to fix its numbers.
- **YouTube (9 tracked, 9 days).** Alex Hormozi posted 54 videos and averaged **35,865 views**; Neil Patel 12 at 2,511; Adam Erhart 7 at 2,248; Marketing Against the Grain 8 at 567. Three tracked accounts posted nothing. Jake published 4 Shorts and can measure **none of them** — the benchmark exists, the comparison doesn't.
- **Instagram: 0 rows returned** (§5.4).

### 2.5 Top 3 / bottom 3 (the why)

**Top 3**
1. **LinkedIn — the Eight Dominoes announcement. 342 imp / 10 int = 5.90x the LinkedIn median (58).** More impressions than every other LinkedIn post of the week combined (283), and the largest reach-vs-median figure this program has recorded anywhere. The shape: personal-origin narrative → concrete stakes → the argument in one sentence → a third-party credential quoted verbatim → a one-line diagnostic close. Image attached, Amazon link in the **first comment**, not the body. **Confound named: it is a launch announcement, and event novelty is doing part of the work.** This week's LinkedIn research refresh points the same way independently — the 360Brew LLM ranking explicitly rewards original perspective and specific professional experience.
2. **The dealt spine reel `how-to-get-more-conversions-by-not-talking-about`. ~1,013 imp / 35 int across 6 measured networks, above median on 4 of 5.** The first time a *dealt* item has led the week's reach, and the direct payoff of the W32 routing change. This is exp #1 returning a clean yes.
3. **The re-routed W31 clip `sell-perceived-value-than-price`. ~988 imp**, taking the **top Instagram reel (2.11x) and the top Facebook reel (2.08x) of the week at once** — a back-catalog clip that had been dealt to two networks and left to expire, resurrected by hand.

**Bottom 3**
1. **The Eight Dominoes launch campaign — 9 objects, 13 posts, 7 networks, 0 published, on launch week.** Nothing else this program has failed at is in the same category. A book launch has one window and it does not reopen.
2. **The daily-reactive layer — 10 drafts, 0 published, second consecutive zero week.** The routine ran all five weekdays and wrote in-voice, genuinely timely takes: Google Trends raising its comparison limit to 400 terms, Google testing search profiles built from social accounts, the AI Max broad-match flip still landing in September, Adobe putting 70+ tools inside ChatGPT, Disney handing TikTok creators Marvel/Pixar/Star Wars. All ten expired. Timeliness is the one asset that cannot be recovered.
3. **X — 86 impressions and 2 interactions for the entire week, the lowest on record.** All four posts were cross-posted video captions. Zero dealt singles, zero reactives, zero launch posts. The deliberate news-reaction test (the **Teardown · C** card on EA's in-game ad platform — the exact register holding W31's 14.1x record) was written, rendered, scheduled, and never shipped: **5th carry-forward, 8 weeks without a single deal.**

*Dishonourable mention:* **sixth consecutive week with no carousel read.** The IG `page-intent` 8-slide deck, the TikTok `build-for-the-forward` 8-slide, and the LinkedIn `keyword-pyramid` 9-slide document were all rendered and none published. Six weeks of decks nobody has seen.

### 2.6 Trend vs W31

- **Publish-through: 3/27 (11%) → 1/26 (3.8%).** Including reactives and the launch: **1/45 (2.2%)**.
- **Reach: 8,312 → 4,421 (−47%).** Interactions 248 → 144 (−42%).
- **Jake's own reels: 6 → 3.** Wednesday and Sunday fully dark.
- **The spine: 2 published → 2 published, but 15.5% → 45.3% of program reach, and 645 → 1,000 impressions per clip.** The one thing that moved forward, and it moved a long way.
- **Reactive layer: 0 → 0.** Second zero week.
- **Medians:** TikTok 571 → 571 (identical). LinkedIn 51 → 58 (+14%). X 18 → 20.5 (+14%). IG 199 → 98 (−51%). FB 203 → 104.5 (−49%). Threads 1 → 4.

---

## 3. Timing

**The morning window is now a three-week finding on engagement — and the reach claim stays dead.**

| | Morning 08:00–09:45 | Later | Edge |
|---|---|---|---|
| W32 alone | n=4 · 565 views · **4.20% ER** | n=1 · 571 · 1.75% | — |
| **W30+W31+W32** | **n=12 · 686 views · 3.92% ER** | **n=9 · 623 views · 2.55% ER** | reach **1.10x** · **ER 1.54x** |

The reach edge has decayed 1.52x → 1.19x → **1.10x** across three weeks, which is what noise does. The ER edge has gone 1.43x → **1.54x** and pointed the same direction in all three weeks, which is what signal does. **Decision: hold 08:00–09:30, state the engagement claim with confidence, keep the reach claim retracted.** Slots unchanged; note applied to `tiktok.md`.

**Metricool's TikTok best-times model is byte-identical for the ninth straight week** (Wed 10:00 = 1,432, Thu 10:00 = 1,471, peaks 10 / 12 / 18 Phoenix). Twenty-one published TikToks across three weeks have not moved it by a point. It is the generic model. `tiktok.md` now says: stop treating its output as an input.

---

## 4. Changes auto-applied this week

### Tier moves: **0**

Zero dealt text cards published — week 8. Nothing to promote, nothing to demote, no card with enough uses to clear the small-N gate. Tier indexes untouched in all seven platform files.

### Video catalog: **2 clips rated `good`, 2 correct publish stamps** (`content/video/catalog.json`)

| Clip | Verdict | Evidence recorded inline |
|---|---|---|
| `how-to-get-more-conversions-by-not-talking-about-fgo509` | **`good`** | LinkedIn 1.31x · X 1.27x · TikTok 1.26x · IG 1.21x · FB 0.71x; ~1,013 imp / 35 int — best dealt item in program history |
| `it-s-always-better-to-sell-unperceived-value-tha-vbkz67` | **`good`** | IG 2.11x (top IG) + FB 2.08x (top FB) same week; ~988 imp / 24 int |

Both also received real `usedDates` entries (2026-08-04 and 2026-08-03, `all7`), which correctly starts their 12-week cooldowns. **0 retires** — nothing came near the bar.

### Self-healing: the W31 corruption class is verified closed

**W31 had to repair 12 catalog clips carrying false "posted" stamps.** The W32 batch implemented the fix (`mark-posted.js --dealt`). Verified this run: of the **14 clips dealt in W32, 0 carry a false publish stamp**; `dealtDates` is populated, `usedDates` is empty on all 13 that never published, and only the 1 that genuinely published now has a `usedDates` entry — added by this review. **The fix works. The failure mode that would have retired good clips as "posted, zero performance" is gone.**

Nothing else was mechanically broken: all media resolve to Metricool's own CDN, both scheduled routines ran on time, and no draft failed with an error status. The faults in §5 are decisions and connectors, not repairable data.

### Emphasis notes auto-applied: **12** across 7 format files

| File | Notes added |
|---|---|
| `formats/linkedin.md` | Spine beat median here a 2nd week (1.31x) — keep LinkedIn in the all-7 route permanently. · **The 5.90x book post and its register**, with the launch-novelty confound named and the card proposal escalated rather than authored. · Monthly refresh. |
| `formats/instagram.md` | **Spine beat fresh footage outright** (2.11x / 1.21x vs Jake's 0.79x / 0.68x); four spine reels across two weeks, none below 0.92x. · Carousels: 6th week with no read — reframed as a throughput cost, not a format question. |
| `formats/tiktok.md` | Morning ER edge now a 3-week finding (1.54x, n=12 vs 9); reach claim stays retracted. · Best-times model byte-identical 9th week — stop treating it as an input. · Spine took TikTok's top reach (1.26x). |
| `formats/x.md` | **Lowest week on record** (86 imp / 2 int); Teardown never dealt, **5th carry-forward**, so W31's 14.1x record remains unreplicated. · **Competitor benchmark: volume is not the lever** (top-2 by per-follower engagement posted 4 and 6 times; the 144-post account is 50x lower). · Monthly refresh — Premium multiplier + link penalty may make X's floor structural. |
| `formats/facebook.md` | **Container retraction confirmed a 3rd time** — a `type:"POST"` clip took 2.08x median and still landed on a `/reel/` URL. · **Engagement absent 3 straight weeks** (1.01% → 0.27% → 0.45%): pure reach surface, cross-post only, never deal a comment-dependent card here. |
| `formats/threads.md` | **The "does Threads distribute video" test was dealt (12 reels) and never ran** — 1 published, 15 imp for the week. Blocker is throughput, not the platform; the cost side of the keep-or-drop decision is now concrete. |
| `formats/youtube.md` | **Reporting gap went total: 4 Shorts published with real video IDs, 0 rows returned.** New decisive evidence — the YouTube *competitor* connector works fine this week, so it is **Jake's own channel connector**, not Metricool. |

### Monthly research refresh (§6): 2 platform files updated

`platforms/tiktok.md` and `platforms/instagram.md` gained new mechanics. `platforms/x.md` and `platforms/linkedin.md` were **already current** — the refresh confirmed them rather than moving them, which is itself worth recording.

### Timing / cadence: **no slot changes.** Voice, brand canon, offers, stat bank: **untouched (locked).**

---

## 5. Healed + flagged

### ⚠ Flagged — decisions and connectors, **not** safely repairable by this routine

1. **The book-launch campaign is sitting in the planner as nine expired drafts** (§2.0). This routine does not publish and does not un-draft, and re-dating them is a launch-timing call only Jake can make. **Left completely untouched.** It is recommendation #1.
2. **YouTube: 4 Shorts published, 0 measured — third straight week, and now total.** `getScheduledPosts` returns real video IDs (`VJ47Qs9S-KU`, `6pJprjEPmzk`, `OQcRJ-5GrDs`, `ezlBi4mfPnE`) with `PUBLISHED` status; `BSPO` returns nothing. W31 was 1-of-7, W32 is **0-of-4**. **New evidence on where the fault sits: the YouTube *competitor* connector returned 9 accounts with full data this week**, so YouTube reporting is not down brand-wide — it is Jake's own connected channel.
3. **The book CTA pause is now factually wrong.** The engine has had the book/waitlist CTA paused since **2026-06-19**, on Jake's instruction, because the launch was distant. **The book has been live on Amazon since Monday 2026-08-03.** The W33 batch will keep closing on consulting / blog / newsletter until Jake says otherwise, because CTAs and offers are locked to these routines. This is the highest-value one-word decision on the list.
4. **Instagram competitor connector returned 0 rows** on two windows (7-day and 30-day) with field IDs verified live against `getAnalyticsAvailableMetrics`. X and YouTube both returned full data in the same session, so this is IG-specific — the 13-account IG roster may have been dropped, or IG competitor data has stopped backfilling. Worth a look in the dashboard.
5. **Voice drift in Jake's own launch drafts.** The nine staged launch posts carry emoji (📕 👇 🔗 🙏), exclamation marks, and at least one em-dash (*"They didn't outspend you — they out-meant you"*). VOICE_DOSSIER forbids all three. **Jake wrote these himself and voice is locked to this routine, so they are flagged, not edited** — but if he re-dates and ships them, a five-minute pass would bring them back in line.
6. **The launch X posts put the Amazon link in the post body.** Both `platforms/x.md` and this week's refresh say the same thing: links in the body cost ~30–50% of initial reach, and for non-Premium accounts median engagement on link posts has run near zero since March 2026. **If those posts get re-dated, move the link to the first reply.**
7. **The 3-week `--dealt-window` guard is holding 13 unpublished W32 clips out of the W33 and W34 deals.** This is correct behavior — their drafts still exist in the planner and re-dealing would duplicate them — but it means those 13 subjects cannot be re-dealt for three weeks. Noted so it isn't mistaken for a bug later.

### ⚠ Flagged — throughput (the surviving constraint, week 8)

Still `draft:true` with passed dates: **12 dealt text posts**, **13 dealt spine reels**, **10 reactives**, **9 launch objects** — 44 items. Left in place; the MCP has no delete tool and editing stale drafts risks a re-post. The two twice-missed LinkedIn re-deals (`keyword-pyramid` doc `1671656572171273913`, `facebook-ads-arent-hard` `6333495391926897086`) have now been **missed three times each**, on the channel where every dealt post that has ever published beat its median.

**All seven shoot anchors unfilmed for a fifth straight week**, including both list-reel scripts held over since W30 — the list-reel record has still never been re-tested.

---

## 6. Recommendations for Jake (NOT auto-applied — your call)

1. **Decide what happens to the launch campaign, today.** Nine posts, thirteen units, every network, written and staged for launch week, none published. Either **re-date them and ship**, or **abandon them and write a fresh second-wave** — but the worst outcome is leaving them where they are. One data point to size the decision: the single launch post that did go out took **5.90x the LinkedIn median and outdrew every other LinkedIn post of the week combined.** If you re-date, fix two things first: move the Amazon link out of the X post bodies into the first reply, and run the voice pass (§5.5, §5.6).
2. **Un-pause the book CTA.** You paused it on 2026-06-19 because the launch was far off. The book is live and for sale. Say the word and it goes back into the engine's rotation next Monday; until then the batch keeps closing on consulting, blog and newsletter, which on launch week is the wrong close.
3. **The gate is the whole program, week 8, and this week it cost you a book launch.** One of forty-five scheduled objects published. Every previous review has recommended auto-publish for LinkedIn text and the daily reactives; this week adds the strongest possible argument for it. Either **turn on auto-publish** for those two lanes, or make opening the drafts queue the first step of the reel-posting habit you already have every morning. Nothing else on this list is worth as much.
4. **Route every spine reel to all seven networks, not just the day's first.** The W32 batch routed reel #1 broadly and reel #2 to four networks. The broad-routed clip returned **1,013 impressions and beat median on four of five networks**; the spine is now **45% of program reach from two clips.** Queued as experiment #1 (§7) — it's a one-line change to `deal-videos.js`, so say if you'd rather it stayed as-is.
5. **X Premium is a spend decision that this review can now put a number on.** The refresh found Premium/Verified is a direct **2–4x visibility multiplier** (reported up to ~10x per post versus free accounts) and a ranking input, and that since March 2026 non-Premium link posts see median engagement near zero. X has returned 86 impressions this week against LinkedIn's 577 for the same content. **If your account isn't Premium, a meaningful share of that gap is bought, not written.** Money, so it's yours.
6. **The reactive layer needs a decision — third week of asking.** Twenty drafts across two weeks, zero published, all expired. Reactive content has a shelf life measured in hours; an approval queue destroys it outright. **Either auto-publish it or stop generating it.**
7. **Reconnect (or re-authorize) the YouTube channel in Metricool.** Four Shorts published this week, zero measurable; the competitor connector proves YouTube isn't down brand-wide. Right now this review is blind on a channel with ~979 subs.
8. **Two library additions still waiting on you:** a **LinkedIn long-form personal-origin card** (the register behind the 5.90x post, and behind W30's 6.11% milestone post — same shape, two data points now), and the **Build-in-Public Milestone List**. Both change the library's shape rather than nudging emphasis, so neither is authored here.
9. **Threads: 12 spine reels dealt, 15 impressions returned.** The keep-or-drop question is now four weeks old and the cost side is concrete.
10. **Still open, carried:** wire **GA4 / GSC** into this review — and it matters more now, because there is finally a real conversion to measure (book sales, and branded search for "Eight Dominoes"); check the **Instagram competitor roster** (§5.4); and consider **cutting the carousel render budget** until one publishes — six weeks of rendered decks is real time spent on assets nobody sees.

---

## 7. Experiments queued for Monday's W33 batch

1. **Route every spine reel to all seven networks** (§6.4). The strongest measured change available; the evidence is now two weeks deep and unambiguous.
2. **Deal the launch register once as a card test on LinkedIn** — a first-person origin post with a specific professional experience and a one-line diagnostic close, on a non-book subject. That is the difference between an announcement outlier and a repeatable format, and this week's LinkedIn research says the platform's ranking model is built to reward exactly that shape.
3. **The Teardown · C on X, 6th attempt.** Eight weeks without a single deal, and the register holds the platform's only record. If it doesn't publish again, demote it or retire it — a card that can never be tested is dead weight in the deck.
4. **Cap the carousel render at one per week until one publishes.** Six weeks, three decks a week, zero reads. Rendering assets nobody sees is the one place this engine is definitely wasting effort, and unlike the gate it is entirely within the batch's control.
5. **Re-deal the two thrice-missed LinkedIn items a fourth time** (`keyword-pyramid`, `facebook-ads-arent-hard`) — missed, never rejected, on the strongest channel.

---

*All repo edits this run are git-revertible: **7 format files** (`instagram` · `linkedin` · `tiktok` · `x` · `facebook` · `threads` · `youtube` — emphasis notes only, no tier or card-body changes), **2 platform files** (`platforms/tiktok.md` · `platforms/instagram.md` — monthly refresh mechanics), **`content/video/catalog.json`** (2 ratings, 2 correct publish stamps), and this review. **0 tier moves, 0 timing/slot changes, 0 retires, 0 voice/brand/offer/stat changes** — all locked or below the confidence gate. **No Metricool writes:** nothing published, nothing un-drafted, no draft edited or re-dated; the launch campaign in §2.0 was left exactly as found. W25–W31 preserved in git history.*

*Eight weeks in, the engine finally has an answer to the question it was built to ask. **Can a back catalogue carry the program?** Yes — 45% of this week's reach from two three-year-old clips, out-performing new footage per unit, above median on nine of the eleven network-slots they touched. The content problem is solved. What replaced it is starker: this was the week Jake's book went on sale, the launch campaign was written and staged and correct, and it did not go out. The program's two proven engines — a camera and a 1,025-clip archive — are both producing. Between them and the audience there is still exactly one unautomated click, and this week that click was worth a book launch.*
