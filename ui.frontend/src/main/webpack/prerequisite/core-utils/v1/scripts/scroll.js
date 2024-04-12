/**
 * scroll.js
 * @fileOverview Provides a utility to look for page scroll event.
 */
(function (window, core) {

    /**
     * Scroll method that is debounced
     * @memberof sunCore.util
     * @return void
     */
    core.util.scrolled = (function ($, util) {

        const debouncedScroll = util.debounce(function () {
            $.publish(util.customEvents.SCROLLED);
        }, 200);

        $(window).on(util.customEvents.SCROLL, debouncedScroll);

    })(core.$, core.util);
})(window, window.sunCore);

