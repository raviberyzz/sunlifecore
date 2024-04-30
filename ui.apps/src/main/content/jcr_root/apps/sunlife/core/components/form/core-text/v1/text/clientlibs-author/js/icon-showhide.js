(function(document, $) {
    "use strict";

    const typeField = '.coral-Form-field[name*="./type"]'

    $(document).on('foundation-contentloaded', function () {
        setTimeout(function(){
            showHideHandler($(typeField));
        }, 10);
    });

    $(document).on("change", typeField, function(e) {
        showHideHandler($(e.target));
    });

    function showHideHandler(el) {
        const $iconContainer = $(".showhide-icon").first();
        if(el.val() === "textarea"){
            $iconContainer.addClass("hide");
        }
        else{
            $iconContainer.removeClass("hide");
        }
    }
})(document, Granite.$);