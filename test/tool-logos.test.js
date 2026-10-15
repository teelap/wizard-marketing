'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { MARKS, OUT_DIR, renderMark } = require('../content/assets/tool-logos/build.js');

const toolsHtml = fs.readFileSync(path.join(__dirname, '../tools.html'), 'utf8');
const logoSrcs = [...toolsHtml.matchAll(/<img src="\/dev_assets\/tools\/([a-z-]+)\.svg/g)].map((m) => m[1]);

test('every tool card on /tools shows a logo', () => {
  const cards = toolsHtml.match(/<div class="svc card/g) || [];
  assert.equal(logoSrcs.length, cards.length);
});

test('every logo the page links to has a mark and a file', () => {
  const slugs = new Set(MARKS.map((m) => m.slug));
  for (const slug of logoSrcs) {
    assert.ok(slugs.has(slug), `${slug} is missing from marks.json`);
    assert.ok(fs.existsSync(path.join(OUT_DIR, `${slug}.svg`)), `${slug}.svg was never built`);
  }
});

test('the committed SVGs match what build.js draws', () => {
  for (const mark of MARKS) {
    // git on Windows may check the files out with CRLF line endings.
    const built = fs.readFileSync(path.join(OUT_DIR, `${mark.slug}.svg`), 'utf8').replace(/\r\n/g, '\n');
    assert.equal(built, renderMark(mark), `${mark.slug}.svg is stale; run node content/assets/tool-logos/build.js`);
  }
});

test('marks only use brand colours', () => {
  const bad = { ...MARKS[0], color: 'magenta', parts: [{ d: 'M0 0h1v1z' }] };
  assert.throws(() => renderMark(bad), /unknown colour "magenta"/);
});
