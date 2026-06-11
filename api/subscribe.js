/**
 * /api/subscribe — add a confirmed form submitter to the Resend audience.
 * ----------------------------------------------------------------------------
 * The site's forms POST to Formspree (which emails Jake) and, on CONFIRMED
 * success, fire-and-forget a copy of {email, name} here. This function adds the
 * person to the Resend "Audience" (the master subscriber list) so newsletters /
 * broadcasts can be sent to them later. We only capture on confirmed success, so
 * failed/abandoned submits never create contacts.
 *
 * Required env (Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY        Resend API key (SECRET — never commit). Until this is
 *                         set the endpoint no-ops, so forms keep working.
 * Optional env:
 *   RESEND_AUDIENCE_ID    Target audience id. If unset, the first audience on the
 *                         account is discovered automatically and cached.
 *   RESEND_FROM           e.g. "Jake Tlapek <jake@send.jakethewizard.com>". Set
 *                         this ONLY after a sending domain is verified in Resend;
 *                         doing so enables the one-time welcome email. Until then
 *                         we just add the contact (no send), so nothing bounces.
 *
 * Security: the API key lives only in the server environment and is never
 * returned to the client. Responses carry no PII.
 */

'use strict';

const RESEND_API = 'https://api.resend.com';

// Cached across warm invocations (Vercel reuses function instances) so we only
// look the audience up once.
let cachedAudienceId = null;

function readBody(req) {
  if (req.body) {
    return Promise.resolve(typeof req.body === 'string' ? JSON.parse(req.body) : req.body);
  }
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 1e6) req.destroy(); // guard against oversized bodies
    });
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

function isEmail(value) {
  return typeof value === 'string' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
}

/** Resolve the target audience id from env, cache, or the Resend API. */
async function resolveAudienceId(key) {
  if (process.env.RESEND_AUDIENCE_ID) return process.env.RESEND_AUDIENCE_ID;
  if (cachedAudienceId) return cachedAudienceId;
  const r = await fetch(RESEND_API + '/audiences', {
    headers: { Authorization: 'Bearer ' + key },
  });
  const j = await r.json().catch(() => ({}));
  const list = (j && j.data) || [];
  if (!list.length) return null;
  cachedAudienceId = list[0].id;
  return cachedAudienceId;
}

function welcomeHtml(firstName) {
  // Escape the name before it lands in HTML — a crafted first_name should never
  // become markup, even though this email only ever reaches the submitter.
  const safeFirst = String(firstName || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const hi = safeFirst ? 'Hey ' + safeFirst : 'Hey';
  return [
    '<div style="font-family:-apple-system,Segoe UI,system-ui,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a1410;line-height:1.6;">',
    '<p>' + hi + ',</p>',
    "<p>You're on the list. Every week I send one email on the marketing that actually moves revenue — the sequence, not the noise.</p>",
    '<p>No fluff. Unsubscribe anytime (link at the bottom of every email).</p>',
    '<p>— Jake</p>',
    '<p style="font-size:12px;color:#9a8a7e;margin-top:24px;">Jake Tlapek · The Wizard of Marketing · <a href="https://www.jakethewizard.com" style="color:#9a8a7e;">jakethewizard.com</a></p>',
    '</div>',
  ].join('');
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    return res.end(JSON.stringify({ ok: false, error: 'method_not_allowed' }));
  }

  const KEY = process.env.RESEND_API_KEY;
  if (!KEY) {
    // Not configured yet — no-op so the form's success UI is never affected.
    res.statusCode = 200;
    return res.end(JSON.stringify({ ok: false, skipped: 'not_configured' }));
  }

  let body;
  try {
    body = await readBody(req);
  } catch (e) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ ok: false, error: 'bad_json' }));
  }

  const email = String(body.email || '').trim().toLowerCase();
  if (!isEmail(email)) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ ok: false, error: 'invalid_email' }));
  }
  const firstName = String(body.first_name || '').trim();
  const lastName = String(body.last_name || '').trim();
  // Optional origin tag — which form/page the signup came from (e.g. "eight_dominoes").
  // Stored as Resend contact properties so the audience can be segmented by source
  // later, and as a tag on the welcome email. Best-effort: never required for the add.
  const source = String(body.source || '').trim().slice(0, 60);
  const signupPage = String(body.signup_page || '').trim().slice(0, 120);
  const sourceTag = source.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 50);

  let audienceId;
  try {
    audienceId = await resolveAudienceId(KEY);
  } catch (e) {
    audienceId = null;
  }
  if (!audienceId) {
    res.statusCode = 502;
    return res.end(JSON.stringify({ ok: false, error: 'no_audience' }));
  }

  // Add (upsert) the contact. A duplicate email is a success for our purposes.
  try {
    const r = await fetch(RESEND_API + '/audiences/' + audienceId + '/contacts', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        first_name: firstName || undefined,
        last_name: lastName || undefined,
        unsubscribed: false,
        // Custom properties (Resend's newer contact model). Harmless if the
        // account/audience doesn't support them — the contact is still added.
        properties: (source || signupPage)
          ? { source: source || undefined, signup_page: signupPage || undefined }
          : undefined,
      }),
    });
    const j = await r.json().catch(() => ({}));
    const duplicate = j && j.message && /already|exists/i.test(j.message);
    if (!r.ok && !duplicate) {
      res.statusCode = 502;
      return res.end(JSON.stringify({ ok: false, error: 'resend_add_failed' }));
    }
  } catch (e) {
    res.statusCode = 502;
    return res.end(JSON.stringify({ ok: false, error: 'resend_unreachable' }));
  }

  // Optional one-time welcome email — only once a verified sending domain is wired
  // via RESEND_FROM. Best-effort: the subscribe already succeeded regardless.
  const FROM = process.env.RESEND_FROM;
  if (FROM) {
    try {
      await fetch(RESEND_API + '/emails', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: FROM,
          to: [email],
          subject: "You're on the list",
          html: welcomeHtml(firstName),
          tags: sourceTag ? [{ name: 'source', value: sourceTag }] : undefined,
        }),
      });
    } catch (e) { /* welcome is best-effort */ }
  }

  res.statusCode = 200;
  return res.end(JSON.stringify({ ok: true }));
};
