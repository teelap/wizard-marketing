# Meta Pixel + Conversions API — Setup & Runbook

Comprehensive Meta (Facebook) tracking for **jakethewizard.com**, built on top of the
existing GA4/GTM dataLayer (`analytics.js`). The browser **Pixel** and the server-side
**Conversions API (CAPI)** fire the same events with a shared `event_id`, so Meta
deduplicates them and counts each conversion once — with the strongest signal from each
side. This is what recovers conversions lost to iOS, ad blockers, and Safari ITP.

```
 visitor action
      │
      ▼
 analytics.js ──push──▶ dataLayer ──▶ GTM (GTM-TLXMBN8B)
                                        ├─▶ Meta Pixel tag      → connect.facebook.net  (browser)
                                        └─▶ Meta CAPI tag       → /api/meta-capi → Graph API (server)
                                                                   (hashes PII, adds IP + UA)
            both carry the same event_id  →  Meta dedupes
```

Everything is **consent-gated on `ad_storage`**: default-on for US / non-EEA traffic,
off until *Accept* in the EEA/UK/Switzerland, and off anywhere a visitor clicks *Decline*.

---

## Event map

| Visitor action | dataLayer event | Meta event | Channel | Value |
|---|---|---|---|---|
| Any page view | (Base tag) | `PageView` | Pixel | — |
| View consulting/mastermind/book/podcast/tools | `page_data` | `ViewContent` | Pixel | — |
| Click Calendly 30-min | `book_consultation` → `conversion` | `Schedule` | Pixel + CAPI | $400 |
| Click Calendly 60-min | `book_consultation` → `conversion` | `Schedule` | Pixel + CAPI | $750 |
| Consulting intake form ✓ | `conversion` | `Lead` | Pixel + CAPI | — |
| Podcast inquiry form ✓ | `conversion` | `Lead` | Pixel + CAPI | — |
| Home contact form ✓ | `conversion` | `Lead` | Pixel + CAPI | — |
| Join the community (free) | `conversion` | `CompleteRegistration` | Pixel + CAPI | — |
| Start the membership trial | `conversion` | `StartTrial` | Pixel + CAPI | — |
| Eight Dominoes / book waitlist ✓ | `conversion` | `CompleteRegistration` | Pixel + CAPI | — |
| Click email / phone link | `email_click` / `tel_click` | `Contact` | Pixel | — |
| Focus a form field | `form_start` | `FormStart` (custom) | Pixel | — |
| Click a primary CTA | `cta_click` | `CTAClick` (custom) | Pixel | — |
| Leave to an external site | `outbound_click` | `OutboundClick` (custom) | Pixel | — |
| Click a social link | `social_click` | `SocialClick` (custom) | Pixel | — |
| Download a file | `file_download` | `FileDownload` (custom) | Pixel | — |
| Scroll to 90% | `scroll_depth` | `ScrollDepth` (custom) | Pixel | — |
| Finish a YouTube embed | `video_progress` | `VideoComplete` (custom) | Pixel | — |

**Advanced matching** sent with every conversion (and hashed by the browser Pixel / by
the CAPI function server-side): email, first name, last name, phone (when present),
`_fbp`, `_fbc` (built from `?fbclid=` if needed), and a stable pseudonymous `external_id`.

---

## What's in the repo

| File | Role |
|---|---|
| `analytics.js` | Pushes the dataLayer. Adds `conversion()` with shared `event_id` + advanced-matching fields. |
| `script.js` | Fires the Meta conversion on **confirmed** form success (AJAX), before the form leaves the DOM. |
| `build.js` | Injects Consent Mode v2 (now ad_storage **granted** outside the EEA/UK) + GTM + `analytics.js?v=2`. |
| `api/meta-capi.js` | Vercel serverless function. Hashes PII (SHA-256), adds IP + UA, forwards to the Graph API. |
| `gtm/meta-pixel-jakethewizard.json` | Importable GTM container: 12 tags, 11 triggers, 27 variables. |
| `vercel.json` / `netlify.toml` | CSP updated to allow `connect.facebook.net` + `www.facebook.com`. |
| `privacy.html` / `cookies.html` | Disclosure of the Pixel + CAPI (required now that it's default-on). |

---

## One-time setup

### 1 — Create the Pixel (Meta Events Manager)
1. <https://business.facebook.com/events_manager2> → **Connect data sources** → **Web** → **Meta Pixel**.
2. Name it `jakethewizard.com`. Skip the "add code" prompts (GTM handles the code).
3. Copy the **Pixel ID** (the ~15-digit number).

### 2 — Generate a Conversions API token
1. In Events Manager → your dataset → **Settings** → **Conversions API** → **Generate access token**.
2. Copy it. Treat it like a password — it never goes in the repo.

### 3 — Add the secrets to Vercel
Project → **Settings** → **Environment Variables** (Production + Preview):

| Key | Value |
|---|---|
| `META_PIXEL_ID` | your Pixel ID |
| `META_CAPI_TOKEN` | the CAPI access token |
| `META_TEST_EVENT_CODE` | *(temporary)* the `TEST#####` code from Test Events, while verifying |

Redeploy so the function picks them up.

### 4 — Import the GTM container
1. GTM → **Admin** → **Import Container** → choose `gtm/meta-pixel-jakethewizard.json`.
2. Workspace: **Existing → Default Workspace**. Mode: **Merge → Overwrite conflicting tags**.
3. Open the variable **`Const - Meta Pixel ID`** → paste your Pixel ID → **Save**.
4. **Preview**, verify (below), then **Submit / Publish**.

---

## Verify (do this before trusting the data)

1. **Meta Test Events**: Events Manager → **Test events**. With `META_TEST_EVENT_CODE` set,
   load the site, submit a test form, click a Calendly link. You should see each
   conversion **twice** — once `Browser`, once `Server` — collapsing into one **Deduplicated**
   row (same `event_id`).
2. **GTM Preview** (Tag Assistant): confirm `Meta Pixel - Conversion` and `Meta CAPI - Conversion`
   both fire on the `conversion` event, and that tags are **blocked before consent** in an EEA
   simulation.
3. **Match quality**: Events Manager → dataset → **Settings**. Aim for green on email/IP/UA/fbp.
4. Remove `META_TEST_EVENT_CODE` from Vercel when finished.

---

## Adding a new event later
1. In `analytics.js` (or `script.js`) push a dataLayer event — for a conversion call
   `WizAnalytics.conversion({ meta_event, content_name, value, email, ... })`.
2. In GTM, add a **Custom Event** trigger on the event name, and a Custom HTML tag
   (copy an existing Meta tag, keep the `ad_storage` consent setting).
3. Preview → Publish.

## Notes
- Bump the `?v=` query on `analytics.js` (in `build.js`) and `script.js` (in the HTML) whenever
  you change them — those files are cached `immutable`.
- The CAPI function never returns the token or any PII; only Meta's `fbtrace_id` / counts.
