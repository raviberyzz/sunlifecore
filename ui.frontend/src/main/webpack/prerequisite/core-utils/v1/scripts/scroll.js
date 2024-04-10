/**
 * scroll.js
 * @fileOverview Provides a utility to look for page scroll event.
 */
(function (w, core) {

    /**
     * Scroll method that is debounced
     * @memberof sunCore.util
     * @return void
     */
    core.util.scrolled = (function ($, util) {

        const debouncedScroll = util.debounce(function () {
            $.publish(util.customEvents.SCROLLED);
        }, 200);

        $(w).on(util.customEvents.SCROLL, debouncedScroll);

    })(core.$, core.util);
})(window, window.sunCore);

