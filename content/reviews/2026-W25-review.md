# Weekly Review — 2026-W25

**Run:** late Sunday 2026-06-15 (autonomous `weekly-review`). **Brand:** Jake the Wizard (Metricool blogId 6387301, America/Phoenix). **Reviewer:** scheduled task, no human present.

> **This is review #1 — a BASELINE, not a tuning pass.** Two facts govern everything below:
> 1. The brand joined Metricool **2026-06-11 (4 days ago).** There is no week of history to score.
> 2. The entire W25 format-library batch **published *today* (06-15)** — it has accrued **no analytics yet.** The first real read on any format card lands in **W26's** review.
>
> Per the hard rule (*Respect small N: a card needs ≥3 uses AND ≥2 weeks, or a clear ≥2×-median pattern, before a tier move*), the correct action this week is **zero tier moves and zero emphasis changes.** Anything else would be fitting noise. The system stays decisive *later*, as data deepens. What this review does instead: establish the baseline, score the thin signal that exists, and flag a QA-gate gap.

---

## 1. The data pulled

- `getBrandSettings` → brand confirmed (7 networks connected; TikTok handle `itsjakethewizard`, 110K back-catalog).
- `getScheduledPosts` (06-15 / 06-16 windows) → W25 batch began auto-publishing today. As of the pull: several X singles + 2 LinkedIn posts `PUBLISHED`; a Domino-02 X thread `PUBLISHING`; the rest `PENDING`/`draft`.
- `getAnalyticsDataByMetrics` (brandSummary posts, 06-08 → 06-15) → see §2. Only TikTok, X, and Threads returned rows. **No LinkedIn / IG / YouTube / FB post analytics in range** — LinkedIn's published-today posts are too fresh; the others had nothing live.
- `getBestTimeToPostByNetwork` (TikTok) → see §3. Still Metricool's **generic model** (4-day-old account, no Jake-specific TikTok history yet).
- GA4 / GSC → **not pulled this run** (not yet wired into this routine). Gap to close: branded-search trend + waitlist signups are the real north-star reads. Flagged in §5.

---

## 2. Score — what little exists (normalized within network)

Everything measurable here is Jake's **own organic / seed posting, pre-library.** None of it used a format card. It is the *baseline the library will be measured against.*

### TikTok — the only network with real reach (the 110K back-catalog)
| Date | Type | Impressions | Interactions | ER | Note |
|---|---|---|---|---|---|
| 06-11 | **Video** | 1,486 | 41 | **2.76%** | out-reached the image ~3× on impressions |
| 06-12 | Image (carousel) | 498 | 10 | 2.01% | |

- **Read:** video > image on both reach and ER, consistent with platform norms — but **n=1 each, pre-library.** Not actionable. It does set the bar: a library carousel on TikTok next week should clear ~500 imp / ~2% ER to be "not worse than baseline."

### X — 7 seed posts, 06-12 → 06-14
| Impressions | Interactions |
|---|---|
| 4 – 16 (median ~6) | **0 across the board** |
- **Read:** near-zero distribution, zero engagement. Expected for a new account with ~0 followers. X is **starting from cold** — growth, not engagement-rate, is the W26 metric to watch here.

### Threads — 4 seed posts, 06-12 → 06-14
| Impressions | Interactions |
|---|---|
| 14 – 18 (median ~16) | **0 across the board** |
- **Read:** ~2–3× X's impression baseline off the same cold start (Threads' new-account distribution is friendlier), still no engagement. Also cold.

### By format card / hook / subject / Topic Type / time
**Not scorable this week** — zero format-card posts have analytics. The join key (`calendar/2026-W25.md` deal × Metricool performance) becomes live in W26 once today's batch matures. The W25 calendar's per-post format/hook log is in place and ready to join.

### Trend vs last week
None — first review. W25 is the baseline.

---

## 3. Timing

Best-time (TikTok) peaks: weekdays **10:00, 12:00, 16:00, 18:00** Phoenix; **Wed/Thu strongest**; weekends ~30% lower. This **matches the slots W25 already used** — no change warranted, and the curve is still Metricool's generic model rather than Jake-specific, so it shouldn't be over-trusted yet. **No timing edit applied.**

