(function($, $document) {
    "use strict"
    $(document).on('dialog-ready', function() {
         checkToDisableCheckbox();
         /* Calling method to disable/enable checkbox on dialog load */
         let $showhideTarget = $('.list-option-listfrom-showhide-target');
         $showhideTarget.on('click', '.coral3-Checkbox-input[name*="./selected"]', checkToHideCheckbox);
         $showhideTarget.on('click', 'button[coral-multifield-add]', delayHideCheckbox);
         $(document).on('click', "button[class*='coral3-Multifield-remove']", checkToHideCheckbox);
    });
    function delayHideCheckbox() {
        // Adding small delay to function to prevent function running before new field is added
         setTimeout(
            function() {
                checkToHideCheckbox();
            }, 5);
    }
    // This function will pick the appropriate checkboxes to hide and show when any change is made in the multifield like add, remove, check, uncheck
    function checkToHideCheckbox() {
        if($('.coral3-Select[name*="./type"]').val() == "radio"){
            // Using flag to see if any checkbox is checked
			let flag = 0;
			$('.coral3-Checkbox-input[name*="./selected"]').each(function() {
	 
				// This line will run diable script after dialog is fully loaded, prevents, script from running before dialog opens
				Coral.commons.ready(this, () => {
									if ($(this).is(':checked')) {
					flag = 1;
					$(this).parent('coral-checkbox').removeClass("hide");
					// 
					let currentFieldName = $(this).is(':checked');
					$('.coral3-Checkbox-input[name*="./selected"]').each(function() {
						let otherFieldName = $(this).is(':checked');
						if (currentFieldName != otherFieldName){
							$(this).parent('coral-checkbox').addClass("hide");
						}
					});
				}
				if (!$(this).is(':checked')) {
					if (flag === 0) {
						$('.coral3-Checkbox-input[name*="./selected"]').each(function() {
							$(this).parent('coral-checkbox').removeClass("hide");
						});
					}
				}
				});
			});
    	}
    }
})($, $(document));