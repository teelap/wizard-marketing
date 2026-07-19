# Weekly Review — 2026-W29 (the video engine went dark — a true-zero week)

**Run:** late Sunday **2026-07-19** (autonomous `weekly-review`). **Brand:** Jake the Wizard (Metricool blogId 6387301, America/Phoenix). **Reviewer:** scheduled task, no human present. **Week scored:** Mon 07-13 → Sun 07-19.

> **The headline, week five: for the first time the program reached essentially no one — the dealt deck stayed at zero (5th straight), AND Jake's own video engine, which carried W28, went dark.** The W29 batch dealt a sharp 22-post evergreen deck + two shoot-anchor scripts + a full daily-reactive pass ([W29 calendar](../calendar/2026-W29.md)). **The engine published none of it** — every LinkedIn doc, both carousels, all X singles, the eight-amplifiers thread, every Threads ask, all ~9 daily-reactive newsjacks read `draft:true` / `PENDING` with now-past dates. Publish-through on the dealt deck: **~19 → ~8 → ~0 → ~0 → ~0.**
>
> **The new, worse signal: Jake filmed nothing this week.** W28's silver lining was that Jake was the delivery engine — two self-filmed concept reels beat the ER bar (the "revenue tips" reel 863 imp / 3.59%, the "refine your taste" reel 802 imp / **4.11%, the program's best video ER**). This week there were **zero concept reels, zero on-brand posts of any kind.** The **entire** published set across all seven networks for the whole week was **one off-topic personal reply-tweet to @PalmerLuckey about AR glasses (15 imp, 0 int, 07-14 03:01).** That is the whole scored set. n=1, and off-brand.
>
> So this review scores a week with no on-program reach, makes **zero tier moves** (5th straight zero-publish → no card-level attribution possible), makes **zero format-file edits** (there is no published signal to fit — respecting the small-N / don't-fit-noise rule), heals nothing (the machine is mechanically clean; the failure is entirely upstream at the approval step + Jake's filming cadence), and **ratchets the standing recommendation**: the one lever that has ever produced reach — Jake filming a concept reel — did not get pulled this week, so the report leans on making that the frictionless default. Voice / CONTENT_GUIDE untouched (locked). The only repo edit this run is this file. This is **not** a monthly-refresh run (last was W28, 2026-07; next ~W32).

---

## 1. The data pulled

