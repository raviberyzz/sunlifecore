(function($, $document) {

    "use strict";

    $(document).on("foundation-contentloaded", function(e) {

        $("#dynamic-card-tab-hide-show").each(function() {
            showHide();
        });

    });


    $document.on("change", "#dynamic-card-container-dropdown", function(e) {
        showHide();
    });

    function showHide() {
        var list = $("#dynamic-card-tab-hide-show").find("coral-tab");
        let horizontal = $(".horizontal").prop("selected");
        let vertical = $(".vertical").prop("selected");
        let avatar = $(".avatar").prop("selected");
        let banner = $(".banner").prop("selected");
        let banner_image = $(".banner-image").prop("selected");
        let media = $(".media").prop("selected");
        let segmented = $(".segmented").prop("selected");
        let statistic = $(".statistic").prop("selected");


        if (horizontal) {
            list[1].removeAttribute("hidden");
        } else {
            list[1].setAttribute("hidden", true);
        }
        if (vertical) {
            list[2].removeAttribute("hidden");
        } else {
            list[2].setAttribute("hidden", true);
        }
        if (avatar) {
            list[3].removeAttribute("hidden");
        } else {
            list[3].setAttribute("hidden", true);
        }
        if (banner) {
            list[4].removeAttribute("hidden");
        } else {
            list[4].setAttribute("hidden", true);
        }
        if (banner_image) {
            list[5].removeAttribute("hidden");
        } else {
            list[5].setAttribute("hidden", true);
        }
        if (media) {
            list[6].removeAttribute("hidden");
        } else {
            list[6].setAttribute("hidden", true);
        }
        if (segmented) {
            list[7].removeAttribute("hidden");
        } else {
            list[7].setAttribute("hidden", true);
        }
        if (statistic) {
            list[8].removeAttribute("hidden");
        } else {
            list[8].setAttribute("hidden", true);
        }
    }
})($, $(document));