# Newsletter — Eight Dominoes launch

**Status:** DRAFT. Nothing sent. Jake approves and sends.
**Drafted:** 2026-08-06
**Audience:** the Resend audience (everyone captured via the site forms)
**Shape:** one email. Book leads and owns the single CTA; Business Arcanum rides in the PS. (Jake's call 2026-08-06 — one ask beats two competing ones.)

> **Before this can go out**, see "Sending checklist" at the bottom. A verified
> sending domain and `RESEND_FROM` were still outstanding as of the last check,
> and neither can be confirmed from this repo — the API key lives in Vercel.

---

## Subject lines

Pick one. Ranked by how they'd likely perform against this list.

1. **The book is out.** — flat, declarative, zero hype. Matches his register and stands out in a promotional inbox precisely because it doesn't try.
2. **I wrote the book I couldn't find** — curiosity + the origin story in six words.
3. **The best product doesn't win** — leads with the thesis, not the announcement. Best if the list skews cold.

**Preview text:** `223 pages on why the order of your words decides who wins.`

---

## Body

Every marketing book I've read taught me what to do.

None of them taught me the order to do it in.

That's the gap. And it's expensive. You've watched it happen — a competitor with a weaker offer and a higher price eats your lunch. They didn't outspend you. They out-*meant* you.

The distance between how good your work is and how good the market believes it is may be the most expensive gap in your business.

I spent seven years building a Chicago SEO and web shop on an audience I started from zero. Then I sold it. I never changed a client's product. Only the order of their words.

Monday, that became a book.

**Eight Dominoes: A Messaging Framework That Compounds Into Awesome Clients.** 223 pages. Out now in paperback and Kindle, free to read on Kindle Unlimited.

Here's the argument. A message isn't a pile of parts — a better hook, a sharper headline, a slicker funnel. It's a sequence. Eight moves that, set in the right order, knock each other down until a stranger chooses you. Out of order, they don't fall at all.

Core Attraction. Attention Catalyst. Value Proposition. Impact Chain. Your Mechanism. Barrier Breakdown. Embracing Limitations. The New Opportunity.

Every chapter pairs a real turnaround with a workbook that puts the lesson in your words. How Domino's went on television, said its own pizza was bad, and engineered one of the great comebacks in fast food. How a $4,500 video let Dollar Shave Club take share from a $30-billion Gillette. How Buckley's built a national brand by bragging that its cough syrup tastes terrible.

There's an appendix that maps all eight moves across 30 brands you already know — Patagonia, YETI, Liquid Death, Trader Joe's, Airbnb — so you can study the chain in the wild before you build your own.

Marty Marion wrote the foreword. He's spent thirty years positioning Fortune 100 brands. His line on it was "I wish I'd written this book."

If your work is better than your sales reflect, the problem isn't your product. It's the order of your words.

**[Buy the book →](https://www.amazon.com/dp/B0HD48KJGD)**

$17.99 paperback. $9.99 Kindle. Free on Kindle Unlimited. Hardcover and the audiobook — which I'm narrating — are in production.

— Jake

---

**PS.** If you'd rather have me run the chain on your business than read about it: **Business Arcanum** is open. It's a small, curated room of founders and senior marketers who are done with theory. I run every session. You bring real numbers and real problems, and you get the framework applied live to your business — plus the willingness to hear the truth and act on it. Application-only, and it stays intentionally small.

[Apply to The Order →](https://www.jakethewizard.com/mastermind)

**PPS.** If you're press, run a podcast, or want a review copy — the full media kit is at [jakethewizard.com/media-kit](https://www.jakethewizard.com/media-kit). Fact sheet, bios, cover art, story angles, all cleared for use.

---

## QA gate

| Pass | Result |
|---|---|
| **Voice** (CONTENT_GUIDE §5) | Diagnose-before-sell opener. Two-beat sentences, fragments as percussion. First person singular. Imperative close. Velvet-rope honesty in the PS ("done with theory," "stays intentionally small"). |
| **Stat bank** (§2) | Every number checks: 223 pages, $17.99/$9.99, seven years, $4,500 DSC video, $30bn Gillette, 30 brands, thirty years (Marion). All from the media kit. No "three continents," no "Fortune 500 boardrooms," no invented figures. |
| **Banned list** (§6) | No emoji. No exclamation marks. No "Get the truth." No jargon, guru promises, fake urgency, or hedging. |
| **CTA** (§3, §10) | ONE primary imperative CTA — "Buy the book." Arcanum is subordinated to a PS so it doesn't compete. |
| **Stop-slop** | No "isn't just X, it's Y." No hollow opener. No rule-of-three padding. No "in today's landscape." Concrete nouns and real numbers doing the work instead of adjectives. |

## Sending checklist

1. **Verify the Resend sending domain.** Last known state: pending Squarespace DNS. Broadcasts will not send from an unverified domain.
2. **Set `RESEND_FROM`** in Vercel (e.g. `Jake Tlapek <jake@send.jakethewizard.com>`). This also switches on the welcome email for new signups, which is currently dormant.
3. **Confirm the audience.** `api/subscribe.js` adds contacts to the first audience on the account unless `RESEND_AUDIENCE_ID` is set. Check the list is the one you mean before sending.
4. **Send yourself a test first.** Check the Amazon link, the unsubscribe footer, and rendering in Gmail and Apple Mail.
5. **Jake sends.** Nothing here goes out automatically.
