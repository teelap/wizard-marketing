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
  const context = {
    module: { exports: {} },
    require,
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
    async submit(body, method = 'POST') {
      const res = { headers: {}, setHeader(key, value) { this.headers[key] = value; },
        end(value) { this.body = JSON.parse(value); } };
      await context.module.exports({ method, body }, res);
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
