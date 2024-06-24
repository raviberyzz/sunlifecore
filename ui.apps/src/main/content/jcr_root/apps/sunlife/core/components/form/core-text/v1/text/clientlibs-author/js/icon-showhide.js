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
        const characterLimit = '.coral-Form-field[name*="./characterlimit"]'
        if(el.val() === "textarea"){
            $iconContainer.addClass("hide");
            $(characterLimit).removeClass("hide");
        }
        else{
            $iconContainer.removeClass("hide");
            $(characterLimit).addClass("hide");
        }
    }
})(document, Granite.$);