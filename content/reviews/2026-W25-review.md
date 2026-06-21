# Weekly Review — 2026-W25 (the first real format-card read)

**Run:** late Sunday **2026-06-21** (autonomous `weekly-review`). **Brand:** Jake the Wizard (Metricool blogId 6387301, America/Phoenix). **Reviewer:** scheduled task, no human present. **Week scored:** Mon 06-15 → Sun 06-21.

> **This supersedes the 06-15 baseline** (review #1, committed at `d1cfe8d` — preserved in git history). That run was written the day the W25 library batch *published* and had zero analytics; it correctly made **no** tuning moves and predicted "the first real read lands next review." This is that read: the W25 posts have now matured ~6 days, so the scoreboard can score the format library for the first time.
>
> **Discipline still governs.** This is **one** week of real data. The small-N rule (*a card needs ≥3 uses AND ≥2 weeks, or a clean ≥2× pattern, before a tier move*) means the right action is **emphasis annotations, not tier moves.** Tier index untouched on every platform. Voice + CONTENT_GUIDE untouched (locked). Every edit this run is an emphasis note + this file — all git-revertible.

---

## 1. The data pulled

- `getBrandSettings` → brand confirmed (7 networks; TikTok `itsjakethewizard`, 110K back-catalog).
- `getScheduledPosts` (06-15/06-16 window) → what published vs. what stalled as a draft (see §5).
- `getAnalyticsDataByMetrics` `BSPO01–09` (06-14 → 06-21) → per-post impressions / interactions / ER / type across all networks. **This is the join key for §2.**
- `getAnalyticsDataByMetrics` `IGCO` + `TTCO` → competitor scoreboard (§2, benchmark only).
- `getBestTimeToPostByNetwork` (TikTok) → §3.
- **GA4 / GSC → still not wired** into this routine. Branded-search trend + waitlist signups (the book funnel north-star) remain unmeasured. Carried forward as a gap (§6).
- Read `content/calendar/2026-W25.md` (the deal) + the 06-15 baseline review (built on, not re-derived).

**Join caveat:** the W25 calendar logged *format type* (carousel / reel / text) per row but **not the named format card** per post. So this week's attribution is at the **format-type / subject / hook** level, not clean card-level. Closing that logging gap is experiment #3 (§7).

---

## 2. Score — performance ↔ what was dealt (normalized within network)

### TikTok — n=4 (median ~451 imp · ~3.1% ER)
| Date | Post | Type | Imp | Int | ER |
|---|---|---|---|---|---|
| 06-15 | "8 content types loop forever" (back-catalog) | VIDEO | 629 | 37 | **5.88%** |
| 06-20 | "people browse… buy emotionally" (Core Attraction) | VIDEO | 409 | 14 | 3.42% |
| 06-15 | "working on something new… chaos" (back-catalog) | VIDEO | 494 | 14 | 2.83% |
| 06-19 | "most defensible move… domino 08" | IMAGE | 306 | 2 | **0.65%** |

### Instagram — n=5 feed (median ~157 imp · ~3.47% ER)
| Date | Post | Type | Imp | Int | ER |
|---|---|---|---|---|---|
| 06-15 | "8 content types" (back-catalog) | REEL | **1,593** | 111 | **6.97%** |
| 06-20 | Core Attraction | REEL | 157 | 6 | 3.82% |
| 06-16 | TikTok-SEO "how to get a post ranking" | CAROUSEL | 173 | 6 | 3.47% |
| 06-15 | Domino-2 "is your [hook] valuable" [typo] | IMAGE | 127 | 2 | 1.57% |
| 06-19 | "most defensible… domino 08" | CAROUSEL | 130 | 1 | **0.77%** |

### LinkedIn — n=5 (median 83 imp · 3.85% ER)
| Date | Post | Type | Imp | Int | ER |
|---|---|---|---|---|---|
| 06-20 | personal brand "the only asset they can't touch" | TEXT | 58 | 6 | **10.3%** |
| 06-19 | AI bell curve "racing toward the middle" | IMAGE | 83 | 4 | 4.8% |
| 06-15 | value prop "describe vs. the after" | TEXT | 130 | 5 | 3.85% |
| 06-15 | Taste document "the wo ends" [typo] | DOC | 170 | 3 | 1.76% |
| 06-19 | "most defensible… domino 08" (Static Card) | IMAGE | 32 | 0 | **0%** |

### X — cold (most originals 2–10 imp · ~0 int)
Best original: personal-brand "exit-proof asset" single (**33 imp / 1 int**). Reach spikes came only from *replying into* large accounts (@rustybrick 162 imp, 21 imp). The Domino-02 and SoBV threads drew 1–8 imp/tweet, ~1 int. **Expected off a ~0-follower base — the metric here is growth, not ER.**

### Threads — friendlier cold start (median ~8 imp)
Top post: the **pure Reply-Bait Question** "best marketing channel right now?" — **78 imp / 1 int (~10× median)**. Everything else (confession, either-or, diagnosis fragment, the "make it pop" image) sat at 2–19 imp. Runs ~2–3× X's impression baseline off the same cold start.

### Cross-cutting reads
1. **Video/Reel is the reach engine; static is not (yet).** On both TikTok and IG, videos/reels beat static carousels/images on ER and reach — the single biggest post in the whole program was a **back-catalog Reel** (IG 1,593 / 6.97%). **Confounded** (proven back-catalog video vs brand-new static cards), so it is *not* grounds to demote carousels — but it is a strong steer to **deal ≥1 video/reel per platform per week and keep mining the 110K back-catalog**, the highest-ROI unit available.
2. **The "Domino-08" static card is the clean loser — and it's an execution/brand miss, not a format-structure miss.** Same asset ran on three platforms and bottomed on all three (TikTok 0.65%, IG 0.77%, LinkedIn **0%**). Its caption was a one-line assertion + "send this to whoever's stuck" share-bait — it executed *none* of the Myth-Bust skeleton (no myth, no arc, no diagnosis) and it named "domino 08 of the eight" **off-book**, which the book-branding-restraint rule (CONTENT_GUIDE §8) bans. So the Myth-Bust **card** is not demoted; the **execution** failed the format pass and a voice rule.
3. **Reply-Bait Question over-indexes on Threads** (~10× median) — reinforces the deck's existing hero call.
4. **Winning subject: personal brand as the exit-proof asset** — best LinkedIn ER (10.3%) *and* best original X reach (33 imp). A real Jake-audience signal worth dealing again.

### Competitor benchmark (context only — not actionable yet)
IGCO/TTCO pulled. Jake's per-1,000-follower engagement isn't fairly comparable while his follower base is ~0 (the metric inflates at tiny N and on a viral back-catalog repost). Logged as a **watch-list**, not a tuning input: on IG, **Eugene Healey** (2.36) and **Codie Sanchez** (0.16) over-index on engagement; on X, **Dan Koe** (0.30) and **Alex Hormozi** (0.20) lead, while **Sahil Bloom** runs the highest volume (76 tweets/wk). Revisit for format/hook study once Jake has a comparable base.

### Trend vs last week
First *scoreable* week, so no like-for-like trend. Against the baseline's seed posting (TikTok video > image at n=1), W25 **confirms and widens** the video-over-static pattern across two platforms.

---

## 3. Timing
TikTok best-times still peak **weekdays 10:00 / 12:00 / 16:00 / 18:00 Phoenix, Wed–Thu strongest, weekends ~30% lower** — unchanged from the baseline and still matching the slots in use. The curve is sharpening (Wed/Thu now clearly above Mon/Tue) but is still largely Metricool's generic model. **No timing edit applied.**

---

## 4. Changes auto-applied this week (all emphasis notes — git-revertible)
A dated **"Scoreboard notes"** block was added near the top of each platform deck, each tagged with its evidence:
- `content/formats/tiktok.md` — video > static (deal ≥1 video/wk, mine back-catalog); the Domino-08 card's format-pass + brand-rule failure.
- `content/formats/instagram.md` — Reels are the reach driver (the 6.97% back-catalog win); carousels stay A but weren't where reach lived; Domino-08 repeat miss.
- `content/formats/linkedin.md` — text ≥ static-image/doc on ER this week (low confidence); winning subject = personal-brand-as-exit-proof-asset; reserve the Static Card for quotable lines.
- `content/formats/x.md` — X is cold, judge on growth not ER; personal-brand subject travels; reply-into-big-threads mechanic works; Teardown still un-dealt.
- `content/formats/threads.md` — Reply-Bait Question is the hero (~10× median); end every post on a forced reply.

**Tier moves: 0.** No card cleared the small-N gate (1 week of real data; the ≥2× patterns are format-*type*/hook emphasis, and the video>static gap is confounded by back-catalog-vs-new). **Emphasis notes: 5.** **Timing: 0.** Tier indexes and voice/brand untouched.

---

## 5. Healed + flagged

### The three baseline typos all shipped (the flag-don't-fix gap)
The 06-15 baseline flagged three typo posts and chose to *flag, not patch* the two still-pending ones (to avoid an unattended edit on auto-publishing content). All three have since **published with their errors** and are now unfixable (no Metricool delete tool):
| Post | Network | Error |
|---|---|---|
| LinkedIn Taste doc | LinkedIn | "the **wo ends** got expensive" → *two ends* |
| Threads headline post | Threads | "the headline doesn't **adress**" → *address* |
| IG Domino-2 carousel | Instagram | "is your **[hook]** valuable enough" → missing word |
**Lesson:** for auto-publishing drafts, "flag for Jake later" means the typo ships. The fix has to be **pre-publish** — i.e. a spell pass *in the gate* (§6.1), not a post-hoc patch. Nothing to heal now; the window closed.

### Throughput finding — a slice of the W25 batch never published
Several planned W25 posts are still `draft:true` / `PENDING` with **past** publish dates — they never went out because they weren't approved in time (e.g. the Best Buy "$300M button" single, the Core Attraction X thread, the Google-AI-docs singles, parts of the brand-vs-performance set). This isn't mechanical breakage; it's the **human-approval gate acting as a throughput bottleneck** — the engine staged more than got approved, and the surplus silently expired as stale-dated drafts. Flagged for Jake (§6.4).

### Everything else clean
No dead media URLs (W25 PNGs resolved to `static.metricool.com/...`). No silent channel. No routine failed to run. The W26 batch is already staged as drafts (06-15 load) for Monday.

---

## 6. Recommendations for Jake (NOT auto-applied — your call)

1. **Add a literal typo/spell pass to the QA gate, pre-publish.** Three live errors now prove the gap. It belongs in `weekly-evergreen` / `daily-reactive` *before* scheduling, not as a flag for later. *(Cheapest obvious win, carried from the baseline — now with receipts.)*
2. **Enforce the book-branding-restraint rule in the gate.** The worst post of the week ("domino 08 of the eight" share-bait, 0–0.77% ER everywhere) was *also* an off-book brand-rule violation. A "no Domino-N labels off-book; does the caption diagnose?" check in the format/voice pass would have caught it.
3. **Mine the back-catalog harder.** The 110K-follower archive produced the single best post in the program (IG Reel, 6.97%, ~10× median) and the top TikTok video. Reposting proven back-catalog clips is currently the highest-ROI unit by a wide margin — consider making ≥1 back-catalog Reel/week a standing slot on TikTok *and* IG. *(Cadence/strategy.)*
4. **The approval gate is throttling output.** A meaningful share of W25 never published because drafts weren't approved before their slot passed. Options: approve in a faster cadence, OR have the engine stage closer to what you'll realistically approve. *(Workflow — your call.)*
5. **Wire GA4 / GSC into this review.** Branded-search trend + waitlist signups are the real funnel reads; the review is still social-only. *(Infra, carried from baseline.)*
6. **Keep X/Threads expectations on *growth*, not ER.** Both are cold off ~0 followers; a 0% ER is the audience not existing yet, not the format failing. *(Carried from baseline.)*

---

## 7. Experiments queued for Monday's W26 batch

1. **Standing back-catalog Reel.** Deal one proven back-catalog clip on TikTok and one on IG this week — the cleanest, highest-ROI bet the data points to. Confirm the video-over-static pattern with fresh n.
2. **Lean Threads into Reply-Bait Questions.** The hero card 10×'d the median — deal it more often (incl. the daily-reactive pass), every post closing on a forced reply.
3. **Log the named format card per post in `content/calendar/2026-W26.md`.** This week's attribution stalled at format-*type* because the card wasn't logged per row. Card-level logging is what lets W26's review do real tier moves. *(This is the loop's load-bearing fix.)*
4. **Deal the Teardown (X, Tier C) once.** Still never tried; the dealing rules already require ≥1 experimental/platform/week. Run it through daily-reactive with the "diagnose the choice, not the human" guardrail for the first non-follower-reach read.

---

*All edits this run are git-revertible (this file + five emphasis notes). 0 tier moves, 0 voice/brand changes — both locked. The 06-15 baseline is preserved at commit `d1cfe8d`. The loop is now turning: W25 is the first scored week; W26 — with per-card logging — is the first that can move tiers.*
