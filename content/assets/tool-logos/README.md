# Tool logos

The company logos on `/tools`, redrawn in the schoolhouse style: one flat brand colour, an ink outline and a hard ink shadow, like the six illustrated icons. They sit in the paper coin at the top of each card.

- `marks.json`: each tool's mark (path data, colour token, tight bounds).
- `build.js`: draws `dev_assets/tools/<slug>.svg` from `marks.json`. Run `node content/assets/tool-logos/build.js` after any change; `test/tool-logos.test.js` fails if the SVGs are stale.

## Adding a tool

1. Find the company's mark (the symbol, not the wordmark) as an SVG path. Try Simple Icons first, then Iconify (`api.iconify.design/search?query=<name>`), then the company's own site.
2. Add it to `marks.json` with a colour from the brand palette nearest the company's own colour. Black-and-white brands use `paper`. Several parts can each take their own colour (see SparkToro).
3. Compute `bbox` as `[minX, minY, maxX, maxY]` of all parts (the `svg-path-bbox` package does this).
4. Run `build.js`, then add the card to `tools.html` with `<span class="svc-icon svc-icon--logo"><img src="/dev_assets/tools/<slug>.svg?v=1" ...></span>`. Bump `?v=` when a logo changes, because SVGs are cached for a year.

## Where each mark came from (2026-10-15)

- Simple Icons: Buffer, Hotjar, Google Search Console, Claude, Notion, Loom, Calendly, HubSpot.
- Iconify sets: Beehiiv (thesvg), Riverside.fm (selfh.st), Descript and Zapier (logos), Canva (boxicons), Ahrefs (thesvg), ChatGPT (Remix Icon's OpenAI mark).
- The companies' own sites: Klaviyo (the flag from their header logo), SparkToro (their four-piece favicon).
- Rebuilt by hand from their favicons, because no clean vector exists: ActiveCampaign (the chevron), Search Atlas (the compass star), Hemingway Editor (the H and cursor), PostPixel (the five pixels).

The logos are the companies' trademarks, used here only to name the tools Jake recommends.
