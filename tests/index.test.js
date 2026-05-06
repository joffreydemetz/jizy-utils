import * as pkg from '../lib/index.js';

test('public entry exports Types, Functions, KeyPress, MediaQueries, Intervals', () => {
    expect(pkg.Types).toBeTruthy();
    expect(pkg.Functions).toBeTruthy();
    expect(pkg.KeyPress).toBeTruthy();
    expect(pkg.MediaQueries).toBeTruthy();
    expect(pkg.Intervals).toBeTruthy();
});

test('KeyPress / MediaQueries / Intervals are constructors', () => {
    expect(typeof pkg.KeyPress).toBe('function');
    expect(typeof pkg.MediaQueries).toBe('function');
    expect(typeof pkg.Intervals).toBe('function');
});
