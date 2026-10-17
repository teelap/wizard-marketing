'use strict';

// /x is an X player card (twitter:card=player). If any of this drifts, X falls
// back to a plain link or shows a blank iframe, and nothing errors to tell us.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'x.html'), 'utf8');
const vercel = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
const meta = (attr, name) => {
  const m = html.match(new RegExp(`<meta ${attr}="${name}" content="([^"]+)"`));
  return m && m[1];
};
const header = (rule, key) => (rule.headers.find((h) => h.key === key) || {}).value;

test('the tweeted page carries the player card tags with absolute URLs', () => {
  assert.equal(meta('name', 'twitter:card'), 'player');
  assert.equal(meta('name', 'twitter:player'), 'https://www.jakethewizard.com/x?embed=1');
  assert.equal(meta('name', 'twitter:player:width'), '640');
  assert.equal(meta('name', 'twitter:player:height'), '480');
  for (const image of [meta('name', 'twitter:image'), meta('property', 'og:image')]) {
    assert.match(image, /^https:\/\/www\.jakethewizard\.com\/dev_assets\/x\/[\w.-]+\.png$/);
  }
});

test('the poster exists and is a 1200x900 PNG under 5MB', () => {
  const file = path.join(root, new URL(meta('name', 'twitter:image')).pathname);
  const png = fs.readFileSync(file);
  assert.equal(png.toString('ascii', 1, 4), 'PNG');
  assert.deepEqual([png.readUInt32BE(16), png.readUInt32BE(20)], [1200, 900]);
  assert.ok(png.length < 5 * 1024 * 1024);
});

test('X may frame /x, and every other route keeps X-Frame-Options', () => {
  const xRule = vercel.headers.find((r) => r.source === '/x');
  assert.ok(xRule, 'vercel.json needs a /x header rule');
  assert.equal(header(xRule, 'X-Frame-Options'), undefined);
  assert.match(header(xRule, 'Content-Security-Policy'), /frame-ancestors 'self' https:\/\/x\.com https:\/\/\*\.x\.com https:\/\/twitter\.com https:\/\/\*\.twitter\.com/);

  const site = vercel.headers.find((r) => header(r, 'X-Frame-Options') === 'SAMEORIGIN');
  const matches = new RegExp(`^${site.source}$`);
  assert.equal(matches.test('/x'), false, 'the SAMEORIGIN rule must skip /x');
  for (const p of ['/', '/links', '/xyz', '/x-files', '/api/subscribe']) assert.equal(matches.test(p), true, p);
  // Apart from frame-ancestors, /x keeps the site's CSP.
  assert.equal(header(xRule, 'Content-Security-Policy').replace(/; frame-ancestors .*$/, ''), header(site, 'Content-Security-Policy'));
});

test('the build ships the page and the download folder', () => {
  const build = fs.readFileSync(path.join(root, 'build.js'), 'utf8');
  assert.match(build, /'x\.html',/);
  assert.match(build, /const PUBLIC_DIRS = \[[^\]]*'downloads'/);
});

test('the success state links the free sample, opening in a new tab', () => {
  const link = html.match(/<a class="btn" href="(\/downloads\/[^"]+)" target="_blank" rel="noopener">/);
  assert.ok(link, 'download link must open in a new tab');
  assert.ok(fs.existsSync(path.join(root, link[1])), `${link[1]} is missing`);
  assert.match(html, /href="https:\/\/itsjakethewizard\.gumroad\.com\/l\/brief-it" target="_blank" rel="noopener"/);
});

test('only the free sample is public: the paid Brief It pack never ships', () => {
  assert.deepEqual(fs.readdirSync(path.join(root, 'downloads')), ['Brief-It-Free-Sample.pdf']);
});

test('the card submits with fetch and tags the signup source', () => {
  assert.match(html, /event\.preventDefault\(\)/);
  assert.match(html, /source: 'x_card_brief_it_sample', signup_page: '\/x'/);
  assert.match(html, /name="newsletter_optin" value="yes" required/);
  // Real calls only: a code comment mentions alert() on purpose.
  assert.doesNotMatch(html, /window\.top\b|\balert\(\s*['"\w]|\bconfirm\(\s*['"\w]/);
});
