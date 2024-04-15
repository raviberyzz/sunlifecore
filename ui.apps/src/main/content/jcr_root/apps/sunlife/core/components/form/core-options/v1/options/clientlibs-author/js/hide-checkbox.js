(function($, $document) {
    "use strict"
    $(document).on('foundation-contentloaded', function(event) {
        checkToHideCheckbox();
        /** 
         * Calling method to disable/enable checkbox on dialog load
         */
        let $showhideTarget = $('.list-option-listfrom-showhide-target');
        $showhideTarget.on('click', '.coral3-Checkbox-input[name*="./selected"]', delayHideCheckbox);
        $showhideTarget.on('click', 'button[coral-multifield-add]', delayHideCheckbox);
        $(document).on('click', "button[class*='coral3-Multifield-remove']", delayHideCheckbox);
    });

    function delayHideCheckbox() {
        /**
         * Adding small delay to function to prevent function running before new field is added
         */
        setTimeout(
            function() {
                checkToHideCheckbox();
            }, 10);
    }
    /**
     * This function will pick the appropriate checkboxes to hide and show
     * when any change is made in the multifield like add, remove, check or uncheck
     */
    function checkToHideCheckbox(event) {

        if ($('.coral3-Select[name*="./type"]').val() == "radio") {
            var $selectCheckboxes = $('.coral3-Checkbox-input[name*="./selected"]');
            var $selectedCheckbox = $('.coral3-Checkbox[checked]');


            $selectCheckboxes.each(function() {
                $(this).parent().removeClass("hide");
            });

            if ($selectedCheckbox.length) {

                $selectCheckboxes.each(function() {
                    $(this).parent().addClass("hide");
                });

                $selectedCheckbox.removeClass("hide");
            }

        }
    }
})($, $(document));