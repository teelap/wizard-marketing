# design-sync notes: Jake the Wizard kit (jtw-schoolhouse)

- This package is a React wrapper over the website's own CSS kit. The styling source of truth is `../schoolhouse.css`; `build.mjs` copies it verbatim into `dist/schoolhouse.css` (cssEntry) with the Google Fonts + Font Awesome @imports the site's pages load. Edit the root file, never the dist copy.
- The art geometry in `src/art.ts` is a line-for-line port of `../schoolhouse.js` (bend, arcs, burst, star, record, lightbulb). Change the art there first, then mirror it here.
- Run everything from `design-system/` (the config home). Rebuild order: `npm run build` (kit dist), then the converter. Node 24, npm 10.
- The converter skips ALL-CAPS export names, so the FAQ component is `FaqList`.
- Groups come from `docs/<Name>.md` frontmatter `category`; `guidelinesGlob` is pinned to `docs/guides/**/*.md` (the default would also copy the 48 component docs into guidelines/).
- Playwright 1.63.0 matches the cached chromium-1243 in %LOCALAPPDATA%\ms-playwright; install it into `.ds-sync` with PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1.
- Preview cells are at least 320px and clip overflow: absolutely positioned stickers need padding in their story; wide pieces are `cardMode: column` in config.
- Logo and icon art is bundled as WebP data URIs (`src/assets/`, made from `../assets/brand/masters/`). Jake's photos are NOT bundled; `PHOTOS` points at the live site (https://www.jakethewizard.com/dev_assets/photos/).

## Known render warns

- `[RENDER_THIN]` Lightbulb, Star, VinylRecord: SVG-only art with no text by design. Screenshots confirmed correct.
- `[FONT_REMOTE]` Fraunces, Nunito, Courier Prime, Permanent Marker load from Google Fonts at runtime (same as the website). Comic Sans MS and Apple Symbols are system fallbacks in the kit's font stacks.

## Re-sync risks

- `src/art.ts` can drift from `../schoolhouse.js`; diff the helpers when the site's art changes.
- `PHOTOS` URLs and alt text mirror the site's `dev_assets/photos/` (12 rainbow-wall originals + 24 face-centred 4:5 shoot crops `jake-tlapek-<scene>-<id>-portrait.webp`, added 2026-10-13); renaming or removing a photo there breaks TVFrame/Hero previews. The full 179-photo library lives in the knowledgebase repo; to add more, export the crop to dev_assets/photos, deploy, then add a `shot(...)` line.
- Approved numbers and prices live in `docs/guides/voice-and-copy.md`, `docs/*.md` and `.design-sync/conventions.md`; when CONTENT_GUIDE.md §2/§3 changes, update all three.
- Footer review capture crops the arch at the viewport; the live card is fine.
