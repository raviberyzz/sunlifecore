(function($) {
    "use strict";

    var dialogContentSelector = ".cmp-hero-banner__editor";
    var CheckboxTextfieldTuple = window.CQ.CoreComponents.CheckboxTextfieldTuple.v1;
    var isDecorative;
    var $altURLField;
    var altURLField;

    $(document).on("dialog-loaded", function(e) {
        var $dialog        = e.dialog;
        var $dialogContent = $dialog.find(dialogContentSelector);
        var dialogContent  = $dialogContent.length > 0 ? $dialogContent[0] : undefined;
        if (dialogContent) {
            isDecorative      = dialogContent.querySelector('coral-checkbox[name="./isDecorative"]');

            $altURLField     = $dialogContent.find(".cmp-hero-banner__editor-alt");
			altURLField = dialogContent.querySelector('input[name="./altText"]');

            toggleAlternativeFieldsAndLink(isDecorative);
        }
    });

    $(document).on("dialog-beforeclose", function() {
        $(window).off("focus");
    });

    $(document).on("change", dialogContentSelector + ' coral-checkbox[name="./isDecorative"]', function(e) {
        toggleAlternativeFieldsAndLink(e.target);
    });

    function toggleAlternativeFieldsAndLink(checkbox) {
        if (checkbox) {
            if (checkbox.checked) {
                altURLField.value = '';
                altURLField.setAttribute('aria-required', false);
                $altURLField.hide();
            } else {
				altURLField.setAttribute('aria-required', true);
                $altURLField.show();
            }
        }
    }

})(jQuery);
