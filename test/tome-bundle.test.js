'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const { buildSync } = require('esbuild');

const root = path.join(__dirname, '..');

// tome.js is committed so deploys never need a compiler. This guards against
// editing src/tome/*.ts and forgetting `npm run build:tome`.
test('committed tome.js matches a fresh build of src/tome', () => {
  const fresh = buildSync({
    entryPoints: [path.join(root, 'src/tome/main.ts')],
    bundle: true,
    minify: true,
    target: 'es2019',
    format: 'iife',
    legalComments: 'none',
    write: false,
  }).outputFiles[0].text;
  const committed = fs.readFileSync(path.join(root, 'tome.js'), 'utf8');
  const normalize = (s) => s.replace(/\r\n/g, '\n').trim();
  assert.equal(normalize(committed), normalize(fresh), 'tome.js is stale: run `npm run build:tome`');
});

test('every contents entry points at a page that exists', () => {
  const html = fs.readFileSync(path.join(root, 'projects.html'), 'utf8');
  const targets = [...html.matchAll(/data-tome-goto="([^"]+)"/g)].map((m) => m[1]);
  assert.ok(targets.length >= 8, 'expected the contents to list every chapter');
  const pageTags = [...html.matchAll(/<section\b[^>]*\bdata-page\b[^>]*>/g)].map((m) => m[0]);
  for (const id of new Set(targets)) {
    assert.ok(pageTags.some((tag) => tag.includes(` id="${id}"`)), `no page with id="${id}"`);
  }
});

test('pages pair into printed sheets: an even count, cover first', () => {
  const html = fs.readFileSync(path.join(root, 'projects.html'), 'utf8');
  const pages = [...html.matchAll(/<section class="tome-page([^"]*)"[^>]*\bdata-page\b/g)].map((m) => m[1]);
  assert.equal(pages.length % 2, 0, 'a bound book needs an even number of pages');
  assert.match(pages[0], /tome-page--cover/);
  assert.match(pages[pages.length - 1], /tome-page--back-cover/);
  // Odd indexes are left-hand pages, even indexes right-hand.
  pages.forEach((cls, i) => {
    if (i === 0) return;
    assert.match(cls, i % 2 === 1 ? /tome-page--verso/ : /tome-page--recto/, `page ${i} is on the wrong side`);
  });
});
