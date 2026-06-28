# Weekly Review — 2026-W26 (the throughput week)

**Run:** late Sunday **2026-06-28** (autonomous `weekly-review`). **Brand:** Jake the Wizard (Metricool blogId 6387301, America/Phoenix). **Reviewer:** scheduled task, no human present. **Week scored:** Mon 06-22 → Sun 06-28.

> **The headline isn't a format read — it's a throughput failure.** The W26 batch dealt 28 posts (+ a daily-reactive pass each weekday). **~8 actually published**, all in Monday's single drop, plus one back-catalog TikTok on Saturday. Everything dated **Tue 06-23 → Sat 06-27 is still `draft:true` / `PENDING` with a now-past publish date** — approved on Monday, then the queue went dark. The W25 review flagged the approval gate as a *throttle* (§6.4); a week later it's a near-shutoff. So this review scores the handful that ran, but the load-bearing finding is §5.
>
> **Discipline still governs.** This is the program's 2nd scored week and N *shrank* (8 posts vs ~19 in W25). The small-N rule (*a card needs ≥3 uses AND ≥2 weeks, or a clean ≥2× pattern, before a tier move*) means **emphasis annotations, not tier moves** — again. Tier index untouched on every platform. Voice + CONTENT_GUIDE untouched (locked). Every edit this run is an emphasis note + this file — all git-revertible.

---

## 1. The data pulled

- `getBrandSettings` → brand confirmed (7 networks; IG `itsjakethewizard`, X `JakeTtheWizard`, TikTok `itsjakethewizard`, Threads `thewizardmarketing`).
- `getAnalyticsDataByMetrics` `BSPO01–09` (06-21 → 06-28) → per-post impressions / interactions / type across all networks. **10 rows total** (8 W26 + 2 from Sun 06-21). This is both the scoring join key **and** the throughput evidence — the published universe is genuinely this small.
- `getScheduledPosts` (06-22→06-25 windows) → confirmed the gap: the Monday drop is `draft:false` / `PUBLISHED`; everything Tue-onward is `draft:true` / `PENDING` with past dates (expired, unapproved). This is §5.
- `getBestTimeToPostByNetwork` (TikTok) → §3.
- **Competitor scoreboard** (`IGCO`/`TTCO`) → returned **empty** this window (throttled or still backfilling). Per W25 it's non-actionable at Jake's ~0 base anyway; logged as a skipped pull, not a finding.
- **GA4 / GSC → still not wired** into this routine. Branded-search + waitlist signups remain unmeasured. Carried forward (§6).
- Read `content/calendar/2026-W26.md` (the deal — and this week it **did log the named format card per post**, the W25 "load-bearing fix" landed) + the W25 review (built on, not re-derived).

---

## 2. Score — performance ↔ what was dealt (normalized within network)

**The published set (all of it):**

| Date (Phx) | Network | Post | Card dealt | Type | Imp | Int | ER |
|---|---|---|---|---|---|---|---|
| 06-27 22:43 | TikTok | "#onthisday ahead of the bell curve" (back-catalog) | back-catalog video | VIDEO | **642** | 23 | **3.58%** |
| 06-22 10:00 | TikTok | "you don't have a traffic problem" (CRO) | Teardown / photo-carousel | IMAGE | 423 | 3 | **0.71%** |
| 06-22 14:00 | Instagram | "your features get copied" (personal brand) | back-catalog reel | REEL | 227 | 4 | 1.76% |
| 06-22 09:39 | LinkedIn | rent-the-trick (AI-search split) | Process Carousel · A | DOC | 52 | 2 | 3.85% |
| 06-22 11:30 | Threads | "your hook earns three seconds" (value prop) | Diagnosis Fragment · A | POST | 26 | 0 | 0% |
| 06-22 15:00 | X | "Shopify made agent checkout the default" (reactive) | daily-reactive newsjack | POST | **25** | 1 | 4.0% |
| 06-22 16:30 | X | "name your method" (name your mechanism) | Contrarian One-Liner · A | POST | 9 | 0 | 0% |
| 06-22 13:00 | X | "17x roas" (DSP) | The Receipt · A | POST | 6 | 0 | 0% |

