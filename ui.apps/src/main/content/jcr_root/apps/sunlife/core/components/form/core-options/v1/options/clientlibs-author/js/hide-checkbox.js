(function($, $document) {
    "use strict"
    $(document).on('dialog-ready', function() {
         checkToDisableCheckbox();
         /* Calling method to disable/enable checkbox on dialog load */
         $('.list-option-listfrom-showhide-target').on('click', '.coral3-Checkbox-input[name*="./selected"]', checkToDisableCheckbox);
         $('.list-option-listfrom-showhide-target').on('click', 'button[coral-multifield-add]', processOnAddingToMultifield);
         $(document).on('click', "button[class*='coral3-Multifield-remove']", checkToDisableCheckbox);
    });
    function processOnAddingToMultifield() {
        // Adding small delay to function to prevent function running before new field is added
         setTimeout(
            function() {
                checkToDisableCheckbox();
            }, 5);
    }
    function checkToDisableCheckbox() {
        if($('.coral3-Select[name*="./type"]').val() == "radio"){
            // Using flag to see if any checkbox is checked
			var flag = 0;
			$('.coral3-Checkbox-input[name*="./selected"]').each(function() {
	 
				// This line will run diable script after dialog is fully loaded, prevents, script from running before dialog opens
				Coral.commons.ready(this, () => {
									if ($(this).is(':checked')) {
					flag = 1;
					$(this).parent('coral-checkbox').removeClass("hide");
					// 
					var currentFieldName = $(this).is(':checked');
					$('.coral3-Checkbox-input[name*="./selected"]').each(function() {
						var otherFieldName = $(this).is(':checked');
						if (currentFieldName === otherFieldName) {} else {
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