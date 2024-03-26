/* global Suncore */

/**
 * constants.js
 * @fileOverview utility to provide getter in one place for all constants (sans customEvents)
 */
(function(util) {
    'use strict';

    /**
     * constants util
     * @namespace constants
     * @memberof sunCore.util
     */
    util.constants = (function() {

            var KeyCode = {
                BACKSPACE: 8,
                TAB: 9,
                ENTER_RETURN: 13,
                ESC: 27,
                SPACE: 32,
                PAGE_UP: 33,
                PAGE_DOWN: 34,
                END: 35,
                HOME: 36,
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40,
                DELETE: 46
            }

        return KeyCode;
    })();
})(sunCore.util);