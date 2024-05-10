/**
 * resized.js
 * @fileOverview Provides a utility to look for page resized event.
 */
(function(w, core) {
    'use strict';

    core.util.resize = (function($, util) {
        var resizeEvent = 'resize.core-resize orientationchange.core-resize',
            delayTimer = 250,
            timer,
            wWidth = $(w).width(),
            wHeight = $(w).height(),
            onResizeEventWithDelay = function() {
                if (timer !== undefined) {
                    w.clearTimeout(timer);
                }

                timer = w.setTimeout(function() {
                    //adding this checks on some mobiles when scrolling it things that we resized screen
                    if ($(w).width() !== wWidth || $(w).height() !== wHeight) {
                        wWidth = $(w).width();
                        wHeight = $(w).height();

                        $.publish(util.customEvents.RESIZED);
                    }
                }, delayTimer);
            },
            onResizeEvent = function() {
                //adding this checks on some mobiles when scrolling it things that we resized screen
                if ($(w).width() !== wWidth || $(w).height() !== wHeight) {
                    wWidth = $(w).width();
                    wHeight = $(w).height();

                    $.publish(util.customEvents.RESIZE);
                }
            };
        $(w).on(resizeEvent, function(){
            onResizeEventWithDelay();
            onResizeEvent();
        });
    })(core.$, core.util);
})(window, window.sunCore);

