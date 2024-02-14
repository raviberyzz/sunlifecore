(function () {
    //function use for field validation on blur
    function fieldValidationBlurEventHandler() {
        let $field = $(this);
        if($field.val() === ''){
            $field.parents(".form-floating").addClass("sl-input-error");
        }
    }
    //function use for field validation on keyup
    function fieldValidationKeyEventHandler() {
        const $field = $(this);
        const $fieldContainer = $field.parents(".form-floating");
        if($field.val() === ''){
            $fieldContainer.addClass("sl-input-error");
        }
        else {
            $fieldContainer.removeClass("sl-input-error");
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
     
    //Function used to initilize the event
    function init() {
        let $field = $(".sl-text-field .form-control.required, .sl-text-area .form-control.required");
        let $fieldForCount = $(".sl-text-area .form-control")
        if($field){
            $field.keyup(fieldValidationKeyEventHandler);
            $field.blur(fieldValidationBlurEventHandler);
        }
        if($fieldForCount){
            $fieldForCount.keypress(fieldValidationKeyPressEventHandler);
        }
    }
    init();

})()