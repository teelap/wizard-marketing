/**
 * /api/meta-capi — Meta Conversions API relay (server-side, first-party).
 * ----------------------------------------------------------------------------
 * A consent-gated GTM tag in the browser POSTs a conversion here. This function
 * normalises + SHA-256 hashes the PII, enriches the event with the visitor's IP
 * and user-agent (which the browser can't send reliably), and forwards it to the
 * Meta Graph API. The `event_id` is shared with the browser Pixel hit, so Meta
 * deduplicates the pair and counts the conversion once — with the best signal
 * from each side. This is what recovers conversions lost to iOS, ad blockers,
 * and Safari ITP.
 *
 * Required env (Vercel → Project → Settings → Environment Variables):
 *   META_PIXEL_ID         Pixel / dataset id (the ~15-digit number)
 *   META_CAPI_TOKEN       Conversions API access token (SECRET — never commit)
 * Optional env:
 *   META_TEST_EVENT_CODE  while testing, set to TESTxxxxx to see hits in Test Events
 *   META_API_VERSION      Graph API version, defaults to v21.0
 *
 * Security: the access token lives only in the server environment and is never
 * returned to the client. Only Meta's non-sensitive diagnostics are echoed back.
 */

'use strict';

const crypto = require('crypto');

const GRAPH_VERSION = process.env.META_API_VERSION || 'v21.0';

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

/**
 * Normalise then hash a value per Meta's matching rules. Returns undefined for
 * empty input so we never send a hash of "".
 * @param {string} value
 * @param {{ digitsOnly?: boolean, stripSpaces?: boolean }} [opts]
 * @returns {string|undefined}
 */
function hashField(value, opts) {
  opts = opts || {};
  if (value == null) return undefined;
  let v = String(value).trim().toLowerCase();
  if (opts.digitsOnly) v = v.replace(/[^0-9]/g, '');
  if (opts.stripSpaces) v = v.replace(/\s+/g, '');
  if (!v) return undefined;
  return sha256(v);
}

function readCookie(cookieHeader, name) {
  if (!cookieHeader) return '';
  const m = cookieHeader.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : '';
}

function clientIp(req) {
  const xff = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return xff || (req.socket && req.socket.remoteAddress) || '';
}

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

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    return res.end(JSON.stringify({ ok: false, error: 'method_not_allowed' }));
  }

  const PIXEL_ID = process.env.META_PIXEL_ID;
  const TOKEN = process.env.META_CAPI_TOKEN;
  if (!PIXEL_ID || !TOKEN) {
    res.statusCode = 500;
    return res.end(JSON.stringify({ ok: false, error: 'capi_not_configured' }));
  }

  let payload;
  try {
    payload = await readBody(req);
  } catch (e) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ ok: false, error: 'bad_json' }));
  }

  const u = payload.user_data || {};
  const cookieHeader = req.headers['cookie'] || '';
  const fbp = u.fbp || readCookie(cookieHeader, '_fbp');
  const fbc = u.fbc || readCookie(cookieHeader, '_fbc');

  // Build the matched user_data. PII is hashed; fbp/fbc/ip/ua are sent raw per spec.
  const userData = {
    em: u.em ? [hashField(u.em)] : undefined,
    fn: u.fn ? [hashField(u.fn)] : undefined,
    ln: u.ln ? [hashField(u.ln)] : undefined,
    ph: u.ph ? [hashField(u.ph, { digitsOnly: true })] : undefined,
    external_id: u.external_id ? [sha256(String(u.external_id).trim())] : undefined,
    client_ip_address: clientIp(req) || undefined,
    client_user_agent: req.headers['user-agent'] || undefined,
    fbp: fbp || undefined,
    fbc: fbc || undefined,
  };
  Object.keys(userData).forEach((k) => userData[k] === undefined && delete userData[k]);

  // Strip empty custom_data fields so we don't send value:"" etc.
  const customData = Object.assign({}, payload.custom_data);
  Object.keys(customData).forEach((k) => {
    if (customData[k] === '' || customData[k] == null) delete customData[k];
  });
  if (customData.value != null) customData.value = Number(customData.value) || 0;

  const event = {
    event_name: payload.event_name || 'Lead',
    event_time: Math.floor(Date.now() / 1000),
    event_id: payload.event_id || undefined,
    event_source_url: payload.event_source_url || req.headers['referer'] || '',
    action_source: 'website',
    user_data: userData,
    custom_data: customData,
  };

  const body = { data: [event] };
  if (process.env.META_TEST_EVENT_CODE) body.test_event_code = process.env.META_TEST_EVENT_CODE;

  const url = 'https://graph.facebook.com/' + GRAPH_VERSION + '/' +
    encodeURIComponent(PIXEL_ID) + '/events?access_token=' + encodeURIComponent(TOKEN);

  try {
    const fbRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = await fbRes.json().catch(() => ({}));
    res.statusCode = fbRes.ok ? 200 : 502;
    // Echo only non-sensitive diagnostics — never the token or hashed PII.
    return res.end(JSON.stringify({
      ok: fbRes.ok,
      events_received: json.events_received,
      fbtrace_id: json.fbtrace_id,
      error: json.error ? { message: json.error.message, code: json.error.code } : undefined,
    }));
  } catch (e) {
    res.statusCode = 502;
    return res.end(JSON.stringify({ ok: false, error: 'capi_relay_failed' }));
  }
};
