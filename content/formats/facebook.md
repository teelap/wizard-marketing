# Format & Hook Library — Facebook

**Version:** 1.0 · 2026-06-15 · the format deck for Facebook.
**Reads with:** [platforms/facebook.md](../platforms/facebook.md) (cadence/algorithm/specs — every "why it works" anchors there) · [README.md](README.md) (schema, tiers, dealing rules) · [CONTENT_GUIDE](../CONTENT_GUIDE.md) · [VOICE_DOSSIER](../../VOICE_DOSSIER.md) · [CONTENT_MATRIX](../CONTENT_MATRIX.md).

> **Facebook is cross-post-only.** Page organic reach is structurally low (1–6% of followers), so we don't author native — we re-route the IG asset. This deck is deliberately short: it tells the dealer *which already-made thing to send here and how to caption it*, not to spend new effort. Reach escapes the follower base almost entirely via **shares**, so every card is built to be shared, and the link always goes in the **first comment**, never the post body (in-body links are the lowest-engagement format on FB). Voice rules hold: no emoji, no exclamation marks, no em-dashes, diagnosis-first, §2 numbers only (never first-person), in-world CTAs.

---

## Scoreboard notes — live tuning (emphasis only, no tier moves)

> From `content/reviews/`. One week of data → **emphasis annotations, not tier moves** (small-N rule). Low confidence; re-test next week.

- **W30 (the first Facebook data this program has ever had):** seven cross-posted reels published — **1,233 imp / 12 int, median 198 imp / 1.01% ER**. The reel-only, cross-post-only strategy is **validated on reach**: FB delivered ~200 impressions per reel off a near-zero page base, more total reach than LinkedIn (1,182) and ~5x X (251). But **engagement is near-absent** — ER ran 0% to 1.54% (top: `blended-model-sizes` 260 imp / 4 int / 1.54%; `de-positioning` 210 imp / **0 int**). Read: **FB is a reach surface, not a conversation surface.** Keep it cross-post-only and spend zero new authoring effort here, exactly as this deck specifies. Since shares are the only escape from the 1–6% follower ceiling and no post earned meaningful interaction, don't expect compounding yet. *(W30 review §2.2, §2.5)*
- **W30 — the container is the whole ballgame, and we got it wrong once.** The "9 AI tools I use" video went out as a **feed POST** (`facebookData.type: "POST"`) and drew **9 impressions**. The same asset published as a **REEL** on the same days averaged **~198**. A one-field container mistake cost roughly **20x the reach** — the single clearest mechanical finding of the week. **The Cross-Posted Reel card must always route as `type: REEL`, never as a feed post with video attached.** Flagged to the batch (W30 review §5.4).

---

## 1. Format cards

