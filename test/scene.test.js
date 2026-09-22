'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'scene.js'), 'utf8');

function eventTarget(properties = {}) {
  const listeners = {};
  return Object.assign(properties, {
    addEventListener(type, handler) { (listeners[type] ||= []).push(handler); },
    removeEventListener(type, handler) {
      listeners[type] = (listeners[type] || []).filter((fn) => fn !== handler);
    },
    dispatch(type) { (listeners[type] || []).slice().forEach((fn) => fn()); },
  });
}

function setup({ reduced = false, saveData = false, effectiveType = '4g', visible = true, hidden = false } = {}) {
  const audio = [];
  const video = {
    dataset: {}, paused: true, currentTime: 0, sources: [], loads: 0,
    getBoundingClientRect: () => visible ? { top: 0, bottom: 900 } : { top: -900, bottom: 0 },
    getAttribute: (name) => ({ 'data-webm': 'study.webm', 'data-mp4': 'study.mp4' })[name],
    appendChild(element) { this.sources.push(element); },
    load() { this.loads++; },
    play() { this.paused = false; return Promise.resolve(); },
    pause() { this.paused = true; },
  };
  const sound = eventTarget({ attributes: {}, setAttribute(k, v) { this.attributes[k] = v; } });
  const hero = { querySelector: () => video };
  const document = eventTarget({
    hidden, readyState: 'loading',
    getElementById: () => hero,
    querySelector: (selector) => selector === '#sceneSoundBtn' ? sound : null,
    createElement: () => ({}),
  });
  const motion = eventTarget({ matches: reduced });
  const connection = eventTarget({ saveData, effectiveType });
  let intersection;
  const window = eventTarget({
    innerHeight: 900,
    requestIdleCallback: (fn) => fn(),
    IntersectionObserver: class {
      constructor(callback) { intersection = callback; }
      observe() {}
    },
  });
  const stored = {};
  vm.runInNewContext(source, {
    window, document, navigator: { connection },
    matchMedia: () => motion, IntersectionObserver: window.IntersectionObserver,
    addEventListener: window.addEventListener, removeEventListener: window.removeEventListener,
    localStorage: { getItem: (key) => stored[key] ?? null, setItem: (key, value) => { stored[key] = value; } },
    Audio: function () {
      const track = eventTarget({
        paused: true,
        play() { this.paused = false; return Promise.resolve(); },
        pause() { this.paused = true; },
      });
      audio.push(track);
      return track;
    },
  });
  return { video, audio, sound, document, motion, connection, window,
    loaded() { window.dispatch('load'); },
    visible(value) { intersection([{ isIntersecting: value }]); },
  };
}

test('video waits for page load, resumes at the same point, and attaches sources only once', () => {
  const s = setup();
  assert.equal(s.video.sources.length, 0);
  s.loaded();
  assert.equal(s.video.paused, false);
  assert.deepEqual(s.video.sources.map((item) => item.src), ['study.webm', 'study.mp4']);
  s.video.currentTime = 94;
  s.visible(false);
  assert.equal(s.video.paused, true);
  s.visible(true);
  assert.equal(s.video.paused, false);
  assert.equal(s.video.currentTime, 94);
  assert.equal(s.video.loads, 1);
  s.document.hidden = true;
  s.document.dispatch('visibilitychange');
  assert.equal(s.video.paused, true);
  s.document.hidden = false;
  s.document.dispatch('visibilitychange');
  assert.equal(s.video.paused, false);
  assert.equal(s.video.loads, 1);
});

test('poster-only visits do not request any video', () => {
  for (const options of [{ reduced: true }, { saveData: true }, { effectiveType: '2g' },
    { effectiveType: 'slow-2g' }, { visible: false }, { hidden: true }]) {
    const s = setup(options);
    s.loaded();
    assert.equal(s.video.sources.length, 0, JSON.stringify(options));
    assert.equal(s.video.paused, true);
  }
});

test('motion and connection preferences are honored when changed during a visit', () => {
  const s = setup({ reduced: true });
  s.loaded();
  s.motion.matches = false;
  s.motion.dispatch('change');
  assert.equal(s.video.paused, false);
  s.connection.saveData = true;
  s.connection.dispatch('change');
  assert.equal(s.video.paused, true);
  s.connection.saveData = false;
  s.connection.dispatch('change');
  assert.equal(s.video.paused, false);
  s.motion.matches = true;
  s.motion.dispatch('change');
  assert.equal(s.video.paused, true);
  assert.equal(s.video.loads, 1);
});

test('original five-track playlist, opening song, volume and music control stay independent', () => {
  const s = setup();
  s.loaded();
  assert.equal(s.audio.length, 0);
  s.sound.dispatch('click');
  const track = s.audio[0];
  assert.equal(track.src, 'dev_assets/audio/spellbound-study.mp3');
  assert.equal(track.volume, 0.45);
  assert.equal(track.paused, false);
  s.visible(false);
  assert.equal(s.video.paused, true);
  assert.equal(track.paused, false);
  for (const song of ['spellbook-loops', 'moonlit-wand', 'moonlit-spellbook', 'spellbook-rain', 'spellbound-study']) {
    track.dispatch('ended');
    assert.equal(track.src, `dev_assets/audio/${song}.mp3`);
    assert.equal(track.paused, false);
  }
  s.sound.dispatch('click');
  assert.equal(track.paused, true);
  s.visible(true);
  assert.equal(s.video.paused, false);
  assert.equal(track.paused, true);
});
