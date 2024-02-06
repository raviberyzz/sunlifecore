(function($, $document) {
    "use strict"
    $(document).on('dialog-ready', function() {
        checkToDisableCheckbox();
        /* Calling method to disable/enable checkbox on dialog load */
        $('.list-option-listfrom-showhide-target').on('click', '.coral3-Checkbox-input[name*="./selected"]', checkToDisableCheckbox);
        $('.list-option-listfrom-showhide-target').on('click', 'button[coral-multifield-add]', processOnAddingToMultifield);
        $(document).on('click', "button[class*='coral3-Multifield-remove']", processOnDeletingFromMultifield);
    });
    function processOnDeletingFromMultifield() {
        var isChecked = false;
        var $closestParent = $(this).closest('.coral3-Checkbox');
        if($closestParent.length){
            var $checkbox = $closestParent.find('input.coral3-Checkbox-input');
            isChecked = $checkbox.is(':checked');
        }
        if(!isChecked){
            $('.coral3-Checkbox-input[name*="./selected"]').each(function() {
                $(this).attr('disabled', false);
            });
        }
    }
    function processOnAddingToMultifield() {
        // Adding small delay to function to prevent function running before new field is added
         setTimeout(
            function() {
                checkToDisableCheckbox();
            }, 5);
    }
    function checkToDisableCheckbox() {
        // Using flag to see if any checkbox is checked
        var flag = 0;
        $('.coral3-Checkbox-input[name*="./selected"]').each(function() {
 
            // This line will run diable script after dialog is fully loaded, prevents, script from running before dialog opens
            Coral.commons.ready(this, () => {
                                if ($(this).is(':checked')) {
                flag = 1;
                $(this).attr('disabled', false);
                // 
                var currentFieldName = $(this).is(':checked');
                $('.coral3-Checkbox-input[name*="./selected"]').each(function() {
                    var otherFieldName = $(this).is(':checked');
                    if (currentFieldName === otherFieldName) {} else {
                        $(this).attr('disabled', true);
                    }
                });
            }
            if (!$(this).is(':checked')) {
                if (flag === 0) {
                    $('.coral3-Checkbox-input[name*="./selected"]').each(function() {
                        $(this).attr('disabled', false);
                    });
                }
            }
            });
        });
    }
})($, $(document));