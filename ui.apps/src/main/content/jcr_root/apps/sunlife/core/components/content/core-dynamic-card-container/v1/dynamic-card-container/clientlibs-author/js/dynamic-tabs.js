/**
* Dynamic Card Container Component author dialog specific JS
*/
(function($, $document) {
    "use strict";

    /* Binding event and callback on foundation-contentloaded */
    $(document).on("foundation-contentloaded", function(e) {
        $("#dynamic-card-tab-hide-show").each(function() {
            showHide();
        });
    });

    /* Binding change event and callback on dynamic card container dropdown */
    $document.on("change", "#dynamic-card-container-dropdown", function(e) {
        showHide();
    });

    /* Show/hide authoring tabs depending upon selected card type */
    function showHide() {
        const list = $("#dynamic-card-tab-hide-show").find("coral-tab");
        const horizontal = $(".horizontal").prop("selected");
        const vertical = $(".vertical").prop("selected");
        const avatar = $(".avatar").prop("selected");
        const banner = $(".banner").prop("selected");
        const banner_image = $(".banner-image").prop("selected");
        const media = $(".media").prop("selected");
        const segmented = $(".segmented").prop("selected");
        const statistic = $(".statistic").prop("selected");


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