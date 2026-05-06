import { test } from 'node:test';
import assert from 'node:assert/strict';
import { KeyPress } from '../lib/index.js';

const kp = new KeyPress();

test('Enter', () => {
    assert.equal(kp.Enter({ key: 'Enter' }), true);
    assert.equal(kp.Enter({ key: 'a' }), false);
});

test('Escape — accepts both Escape and Esc', () => {
    assert.equal(kp.Escape({ key: 'Escape' }), true);
    assert.equal(kp.Escape({ key: 'Esc' }), true);
    assert.equal(kp.Escape({ key: 'x' }), false);
});

test('Space — accepts both " " and "Spacebar"', () => {
    assert.equal(kp.Space({ key: ' ' }), true);
    assert.equal(kp.Space({ key: 'Spacebar' }), true);
    assert.equal(kp.Space({ key: 'a' }), false);
});

test('Tab / Backspace / Delete', () => {
    assert.equal(kp.Tab({ key: 'Tab' }), true);
    assert.equal(kp.Backspace({ key: 'Backspace' }), true);
    assert.equal(kp.Delete({ key: 'Delete' }), true);
});

test('Arrow keys', () => {
    assert.equal(kp.ArrowUp({ key: 'ArrowUp' }), true);
    assert.equal(kp.ArrowDown({ key: 'ArrowDown' }), true);
    assert.equal(kp.ArrowLeft({ key: 'ArrowLeft' }), true);
    assert.equal(kp.ArrowRight({ key: 'ArrowRight' }), true);
    assert.equal(kp.ArrowUp({ key: 'ArrowDown' }), false);
});

test('Navigation keys', () => {
    assert.equal(kp.Home({ key: 'Home' }), true);
    assert.equal(kp.End({ key: 'End' }), true);
    assert.equal(kp.PageUp({ key: 'PageUp' }), true);
    assert.equal(kp.PageDown({ key: 'PageDown' }), true);
});

test('on() dispatches to the named matcher', () => {
    assert.equal(kp.on('Enter', { key: 'Enter' }), true);
    assert.equal(kp.on('Enter', { key: 'a' }), false);
    assert.equal(kp.on('ArrowLeft', { key: 'ArrowLeft' }), true);
});

test('on() returns false for unknown keys', () => {
    assert.equal(kp.on('NotARealKey', { key: 'Enter' }), false);
});
