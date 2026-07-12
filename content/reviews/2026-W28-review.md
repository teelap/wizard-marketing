# Weekly Review — 2026-W28 (zero-publish, week two — and Jake became the delivery engine)

**Run:** late Sunday **2026-07-12** (autonomous `weekly-review`). **Brand:** Jake the Wizard (Metricool blogId 6387301, America/Phoenix). **Reviewer:** scheduled task, no human present. **Week scored:** Mon 07-06 → Sun 07-12.

> **The headline, week four: the approval gate held at zero a second straight week — and the useful signal is that Jake is now, in practice, the entire delivery engine.** The W28 batch dealt a sharp **23-post evergreen deck + a daily-reactive pass** ([W28 calendar](../calendar/2026-W28.md)). **The engine published none of it** — every LinkedIn doc, the impact-chain TikTok carousel, all X singles, the replace-category thread, every Threads ask, and all ~7 daily-reactive drafts read `draft:true` / `PENDING` with now-past dates. Publish-through: **~19 → ~8 → ~0 → ~0.** The binding constraint is fully confirmed structural.
>
> **But two of Jake's own concept videos carried the week and both beat the program's ER bar.** A "revenue with these simple changes" reel (**863 imp / 3.59%** on TikTok, 684 / 1.90% on IG) and a "refine your personal taste" reel (**802 imp / 4.11% — the best video ER the program has recorded**, 440 / 1.82% on IG). Crucially, **these are the deck's own concepts** — surgical-tweak/CRO and taste-and-clarity — that Jake filmed himself instead of approving as text. So this review scores what ran (Jake's video), banks the refined signal (**the winning unit is concept-education reels in Jake's voice, and Jake is already delivering them**), makes **zero tier moves** (2nd straight zero-publish → no card-level attribution possible), applies **emphasis + a monthly research refresh**, and **confirms the retired-CTA YouTube Short is finally healed** (a three-review item, closed). Voice / CONTENT_GUIDE untouched (locked). Every repo edit this run is git-revertible.

---

## 1. The data pulled

- `getBrandSettings` → brand confirmed (7 networks; IG `itsjakethewizard`, X `JakeTtheWizard`, TikTok `itsjakethewizard`, Threads `thewizardmarketing`, FB, LinkedIn, YouTube).
- `getAnalyticsDataByMetrics` `BSPO01–09` (07-06 → 07-12) → per-post impressions / interactions / type across all networks. **16 rows — all Jake's own organic posts + stories** (see §2). **None is a dealt-batch post.**
- `getScheduledPosts` (07-06→07-07 and 07-08→07-09 windows) → **confirmed the gap.** Every dealt evergreen draft, every daily-reactive draft, and the YT short read `draft:true` / `PENDING`. Spot-checked uuids: why-this LinkedIn doc (`-2312891201201223242`), impact-chain TikTok carousel (`-1808068743377105594`), devaluation LinkedIn (`1315902213186994605`), replace-category X thread (`-7021255346182141799`), exit-proof LinkedIn (`-230002760785772178`), and reactives (SoBV `2883583437431914781`, GSC-tracks-social `-4176608757066478315`, seo-click-died `5450983120859319680`) — **all PENDING, all expired unapproved.** This is §5.
- `getBestTimeToPostByNetwork` (TikTok) → §3.
- **Competitor scoreboard** (`IGCO`/`TTCO`/`YTCO`) → **skipped** this run (returned empty W25–W27, non-actionable at Jake's base; heavy calls throttle the brand). Logged, not a finding.
- **GA4 / GSC → still not wired** into this routine. Branded-search + waitlist signups remain unmeasured (§6, carried from baseline).
- Read `content/calendar/2026-W28.md` (the 23-post deal, card+hook logged per row) + the W27 review (built on, not re-derived).
- **Monthly research refresh** (this is the ~4th run): 2 sourced platform searches (TikTok, IG). Findings in §5A.

---

## 2. Score — performance ↔ what was dealt (normalized within network)

**The join failed by design, week two:** with **0 dealt posts published**, there is no card/hook/subject/Topic-Type attribution possible. The scored set below is **Jake's own off-deck organic content** — the one real performance signal of the week.

**The published set (Jake's organic; stories excluded from ER):**

| Date (Phx) | Network | Post | Type | Imp | Int | ER |
|---|---|---|---|---|---|---|
| 07-09 16:32 | TikTok | **"refine your personal taste"** ("educate yourself on impacting people, and you will never be without work") | VIDEO | **802** | 33 | **4.11%** |
| 07-10 08:28 | TikTok | **"improve your revenue with these simple changes"** | VIDEO | **863** | 31 | **3.59%** |
| 07-08 06:43 | TikTok | (image post, no caption) | IMAGE | 747 | 11 | 1.47% |
| 07-10 08:29 | Instagram | **"more revenue with these simple changes"** | REEL | **684** | 13 | **1.90%** |
| 07-09 16:41 | Instagram | "taste on their behalf" tip | REEL | 440 | 8 | 1.82% |
| 07-09 16:41 | Facebook | "taste" reel | REEL | 243 | 2 | 0.82% |
| 07-10 08:29 | Facebook | "revenue" reel | REEL | 203 | 0 | 0% |
| 07-08 06:15 | Twitter | "You are not your business" (organic musing) | POST | 24 | 0 | 0% |

(Plus IG stories 10–28 imp, FB stories no-data — reach-only, not scored.)

### Per-network reads (all off-deck, n=1–3 — directional only)
- **TikTok (n=3):** two concept VIDEOs led — the **taste tip at 802 imp / 4.11% ER (the program's best video ER to date)** and the **revenue tip at 863 imp / 3.59% (top reach of the week)**. A silent IMAGE post pulled 747 / 1.47% — decent reach, ~2.4× lower ER than the videos, consistent with four weeks of video > static here. Video-led, fourth straight week.
- **Instagram (n=2 reels):** the revenue reel led IG at **684 / 1.90%**, the taste reel 440 / 1.82% — same cuts as TikTok, cross-posted. Reels remain the IG reach unit; ER ran lower than TikTok on identical creative (IG audience colder/less warmed than the TikTok following).
- **Facebook (n=2 reels):** 243 / 203 imp but **2 / 0 interactions** — reach without warmth, same as every prior week. FB is a free cross-post, not a conversation channel; judge on reach only.
- **X / LinkedIn / Threads:** the only X post was Jake's own "You are not your business" musing (24 imp, 0 int). **The entire dealt allocation on X, LinkedIn, and Threads expired as drafts** — no data to score, third+ week running on the text channels.
- **YouTube:** nothing published (the healed short is queued but still `draft`, see §5).

### Top 3 / bottom 3 (the why)
**Top:** (1) **TikTok taste tip — 802 imp / 4.11%, program-best video ER.** A concept-education talking-head in Jake's voice, concrete and useful. (2) TikTok revenue tip — 863 / 3.59%, top reach, same register. (3) IG revenue reel — 684 / 1.90%, the concept travels on IG too.
**Bottom:** (1) X "You are not your business" (24 imp) — a personal aphorism with no keyword/hook, on Jake's coldest channel. (2) FB reels (0–2 int on 200+ imp) — reach without warmth. (3) *Everything the engine dealt* (0 imp — never published). The real bottom is still the queue, not a card.

### Trend vs W27
- **Deck publish-through: ~0 → ~0. Second straight zero.** The constraint is not batch size (already right-sized) and not deck quality (the W28 deck was sharp — 23 unique subjects, all 8 Topic Types) — it is the **approval action itself.**
- **Video/Reels = the entire performing set, 4th straight week.** W27 had one hero (the 1,206-imp Claude tip); **W28 had two strong concept reels (>800 TikTok each) — lower peak, higher consistency, and the best video ER on record (4.11%).**
- **New, sharper read: Jake is hand-delivering the deck's concepts as video.** The two winners are literally surgical-tweak/CRO ("revenue with simple changes") and taste-and-clarity ("refine your taste") — deck subjects, filmed by Jake rather than approved as drafts. The format thesis *and* the "make Jake's weekly video the anchor" recommendation are now proven by Jake's own behavior, not just by the numbers.

---

## 3. Timing
TikTok best-times unchanged in shape: weekday peaks **10:00 (~1,432–1,471 Wed/Thu) / 12:00 / 18:00 Phoenix**, strong 16:00–17:00, **weekends ~30–40% lower**. Still largely Metricool's generic model. Jake's winning reels posted **08:28** (Fri, just under the 10:00 ramp) and **16:32** (Thu, on the afternoon shoulder) — both off the literal peak and both won, so content register overrode slot again. **No timing edit** (engine slots already sit on the peaks).

---

## 4. Changes auto-applied this week (emphasis + refresh only — git-revertible)
- `content/formats/tiktok.md` — two dated bullets: **W28** (video 4th week; the winning unit refined to *concept-education reels in Jake's voice*; deck's job is to feed Jake's filming) + **Monthly refresh 2026-07** (follower-first distribution explains why Jake's warm-audience reels travel and cold text drafts wouldn't; 60–180s video now out-distributes 15s → widen shoot-clip length ceiling to 45–90s; 70% completion floor holds).
- `content/formats/instagram.md` — two dated bullets: **W28** (Reels 4th week; concept-tip reels the driver) + **Monthly refresh 2026-07** (65% Reel watch-time floor now a hard distribution gate; new Feb-2026 carousel secondary-distribution pass rewards front-loaded swipe-through → validates Swipe-to-Fix/Send-This; carousels now up to 20 slides).

**Tier moves: 0.** No dealt card published (2nd straight zero) → nothing cleared, or even entered, the small-N gate. The only ≥2× pattern (concept-video reach/ER) is off-deck and type-level, not card-level → emphasis, not a tier flip. **Emphasis notes: 2** (TikTok, IG). **Monthly refresh: 2** (TikTok, IG — the platforms where 100% of real distribution lives; deeper `platforms/*.md` files can absorb these next fuller refresh). **Timing: 0.** X / LinkedIn / Threads got no note (0 posts). Tier indexes, voice, brand, offers, stat bank all untouched (locked).

---

## 5. Healed + flagged

### ✅ HEALED — confirmed resolved this review (closes a three-review item)
- **The retired-CTA YouTube Short** (`6971491987212095214`, "Your weakness could be your best pitch," embrace-the-limitation / Avis) — flagged **three reviews running** (W26 §5, W27 §5). The W28 batch's heal is **confirmed live in the queue**: text now ends **"The full breakdown is on the blog."** (off-book close, retired CTA gone) and it's rescheduled to **07-08 15:00** (was past-dated 06-29). Still `draft:true` — Jake approves — but **the standing landmine is defused.** No longer a flag.

### ⚠ Flagged (mechanical machine is clean; the failure is upstream)
| Channel | Dealt / reactive this week | Published | Status |
|---|---|---|---|
| LinkedIn | 5 docs/text | **0** | all `PENDING`, dates passed |
| X | 8 singles + a 6-tweet thread + reactives | **0** | expired unapproved |
| Threads | 6 (incl. Rate-It, Fill-in-Blank, Either/Or) | **0** | expired unapproved |
| IG | 1 carousel | **0** | expired unapproved |
| TikTok | 1 carousel + shoot-video scripts | **0** | expired unapproved |
| YouTube | 1 (healed short) | **0** | queued clean, `draft` |
| **Jake's own organic** | (unscheduled, manual) | **~5 + stories** | published, and carried the week |

- **The daily-reactive layer is wasted a third+ week.** It produced timely, on-brand newsjacks again — GSC-now-tracks-social, google-lets-AI-write-ads, OpenAI-ads-in-answers, the agent-economy take, seo-click-died — the exact posts that *should* travel, all expired unapproved. Timely content that waits for approval isn't timely.
- **Spell/typo pass still not in the QA gate** (carried from W25–W27; the published set was Jake's own and read clean, but the gate gap is unclosed).
- **Mechanically clean otherwise.** No dead media (draft media on `static.metricool.com`, all valid), no failed auto-publish, no routine failed to run. The batch ran and dealt correctly; the deck was well-formed. It never left the drafts folder.

### 5A. Monthly research refresh (2026-07) — platform mechanics that moved
- **TikTok:** (1) **Follower-first distribution** is the material change — a video test-shows to a slice of your *followers* before going wider. This mechanically explains the four-week pattern: Jake's reels start on a warm base and climb; the engine's cold text drafts on X/LI/Threads have ~no warm base and wouldn't ladder even if approved. (2) **60–180s video now out-distributes 15s clips** (watch-time-per-impression > raw completion). 70% completion floor holds. → shoot-clip length ceiling widened to 45–90s in the library.
- **Instagram:** (1) top signals hold (watch time, sends-per-reach, likes-per-reach). (2) **~65% Reel watch-time floor** is now a hard distribution gate — the 3-second hook is mandatory, not stylistic. (3) **New Feb-2026 carousel secondary-distribution pass** — high swipe-through carousels get a second non-follower push 48–72h later; directly rewards the Swipe-to-Fix / Send-This front-loaded design. Carousels now up to 20 slides.

---

## 6. Recommendations for Jake (NOT auto-applied — your call)

1. **The approval gate is the whole program, now at zero two weeks straight. This is still the only lever that matters — but the refresh sharpens *where* to open it.** TikTok's follower-first distribution means the **video/Reel layer** is the one with a warm base that can actually travel; the text channels (X/LinkedIn/Threads) have ~0 warm audience and won't ladder even if approved. So the lowest-risk, highest-return auto-publish subset is **≥1 concept Reel/week to IG + TikTok** (proven, warm base, the whole program's reach) — plus the **daily-reactive newsjacks to X/Threads** (timely, low blast radius). Everything else can stay approval-gated. *(Workflow — your call, but this is #1.)*
2. **Formalize the anchor around your own filming — you're already the delivery engine.** Two of your own concept videos (revenue tips, personal taste) were the entire performing program this week, both beating the ER bar, and they're literally the deck's concepts. Make **1–2 film-in-one-take concept-reel scripts/week the primary Monday deliverable** (the text deck becomes secondary / auto-publish / drop). The engine's best job is handing you tight scripts in the register that's already working, not filling a drafts folder. *(Strategy/cadence.)*
3. **Add a literal typo/spell pass + the book-branding-restraint check to the QA gate, pre-publish.** Carried from W25–W27. Cheapest standing win.
4. **Decide YouTube's status.** Four weeks near ~0. The healed short is now queued clean; either commit to feeding the channel (your Shorts already cross-post there) or stop counting it as a live surface. *(Strategy — your call.)*
5. **Wire GA4 / GSC into this review.** Carried from baseline — the social-only view can't see branded search or waitlist signups (the book funnel, your north-star conversion).

---

## 7. Experiments queued for Monday's W29 batch

1. **Stop dealing a text-heavy deck the gate never approves; deal the anchor.** Make the Monday batch's #1 output **2 film-in-one-take concept-reel scripts** in the exact register that's winning (a concrete "here's the fix" tip like the revenue/taste reels), and lean the shoot specs **longer (45–90s)** per the TikTok longer-video drift. This is the one thing the batch can do that actually reaches an audience without waiting on approvals.
2. **Deal one carousel engineered for the IG secondary-distribution pass** — front-load swipe-through so viewers hit slide 3–4 fast (Swipe-to-Fix / Send-This design), to earn the new 48–72h non-follower push. Give the carousel layer one shot at the updated mechanic.
3. **Still-unpaid debts to carry:** the **Teardown** (X, Tier C) and the **low-effort Threads asks** (Rate-It, Fill-in-Blank, Either/Or) were dealt in W27 *and* W28 and never published — keep re-dealing until they finally get a real read, or drop them if the text channels stay ungated.

---

*All repo edits this run are git-revertible (this file + the W28/refresh bullets on tiktok.md and instagram.md). **0 tier moves, 0 voice/brand/offer/stat changes** — all locked. No Metricool writes (nothing published, nothing un-drafted, no draft edited). W25–W27 preserved in git history. Four weeks in, the verdict is unchanged and now sharper: the deck is sound, the format thesis (concept video in Jake's voice wins) is proven with the program's best ER, and Jake is already the delivery engine — the engine ships nothing on the text channels until the approval step (§6.1) is fixed, and the highest-leverage pivot (§6.2) is to build the batch around Jake's weekly filming instead of a drafts folder. The retired-CTA landmine is finally closed.*
