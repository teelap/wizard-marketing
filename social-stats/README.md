# Social Stats pipeline → Google Sheet → Looker Studio

This folder holds the collector that feeds the **Social growth** page of your
*Jake the Wizard — Master Analytics* Looker Studio dashboard.

It's a **Google Apps Script** ([`Code.gs`](Code.gs)) that runs once a day **inside
your Google account** (your computer does not need to be on) and writes one row of
social/search/booking numbers into a Google Sheet. Looker Studio reads that Sheet.

```
 daily trigger (Google cloud)
        │
        ▼
   Code.gs  ──fetches──▶  YouTube · Instagram · Facebook · Bing · Clarity · Calendly
        │                 (TikTok · LinkedIn · X  ← you type these in the Manual tab)
        ▼
  Google Sheet  ──native connector──▶  Looker Studio  ▸ Social growth page
```

Every source is **optional and best-effort**: add the tokens you have now, add the
rest later. A missing or failing source just leaves that cell blank and notes it in
the **Log** tab — the run never fails.

---

## Setup (≈20 min, do the easy tokens first)

### 1. Create the Sheet + paste the script
1. Create a new Google Sheet (in **jake@jakethewizard.com**) named
   **`Jake the Wizard — Social Stats`**.
2. **Extensions ▸ Apps Script**. Delete the empty `Code.gs`, paste the entire
   contents of [`Code.gs`](Code.gs), and **Save** (💾).

### 2. Add your tokens (Script Properties)
In the Apps Script editor: **Project Settings (⚙) ▸ Script properties ▸ Add script property**.
Add a row per key you have. **You can start with just the four "Easy" ones** —
that already gives you YouTube + Bing + Clarity + Calendly.

| Property key | What it is | Difficulty |
|---|---|---|
| `YT_API_KEY` | YouTube Data API v3 key | 🟢 Easy |
| `YT_HANDLE` | `itsjakethewizard` (only if different) | 🟢 optional |
| `CALENDLY_TOKEN` | Calendly personal access token | 🟢 Easy |
| `CLARITY_TOKEN` | Microsoft Clarity Data Export token | 🟢 Easy |
| `BING_API_KEY` | Bing Webmaster Tools API key | 🟢 Easy |
| `BING_SITE` | `https://www.jakethewizard.com/` (only if different) | 🟢 optional |
| `META_PAGE_TOKEN` | Meta long-lived **Page** access token | 🟡 Medium |
| `META_PAGE_ID` | Facebook Page ID | 🟡 Medium |
| `IG_USER_ID` | Instagram Business account ID | 🟡 Medium |

> TikTok, LinkedIn, and X have **no free API** for a personal-account follower
> count, so those are handled by the **Manual** tab (step 5) instead of a token.

### 3. Run `setup()` once
Top of the editor: pick **`setup`** in the function dropdown ▸ **Run**. Approve the
Google permission prompt (it's your own script accessing your own Sheet). This
creates the **Daily**, **Manual**, and **Log** tabs, writes the first row, and
installs the **daily 6 AM trigger**. Done — it now runs every day on its own.

### 4. (Optional) Add the Meta tokens later
See **"Getting each token"** below. Until then, Instagram/Facebook columns stay blank.

### 5. Fill the Manual tab (TikTok / LinkedIn / X)
Open the **Manual** tab and add a row whenever you want to log those three:
`Date | TikTok Followers | LinkedIn Followers | X Followers`. The collector copies
the **most recent** Manual row into each day's snapshot, so updating it once a week
is plenty.

### 6. Connect the Sheet to Looker Studio
In the dashboard editor: **Add data ▸ Google Sheets ▸** pick
*Jake the Wizard — Social Stats ▸ Daily*. Then build the **Social growth** page
(scorecards for each follower count + a time-series of followers over time). Ping me
and I'll wire this page up in the browser once the Sheet has a couple of rows.

---

## Getting each token

**🟢 YouTube Data API key** — <https://console.cloud.google.com/> ▸ create/select a
project ▸ **APIs & Services ▸ Library** ▸ enable **YouTube Data API v3** ▸
**Credentials ▸ Create credentials ▸ API key**. Paste into `YT_API_KEY`.

**🟢 Calendly token** — <https://calendly.com/> ▸ **Integrations & apps ▸ API &
webhooks ▸ Personal access tokens ▸ Generate**. Paste into `CALENDLY_TOKEN`.

**🟢 Microsoft Clarity token** — <https://clarity.microsoft.com/> ▸ your project ▸
**Settings ▸ Data export ▸ Generate new API token**. Paste into `CLARITY_TOKEN`.

**🟢 Bing Webmaster API key** — <https://www.bing.com/webmasters/> ▸ **Settings ▸
API access ▸ API Key** (generate). Paste into `BING_API_KEY`.

**🟡 Meta Page token + IDs** (Facebook + Instagram) — Instagram must be a
**Business/Creator** account linked to your Facebook Page.
1. <https://developers.facebook.com/> ▸ your app (you already have one for the Pixel)
   ▸ **Tools ▸ Graph API Explorer**.
2. Add permissions `pages_read_engagement`, `pages_show_list`, `instagram_basic`,
   `business_management`; **Generate Access Token**.
3. Call `me/accounts` → copy your Page's **id** (`META_PAGE_ID`) and **access_token**.
4. Call `{PAGE_ID}?fields=instagram_business_account` → copy the **id** (`IG_USER_ID`).
5. Exchange the Page token for a **long-lived** one (Access Token Debugger ▸ *Extend*),
   then paste it into `META_PAGE_TOKEN`. (Long-lived Page tokens don't expire while
   the app stays active.)

---

## Notes
- **No secrets in the repo.** Tokens live only in Script Properties.
- **Check the Log tab** if a column is unexpectedly blank — it records the exact API
  error per source.
- **Edit cadence/time:** change `everyDays(1).atHour(6)` in `createDailyTrigger_()`.
- **Want a Node/claude-commander App version instead?** Ask — the same collectors can
  ship as a one-pass `node collect.js` command that posts to the Sheet, registered as
  an App. Apps Script is recommended here because it needs no server and no machine.
