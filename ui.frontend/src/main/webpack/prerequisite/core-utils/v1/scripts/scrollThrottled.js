/**
 * scrollThrottled.js
 * @fileOverview Provides a utility to look for page scroll event that is throttled.
 */
(function(w, core) {
    'use strict';

    core.util.scrollThrottled = (function($, util) {

        function throttledScrollHandler(){

            util.throttle(()=> {
                scrollEventHandler();
            }, 250)()
        }
        
        function scrollEventHandler() {
            $.publish(util.customEvents.SCROLL);
        };

        $(w).on(util.customEvents.SCROLL, throttledScrollHandler); 
    })(core.$, core.util);
})(window, window.sunCore);

