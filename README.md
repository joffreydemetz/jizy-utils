# jizy-utils 

A simple utilities library for JavaScript applications.

## Features

- **functions.js**: Utility functions for object extension (deep and shallow merge), string trimming, and more.
- **intervals.js**: Class for managing time intervals in milliseconds, seconds, or minutes, with named keys and default values.
- **keypress.js**: Class for handling keypress events, with helpers for common keys (Enter, Escape, Arrow keys, etc.).
- **mediaqueries.js**: Class for managing CSS media query breakpoints and generating media query strings.
- **tracker.js**: Simple event tracker class for registering tracker callbacks and tracking events.
- **types.js**: Type-checking utilities for null, undefined, string, number, boolean, array, object, Set, Map, Date, function, window, and document.

### KeyPress Handling

Simple way to handle keypress events.

```js
import { KeyPress } from 'jizy-utils';

if (KeyPress.on('Enter', event)) {
    console.log('Enter key pressed');
}
// OR 
if (KeyPress.Enter(event)) {
    console.log('Enter key pressed');
}
```
