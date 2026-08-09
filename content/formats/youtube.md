# Format & Hook Library — YouTube

**Version:** 1.0 · 2026-06-15 · the format deck for YouTube (@itsjakethewizard, ~979 subs). The SEARCH + AUTHORITY bet — long-form ranks for buyer queries; Shorts feed off TikTok; the dormant **Hold My Beard** two-host news-riff is the discovery engine to revive video-first.
**Reads with:** [platforms/youtube.md](../platforms/youtube.md) (cadence/algorithm/specs — every "why it works" anchors there) · [README.md](README.md) (schema, tiers, dealing rules) · [CONTENT_GUIDE](../CONTENT_GUIDE.md) · [VOICE_DOSSIER](../../VOICE_DOSSIER.md) · [CONTENT_MATRIX](../CONTENT_MATRIX.md).

> **The unit of YouTube is not the video. It's the packaging.** Title + thumbnail get optimized as one object before a single beat is scripted — half these cards are packaging cards for that reason. Great script behind flat packaging never gets the click; great packaging on an empty video gets the click and tanks the satisfaction score. Deal both. Voice rules hold: no emoji in titles/scripts, no exclamation marks, no em-dashes, diagnosis-first, numbers only from CONTENT_GUIDE §2 (never first-person invented), in-world CTAs. Nerd/pop-culture title humor is allowed (VOICE_DOSSIER #13) as long as the search keyword survives.

---

## Scoreboard notes — live tuning (emphasis only, no tier moves)

> From `content/reviews/`. Emphasis annotations, not tier moves (small-N rule: a card needs ≥3 uses AND ≥2 weeks, or a clean ≥2× pattern). Low confidence; re-test next week.

- **W31 (first YouTube note — and it is a measurement note, not a content one).** `getScheduledPosts` confirms **7 Shorts published this week** (`Ful3jkWpmzU`, `E5W9I5wsUQA`, `eWMpdmR5-VU`, `B-NDelPhiA0`, `CyKalr4yEzI`, `NyBCbrt7Gq8`, `ZTqQm3hNzm0`) — all of them Jake's own reels riding the multi-network cross-post. The `BSPO` analytics connector returned **one** YouTube row (3 imp). **Six of seven published Shorts are invisible to this review, for the second consecutive week.** Nothing in this file can be tuned on evidence until that closes: **YouTube is currently unmeasured, not underperforming — do not read its silence as failure.** Escalated to Jake (W31 review §6.7).
- **W32 — the reporting gap went total, and it is Jake's connector, not Metricool.** `getScheduledPosts` confirms **4 Shorts published** with real video IDs (`VJ47Qs9S-KU`, `6pJprjEPmzk`, `OQcRJ-5GrDs`, `ezlBi4mfPnE`), every one returned by the API as `PUBLISHED`. The `BSPO` analytics connector returned **0 YouTube rows** — W31 reported 1 of 7, W32 reports **0 of 4**. Decisive new evidence on where the fault sits: the **YouTube *competitor* connector works fine this week** (`YTCO` returned 9 accounts with subscriber, video and view counts), so YouTube reporting is not down brand-wide — **it is Jake's own connected channel that is not returning post-level analytics.** Still a measurement gap this routine cannot close from inside Metricool; escalated to Jake for a reconnect or an outside YouTube Studio / GA4 pull. **Three weeks in, no card on this page has ever been scored.** *(W32 review §5)*
- **W31 — all four dealt Shorts never published.** The video spine dealt YouTube Shorts on Tue / Thu / Fri / Sat (`how-often-should-i-post-for-seo`, `setting-up-an-a-b-test`, `what-marketing-metrics`, `value-proposition`); every one sat in drafts with a passed date. **No card on this page has ever been scored against real data.** The Shorts-feed-off-TikTok bet remains untested rather than disproven. *(W31 review §2.0)*

---

## 1. Format cards

