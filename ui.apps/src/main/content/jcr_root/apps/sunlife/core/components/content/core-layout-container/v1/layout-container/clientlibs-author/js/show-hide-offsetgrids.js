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

        var listOfNumber = ['one', 'two', 'three', 'four', 'five', 'six'];
        if (numberOfCustomColumns != null && numberOfCustomColumns != '' && numberOfColumns == 'custom') {
            for (var i = 0; i < numberOfCustomColumns; i++) {
                var className = ".showhide" + listOfNumber[i];
                $(className).removeClass("hide");
            }
            for (var i = numberOfCustomColumns; i < listOfNumber.length; i++) {
                var className = ".showhide" + listOfNumber[i];
                $(className).addClass("hide");
            }
        }
    }

    function resetColumn() {

        var listOfNumber = ['one', 'two', 'three', 'four', 'five', 'six'];

        for (var i = 0; i < 6; i++) {
            var className = ".showhide" + listOfNumber[i] + " coral-numberinput";
            $(className).val('0');
            var classNameTwo = ".showhide" + listOfNumber[i] + " coral-checkbox";
            $(classNameTwo).attr('checked', false);
        }
        $('.togglecolumnfield').addClass("hide");

    }
})(document, Granite.$);