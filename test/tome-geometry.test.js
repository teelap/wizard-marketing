'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');
const { test } = require('node:test');
const { buildSync } = require('esbuild');

// The tome's geometry is TypeScript; bundle it to CommonJS in memory so the
// tests exercise the exact source the browser build ships.
function loadGeometry() {
  const out = buildSync({
    entryPoints: [path.join(__dirname, '../src/tome/geometry.ts')],
    bundle: true,
    format: 'cjs',
    platform: 'node',
    write: false,
  });
  const mod = { exports: {} };
  new Function('module', 'exports', out.outputFiles[0].text)(mod, mod.exports);
  return mod.exports;
}

const g = loadGeometry();
const W = 400;
const H = 540;
// Right-hand page of an open spread whose spine sits at x = W.
const rightLeaf = { rect: { x: W, y: 0, w: W, h: H }, spineX: W, corner: g.vec(2 * W, H) };

const near = (actual, expected, eps = 1e-6) =>
  assert.ok(Math.abs(actual - expected) < eps, `expected ${expected}, got ${actual}`);

test('reflection across the spine mirrors x and keeps y', () => {
  const spine = g.reflection(g.vec(W, 0), g.vec(0, 1));
  const p = g.apply(spine, g.vec(W + 30, 77));
  near(p.x, W - 30);
  near(p.y, 77);
});

test('a reflection applied twice is the identity', () => {
  const m = g.reflection(g.vec(12, -5), g.vec(3, 7));
  const twice = g.compose(m, m);
  for (const key of ['a', 'b', 'c', 'd', 'e', 'f']) near(twice[key], g.IDENTITY[key]);
});

test('clipping a rectangle by a half-plane conserves its area', () => {
  const sheet = g.rectPolygon(rightLeaf.rect);
  const origin = g.vec(W + 250, 300);
  const normal = g.vec(-0.6, -0.8);
  const kept = g.clipHalfPlane(sheet, origin, normal, 1);
  const cut = g.clipHalfPlane(sheet, origin, normal, -1);
  near(g.area(kept) + g.area(cut), W * H, 1e-6);
});

test('pointer at rest produces no fold', () => {
  assert.equal(g.computeFold(rightLeaf, rightLeaf.corner), null);
});

test('the dragged corner lands exactly on the pointer', () => {
  const pointer = g.vec(W + 180, H - 90);
  const fold = g.computeFold(rightLeaf, pointer);
  // The resting corner, carried by the fold reflection, must arrive at the pointer.
  const foldOnly = g.reflection(fold.origin, g.vec(-fold.normal.y, fold.normal.x));
  const moved = g.apply(foldOnly, rightLeaf.corner);
  near(moved.x, fold.pointer.x, 1e-6);
  near(moved.y, fold.pointer.y, 1e-6);
});

test('flat and lifted parts of a fold together make the whole page', () => {
  const fold = g.computeFold(rightLeaf, g.vec(W + 120, H - 200));
  near(g.area(fold.flat) + g.area(fold.lifted), W * H, 1e-6);
  assert.ok(g.area(fold.lifted) > 0);
});

test('the back page, mapped by backMatrix, covers the lifted flap exactly', () => {
  const fold = g.computeFold(rightLeaf, g.vec(W + 60, H - 150));
  // Points of the lifted flap, expressed on the back page, must land on the
  // mirror image (across the fold) of where the flap rested.
  const foldOnly = g.reflection(fold.origin, g.vec(-fold.normal.y, fold.normal.x));
  fold.liftedOnBack.forEach((p, i) => {
    const onScreen = g.apply(fold.backMatrix, p);
    const expected = g.apply(foldOnly, fold.lifted[i]);
    near(onScreen.x, expected.x, 1e-6);
    near(onScreen.y, expected.y, 1e-6);
  });
});

test('paper cannot tear: the corner stays within a page-width of the spine', () => {
  const wild = g.vec(-5000, -5000);
  const p = g.constrainPointer(rightLeaf, wild);
  assert.ok(g.length(g.sub(p, g.vec(W, H))) <= W + 1e-6);
  assert.ok(g.length(g.sub(p, g.vec(W, 0))) <= Math.hypot(W, H) + 1e-6);
});

test('progress runs from 0 at rest to 1 at the landing point', () => {
  const landing = g.landingPoint(rightLeaf);
  near(landing.x, 0);
  near(landing.y, H);
  const almost = g.computeFold(rightLeaf, g.vec(1, H));
  assert.ok(almost.progress > 0.99);
  const barely = g.computeFold(rightLeaf, g.vec(2 * W - 8, H));
  assert.ok(barely.progress < 0.02);
});

test('backward turns use the same math from the left page', () => {
  const leftLeaf = { rect: { x: 0, y: 0, w: W, h: H }, spineX: W, corner: g.vec(0, H) };
  const fold = g.computeFold(leftLeaf, g.vec(W + 200, H - 40));
  assert.ok(fold.progress > 0.4 && fold.progress < 0.8);
  near(g.area(fold.flat) + g.area(fold.lifted), W * H, 1e-6);
});

test('CSS helpers emit usable strings', () => {
  const clip = g.toClipPath([g.vec(10, 10), g.vec(20, 10), g.vec(20, 30)], g.vec(10, 0));
  assert.equal(clip, 'polygon(0.00px 10.00px, 10.00px 10.00px, 10.00px 30.00px)');
  assert.equal(g.toClipPath([], g.vec(0, 0)), 'polygon(0 0, 0 0, 0 0)');
  const spine = g.reflection(g.vec(W, 0), g.vec(0, 1));
  // Mirroring the left page (home x = 0) across the spine lands it on the right page.
  const css = g.toCssMatrix(spine, g.vec(0, 0));
  assert.match(css, /^matrix\(.*\)$/);
  assert.deepEqual(css.slice(7, -1).split(',').map(Number), [-1, 0, 0, 1, 2 * W, 0]);
});
