(function () {
    //function use for radio and checkbox validation
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
    //Function used to initilize the event
    function init() {
        $(document).on('change click blur', '.form-check-input', checkBoxValidationEventHandler);
    }
    
    init();

})()