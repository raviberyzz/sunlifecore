/**
 * debounce.js
 * @fileOverview Provides a utility to debounce a function.
 */
(function ($, util) {
    'use strict';

    /**
    * A debounce method to limit the execution frequency of the 
    * provided function by executing every given delay in milliseconds.
    * @memberof sunCore.util
    * @param {Function} func The callback function for the debounce method
    * @param {Number} delay The delay in milliseconds for the debounce method
    * @return {Object} 
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

