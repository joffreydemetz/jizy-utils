import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as pkg from '../lib/index.js';

test('public entry exports Types, Functions, KeyPress, MediaQueries, Intervals', () => {
    assert.ok(pkg.Types, 'Types missing');
    assert.ok(pkg.Functions, 'Functions missing');
    assert.ok(pkg.KeyPress, 'KeyPress missing');
    assert.ok(pkg.MediaQueries, 'MediaQueries missing');
    assert.ok(pkg.Intervals, 'Intervals missing');
});

test('KeyPress / MediaQueries / Intervals are constructors', () => {
    assert.equal(typeof pkg.KeyPress, 'function');
    assert.equal(typeof pkg.MediaQueries, 'function');
    assert.equal(typeof pkg.Intervals, 'function');
});
