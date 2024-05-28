/**
 * slfAnalyticsTracking.js
 * @fileOverview Provides a common functionality for analytics tracking.
 */
(function(core) {
    /**
	 * @memberof sunCore.common
	 */
    'use strict';
     core.common.slfAnalytics = (function($, util) {
        const CONSTANT = {
            SELECTOR: {
                signInLink: 'a[href*="/signin/mysunlife/home.wca"], a[href*="/signin/masunlife/home.wca"]',
                signInButton: '#signinbutton',
                header: '.header',
                footer: '.footer',
                heliosContainer: '.helioscontainer'
            },
            LOCATION: {
                host: window.location.host,
                pathname: window.location.pathname
            },
            DOMAIN: {
                CA: 'www.sunlife.ca',
                CA_Subdomain: 'www.ca.sunlife',
                sl_path: '/sl/'
            }
        };

        let _locationBreadcrumb = utag_data.page_breadcrumb,
            _pageLanguage = ' ',
            _pageCannonicalURL = ' ';

        /**
         * Method to check for slf domain
         * @function isSLFDomain
         * @memberof sunCore.common
         * @private
         * @return {Boolean} true if domain is SLF else false
         */
        function isSLFDomain() {
            return (CONSTANT.LOCATION.host.indexOf(CONSTANT.DOMAIN.CA) > -1 || CONSTANT.LOCATION.host.indexOf(CONSTANT.DOMAIN.CA_Subdomain) > -1) && !CONSTANT.LOCATION.pathname.startsWith(CONSTANT.DOMAIN.sl_path);
        }

        /**
         * method to handle sign in interaction tracking
         * @function signInInteractionTrackingHandler
         * @memberof sunCore.common
         * @private
         * @param {object} event - event object
         * @param {Boolean} isButton - true if datavalue is defined and domain is slf else false
         */
        function signInInteractionTrackingHandler(event, isButton) {
            let dataValue;
            if ($(event.target).closest(CONSTANT.SELECTOR.header).length) {
                dataValue = 'header';
            } else if ($(event.target).closest(CONSTANT.SELECTOR.heliosContainer).length) {
                dataValue = 'body-content';
            } else if ($(event.target).closest(CONSTANT.SELECTOR.footer).length) {
                dataValue = 'footer';
            }
            if (dataValue !== undefined && !isButton) {
                const utagObj = {
                    "ev_type": "other",
                    "ev_action": "clk",
                    "ev_title": "sign in cta",
                    "ev_data_one": dataValue
                };
                generateUtaglink(utagObj);
            }
            if (isButton) {
                generateUtaglink({
                    "ev_action": "clk",
                    "ev_title": "sign in modal",
                    "ev_type": "other"
                });
            }
        }

        /**
         * method to generate utag link
         * @function generateUtaglink
         * @memberof sunCore.common
         * @private
         * @param {object} Object - key value pair object
         */
        function generateUtaglink(Object) {
            utag.link(Object);
        }

        /**
         * Handler to bind event for analytics tracking
         * @function bindAnalyticsEvent
         * @memberof sunCore.common
         * @private
         */
        function bindAnalyticsEvent() {
           // Sign in link tracking
           if (isSLFDomain()) {
               $(document).on(
                   util.customEvents.INTERACTION,
                   CONSTANT.SELECTOR.signInLink,
                   function(event) {
                       signInInteractionTrackingHandler(event, false);
                   }
               );
           } else {
               $(document).on(
                   util.customEvents.INTERACTION,
                   CONSTANT.SELECTOR.signInButton,
                   function(event) {
                       signInInteractionTrackingHandler(event, true);
                   }
               );
           }
        }

        /**
         * Handler to initialise analytic prerequisites
         * @function initialiseAnalyticPrerequisites
         * @memberof sunCore.common
         * @private
         */
        function initialiseAnalyticPrerequisites() {
            if (utag_data.page_language) {
                _pageLanguage = utag_data.page_language;
            }
            if (utag_data.page_breadcrumb && _locationBreadcrumb == "/Home") {
                let utmSource = "slfca-hp";
            } else {
                let utmSource = "slfca";
            }
            if (utag_data.page_canonical_url_default) {
                _pageCannonicalURL = utag_data.page_canonical_url_default;
            }
        }

        /**
         * Method used to initilize the module
         * @function init
         * @memberof sunCore.common
         * @public
         */
        function init() {
            initialiseAnalyticPrerequisites();
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
     core.common.slfAnalytics.init();
})(sunCore);