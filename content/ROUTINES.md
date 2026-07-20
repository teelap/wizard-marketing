# Running the content engine on a schedule

The recurring workflows are packaged as **skills** so they can run unattended:

- **`weekly-evergreen`** (`.claude/skills/weekly-evergreen/`) — the Monday backbone batch (slot-first: deal a different idea **and a format card** to every post → drafts).
- **`daily-reactive`** (`.claude/skills/daily-reactive/`) — the daily timely layer (1–2 of-the-moment posts → drafts).
- **`weekly-review`** (`.claude/skills/weekly-review/`) — the **Sunday self-improving / self-healing pass**: read the week's Metricool performance, tune the format library (bounded + evidence-based), flag the big calls. The MEASURE stage that feeds Monday's batch.

## Scheduled as LOCAL tasks — NOT cloud routines

All three are **registered as local scheduled-tasks** (via `mcp__scheduled-tasks`; manage them in the **Scheduled** sidebar). They must run locally because they depend on things that only exist **on this machine**:
- the **Metricool MCP** (interactive auth — absent in headless/cloud runs),
- the local clip library (`G:\My Drive\TikTok\Old`, cataloged at `content/video/catalog.json`) — the **video spine** deals 2 back-catalog reels/day from it,
- the render tooling (`content/video/`, `content/assets/render-carousel.js`, headless Chrome),
- and **git** (for transient media hosting + the review's local commits).

A cloud routine (`/schedule`) wouldn't have the Metricool connector, so it couldn't push drafts. The registered schedule (America/Phoenix):
- **weekly-evergreen** → Mondays 8:13 AM (`3 8 * * 1`).
- **daily-reactive** → weekday mornings 9:07 AM (`3 9 * * 1-5`).
- **weekly-review** → Sundays 4:10 PM (`0 16 * * 0`) — runs before Monday's batch so its tuning lands first.

Each task's prompt is a **thin invoker that defers to its repo skill** (the single source of truth), so improving a skill automatically improves the routine. Each run is a fresh session, so the `mcp__metricool__*` tools load cleanly (the task loads them via ToolSearch with full names). After editing a task, click **Run now** once to pre-approve its tools.

## Guardrails (built into both skills)
- **The video spine is the #1 weekly output** — 2 back-catalog reels/day (14/week) dealt from `content/video/catalog.json` is the one unit every review says reliably reaches Jake's base, so it runs before the text deck. The catalog is metered (12-week cooldown + `rating` + retire); the Sunday `weekly-review` rates the week's posted clips and prunes the duds. Jake's own daily on-camera video he films + posts himself (the batch writes the script, doesn't schedule it).
- Everything is `draft: true` — **nothing publishes.** Jake approves in the Metricool planner.
- Stat bank only, **never first-person** stats (the auto-mode classifier blocks "I did/saw X").
- The QA gate (**spread → angle → format → voice → stop-slop**) runs on every piece — the weekly batch ships **a different idea + a proven format card per post**, never one concept all week. The **format pass** catches a post that collapsed into a flat, blank-page statement.
- Media is hosted on a **transient side branch**, never committed to master.
- **`weekly-review` tunes, never publishes:** it auto-applies only bounded, reversible, evidence-backed changes to the format library (tier moves, emphasis, timing) + heals mechanical breakage, and *recommends* the big calls (cadence, platform, strategy). Voice + brand canon stay human-owned.
