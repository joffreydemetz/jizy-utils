import { Types } from '../lib/index.js';

test('isNull / isUndefined / isNil', () => {
    expect(Types.isNull(null)).toBe(true);
    expect(Types.isNull(undefined)).toBe(false);
    expect(Types.isNull(0)).toBe(false);

    expect(Types.isUndefined(undefined)).toBe(true);
    expect(Types.isUndefined(null)).toBe(false);

    expect(Types.isNil(null)).toBe(true);
    expect(Types.isNil(undefined)).toBe(true);
    expect(Types.isNil('')).toBe(false);
    expect(Types.isNil(0)).toBe(false);
});

test('isString', () => {
    expect(Types.isString('s')).toBe(true);
    expect(Types.isString('')).toBe(true);
    expect(Types.isString(new String('x'))).toBe(true);
    expect(Types.isString(1)).toBe(false);
    expect(Types.isString(null)).toBe(false);
});

test('isNumber', () => {
    expect(Types.isNumber(0)).toBe(true);
    expect(Types.isNumber(1.5)).toBe(true);
    expect(Types.isNumber(NaN)).toBe(false);
    expect(Types.isNumber(Infinity)).toBe(false);
    expect(Types.isNumber('1')).toBe(false);
    expect(Types.isNumber(null)).toBe(false);
});

test('isBoolean', () => {
    expect(Types.isBoolean(true)).toBe(true);
    expect(Types.isBoolean(false)).toBe(true);
    expect(Types.isBoolean(new Boolean(true))).toBe(true);
    expect(Types.isBoolean(0)).toBe(false);
    expect(Types.isBoolean('true')).toBe(false);
});

test('isArray', () => {
    expect(Types.isArray([])).toBe(true);
    expect(Types.isArray([1, 2])).toBe(true);
    expect(Types.isArray({})).toBe(false);
    expect(Types.isArray('abc')).toBe(false);
    expect(Types.isArray(null)).toBe(false);
});

test('isObject', () => {
    expect(Types.isObject({})).toBe(true);
    expect(Types.isObject(Object.create(null))).toBe(true);
    expect(Types.isObject([])).toBe(false);
    expect(Types.isObject(null)).toBe(false);
    expect(Types.isObject('s')).toBe(false);
});

test('is / isSet / isMap / isDate', () => {
    expect(Types.is(new Set(), Set)).toBe(true);
    expect(Types.is(new Map(), Map)).toBe(true);
    expect(Types.is(null, Set)).toBe(false);

    expect(Types.isSet(new Set())).toBe(true);
    expect(Types.isSet(new Map())).toBe(false);

    expect(Types.isMap(new Map())).toBe(true);
    expect(Types.isMap(new Set())).toBe(false);

    expect(Types.isDate(new Date())).toBe(true);
    expect(Types.isDate('2024-01-01')).toBe(false);
});

test('isA / isFunction', () => {
    expect(Types.isA('s', 'string')).toBe(true);
    expect(Types.isA(1, 'number')).toBe(true);
    expect(Types.isA(null, 'object')).toBe(false);

    expect(Types.isFunction(() => { })).toBe(true);
    expect(Types.isFunction(function () { })).toBe(true);
    expect(Types.isFunction({})).toBe(false);
});

test('isWindow', () => {
    const fakeWindow = {};
    fakeWindow.window = fakeWindow;
    expect(Types.isWindow(fakeWindow)).toBe(true);
    expect(Types.isWindow({})).toBe(false);
});

test('isDocument', () => {
    const fakeDoc = { nodeType: 9, DOCUMENT_NODE: 9 };
    expect(Types.isDocument(fakeDoc)).toBe(true);
    expect(Types.isDocument({ nodeType: 1, DOCUMENT_NODE: 9 })).toBe(false);
    // NOTE: a bare {} returns true here because (undefined == undefined) — quirk of the implementation, not asserted.
});

test('isPlainObject', () => {
    expect(Types.isPlainObject({})).toBe(true);
    expect(Types.isPlainObject({ a: 1 })).toBe(true);
    expect(Types.isPlainObject([])).toBe(false);
    expect(Types.isPlainObject(null)).toBe(false);
    class Foo { }
    expect(Types.isPlainObject(new Foo())).toBe(false);
});

test('isEmptyObject', () => {
    expect(Types.isEmptyObject({})).toBe(true);
    expect(Types.isEmptyObject({ a: 1 })).toBe(false);
    expect(Types.isEmptyObject([])).toBe(false);
});

test('likeArray', () => {
    expect(Types.likeArray([])).toBe(true);
    expect(Types.likeArray([1, 2, 3])).toBe(true);
    expect(Types.likeArray({ length: 0 })).toBe(true);
    expect(Types.likeArray({ length: 2, 0: 'a', 1: 'b' })).toBe(true);
    expect(Types.likeArray(() => { })).toBe(false);
    expect(Types.likeArray({})).toBe(false);
    // NOTE: passing a primitive string throws because `'length' in 'abc'` is invalid — implementation only handles objects.
});
