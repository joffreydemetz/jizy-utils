import { jest } from '@jest/globals';
import { Intervals } from '../lib/index.js';

test('fromSeconds stores seconds; get returns ms', () => {
    const i = new Intervals();
    i.fromSeconds('poll', 5);
    expect(i.get('poll')).toBe(5000);
});

test('fromMilliseconds normalises to seconds internally', () => {
    const i = new Intervals();
    i.fromMilliseconds('flash', 2500);
    expect(i.get('flash')).toBe(2500);
});

test('fromMinutes converts to ms via seconds', () => {
    const i = new Intervals();
    i.fromMinutes('refresh', 2);
    expect(i.get('refresh')).toBe(120000);
});

test('setters are chainable', () => {
    const i = new Intervals();
    const ret = i.fromSeconds('a', 1).fromMinutes('b', 1).fromMilliseconds('c', 1000);
    expect(ret).toBe(i);
    expect(i.get('a')).toBe(1000);
    expect(i.get('b')).toBe(60000);
    expect(i.get('c')).toBe(1000);
});

test('get() falls back to defaultSeconds and warns for unknown keys', () => {
    const i = new Intervals();
    const spy = jest.spyOn(console, 'error').mockImplementation(() => { });
    try {
        expect(i.get('missing')).toBe(2000);
        expect(spy).toHaveBeenCalledTimes(1);
        // subsequent calls reuse the stored default without re-warning
        spy.mockClear();
        expect(i.get('missing')).toBe(2000);
        expect(spy).not.toHaveBeenCalled();
    } finally {
        spy.mockRestore();
    }
});

test('constructor seed is honoured', () => {
    const i = new Intervals({ seeded: 7 });
    expect(i.get('seeded')).toBe(7000);
});
