/**
 * Modal Component specific JS. 
 * Bind a debounced scroll window event if there is a modal on the page which gets triggered on page scroll. 
 * Manage the display of the modal only once per browser session, by writing and reading a cookie.
 */

(function (core) {
    "use strict";
    
    /**
     * Modal component
     * @namespace modal
     * @memberof sunCore.comp
     */
    core.comp.modal = (function ($, util) {

        const CONSTANT = {
            ID: {
                displayed: "displayed"
            }
        };

        let $modalTriggerOnScroll,
            listeners = [];

        /**
         * Trigger the modal to display. Display the modal only once per browser session, managed by reading a cookie.
         * @function triggerModal
         * @memberof sunCore.comp.modal
         * @private
         * @return void
         */
        function triggerModal() {
            var modalId = $modalTriggerOnScroll.getAttribute('id');
            if ($(window).scrollTop() + $(window).height() >= $(document).height() / 2) {
                if (util.cookie.events.getCookie(modalId) === "") {
                    $("#" + modalId).modal("show");
                    if (navigator.userAgent.indexOf("MSIE") > 0) {
                        util.cookie.events.createCookie(modalId, CONSTANT.ID.displayed, 1, false);
                    } else {
                        util.cookie.events.createCookie(modalId, CONSTANT.ID.displayed, -1, true);
                    }
                }
            }
        }

        /**
        * Initialize the module.
        * @function init
        * @memberof sunCore.comp.header
        * @private
        * @return void
        */
        function init() {
            $modalTriggerOnScroll = document.querySelectorAll('[data-triggerOnScroll]')[0];
            if ($modalTriggerOnScroll) {
                listeners.push(
                    $.subscribe(util.customEvents.SCROLLED, triggerModal)
                );                
            }
        }

        return {
            init: init,
        };
    })(core.$, core.util);

    /**
     * Initialise modal module if given selector is in DOM
     */
    core.util.initialise(core.comp, "modal", ".modal");
})(sunCore);