import { Functions } from '../lib/index.js';

test('extend (shallow)', () => {
    const a = { x: 1, y: 2 };
    const b = { y: 3, z: 4 };
    expect(Functions.extend(a, b)).toEqual({ x: 1, y: 3, z: 4 });
});

test('extend (shallow) — undefined values are skipped', () => {
    expect(Functions.extend({ a: 1 }, { a: undefined, b: 2 })).toEqual({ a: 1, b: 2 });
});

test('extend (deep)', () => {
    const a = { nested: { x: 1, y: 2 } };
    const b = { nested: { y: 9, z: 3 } };
    expect(Functions.extend(true, a, b)).toEqual({ nested: { x: 1, y: 9, z: 3 } });
});

test('extend ignores falsy source args', () => {
    expect(Functions.extend({ a: 1 }, null, undefined, { b: 2 })).toEqual({ a: 1, b: 2 });
});

test('trim — no charlist', () => {
    expect(Functions.trim('  hello  ')).toBe('hello');
    expect(Functions.trim('\n\t hi\r\n')).toBe('hi');
    expect(Functions.trim('nothing')).toBe('nothing');
});

test('trim — with charlist', () => {
    expect(Functions.trim('xxhixx', 'x')).toBe('hi');
    expect(Functions.trim('---hi---', '-')).toBe('hi');
    expect(Functions.trim('xyhixy', 'xy')).toBe('hi');
});

test('trim — string of only trim chars collapses to empty', () => {
    expect(Functions.trim('xxxx', 'x')).toBe('');
});

test('array_unique', () => {
    expect(Functions.array_unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    expect(Functions.array_unique(['a', 'b', 'a'])).toEqual(['a', 'b']);
    expect(Functions.array_unique([])).toEqual([]);
});

test('number_format — defaults (comma decimal, space thousands)', () => {
    expect(Functions.number_format(1234.5)).toBe('1 235');
    expect(Functions.number_format(1234.5, 2)).toBe('1 234,50');
});

test('number_format — custom separators', () => {
    expect(Functions.number_format(1234567.891, 2, '.', ',')).toBe('1,234,567.89');
    expect(Functions.number_format(0.5, 0)).toBe('1');
});

test('number_format — pads decimals', () => {
    expect(Functions.number_format(1, 3, '.', ',')).toBe('1.000');
});

test('sprintf — %s string substitution', () => {
    expect(Functions.sprintf('%s world', 'hello')).toBe('hello world');
    expect(Functions.sprintf('%s + %s = %s', 'a', 'b', 'ab')).toBe('a + b = ab');
});

test('sprintf — %d integer (truncates floats)', () => {
    expect(Functions.sprintf('count: %d', 42)).toBe('count: 42');
    expect(Functions.sprintf('%d', 3.7)).toBe('3');
    expect(Functions.sprintf('%d', -2.9)).toBe('-2');
});

test('sprintf — %% literal percent', () => {
    expect(Functions.sprintf('%d%%', 50)).toBe('50%');
});

test('sprintf — width and zero-padding', () => {
    expect(Functions.sprintf('%05d', 42)).toBe('00042');
    expect(Functions.sprintf('%-5s|', 'hi')).toBe('hi   |');
});

test('sprintf — hex / octal / binary', () => {
    expect(Functions.sprintf('%x', 255)).toBe('ff');
    expect(Functions.sprintf('%X', 255)).toBe('FF');
    expect(Functions.sprintf('%o', 8)).toBe('10');
    expect(Functions.sprintf('%b', 5)).toBe('101');
});

test('sprintf — %f float precision', () => {
    expect(Functions.sprintf('%.2f', 3.14159)).toBe('3.14');
});

test('preg_replace', () => {
    expect(Functions.preg_replace('a1b2c3', '[0-9]', '#')).toBe('a#b#c#');
    expect(Functions.preg_replace('hello hello', 'hello', 'hi')).toBe('hi hi');
});

test('toQueryString — scalar values', () => {
    expect(Functions.toQueryString({ a: 1, b: 'two' })).toBe('?a=1&b=two');
});

test('toQueryString — array values use literal `[]` (not percent-encoded)', () => {
    expect(Functions.toQueryString({ tags: ['x', 'y'] })).toBe('?tags[]=x&tags[]=y');
});

test('toQueryString — empty', () => {
    expect(Functions.toQueryString({})).toBe('');
});

test('toQueryString — encodes special chars', () => {
    expect(Functions.toQueryString({ q: 'a b&c' })).toBe('?q=a%20b%26c');
});

test('strip_tags — strips all tags by default', () => {
    expect(Functions.strip_tags('<p>hello <b>world</b></p>')).toBe('hello world');
});

test('strip_tags — preserves allowed tags', () => {
    expect(Functions.strip_tags('<p>hello <b>world</b></p>', '<b>')).toBe('hello <b>world</b>');
});

test('strip_tags — handles attributes', () => {
    expect(Functions.strip_tags('<a href="x">link</a>')).toBe('link');
});
