(function(document, $) {
    "use strict";
 
    $(document).on("foundation-contentloaded", function (e) {
        Coral.commons.ready(function () {
            showHideHandler($('.coral-Form-field[name*="./type"]', e.target));
        });
    });

    $(document).on("change", '.coral-Form-field[name*="./type"]', function(e) {
        showHideHandler($(this));
    });
 
    function showHideHandler(el) {
        if(el.val() === "textarea"){
            el.parent(".coral-Form-fieldwrapper").siblings(".showhide-icon").first().addClass("hide");
        }
        else{
            el.parent(".coral-Form-fieldwrapper").siblings(".showhide-icon").first().removeClass("hide");
        }
    }
})(document, Granite.$);