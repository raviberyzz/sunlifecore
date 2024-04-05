
//Function is used to update the table class in all table element inside sl-table class
(function (core) {
	"use strict";

	/**
	 * Table component
	 * @namespace coreTable
	 * @memberof sunCore.comp
	 */
    core.comp.coreTable = (function ($) {
        const CONSTANT = {
            SELECTOR: {
                table: '.sl-table table',
            },
            CLASS: {
                table: "table"
            }
        };

        let $table;

        function cacheSelector() {
            $table = $(CONSTANT.SELECTOR.table);
        }

        function addTableClass() {
            $table?.addClass(CONSTANT.CLASS.table)
        }
        /**
         * Method used to initilize the module
         * @function
         */
        function init() {
            cacheSelector();
            addTableClass();            
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