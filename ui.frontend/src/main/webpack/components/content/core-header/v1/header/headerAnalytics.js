/**
 * headerAnalytics.js
 * @fileOverview Provides functionality for analytics tracking in header elements.
 */
(function(core) {
    /**
     * @namespace header
	 * @memberof sunCore.comp
	 */
    'use strict';
     core.comp.slfHeaderAnalytics = (function($, util) {
        const CONSTANT = {
            SELECTOR: {
                header: '.header',
                languageDropdown: '#sl-dropdown-toggle-language-utility',
                regionDropdown: '#sl-region-menu-dd',
                searchUtilityNav: '.sl-search-btn'
            }
        };

        let $slfHeader;

        /**
         * method to generate utag link
         * @function generateUtaglink
         * @memberof sunCore.comp
         * @private
         * @param {object} Object - key value pair object
         */
        function generateUtaglink(Object) {
            utag.link(Object);
        }

        /**
         * Handler to bind event for analytics tracking
         * @function bindAnalyticsEvent
         * @memberof sunCore.comp
         * @private
         */
        function bindAnalyticsEvent() {
            // language dropdown analytics tracking
            $slfHeader.on(
                util.customEvents.INTERACTION,
                CONSTANT.SELECTOR.languageDropdown,
                languageInteractionTrackingHandler
            );

            // region dropdown analytics tracking
            $slfHeader.on(
                util.customEvents.INTERACTION,
                CONSTANT.SELECTOR.regionDropdown,
                regionInteractionTrackingHandler
            );

            // search button(coveo) analytics tracking
            $slfHeader.on(
                util.customEvents.INTERACTION,
                CONSTANT.SELECTOR.searchUtilityNav,
                searchInteractionTrackingHandler
            );
        }

        /**
         * method to handle language interaction tracking
         * @function languageInteractionTrackingHandler
         * @memberof sunCore.comp
         * @private
         */
        function languageInteractionTrackingHandler() {
            const utagObj = {
                "ev_type": "other",
                "ev_action": "onpage_impr",
                "ev_title": "language bar",
                "ev_data_one": "language panel",
                "ev_data_two": "language panel expansion",
            };
            generateUtaglink(utagObj);
        }

        /**
         * method to handle region interaction tracking
         * @function regionInteractionTrackingHandler
         * @memberof sunCore.comp
         * @private
         */
        function regionInteractionTrackingHandler() {
            const utagObj = {
                "ev_type": "other",
                "ev_action": "onpage_impr",
                "ev_title": "region bar",
                "ev_data_one": "region panel",
                "ev_data_two": "region panel expansion",
            };
            generateUtaglink(utagObj);
        }

        /**
         * method to handle search interaction tracking
         * @function searchInteractionTrackingHandler
         * @memberof sunCore.comp
         * @private
         */
        function searchInteractionTrackingHandler() {
            const utagObj = {
                "ev_type": "other",
                "ev_action": "clk",
                "ev_title": "search module expansion"
            };
            generateUtaglink(utagObj);
        }



        /**
         * Handler to cache dom selector on module load
         * @function cacheSelectors
         * @memberof sunCore.comp
         * @private
         */
        function cacheSelectors() {
            $slfHeader = $(CONSTANT.SELECTOR.header);
        }

        /**
         * Method used to initilize the module
         * @function init
         * @memberof sunCore.comp
         * @public
         */
        function init() {
            cacheSelectors();
            if (typeof ContextHub === "undefined") {
                bindAnalyticsEvent();
            } else {
                setTimeout(bindAnalyticsEvent, 3000);
            }
        }
        return {
            init: init,
        };
    })(core.$, core.util);

     /**
     * Initialise header module if given selector is in DOM
     */
     core.comp.slfHeaderAnalytics.init();
})(sunCore);