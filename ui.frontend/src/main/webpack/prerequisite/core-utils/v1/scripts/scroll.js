/**
 * scroll.js
 * @fileOverview Provides a utility to look for page scroll event.
 */
(function(w, core) {
    'use strict';

    core.util.scroll = (function($, util) {
        
        function scrollEventHandler() {
            $.publish(util.customEvents.SCROLL);
        }; 

        $(w).on(util.customEvents.SCROLL, scrollEventHandler); 
    })(core.$, core.util);
})(window, window.sunCore);

