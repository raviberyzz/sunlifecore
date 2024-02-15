(function(document, $) {
    "use strict";
    
    $(document).on("foundation-contentloaded", function(e) {
        showHideHandler($(".cq-dialog-tab-showhide", e.target));
    });

    $(document).on("change", ".cq-dialog-tab-showhide", function(e) {
        showHideHandler($(this));
    });

    function showHideHandler(el) {

        var selectedValue = el.val();

        if (selectedValue == 'standardModal') {
            $("coral-tab-label:contains('Footer Settings')").parent().prop("style","display: block;");
            if(!$("div.text-option-showhide-target").hasClass("hide")) {
				$(".text-option-showhide-target").addClass("hide");
            }

        }
        else if(selectedValue == 'formModal') {
			$("coral-tab-label:contains('Footer Settings')").parent().hide();
			$(".text-option-showhide-target").removeClass("hide");
        }
    }
})(document, Granite.$);