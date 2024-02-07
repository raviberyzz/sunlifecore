(function($, $document) {
    "use strict"
    $(document).on('dialog-ready', function() {
        if (!$('[name="./id"]').val()) {
            assignRandomValue();
        }
    });

    function assignRandomValue() {
        var t = Math.floor(Math.random() * 1000000000);
        document.getElementsByClassName('unique-id')[0].value = t;
        var id = document.getElementsByClassName("unique-id");
    }
})($, $(document));