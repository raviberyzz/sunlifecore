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
    $('#tabList li').first().addClass('cmp-tabs__tab--active');
    $('#tabs-container div').first().addClass('cmp-tabs__tabpanel--active');
});