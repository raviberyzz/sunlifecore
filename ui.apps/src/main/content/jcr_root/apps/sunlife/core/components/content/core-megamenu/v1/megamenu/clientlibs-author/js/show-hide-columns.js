(function(document, $) {
    "use strict";

    $(document).on("foundation-contentloaded", function(e) {
        checkboxShowHideHandler($(".cq-dialog-column-checkbox-showhide", e.target));
    });

    $(document).on("change", ".cq-dialog-column-checkbox-showhide", function(e) {
        checkboxShowHideHandler($(this));
    });

    function checkboxShowHideHandler(el) {
        el.each(function(i, element) {
            if ($(element).is("coral-checkbox")) {
                // handle Coral3 base drop-down
                Coral.commons.ready(element, function(component) {
                    showHide(component, element);
                    component.on("change", function() {
                        showHide(component, element);
                    });
                });
            } else {
                // handle Coral2 based drop-down
                var component = $(element).data("checkbox");
                if (component) {
                    showHide(component, element);
                }
            }
        })
    }

    function showHide(component, element) {
        var componentname = component.name;
        var findelement = $('[name="' + componentname + '"]');
        var $findelement = $(findelement);
        if (component.checked) {
        $findelement.nextAll(".togglecolumnfield").first().addClass("hide");
        $findelement.nextAll(".togglecolumnfield").first().find("input").removeAttr("required");
        } else {
        $findelement.nextAll(".togglecolumnfield").first().removeClass("hide");
        $findelement.nextAll(".togglecolumnfield").first().find("input").attr("required", "required");
        }
    }

})(document, Granite.$);