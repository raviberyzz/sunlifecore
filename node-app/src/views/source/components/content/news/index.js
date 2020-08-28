$(document).ready(function () {
    popUpWidth();
    function popUpWidth() {
        var popWidth = $(window).width();
        $(".preference-popup-wrapper").width(popWidth);
    };
    if ($(window).width() > 1024) {
        popUpWidth();
    }
    $(window).resize(function () {
        if ($(window).width() > 1024) {
            popUpWidth();
        }
    });
});