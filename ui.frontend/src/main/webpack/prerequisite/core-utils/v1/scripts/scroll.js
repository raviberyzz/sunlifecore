/**
 * scroll.js
 * @fileOverview Provides a utility to look for page scroll event.
 */
(function (window, core) {

    /**
     * Scroll util to bind scroll event and publish debounced scrolled event when scroll is triggered.
     * @memberof sunCore.util
     * @return void
     */
    core.util.scrolled = (function ($, util) {
        const delays = {
            quick: 10,
            longer: 100
        }

        const debouncedScroll = util.debounce(function () {
            $.publish(util.customEvents.SCROLLED);
        }, delays.longer);

        const quickScroll = util.debounce(function () {
            $.publish(util.customEvents.INSTANTSCROLLED);
        }, delays.quick);

        $(window).on(util.customEvents.SCROLL, function(){
            quickScroll();
            debouncedScroll();
        });

    })(core.$, core.util);
})(window, window.sunCore);

