(function () {
    //function use for field validation on keyup
    function fieldValidationKeyEventHandler() {
        const $field = $(this);
        const $fieldContainer = $field.parents(".form-floating");
        if($field.val() === ''){
            $fieldContainer.toggleClass("sl-input-error");
        }
        else {
            $fieldContainer.toggleClass("sl-input-error");
        }
        if($fieldContainer.hasClass('sl-text-area')){
            $fieldContainer.find(".character-count .count").html($field.val().length)
        }
    }
    //function use for field validation on key press
    function fieldValidationKeyPressEventHandler() {
        const $field = $(this);
        const $fieldContainer = $field.parents(".form-floating");
        if($fieldContainer.hasClass('sl-text-area')){
            $fieldContainer.find(".character-count .count").html($field.val().length+1);
            $fieldContainer.find(".visually-hidden .count").html($field.val().length+1);            
        }
    }
    //Check if a dropdown component exists.
    function doesModuleExist($field) {
        if ($field.length <= 0) {
            return false;
        }
        return true;
    }
     
    //Function used to initilize the event
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