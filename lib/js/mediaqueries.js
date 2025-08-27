const defaultBreakpoints = {
    xs: 480,
    sm: 768,
    md: 992,
    lg: 1200
};

export default class MediaQueries {
    constructor(breakpoints = {}) {
        breakpoints = breakpoints || {};
        this.setBreakpoints({ ...defaultBreakpoints, ...breakpoints });
    }

    setBreakpoints(breakpoints) {
        this.breakpoints = { ...this.breakpoints, ...breakpoints };
        return this;
    }

    getBreakpoint(key, def = 1000) {
        if (typeof this.breakpoints[key] === 'undefined') {
            console.error(`No breakpoint set for ${key}, default is set to ${def}px`);
            return def;
        }
        return this.breakpoints[key];
    }

    buildMediaQuery(query, joiner = 'and', type = '', not = false) {
        const parts = [];
        if (not) parts.push('not');
        if (type) parts.push(type);
        parts.push(`(${query.join(` ${joiner} `)})`);
        return parts.join(' ');
    }

    makeQuery(queryParts, joiner = 'and', type = '', not = false) {
        return this.buildMediaQuery(queryParts, joiner, type, not);
    }

    makeMinMaxWidthQuery(min, max, type, not) {
        return this.makeQuery([`min-width:${min}px`, `max-width:${max}px`], 'and', type, not);
    }

    makeMinWidthQuery(min, type, not) {
        return this.makeQuery([`min-width:${min}px`], 'and', type, not);
    }

    makeMaxWidthQuery(max, type, not) {
        return this.makeQuery([`max-width:${max}px`], 'and', type, not);
    }

    matches(query) {
        return window.matchMedia(query).matches;
    }

    xs() {
        return this.matches(this.makeMaxWidthQuery(this.breakpoints.sm - 1));
    }

    sm() {
        return this.matches(this.makeMinMaxWidthQuery(this.breakpoints.sm, this.breakpoints.md - 1));
    }

    md() {
        return this.matches(this.makeMinMaxWidthQuery(this.breakpoints.md, this.breakpoints.lg - 1));
    }

    lg() {
        return this.matches(this.makeMinWidthQuery(this.breakpoints.lg));
    }
}