(Plus Sun 06-21 reactive Father's-Day posts: X 15 imp / 0; Threads no data — W25 tail, not scored here.)

### Per-network reads (all n=1–2 — directional only)
- **TikTok (n=2):** back-catalog **video 3.58%** vs new **photo-carousel 0.71%** — a ~5× ER gap, and the **2nd straight week static photo-carousels trail video on TikTok**. Confounded (proven back-catalog video vs a brand-new static card), so still no tier move, but the direction is now 2 weeks deep.
- **Instagram (n=1):** the personal-brand back-catalog reel pulled 227 imp / 1.76% — solid reach, modest ER. Reels remain the IG unit; n=1, no card-level read.
- **LinkedIn (n=1):** the rent-trick doc carousel held a healthy 3.85% ER (= W25's LinkedIn median ER) on 52 imp (below W25's 83-imp median). The pillar pairing still earns its slot; n=1.
- **X (n=3 originals):** still cold. The standout was the **reactive newsjack** (agent-checkout, 25 imp / 4%) — it out-reached both evergreen singles (Receipt 6 imp, Contrarian One-Liner 9 imp). **Off a cold base, a timely newsjack travels further than an evergreen one-liner.** Growth metric, not ER.
- **Threads (n=1):** the value-prop Diagnosis Fragment ended on a question and pulled **26 imp (~3× the W25 ~8 median)** — the question-ender keeps over-indexing on *reach* — but **0 replies**, so the reach-vs-conversation gap is real.

### Top 3 / bottom 3 (the why)
**Top:** (1) TikTok back-catalog **video** — reach leader of the week + best ER; the back-catalog remains the highest-ROI unit. (2) Threads value-prop question — ~3× median reach off the question-ender. (3) X reactive newsjack — best X reach, timeliness beat the evergreen singles.
**Bottom:** (1) X "17x roas" Receipt (6 imp / 0) — cold base + a bare stat with no tension hook. (2) X "name your method" one-liner (9 imp / 0). (3) TikTok CRO **photo-carousel** (0.71% ER) — static trailed video again. (X's lows are the ~0-follower base, not the cards.)

### Trend vs W25
- **Throughput: ~19 → ~8 published. More than halved**, despite a bigger and better-dealt batch. This is the week's defining regression (§5).
- **Video > static on TikTok: confirmed a 2nd week.**
- **X / Threads still cold** off a ~0 base — unchanged and expected (judge on growth, not ER).
- **Process win:** the calendar finally logged the named format card per row (the W25 experiment #3). Card-level attribution is now *possible*; the throughput collapse just denied it the volume to use this week.

---

## 3. Timing
TikTok best-times unchanged in shape: weekday peaks **10:00 / 12:00 / 16:00 / 18:00 Phoenix, Wed–Thu strongest, weekends ~30% lower**. Still largely Metricool's generic model; the slots in use already sit on the peaks. **No timing edit applied.**

---

## 4. Changes auto-applied this week (all emphasis notes — git-revertible)
A dated **W26 bullet** was added to the "Scoreboard notes" block in three platform decks, each tagged with its evidence:
- `content/formats/tiktok.md` — video > static holds a 2nd week (3.58% vs 0.71%); photo-carousels are the secondary unit, not the lead; hold the ≥1-video/week floor.
- `content/formats/x.md` — reactive newsjacks out-travel evergreen one-liners off a cold base; lean daily-reactive on X; Teardown still un-dealt (carry-forward).
- `content/formats/threads.md` — question-ender keeps over-indexing on reach (~3×) but drew 0 replies; make the ask lower-effort / more answerable.

**Tier moves: 0.** No card cleared the small-N gate (N *shrank* to 8 posts; every card has n=1 this week; the only ≥2× pattern — video>static — is type-level and confounded). **Emphasis notes: 3.** **Timing: 0.** Tier indexes and voice/brand untouched. IG/LinkedIn got no note (n=1, nothing above noise).

---

## 5. Healed + flagged — **the throughput collapse**

**The approval gate is now the binding constraint on the whole program.** Mechanically, nothing broke: the posts that were approved published cleanly (no dead media, no failed auto-publish, the Saturday back-catalog TikTok auto-posted fine). The failure is upstream of the machine — **drafts stopped getting approved after Monday.**

| Day | Dealt / reactive | Published | Status of the rest |
|---|---|---|---|
| Mon 06-22 | the re-dealt drop | **~8 (all of Monday)** | published |
| Tue 06-23 | ~7 evergreen + 2 reactive | **0** | `draft:true` / `PENDING`, date passed |
| Wed 06-24 | ~6 evergreen + 1 reactive | **0** | expired unapproved |
| Thu 06-25 | ~7 evergreen + 1 reactive | **0** | expired unapproved |
| Fri–Sat 06-26/27 | evergreen + back-catalog | **1** (Sat back-catalog TikTok) | rest expired |

So roughly **20 dealt posts + 5 daily-reactive drafts expired without ever publishing.** The daily-reactive layer is the quiet casualty: it ran every weekday and produced timely posts (the agent-checkout newsjack that became the week's best X post *was* a reactive — proof the layer works), but its Tue–Fri output sat unapproved and went stale-dated.

**Why the review can't fix it:** the hard rule is *nothing un-drafts, nothing publishes*. Approving these is Jake's call by design. So this is **flagged, not healed.** (The expired drafts are also now mostly past-dated; re-dealing them is a `weekly-evergreen` job, not this routine's.)

**Other flags (not blocking):**
- **Retired-CTA drafts still lingering.** Several 06-11 back-catalog reels still carry the **retired "Get the truth. Link in bio"** CTA (the Social-SEO YouTube short, the SoBV LinkedIn doc, the clarity reel) — flagged in the W26 batch (calendar §19) and still unfixed because they're sitting as never-approved drafts. They'll ship with the dead CTA *if* approved. Pre-publish fix needed, not a post-hoc patch.
- **Spell/typo pass still not in the gate.** W25's three live typos proved the gap; this week's *published* posts read clean, but the gate change recommended in W25 §6.1 hasn't landed. Still a recommendation (§6).
- **Everything else clean.** No dead media URLs, no silent channel among what published, no routine failed to run.

---

## 6. Recommendations for Jake (NOT auto-applied — your call)

1. **The approval gate is now throttling the program to ~30% of output — this is the #1 lever.** Two structural fixes, pick one: **(a)** approve on a daily cadence (5 min/day clears the queue), or **(b)** have the engine stage *less* — closer to what you'll realistically approve — and lean harder on **auto-publishing** the proven slots (back-catalog reels, the daily-reactive newsjacks) so the program doesn't go dark mid-week when life gets busy. Option (b) + standing auto-publish on a few trusted slots is the resilient choice; a week of one Monday drop is worse than a smaller batch that actually ships all week. *(Workflow/cadence — your call.)*
2. **Auto-publish the daily-reactive newsjacks (or a trusted subset).** The reactive layer produced the week's best X post and then 4 days of it expired unapproved. Timely content that waits for approval isn't timely. Consider letting daily-reactive auto-publish to X/Threads (the lowest-risk, cold-base channels) so the layer actually does its job. *(Workflow.)*
3. **Add a literal typo/spell pass + the book-branding-restraint check to the QA gate, pre-publish.** Carried from W25 with receipts. Cheapest standing win.
4. **Drop or rewrite the lingering "Get the truth" back-catalog drafts** before they ever auto-publish (3 reels still carry the retired CTA).
5. **Mine the back-catalog harder — it's still the highest-ROI unit.** The week's reach leader (TikTok) and best IG post were both back-catalog. Make ≥1 back-catalog video/reel a standing **auto-publishing** slot on TikTok *and* IG (ties to rec #1b). *(Cadence/strategy.)*
6. **Wire GA4 / GSC into this review.** Carried from baseline — the social-only view can't see the funnel.

---

## 7. Experiments queued for Monday's W27 batch

1. **Right-size the batch to the approval reality.** Deal a *smaller* core (the slots Jake reliably approves Monday) + a few standing **auto-publish** slots (back-catalog reel ×2, daily-reactive on X/Threads). Goal: the program ships all week even with zero mid-week approvals. *(Directly tests rec #1.)*
2. **Stand up ≥1 back-catalog video on TikTok AND IG as auto-publish.** Confirm the video>static pattern with fresh n *and* prove the program can run unattended.
3. **Deal the Teardown (X, Tier C) once.** Never tried in 3 weeks; dealing rules already require ≥1 experimental/platform/week. Run it through daily-reactive with the "diagnose the choice, not the human" guardrail.
4. **Threads: tighten the ask.** The question-ender pulls reach but no replies — deal a **binary / one-word** ask (Either/Or, Rate-It) and see if conversation follows the reach.

---

*All edits this run are git-revertible (this file + three emphasis notes). 0 tier moves, 0 voice/brand changes — both locked. W25 is preserved in git history. The loop is turning, but it's now gated by approvals, not by the deck: the system tuned what it could, and the real unlock this week is a workflow decision only Jake can make (§6.1).*
