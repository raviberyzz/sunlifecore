(function(document, $) {
    "use strict";

    $(document).on("foundation-contentloaded", function(e) {
        showHideHandler($(".cq-dialog-custom-offsetgrid-showhide", e.target));
    });

    $(document).on("change", ".cq-dialog-custom-offsetgrid-showhide", function(e) {
        showHideHandler($(this));
        resetColumn();

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

        var numberOfColumns = $('[name="./numberOfColumn"]').val();
        var numberOfCustomColumns = $('[name="./numberOfCustomColumns"]').val();

        if (numberOfCustomColumns != null && numberOfCustomColumns != '' && numberOfColumns == 'custom' && numberOfCustomColumns == '1') {

            $(".showhideone").removeClass("hide");
            $(".showhidetwo").addClass("hide");
            $(".showhidethree").addClass("hide");
            $(".showhidefour").addClass("hide");
            $(".showhidefive").addClass("hide");
            $(".showhidesix").addClass("hide");


        } else if (numberOfCustomColumns != null && numberOfCustomColumns != '' && numberOfColumns == 'custom' && numberOfCustomColumns == '2') {

            $(".showhideone").removeClass("hide");
            $(".showhidetwo").removeClass("hide");
            $(".showhidethree").addClass("hide");
            $(".showhidefour").addClass("hide");
            $(".showhidefive").addClass("hide");
            $(".showhidesix").addClass("hide");


        } else if (numberOfCustomColumns != null && numberOfCustomColumns != '' && numberOfColumns == 'custom' && numberOfCustomColumns == '3') {

            $(".showhideone").removeClass("hide");
            $(".showhidetwo").removeClass("hide");
            $(".showhidethree").removeClass("hide");
            $(".showhidefour").addClass("hide");
            $(".showhidefive").addClass("hide");
            $(".showhidesix").addClass("hide");


        } else if (numberOfCustomColumns != null && numberOfCustomColumns != '' && numberOfColumns == 'custom' && numberOfCustomColumns == '4') {

            $(".showhideone").removeClass("hide");
            $(".showhidetwo").removeClass("hide");
            $(".showhidethree").removeClass("hide");
            $(".showhidefour").removeClass("hide");
            $(".showhidefive").addClass("hide");
            $(".showhidesix").addClass("hide");


        } else if (numberOfCustomColumns != null && numberOfCustomColumns != '' && numberOfColumns == 'custom' && numberOfCustomColumns == '5') {

            $(".showhideone").removeClass("hide");
            $(".showhidetwo").removeClass("hide");
            $(".showhidethree").removeClass("hide");
            $(".showhidefour").removeClass("hide");
            $(".showhidefive").removeClass("hide");
            $(".showhidesix").addClass("hide");


        } else if (numberOfCustomColumns != null && numberOfCustomColumns != '' && numberOfColumns == 'custom' && numberOfCustomColumns == '6') {

            $(".showhideone").removeClass("hide");
            $(".showhidetwo").removeClass("hide");
            $(".showhidethree").removeClass("hide");
            $(".showhidefour").removeClass("hide");
            $(".showhidefive").removeClass("hide");
            $(".showhidesix").removeClass("hide");

        } else {

            $(".showhideone").addClass("hide");
            $(".showhidetwo").addClass("hide");
            $(".showhidethree").addClass("hide");
            $(".showhidefour").addClass("hide");
            $(".showhidefive").addClass("hide");
            $(".showhidesix").addClass("hide");


        }
    }

    function resetColumn() {

        $('.showhideone coral-numberinput').val('0');
        $('.showhidetwo coral-numberinput').val('0');
        $('.showhidethree coral-numberinput').val('0');
        $('.showhidefour coral-numberinput').val('0');
        $('.showhidefive coral-numberinput').val('0');
        $('.showhidesix coral-numberinput').val('0');
        $('.showhideone coral-checkbox').attr('checked', false);
        $('.showhidetwo coral-checkbox').attr('checked', false);
        $('.showhidethree coral-checkbox').attr('checked', false);
        $('.showhidefour coral-checkbox').attr('checked', false);
        $('.showhidetfive coral-checkbox').attr('checked', false);
        $('.showhidesix coral-checkbox').attr('checked', false);
        $('.togglecolumnfield').addClass("hide");

    }	
})(document, Granite.$);