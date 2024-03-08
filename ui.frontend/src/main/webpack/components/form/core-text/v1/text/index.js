/**
 * Text field validation on key up key press.
 * Text area validation on key up key press.
 * Updating entered text count for text area on key up
*/
(function () {
    /**
         * Function use for field validation on keyup
         * @function
    */
    function fieldValidationKeyEventHandler() {
        const $field = $(this);
        const $fieldContainer = $field.parents(".form-floating");
        $fieldContainer.toggleClass("sl-input-error", $field.val() === ' ');
        if($fieldContainer.hasClass('sl-text-area')){
            $fieldContainer.find(".character-count .count").html($field.val().length)
        }
    }
    /**
         * Function use for field validation on key press
         * @function
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
         * Check if the dropdown component exists.
         * @function
         * @field {object} scope - scope of the selected element
    */
    function doesModuleExist($field) {
        if ($field.length <= 0) {
            return false;
        }
        return true;
    }
    /**
         * Function use to initilize the event
         * @function
    */
    function init() {
        let $field = $(".sl-text-field .form-control.required, .sl-text-area .form-control.required");
        let $fieldForCount = $(".sl-text-area .form-control")
        if(doesModuleExist($field)){
            $field.keyup(fieldValidationKeyEventHandler);
        }
        if(doesModuleExist($field) && $fieldForCount){
            $fieldForCount.keypress(fieldValidationKeyPressEventHandler);
        }
    }
    init();

})()