# jizy-utils

A simple utilities library for JavaScript applications: type checks, a few PHP-style string and
number helpers, keyboard-event checks, media-query breakpoints and named intervals.

## Install

```sh
npm i jizy-utils
```

ESM only: the package ships its `lib/` sources (no `dist/` bundle, no browser global).

```js
import { Types, Functions, KeyPress, MediaQueries, Intervals } from 'jizy-utils';
```

`Types` and `Functions` are plain objects of functions; `KeyPress`, `MediaQueries` and `Intervals`
are classes to instantiate.

## Types

```js
Types.isString('a');        // true
Types.isPlainObject({});    // true
Types.likeArray(document.querySelectorAll('p')); // true
```

`isNull`, `isUndefined`, `isNil` (null or undefined), `isString`, `isNumber` (finite numbers only),
`isBoolean`, `isArray`, `isObject`, `isPlainObject`, `isEmptyObject`, `isFunction`, `isSet`, `isMap`,
`isDate`, `isWindow`, `isDocument`, `likeArray`, plus the generic `is(x, Constructor)` (instanceof)
and `isA(x, 'typeof name')`. The string, number and boolean checks also accept their wrapper objects
(`new String()`, …).

## Functions

| Function | Description |
|---|---|
| `extend([deep], ...objects)` | Merges the objects into a **new** object (the first one is not modified). Pass `true` first for a deep merge of plain objects. `undefined` values are skipped. |
| `trim(str, charlist?)` | `str.trim()`, or strips the characters of `charlist` from both ends (PHP `trim`). |
| `array_unique(array)` | De-duplicated copy. |
| `number_format(number, decimals, decPoint = ',', thousandsSep = ' ')` | PHP `number_format`; the defaults are the French separators. |
| `sprintf(format, ...args)` | PHP-style `sprintf` (`%s`, `%d`, `%05.2f`, `%1$s`, …). |
| `preg_replace(str, pattern, replacement)` | Global regex replace (`pattern` is a regex source string). |
| `toQueryString(vars)` | `{ a: 1, b: [2, 3] }` → `'?a=1&b[]=2&b[]=3'` (an empty object gives `''`). |
| `strip_tags(input, allowed?)` | Removes HTML tags, keeping the ones listed in `allowed` (`'<a><strong>'`). |
| `isTouchable()` | `true` when the document supports touch events. |

## KeyPress

```js
const keys = new KeyPress();

input.addEventListener('keydown', (event) => {
    if (keys.Enter(event)) {
        console.log('Enter key pressed');
    }
    // or by name
    if (keys.on('Escape', event)) {
        input.blur();
    }
});
```

Checks `event.key`: `Enter`, `Escape` (also `Esc`), `Space` (also `Spacebar`), `Tab`, `Backspace`,
`Delete`, `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `Home`, `End`, `PageUp`, `PageDown`.
`on(name, event)` returns `false` for an unknown name.

## MediaQueries

```js
const mq = new MediaQueries({ sm: 640 });   // merged over the defaults

if (mq.xs()) {
    // narrower than the sm breakpoint
}

mq.makeMinWidthQuery(mq.getBreakpoint('md'));   // '(min-width:992px)'
mq.matches('(prefers-reduced-motion: reduce)');
```

Default breakpoints: `xs` 480, `sm` 768, `md` 992, `lg` 1200 (px). `xs()`, `sm()`, `md()` and
`lg()` test the current viewport against the band each one covers (`xs()` is below `sm`, `lg()` is
from `lg` up). Query builders: `makeMinWidthQuery(min, type?, not?)`,
`makeMaxWidthQuery(max, type?, not?)`, `makeMinMaxWidthQuery(min, max, type?, not?)` and
`makeQuery(parts, joiner = 'and', type = '', not = false)`. `setBreakpoints({...})` merges more
breakpoints; `getBreakpoint(key, def = 1000)` logs an error and returns `def` for an unknown key.

## Intervals

Named durations, stored in seconds and read back in milliseconds:

```js
const intervals = new Intervals()
    .fromSeconds('poll', 30)
    .fromMinutes('session', 15)
    .fromMilliseconds('debounce', 250);

setInterval(check, intervals.get('poll'));   // 30000
```

`get()` on an unknown key logs an error and stores the default (2 seconds). The constructor also
accepts an initial `{ name: seconds }` map.

## Tests

```sh
npm test
```

Jest, run in ESM mode (`node --experimental-vm-modules`).

## License

MIT — see [LICENSE](LICENSE).
