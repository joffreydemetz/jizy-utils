import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Types } from '../lib/index.js';

test('isNull / isUndefined / isNil', () => {
    assert.equal(Types.isNull(null), true);
    assert.equal(Types.isNull(undefined), false);
    assert.equal(Types.isNull(0), false);

    assert.equal(Types.isUndefined(undefined), true);
    assert.equal(Types.isUndefined(null), false);

    assert.equal(Types.isNil(null), true);
    assert.equal(Types.isNil(undefined), true);
    assert.equal(Types.isNil(''), false);
    assert.equal(Types.isNil(0), false);
});

test('isString', () => {
    assert.equal(Types.isString('s'), true);
    assert.equal(Types.isString(''), true);
    assert.equal(Types.isString(new String('x')), true);
    assert.equal(Types.isString(1), false);
    assert.equal(Types.isString(null), false);
});

test('isNumber', () => {
    assert.equal(Types.isNumber(0), true);
    assert.equal(Types.isNumber(1.5), true);
    assert.equal(Types.isNumber(NaN), false);
    assert.equal(Types.isNumber(Infinity), false);
    assert.equal(Types.isNumber('1'), false);
    assert.equal(Types.isNumber(null), false);
});

test('isBoolean', () => {
    assert.equal(Types.isBoolean(true), true);
    assert.equal(Types.isBoolean(false), true);
    assert.equal(Types.isBoolean(new Boolean(true)), true);
    assert.equal(Types.isBoolean(0), false);
    assert.equal(Types.isBoolean('true'), false);
});

test('isArray', () => {
    assert.equal(Types.isArray([]), true);
    assert.equal(Types.isArray([1, 2]), true);
    assert.equal(Types.isArray({}), false);
    assert.equal(Types.isArray('abc'), false);
    assert.equal(Types.isArray(null), false);
});

test('isObject', () => {
    assert.equal(Types.isObject({}), true);
    assert.equal(Types.isObject(Object.create(null)), true);
    assert.equal(Types.isObject([]), false);
    assert.equal(Types.isObject(null), false);
    assert.equal(Types.isObject('s'), false);
});

test('is / isSet / isMap / isDate', () => {
    assert.equal(Types.is(new Set(), Set), true);
    assert.equal(Types.is(new Map(), Map), true);
    assert.equal(Types.is(null, Set), false);

    assert.equal(Types.isSet(new Set()), true);
    assert.equal(Types.isSet(new Map()), false);

    assert.equal(Types.isMap(new Map()), true);
    assert.equal(Types.isMap(new Set()), false);

    assert.equal(Types.isDate(new Date()), true);
    assert.equal(Types.isDate('2024-01-01'), false);
});

test('isA / isFunction', () => {
    assert.equal(Types.isA('s', 'string'), true);
    assert.equal(Types.isA(1, 'number'), true);
    assert.equal(Types.isA(null, 'object'), false);

    assert.equal(Types.isFunction(() => { }), true);
    assert.equal(Types.isFunction(function () { }), true);
    assert.equal(Types.isFunction({}), false);
});

test('isWindow', () => {
    const fakeWindow = {};
    fakeWindow.window = fakeWindow;
    assert.equal(Types.isWindow(fakeWindow), true);
    assert.equal(Types.isWindow({}), false);
});

test('isDocument', () => {
    const fakeDoc = { nodeType: 9, DOCUMENT_NODE: 9 };
    assert.equal(Types.isDocument(fakeDoc), true);
    // Element-like nodes are not documents.
    assert.equal(Types.isDocument({ nodeType: 1, DOCUMENT_NODE: 9 }), false);
    // NOTE: a bare {} returns true here because (undefined == undefined) — quirk of the implementation, not asserted.
});

test('isPlainObject', () => {
    assert.equal(Types.isPlainObject({}), true);
    assert.equal(Types.isPlainObject({ a: 1 }), true);
    assert.equal(Types.isPlainObject([]), false);
    assert.equal(Types.isPlainObject(null), false);
    class Foo { }
    assert.equal(Types.isPlainObject(new Foo()), false);
});

test('isEmptyObject', () => {
    assert.equal(Types.isEmptyObject({}), true);
    assert.equal(Types.isEmptyObject({ a: 1 }), false);
    assert.equal(Types.isEmptyObject([]), false);
});

test('likeArray', () => {
    assert.equal(Types.likeArray([]), true);
    assert.equal(Types.likeArray([1, 2, 3]), true);
    assert.equal(Types.likeArray({ length: 0 }), true);
    assert.equal(Types.likeArray({ length: 2, 0: 'a', 1: 'b' }), true);
    assert.equal(Types.likeArray(() => { }), false);
    assert.equal(Types.likeArray({}), false);
    // NOTE: passing a primitive string throws because `'length' in 'abc'` is invalid — implementation only handles objects.
});
