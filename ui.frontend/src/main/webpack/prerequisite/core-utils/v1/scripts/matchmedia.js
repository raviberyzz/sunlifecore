
/**
 * matchmedia.js
 * @fileOverview Provides a utility function to check for the breakpoints.
 */
(function(util) {
    'use strict';

    /**
     * Utility for checking media breakpoint
     * @memberof sunCore.util
     */
    util.matchmedia = (function() {
        let MEDIA_XS = '(max-width: 599px)',
        MEDIA_S = '(min-width:600px)',
        MEDIA_MD = '(min-width:905px)',
        MEDIA_L = '(min-width:1240px)',
        MEDIA_XL = '(min-width: 1440px)';
            
        return {
            XS: window.matchMedia(MEDIA_XS),
            S: window.matchMedia(MEDIA_S),
            MD: window.matchMedia(MEDIA_MD),
            L: window.matchMedia(MEDIA_L),
            XL: window.matchMedia(MEDIA_XL)
        };
    })();
})(sunCore.util);
