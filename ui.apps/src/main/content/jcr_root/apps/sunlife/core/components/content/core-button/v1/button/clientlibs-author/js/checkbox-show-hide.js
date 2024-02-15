(function($, $document) {
    "use strict"
 
    const checkBox = '.coral3-Checkbox-input[name*="./triggerModel"]';
    const checkBoxClass = '.checkbox-toggle-target[name="./triggerModel"]';
    const fieldWrapper = ".coral-Form-fieldwrapper";
 
    $document.on('dialog-ready', function() {
        checkEditorialView();
        $(checkBoxClass).on('click', checkBox, checkEditorialView);
        $(checkBoxClass).on('click', checkBox, clearModalID);
    });
    function checkEditorialView() {
 
        Coral.commons.ready(this, () => {
            if ($(checkBox).is(':checked')) {
                $(checkBoxClass).parent(fieldWrapper).siblings(".checkbox-linkdetails-target").first().addClass("hide");
                $(checkBoxClass).parent(fieldWrapper).siblings(".checkbox-modaldetails-target").first().removeClass("hide");
            } else {
                $(checkBoxClass).parent(fieldWrapper).siblings(".checkbox-linkdetails-target").first().removeClass("hide");
                $(checkBoxClass).parent(fieldWrapper).siblings(".checkbox-modaldetails-target").first().addClass("hide");
            }
    	});
    }
	function clearModalID() {
    	$('input[name="./modalID"]').val('');
	}
})($, $(document));