### The Cross-Posted Reel — Tier A
- **What:** the IG Reel, re-uploaded natively to FB (not a link to IG), auto-routed via Metricool.
- **Why it works here:** Reels are the only FB format with engagement uplift in 2026 (~0.15%, 2–3x photo reach) and video is shared ~1,200% more than other formats — and shares are the only real escape from the 1–6% follower ceiling (per facebook.md).
- **Skeleton:** reuse the [instagram.md](instagram.md) `3-Second Reel` or `Receipt Reel` whole. Re-caption with the diagnosis line up front; link (if any) in the first comment; no hashtags (no value on FB).
- **Hooks that fit:** the same hook the IG Reel used — it's the same asset.
- **Example (Jake's voice):** caption first line: "nobody buys the service. they buy the wound it closes." (link to the free chapter in comment 1.)
- **Don't:** post it as a link back to IG/TikTok. Upload native. Don't leave a third-party watermark on the video (suppressed).
- **Best for:** whatever the source Reel was for.

### The Cross-Posted Carousel — Tier A
- **What:** the IG carousel, re-uploaded as a native FB carousel (not a link).
- **Why it works here:** native multi-image carries far more reach than a link post (~half of everything else), and the share is the distribution event. The IG asset already exists — this is zero net production.
- **Skeleton:** reuse any [instagram.md](instagram.md) carousel card (`Send-This`, `Count Deck`, `Myth-Bust`). Keep the share-prompt close — on FB the share matters even more than on IG. Link in first comment.
- **Hooks that fit:** the source carousel's slide-1 line.
- **Example (Jake's voice):** slide 1 (reused): "the reason good products lose to worse ones." caption first line: "your sequence is broken, not your product."
- **Don't:** upload as a link-preview to the IG post. Re-upload the images natively, or reach craters.
- **Best for:** whatever the source carousel was for.

### The Text Status Diagnosis — Tier B
- **What:** a standalone one-to-three-line diagnosis as a plain text status — the one native unit worth a few seconds.
- **Why it works here:** text/status posts are FB's top *static* performer (above photos), and a sharp opinion is shareable. Use it only when a take is genuinely strong; this is the exception to "don't author native," not a daily habit.
- **Skeleton:** [diagnosis line]. [the shorter twist]. → optional one-line stake. No link in body.
- **Hooks that fit:** reuse the [x.md](x.md) hook bank (the Reframe, the Contrarian Claim, the Confession). FB skews older and less marketing-insider than X, so favor plain diagnosis over inside-baseball.
- **Example (Jake's voice):** "A new logo won't fix slow sales. The logo was never the problem." · "Most marketing isn't bad. It's invisible. That's the more expensive problem."
- **Don't:** drop an outbound link in the post. First comment only. Don't import an X take that needs marketing-Twitter context to land.
- **Best for:** Myth, Takeaway, Commentary.

### The Group Diagnosis Post — Tier C
- **What:** a conversation-starting diagnosis posted inside an owned FB **Group** (if/when the "Eight Dominoes / Share of Brand Voice" Group is spun up — README §9.4).
- **Why it works here:** Group member-reach is 20–40% vs a Page's 1–6%, and book buyers cluster there. This card only exists if the Group does — experimental, tied to an open decision.
- **Skeleton:** [diagnosis or question that invites members to share their own situation]. Reply fast to seed the thread (Threads-style velocity). No CTA — the Group is the relationship, not the funnel.
- **Hooks that fit:** the [threads.md](threads.md) reply-bait hooks (Diagnosis Fragment, Either/Or, Quiet Confession).
- **Example (Jake's voice):** "be honest. is it a traffic problem or a conversion problem? tell me where you actually think the leak is and i'll tell you what i'd check first."
- **Don't:** pitch in the Group. Don't run it before the Group exists. Treat it as a community, not a broadcast channel.
- **Best for:** FAQ, Pitfall, Commentary — Group only.

---

## 2. Hook bank

Facebook borrows its hooks from the channels that authored the asset. There is no FB-native hook bank to maintain.

- **Cross-posted assets** → use the hook the source IG/TikTok asset already used.
- **Text Status** → pull from the [x.md](x.md) hook bank, favoring the plainest diagnosis (the Reframe, the Contrarian Claim, the Confession). FB's audience is broader and less insider than X — cut the jargon, keep the wound.
- **Group post** → pull from the [threads.md](threads.md) reply-bait hooks (the post lives or dies on whether members reply).

**FB-universal rule:** lead with the line, never the link. The link goes in the first comment. Shares are the only reach lever, so write the post a reader would forward to one specific person.

---

## 3. Tier index (for the dealer)

- **A (lead ~70% of draws):** Cross-Posted Reel · Cross-Posted Carousel
- **B (solid, situational):** Text Status Diagnosis
- **C (experimental, ~30% quota):** Group Diagnosis Post *(only once the Group exists)*

*Why:* FB's whole strategy is cross-posting (facebook.md), so the two cross-post cards are the A spine — zero net production, and Reels/carousels are the only formats that escape the follower ceiling. The Text Status is the one native unit worth occasional effort. The Group post is gated on an open decision (README §9.4) — genuinely experimental.

**Note:** because A here is "re-route the existing IG asset," the format *variety* on Facebook is inherited from Instagram's deal. The dealer doesn't need to vary FB structure independently — it varies upstream on IG, and FB rides along.

---

## 4. Sources

- **`content/platforms/facebook.md`** — Page reach 1–6%, Reels the only format with uplift, video shared ~1,200% more, link-in-comment rule, Groups 20–40% reach (primary anchor).
- **Social Media Examiner — Facebook's 2026 Rules for Reach & Relevance** · **Socialinsider — 2026 FB Engagement Benchmarks (Q1 2026)** (both cited in facebook.md).
- Cross-post source decks: [instagram.md](instagram.md) (Reels + carousels) · [x.md](x.md) (text-status hooks) · [threads.md](threads.md) (Group reply-bait hooks).
