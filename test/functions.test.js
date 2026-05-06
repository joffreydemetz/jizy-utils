import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Functions } from '../lib/index.js';

test('extend (shallow)', () => {
    const a = { x: 1, y: 2 };
    const b = { y: 3, z: 4 };
    assert.deepEqual(Functions.extend(a, b), { x: 1, y: 3, z: 4 });
});

test('extend (shallow) — undefined values are skipped', () => {
    assert.deepEqual(Functions.extend({ a: 1 }, { a: undefined, b: 2 }), { a: 1, b: 2 });
});

test('extend (deep)', () => {
    const a = { nested: { x: 1, y: 2 } };
    const b = { nested: { y: 9, z: 3 } };
    assert.deepEqual(Functions.extend(true, a, b), { nested: { x: 1, y: 9, z: 3 } });
});

test('extend ignores falsy source args', () => {
    assert.deepEqual(Functions.extend({ a: 1 }, null, undefined, { b: 2 }), { a: 1, b: 2 });
});

test('trim — no charlist', () => {
    assert.equal(Functions.trim('  hello  '), 'hello');
    assert.equal(Functions.trim('\n\t hi\r\n'), 'hi');
    assert.equal(Functions.trim('nothing'), 'nothing');
});

test('trim — with charlist', () => {
    assert.equal(Functions.trim('xxhixx', 'x'), 'hi');
    assert.equal(Functions.trim('---hi---', '-'), 'hi');
    assert.equal(Functions.trim('xyhixy', 'xy'), 'hi');
});

test('trim — string of only trim chars collapses to empty', () => {
    assert.equal(Functions.trim('xxxx', 'x'), '');
});

test('array_unique', () => {
    assert.deepEqual(Functions.array_unique([1, 2, 2, 3, 3, 3]), [1, 2, 3]);
    assert.deepEqual(Functions.array_unique(['a', 'b', 'a']), ['a', 'b']);
    assert.deepEqual(Functions.array_unique([]), []);
});

test('number_format — defaults (comma decimal, space thousands)', () => {
    assert.equal(Functions.number_format(1234.5), '1 235');
    assert.equal(Functions.number_format(1234.5, 2), '1 234,50');
});

test('number_format — custom separators', () => {
    assert.equal(Functions.number_format(1234567.891, 2, '.', ','), '1,234,567.89');
    assert.equal(Functions.number_format(0.5, 0), '1');
});

test('number_format — pads decimals', () => {
    assert.equal(Functions.number_format(1, 3, '.', ','), '1.000');
});

test('sprintf — %s string substitution', () => {
    assert.equal(Functions.sprintf('%s world', 'hello'), 'hello world');
    assert.equal(Functions.sprintf('%s + %s = %s', 'a', 'b', 'ab'), 'a + b = ab');
});

test('sprintf — %d integer (truncates floats)', () => {
    assert.equal(Functions.sprintf('count: %d', 42), 'count: 42');
    assert.equal(Functions.sprintf('%d', 3.7), '3');
    assert.equal(Functions.sprintf('%d', -2.9), '-2');
});

test('sprintf — %% literal percent', () => {
    assert.equal(Functions.sprintf('%d%%', 50), '50%');
});

test('sprintf — width and zero-padding', () => {
    assert.equal(Functions.sprintf('%05d', 42), '00042');
    assert.equal(Functions.sprintf('%-5s|', 'hi'), 'hi   |');
});

test('sprintf — hex / octal / binary', () => {
    assert.equal(Functions.sprintf('%x', 255), 'ff');
    assert.equal(Functions.sprintf('%X', 255), 'FF');
    assert.equal(Functions.sprintf('%o', 8), '10');
    assert.equal(Functions.sprintf('%b', 5), '101');
});

test('sprintf — %f float precision', () => {
    assert.equal(Functions.sprintf('%.2f', 3.14159), '3.14');
});

test('preg_replace', () => {
    assert.equal(Functions.preg_replace('a1b2c3', '[0-9]', '#'), 'a#b#c#');
    assert.equal(Functions.preg_replace('hello hello', 'hello', 'hi'), 'hi hi');
});

test('toQueryString — scalar values', () => {
    assert.equal(Functions.toQueryString({ a: 1, b: 'two' }), '?a=1&b=two');
});

test('toQueryString — array values use literal `[]` (not percent-encoded)', () => {
    assert.equal(Functions.toQueryString({ tags: ['x', 'y'] }), '?tags[]=x&tags[]=y');
});

test('toQueryString — empty', () => {
    assert.equal(Functions.toQueryString({}), '');
});

test('toQueryString — encodes special chars', () => {
    assert.equal(Functions.toQueryString({ q: 'a b&c' }), '?q=a%20b%26c');
});

test('strip_tags — strips all tags by default', () => {
    assert.equal(Functions.strip_tags('<p>hello <b>world</b></p>'), 'hello world');
});

test('strip_tags — preserves allowed tags', () => {
    assert.equal(Functions.strip_tags('<p>hello <b>world</b></p>', '<b>'), 'hello <b>world</b>');
});

test('strip_tags — handles attributes', () => {
    assert.equal(Functions.strip_tags('<a href="x">link</a>'), 'link');
});
