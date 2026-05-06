import { jest } from '@jest/globals';
import { MediaQueries } from '../lib/index.js';

test('default breakpoints are applied', () => {
    const mq = new MediaQueries();
    expect(mq.getBreakpoint('xs')).toBe(480);
    expect(mq.getBreakpoint('sm')).toBe(768);
    expect(mq.getBreakpoint('md')).toBe(992);
    expect(mq.getBreakpoint('lg')).toBe(1200);
});

test('constructor merges custom breakpoints over defaults', () => {
    const mq = new MediaQueries({ md: 1000, xl: 1600 });
    expect(mq.getBreakpoint('xs')).toBe(480);
    expect(mq.getBreakpoint('md')).toBe(1000);
    expect(mq.getBreakpoint('xl')).toBe(1600);
});

test('setBreakpoints merges and is chainable', () => {
    const mq = new MediaQueries();
    const ret = mq.setBreakpoints({ md: 1024 });
    expect(ret).toBe(mq);
    expect(mq.getBreakpoint('md')).toBe(1024);
    expect(mq.getBreakpoint('lg')).toBe(1200);
});

test('getBreakpoint returns provided default and warns when key is missing', () => {
    const mq = new MediaQueries();
    const spy = jest.spyOn(console, 'error').mockImplementation(() => { });
    try {
        expect(mq.getBreakpoint('nope', 1234)).toBe(1234);
        expect(spy).toHaveBeenCalledTimes(1);
    } finally {
        spy.mockRestore();
    }
});

test('buildMediaQuery — single condition', () => {
    const mq = new MediaQueries();
    expect(mq.buildMediaQuery(['min-width:480px'])).toBe('(min-width:480px)');
});

test('buildMediaQuery — multiple conditions joined', () => {
    const mq = new MediaQueries();
    expect(mq.buildMediaQuery(['min-width:480px', 'max-width:991px']))
        .toBe('(min-width:480px and max-width:991px)');
});

test('buildMediaQuery — type and not modifiers', () => {
    const mq = new MediaQueries();
    expect(mq.buildMediaQuery(['min-width:480px'], 'and', 'screen', true))
        .toBe('not screen (min-width:480px)');
});

test('makeMinWidthQuery / makeMaxWidthQuery / makeMinMaxWidthQuery', () => {
    const mq = new MediaQueries();
    expect(mq.makeMinWidthQuery(768)).toBe('(min-width:768px)');
    expect(mq.makeMaxWidthQuery(767)).toBe('(max-width:767px)');
    expect(mq.makeMinMaxWidthQuery(768, 991))
        .toBe('(min-width:768px and max-width:991px)');
});

test('xs/sm/md/lg call window.matchMedia with correct queries', () => {
    const mq = new MediaQueries();
    const captured = [];
    const originalWindow = globalThis.window;
    globalThis.window = {
        matchMedia: (q) => {
            captured.push(q);
            return { matches: true };
        },
    };
    try {
        expect(mq.xs()).toBe(true);
        expect(mq.sm()).toBe(true);
        expect(mq.md()).toBe(true);
        expect(mq.lg()).toBe(true);
        expect(captured).toEqual([
            '(max-width:767px)',
            '(min-width:768px and max-width:991px)',
            '(min-width:992px and max-width:1199px)',
            '(min-width:1200px)',
        ]);
    } finally {
        if (originalWindow === undefined) delete globalThis.window;
        else globalThis.window = originalWindow;
    }
});
