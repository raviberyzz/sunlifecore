/**
 * debounce.js
 * @fileOverview Provides a utility to debounce a function.
 */
(function ($, util) {
    'use strict';

    /**
    * A method to debounce
    * @memberof sunCore.util
    * @param {Function} func The callback function for the debounce method
    * @param {Integer} delay The delay for the debounce method
    * @return void
    */
    util.debounce = function (func, delay) {
        let timeoutId;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(context, args);
            }, delay);
        };
    };
    return util;
})(sunCore.$, sunCore.util);

