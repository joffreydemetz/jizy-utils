export default class Intervals {
    constructor(intervals = {}) {
        this.intervals = intervals;
        this.defaultSeconds = 2;
    }

    fromMilliseconds(key, value) {
        this.intervals[key] = value / 1000;
        return this;
    }

    fromSeconds(key, value) {
        this.intervals[key] = value;
        return this;
    }

    fromMinutes(key, value) {
        this.intervals[key] = value * 60;
        return this;
    }

    get(key) {
        if (this.intervals[key] === undefined) {
            console.error(`No interval set for ${key}, default is set to ${this.defaultSeconds} seconds`);
            this.intervals[key] = this.defaultSeconds;
        }
        return this.intervals[key] * 1000;
    }
};
