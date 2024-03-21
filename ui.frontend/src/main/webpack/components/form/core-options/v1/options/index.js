(function (core) {
	"use strict";

	/**
	 * Options component
	 * @namespace formOptions
	 * @memberof sunCore.comp
	 */
    core.comp.formOptions = (function ($, util) {
		const CONSTANT = {
			SELECTOR: {
				formCheckInput: '.form-check-input',
			}
		};
        /**
		 * Method to update the radio and checkbox validation
		 * @function checkBoxValidationEventHandler
		 * @memberof sunCore.comp.formOptions
		 * @private
		 */
        function checkBoxValidationEventHandler() {
            const $scope = $(this);
            const optionName = $scope.attr('name');
            const requiredField = $scope.attr('required');
            const $AllCheckboxes = $('.form-check-input[name="'+optionName+'"]:not(:disabled)');
            const $parentContainer = $scope.parent(".form-check").parents('.field-group-container');
            let selectedCheck = false;
            //Condition to check if the checkbox/radio is requred or not
            if(requiredField === "required"){
                $AllCheckboxes.each((index, item) => {
                    if(item.checked) {
                        selectedCheck = true;
                    }
                })
                //Condition to check if all checkbox/radio are selected or not
                if(!selectedCheck){
                    $AllCheckboxes.addClass("is-invalid");
                    $parentContainer.addClass("sl-input-error");
                }
                else {
                    $AllCheckboxes.removeClass("is-invalid");            
                    $parentContainer.removeClass("sl-input-error");
                }
            }
        }  
        /**
		 * Handler to bind event specific for formOptions
		 * @function bindEvent
		 * @memberof sunCore.comp.formOptions
		 * @private
		 */
		function bindEvent() {
			$(document).on(
				util.customEvents.INTERACTION,
				CONSTANT.SELECTOR.formCheckInput,
				checkBoxValidationEventHandler
			);
            $(document).on(
				util.customEvents.CHANGE,
				CONSTANT.SELECTOR.formCheckInput,
				checkBoxValidationEventHandler
			);
		}
        /**
		 * Method used to initilize the module
		 * @function
		 */
        function init() {
            bindEvent();
        }        
    
		return {
			init: init,
		};
	})(core.$, core.util);

	/**
	 * Initialise formOptions module if given selector is in DOM
	 */
	core.util.initialise(core.comp, "formOptions", ".form-check-input");
})(sunCore);