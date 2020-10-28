$(document).ready(function () {
   /* popUpWidth();
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
    });*/
    $('.dynamic-news-tile div').first().addClass('col-lg-8 col-md-8').removeClass('col-lg-4 col-md-4');
});