/*global sunCore */

/**
 * scrollTo.js
 * @fileOverview Provides functionality for scrolling elements to points
 */
(function($, util) {
    'use strict';

    /**
     * Scroll to methods
     * @memberof sunCore.util
     */
    util.scrollTo = (function() {
        var startedOffset,
            currOffset = 0,
            $page;

        /**
         * Animates element scroll top position
         * @memberof sunCore.util.scrollTo
         * @private
         * @param {jQuery} $el The element you want to scroll
         * @param {number} top The position you want to scroll to
         * @param {Object} options The animation options
         */
        function animate($el, top, options) {
            return $el.stop().animate(
                {
                    scrollTop: top
                },
                options
            );
        }

        /**
         * Scroll to an element
         * @memberof sunCore.util.scrollTo
         * @public
         * @param {jQuery} $el The element you want to scroll to
         * @param {Object} options The animation options
         * @param {number} [offset] A pixel offset which will be
         *                          added to top of element you are
         *                          scrolling to
         * Ex:
         * util.scrollTo.element($item, { duration: 1000 }, 0);
         */
        function element($el, options, offset) {
            var step = options.step || $.noop,
                go = function() {
                    startedOffset = currOffset;
                    animate(
                        $page,
                        $el.offset().top - ((offset || 0) + currOffset),
                        options
                    );
                };

            $page = $page || $('html, body');
            options.step = function() {
                // in case a step function is passed to options
                // we still want to call it
                step();

                // change scrollTo position if offset changes mid scroll
                if (currOffset !== startedOffset) {
                    go();
                }
            };

            go();
        }

        /**
         * Scroll to position
         * @memberof sunCore.util.scrollTo
         * @public
         * @param {number} top The position you want to scroll to
         * @param {number} [time] The speed you want to scroll
         * @param {Function} [donecallback] Function to call when scrolling
         *                                  has finished
         * Ex:
         * util.scrollTo.position(0, 1000, function(){});
         */
        function position(top, time, doneCallback) {
            $page = $page || $('html, body');

            return animate($page, top, {
                duration: time,
                done: doneCallback
            });
        }

        return {
            element: element,
            position: position
        };
    })();
})(sunCore.$, sunCore.util);
