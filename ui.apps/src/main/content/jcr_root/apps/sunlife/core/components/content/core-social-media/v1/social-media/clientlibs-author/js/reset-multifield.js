(function(document, $) {
    "use strict";
    $(document).on("foundation-contentloaded", function(e) {
        showHideHandler($(".cq-dialog-dropdown-showhide", e.target));
    });

    $(document).on("change", ".cq-dialog-dropdown-showhide", function(e) {
        showHideHandler($(this));
    });

    function showHideHandler(el) {
		
        var selectedValue = el.val();
		
        if (selectedValue == 'sociallinks') {
            var targetElement = el.closest('div[class^="coral-Form-fieldwrapper"]').siblings('[data-showhidetargetvalue="shareoptions"]');
            var $targetElement = $(targetElement);
            $targetElement.find(".coral3-Multifield-item").each(function() {
                $(this).remove();
            });
        }
        else if(selectedValue == 'shareoptions') {
            var targetElement = el.closest('div[class^="coral-Form-fieldwrapper"]').siblings('[data-showhidetargetvalue="sociallinks"]');
            var $targetElement = $(targetElement);
            $targetElement.find(".coral3-Multifield-item").each(function() {
                $(this).remove();
            });
        }
    }
})(document, Granite.$);