---
name: daily-reactive
description: >-
  Run the daily time-sensitive content pass for Jake the Wizard — scan what's moving
  today (competitors, marketing/SEO/AI news), draft 1–2 reactive posts in his voice, run
  the QA gate, and load them into the Metricool planner as drafts. Use for "today's
  reactive posts", "the daily batch", "the reactive layer", or as a scheduled weekday
  routine. Do one pass, then finish. Nothing publishes; Jake approves in Metricool.
---

# Daily reactive

The **timely layer** that rides on top of the weekly evergreen backbone — 1–2 posts/day so
the cadence (README §3: X 3–5/day, Threads 1–2/day) stays full with of-the-moment takes.
Do ONE pass, then finish. Reference material lives in the repo and must be **read, not
duplicated**:

- `content/CONTENT_GUIDE.md` — voice rules + the **approved stat bank (§2)** + banned list + CTAs.
- `content/CONTENT_MATRIX.md` — the 8 Topic Types (rotate the angle, don't repeat the queue).
- `content/formats/` — the **format deck**: per-platform proven structures + hook banks. Deal a format card + hook (different from the recent queue) instead of writing from a blank page. Reactive posts lean on the news-friendly cards (X *Teardown* / *News React* hook, Threads *Hot Take + Open Floor*, the *Diagnosis Fragment*).
- `content/README.md` §4 — the approval workflow.
- `content/Ideas/` — Jake's permanent top-concepts library (concept docs with per-channel cuts). Fallback source for a Short post when nothing's timely; borrow a line. **Nothing consumes this bank** — never stamp, retire, or move a concept.
- `VOICE_DOSSIER.md` (repo root) — Jake's voice.

Metricool: brand (blogId) **6387301**, timezone **America/Phoenix**. The `mcp__metricool__*`
tools only load in a **fresh** session.

## Hard rules
- **Nothing publishes.** `draft: true` (+ `autoPublish: true`). Jake approves in the planner.
- **Stat integrity.** Stat bank only, and NEVER as a first-person claim ("I did/saw X") — the auto-mode classifier blocks it. Frame as "a client" / third-person, or omit the number.
- **Silence beats slop.** If nothing is genuinely timely, pull the **Short post** cut from a `content/Ideas/` concept (`ready`/`building`) instead of forcing a hot take. Borrow a line — the Ideas bank is a permanent library; **nothing consumes it** (no stamping, no `Used/`).

## 1. Scan (what's moving today)
- `getBrandSettings` → confirm brand. Pull competitor posts via Metricool if available.
- Check what's live in marketing / SEO / AI today (a couple of searches). Note 1–2 angles Jake has a real, earned POV on — not just a reaction.
- `getScheduledPosts` for the next few days → see what's already queued so you do NOT repeat a **subject**, Topic Type, format card, or hook the evergreen deck already placed.

## 2. Draft 1–2 posts
- Usually **X** and/or **Threads** (cheap, fast, high-volume). LinkedIn only if it's genuinely B2B-newsworthy.
- Deal a **format card + hook** from `content/formats/<platform>.md` — a different card/hook than the recent queue, and start from its skeleton (not a blank page). Pick a DIFFERENT Topic Type + opening move too (CONTENT_MATRIX). Diagnosis-first, fragments, one imperative in-world CTA. Lowercase, plainspoken on Threads / casual X.

## 3. The gate (every piece)
1. **Angle check** — different lens + hook than the recent queue.
2. **Format pass** — name the format card; did the post execute that structure and land its hook, or collapse into a flat statement (the card's *Don't* line)? Re-draft from the skeleton if so.
3. **Voice pass** — CONTENT_GUIDE + VOICE_DOSSIER (no emoji, no exclamation marks, numbers-as-adjectives).
4. **Stop-slop pass** — run the `stop-slop` skill: no em dashes, no throat-clearing, no slop.

## 4. Push as DRAFTS
`createScheduledPost` (brand 6387301), at the next open best-time slot today/tomorrow:
`autoPublish:true, draft:true, shortener:false, smartLinkData:{ids:[]}, firstCommentText:"", hasNotReadNotes:false, providers:[{network}], publicationDate:{dateTime, timezone:"America/Phoenix"}, text, media:[], mediaAltText:[], descendants:[]` + per-network data (`twitterData:{tags:[]}` / `threadsData:{allowedCountryCodes:[]}` / `linkedinData:{type:"post"}`). X ≤280/tweet; threads via `descendants`.

## 5. Report
One line: what you drafted, the Topic Type + format card used, and the `plannerUrl`(s) for Jake to approve.
