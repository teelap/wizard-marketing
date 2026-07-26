# Format & Hook Library — Threads (Meta)

**Version:** 1.0 · 2026-06-15 · the format deck for Threads.
**Reads with:** [platforms/threads.md](../platforms/threads.md) (cadence/algorithm/specs — every "why it works" anchors there) · [README.md](README.md) (schema, tiers, dealing rules) · [CONTENT_GUIDE](../CONTENT_GUIDE.md) · [VOICE_DOSSIER](../../VOICE_DOSSIER.md) · [CONTENT_MATRIX](../CONTENT_MATRIX.md).

> Every card is built to earn a counter-reply, because Threads ranks on conversation velocity (replies > reposts > likes). Start from a card, then run the QA gate (format → voice → stop-slop). Examples obey the hard voice rules: no emoji, no exclamation marks, no em-dashes, fragments, second person, lowercase deadpan, ≤500 chars, numbers only from CONTENT_GUIDE §2 (never as a first-person claim — frame as "a client" or omit).

---

## Scoreboard notes — live tuning (emphasis only, no tier moves)

> From `content/reviews/`. One week of data → **emphasis annotations, not tier moves** (small-N rule). Low confidence; re-test next week.

- **W25 (first real read):** the pure Reply-Bait Question ("what do you personally think is the best marketing channel right now?") was the top Threads post by a wide margin — **78 imp vs ~8 median (~10×)**. Confession / either-or / diagnosis-fragment posts trailed in single digits. Reinforces the deck's hero call: **lean Threads on the Reply-Bait Question and Hot-Take-and-Ask, and end every post on a forced reply.** Threads also runs ~2–3× X's impression baseline off the same cold start — it is the friendlier of the two text platforms right now.
- **W26 (2nd read):** the value-prop Diagnosis Fragment ended on a question ("what does your homepage actually promise in the first six words?") → **26 imp vs ~8 W25 median (~3×)** — the question-ender keeps over-indexing on reach. But it drew **0 replies** despite the reach, so the reach-vs-conversation gap is real: a soft open-ended ask earns the impression but not the reply. Make the ask **lower-effort / more answerable** (a binary or a one-word answer) rather than just present. n=1 (only 1 W26 Threads post published of ~6 dealt — throughput, see W26 review §5); re-test.
- **W30 (3rd read — this is a distribution floor, not a format problem):** 10 posts published, **46 impressions for the entire week, median 2.** The two dealt evergreen posts drew **2 imp** (`one-good-channel`, Diagnosis Fragment · A) and **1 imp** (`the-exit-proof-asset`, Quiet Confession · A). **No tier move — and deliberately so: a 1-impression sample on a network whose median is 2 is rounding, not signal**, and demoting a Tier A card on it would be fitting noise. The W25 Reply-Bait result (78 imp) proves the cards can work; the surface simply stopped distributing. Threads' baseline has also **inverted vs X** since W25 (it was 2–3x X's; it is now ~5x *below* X's 251). *(W30 review §2.2, §2.5)*
- **W30 — the one differentiator visible at this scale:** reactive newsjacks (**13 / 11 / 8 imp**, median 11) out-reached dealt evergreen fragments (**1 / 2**, median 1.5) by roughly **7x**, and also beat the cross-posted video (median 2). Every reactive closed on a question. Emphasis: **if Threads stays in the deal, run it reactive-first with a forced, low-effort ask** — evergreen concept fragments are not earning their slot here. Low confidence (n=3 reactives, absolute numbers tiny). Whether Threads stays in the weekly deal at all is flagged to Jake (W30 review §6.5).

---

## 1. Format cards

