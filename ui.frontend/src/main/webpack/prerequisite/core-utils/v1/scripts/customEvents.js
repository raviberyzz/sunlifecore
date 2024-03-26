/* global sunCore */

/**
 * customEvents.js
 * @fileOverview utility to provide getter in one place for all custom events
 */
(function(util) {
    'use strict';

    /**
     * Custom events util
     * @namespace customEvents
     * @memberof sunCore.util
     */
    util.customEvents = (function() {
        /**
         * Returns true, if a device supports click event
         * @function isClickSupported
         * @memberof sunCore.util.customEvents
         * @private
         *
         * The Cause:
         * In case of mobile devices both events (touchend & click ) were used to bind events, so as to support click for touch devices as well.
         *
         * The Impact:
         * Because of the above changes, an event handler was triggered twice, consequently some of the functionalities broke.
         *
         * The Possibilities: To choose among the following or a mix of them:
         *     ontouchstart = 'ontouchstart' in window
         *         true         : for mobile devices & TOUCH desktop in Chrome
         *         false        : for normal desktops
         *     onclick = 'onclick' in window
         *         true         : generally for all devices
         *     maxTouchPoints  = navigator.msMaxTouchPoints || navigator.maxTouchPoints
         *         undefined    : for iPad & iPhone
         *         0            : for normal desktops
         *         10           : for TOUCH desktops
         *     pointerEnabled  = navigator.msPointerEnabled || navigator.pointerEnabled
         *         undefined    : for mobile devices & all desktops
         *         true         : for IE
         *     matchMedia = window.matchMedia('(max-device-width: 768px)').matches
         *
         * The Solution:
         * So we banked upon checking if click is supported on the device.
         */
        function isClickSupported() {
            return 'onclick' in window ? true : false;
        }

        var events = {
            // generic events
            INTERACTION: isClickSupported() ? 'click' : 'touchend',
            TOUCHEND: 'touchend',
            KEYUP: 'keyup',
            KEYPRESS: 'keypress',
            KEYDOWN: 'keydown',
            FOCUS: 'focus',
            FOCUS_OUT: 'focusout',
            BLUR: 'blur',
            CHANGE: 'change',
            SUBMIT: 'submit',
            HOVER: 'hover',
            SEARCH: 'search',
            INPUT: 'input',
            RESIZE: 'resize',
            SCROLL: 'scroll',
            MOUSE_ENTER: 'mouseenter',
            MOUSE_LEAVE: 'mouseleave',
            MOUSE_DOWN: 'mousedown',
            MOUSE_UP: 'mouseup',
            BEFORE_UNLOAD: 'beforeunload',

            RESIZED: 'slcore:resized',
            SCROLLED: 'slcore:scrolled',

            // intersection observer related
            IO_IN: 'slcore:in:viewport',
            IO_OUT: 'slcore:out:viewport',
            IO_ELEM_IN: 'slcore:element:in:viewport',
            IO_ELEM_OUT: 'slcore:element:out:viewport'
        };

        return events;
    })();
})(sunCore.util);