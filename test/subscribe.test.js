'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '../api/subscribe.js'), 'utf8');
const signup = { email: ' New+Reader@Example.com ', newsletter_optin: true };

function response(status, data) {
  return { status, ok: status >= 200 && status < 300, json: async () => data };
}

function endpoint(replies = [], extraEnv = {}) {
  const calls = [];
  const logs = [];
  const context = {
    module: { exports: {} },
    require,
    console: { error: (...args) => logs.push(args) },
    process: { env: {
      RESEND_API_KEY: 'test-key-only',
      RESEND_AUDIENCE_ID: 'test-audience',
      ...extraEnv,
    } },
    fetch: async (url, options = {}) => {
      calls.push({ url, method: options.method || 'GET', ...options });
      assert.ok(replies.length, 'Unexpected provider request; real network access is never used');
      const next = replies.shift();
      if (next instanceof Error) throw next;
      return next;
    },
  };
  vm.runInNewContext(source, context, { filename: 'api/subscribe.js' });
  return {
    calls,
    logs,
    async submit(body, method = 'POST', headers = {}) {
      const res = { headers: {}, setHeader(key, value) { this.headers[key] = value; },
        end(value) { this.body = JSON.parse(value); } };
      await context.module.exports({ method, body, headers }, res);
      return res;
    },
  };
}

for (const consent of [undefined, false, 'false', 'true', 'yes', 1, null]) {
  test(`does not contact Resend without boolean consent (${String(consent)})`, async () => {
    const api = endpoint();
    const result = await api.submit({ email: 'reader@example.com', source: 'grimoire', newsletter_optin: consent });
    assert.equal(result.statusCode, 200);
    assert.equal(result.body.skipped, 'not_opted_in');
    assert.equal(api.calls.length, 0);
  });
}

for (const unsubscribed of [true, false]) {
  test(`leaves existing ${unsubscribed ? 'unsubscribed' : 'subscribed'} contact untouched and sends no welcome`, async () => {
    const api = endpoint([response(200, { id: 'existing', unsubscribed })], { RESEND_FROM: 'test@example.com' });
    const result = await api.submit(signup);
    assert.deepEqual(result.body, { ok: true });
    assert.equal(api.calls.length, 1);
    assert.equal(api.calls[0].method, 'GET');
    assert.equal(api.calls[0].url, 'https://api.resend.com/contacts/new%2Breader%40example.com');
  });
}

for (const failure of [response(401, {}), response(429, {}), response(500, {}), response(200, {}), new Error('offline')]) {
  test(`does not create a contact or send on uncertain lookup (${failure.status || 'network error'})`, async () => {
    const api = endpoint([failure], { RESEND_FROM: 'test@example.com' });
    const result = await api.submit(signup);
    assert.equal(result.statusCode, 502);
    assert.equal(api.calls.length, 1);
  });
}

test('creates a new opted-in contact without overriding a stored unsubscribe preference', async () => {
  const api = endpoint([response(404, {}), response(200, { id: 'new' })]);
  const result = await api.submit(signup);
  assert.deepEqual(result.body, { ok: true });
  assert.equal(api.calls.length, 2);
  assert.equal(api.calls[1].url, 'https://api.resend.com/audiences/test-audience/contacts');
  const payload = JSON.parse(api.calls[1].body);
  assert.equal(payload.email, 'new+reader@example.com');
  assert.equal(Object.hasOwn(payload, 'unsubscribed'), false);
});

test('repeat submissions send at most one welcome and never rewrite the existing contact', async () => {
  const api = endpoint([
    response(404, {}), response(200, { id: 'new' }), response(200, { id: 'welcome' }),
    response(200, { id: 'new', unsubscribed: false }),
  ], { RESEND_FROM: 'test@example.com' });
  assert.deepEqual((await api.submit(signup)).body, { ok: true });
  assert.deepEqual((await api.submit(signup)).body, { ok: true });
  const sends = api.calls.filter(call => call.url.endsWith('/emails'));
  assert.equal(sends.length, 1);
  assert.match(sends[0].headers['Idempotency-Key'], /^newsletter-welcome\/[a-f0-9]{64}$/);
  assert.equal(api.calls.filter(call => call.method === 'POST').length, 2);
});

test('a concurrent duplicate creation does not send a welcome or update preferences', async () => {
  const api = endpoint([response(404, {}), response(409, { message: 'Contact already exists' })], {
    RESEND_FROM: 'test@example.com',
  });
  assert.deepEqual((await api.submit(signup)).body, { ok: true });
  assert.equal(api.calls.length, 2);
  assert.equal(Object.hasOwn(JSON.parse(api.calls[1].body), 'unsubscribed'), false);
});

test('creation failures do not send a welcome', async () => {
  const api = endpoint([response(404, {}), response(422, { message: 'Invalid contact property' })], {
    RESEND_FROM: 'test@example.com',
  });
  assert.equal((await api.submit(signup)).statusCode, 502);
  assert.equal(api.calls.length, 2);
});

test('creation failures log the Resend reason server-side without the address', async () => {
  const api = endpoint([response(404, {}), response(422, { name: 'validation_error', message: "Email 'new+reader@example.com' is invalid" })]);
  await api.submit(signup);
  assert.equal(api.logs.length, 1);
  const line = api.logs[0].join(' ');
  assert.match(line, /422 validation_error Email '<email>' is invalid/);
  assert.doesNotMatch(line, /example.com/);
});

