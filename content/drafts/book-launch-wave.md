# Eight Dominoes — social launch wave

**Staged 2026-08-06. All 8 posts are DRAFTS in Metricool. Nothing publishes; Jake approves in the planner.**

The book shipped 2026-08-03 and Jake lifted the pre-launch CTA pause on 2026-08-06, so this is the first wave that names the framework and closes on "Buy the book." Buy link on every post: `https://www.amazon.com/dp/B0HD48KJGD`.

Sits *on top of* the already-staged W32 evergreen batch — the 08:00 / 09:15 reel slots are untouched, so this occupies clear ground (11:00 / 14:00 / 15:30 / 10:00 / 11:30).

## The wave

| # | When (Phoenix) | Network | Angle | Idea | uuid |
|---|---|---|---|---|---|
| 1 | Fri Aug 7, 11:00 | LinkedIn | Story | The announcement — "none of them taught me the order" + cover | `-2116343721720264722` |
| 2 | Fri Aug 7, 14:00 | X | Takeaway | The thesis — best product doesn't win | `-57210360006227396` |
| 3 | Fri Aug 7, 15:30 | Threads | Takeaway (Q close) | The thesis, lowercase register, open question | `-5994232038692206762` |
| 4 | Sat Aug 8, 11:00 | Instagram + Facebook | Announcement | Cover post, the three case studies, link in bio | `4232409690798378105` |
| 5 | Mon Aug 10, 10:00 | LinkedIn | Commentary | Domino's admitted its pizza was bad → Embracing Limitations | `5559881001348909022` |
| 6 | Tue Aug 11, 11:30 | X | Myth | $4,500 video vs $30bn Gillette — sequence beats budget | `2383465283882273738` |
| 7 | Wed Aug 12, 10:00 | LinkedIn | Story | The credential — ran it on himself, then sold the agency | `-3431485342751371511` |
| 8 | Wed Aug 12, 14:00 | Threads | Commentary | The Marty Marion endorsement | `5781118354439818448` |

**Spread check:** eight posts, eight distinct ideas. No concept repeats. Angles rotate across Story / Takeaway / Announcement / Commentary / Myth (CONTENT_MATRIX). Registers respect platform — LinkedIn sentence case and structured, Threads and Instagram lowercase, X compressed under 280.

## QA gate

- **Voice** — diagnose-before-sell openers, two-beat sentences, first person singular, imperative closes. Wizard imagery deliberately absent: this is the one subject where the substance *is* the brand, so decoration would cheapen it.
- **Stat bank** — every figure from the media kit and now in CONTENT_GUIDE §2: 223 pages, seven years, $4,500, $30bn, 30 brands, thirty years (Marion). No "three continents," no "Fortune 500 boardrooms," nothing invented.
- **Banned** — no emoji, no exclamation marks, no "Get the truth," no jargon, no fake urgency, no hedging.
- **Format** — each executed its dealt structure rather than running flat: #1 and #7 are origin-story arcs, #5 is a case-study teardown with the lesson last, #2/#6 are compressed claim-plus-turn, #4 is the announcement with proof stacked.
- **Stop-slop** — no "isn't just X, it's Y," no hollow openers, no rule-of-three padding, no "in today's landscape."

## Media

Cover hosted via the proven transient side-branch pattern: `assets/book-launch` → `raw.githubusercontent.com`. Metricool copied it to its own CDN on create (confirmed — the returned `media[]` is a `static.metricool.com` URL), so **the branch is safe to delete**:

```bash
git push origin --delete assets/book-launch && git branch -D assets/book-launch
```

> ⚠️ **Cover correction, 2026-08-06.** The first pass used the cover art bundled in
> `eight-dominoes-media-kit.zip`, which turned out to be a **stale render** — flat black
> title lettering. Jake caught it. The real cover has raised 3D lettering and a dotted
> rule under the title; source of truth is `8 Dominoes front Cover_Final_CROP_rgb.jpg`
> (1863 × 2772, RGB). Posts 1 and 4 were re-uploaded with the correct art (their uuids
> are unchanged), and every site asset, the OG card, the `press/` downloads and the
> media-kit zip were regenerated from the final file. **If any other artefact was built
> off that zip, it has the wrong cover.**

## Not covered — needs Jake

- **TikTok, YouTube, Instagram Reels** carry no book post in this wave. They require video, and per the standing arrangement Jake films and posts his own reels. A launch-week talking-head — "I wrote a book, here's the one idea in it" — is the single highest-value gap left.
- **The Eight Dominoes YouTube series** (one Domino per episode) is now unpaused in `content/formats/youtube.md` and is the highest-converting format available. Nothing scheduled yet.
- **A carousel** of the eight moves for LinkedIn doc / Instagram would be a natural second wave; the carousel-render pipeline already exists in `content/assets/`.
