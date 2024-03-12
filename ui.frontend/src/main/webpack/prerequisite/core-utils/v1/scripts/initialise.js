/**
 * initialise.js
 * functionality for initialising modules
*/
 
(function (core) {
  'use strict'

  /**
   * initialise util
   * @namespace initialise
   * @memberof sunCore.util
   * @param {object} namespace - namespace object in which module exist.
   * @param {string} module - module which need to initialise 
   * @param {string} selector - selector upon whose existance module is being called  
  */
  core.util.initialise = function(namespace, module, selector) {
    
    // Check if namespace is given and module exist in given namespace
    if((namespace && typeof namespace !== 'object') || (typeof module !== 'string') || !namespace[module]) return;
    
    // call module when selector is not given
    if(!selector){
      namespace[module].init();
     }

    // If selector is given then call module initialisation only when element for selector exist.  
    if(selector && core.$(selector).length) {
      namespace[module].init();
      return;
    } 
  }

})(sunCore)