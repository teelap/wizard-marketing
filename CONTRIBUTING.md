# Contributing

Thanks for the interest. The site is intentionally simple — plain HTML/CSS/JS, no bundler, no framework.

## Setup

```sh
git clone https://github.com/teelap/wizard-marketing.git
cd wizard-marketing
nvm use            # picks Node 20 from .nvmrc
npm install
npm run serve
```

## Workflow

1. Branch from `main`.
2. Make the change. Keep diffs tight — no unrelated reformatting.
3. Run before pushing:
   ```sh
   npm run validate
   npm run build
   ```
4. Open a PR using the template. Fill in the test plan.

## House style

- Indent: 4 spaces in HTML/CSS/JS, 2 in JSON/YAML/TOML/MD (enforced by `.editorconfig`).
- No emojis in code or commits unless they're part of copy.
- Avoid comments that restate the code. Use comments only for non-obvious *why*.
- Inline event handlers and `document.write` are not allowed — wire things through [script.js](script.js).
- Third-party scripts/styles must be SRI-pinned with `integrity="sha384-…"` and `crossorigin="anonymous"`. Recompute hashes when you bump a version.
- `target="_blank"` links must include `rel="noopener noreferrer"`.

## Commit messages

Conventional Commits, lowercase scope:

```
feat(hero): swap headshot
fix(form): hide success message on dominoes
chore(deps): bump axios to 1.7.0
```

## Reporting bugs

Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md). Include browser, OS, and a screenshot or console output.
