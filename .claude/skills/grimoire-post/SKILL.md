---
name: grimoire-post
description: >-
  Create and publish a post to The Grimoire, the blog on jakethewizard.com. Use
  whenever writing, drafting, updating, reprinting, or publishing a Grimoire or blog
  post for Jake the Wizard. Runs the full pipeline: research, draft to CONTENT_RULES,
  the voice + stop-slop gates, front-matter (including faq), build, verify, then commit,
  push, and confirm the Vercel deploy.
---

# Grimoire post

The end-to-end procedure for shipping a post to **The Grimoire** (the blog at
`/grimoire` on jakethewizard.com). This skill is the *orchestration*. The reference
material lives in the repo and must be **read, not duplicated**:

- `content/grimoire/CONTENT_RULES.md` — what a good post is (Information Gain, BLUF,
  E-E-A-T, zero-click, inimitability). **Read this first; it is the standard.**
- `content/grimoire/README.md` — the front-matter spec and how the build works.
- `VOICE_DOSSIER.md` (repo root) — Jake's voice + sourcing rules (**never invent**).

Posts are Markdown files in `content/grimoire/*.md`, compiled at build time by
`grimoire-build.js` (no framework). The site auto-deploys from `master` via Vercel.

## 0. Decide the type
- **Original / case study** (highest leverage): built on Jake's real, documented data
  (client results, TikTok numbers, Share-of-Brand-Voice measurements). Use ONLY figures
  sourced from `VOICE_DOSSIER.md` or provided by Jake. Never invent a number or a client
  story; clearly-hypothetical illustrations are fine if flagged as such.
- **Reprint / update**: an old post or any topic rebuilt current — fetch the original +
  research what changed since, then rewrite (don't paraphrase line-by-line).

## 1. Research
- Reprint/update: WebFetch the original, then search authoritative 2025-2026 sources for
  what changed. Trace every stat to a real fetched source.
- Original: gather Jake's documented numbers + the angle. For breadth, fan out parallel
  research agents (one per sub-theme) and synthesize.

## 2. Draft to CONTENT_RULES
Read `CONTENT_RULES.md` and hit the non-negotiables: one thing only Jake can say
(Information Gain); answer-first BLUF lead and every `##` opens with its answer; a
falsifiable POV; first-hand experience; ~800-1100 words; real tables/lists where they
fit. No emoji.

## 3. Write content/grimoire/<slug>.md
Front-matter (full spec in README):
- `title` (creative H1), `metaTitle` (concise SEO title, aim ≤45 chars before the
  " | Jake the Wizard" suffix), `slug` (lowercase-kebab), `date` (YYYY-MM-DD),
  `category`, `description` (~155 chars), `excerpt` (1 sentence), `lead` (the BLUF line).
- `faq:` — 4-5 answer-first Q&As phrased how people actually ask (renders the "Straight
  Answers" accordion + FAQPage schema). Use `>` block scalars for answers so quotes/colons
  stay clean.
- Optional: `youtube: <id>` (click-to-load embed); `cover:` (custom 1200×630 share image,
  else a branded card is auto-generated).
- Drop one `{{newsletter}}` token ~60% through. Add 1-2 internal links to related Grimoire
  posts or to `/eight-dominoes`.

## 4. The gate (do not skip)
1. **Information-Gain check** — is there ≥1 thing only Jake can say? If not, fix it first.
2. **Voice pass** — against `VOICE_DOSSIER.md` (diagnosis-first, fragments, numbers-as-
   adjectives, imperative CTAs, the "no spell here" close; keep his signature devices).
3. **Stop-slop pass** — run the `stop-slop` skill: NO em dashes, no "Here's the…"
   throat-clearing, cut weak adverbs + vague declaratives, vary rhythm, don't reuse the
   same closer across the batch.
4. **Transparency** — list every claim stated in Jake's name + its source for his review.

## 5. Build + verify
- `npm run build`
- Verify against `public/grimoire/`:
  - em-dash sweep: `grep -c "—" content/grimoire/<slug>.md` must be `0`.
  - FAQ + schema: post HTML has `class="grimoire-faq"` and `"@type": "FAQPage"`.
  - OG card: `public/grimoire/og/<slug>.png` exists — **Read it** to confirm it looks right.
  - JSON-LD parses (BlogPosting + BreadcrumbList + FAQPage).
- Don't name a post in ALL CAPS (those filenames are treated as docs and skipped).

## 6. CACHE-BUST GOTCHA
If you edited `grimoire.css` or `grimoire.js`, **bump the `?v=N`** in the `grimoire-build.js`
`<link>`/`<script>` refs (currently `?v=3` for css). They are served `immutable` for a year,
so without a bump users keep the stale file. (Adding a post does NOT need a bump.)

## 7. Commit + push + CONFIRM THE DEPLOY
- Stage precisely: the new post `.md` + any build/css/js changes. **Do NOT `git add -A`** —
  the repo has unrelated untracked files (brand kit, content-engine). Use `git add -u` plus
  the specific new file(s).
- Commit (`feat(grimoire): …`) and `git push origin master`.
- **DEPLOY GOTCHA:** the GitHub→Vercel webhook has dropped master pushes. After pushing,
  confirm a production deployment was actually created (Vercel MCP `list_deployments`, or
  poll the live URL). If none appears within ~1-2 min, re-trigger:
  `git commit --allow-empty -m "chore: trigger deploy" && git push origin master`.
- Confirm live: post URL → 200, OG card → 200, FAQ + schema present.

## 8. Report to Jake
Give the live URL, the share card, and a sourced list of any claims made in his name so he
can verify or correct.
