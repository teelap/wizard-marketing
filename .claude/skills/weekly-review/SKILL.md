---
name: weekly-review
description: >-
  Run the weekly performance review of Jake the Wizard's entire social program — pull
  Metricool (+ GA4/GSC) data, score what worked by format card / hook / subject / platform /
  time, then make bounded, evidence-based improvements to the format library and engine (the
  scoreboard loop) and flag the bigger calls for Jake. Late Sunday so it feeds Monday's batch.
  Use for "the weekly review", "evaluate the program", "the Sunday review", or as a scheduled
  routine. One pass, then finish. Nothing publishes; the system tunes itself, Jake approves the rest.
---

# Weekly review — the self-improving / self-healing loop

This is the **MEASURE** stage of the content loop ([README §1](../../../content/README.md)) run as a routine, and it operationalizes the **scoreboard** ([formats/README §6](../../../content/formats/README.md)). It reads what performed, tunes the deck toward Jake's actual results, and heals what broke — so the program gets better on its own. Run it **late Sunday** (improvements land before the Monday `weekly-evergreen` batch). Do **ONE pass, then finish** — this is a scheduled command, not a daemon.

Reference material lives in the repo and must be **read, not duplicated**:
- `content/README.md` — the loop, the cadence table (§3), the 7 channels.
- `content/formats/README.md` — §4 tiers (A/B/C) + §6 the scoreboard. **This is the system you tune.**
- `content/formats/<platform>.md` — the format cards + hook banks whose tiers/emphasis you adjust.
- `content/CONTENT_MATRIX.md` — the subject bank + 8 Topic Types.
- `content/calendar/2026-Wnn.md` — **what was dealt this week** (subject × format card × hook × tier per post, **and the video-spine reel table**). The join key for scoring.
- `content/video/catalog.json` — the **video catalog** (the spine's source of truth). You rate + retire clips here from real performance via `content/video/rate-clip.js` — the same scoreboard mechanic as the format tiers, applied to video.
- `content/reviews/` — past reviews (the program's performance history). Build on them; don't re-derive.
- `content/COMPETITORS.md` — the competitor benchmark feed: how to pull tracked competitors via the MCP + the field-ID cheat sheet (the `…CO…` scoreboard metrics you use here).
- `VOICE_DOSSIER.md` + `content/CONTENT_GUIDE.md` — **LOCKED. You do not tune these.**

Metricool: brand (blogId) **6387301**, timezone **America/Phoenix**. The `mcp__metricool__*` tools load only in a **fresh** session — ToolSearch the **full** names (`select:mcp__metricool__getBrandSettings,mcp__metricool__getScheduledPosts,mcp__metricool__getAnalyticsDataByMetrics,mcp__metricool__getAnalyticsAvailableMetrics,mcp__metricool__getBestTimeToPostByNetwork`). `getScheduledPosts` over a wide range overflows the result cap → pull **1–2 days at a time**. Edits match on **uuid, not id**; there is **no delete tool**.

## Hard rules — a self-modifying system needs guardrails
- **Bounded + reversible.** Tune by nudges, never rewrites. Cap: **≤2–3 tier moves per platform per week**. Never rewrite a card's voice or examples wholesale. Every change is a git diff Jake can revert.
- **Evidence, not vibes.** Tie every change to a number — a post's engagement vs **that network's own median** (normalize per network; never compare X to LinkedIn raw), saves, shares/sends, profile clicks, follows. State the evidence inline in the diff.
- **Respect small N.** The brand is young; one viral or one dud is noise. **Require a minimum signal before auto-applying:** a card needs ≥3 uses AND ≥2 weeks of data, or a clear ≥2x-median pattern, before a tier move. Below that, **recommend, don't auto-apply**, and flag low confidence. The system grows more decisive as the data deepens.
- **Voice + brand are locked.** You tune format-card **tiers**, **hook/subject/Topic-Type emphasis**, and **cadence/timing** — NOT the voice (`VOICE_DOSSIER`/`CONTENT_GUIDE`), the brand canon, the offers, or the stat bank. Those are human-owned.
- **Auto-apply the small stuff; recommend the big stuff.**
  - **Auto-apply** (edit the repo, log the evidence): tier promote/demote, hook/subject/Topic-Type emphasis notes, timing tweaks, scoreboard updates, fixing mechanical breakage.
  - **Recommend only** (list for Jake, do NOT apply): cadence changes, adding/dropping a platform, strategy/positioning pivots, anything touching voice/brand/offers/pricing, or spending money (ads).
- **Nothing publishes.** This routine edits the *system* and writes a report + log. It never posts and never un-drafts.

## 1. Pull the data (the week that just ended)
- `getBrandSettings` (confirm brand). `getScheduledPosts` over the past 7 days (1–2 day windows) → what actually went out + each post's text/format.
- `getAnalyticsAvailableMetrics` then `getAnalyticsDataByMetrics` → per-network engagement for the week: engagement rate, **saves**, **shares/sends** (the heavy signals on IG/LinkedIn/X), profile clicks, follows, reach, video retention.
- **Competitor scoreboard** (see `content/COMPETITORS.md` for the recipe + field IDs): `getAnalyticsDataByMetrics` with the `…CO…` fields per network (IG `IGCO`, X `TTCO`, YT `YTCO`) → followers, posts, and engagement (per-1,000-followers) for every tracked competitor. Also skim the top competitor **posts/videos** (`IGCP`/`TTCP`/`YTCV`) for formats/hooks that over-index. Pull a few networks at a time (heavy calls throttle the brand).
- `getBestTimeToPostByNetwork` → has the timing signal sharpened since last week?
- **GA4 / GSC** (if reachable this run): site/blog traffic, **branded search trend** (the real Share-of-Brand-Voice proxy), and **waitlist signups** (the book funnel — the north-star conversion). If not wired yet, note it as a gap to close.
- Read `content/calendar/2026-Wnn.md` — the week's deal (subject × format card × hook × tier per post). This is how you attribute performance to a card/hook/subject.
- **Video spine:** read the week's **reel table** in the calendar (day · network · clip `id`) and pull per-reel video metrics (plays/views, avg watch time / retention, saves, shares) via `getAnalyticsDataByMetrics`. This attributes performance to a specific back-catalog clip so you can rate it in §3.

## 2. Score — join performance ↔ what was dealt
Normalize **within each network** (a post vs that network's median). Then produce:
- **By format card** — which cards beat / missed their network median (the core scoreboard signal).
- **By back-catalog clip (the video scoreboard)** — which spine reels beat / missed their network's **video** median (plays, retention, saves). This decides which catalog clips get favored (`good`) and which retire — the reel is the program, so this is a first-order signal, not a footnote.
- **By hook archetype, subject, Topic Type, platform, and time-of-day.**
- **By competitor benchmark** — Jake's per-network engagement vs the **tracked-competitor median on that network**; which competitors are **accelerating** (followers/engagement vs last review); and which of their formats/hooks/subjects over-index — a watch-list for the deck, filtered through the locked voice/brand (note off-brand reach mechanics like comment-to-DM funnels; do **not** adopt them).
- **Top 3 and bottom 3 posts**, each with the likely *why* (format? hook? subject? timing? media?).
- **Trend vs last week's review** — is a channel climbing or sliding? Is an earlier change paying off?
Write the scored tables into `content/reviews/2026-Wnn-review.md` (copy the shape of the previous review).

## 3. Improve — bounded, evidence-based
- **Tier moves (auto, if signal clears §rules):** promote a B/C card that consistently beats its network median → A; demote an A that keeps missing. Edit both the card's `— Tier X` line and the **Tier index** in `content/formats/<platform>.md`, with the evidence inline: `<!-- promoted 2026-Wnn: 2.4x median ER over 4 uses -->`.
- **Emphasis notes (auto):** annotate winning/losing hooks, subjects, and Topic Types in the platform file so next week's deal leans toward what works for Jake's audience.
- **Timing (auto):** if best-times sharpened, update the slot guidance.
- **Rate + retire catalog clips (auto, bounded):** from the video scoreboard (§2), record each posted reel's verdict in `content/video/catalog.json` — `node content/video/rate-clip.js <id> <good|ok|bad> [--retire] --note "<evidence>"`. `good` favors the clip in the next deal; `--retire` drops a dud from the pool. **Respect small N:** rate on a real signal (a reel vs its network's video median), and retire only after a clear miss (≈0 plays across 2 posts, or bottom-decile retention) — one quiet week is noise. The AI teaching-prior seeds the initial ranking; real performance overrides it as the data deepens. Every call is a git diff Jake can revert.
- **Self-healing (auto where mechanical):** detect and fix — drafts that failed to post, dead/expired media URLs, a QA miss that slipped through (flag for rewrite), a routine that didn't run, a channel that went silent. Fix the mechanical; flag the rest.
- **Recommend (Jake's call — list, don't apply):** cadence shifts, platform add/drop, strategy/offer/positioning changes, ad spend, anything touching voice/brand.

## 4. Log + report
- `content/reviews/2026-Wnn-review.md` — the scored data, the changes made (with evidence + the git-revert note), the recommendations, and **1–2 experiments to run next week** (e.g., "the Teardown card has never been tried on X — deal it once"). This file is the program's compounding memory.
- Report to Jake (concise): top/bottom performers, the tier moves made this week, **the back-catalog reels rated `good` / retired** (the video scoreboard), what next week's batch will do differently, the open recommendations needing his decision, and any breakage you healed or flagged.

## 5. Monthly research refresh (every ~4th run)
Once a month, also re-validate the platform best-practices the library rests on: a couple of searches per platform for algorithm changes / new formats, and update `content/formats/<platform>.md` + `content/platforms/<platform>.md` where the game actually moved. The library was built from 2026 research; platforms drift, and "self-improving" means keeping the *knowledge* current, not just the tiers.

## Note on scope
This routine **tunes**; it does not **create**. It never writes or schedules posts — that's `weekly-evergreen` (Monday) and `daily-reactive` (weekdays). The clean handoff: **review Sunday → tuned deck → better batch Monday.**
