/**
 * resized.js
 * @fileOverview Provides a utility to look for page resized event.
 */
(function(w, core) {
    'use strict';
    /**
     * Handler to resize event
     * @function core.util.resize
     */
    core.util.resize = (function($, util) {
        let resizeEvent = 'resize.core-resize orientationchange.core-resize',
            delayTimer = 250,
            wWidth = $(w).width(),
            wHeight = $(w).height(),
        /**
         * Handler to resize event with delay
         * @function onResizeEventWithDelay
         * @memberof core.util.resize
         * @public
         */
        onResizeEventWithDelay = function() {
            return util.debounce(function () {                    
                //adding this checks on some mobiles when scrolling it things that we resized screen
                if ($(w).width() !== wWidth || $(w).height() !== wHeight) {
                    wWidth = $(w).width();
                    wHeight = $(w).height();
                    $.publish(util.customEvents.RESIZED);
                }
            }, delayTimer);                
        },
        /**
         * Handler to resize event 
         * @function onResizeEvent
         * @memberof core.util.resize
         * @public
         */
        onResizeEvent = function() {
            //adding this checks on some mobiles when scrolling it things that we resized screen
            if ($(w).width() !== wWidth || $(w).height() !== wHeight) {
                wWidth = $(w).width();
                wHeight = $(w).height();
                $.publish(util.customEvents.INSTANTRESIZED);
            }
        };
        $(w).on(resizeEvent, function(){
            onResizeEventWithDelay();
            onResizeEvent();
        });
    })(core.$, core.util);
})(window, window.sunCore);

