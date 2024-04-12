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
				textAreaField: '.sl-text-area .form-control',
				formFloating: '.form-floating',
				CharCount: '.character-count .count',
				hiddenCharCount: '.visually-hidden .count'		
			},
			CLASS: {
				slTextArea: 'sl-text-area'
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
            const $fieldContainer = $field.parents(CONSTANT.SELECTOR.formFloating);
            if($fieldContainer.hasClass(CONSTANT.CLASS.slTextArea)){
                $fieldContainer.find(CONSTANT.SELECTOR.CharCount).html($field.val().length+1);
                $fieldContainer.find(CONSTANT.SELECTOR.hiddenCharCount).html($field.val().length+1);            
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
		* @function init
		* @memberof sunCore.comp.formText
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
 * Initialise formText module if given selector is in DOM
 */
core.util.initialise(core.comp, "formText", ".sl-text-area .form-control");
})(sunCore);