### The Search-Intent Long-Form — Tier A
- **What:** an evergreen long-form video that answers a buyer query, target keyword in the first 5 title words.
- **Why it works here:** long-form is where authority + CPM live and YouTube **Search** rewards keyword-first titles (per youtube.md); satisfaction/post-watch behavior now outranks raw watch time, so a clear promise kept = ranking. AVD is scored as a percentage (a 10-min video watched 7 min outranks a 30-min watched 8) — so a tight 15-min answer beats a padded 30.
- **Skeleton:** title = "[keyword] — [specific promise]" · thumbnail = one subject + expressive face, ≤4 words, two bold colors · 0–30s = the diagnosis + the promise (no logo, no "hey guys") · chapters = the framework in steps · proof beat (a client story, stat-bank only) · pattern interrupt every ~90s · CTA = consulting / the blog / the newsletter, or the book "Buy the book" (CTA live, CONTENT_GUIDE §3). Chapters required >20 min.
- **Hooks that fit:** how-to/search title, the reframe, the number cold-open.
- **Example (Jake's voice):** title: "TikTok SEO — how to rank a new post on Google fast." thumbnail: "RANK FAST" + Jake's face. First line: "everyone's posting. almost nobody's ranking. here's the difference."
- **Don't:** a clever title with no keyword in the first 5 words. Don't bury the promise past 30s. Don't pad to hit 30 minutes — percentage-watched punishes it.
- **Best for:** Method, FAQ, Myth.

### Need It or Yeet It — Tier A
- **What:** the verdict format. One subject (a tactic, tool, KPI, trend) held up and judged keep-or-kill, with the reasoning. Jake's real episode title — make it a recurring long-form or Short.
- **Why it works here:** a binary verdict is a curiosity gap **Search** and **Browse** both reward, and the post-watch "was this worth your time" survey rewards a clear answer delivered. Naming it makes a *series* — Browse personalizes by watch-history clusters, so a repeated, recognizable shape compounds. It's Jake's documented nerd-humor voice (VOICE_DOSSIER #13), so it sounds like him before a word is scripted.
- **Skeleton:** title = "Need It or Yeet It — [the thing]" · thumbnail = the thing + Jake's face mid-verdict + a literal KEEP/KILL split, ≤4 words · 0–15s = name the thing, state the stakes, promise a verdict · the case for · the case against · the verdict + the one condition that flips it · CTA. Works at 15–35s (Short) or 8–15 min (long-form).
- **Hooks that fit:** the verdict cold-open, contrarian claim, the callout.
- **Example (Jake's voice):** title: "Need It or Yeet It — daily posting." First line: "everyone says post every day. i'm going to tell you when that's a mistake." Verdict beat: "keep the cadence. yeet the idea that volume is the strategy. volume without a sequence is just noise."
- **Don't:** sit on the fence. A verdict format with no verdict reads as theory — the one thing his voice bans. Don't yeet something just for the bit; the call has to be honest.
- **Best for:** Commentary, Takeaway, Myth, Pitfall.

### The Diagnosis Cold-Open (Shorts) — Tier A
- **What:** a 15–35s Short: a 1–2s diagnostic hook, one point taught, a loop or single CTA. The cheap feeder mirrored from his TikTok hits.
- **Why it works here:** the **Shorts** feed is decoupled from long-form and judged on viewed-vs-swiped (~75%+ is the push threshold) and loop rate — decided in the first 0.5s. A diagnosis is a pattern interrupt: it names the viewer's problem before they swipe. Shorts now surface in **Search**, so the caption/title carries the keyword.
- **Skeleton:** 0–2s = the diagnosis line on screen + spoken (no intro) · 2–25s = the one thing, once, concretely · last beat = a line that loops back to the first OR one CTA, never both · caption = keyword-first, lowercase. 9:16, 1920×1080.
- **Hooks that fit:** the reframe, the callout, number cold-open, blunt imperative.
- **Example (Jake's voice):** on-screen 0–2s: "your headline names your service. that's the mistake." Spoken: "nobody buys the service. they buy the wound it closes. rewrite the headline as the wound. watch what happens." Loop line: "name the wound, not the service." Caption: "messaging tip: write the wound not the service #marketing #copywriting"
- **Don't:** a slow runway, a logo sting, or "hey guys." Don't teach two things — one Short, one point. Don't end on both a loop and a CTA; pick one.
- **Best for:** Tip, Pitfall, Myth, FAQ.

### The Clip-from-the-Pod — Tier A
- **What:** a self-contained 2–8 min long-form clip (or <60s Short) cut from a Hold My Beard episode or a live, posted on the **main** channel. One filmed session = 1 long-form + 5–10 clips.
- **Why it works here:** highest leverage for his limited native capability (youtube.md format rank #1) and clips are the documented discovery engine for video podcasts — the first interaction a new viewer has before committing to the full episode. Posted on the main channel (not a clips channel) so the watch-history cluster compounds. Each clip is re-packaged as its own object with its own title + thumbnail.
- **Skeleton:** pick a moment that stands alone · re-cut so the first 1–2s is the sharpest line, not the lead-in · title = the claim as a curiosity gap or verdict · thumbnail = the two hosts OR the one claim, ≤4 words · keyword in caption · end on the punchline, hard cut, no trail-off.
- **Hooks that fit:** contrarian claim, the verdict cold-open, news-react, the callout.
- **Example (Jake's voice):** clip title: "We ranked every social platform for marketers. One surprised us." First line (re-cut to lead): "everyone defends the platform they're already on. so we ranked them cold." Short caption: "we ranked social platforms for marketers and one was underrated #marketing #social"
- **Don't:** post the moment with its original throat-clearing lead-in. Don't let the clip end mid-thought. Don't dump raw clips with no per-clip packaging — that's a dump, not a funnel.
- **Best for:** Commentary, Story, Takeaway, FAQ.

### Hold My Beard (Video-First Revival) — Tier B
- **What:** the two-host marketing-news riff — Jake + co-host reacting to the week's marketing/SEO/AI news with timestamps and jokes. Revived built-for-video, not audio-repurposed.
- **Why it works here:** video podcasts are the default discovery format (youtube.md "Emerging"), and YouTube is now the #1 service for podcast consumption — a show appears in **Suggested** and **Search** where an audio-only feed never would. The chaptered, timestamped, two-host shape is itself the retention engine (a topic switch every few minutes is a built-in pattern interrupt). It's his existing format (31+ episodes), so reviving beats inventing. Tier B because it needs a second person and a filmed session.
- **Skeleton:** title = the week's biggest story as a curiosity gap or verdict (keyword-first) · thumbnail = both hosts + the one story prop, ≤4 words · 0–30s = cold-open on the spiciest take, then "here's what we're getting into" · chaptered news blocks (one story = one chapter, timestamps in description) · a verdict or takeaway per block · CTA. Cut 5–10 clips after (feeds The Clip-from-the-Pod).
- **Hooks that fit:** news-react, contrarian claim, the verdict cold-open.
- **Example (Jake's voice):** title: "Reddit is changing marketing forever — what we'd actually do about it." First line: "google's putting reddit threads at the top of everything. so the question isn't is it real. it's what you do monday." Chapter verdict: "stop treating reddit like a billboard. it's a conversation you have to earn. earn it."
- **Don't:** record audio-first and slap a static frame on it — youtube.md is explicit: revive it video-first. Don't let the riff wander off the news into theory. Don't skip the timestamps; chapters are the retention mechanic.
- **Best for:** Commentary, Myth, Takeaway (Hold My Beard mode is the home of marketing-news commentary).

### The Eight Dominoes Series — Tier B `BOOK-SPECIFIC — LIVE, launch window open`
- **What:** a named, numbered long-form series — one Domino per episode (01 Core Attraction → 08 The New Opportunity). The book, taught one piece at a time. **Unpaused 2026-08-06** now that the book has shipped (CONTENT_GUIDE §8) — this is the format that most directly converts to a sale, so it's the highest-value thing to run during the launch window. Use the canonical names verbatim; never paraphrase them.
- **Why it works here:** youtube.md names this directly, and **Browse** personalizes by watch-history clusters — a numbered series trains the cluster and pulls the binge (each episode is a Suggested rec for the next). Ties the back catalog to the July book launch. Tier B because it only works as a committed run — a single orphaned episode wastes the series mechanic.
- **Skeleton:** title = "Domino [N]: [canonical name] — [the promise]" (keyword in the promise half) · thumbnail = the domino number + the one idea, consistent series template, ≤4 words · 0–30s = the diagnosis this Domino fixes + where it sits in the sequence · the framework for that Domino, in steps (chapters) · a proof beat (stat-bank or composite client story) · CTA = **"Buy the book"** → `https://www.amazon.com/dp/B0HD48KJGD` (CONTENT_GUIDE §3), link in description and pinned comment · end-screen to Domino N+1.
- **Hooks that fit:** the reframe, number cold-open, the callout.
- **Example (Jake's voice):** title: "Domino 02: Attention Catalyst — the hook that earns the first three seconds." First line: "you have three seconds. your intro is spending them on your logo. let's fix the order." Proof beat: "one retailer changed a single button from 'register' to 'continue as guest.' it was worth three hundred million dollars in a year. the hook was the sequence, not the spend."
- **Don't:** teach the Dominoes out of order or paraphrase the canonical names (CONTENT_GUIDE §8 locks the wording). Don't make episode one and quit — the series is the asset, not the episode.
- **Best for:** Method, Pitfall, Story, Takeaway.

### The "X Is Lying" Contrarian — Tier B
- **What:** a packaging card. A confrontational title that names a popular belief or a category and calls it dead/lying/wrong, with the honest reframe inside.
- **Why it works here:** contrarian framing is a documented curiosity-gap formula that lifts CTR on **Browse/Suggested**, and it's Jake's core "truth-teller against the industry" positioning (VOICE_DOSSIER #8). The satisfaction survey is the guardrail — the video must earn the claim or post-watch behavior tanks it. Tier B, not A: it burns trust if the take is hollow, so it's situational.
- **Skeleton:** title = "[popular belief] is [dead / a lie / wrong] — here's what actually [works]" OR "stop [common action] if you want [outcome]" · keyword still in the first 5 words · thumbnail = Jake unimpressed + the myth struck through, ≤4 words, two bold colors · 0–30s = state the claim, then immediately concede the grain of truth (so it reads as honesty, not bait) · the reframe + the proof · CTA.
- **Hooks that fit:** contrarian claim, the callout, the reframe.
- **Example (Jake's voice):** title: "Your rebrand is a lie — what slow sales actually mean." thumbnail: "NOT THE LOGO." First line: "a new logo feels like progress. that's why it's the most expensive way to avoid the real problem." OR title: "Stop chasing followers if you want revenue." First line: "anyone can get likes, hearts, shares, and clicks. none of them paid an invoice."
- **Don't:** clickbait a claim the video doesn't pay off — satisfaction scoring punishes the unkept promise harder than a weak title ever did. Don't pick a fight you can't reframe into something useful.
- **Best for:** Myth, Commentary, Pitfall.

### The Number Listicle — Tier C
- **What:** a packaging card. A counted-list title ("[N] [things] that [outcome]") over a chaptered long-form or a fast Short.
- **Why it works here:** the numbered-list formula is one of the highest-CTR title patterns and the count sets an explicit completion promise that the AVD-as-percentage system rewards when kept. Each item is a natural chapter (chapters lift AVD 12–18%). Tier C for Jake specifically: it's the most generic, most-copied YouTube shape, so it risks reading like the marketing-bot voice he bans — use it sparingly, make the items sharp, or it flattens.
- **Skeleton:** title = "[N] [specific things] that [specific outcome]" (keyword in the things) · thumbnail = the number, big, + one face/prop, ≤4 words · 0–15s = the promise + why these N and not the usual list · one chapter per item, each a clean diagnosis → fix · CTA. Keep N small (3–5); a tight 3 beats a padded 10.
- **Hooks that fit:** number cold-open, the callout, blunt imperative.
- **Example (Jake's voice):** title: "3 messaging mistakes quietly killing your conversion rate." First line: "not the obvious ones. the three that look fine and still cost you the sale." Item one: "one. you're describing the service. nobody's buying the service."
- **Don't:** inflate the count to chase a round number — padding tanks percentage-watched and reads as filler. Don't let it become a generic "X tips" video with no diagnosis per item. No stat in an item unless it's from CONTENT_GUIDE §2.
- **Best for:** Method, Pitfall, Tip.

---

## 2. Hook bank

Title formulas + the opening line (first 1–2s on a Short, first 30s on long-form). Never run the same archetype back-to-back.

- **How-to / search-keyword title** — *when the video answers a buyer query and ranking is the goal.* Keyword in the first 5 words. "TikTok SEO — how to rank a new post on Google fast." · "DSP advertising — how to show up everywhere without wasting spend." · "How to measure Share of Brand Voice (the metric most owners ignore)."
- **The verdict cold-open** — *when one thing is judged keep-or-kill.* "Need it or Yeet it — marketing KPIs." Opening line: "everyone tracks this. almost nobody should. here's the call."
- **Contrarian claim ("X is dead / X is lying")** — *when conventional wisdom is the thing to puncture.* "SEO isn't dead. Your strategy is." · "Your rebrand is a lie." Opening line: "this is going to cost me some followers. say it anyway."
- **Number cold-open** — *when a count sets the promise.* "3 messaging mistakes quietly killing your conversion." Opening line: "three. not ten. the three that actually move revenue."
- **The callout ("you're doing X and calling it Y")** — *when the viewer is mislabeling their own mistake.* Short 0–2s: "you call it a branding problem. it's a sequence problem." · "you're posting. you're not ranking. those aren't the same thing."
- **The reframe ("X isn't the problem. Y is.")** — *his signature two-beat, the diagnosis-first engine.* "Your product isn't the problem. Your sequence is." · "It's not a traffic problem. It's a conversion problem." · "The logo was never the problem."
- **News-react** — *when a marketing/SEO/AI story is moving (Hold My Beard mode).* "Reddit is changing marketing forever — what we'd actually do." Opening line: "google just put reddit at the top of everything. here's what changes monday."
- **The insider reveal ("what X knows that you don't")** — *when positioning a method as earned-in-the-trenches knowledge.* "What 13 years in the trenches taught me about slow sales." · "What agencies know about your messaging that they won't tell you."
- **Blunt imperative** — *when the takeaway is one action, today.* "Stop describing. Start diagnosing." · "Rewrite your headline as the wound. Ship it." Lands best as a Short's 0–2s on-screen line.
- **The pop-culture title (nerd humor)** — *when the subject can carry a wink and still keep its keyword (VOICE_DOSSIER #13).* "Yer a Hero, Harry — the customer's hero journey." · "Oops, All SEO — fixing a site that won't rank." The keyword survives the joke, or the joke is cut.
- **The stakes cold-open (cost of inaction)** — *when inaction is the real enemy; frames loss, not upside.* "every week you wait, the gap compounds. let me show you the math." · "this mistake doesn't crash your numbers. it quietly bleeds them. that's why nobody catches it."
- **The composite-client story open** — *when a lesson lands harder as a scene* (composite allowed; never invent a number or named client — CONTENT_MATRIX §3). "a founder called me convinced he needed more traffic. he had plenty. he had a conversion problem." (Pay off only with stat-bank numbers, e.g. ~1.2% → 6.5%, framed as "a client.")

---

## 3. Tier index (for the dealer)

- **A (lead ~70% of draws):** Search-Intent Long-Form · Need It or Yeet It · Diagnosis Cold-Open (Shorts) · Clip-from-the-Pod
- **B (solid, situational):** Hold My Beard Revival · Eight Dominoes Series · "X Is Lying" Contrarian
- **C (experimental, ~30% quota):** Number Listicle

*Why:* the A cards are proven on YouTube (keyword-first search ranking, curiosity-gap verdicts, the ~75% viewed-vs-swiped Shorts threshold, clips as the podcast discovery engine) and native to the search/authority bet — two of them are repurposing engines (Shorts mirror + pod clips) that match his limited native capability. The B cards each need a commitment (a filmed session with a second host, or a sustained numbered run) or carry trust risk (the contrarian) — central to the brand, B on effort/risk, not fit. The Number Listicle is the most generic shape on the platform — high CTR, closest to the bot voice Jake bans — so it earns a slot to keep the deck varied and feed the scoreboard, but must clear the voice pass every time.

**Spread:** long-form and Shorts are both represented in Tier A, so the search asset and the cheap feeder both have proven shapes to deal.

> **Research note (worth refreshing in platforms/youtube.md later):** that file cites "Shorts 70B+ daily views"; current 2026 sources say ~200B. Not load-bearing for these cards. Also useful for the scoreboard: **Test & Compare** title A/B is live globally — run 3 title/thumbnail variants per long-form (needs ~1,000+ impressions) and feed the winner's pattern back into this deck.

---

## 4. Sources

- **`content/platforms/youtube.md`** — per-surface algorithms, satisfaction > watch time, keyword-first titles, packaging, chapters, Test & Compare (primary anchor).
- **OutlierKit / SocialPilot / vidIQ — YouTube Algorithm 2026** — five separate ranking systems; AVD as percentage; CTR relative to channel baseline; Shorts decoupled (swipe-through/loop/first-0.5s); Browse personalizes by watch-history clusters.
- **OpusClip / virvid — Shorts hook formulas & retention 2026** — 2–2.5s hook delivery; 15–35s length; viral Shorts ~76% retention; >75% viewed-vs-swiped = ~3x more likely to be pushed; text overlays for sound-off viewing.
- **Overseeros / Humble & Brag / tubics — YouTube title formulas & packaging 2026** — 12 title templates; front-load keyword in first 5 words; title–thumbnail complementarity ("one promise + one face + one prop + two bold colors + ≤5 words").
- **Storyy / InfluenceFlow — long-form structure 2025–2026** — 15s hook → 65% retention; pattern interrupt every ~90s; chapters → 12–18% higher AVD; Hook→Problem→Solution→CTA.
- **Castos / Podbean — video podcasts 2026** — video-first as default discovery; YouTube = #1 podcast service; 5–10 clips/episode as the discovery engine on the main channel.
- **Search Engine Journal / Influencer Marketing Hub — Test & Compare** — up to 3 titles/thumbnails per video, optimizes for watch time, winner auto-promoted.
