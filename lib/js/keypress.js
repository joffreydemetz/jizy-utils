export default class KeyPress {
    on(key, event) {
        if (this[key] && this[key](event)) {
            return true;
        }
        return false;
    }

    Enter(event) { return event.key === 'Enter'; }
    Escape(event) { return event.key === 'Escape' || event.key === 'Esc'; }
    Space(event) { return event.key === ' ' || event.key === 'Spacebar'; }
    Tab(event) { return event.key === 'Tab'; }
    Backspace(event) { return event.key === 'Backspace'; }
    Delete(event) { return event.key === 'Delete'; }
    ArrowUp(event) { return event.key === 'ArrowUp'; }
    ArrowDown(event) { return event.key === 'ArrowDown'; }
    ArrowLeft(event) { return event.key === 'ArrowLeft'; }
    ArrowRight(event) { return event.key === 'ArrowRight'; }
    Home(event) { return event.key === 'Home'; }
    End(event) { return event.key === 'End'; }
    PageUp(event) { return event.key === 'PageUp'; }
    PageDown(event) { return event.key === 'PageDown'; }
}
