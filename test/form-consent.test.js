'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8');

async function submitForm({ type, checked, ok = true, fail = false, changeWhilePending } = {}) {
  const calls = [];
  const button = { textContent: 'Send', disabled: false };
  const checkbox = checked === undefined ? null : { checked };
  let handler;
  let replaced = false;
  const form = {
    action: 'https://formspree.io/f/test-only',
    addEventListener(event, callback) { if (event === 'submit') handler = callback; },
    querySelector(selector) {
      const elements = {
        'button[type="submit"]': button,
        'input[name="_form_type"]': { value: type },
        'input[type="checkbox"][name="newsletter_optin"]': checkbox,
        'input[type="email"], input[name="email"]': { value: 'reader@example.com' },
        'input[name="name"]': { value: 'Test Reader' },
      };
      return elements[selector] || null;
    },
    parentElement: { querySelector() { return null; } },
    replaceWith() { replaced = true; },
    appendChild() {},
  };
  const context = {
    document: {
      addEventListener(event, callback) { if (event === 'DOMContentLoaded') this.ready = callback; },
      getElementById(id) { return id === 'mobile-menu' ? { addEventListener() {} } : null; },
      querySelector() { return {}; },
      querySelectorAll(selector) { return selector === 'form[action*="formspree.io"]' ? [form] : []; },
      createElement() { return { setAttribute() {} }; },
    },
    window: { location: { pathname: '/test' }, addEventListener() {}, matchMedia() { return { matches: true }; } },
    IntersectionObserver: class { observe() {} },
    FormData: class {},
    fetch: async (url, options) => {
      calls.push({ url, options });
      if (url === form.action) {
        if (changeWhilePending !== undefined) checkbox.checked = changeWhilePending;
        if (fail) throw new Error('Formspree unavailable');
        return { ok };
      }
      assert.equal(url, '/api/subscribe', 'No real network requests are permitted');
      return { ok: true };
    },
  };
  vm.runInNewContext(source, context, { filename: 'script.js' });
  context.document.ready();
  await handler({ preventDefault() {} });
  return { calls, replaced, button, subscriptions: calls.filter(call => call.url === '/api/subscribe') };
}

test('unchecked optional newsletter checkbox does not subscribe a successful inquiry', async () => {
  const result = await submitForm({ type: 'speaking_inquiry', checked: false });
  assert.equal(result.replaced, true);
  assert.equal(result.subscriptions.length, 0);
  assert.equal(result.calls.length, 1);
});

test('checked optional checkbox subscribes only after a successful inquiry', async () => {
  const result = await submitForm({ type: 'speaking_inquiry', checked: true });
  assert.equal(result.subscriptions.length, 1);
  const payload = JSON.parse(result.subscriptions[0].options.body);
  assert.equal(payload.newsletter_optin, true);
  assert.equal(payload.source, 'speaking_inquiry');
  assert.equal(result.calls[0].url, 'https://formspree.io/f/test-only');
});

for (const type of ['contact', 'consulting', 'podcast_inquiry', 'speaking_inquiry', 'community_signup', undefined]) {
  test(`an inquiry without an opt-in control does not subscribe (${type || 'unspecified'})`, async () => {
    const result = await submitForm({ type });
    assert.equal(result.replaced, true);
    assert.equal(result.subscriptions.length, 0);
  });
}

for (const type of ['grimoire', 'eight_dominoes']) {
  test(`dedicated newsletter signup still subscribes (${type})`, async () => {
    const result = await submitForm({ type });
    assert.equal(result.subscriptions.length, 1);
    assert.equal(JSON.parse(result.subscriptions[0].options.body).newsletter_optin, true);
  });
}

test('an explicit unchecked box takes precedence over a dedicated form type', async () => {
  assert.equal((await submitForm({ type: 'grimoire', checked: false })).subscriptions.length, 0);
});

test('consent is captured with the submitted form rather than after the response', async () => {
  assert.equal((await submitForm({ type: 'speaking_inquiry', checked: false, changeWhilePending: true })).subscriptions.length, 0);
  assert.equal((await submitForm({ type: 'speaking_inquiry', checked: true, changeWhilePending: false })).subscriptions.length, 1);
});

for (const failure of [{ ok: false }, { fail: true }]) {
  test(`failed form submission never subscribes (${failure.fail ? 'network' : 'HTTP'})`, async () => {
    const result = await submitForm({ type: 'grimoire', ...failure });
    assert.equal(result.subscriptions.length, 0);
    assert.equal(result.replaced, false);
    assert.equal(result.button.disabled, false);
  });
}
