# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- Production-grade [build.js](build.js) with env-var config, timeouts, tolerant/strict modes, and clean exit when feed containers are absent.
- `npm` scripts: `build`, `build:strict`, `serve`, `validate`.
- [.env.example](.env.example), [.nvmrc](.nvmrc), [LICENSE](LICENSE), [README.md](README.md), [CONTRIBUTING.md](CONTRIBUTING.md), [SECURITY.md](SECURITY.md), [CHANGELOG.md](CHANGELOG.md), [.editorconfig](.editorconfig).
- SEO infrastructure: [robots.txt](robots.txt), [sitemap.xml](sitemap.xml), [site.webmanifest](site.webmanifest).
- Meta tags: `theme-color`, `color-scheme`, `robots` (`max-image-preview:large`).
- Resource hints: `preload` for parchment background, `preconnect`/`dns-prefetch` for cdnjs.
- SRI sha384 integrity on GSAP, ScrollTrigger, and Font Awesome.
- Deployment configs with security headers and cache rules: [vercel.json](vercel.json), [netlify.toml](netlify.toml).
- GitHub Actions: [CI](.github/workflows/ci.yml), [scheduled feed refresh](.github/workflows/refresh-feeds.yml), [CodeQL](.github/workflows/codeql.yml).
- [Dependabot](.github/dependabot.yml) for weekly npm + GitHub Actions updates.
- [Pull request](.github/PULL_REQUEST_TEMPLATE.md) and [bug report](.github/ISSUE_TEMPLATE/bug_report.md) templates.

### Changed
- Favicon and apple-touch-icon paths converted from absolute (`/dev_assets/…`) to relative (`dev_assets/…`) so the site works on subpath deployments.
- All eight `target="_blank"` links now carry `rel="noopener noreferrer"`.
- Footer year handled via DOM update in [script.js](script.js) instead of inline `document.write`.
- Bumped `script.js` cache-busting query string to `?v=7.1`.
- Social-link `<i>` icons marked `aria-hidden="true"` to prevent screen-reader double-announcement next to their `aria-label`d anchors.

### Fixed
- Critical: build script previously targeted DOM containers (`#youtube-feed-container`, `#tiktok-feed-container`) that don't exist in the current page — every CI build was a silent no-op. The script now logs a clear warning and exits cleanly, or fails fast when `STRICT=1`.
