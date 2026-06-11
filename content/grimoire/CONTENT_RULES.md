# The Grimoire — Content Rules

How we write posts that win the 2026 search landscape (AI Overviews, E-E-A-T,
Information Gain, zero-click). Pairs with the **voice gate** (`VOICE_DOSSIER.md`)
and the **stop-slop pass**. Research + sources at the bottom.

---

## The one rule everything else serves

Generic "great content" is dead. Google and the AI layers on top of it now answer
most questions in place, so a post that re-explains what already ranks is invisible.
**Win by publishing what an AI cannot reproduce** — Jake's proprietary data, lived
experience, named frameworks, and a sharp point of view. Be the source the machine
**cites**, not the summary it replaces.

> 68% of US searches now end with zero clicks; AI Overviews cut click-through ~60%
> where they appear. The game is being cited + capturing the audience, not the click.

---

## Non-negotiables — every Grimoire post must have

- [ ] **One thing only Jake can say** (Information Gain): a proprietary number, a real
  client result, a first-hand "here's what happened," or a named framework. If the
  whole post is already on page one of Google, don't publish it.
- [ ] **The answer up front** (BLUF): the bottom line in the first 1-2 sentences (the
  `lead:`), and every `##` section opens with its answer before the explanation.
- [ ] **A clear, falsifiable point of view** attached to Jake's name — not a balanced explainer.
- [ ] **First-hand experience on the page**: "across 20 years, 2 exits, $100M in client
  results, here's what I saw." Specifics only a practitioner knows.
- [ ] **4-5 FAQ entries** (`faq:` front-matter), phrased the way people actually ask.
  These get schema'd and are prime AI-extraction targets.
- [ ] **Cleared the gates**: voice pass + stop-slop pass.

---

## 1. Make it inimitable (Information Gain)

Google's Information Gain patent scores how much *new* info a page adds beyond what
the reader has already seen. Aim for 10-40% net-new vs. the current top results.
Hit at least two:

- [ ] **Original numbers** — Jake's client results, his TikTok growth data, a Share-of-
  Brand-Voice measurement. Pages with original stats/data earn far more AI citations.
- [ ] **A named framework** — tie to or coin one (Eight Dominoes, Share of Brand Voice).
  Named IP is quotable and un-scrapeable.
- [ ] **A counter-narrative** — challenge an industry "best practice" with Jake's evidence.
- [ ] **Dated specificity** — "as of June 2026," exact figures, real tool names. AI can't fabricate it.
- [ ] **A first-hand test or story** — "I ran this. Here's what broke."

---

## 2. Structure it answer-first (BLUF + semantic chunking)

Built for the human skimmer *and* the AI parser (answer-first content is cited far more often):

- [ ] **Lead with the conclusion.** First paragraph = the takeaway. No "in today's
  landscape" runway. The `lead:` field should be the actual bottom line.
- [ ] **Every `##` opens with its answer**, then evidence, then implication.
- [ ] **One idea per section.** Each section must make sense lifted out of context — name
  the subject, don't lean on "it/this" pointing somewhere else on the page.
- [ ] **Question-style headings** that mirror how people search ("Why X beats Y", "How to measure Z").
- [ ] **Tight chunks**: sections ~150-300 words, paragraphs 2-4 sentences.
- [ ] **Use extractable formats**: a comparison → a real Markdown table; steps/rank → a
  numbered list; a parallel set → bullets. They render as real `<table>`/`<ol>`/`<ul>`,
  which is what AI lifts.
- [ ] **Machine-quotable sentences**: declarative, one fact each, specific numbers, no "see above."

---

## 3. Prove the experience (E-E-A-T)

Trust is the load-bearing signal, and the March 2026 core update specifically amplified
first-hand **Experience**. The build supplies author identity automatically; the writer
supplies the substance.

- **Experience** — open or anchor with a real account; reference actual client situations.
  (Never fabricate a client story. Clearly illustrative/hypothetical is fine.)
- **Expertise** — back claims with data; cite primary sources inline. The post carries a
  visible date + the "By Jake the Wizard" byline.
- **Authoritativeness** — make the post the thing others cite. Branded mentions correlate
  with AI-Overview visibility far more than backlinks. Repurpose to TikTok/LinkedIn to pull
  branded search back.
- **Trust** — cite, date, link out; never an unsupported claim. (HTTPS, Person/Org schema,
  byline = handled by the build.)

---

## 4. Formats that win (pick the most inimitable that fits the topic)

1. **Original research / case study** — Jake's proprietary data or a documented before/after.
   Highest leverage; earns links + citations. **Our biggest untapped moat.**
2. **Expert-infused teardown / opinion** — hands-on, "I tested it," a strong take. Demonstrates Experience.
3. **Named-framework explainer** — build the post around Eight Dominoes / Share of Brand Voice / a new coined model.
4. **Interactive tool / calculator** — when the topic involves math or self-diagnosis (ROI,
   audit score). A linkable asset AI can't reproduce. *(Future: the build can host a static calculator.)*
5. **Structured hub** — a long-form pillar with headings, a table, an FAQ, later video/infographic. Consolidate, don't fragment.

Avoid: generic "what is X / how to Y" with no data, POV, or experience — that's AI-Overview fodder.

---

## 5. Write for zero-click (cite + capture)

Most readers never click through. Win anyway:

- [ ] **Optimize to be quoted** — a clear, correct, well-chunked page is what AI cites as the source.
- [ ] **Capture the audience** — every post funnels to the newsletter (the in-post CTA does this).
  The email list is the owned asset; rented reach is not.
- [ ] **Repurpose to drive branded search** — turn the post into TikTok/LinkedIn so people later
  search "Jake the Wizard." Branded queries (~44% of search) still convert; informational ones leak to AI.

---

## 6. What the build handles vs. what you write

**Automatic (handled by the build):** concise SEO `<title>`, meta description, canonical,
OpenGraph + Twitter card, the 1200×630 share card, `BlogPosting` + `BreadcrumbList` + (with
`faq:`) `FAQPage` JSON-LD, the author byline + Person identity, sitemap + RSS, internal
cross-links, server-rendered HTML (AI crawlers can read it; they don't run JS).

**You supply (front-matter + body):** `title`, `metaTitle`, `description`, `excerpt`,
`lead` (the BLUF line), `category`, `faq:` (4-5 Q&As), and a body that follows rules 1-5.

---

## The gate (pre-publish)

`draft` → **Information-Gain check** (≥1 thing only Jake can say?) → **BLUF/structure check**
(answer-first, chunked, FAQ present?) → **voice pass** (`VOICE_DOSSIER`) → **stop-slop pass**
→ approve → publish.

---

## Reference — whose read on Google we trust (2026)

Lily Ray, Glenn Gabe, Cindy Krum, Aleyda Solis, Marie Haynes, Kevin Indig — plus the primary
source, **Google Search Central** + the **Quality Rater Guidelines**.

**Research sources:**
- BLUF + semantic chunking: outpaceseo.com, impulsecreative.com, hawksem.com, searchengineland.com/guide/content-chunking-seo
- Zero-click + inimitability (Rand Fishkin / SparkToro): sparktoro.com/blog/inimitable-product-is-the-new-make-great-content, sparktoro.com/blog/zero-click-search-what-still-works
- Content types + Information Gain + E-E-A-T: molecularcloud.org, 12amagency.com, backlinko.com/information-gain, searchenginejournal.com (info-gain patent), seo.com (E-E-A-T)
- What Google wants 2026: lilyray.nyc/the-top-10-experts-..., Google "creating helpful, reliable, people-first content," Google 2022 E-E-A-T announcement

_Last compiled: 2026-06-11._
