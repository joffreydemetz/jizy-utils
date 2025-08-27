# jizy-utils 

A simple utilities library for JavaScript applications.

## Features

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