---

## 4. Changes auto-applied this week

**None to the format library** — and that is the correct, disciplined outcome for a zero-data baseline:
- **Tier moves:** 0 (no card has any signal; small-N rule blocks it).
- **Emphasis notes:** 0 (no winning/losing hook/subject/Type to annotate yet).
- **Timing:** 0 (best-times confirm existing slots).

The only repo write this run is **this review file.** Nothing was un-drafted; nothing published.

---

## 5. Healed + flagged

### QA-gate gap — typos slipped past the gate (the one real systemic finding)
The QA gate (angle → format → voice → stop-slop) has **no literal spelling/typo check**, and three errors reached scheduled/published posts:

| Post (uuid) | Network | Status | Error |
|---|---|---|---|
| `4745272640788580379` | LinkedIn | **PUBLISHED** | "The **wo ends** got expensive" → *two ends* |
| `-9060957589577250897` | Threads | scheduled (draft:false) | "the headline doesn't **adress**" → *address* |
| `1168472037449616854` | Instagram | scheduled (draft:false) | "is your **valuable** enough to pay attention to" → missing word (*…is your hook valuable enough…*) |

- **Action taken:** **flagged, not auto-edited.** The LinkedIn one is already live (unfixable without a delete tool, which Metricool doesn't expose). The two scheduled ones are a **one-line `updateScheduledPost` fix matched on uuid** — but I'm unattended and edits touch live in-flight content, so per the "flag for rewrite" guidance I'm leaving them for Jake (or the next reactive run) rather than silently rewriting auto-publishing posts. Say the word and I'll patch the two pending ones on uuid.
- **Systemic fix (recommended, §6):** add an explicit **typo/spell pass** to the QA gate. This is the kind of mechanical miss the gate exists to catch.

### Everything else
- No drafts failed to post; no dead media URLs (W25 PNGs hosted on the `assets/regen-w25` branch resolved into Metricool's CDN — `static.metricool.com/planner/...` URLs present on the LinkedIn doc and IG carousels). No silent channel, no routine that failed to run.

---

## 6. Recommendations for Jake (NOT auto-applied — your call)

1. **Add a typo/spell pass to the QA gate** (`content/README.md` + the `weekly-evergreen`/`daily-reactive` skills). Cheap, mechanical, and it would have caught all three errors above. *Closest thing to an obvious win this week.*
2. **TikTok is where the audience actually is** (110K vs ~0 everywhere else). W25 leaned on carousels + reels-Jake-must-film and under-invested the one channel with reach. Consider weighting the batch — and your filming time — toward TikTok talking-heads until the other channels build a base. *(Cadence/strategy — flagged, not changed.)*
3. **Wire GA4 / GSC into this review.** Branded-search trend and waitlist signups are the real north-star reads (the book funnel); right now the review is social-only. *(Infra — flagged.)*
4. **Reset expectations for X/Threads:** the metric for the next few weeks on these is **follower/impression growth off a cold start**, not engagement rate. Don't let a 0% ER read as "the format failed" — there's simply no audience yet.

---

## 7. Experiments queued for Monday's W26 batch

1. **Get the first real format-card read.** W26 is the first week the scoreboard can actually score — make sure every published post carries its format-card + hook log so W26's review can join performance to structure. *(This is the whole point of the loop starting to turn.)*
2. **Deal the Teardown (X, Tier C) at least once.** It's the one X card never yet tried and the dealing rules already require ≥1 experimental per platform/week — run it through the daily-reactive pass with the "diagnose the choice, not the human" guardrail, and we get our first read on whether non-follower reach travels for this brand.
3. **One TikTok video vs one TikTok carousel on the same subject**, if filming allows — the cleanest A/B given video out-reached image 3× in the (tiny) baseline. Confirm or kill that pattern with real n.

---

*All edits this run are git-revertible (only this file was written). Voice + CONTENT_GUIDE untouched (locked). The loop starts compounding in W26.*
