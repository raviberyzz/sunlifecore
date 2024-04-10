/**
 * throttle.js
 * @fileOverview Provides a utility to throttle a function.
 */
(function ($, util) {
  'use strict';

  /**
   * Throttle calls to "callback" routine and ensure that it
   * is not invoked any more often than "delay" milliseconds.
   * @param  {Function} callback  the callback to be executed
   * @param  {number}   delay     delay in miliseconds
   * @return {Function} function that fires callback
   */
  util.throttle = function (callback, delay) {
    let ticker;
    const fn = delay ? 'setTimeout' : 'requestAnimationFrame';
    return function () {
      const context = this;
      // eslint-disable-next-line prefer-rest-params
      const args = arguments;
      if (!ticker) {
        // note that requestAnimationFrame is
        // polyfilled in requestanimationframe.js
        // also delay 2nd arg will just be ignored by requestAnimationFrame
        ticker = window[fn](() => {
          callback.apply(context, args);
          ticker = null;
        }, delay);
      }
    };
  };
})(sunCore.$, sunCore.util);

