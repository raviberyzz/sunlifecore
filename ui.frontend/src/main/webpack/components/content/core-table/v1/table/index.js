
//Function is used to update the table class in all table element inside sl-table class
(function (core) {
	"use strict";

	/**
	 * Text component
	 * @namespace coreTable
	 * @memberof sunCore.comp
	 */
    core.comp.coreTable = (function ($, util) {
    const CONSTANT = {
        SELECTOR: {
        table: '.sl-table table"',
        }
    };
    function init() {
        const $table = $(CONSTANT.SELECTOR.table);
        $table?.addClass("table")
    }   
    return {
      init: init,
  };
  })(core.$, core.util);
  
  /**
  * Initialise coreTable module if given selector is in DOM
  */
  core.util.initialise(core.comp, "coreTable", ".sl-table");
  })(sunCore);