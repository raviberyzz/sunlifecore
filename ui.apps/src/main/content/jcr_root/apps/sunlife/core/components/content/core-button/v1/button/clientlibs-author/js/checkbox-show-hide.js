(function(document, $) {
    "use strict";

    const checkBox = '.coral3-Checkbox-input[name*="./triggerModel"]';
    const checkBoxClass = '.checkbox-toggle-target[name="./triggerModel"]';
    const fieldWrapper = ".coral-Form-fieldwrapper";

    $(document).on('dialog-ready', function(e) {
        if($(checkBox).is(':checked')){
            checkEditorialView($(checkBoxClass, e.target));
        }
    });

    $(document).on("change", checkBoxClass, function(e) {
        checkEditorialView($(this));
        clearModalID();
    });

    function checkEditorialView(el) {
        el.parent(fieldWrapper).siblings(".checkbox-linkdetails-target").first().toggleClass("hide");
        el.parent(fieldWrapper).siblings(".checkbox-modaldetails-target").first().toggleClass("hide");
    }

	function clearModalID() {
    	$('input[name="./modalID"]').val('');
	}
})(document, Granite.$);