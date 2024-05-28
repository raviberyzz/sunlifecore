/*!
 * Update core namespace in the global environment 
 */

var sunCore = window.sunCore || {};

/*!
 * Appending comp properties for associating all components module 
 */
sunCore.comp = sunCore.comp || {};


/*!
 * Appending $ properties for associating jquery 
 */
sunCore.$ = window.$ || sunCore.jQuery;


/*!
 * Appending util properties for associating all util module 
 */
sunCore.util = sunCore.util || {};

/*!
 * Appending common properties for associating all common module
 */
sunCore.common = sunCore.common || {};