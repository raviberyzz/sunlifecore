(function () {
    //function use for radio and checkbox validation
    function checkBoxValidationEventHandler() {
        const $scope = $(this);
        const optionName = $scope.attr('name');
        const requiredField = $scope.attr('required');
        const $AllCheckboxes = $('.form-check-input[name="'+optionName+'"]:not(:disabled)');
        const $parentContainer = $scope.parent(".form-check").parents('.field-group-container');
        //Events to check if the checkbox/radio has error validation or not
        window.Parsley.on('field:error', function () {
            $AllCheckboxes.removeClass("is-invalid");            
            $parentContainer.removeClass("sl-input-error");
        });
        //Events to check if the checkbox/radio has success validation or not
        window.Parsley.on('field:success', function () {            
            $AllCheckboxes.removeClass("is-invalid");            
            $parentContainer.removeClass("sl-input-error");             
        });
    }  
    //Function used to initilize the event
    function init() {
        const $checkInput = $('.form-check-input');
        if($checkInput){
            $(document).on('change click blur', $checkInput, checkBoxValidationEventHandler);
        }
    }
    
    init();

})()