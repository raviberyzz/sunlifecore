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
    setTimeout(function () {
        $("#hamburgerMenu").click(function () {
            $('.hamburger-menu-wrapper').addClass('active').removeClass('inactive');
            $('.offcanvas-overlay').addClass('active');
            $('.container').css({ 'margin-left': '270px' });
            $('body').addClass('overflow-hidden');
            $('.slf-mobile-header-wrapper').css({ 'position': 'static' });
            var windowHeight = $(window).height();
            $('.hamburger-menu-wrapper').height(windowHeight);
        });
        $("#close-hamburger").click(function () {
            $('.hamburger-menu-wrapper').removeClass('active').addClass('inactive');
            $('.offcanvas-overlay').removeClass('active');
            $('.container').css({ 'margin-left': '0px' });
            $('body').removeClass('overflow-hidden');
            $('.slf-mobile-header-wrapper').css({ 'position': 'fixed' });
        });
        $('.first-level-navigation .navigation-menu').children("a").click(function () {
            if (event.target.parentNode.children[1].className === "third-level-navigation") {
                sessionStorage.scrollPositionSecond = $(this).parent().closest('div').scrollTop();
            } else {
                sessionStorage.scrollPositionFirst = $(this).parent().closest('div').scrollTop();
            }
        });
        $('.second-level-navigation .go-back').click(function () {
            $(this).closest('div').parent().closest('div').scrollTop(sessionStorage.scrollPositionFirst);
        });
        $('.third-level-navigation .go-back').click(function () {
            $(this).closest('div').parent().closest('div').scrollTop(sessionStorage.scrollPositionSecond);
        });
        $('.navigation-menu').children('a').click(function () {
            $(this).parent().closest('div').scrollTop(0);
            $(this).siblings("div").addClass('active');
            $(this).parent().closest('div').css({ 'overflow-y': 'hidden' });
        });
        $('.go-back').click(function (event) {
            $(this).closest("div").removeClass('active');
            $(this).closest('div').parent().closest('div').css({ 'overflow-y': 'auto' });
        });
        $('.language-region .second-level-navigation .go-back').click(function () {
            $('.language-region .second-level-navigation').removeClass('active');
            $('.hamburger-menu-wrapper').css({ 'overflow-y': 'auto' });
            $('.hamburger-menu-wrapper').scrollTop(sessionStorage.scrollPositionFirst);
        });
    }, 1000)

})