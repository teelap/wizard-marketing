# The Grimoire — how to add a post

Every essay in The Grimoire is one Markdown file in this folder
(`content/grimoire/`). Drop a new `.md` file here, run `npm run build`, and the
post page, the hub listing, the RSS feed, and the sitemap entry are all
generated automatically — styled, SEO-ready, and on-brand.

## Front-matter (the bit between the `---` lines)

```yaml
---
title: "Your headline here"          # required
slug: your-url-slug                  # optional (defaults to the filename)
date: 2026-06-11                     # required — YYYY-MM-DD
updated: 2026-06-20                  # optional — last-edited date
category: Brand Strategy             # optional (defaults to "Marketing")
description: "150-ish char summary for Google + social previews."
excerpt: "One or two sentences shown on the Grimoire hub card."
lead: "An italic standfirst line shown above the article body."
cover: dev_assets/some-image.png     # optional cover image (relative path)
youtube: dQw4w9WgXcQ                 # optional — embeds that video, click-to-play
readMinutes: 6                       # optional — otherwise auto-estimated
draft: true                          # optional — hides it from the build
---
```

Only `title` and `date` are truly required. Everything else has a sensible
default.

## The body

Write in plain Markdown below the second `---`. Headings (`##`, `###`), **bold**,
*italic*, lists, > blockquotes, links, and images all work and are styled for you.

- Type `{{newsletter}}` on its own line to drop the email sign-up box right there
  (mid-article CTAs convert best). One is also added at the end automatically.
- For a centered pull-quote, use raw HTML: `<p class="pullquote">Your line.</p>`

## Drafts

Set `draft: true` to keep a post out of the live build. To preview drafts
locally, build with `GRIMOIRE_DRAFTS=1 npm run build`.
