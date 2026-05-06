import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Intervals } from '../lib/index.js';

test('fromSeconds stores seconds; get returns ms', () => {
    const i = new Intervals();
    i.fromSeconds('poll', 5);
    assert.equal(i.get('poll'), 5000);
});

test('fromMilliseconds normalises to seconds internally', () => {
    const i = new Intervals();
    i.fromMilliseconds('flash', 2500);
    assert.equal(i.get('flash'), 2500);
});

test('fromMinutes converts to ms via seconds', () => {
    const i = new Intervals();
    i.fromMinutes('refresh', 2);
    assert.equal(i.get('refresh'), 120000);
});

test('setters are chainable', () => {
    const i = new Intervals();
    const ret = i.fromSeconds('a', 1).fromMinutes('b', 1).fromMilliseconds('c', 1000);
    assert.equal(ret, i);
    assert.equal(i.get('a'), 1000);
    assert.equal(i.get('b'), 60000);
    assert.equal(i.get('c'), 1000);
});

test('get() falls back to defaultSeconds and warns for unknown keys', () => {
    const i = new Intervals();
    const original = console.error;
    let called = false;
    console.error = () => { called = true; };
    try {
        assert.equal(i.get('missing'), 2000);
        assert.equal(called, true);
        // subsequent calls reuse the stored default without re-warning
        called = false;
        assert.equal(i.get('missing'), 2000);
        assert.equal(called, false);
    } finally {
        console.error = original;
    }
});

test('constructor seed is honoured', () => {
    const i = new Intervals({ seeded: 7 });
    assert.equal(i.get('seeded'), 7000);
});