### The Diagnosis Fragment — Tier A
- **What:** a 1–3 sentence diagnosis that ends on a question begging a counter-reply.
- **Why it works here:** Threads ranks on reply velocity (replies > reposts > likes, per threads.md); a take that demands "no, because…" seeds the thread fast. It is also format #1 in threads.md (native text hot-take) and the platform's hero move.
- **Skeleton:** [confident diagnosis]. [the shorter twist]. [a question that forces a side].
- **Hooks that fit:** Contrarian Diagnosis, The Callout, Reply-Bait Question.
- **Example (Jake's voice):** "your funnel isn't broken. your message is. what's the last line of copy that actually stopped your scroll?" · "you don't have a traffic problem. you have a clarity problem. what does your homepage promise in the first six words?"
- **Don't:** end on a period. no question = no replies = no reach. don't bait with "agree?"
- **Best for:** Myth, Pitfall, Commentary. Subjects: the messaging concepts, CRO, Share of Brand Voice.

### Hot Take + Open Floor — Tier A
- **What:** one blunt opinion, then you hand the mic over instead of defending it.
- **Why it works here:** opinion posts out-reply informational posts (a clear stance invites agree/disagree); threads.md says post a take that demands a counter-reply, then reply fast to seed it. Handing over the floor manufactures the back-and-forth the algorithm rewards.
- **Skeleton:** [bold claim, stated flat]. [one line of why]. [now you: invite the disagreement].
- **Hooks that fit:** Contrarian Diagnosis, Unpopular Truth, The Either/Or.
- **Example (Jake's voice):** "most rebrands are procrastination with a design budget. the logo was never the problem. tell me the real reason you want to rebrand." · "ai writes the center of the bell curve. that's the ceiling, not the floor. where has ai copy actually beaten a human for you?"
- **Don't:** stack three defenses after the claim. that's a broadcast, not an opening. don't soften it to a maybe.
- **Best for:** Commentary, Myth, Takeaway. Subjects: AI skepticism, marketing-news, personal brand.

### The Either/Or — Tier A
- **What:** a forced binary that makes scrolling past feel like dodging the question.
- **Why it works here:** binary choices increase dwell and send positive reply signals (a poll without the poll UI); replies are one tap of conviction. threads.md flags polls/either-or as an emerging reply-spike play.
- **Skeleton:** [the setup, one line]. [option a] or [option b]? [optional: the tiebreaker stakes].
- **Hooks that fit:** The Either/Or, The Callout, Reply-Bait Question.
- **Example (Jake's voice):** "settle it. more traffic or better conversion? one of them is usually a waste of money. pick." · "the budget's tight. brand or performance? wrong answer and you're invisible in the one quarter that buys. which way."
- **Don't:** offer a fake binary nobody believes, or three-plus options. two real sides, one tap. don't pad it past 500 chars.
- **Best for:** FAQ, Pitfall, Commentary. Subjects: CRO, DSP vs PPC, brand vs activation.

### The Quiet Confession — Tier A
- **What:** an "I got this wrong" admission that ends by asking for theirs.
- **Why it works here:** confession/uncertainty framing out-replies declarative takes because it leaves space for others to add their own; vulnerable beats mic-drop. Maps to the Story angle and the dossier's scars/trenches authority without needing a stat.
- **Skeleton:** [the thing you believed]. [what the trenches taught you instead]. [what did you get wrong that took too long to see?].
- **Hooks that fit:** The Confession, The Time-Stamp, Reply-Bait Question.
- **Example (Jake's voice):** "i used to think the best copy was the cleverest. wrong. the best copy is the clearest. what's a line you finally cut that you'd been proud of?" · "spent years optimizing the funnel. the leak was the headline the whole time. what's the fix you avoided because it felt too simple?"
- **Don't:** confess and then pitch. the admission is the whole post. don't fake a vulnerability you can't back.
- **Best for:** Story, Takeaway, Pitfall. Subjects: messaging, CRO, the trenches, the messaging sequence.

### The Relatable Callout — Tier B
- **What:** a two-line "what they say / what they mean" that names a shared lie out loud.
- **Why it works here:** relatable-callout shapes earn "this is so me" replies and reposts because recognition is reflexive; the structure itself is a documented high-reply format. Demands a reply only when you bolt a question on, so always close with one.
- **Skeleton:** what [they] say: [the polite version]. what [they] mean: [the true version]. [which one are you guilty of?].
- **Hooks that fit:** The Callout, The Confession, Reply-Bait Question.
- **Example (Jake's voice):** "what the brief says: 'make it pop.' what the brief means: 'i can't tell you what's wrong, so fix everything.' marketers, what's your most-hated brief line?" · "what the client says: 'we tried marketing, it didn't work.' what they mean: 'we posted twice and quit.' who else has heard this one?"
- **Don't:** punch down at the client. it's a knowing nod, not contempt. and don't skip the closing question, or it dies as a like-magnet.
- **Best for:** Myth, FAQ, Commentary. Subjects: marketing-news, agency life, messaging.

### The Fill-in-the-Blank — Tier B
- **What:** a sentence with a hole in it that the reader finishes in the replies.
- **Why it works here:** lowest-friction reply on the platform (one word clears the bar), and finishing a prompt is more compelling than answering an open question. Strong for waking up a cold thread or a slow midweek slot.
- **Skeleton:** finish it: [setup that frames the answer] ______. [optional: i'll start. mine is ___].
- **Hooks that fit:** Reply-Bait Question, The Callout, The Either/Or.
- **Example (Jake's voice):** "finish it: the fastest way to lose a sale is to ______. i'll start. mine is making them think." · "fill in the blank: my marketing finally worked when i stopped ______. one word if you have to."
- **Don't:** make the blank so open it has no gravity. give it a rail. don't run this daily, or it reads like a game-show host, not Jake.
- **Best for:** Tip, Takeaway, FAQ. Subjects: messaging, CRO, the benefit of the benefit.

### The One-Number Gut-Punch — Tier B
- **What:** a single hard number that reframes the problem, closed with a question.
- **Why it works here:** threads.md says numbers are the adjectives, and a specific figure is its own pattern-interrupt hook; the close converts the stat from a broadcast into an opening. Use ONLY CONTENT_GUIDE §2 numbers, framed as a client, never as your own headline claim.
- **Skeleton:** [the number, stated cold]. [the one-line implication]. [a question that turns it on the reader].
- **Hooks that fit:** The Hard Number, Contrarian Diagnosis, Reply-Bait Question.
- **Example (Jake's voice):** "one client went from 3 crews to 9. nothing changed but the message. what would double if your offer was finally clear?" · "a client moved one button. conversion went from roughly 1.2 percent to 6.5 percent. what's the smallest change you're still too scared to test?"
- **Don't:** say "I generated $100M" as a personal flex. frame it as a client, or omit. never invent a number outside §2.
- **Best for:** Story, Pitfall, Method. Subjects: CRO, the landscaper story, DSP/ROAS.

### The Rate-It / Tag-Yourself — Tier C
- **What:** a soft poll: rank a thing, or pick which archetype you are.
- **Why it works here:** soft-polling and tag-yourself are documented good-bait formats (substantive participation, not "comment YES"), and a self-identifying reply is near-zero friction. Trend-driven and lighter than Jake's core register, so it lives inside the ~30% experimental quota.
- **Skeleton:** [the thing or the list of types]. [pick yours / rate it 1–10]. [optional: and tell me why].
- **Hooks that fit:** The Either/Or, The Callout, Reply-Bait Question.
- **Example (Jake's voice):** "tag yourself, marketers: posts daily and tracks nothing. tracks everything and posts nothing. which one are you fixing this quarter?" · "rate your own homepage headline, 1 to 10. be honest. then tell me the number and i'll tell you the leak."
- **Don't:** drift into lazy bait ("like if you're a 10"). keep the ask substantive. don't lead the week with this — it's a change-up, not a fastball.
- **Best for:** FAQ, Tip, Commentary. Subjects: CRO, messaging, marketing archetypes.

---

## 2. Hook bank

Opening lines engineered to pull a reply. The hook earns the first three seconds; the close earns the reply. Most cards pair a hook here with a reply-bait close.

1. **Contrarian Diagnosis** — *when you can name what everyone misdiagnoses.* A confident wrong-target invites correction.
   - "your funnel isn't broken. your message is." · "most bad marketing isn't bad. it's invisible." · "you don't have a pricing problem. you have a clarity problem."
2. **The Callout** — *when you can name a behavior the reader is doing right now.* Recognition demands a reply.
   - "you're burying your best line in paragraph three." · "you optimized the button and ignored the promise above it." · "you're a/b testing the font on a sentence nobody finishes."
3. **Reply-Bait Question** — *when the whole post is the question.* Best for slow slots and pure conversation starters.
   - "what's the last line of copy that actually stopped your scroll?" · "what's a marketing 'best practice' you quietly stopped doing?" · "what number on your dashboard do you check first, and why that one?"
4. **The Confession** — *when you have a real reversal.* Vulnerability opens space for theirs.
   - "i got this wrong for years." · "i used to sell the feature. the feature was never the point." · "took me 20 years to learn the simple version was the right one."
5. **Unpopular Truth** — *when you'll plant a flag and let them swing.* Signal the stance fast.
   - "unpopular take: your brand voice is fine. your offer is the problem." · "controversial, but most 'viral' content sold nothing." · "hot take: more traffic is the most expensive way to hide a weak message."
6. **The Either/Or** — *when the answer is genuinely contested.* Forces a one-tap side.
   - "more traffic or better conversion? pick one." · "brand or performance, if the budget only covers one?" · "clever or clear? one of them sells."
7. **The Hard Number** — *when a §2 stat reframes the stakes.* Specificity is the interrupt.
   - "one client. 3 crews to 9. same market, clearer message." · "one button change. roughly 1.2 to 6.5 percent." · "20 years in. the hardest system to debug is still people."
8. **The Time-Stamp** — *when a before/after gives the claim teeth.* Time implies a story worth a reply.
   - "five years ago i'd have defended this. not anymore." · "by year three i finally stopped doing the thing everyone taught me." · "two exits later, the lesson fit in one sentence."
9. **The Blunt Imperative** — *when you want to provoke a "but what about…"* Open on the order.
   - "stop describing what you do. start naming what it costs to ignore it." · "kill the carousel. say the one line." · "delete the adjective. add the number."
10. **The Benefit-of-the-Benefit** — *when teaching the messaging exercise live.* The reframe begs to be tried in the replies.
    - "nobody wants the drill. or the hole. they want the shelf up before the in-laws arrive. what's the shelf you're actually selling?" · "they're not buying seo. they're buying showing up when it counts. say that instead."
11. **The Quiet Setup** — *when a flat, deadpan observation makes them lean in.* Understatement as a hook.
    - "marketing is mostly saying one true thing clearly. that's it. that's the post." · "the best copy i've written this year had no adjectives."
12. **The Question-Behind-the-Question** — *when you reframe what they think they're asking.* Names the real issue and asks them to confirm.
    - "you asked how to get more leads. the real question is why the ones you get don't close. which is it for you?" · "everyone asks which channel. almost nobody asks which message. which one are you stuck on?"

---

## 3. Tier index (for the dealer)

- **A (lead ~70% of draws):** Diagnosis Fragment · Hot Take + Open Floor · The Either/Or · The Quiet Confession
- **B (solid, situational):** Relatable Callout · Fill-in-the-Blank · One-Number Gut-Punch
- **C (experimental, ~30% quota):** The Rate-It / Tag-Yourself

*Why:* the A cards are proven on Threads and native to Jake; the Diagnosis Fragment is the documented hero. B cards only demand a reply once you bolt a question on, and over-use reads like a bot doing bits; the One-Number card is rationed (§2 numbers only). The Rate-It card walks closest to the engagement-bait line the 2026 algorithm demotes — keep the ask substantive, use as a change-up.

**Cross-cutting guardrails (every Threads draw):** end on a forced reply (a period is a broadcast, and broadcasts flop here). Never lazy-bait ("like if you agree," "comment YES") — 2026 demotes it. Reply fast in the first 30–90 minutes; treat your own first reply as part of the post. One idea per post, ≤500 chars, lowercase deadpan. Close on a CTA only when the post is a pitch; most Threads posts close on the reply-bait.

---

## 4. Sources

- **`content/platforms/threads.md`** — the governing spec (replies > reposts > likes, engagement velocity, the 30-min window, demoted engagement-bait, ≤500 chars, emerging polls/either-or).
- **Metricool — Threads Algorithm 2026** — the five ranking-prediction categories (like, reply, follow, profile-click, scroll-past); reply as a core signal; the demotion of obvious engagement bait; the recommendation to add questions/polls/topic tags.
- **Postory — What's Actually Working on Threads in 2026** — "if it works as a broadcast it will flop; if it works as the first line of a conversation it has a chance"; confession/uncertainty framing beats declarative takes; question posts top the chart; the X tone is wrong for Threads.
- **PostEverywhere — Threads content ideas / algorithm** — named templates (Unpopular Opinion, Either-Or, Fill-in-the-Blank, Hot Take + Ask, Soft Polling, Relatable Callouts), the conversation-velocity model.
- **Buffer — Threads Content Ideas + State of Social Media Engagement 2026** — questions generate more reach than any other content type; opinionated/stance content performs; personal story + a question over-performs.
