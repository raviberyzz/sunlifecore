(function(document, $) {
    "use strict";

    $(document).on("foundation-contentloaded", function(e) {
        showHideHandler($(".cq-dialog-custom-grid-showhide", e.target));
    });

    $(document).on("selected", ".cq-dialog-custom-grid-showhide", function(e) {
        showHideHandler($(this));
    });

    function showHideHandler(el) {

        el.each(function(i, element) {
            if ($(element).is("coral-select")) {
                Coral.commons.ready(element, function(component) {
                    showHide(component, element);
                    component.on("change", function() {
                        showHide(component, element);
                    });
                });
            }
        })
    }

    function showHide(component, element) {


        var target = $(element).data("cqDialogCustomGridShowhideTarget");
        var $target = $(target);
        if (target) {
            var value;
            if (typeof component.value !== "undefined") {
                value = component.value;
            } else if (typeof component.getValue === "function") {
                value = component.getValue();
            }


            $target.not(".hide").addClass("hide");
            if (value == 'custom') {
                $target.filter("[data-showhidecustomgridtargetvalues='custom']").removeClass("hide");
            } else {

                $target.filter("[data-showhideimagetargetvalues='custom']").addClass("hide");
                $(".showhideone").addClass("hide");
                $(".showhidetwo").addClass("hide");
                $(".showhidethree").addClass("hide");
                $(".showhidefour").addClass("hide");
                $(".showhidefive").addClass("hide");
                $(".showhidesix").addClass("hide");
                $('[name="./numberOfCustomColumns"]').val('');
            }
        }
    }
})(document, Granite.$);