import { KeyPress } from '../lib/index.js';

const kp = new KeyPress();

test('Enter', () => {
    expect(kp.Enter({ key: 'Enter' })).toBe(true);
    expect(kp.Enter({ key: 'a' })).toBe(false);
});

test('Escape — accepts both Escape and Esc', () => {
    expect(kp.Escape({ key: 'Escape' })).toBe(true);
    expect(kp.Escape({ key: 'Esc' })).toBe(true);
    expect(kp.Escape({ key: 'x' })).toBe(false);
});

test('Space — accepts both " " and "Spacebar"', () => {
    expect(kp.Space({ key: ' ' })).toBe(true);
    expect(kp.Space({ key: 'Spacebar' })).toBe(true);
    expect(kp.Space({ key: 'a' })).toBe(false);
});

test('Tab / Backspace / Delete', () => {
    expect(kp.Tab({ key: 'Tab' })).toBe(true);
    expect(kp.Backspace({ key: 'Backspace' })).toBe(true);
    expect(kp.Delete({ key: 'Delete' })).toBe(true);
});

test('Arrow keys', () => {
    expect(kp.ArrowUp({ key: 'ArrowUp' })).toBe(true);
    expect(kp.ArrowDown({ key: 'ArrowDown' })).toBe(true);
    expect(kp.ArrowLeft({ key: 'ArrowLeft' })).toBe(true);
    expect(kp.ArrowRight({ key: 'ArrowRight' })).toBe(true);
    expect(kp.ArrowUp({ key: 'ArrowDown' })).toBe(false);
});

test('Navigation keys', () => {
    expect(kp.Home({ key: 'Home' })).toBe(true);
    expect(kp.End({ key: 'End' })).toBe(true);
    expect(kp.PageUp({ key: 'PageUp' })).toBe(true);
    expect(kp.PageDown({ key: 'PageDown' })).toBe(true);
});

test('on() dispatches to the named matcher', () => {
    expect(kp.on('Enter', { key: 'Enter' })).toBe(true);
    expect(kp.on('Enter', { key: 'a' })).toBe(false);
    expect(kp.on('ArrowLeft', { key: 'ArrowLeft' })).toBe(true);
});

test('on() returns false for unknown keys', () => {
    expect(kp.on('NotARealKey', { key: 'Enter' })).toBe(false);
});
