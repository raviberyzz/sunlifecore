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
				formCheck: '.form-check',
				fieldGroupContainer: '.field-group-container'
			},
			CLASS: {
				isInvalid: 'is-invalid',
				slInputError: 'sl-input-error'
			},
			ATTR: {
				name: 'name',
				required: 'required'
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
            const optionName = $scope.attr(CONSTANT.ATTR.name);
            const requiredField = $scope.attr(CONSTANT.ATTR.required);
            const $AllCheckboxes = $(CONSTANT.SELECTOR.formCheckInput+'[name="'+optionName+'"]:not(:disabled)');
            const $parentContainer = $scope.parent(CONSTANT.SELECTOR.formCheck).parents(CONSTANT.SELECTOR.fieldGroupContainer);
            let selectedCheck = false;
            //Condition to check if the checkbox/radio is requred or not
            if(requiredField === CONSTANT.ATTR.required){
                $AllCheckboxes.each((index, item) => {
                    if(item.checked) {
                        selectedCheck = true;
                    }
                })
                //Condition to check if all checkbox/radio are selected or not
                if(!selectedCheck){
                    $AllCheckboxes.addClass(CONSTANT.CLASS.isInvalid);
                    $parentContainer.addClass(CONSTANT.CLASS.slInputError);
                }
                else {
                    $AllCheckboxes.removeClass(CONSTANT.CLASS.isInvalid);            
                    $parentContainer.removeClass(CONSTANT.CLASS.slInputError);
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
		* @function init
		* @memberof sunCore.comp.formOptions
		* @public
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