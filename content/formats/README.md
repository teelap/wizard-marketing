# Jake the Wizard — Format & Hook Library (dials 3 & 4)

**Version:** 1.0 · 2026-06-15
**What this is:** the knowledge base of **proven post structures and hooks, per platform** — the thing that lets a post start from a winning skeleton instead of a blank page. It is the missing half of the variance engine.

> [VOICE_DOSSIER](../../VOICE_DOSSIER.md) + [CONTENT_GUIDE](../CONTENT_GUIDE.md) keep the **voice** constant. [CONTENT_MATRIX](../CONTENT_MATRIX.md) keeps the **subject** and **angle** varied (dials 1–2). This layer makes dials **3 (hook)** and **4 (format/structure)** real — not "vary the container," but *"deal a proven structure and a sharp opening, and never the same one twice in a row."*

---

## 0. WHY THIS EXISTS (the flat-post problem)

The engine already enforces variance on two axes hard: **subject** (a different idea per post) and **angle** (the 8 Topic Types). But in `CONTENT_MATRIX.md` §4 the other two dials were one-line afterthoughts:

- **Dial 3 (Hook)** was a 7-word list of hook types — no examples, no platform nuance, nothing to imitate.
- **Dial 4 (Format)** named the *container* (carousel / clip / text), not the *shape of the writing*.

So when the engine wrote an X single it had a locked voice, a dealt subject, and a rotated angle — and then improvised the structure and opening line from a blank page. The result: posts that are on-voice and on-topic but **structurally flat**. Jake was supplying the missing dial by hand. This library supplies it instead: every post starts from a proven skeleton and a sharp hook, dealt with the same anti-repetition discipline the engine already uses for subjects.

---

## 1. THE FILES

One per platform, parallel to `content/platforms/` (which stays about cadence/algorithm/specs — this layer is about rhetorical structure):

`x.md` · `threads.md` · `linkedin.md` · `tiktok.md` · `instagram.md` · `youtube.md` · `facebook.md`

Each file holds three things: **format cards**, a **hook bank**, and a **tier index**.

---

## 2. THE FORMAT CARD (the schema every card follows)

```
### <Memorable name> — Tier <A|B|C>
- **What:** one line — the structure in a sentence.
- **Why it works here:** the platform-mechanic reason, tied to a documented signal in platforms/<platform>.md
  (e.g. "singles carry the highest median ER on X" / "carousels win on dwell, the 13x LinkedIn signal").
- **Skeleton:** the line-by-line fill-in shape. For visual formats, slide-by-slide or beat-by-beat.
- **Hooks that fit:** which hook-bank archetypes pair with this structure.
- **Example (Jake's voice):** 1–2 concrete, ship-quality examples. The single most important field — generation imitates this.
- **Don't:** the failure mode — how this structure goes flat.
- **Best for:** which Topic Types / subjects it suits.
```

The **Example** is the payoff. A card without a great example is just another abstraction; the example is what raises the floor.

---

## 3. THE HOOK BANK (the cure for flat openings)

A per-platform menu of opening-line archetypes. The opening is where flat posts die, so this is deliberately deep. Each entry:

```
- **<Archetype>** — when it lands. e.g. "<Jake-voice example>" · "<another>"
```

Common archetypes (each platform tunes its own set): contrarian claim · number cold-open · the callout ("you're doing X and calling it Y") · the confession ("I got this wrong for years") · cold-open story ("a client called me at 11pm") · the reframe ("X isn't the problem. Y is.") · blunt imperative ("stop describing. start diagnosing.") · reply-bait question · news-react.

---

## 4. TIERS (A / B / C) — what they mean and how they're drawn

- **A — proven.** Structurally proven on the platform AND a natural fit for Jake's voice/topics. Safe to lead with.
- **B — solid.** Works, but situational or higher-effort/risk.
- **C — experimental.** Promising or trend-driven, less proven for this brand. How the deck discovers new winners.

**The draw is ~70% A / ~30% B+C** (the dial Jake set, 2026-06-15). Most posts start from a proven structure (raises the floor); a steady ~30% try B/C (keeps the deck from collapsing into the same three formats and feeds the scoreboard). **At least one experimental per platform per week** when it has ≥3 slots. Tiers are not quotas on the library — they label quality; the *draw* is what's weighted.

---

## 5. THE DEALING RULES (how the skills use this)

1. **Deal, don't default.** Every slot gets a **format card + a hook** dealt to it — alongside the subject and Topic Type the engine already deals. One post = `[subject] × [Topic Type] × [format card] × [hook]`.
2. **Tier-weighted draw.** ~70% A, ~30% B/C (§4). At least one experimental per platform/week.
3. **No-repeat window** (mirrors the subject rules):
   - No **format card** more than **twice** per platform per week; never **back-to-back**; never twice on the same day.
   - No **hook archetype** twice in a row; not more than **twice in any 5 consecutive** posts on a platform.
4. **Pairing, not locking.** Respect each card's *Best for* Topic-Type hints, but variety wins — don't force a "correct" pairing if it repeats the queue.
5. **Log it.** Record the **format card + hook + proven/experimental** on every post (weekly log column; one line in the reactive report). Without the log there is no scoreboard.

---

## 6. THE SCOREBOARD (the feedback loop — how it gets smarter)

The library starts from researched platform best-practice and **converges on what works for Jake's audience specifically**:

1. The weekly log records the card + hook used on every post (§5.5).
2. Periodically (monthly, or in the weekly batch's Stage 1 input pull), pull Metricool analytics, tag each over/under-performer with the **card it used**, and **promote/demote tiers** — a B that keeps overperforming for Jake becomes an A; an A that flops drops.
3. Over weeks this makes the deck Jake-specific, not generic.

**Honest caveat:** we have not been logging format until now, so the loop compounds over a few weeks. **Seed it now** from the two richest existing signals: Jake's **TikTok back-catalog** (110K followers — his verbatim captions in VOICE_DOSSIER are *already* proven hooks for his audience) and any **Metricool top performers** to date.

---

## 7. THE QA "FORMAT PASS" (new gate check)

The QA gate gains one check, between the angle check and the voice pass:

> **Format pass** — Did this post actually execute its dealt format and land its hook? Or did it collapse back into a flat statement of the idea? If it reads like the *Don't* line on its card, re-draft from the skeleton before it moves on.

New order: **draft → spread → angle → format → voice → stop-slop → approve → schedule.** This is the check that catches a flat post before Jake has to.

---

## 8. HOW IT PLUGS INTO THE ENGINE

- **`weekly-evergreen` skill** — Stage 2 deals a format card + hook per slot (tier-weighted); Stage 5 gate runs the format pass; Stage 7 log gains format + hook columns.
- **`daily-reactive` skill** — Stage 2 deals a format + hook different from the recent queue; Stage 3 gate runs the format pass; the report names the card used.
- **`CONTENT_MATRIX.md` §4** — dials 3 (hook) and 4 (format) now point here instead of carrying one-line lists.
- **`README.md` QA gate** — the format pass joins voice + stop-slop in the published order.

Nothing here replaces the engine. It upgrades dials 3 & 4, the slot-first deal, and the QA gate. Voice, subject variance, and angle rotation all stay exactly as they are.
