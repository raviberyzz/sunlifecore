(function(document, $) {
    "use strict";

    $(document).on('dialog-ready', function(e) {
        const $checkBox = $('.coral3-Checkbox-input[name*="./triggerModel"]');
        // Showing Modal or Links based on checkbox on reopening dialog
        if($checkBox.is(':checked')){
            toggleEditorialView($('.checkbox-toggle-target[name="./triggerModel"]', e.target));
        }
    });

    $(document).on("change", '.checkbox-toggle-target[name="./triggerModel"]', function(e) {
        toggleEditorialView($(this));
        clearModalID();
    });

    function toggleEditorialView(el) {
        const $checkBox = $('.coral3-Checkbox-input[name*="./triggerModel"]');
        const fieldWrapper = ".coral-Form-fieldwrapper";
        el.parent(fieldWrapper).siblings(".checkbox-linkdetails-target").first().toggleClass("hide");
        el.parent(fieldWrapper).siblings(".checkbox-modaldetails-target").first().toggleClass("hide");
        if($checkBox.is(':checked')){
            $('[name="./modalID"]').prop('required',true);
        }
        else{
            $('[name="./modalID"]').prop('required',false);
        }
    }

	function clearModalID() {
    	$('input[name="./modalID"]').val('');
	}
})(document, Granite.$);