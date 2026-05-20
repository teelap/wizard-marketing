# wizard-marketing

[![CI](https://github.com/teelap/wizard-marketing/actions/workflows/ci.yml/badge.svg)](https://github.com/teelap/wizard-marketing/actions/workflows/ci.yml)
[![CodeQL](https://github.com/teelap/wizard-marketing/actions/workflows/codeql.yml/badge.svg)](https://github.com/teelap/wizard-marketing/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Static marketing site for **Jake Tlapek — The Wizard of Marketing**, author of *Eight Dominoes*. Served as plain HTML/CSS/JS; a small Node build step optionally injects the latest YouTube and TikTok embeds into placeholder containers.

Live: <https://www.jakethewizard.com/>

---

## Stack

- HTML / CSS / vanilla JS
- GSAP + ScrollTrigger for animations (loaded from CDN, deferred)
- Font Awesome 6 (CDN)
- Google Fonts (Playfair Display, IM Fell English)
- Formspree for contact + email-capture forms
- Node 20 build step for feed injection

No bundler. No framework. Ship the files.

## Prerequisites

- Node.js `>=18.0.0` (a `.nvmrc` pinning Node 20 is included)
- `npm`

## Local development

```sh
npm install
npm run serve        # serve the static site on http://localhost:4173
```

For live edits, just edit the files and refresh — there's no build watcher.

## Build (optional feed injection)

The build step is only required when the page contains `youtube-feed-container` / `tiktok-feed-container` divs. The current page does not include them, so `npm run build` will warn and exit cleanly.

```sh
cp .env.example .env # then edit if you want to override defaults
npm run build        # tolerant: warns if targets are missing
npm run build:strict # fails the build if targets are missing
```

### Configuration

All settings can be overridden with environment variables (see [`.env.example`](.env.example)):

| Variable             | Default                          | Purpose                                                |
| -------------------- | -------------------------------- | ------------------------------------------------------ |
| `YOUTUBE_CHANNEL_ID` | `UC26G_o-cTFCcPo-CyGf_3YA`       | Channel pulled via the public RSS feed                 |
| `TIKTOK_USERNAME`    | `thewizardmarketing`             | Creator handle for the TikTok embed (no `@`)           |
| `INDEX_PATH`         | `./index.html`                   | HTML file the build mutates                            |
| `FETCH_TIMEOUT_MS`   | `10000`                          | Per-request HTTP timeout                               |
| `STRICT`             | `0`                              | When `1`, abort if injection targets are missing       |

## Validation

```sh
npm run validate   # asserts core SEO/OG/JSON-LD tags are present in index.html
npm test           # alias for `npm run validate`
```

## Deployment

The site is fully static — any host that serves plain files works (Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3+CloudFront). For Vercel:

1. Connect the GitHub repo.
2. Framework preset: **Other**.
3. Build command: `npm run build` (safe no-op when no feed containers exist).
4. Output directory: `.`.
5. Optional: set `YOUTUBE_CHANNEL_ID` and `TIKTOK_USERNAME` env vars in the Vercel dashboard.

To keep embeds fresh, schedule a periodic redeploy (Vercel cron, GitHub Actions `schedule`, etc.).

## Project layout

```
.
├── index.html              # Single-page site
├── styles.css              # All styling
├── script.js               # Nav, form handling, GSAP animations
├── build.js                # Optional feed-injection build step
├── dev_assets/             # Imagery + illustration assets
├── parchment-bg-v4.jpg     # Page background
├── package.json            # Scripts + dependencies
└── README.md
```

## License

[MIT](LICENSE) © Jake Tlapek
