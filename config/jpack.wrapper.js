/*! jUtils v@VERSION | @DATE | [@BUNDLE] */
(function (global) {
    "use strict";

    if (typeof global !== "object" || !global) {
        throw new Error("jUtils requires a window");
    }

    if (typeof global.jUtils !== "undefined") {
        throw new Error("jUtils is already defined");
    }

    // @CODE 

    global.jUtils = jUtils;

})(typeof window !== "undefined" ? window : this);