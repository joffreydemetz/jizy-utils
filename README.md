# jizy-utils 

A simple utilities library for JavaScript applications.

## Features

### KeyPress Handling

Simple way to handle keypress events.

```javascript
import { KeyPress } from 'jizy-utils';

KeyPress.on('Enter', (event) => {
    console.log('Enter key pressed');
});
```

### Reveal

Provides a way to reveal or hide sensitive information, such as passwords, in input fields.

```javascript
import { Reveal } from 'jizy-utils';

const passwordField = document.querySelector('#password');
const revealToggle = new Reveal(passwordField, {
    textOff: 'Show',
    textOn: 'Hide',
    onLoad: (element) => {
        // perform some stuff on the input element
    }
});
```
