(function(document, $) {
    "use strict";
    
    $(document).on("foundation-contentloaded", function(e) {
        setTimeout(function(){
            showHideHandler($(".cq-dialog-tab-showhide", e.target));
        }, 10);
    });

    $(document).on("change", ".cq-dialog-tab-showhide", function(e) {
        showHideHandler($(this));
    });

    function showHideHandler(el) {

        var selectedValue = el.val();

        if (selectedValue == 'standardModal') {
            $("coral-tab-label:contains('Modal buttons')").parent().prop("style","display: block;");
            if(!$("div.text-option-showhide-target").hasClass("hide")) {
				$(".text-option-showhide-target").addClass("hide");
            }

        }
        else if(selectedValue == 'formModal') {
			$("coral-tab-label:contains('Modal buttons')").parent().hide();
			$(".text-option-showhide-target").removeClass("hide");
        }
    }
})(document, Granite.$);