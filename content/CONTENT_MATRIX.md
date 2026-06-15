# Jake the Wizard — Content Matrix (the angle engine)

**Version:** 1.0 · 2026-06-11
**What this is:** the rule set that keeps the content from sounding like one note held for two months. The [VOICE_DOSSIER](../VOICE_DOSSIER.md) and [CONTENT_GUIDE](CONTENT_GUIDE.md) keep the *voice* constant. This file keeps the *angle* varied. Both run on every piece.

> Built from Jake's own framework (Core → Subtopics → Topic Types). The engine in [README.md](README.md) decides WHAT subject and WHERE it posts; this file decides **the angle it comes from** — so the same knowledge never gets told the same way twice in a row.

---

## 0. THE PROBLEM THIS SOLVES

One voice + one angle = a broken record. Every Domino delivered as "here's what you're doing wrong" reads identical by week three. We keep the voice locked and **rotate the angle** — same scars, told a different way each time. But rotating the angle on *one subject* all week is still a broken record (W25 proved it: one concept, all 28 posts). So the bigger axis came first: **rotate the subject — every post a different idea** (§4, dial 1). Angle variety then keeps even distinct subjects from blurring. A monotone feed reads like a bot; a person riffs on many things from many directions.

---

## 1. THE THREE LAYERS

```
        CORE  ─────────────────────────────────────────────────────
        Jake's worldview: there is no magic, only sequence and work.
        (Too broad to post directly — like saying "digital marketing.")
                              │
        SUBTOPICS ────────────┼───────────────────────────────────── the WHAT
        The things he can talk about at length (the bank in §2).
                              │
        TOPIC TYPES ──────────┴───────────────────────────────────── the ANGLE
        The 8 lenses each subtopic runs through (§3).

        ONE PIECE  =  [ Subtopic ]  ×  [ Topic Type ]  ×  [ platform format ]
```

> **Two different eights — do not conflate them.** The **Eight Dominoes** are the *product* (a messaging framework Jake teaches and is putting in a book). The **8 Topic Types** below are *content angles* (how we present any idea). A single Domino can be posted through all 8 Topic Types.

---

## 2. THE SUBTOPIC BANK (the WHAT — pull from here)

These already live in [CONTENT_GUIDE §4](CONTENT_GUIDE.md). Each is a category Jake can talk about for days:

- The **Eight Dominoes**, one at a time (01 Core Attraction → 08 New Opportunity) — the messaging *sequence*
- **Share of Brand Voice** — the metric most owners overlook
- **TikTok SEO** / short-video demand gen
- **DSP / omnichannel ads** vs. siloed PPC
- **CRO** — surgical UX tweaks
- **AI-in-marketing skepticism** — human-first beats automation
- **Personal brand as an exit-proof asset**
- **Benefit of the benefit** — the messaging exercise
- **Marketing-news commentary** (*Hold My Beard* mode)

The Dominoes are the spine for the July launch; the rest are the riffs between them.

---

## 3. THE 8 TOPIC TYPES (the ANGLE — rotate through these)

Jake's eight, with his definitions and a brand example each. Run any subtopic through any of these.

| # | Type | The question it answers | Brand example |
|---|---|---|---|
| 1 | **Myth** | What do people get wrong about what you do? | *Messaging × Myth* — "A new logo will fix slow sales." The logo was never the problem. |
| 2 | **Pitfall** | What common mistake are they making right now? | *Messaging × Pitfall* — Domino 02: burying your best line in paragraph three. |
| 3 | **Method** | How do you actually do the thing? (guide / list / walkthrough) | *TikTok SEO × Method* — "How to get a new post ranking on Google fast." |
| 4 | **FAQ** | What do people keep asking you? | *CRO × FAQ* — "Do I need more traffic, or better conversion?" Usually the second. |
| 5 | **Story** | What happened when you did this? | *CRO × Story* — a client's single button change lifted conversion ~1.2% → 6.5%. |
| 6 | **Takeaway** | What did 20 years teach you? | "People browse intellectually and buy emotionally." (an aphorism, told plainly) |
| 7 | **Tip** | What can they use *today*? | *Messaging × Tip* — rewrite your headline as the wound, not the service. Ship it now. |
| 8 | **Commentary** | What's your POV on what's happening / how you know what you know? | *AI-in-marketing × Commentary* — "When you use AI, you accept the center of the bell curve." |

**Stories — the one guardrail.** Composite and hypothetical stories are allowed ("imagine a founder who…"); inventing a *number, a named client, or a credential* and passing it off as fact is not. Stories can be made up; **stats and receipts cannot** — those come only from the [CONTENT_GUIDE §2 stat bank](CONTENT_GUIDE.md). (Jake's rule: make up a story if you must, just don't lie about something.)

