/**
* To update the text count in text area
*/
(function () {
    /**
     * Function use for field validation on key press
     * @function 
     * @returns {} It will not return anything, this method just update DOM
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
     * Check if a dropdown component exists.
     * @function
     * @param {object} $field - scope of the dom element
     * @returns {} It will not return anything, this method just update DOM
    */
    function doesModuleExist($field) {
        if ($field.length <= 0) {
            return false;
        }
        return true;
    }
     /**
     * Function used to initilize the event
     * @function
     * @returns {} It will not return anything, this method just update DOM
    */
    function init() {
        let $field = $(".sl-text-field .form-control.required, .sl-text-area .form-control.required");
        let $fieldForCount = $(".sl-text-area .form-control")
        if(doesModuleExist($field) && $fieldForCount){
            $fieldForCount.keypress(fieldValidationKeyPressEventHandler);
        }
    }
    init();

})()