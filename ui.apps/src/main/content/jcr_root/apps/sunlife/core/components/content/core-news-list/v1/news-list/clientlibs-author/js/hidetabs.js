(function(document, $, Coral) {
    var $doc = $(document);
    $doc.on('foundation-contentloaded', function(e) {
        var coralTab = $(".tabtest coral-tablist coral-tab");
        console.log("The coral tab is:: ", coralTab[1].get);
        coralTab[2].hide();
        $('.presets', e.target).each(function(i, element) {
            Coral.commons.ready(element, function(component) {
                $(component).on("change", function(event) {
                    var coralTab = $(".tabtest coral-tablist coral-tab");
                    coralTab[1].show();
                });
            });
        });
    });
})(document, Granite.$, Coral);


/*
(function ($, document, ns) {
    $(document).on("dialog-ready", function() {
        alert("Inside hide tabs");
        function showHideTab() {
            var dropdownSelection = $("#dropdown-selection").val();
            var coralTab = $(".dropdown-tab-container coral-tablist coral-tab");

            if (dropdownSelection === "default") {
                coralTab.eq(2).hide();
            } else {
                coralTab.eq(2).show();
            }
        }

       $("#dropdown-selection").on("change", showHideTab);
       showHideTab();

    });
})(Granite.$, document, Granite.author);
*/