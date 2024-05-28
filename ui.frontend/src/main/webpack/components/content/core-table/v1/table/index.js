
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
        /**
		 * Handler to cache dom selector on module load
		 * @function cacheSelectors
		 * @memberof sunCore.comp.coreTable
		 * @private
		 */
        function cacheSelector() {
            $table = $(CONSTANT.SELECTOR.table);
        }
        /**
		 * Handler to add table class on module load
		 * @function addTableClass
		 * @memberof sunCore.comp.coreTable
		 * @private
		 */
        function addTableClass() {
            $table?.addClass(CONSTANT.CLASS.table)
        }
        /**
         * Method used to initilize the module
         * @function
         * @memberof sunCore.comp.coreTable
		 * @public
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