/**
 * scroll.js
 * @fileOverview Provides a utility to look for page scroll event.
 */
(function(w, core) {
    'use strict';

    core.util.scroll = (function($, util) {
        var scrollEvent = 'scroll.core-scroll',

            onScrollEvent = function() {

                console.log("onscrollevent");

                $.publish(util.customEvents.SCROLLED);

            };

        $(w).on(scrollEvent, onScrollEvent);
    })(core.$, core.util);
})(window, window.sunCore);