- `getBrandSettings` → brand confirmed (7 networks; IG `itsjakethewizard`, X `JakeTtheWizard`, TikTok `itsjakethewizard`, Threads `thewizardmarketing`, FB, LinkedIn, YouTube).
- `getAnalyticsDataByMetrics` `BSPO01–09` (07-13 → 07-19, all networks) → **one row.** A single Twitter POST, 07-14 03:01:53, an off-topic personal musing to @PalmerLuckey about building "the AR OS of the future" — **15 imp, 0 int.** No reels, no TikToks, no LinkedIn, no on-brand content of any kind. (W28 returned 16 rows; W29 returned 1. The BSPO connector captured video fine in W28, so the absence is real, not a data gap.)
- `getScheduledPosts` (three windows: 07-13→14, 07-15→16, 07-17→19) → **confirmed the gap end to end.** Every dealt evergreen draft (22 posts + the 6-tweet amplifiers thread), every daily-reactive draft (~9), read `draft:true` / `PENDING`, dates passed. Spot-checked uuids across the week: most-mentioned LinkedIn doc (`-3822840838536934054`), core-attraction TikTok carousel (`-6891128968882796407`), show-up IG carousel (`5791275130619120803`), eight-amplifiers X thread (`7542183429133123919`), the-domino-effect LinkedIn (`4019055064173529453`), name-your-mechanism Threads (`-1800404272043898350`), and reactives (AI-replaces-team `-3020510651510536298`, Google-Marketing-Live `6138450221252954870`, click-tax `7218236708840686692`, chatgpt-8% `2336007681619806335`, Search-Console-social `-3686544605579621669`, mueller-markdown `-7506960712672853065`, AI-Overviews-opt-out `-6210383323961538343`, chatgpt-ads `1653443005142876825`) — **all PENDING, all expired unapproved.** This is §5.
- `getBestTimeToPostByNetwork` (TikTok) → §3.
- **Competitor scoreboard** (`IGCO`/`TTCO`/`YTCO`) → **skipped** again (returned empty W25–W27, non-actionable at Jake's base, heavy calls throttle the brand; not a monthly run). Logged, not a finding.
- **GA4 / GSC → still not wired** into this routine. Branded-search + waitlist signups remain unmeasured (§6, carried from baseline).
- Read `content/calendar/2026-W29.md` (the 22-post deal + 2 shoot anchors, card+hook logged per row) + the W28 review (built on, not re-derived).

---

## 2. Score — performance ↔ what was dealt (normalized within network)

**The join failed by design, week five:** with **0 dealt posts published**, there is no card / hook / subject / Topic-Type attribution possible. Worse than the prior two zeroes: **there is no off-deck organic signal either.** The one published row is an off-topic personal tweet, not marketing content.

**The published set (all networks, whole week):**

| Date (Phx) | Network | Post | Type | Imp | Int | ER |
|---|---|---|---|---|---|---|
| 07-14 03:01 | Twitter | **"@PalmerLuckey saw the new AR frames…"** (off-topic personal musing about building an AR OS) | POST | 15 | 0 | 0% |

That is the entire scored set. No stories with data this week either.

### Per-network reads
- **Every network: silent on-program.** TikTok, Instagram, Facebook, LinkedIn, YouTube, Threads — **zero published posts.** X's only post was Jake's off-brand 3am AR-glasses reply. There is nothing to normalize against a median because there is nothing on any network to score.

### Top 3 / bottom 3 (the why)
Not rankable — n=1. The single data point (off-topic tweet, 15 imp / 0 int, posted 03:01 on Jake's coldest channel, no hook, no keyword, unrelated to the brand's category) is unsurprisingly the program's weakest reach on record, and it is not a program post. **The real "bottom" is the whole week:** the dealt deck (never left drafts) and, newly, the video slot (never filmed).

### Trend vs W28 — the regression that matters
- **Deck publish-through: ~0 → ~0.** Fifth straight zero. Unchanged, still structural (the approval action), still the binding constraint.
- **Jake's own video engine: ~2 concept reels → 0.** This is the week's real finding. W27 had one hero (1,206-imp Claude tip); W28 had two >800-imp concept reels including the program's best-ever ER (4.11%); **W29 had none.** The one unit that has ever reliably reached this audience — a talking-head concept tip in Jake's voice on his warm follower base — did not get made. So the program's reach did not just stall at the gate; it fell to zero at the source.
- **Daily-reactive: still producing, still wasted.** The reactive routine ran all five weekdays and drafted genuinely timely newsjacks — Google Marketing Live's ad-buying agent, the click-tax/ROAS drop, ChatGPT running ads, Google's AI-Overviews opt-out, John Mueller calling markdown-for-bots a bad idea, Search Console now reporting social queries. Exactly the posts that should travel. All expired unapproved, 5th+ week. Timely content that waits for approval isn't timely.

---

## 3. Timing
TikTok best-times unchanged in shape from W25–W28: weekday peaks **10:00 (~1,432 Wed / 1,471 Thu) / 12:00 (~1,299–1,359) / 18:00 (~1,378–1,386)** Phoenix, strong 16:00–17:00, **weekends ~30–40% lower**. Still Metricool's generic model (no Jake-specific sharpening, because there is no published cadence to sharpen it). No post was published to test a slot. **No timing edit** (engine slots already sit on the peaks).

---

## 4. Changes auto-applied this week — **none**
- **Tier moves: 0.** No dealt card published (5th straight zero) → nothing entered, let alone cleared, the small-N gate (≥3 uses AND ≥2 weeks, or a clear ≥2× median pattern). Tier indexes untouched.
- **Format-file edits: 0.** For the first time this review makes no `content/formats/*` edits, and that is the correct call: there is **zero published signal** this week (one off-topic tweet). Adding "nothing happened" bullets to the format library would be fitting noise and cluttering the compounding record. The W28 read stands unchanged and is not re-derived: *the winning unit is a concept-education reel in Jake's voice; the deck's job is to feed Jake's filming.* Nothing this week refines or contradicts it.
- **Emphasis / timing / self-healing: 0.** No hook/subject/Topic-Type signal to annotate. No timing signal. Nothing mechanical broke (§5). Voice, brand, offers, stat bank all untouched (locked).

The only repo edit this run is this review file.

---

## 5. Healed + flagged

### ✅ Mechanically clean — nothing to heal
- **The batch dealt correctly.** 22 well-formed drafts, media on `static.metricool.com` (valid, not expired), the eight-amplifiers thread threaded correctly, carousels + PDF present.
- **The daily-reactive ran all five weekdays** (drafts created ~09:10 Mon–Fri) and produced on-brand, timely newsjacks.
- **No dead media, no failed auto-publish, no routine that failed to run, no QA miss in the published set** (the published set was one off-brand tweet Jake wrote by hand). There is no mechanical breakage to self-heal this week. The failure is entirely upstream — the approval step, and now the filming step — which is a §6 recommendation, not a mechanical fix the routine is allowed to make.

### ⚠ Flagged (the failure is upstream, and it deepened)
| Channel | Dealt / reactive this week | Published | Status |
|---|---|---|---|
| LinkedIn | 4 docs/text (most-mentioned doc, calculator, its-all-attention, build-for-forward, domino) | **0** | all `PENDING`, dates passed |
| X | 9 singles + a 6-tweet thread + ~7 reactives | **0** | expired unapproved |
| Threads | 6 asks (Callout, Either/Or, Fill-in-Blank, Rate-It, Hot-Take, Quiet-Confession) + reactives | **0** | expired unapproved |
| IG | 1 Send-This carousel | **0** | expired unapproved |
| TikTok | 1 carousel + 2 shoot-anchor scripts | **0** | carousel drafted; **scripts never filmed** |
| YouTube | 0 | **0** | silent (see W28 §6.4 — status still undecided) |
| **Jake's own organic** | (unscheduled, manual) | **1 off-topic tweet** | the only thing published — and off-brand |

- **The regression to flag is the video slot.** W28 proved Jake was the delivery engine; W29 he wasn't. The two shoot anchors (`share-of-brand-voice` Diagnosis Clip, `name-your-mechanism` FAQ Answer Clip) were written tight and ready and were **not filmed.** The single highest-ROI action in the whole program — the only one with a warm audience that travels — produced nothing this week.
- **Spell/typo pass still not in the QA gate** (carried from W25–W28; no published program content to catch it on, but the gate gap is unclosed).

---

## 6. Recommendations for Jake (NOT auto-applied — your call)

1. **The single point of failure is now visible in one number: 0 filmed reels = 0 program reach.** Four reviews said "fix the approval gate." W29 sharpens it to something even simpler and more in your control: **the weeks the program reaches an audience are the weeks you film a concept reel; the weeks you don't, it reaches ~no one.** W28 you filmed two and set the ER record. W29 you filmed zero and the program went dark. Everything else — the deck, the reactives, the carousels — is stuck behind an approval action that hasn't happened in five weeks. **The reel is the program.** *(This is now #1 by a wide margin.)*
2. **Make filming frictionless, not another approval.** The batch already hands you two 45–90s film-in-one-take scripts every Monday in the exact register that works. The gap isn't the script; it's the ~10 minutes to film + post. Options to remove the friction (your call): a fixed weekly filming slot (same as you'd protect a client call), reposting one proven back-catalog clip on weeks you can't film new (method in `content/drafts/backcatalog-reels.md`; ~1,144 clips at `G:\My Drive\TikTok\Old\`), or having someone else do the upload once you've filmed. **A reposted old winner beats a filmed-nothing week.**
3. **Auto-publish the lowest-risk subset so a dark week can't happen again.** Carried and reinforced from W28 §6.1: let the engine auto-publish **≥1 concept Reel/week to IG + TikTok** (proven, warm base) and the **daily-reactive newsjacks to X/Threads** (timely, low blast radius). Everything else stays approval-gated. This turns "Jake was busy" from a zero-reach week into a floor. *(Workflow — your call.)*
4. **Add a typo/spell + book-branding-restraint pass to the QA gate.** Carried from W25–W28. Cheapest standing win.
5. **Decide YouTube's status** (carried, W28 §6.4) and **wire GA4 / GSC into this review** (carried from baseline — branded search + waitlist signups, the book funnel, remain unmeasured).

---

## 7. Experiments queued for Monday's W30 batch

1. **Deal the same two shoot anchors again — they were never filmed, not rejected.** `share-of-brand-voice` (Diagnosis Clip) and `name-your-mechanism` (FAQ Answer Clip) are tight, evergreen, and in the winning register. Re-deal them as the #1 output, and **add a one-line "or repost this back-catalog clip instead" fallback** to each, so a no-time week still produces a reel. The point is to make a filmed-or-reposted reel the single non-negotiable weekly output.
2. **Keep the text deck lean and clearly secondary.** With five straight weeks of the text channels never publishing, the batch should spend its effort on the anchor + the one IG carousel (the units that can actually travel) and treat X/LinkedIn/Threads as auto-publish-if-Jake-opts-in, not as the headline. Don't grow the drafts folder the gate ignores.
3. **Still-unpaid debts to carry or drop:** the X **Teardown** (Tier C) and the low-effort **Threads asks** (Rate-It, Fill-in-Blank, Either/Or) have now been dealt in W27, W28 *and* W29 and never published. **Recommend dropping them from the deal** until the text channels are ungated — re-dealing a fourth time is fitting a channel that doesn't run.

---

*All repo edits this run are git-revertible (this file only). **0 tier moves, 0 format-file edits, 0 voice/brand/offer/stat changes** — all locked, and this week nothing published to justify a tune. No Metricool writes (nothing published, nothing un-drafted, no draft edited). W25–W28 preserved in git history. Five weeks in, the verdict is unchanged and now starker: the deck is sound, the format thesis (concept video in Jake's voice wins) is proven, and this week it went untested because no reel was filmed and nothing was approved. The program's reach is a direct function of one action — Jake filming one concept reel — and this week that action didn't happen. Recommendation #1 is no longer "open the gate"; it's "protect the ten minutes of filming that is the entire engine."*
