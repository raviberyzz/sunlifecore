$(document).ready(function () {
    // function mobileLogoWidthSource() {
    //     var hamburger = $('.hamburger-menu').width();
    //     var windowwidth = $(window).width();
    //     var logowidth = windowwidth - hamburger;
    //     setTimeout(function () {
    //         $('.slf-header-mobile-logo').width(logowidth);
    //     }, 0)
    // }
    // if($(window).width() < 1025){
    //     mobileLogoWidthSource();
    //     $(window).resize(mobileLogoWidthSource);
    // }

   // $(".mobile-signin-text").text("Find");

    // adding username and language toggle link to hamburger menu
    $(".utility-nav-wrapper .utility-nav-links ul[role='navigation']").clone().appendTo('.hamburger-menu-wrapper');

})