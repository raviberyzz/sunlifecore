(function($, $document) {
    "use strict"
    $document.on('dialog-ready', function() {
        checkEditorialView();
        $('.checkbox-toggle-target').on('click', '.coral3-Checkbox-input[name*="./triggerModel"]', checkEditorialView);
        $('.checkbox-toggle-target').on('click', '.coral3-Checkbox-input[name*="./triggerModel"]', clearModalID);
    });
    function checkEditorialView() {
        Coral.commons.ready(this, () => {
            if ($( '.coral3-Checkbox-input[name*="./triggerModel"]').is(':checked')) {
                $('.checkbox-toggle-target[name="./triggerModel"]').parent(".coral-Form-fieldwrapper").siblings(".checkbox-linkdetails-target").first().addClass("hide");
                $('.checkbox-toggle-target[name="./triggerModel"]').parent(".coral-Form-fieldwrapper").siblings(".checkbox-modaldetails-target").first().removeClass("hide");
            } else {
                $('.checkbox-toggle-target[name="./triggerModel"]').parent(".coral-Form-fieldwrapper").siblings(".checkbox-linkdetails-target").first().removeClass("hide");
                $('.checkbox-toggle-target[name="./triggerModel"]').parent(".coral-Form-fieldwrapper").siblings(".checkbox-modaldetails-target").first().addClass("hide");
            }
    	});
    }
	function clearModalID() {
    	$('input[name="./modalID"]').val('');
	}
})($, $(document));