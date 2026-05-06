import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MediaQueries } from '../lib/index.js';

test('default breakpoints are applied', () => {
    const mq = new MediaQueries();
    assert.equal(mq.getBreakpoint('xs'), 480);
    assert.equal(mq.getBreakpoint('sm'), 768);
    assert.equal(mq.getBreakpoint('md'), 992);
    assert.equal(mq.getBreakpoint('lg'), 1200);
});

test('constructor merges custom breakpoints over defaults', () => {
    const mq = new MediaQueries({ md: 1000, xl: 1600 });
    assert.equal(mq.getBreakpoint('xs'), 480);
    assert.equal(mq.getBreakpoint('md'), 1000);
    assert.equal(mq.getBreakpoint('xl'), 1600);
});

test('setBreakpoints merges and is chainable', () => {
    const mq = new MediaQueries();
    const ret = mq.setBreakpoints({ md: 1024 });
    assert.equal(ret, mq);
    assert.equal(mq.getBreakpoint('md'), 1024);
    assert.equal(mq.getBreakpoint('lg'), 1200);
});

test('getBreakpoint returns provided default and warns when key is missing', () => {
    const mq = new MediaQueries();
    const original = console.error;
    let called = false;
    console.error = () => { called = true; };
    try {
        assert.equal(mq.getBreakpoint('nope', 1234), 1234);
        assert.equal(called, true);
    } finally {
        console.error = original;
    }
});

test('buildMediaQuery — single condition', () => {
    const mq = new MediaQueries();
    assert.equal(mq.buildMediaQuery(['min-width:480px']), '(min-width:480px)');
});

test('buildMediaQuery — multiple conditions joined', () => {
    const mq = new MediaQueries();
    assert.equal(
        mq.buildMediaQuery(['min-width:480px', 'max-width:991px']),
        '(min-width:480px and max-width:991px)'
    );
});

test('buildMediaQuery — type and not modifiers', () => {
    const mq = new MediaQueries();
    assert.equal(
        mq.buildMediaQuery(['min-width:480px'], 'and', 'screen', true),
        'not screen (min-width:480px)'
    );
});

test('makeMinWidthQuery / makeMaxWidthQuery / makeMinMaxWidthQuery', () => {
    const mq = new MediaQueries();
    assert.equal(mq.makeMinWidthQuery(768), '(min-width:768px)');
    assert.equal(mq.makeMaxWidthQuery(767), '(max-width:767px)');
    assert.equal(
        mq.makeMinMaxWidthQuery(768, 991),
        '(min-width:768px and max-width:991px)'
    );
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
        assert.equal(mq.xs(), true);
        assert.equal(mq.sm(), true);
        assert.equal(mq.md(), true);
        assert.equal(mq.lg(), true);
        assert.deepEqual(captured, [
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