---

## 4. THE VARIANCE RULES (the part that does the work)

Enforce variety on four dials. The first is the one Jake added when the old "one core a week" model made the feed monotone:

1. **Subject — never the same twice.** Every post is a different idea. Plan slot-first (§5): one distinct subject per post, dealt from the deck (the subject bank §2 + `content/Ideas/` + the Dominoes + Grimoire). No subject appears more than twice in a week, never twice in a day, never back-to-back. *This is the cardinal rule; the other three keep even distinct subjects from blurring together.*
2. **Topic Type — rotate it.** Never run the same Type on two posts in a row. Over a full cycle, hit all 8. Log the Type used on every post (the weekly file has a column) so the rotation is visible, not vibes.
3. **Hook — vary the attack.** Don't open three posts the same way. Each platform's `content/formats/<platform>.md` carries a **hook bank**: a real menu of opening-line archetypes with Jake-voice examples (the Reframe, the Contrarian Claim, the Confession, the Number Cold-Open, the Reply-Bait Question, the News React, the Blunt Imperative, and more). Deal a hook from it. Never run the same archetype twice in a row, or more than twice in any five posts. **This is the cure for flat openings** — don't improvise the first line.
4. **Format — deal a proven structure, not just a container.** Varying carousel-vs-text isn't enough; deal a **format card** from `content/formats/<platform>.md` — a proven post *skeleton* with a worked example to start from, instead of a blank page. Tier-weighted ~70/30 proven/experimental, no card twice in a row. The deck, tiers, and dealing rules live in `content/formats/README.md`. *(Dials 3–4 used to be one-line lists right here; the per-platform format library now does the real work — it is why the posts stopped reading flat.)*

**What stays constant:** the voice (diagnosis-first, fragments, numbers-as-adjectives, no slop) and the CTA discipline. Locked voice + rotating subject & angle = a personality. Locked voice + one note = a bot.

---

## 5. HOW IT PLUGS INTO THE LOOP

Plan **slot-first.** The old reflex — take one core and repeat it across seven platforms, even through different lenses — is what made the feed monotone. The fix is to deal a different subject to every post.

**Plan (Stage 1):** list the slots the week's cadence calls for. Build the deck (subject bank §2 + `content/Ideas/` concepts + the Dominoes + recent Grimoire). Deal one **distinct subject** per slot, each with its own **Topic Type** and a varied hook. Check last week's log so you don't re-run the same subjects or lead with the same Types.

**Create (Stage 2):** write each post from its own subject, native to its platform:

> **Worked example — a real bouncing week (the correction).** Seven slots, seven subjects, seven angles:
> - **TikTok carousel** → *Share of Brand Voice × Method* — "how to measure the metric you're ignoring"
> - **LinkedIn doc** → *CRO × Story* — a client's button change, 1.2% → 6.5%
> - **IG carousel** → *Benefit-of-the-benefit × Tip* — "rewrite your headline as the wound"
> - **X thread** → *AI-skepticism × Commentary* — "AI is the center of the bell curve"
> - **X singles** → *TikTok SEO × FAQ* · *Personal brand × Takeaway* · *Domino 03 × Pitfall* … (each its own subject)
> - **Threads** → *Marketing-news × Commentary* · *Messaging × Myth* … (each its own subject)
>
> One week, many ideas, no repeats. *The old version of this section showed "one core, five angles" — that was the monotony Jake flagged (W25 shipped one idea across 28 posts). This is the fix: the angles still rotate, but now so does the subject, every post.*

**Schedule / Measure (Stages 3–4):** unchanged — Metricool planner, then read which *subjects and angles* performed, and feed that back into next week's deck.

---

## 6. THE QA HOOK

The [QA gate](README.md) gets two lightweight plan-time checks (the voice + stop-slop passes still run per piece):

> **Spread check** — Is every post a different subject? Does any subject appear more than twice in the week, twice in a day, or back-to-back? If so, re-deal.
> **Angle check** — Name each post's Topic Type. Different from the last 1–2 posts? Hook shape different from the last 3? If three in a row are Pitfalls opening on a stat, kill one and re-angle.
> **Format check** — Name each post's format card (`content/formats/`). Did it execute that structure and land its hook, or go flat (the card's *Don't* line)? Is the week's tier mix ~70/30 proven/experimental, with no card repeating back-to-back? If a post collapsed into a generic statement of the idea, re-draft from the skeleton.

That's it. Deal a different subject to every slot, give each a *different* lens than the last, vary the opening move, keep the voice. The deck is deep enough to feed this for years — the subject bank × 8 angles alone is dozens of combos, and `content/Ideas/` is a permanent top-concepts library you draw from without ever using it up. Start at the top of the bank and go again.
