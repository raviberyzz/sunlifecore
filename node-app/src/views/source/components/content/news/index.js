$(document).ready(function () {
    popUpWidth();
    function popUpWidth() {
        var popWidth = $(window).width();
        $(".preference-popup-wrapper").width(popWidth);
    };
    $(window).resize(function () {
        popUpWidth();
    });
});