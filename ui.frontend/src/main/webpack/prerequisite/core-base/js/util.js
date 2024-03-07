/**
     * Set up throttler.
     * @function
     * @param {function} fn - The function to throttle.
     * @param {number} delay - The function will run once per given amount of milliseconds.
  */
function throttle(fn, delay) {
    let time = Date.now();
    return () => {
        if ((time + delay - Date.now()) <= 0) {
            fn();
            time = Date.now();
        }
    }
}