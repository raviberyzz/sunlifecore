$(document).ready(function () {
    /* If clicked anywhere outside of hamburger menu close the panel */
    $(document).on("click", function (e) {
        if (
            $(e.target).closest("#hamburgerMenu").length == 0 &&	// Check that the parent of the element clicked does not belong to the hambuger menu button (ensures panel isn't immediately closed)
            $(e.target).closest(".hamburger-menu-wrapper").length == 0 && // Check that the parent of the element clicked does not belong to the hamburger-menu-wrapper       
            $('.hamburger-menu-wrapper').hasClass('active') &&
            $('.offcanvas-overlay').hasClass('active')
        ) {
            $('.hamburger-menu-wrapper').addClass('inactive').removeClass('active');
            $('.offcanvas-overlay').removeClass('active');
            $('.container').css({ 'margin-left': '0px' });
            $('body').removeClass('overflow-hidden');
            $('.slf-mobile-header-wrapper').css({ 'position': 'fixed' });
        }
    });
    /* end hamburger menu close logic */
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

    //   if sign in button is present or not
    if ($('.mobile-sign-in-box').length > 0) {
        mobileLogoWidth();
        function mobileLogoWidth() {
            var hamburger = $('.hamburger-menu').width();
            var signbutton = $('.mobile-sign-in-box').width();
            var windowwidth = $(window).width();
            var logowidth = windowwidth - signbutton - hamburger;
            setTimeout(function () {
                $('.slf-header-mobile-logo').width(logowidth);
                }, 0)
        }
    } else {
        mobileLogoWidthSignIn();
        function mobileLogoWidthSignIn() {
            var hamburger = $('.hamburger-menu').width();
            var windowwidth = $(window).width();
            var logowidth = windowwidth - hamburger;
            setTimeout(function () {
                $('.slf-header-mobile-logo').width(logowidth);
                }, 0)
        }
        $('.slf-mobile-header-wrapper .mobile-header-navbar .slf-header-mobile-logo a').css({
            "position": "relative",
            "right": "30px"
        });
        if($('.dot-com').length === 0 ) {
            $('.slf-mobile-header-wrapper .mobile-header-navbar .slf-header-mobile-logo a img').css({
                "width": "auto"
            });
    }
    }

        // signIn mobile header
        $(document).ready(function () {
        if ($(window).width() < 1025 && $('.secondary-logo-wrapper').length > 0) {
            let wcmMode=getCookie('wcmmode');
            if( wcmMode != "preview" && wcmMode != "edit") {
            setTimeout(function () {
                $('.secondary-logo-wrapper').css('margin-top', 50);
                }, 0)
            } else {
                setTimeout(function () {
                    $('.secondary-logo-wrapper').css('margin-top', 0);
                    }, 0) 
            }
            if($('.hide-logo').length > 0) {
                $('.hide-logo').remove();
                if($('.secondary-logo-wrapper').children().length === 0) {
                    $('.secondary-logo-wrapper').remove();
                }
            }
        } else if ($(window).width() < 1025 && $('.secondary-logo-wrapper').length === 0) {
            let wcmMode=getCookie('wcmmode');
            if( wcmMode != "preview" && wcmMode != "edit") {
            setTimeout(function () {
                $('.full-header').parents('.experiencefragment').next().css('margin-top', 50);
                }, 0)
            } else {
                setTimeout(function () {
                    $('.full-header').parents('.experiencefragment').next().css('margin-top', 0);
                }, 0)
            }
        } else if ($(window).width() > 1024 && $('.secondary-logo-wrapper').length === 0) {
            setTimeout(function () {
                $('.full-header').parents('.experiencefragment').next().css('margin-top', 0);
                }, 0)
        }
    });
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
    $(window).resize(function () {
    //   if sign in button is present or not
    if ($('.mobile-sign-in-box').length > 0) {
        mobileLogoWidth();
        function mobileLogoWidth() {
            var hamburger = $('.hamburger-menu').width();
            var signbutton = $('.mobile-sign-in-box').width();
            var windowwidth = $(window).width();
            var logowidth = windowwidth - signbutton - hamburger;
            setTimeout(function () {
                $('.slf-header-mobile-logo').width(logowidth);
                }, 0)
        }
    } else {
        mobileLogoWidthSignIn();
        function mobileLogoWidthSignIn() {
            var hamburger = $('.hamburger-menu').width();
            var windowwidth = $(window).width();
            var logowidth = windowwidth - hamburger;
            setTimeout(function () {
                $('.slf-header-mobile-logo').width(logowidth);
                }, 0)
        }
        $('.slf-mobile-header-wrapper .mobile-header-navbar .slf-header-mobile-logo a').css({
            "position": "relative",
            "right": "30px"
        });
        if($('.dot-com').length === 0 ) {
            $('.slf-mobile-header-wrapper .mobile-header-navbar .slf-header-mobile-logo a img').css({
                "width": "auto"
            });
    }
    }
    $(document).ready(function () {   
        if ($(window).width() < 1025 && $('.secondary-logo-wrapper').length > 0) {
            let wcmMode=getCookie('wcmmode');
            if( wcmMode != "preview" && wcmMode != "edit") {
            setTimeout(function () {
                $('.secondary-logo-wrapper').css('margin-top', 50);
                }, 0)
            } else {
                setTimeout(function () {
                    $('.secondary-logo-wrapper').css('margin-top', 0);
                    }, 0) 
            }
            if($('.hide-logo').length > 0) {
                $('.hide-logo').remove();
                if($('.secondary-logo-wrapper').children().length === 0) {
                    $('.secondary-logo-wrapper').remove();
                }
            }
        } else if ($(window).width() < 1025 && $('.secondary-logo-wrapper').length === 0) {
            let wcmMode=getCookie('wcmmode');
            if( wcmMode != "preview" && wcmMode != "edit") {
            setTimeout(function () {
                $('.full-header').parents('.experiencefragment').next().css('margin-top', 50);
                }, 0)
            } else {
                setTimeout(function () {
                    $('.full-header').parents('.experiencefragment').next().css('margin-top', 0);
                }, 0)
            }
        } else if ($(window).width() > 1024 && $('.secondary-logo-wrapper').length === 0) {
            setTimeout(function () {
                $('.full-header').parents('.experiencefragment').next().css('margin-top', 0);
                }, 0)
            }
        });
        if ($(window).width() > 1024) {
            $('.container').css({ 'margin': '0 auto' });
            $('body').removeClass('overflow-hidden');
        }
        else if ($(window).width() < 1025) {
            var windowHeightResize = $(window).height();
            $('.hamburger-menu-wrapper').height(windowHeightResize);
            if ($('.hamburger-menu-wrapper').hasClass('active')) {
                $('.container').css({ 'margin-left': '270px' });
                $('body').addClass('overflow-hidden');
                $('.slf-mobile-header-wrapper').css({ 'position': 'static' });
            }
            else {
                $('.container').css({ 'margin': '0 auto' });
                $('body').removeClass('overflow-hidden');
                $('.slf-mobile-header-wrapper').css({ 'position': 'fixed' });
            }
        }
    });
});   