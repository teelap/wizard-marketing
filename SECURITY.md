# Security policy

## Supported versions

Only the deployed `main` branch is supported. Older commits do not receive security fixes.

## Reporting a vulnerability

**Do not open a public issue.** Email `jake@jakethewizard.com` with:

- A description of the issue.
- Steps to reproduce or a proof-of-concept.
- The affected URL or file.
- Your assessment of severity.

You'll get an acknowledgement within 72 hours. Fixes for confirmed issues land within 14 days for high severity, 30 days otherwise.

## Hardening already in place

- Strict Content-Security-Policy ([vercel.json](vercel.json), [netlify.toml](netlify.toml)).
- HSTS with `preload`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, restrictive `Permissions-Policy`.
- All third-party scripts/styles loaded with `integrity="sha384-…"` and `crossorigin="anonymous"`.
- All external links use `rel="noopener noreferrer"`.
- Form submissions go to Formspree over HTTPS only; CSP `form-action` is allowlisted to that origin.
- Dependabot watches npm and GitHub Actions weekly.
- CodeQL runs on push, PR, and weekly.
