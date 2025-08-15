const defaultOptions = {
    textOff: 'Show',
    textOn: 'Hide',
    onLoad: ($el) => { }
};

import KeyPress from './keypress.js';

export default class Reveal {
    constructor(element, options) {
        this.$el = element;
        this.uid = parseInt(new Date().getTime() / 1000, 10) + (Math.random() * 10).toFixed(8).toString();
        this.uid = this.uid.toString().replace('.', '-');
        this.config = Object.assign({}, defaultOptions, options || {});

        if (typeof this.config.onLoad === 'function') {
            this.config.onLoad(this.$el);
        }

        this.readable = false;

        this.render();
        this.bindEvent();
    }

    render() {
        let button = document.createElement("button");
        button.id = `pwd-${this.uid}`;
        button.innerHTML = `<span>${this.config.textOff}</span>`;
        this.$el.after(button);
    }

    hide() {
        this.readable = false;
        this.$el.setAttribute("type", "password");
        document.querySelector(`#pwd-${this.uid} > span`).classList.remove("readable");
        document.querySelector(`#pwd-${this.uid} > span`).textContent = this.config.textOff;
    }

    show() {
        this.readable = true;
        this.$el.setAttribute("type", "text");
        document.querySelector(`#pwd-${this.uid} > span`).classList.add("readable");
        document.querySelector(`#pwd-${this.uid} > span`).textContent = this.config.textOn;
    }

    bindEvent() {
        document.querySelector(`#pwd-${this.uid}`).addEventListener("click", e => this._onClicked(e));
        window.addEventListener("click", e => this._onClickedOutside(e));
        this.$el.addEventListener("keydown", e => this._onKeyPressed(e));
    }

    _onClicked(e) {
        e.preventDefault();
        this.readable === false ? this.show() : this.hide();
        return false;
    }

    _onClickedOutside(e) {
        if (!this.$el.contains(e.target) && !document.querySelector(`#pwd-${this.uid}`).contains(e.target)) {
            this.hide();
        }
    }

    _onKeyPressed(e) {
        if (KeyPress.on('Enter', e)) {
            e.preventDefault();
            this.hide();
            return false;
        }
    }
}

