(function($, $document) {

    "use strict";

    $(document).on("foundation-contentloaded", function(e) {

        $("#tab-hide-show").each(function() {
            showHide();
        });

    });


    $document.on("change", ".newsType", function(e) {
        showHide();
    });

    function showHide() {
        var list = $("#tab-hide-show").find("coral-tab");
        let overview = $(".overview").prop("selected");
        let listing = $(".listing").prop("selected")

        if (overview) {
            list[1].removeAttribute("hidden");
        } else {
            list[1].setAttribute("hidden", true)
        }
        if (listing) {
            list[2].removeAttribute("hidden");
        } else {
            list[2].setAttribute("hidden", true);
        }
    }
})($, $(document));