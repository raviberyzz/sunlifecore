/* global sunCore */

/**
 * customMethods.js
 * @fileOverview utility to provide getter in one place for all custom methods
 */
(function(util) {
    'use strict';

    /**
     * Custom methods util
     * @namespace customMethods
     * @memberof sunCore.util
     */
    util.customMethods = (function() {

        /**
         * Returns the language of the document in lowercase format (en/fr) as per the HTML lang attribute value set in the document. Default is 'en'. 
         * @function getLanguage
         * @memberof sunCore.util.customEvents
         * @private
         * @returns {string} - The language of the document in lowercase format (en/fr)
         */
        function getLanguage() {
            return document.documentElement.lang.toLowerCase();
        }

        return {
            getLanguage: getLanguage
        }
    })();
})(sunCore.util);