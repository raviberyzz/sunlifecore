/*!
 * Update core namespace in the global environment
 */

(function ($, util) {
  /**
   * Set up throttler.
   * @function
   * @param {function} fn - The function to throttle.
   * @param {number} delay - The function will run once per given amount of milliseconds.
   */
  util.throttle = function (fn, delay) {
    let time = Date.now();
    return () => {
      if (time + delay - Date.now() <= 0) {
        fn();
        time = Date.now();
      }
    };
  };

  return util;
})(sunCore.$, sunCore.util);
