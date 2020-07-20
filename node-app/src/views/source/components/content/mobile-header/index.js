$(document).ready(function () {
    function mobileLogoWidthSource() {
        var hamburger = $('.hamburger-menu').width();
        var windowwidth = $(window).width();
        var logowidth = windowwidth - hamburger;
        setTimeout(function () {
            $('.slf-header-mobile-logo').width(logowidth);
        }, 0)
    }
    if($(window).width < 1025){
        mobileLogoWidthSource();
        $(window).resize(mobileLogoWidthSource);
    }

})