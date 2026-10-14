# Social templates: the 70s schoolhouse look

Every Jake the Wizard social visual is made from these templates. They use the website's own stylesheet (`../../../schoolhouse.css`) and art script (`../../../schoolhouse.js`), so posts match the site and the Claude Design brand kit exactly. The brand book is `../../../design-system/docs/guides/` (voice and copy, visual foundations, photos and logo, social sizes). The old parchment look (Playfair, IM Fell, wax-red, gold) is retired; don't clone the old `content/assets/*-carousel.html` decks.

## Templates

| File | Canvas | What's in it |
|---|---|---|
| `carousel.html` | 1080×1350 | Carousel slides: cover · point · list · stat · quote · photo · cta. Instagram carousel, LinkedIn document, TikTok photo post. |
| `cards.html` | 1080×1080 | Single images: static (the post's hook line) · quiet (one aphorism) · stat (one approved number) · photo (Jake + one line). |
| `story.html` | 1080×1920 | Story / Reel / TikTok / Short cover, and a one-offer promo frame. App UI covers the top 220px and bottom 380px; the frames keep text out of both. |
| `../../video/schoolhouse-reel.html` | 1080×1920 video | Stat-reveal reel: the rainbow paints on, a number counts up in a seal, a rainbow word hops in, Jake's photo switches on like an old TV, then the order. |
| `../live-badge/live-badge.html` | 540×368 loop | The TikTok LIVE corner badge (see its README). |

## Make a post

1. Clone the template **into this folder** (`content/assets/schoolhouse/<week>-<slug>.html`) so the relative paths hold. Reels: clone into `content/video/`.
2. Keep only the slide types you need. Swap the copy. Alternate `hero--flip` on consecutive slides that carry the rainbow bend, and number the page coins.
3. Pick photos (below), then render:
   - Images: `node content/assets/schoolhouse/render.js content/assets/schoolhouse/<file>.html <prefix>` writes `<prefix>-slides/<prefix>-NN.png` **and `.webp`** (TikTok photo posts take WebP or JPEG only).
   - Reels: `node content/video/render.js <file>.html <out>.mp4 9 30` (ffmpeg on PATH).
4. Look at every rendered image before it goes anywhere: text inside the frame, nothing overlapping, the right photo.
5. Host the files on a side branch for Metricool as usual. Rendered `*-slides/` folders and `.mp4`s are gitignored; never commit media to master.

## Photos: use the whole shoot, and rotate

Jake's October 2026 shoot (Nichole Gibbons) has **179 photos in 12 scenes**, indexed in `photos.json` with ready crops for every frame shape (`portrait` 4:5 for TV frames, `square`, `story` 9:16, `landscape` 16:9, `link`). The files live in the knowledgebase repo (`knowledgebase/photos/processed/`, browse `catalog.html` there); `photos.json` paths are relative to this folder.

- **Match the scene to the message.** Green wizard cloak (`cloak-butterfly`, `cloak-alley`, cloak shots in `patio` and `arcade`) for wizard-voice hooks and brand posts · `book-mural` (holding Eight Dominoes) for book posts · `arcade`, `graffiti`, `eye-mural`, `butterfly`, `rainbow-wall` for energetic hooks · `blazer`, `white-wall`, `street` for serious, B2B and quote posts · `patio` reading shots for blog and newsletter posts.
- **Rotate.** Don't reuse a photo used in the last 4 weeks (check `content/calendar/`), and don't put two shots from the same scene in one post unless it's a deliberate series. Record each post's photo ids in the week's calendar file.
- `textSpace` marks shots with empty space on one side for text; `pick` marks the photographer's favourites.
- Real photos only. Never draw, generate or cartoon Jake.

## Rules on every visual

- One idea per post; the first frame states it plainly so a stranger gets it without the caption.
- Headline in Fraunces Black ending with a full stop; one emphasised word (`.hl` highlight or `.pop.rainbow`). Add `has-hl` to a title that contains `.hl`.
- Body text at least 34px on the canvas, about 30 words per slide at most.
- Approved numbers only (CONTENT_GUIDE §2: 13 years, $100M+, 2 exits, 110K+, the client stories as "a client"). No emoji, no exclamation marks, calls to action as orders.
- The last frame carries one order and the place: @itsjakethewizard or a jakethewizard.com link.
