(function(window, document, $, Granite, undefined) {

    $(window).adaptTo("foundation-registry").register("foundation.validation.validator", {

        selector: "[data-foundation-validation^='multifield-social-max']",
        validate: function(el) {

            var socialMediaType = $('[name="./type"]').val();
            if (socialMediaType === 'shareoptions') {
                var validationName = el.getAttribute("data-validation");
                var res = validationName.split(",");
                var min;
                var max;

                max = res[0].replace("multifield-social-max-", "");
                min = res[1].replace("multifield-social-min-", "");

                max = parseInt(max);
                if (el.items.length < min) {
                    return "Minimum items allowed is " + min
                }
                if (el.items.length > max) {
                    return "Maximum items allowed are " + max
                }
            }
        }
    });

})(window, document, Granite.$, Granite);