test('malformed JSON and invalid email fail without provider requests', async () => {
  for (const body of ['{broken', 'null', [], { email: 'invalid', newsletter_optin: true }]) {
    const api = endpoint();
    assert.equal((await api.submit(body)).statusCode, 400);
    assert.equal(api.calls.length, 0);
  }
});

test('unsupported methods and an unconfigured deployment make no provider requests', async () => {
  const api = endpoint();
  assert.equal((await api.submit(signup, 'GET')).statusCode, 405);
  const unconfigured = endpoint([], { RESEND_API_KEY: '' });
  assert.equal((await unconfigured.submit(signup)).body.skipped, 'not_configured');
  assert.equal(api.calls.length + unconfigured.calls.length, 0);
});

// The X player card (/x) puts this endpoint in front of anyone who sees the
// tweet, bots included, so it rate-limits by IP, drops honeypot fills and only
// stores well-formed tags.
const existing = () => response(200, { id: 'existing', unsubscribed: false });

const LIMIT = 20;

test('rate-limits repeat signups from one IP without contacting Resend', async () => {
  const api = endpoint(Array.from({ length: LIMIT }, existing));
  const ip = { 'x-forwarded-for': '203.0.113.9, 10.0.0.1' };
  for (let i = 0; i < LIMIT; i++) assert.deepEqual((await api.submit(signup, 'POST', ip)).body, { ok: true });
  const blocked = await api.submit(signup, 'POST', ip);
  assert.equal(blocked.statusCode, 429);
  assert.equal(blocked.body.error, 'rate_limited');
  assert.equal(api.calls.length, LIMIT);
});

test('the rate limit is per IP', async () => {
  const api = endpoint(Array.from({ length: LIMIT + 1 }, existing));
  for (let i = 0; i < LIMIT; i++) await api.submit(signup, 'POST', { 'x-real-ip': '203.0.113.9' });
  assert.deepEqual((await api.submit(signup, 'POST', { 'x-real-ip': '198.51.100.4' })).body, { ok: true });
});

test('requests rejected for consent or a bad email do not use up the rate limit', async () => {
  const api = endpoint([existing()]);
  const ip = { 'x-real-ip': '203.0.113.9' };
  for (let i = 0; i < LIMIT; i++) await api.submit({ email: 'reader@example.com' }, 'POST', ip);
  for (let i = 0; i < LIMIT; i++) await api.submit({ email: 'nope', newsletter_optin: true }, 'POST', ip);
  assert.deepEqual((await api.submit(signup, 'POST', ip)).body, { ok: true });
});

test('a JSON body sent as text/plain is accepted (X may sandbox the card without same-origin)', async () => {
  const api = endpoint([existing()]);
  assert.deepEqual((await api.submit(JSON.stringify(signup))).body, { ok: true });
});

test('a filled honeypot looks like success but never reaches Resend', async () => {
  const api = endpoint();
  const result = await api.submit({ ...signup, website: 'http://spam.example' });
  assert.deepEqual(result.body, { ok: true });
  assert.equal(api.calls.length, 0);
});

test('an over-long email is rejected without provider requests', async () => {
  const api = endpoint();
  const result = await api.submit({ email: 'a'.repeat(250) + '@example.com', newsletter_optin: true });
  assert.equal(result.statusCode, 400);
  assert.equal(api.calls.length, 0);
});

test('stores clean source tags and drops malformed ones', async () => {
  const good = endpoint([response(404, {}), response(200, { id: 'new' })]);
  await good.submit({ ...signup, first_name: ' Ada\u0000 ', source: 'x_card_brief_it_sample', signup_page: '/x' });
  const payload = JSON.parse(good.calls[1].body);
  assert.equal(payload.first_name, 'Ada');
  assert.deepEqual({ ...payload.properties }, { source: 'x_card_brief_it_sample', signup_page: '/x' });

  const bad = endpoint([response(404, {}), response(200, { id: 'new' })]);
  await bad.submit({ ...signup, source: '<script>', signup_page: 'https://evil.example/x' });
  assert.equal(JSON.parse(bad.calls[1].body).properties, undefined);

  const protocolRelative = endpoint([response(404, {}), response(200, { id: 'new' })]);
  await protocolRelative.submit({ ...signup, signup_page: '//evil.example/x' });
  assert.equal(JSON.parse(protocolRelative.calls[1].body).properties, undefined);
});

// Resend rejects the whole contact when a custom property isn't set up in the
// account ("One or more properties do not exist"). Never lose the signup over a tag.
test('a missing Resend property retries the add without properties', async () => {
  const api = endpoint([
    response(404, {}),
    response(422, { name: 'validation_error', message: 'One or more properties do not exist' }),
    response(200, { id: 'new' }),
  ]);
  const result = await api.submit({ ...signup, source: 'x_card_brief_it_sample', signup_page: '/x' });
  assert.deepEqual(result.body, { ok: true });
  assert.equal(api.calls.length, 3);
  const retry = JSON.parse(api.calls[2].body);
  assert.equal(retry.email, 'new+reader@example.com');
  assert.equal(retry.properties, undefined);
  assert.equal(Object.hasOwn(retry, 'unsubscribed'), false);
});

test('other validation failures are not retried', async () => {
  const api = endpoint([response(404, {}), response(422, { name: 'validation_error', message: 'Invalid email' })]);
  assert.equal((await api.submit({ ...signup, source: 'grimoire' })).statusCode, 502);
  assert.equal(api.calls.length, 2);
});
