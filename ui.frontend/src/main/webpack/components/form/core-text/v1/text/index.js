/**
* To update the text count in text area
*/
(function (core) {
	"use strict";

	/**
	 * formText component
	 * @namespace formText
	 * @memberof sunCore.comp
	 */
    core.comp.formText = (function ($, util) {
		const CONSTANT = {
			SELECTOR: {
				textAreaField: '.sl-text-area .form-control'
			}
		};
        /**
		 * Method to update the character count in text area
		 * @function checkBoxValidationEventHandler
		 * @memberof sunCore.comp.formText
		 * @private
		 */
        function fieldValidationKeyPressEventHandler() {
            const $field = $(this);
            const $fieldContainer = $field.parents(".form-floating");
            if($fieldContainer.hasClass('sl-text-area')){
                $fieldContainer.find(".character-count .count").html($field.val().length+1);
                $fieldContainer.find(".visually-hidden .count").html($field.val().length+1);            
            }
        }
        /**
		 * Handler to bind event specific for formText
		 * @function bindEvent
		 * @memberof sunCore.comp.formText
		 * @private
		 */
		function bindEvent() {
			$(document).on(
				util.customEvents.KEYPRESS,
				CONSTANT.SELECTOR.textAreaField,
				fieldValidationKeyPressEventHandler
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
 * Initialise formText module if given selector is in DOM
 */
core.util.initialise(core.comp, "formText", ".sl-text-area .form-control");
})(sunCore);