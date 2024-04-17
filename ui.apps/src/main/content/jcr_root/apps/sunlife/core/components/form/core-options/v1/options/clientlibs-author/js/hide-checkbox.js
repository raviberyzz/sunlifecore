(function($, $document) {
    "use strict"
    $(document).on('foundation-contentloaded', function(event) {
        checkToHideCheckbox();
        /** Calling method to disable/enable checkbox on dialog load **/
        let $showhideTarget = $('.list-option-listfrom-showhide-target');
        $showhideTarget.on('click', '.coral3-Checkbox-input[name*="./selected"]', delayHideCheckbox);
        $showhideTarget.on('click', 'button[coral-multifield-add]', delayHideCheckbox);
        $(document).on('click', "button[class*='coral3-Multifield-remove']", delayHideCheckbox);
    });
	
	/** 
	 * @function A small delay function to allow time for dialogue to load completely before running script
	 * @param No arguments needed
	 * @return Doesn't return anything but calls another function
	 */
    function delayHideCheckbox() {
        setTimeout(
            function() {
                checkToHideCheckbox();
            }, 10);
    }
    /** 
	 * @function This function will pick the appropriate checkboxes to hide and show when any change is made in the multifield like add, remove, check or uncheck
	 * @param No arguments needed
	 * @return Doesn't return anything
	 */
    function checkToHideCheckbox() {

        if ($('.coral3-Select[name*="./type"]').val() == "radio") {
            var $selectCheckboxes = $('.coral3-Checkbox-input[name*="./selected"]');
            var $selectedCheckbox = $('.coral3-Checkbox[checked]');

			/** 
			 * @this Picking each checbox and its parent div to hide or show depending on if-else clause
			 */
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