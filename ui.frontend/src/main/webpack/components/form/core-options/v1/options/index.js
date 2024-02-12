(function () {
    //function use for radio and checkbox validation
    function checkBoxValidationEventHandler() {
        const optionName = $(this).attr('name');
        const requiredField = $(this).attr('required');
        console.log("requiredField", requiredField)
        const $AllCheckboxes = $('.form-check-input[name="'+optionName+'"]:not(disabled)');
        let selectedCheck = false;
        if(requiredField === "required"){
            console.log("asdsadsad", $AllCheckboxes.length)
            $AllCheckboxes.each((index, item) => {
               console.log("checking", index, item, item.checked)
               if(item.checked) {
                selectedCheck = true;
               }
            })
        }
        if(!selectedCheck){
            $AllCheckboxes.addClass("is-invalid");
        }
        else {
            $AllCheckboxes.removeClass("is-invalid");
        }
    }  

    function init() {
        const $field = $(".field-group-container .form-check-input");
        $field.on('change click blur', checkBoxValidationEventHandler);
    }
    
    init();

})()