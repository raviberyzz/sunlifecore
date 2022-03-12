$(document).ready(function () {
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
    if(typeof ContextHub == "undefined"){
        bindHamburgerEvent();
        mobileNavigation();
    }
    else{
        checkHeader1();
    }
    function checkHeader1(){
        if($(".slf-header-mobile-logo").length==0){
            setTimeout(checkHeader1, 500);
        }   
        else{
            bindHamburgerEvent();
            mobileNavigation();
        }
     }
    function bindHamburgerEvent(){
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

        //ESC Key functionality for Closing Mobile Menu (Also copied into SOURCE Override)
        $(document).on("keydown", function (event) {
            let key = typeof event.which == "undefined" ? event.keyCode: event.which;
                if (key === 27 || key === "Escape") {
                    if($(".hamburger-menu-wrapper").hasClass("active")){
                        $("#close-hamburger").click();
                    }
                }
          });

        //Mobile Hamburger Menu Tab Trapping (Also copied into SOURCE Override)
        //Due to the way the Mobile Menu is used with Second/Third Level Navigational Divs we need to check which level is active on tabbing and figure out which are the first and last elements to trap the tabbing correctly.
        $('.hamburger-menu-wrapper').find('select, input, textarea, button, a').on('keydown', function (event) {     
            var key = typeof event.which == "undefined" ? event.keyCode : event.which;
            let tabKeyPressed = key == 9 && !event.shiftKey;
            let shiftTabKeyPressed = key == 9 && event.shiftKey;
            if (tabKeyPressed || shiftTabKeyPressed) {
                const firstLevelMobileMenuInputs = $('.hamburger-menu-wrapper').find('select, input, textarea, button, a').filter(':visible');
                const secondLevelMobileMenuInputs = $('.hamburger-menu-wrapper .second-level-navigation.active').find('select, input, textarea, button, a').filter(':visible');
                const thirdLevelMobileMenuInputs = $('.hamburger-menu-wrapper .third-level-navigation.active').find('select, input, textarea, button, a').filter(':visible');

                let firstInput = firstLevelMobileMenuInputs.first();
                let lastInput = firstLevelMobileMenuInputs.last();

                if ( thirdLevelMobileMenuInputs.length > 0) {
                    firstInput = thirdLevelMobileMenuInputs.first();
                    lastInput = thirdLevelMobileMenuInputs.last();
                } else if ( secondLevelMobileMenuInputs.length > 0 ) {
                    firstInput = secondLevelMobileMenuInputs.first();
                    lastInput = secondLevelMobileMenuInputs.last();
                }

                if (shiftTabKeyPressed && $(this)[0].innerHTML == firstInput[0].innerHTML) {
                    event.preventDefault();
                    lastInput[0].focus();
                } else if (tabKeyPressed && $(this)[0].innerHTML == lastInput[0].innerHTML) {
                    event.preventDefault();
                    firstInput[0].focus();
                }
            }
        });
        /* end hamburger menu close logic */
        

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
    }

    // signIn mobile header
    $(document).ready(function () {
        if($('body').hasClass('signin-content-page') || $('body').hasClass('signin-home-page')){ 
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
        } 
        else if ($(window).width() < 1025 && $('.secondary-logo-wrapper').length === 0) {
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
    }
    });

    function mobileNavigation(){
        $("#hamburgerMenu button").click(function () {
            $(this).attr("aria-expanded", "true");
            //Timeout added for expanded aria state annoucement
            setTimeout(function(){
                $('.hamburger-menu-wrapper').addClass('active').removeClass('inactive');
                $('.offcanvas-overlay').addClass('active');
                $('.container').css({ 'margin-left': '270px' });
                $('body').addClass('overflow-hidden');
                $('.slf-mobile-header-wrapper').css({ 'position': 'static' });
                var windowHeight = $(window).height();
                $('.hamburger-menu-wrapper').height(windowHeight);
                $("#close-hamburger").focus();
            }, 500);
        });
        $("#close-hamburger").click(function () {
            $('.hamburger-menu-wrapper').removeClass('active').addClass('inactive');
            $('.offcanvas-overlay').removeClass('active');
            $('.container').css({ 'margin-left': '0px' });
            $('body').removeClass('overflow-hidden');
            $('.slf-mobile-header-wrapper').css({ 'position': 'fixed' });
            $('#hamburgerMenu button').attr("aria-expanded", "false");
            $('#hamburgerMenu button').focus();
        });
        $('.first-level-navigation .navigation-menu').children("a").click(function (event) {
            if (event.target.parentNode.children[1].className === "third-level-navigation") {
                sessionStorage.scrollPositionSecond = $(this).parent().closest('div').scrollTop();
            } else {
                sessionStorage.scrollPositionFirst = $(this).parent().closest('div').scrollTop();
            }
        });
        $('.second-level-navigation .go-back').click(function () {
            $(this).closest('div').parent().closest('div').scrollTop(sessionStorage.scrollPositionFirst);
            $('.hamburger-menu-wrapper').find('select, input, textarea, button, a').filter(':visible').first().focus();
        });
        $('.third-level-navigation .go-back').click(function () {
            $(this).closest('div').parent().closest('div').scrollTop(sessionStorage.scrollPositionSecond);
            $('.hamburger-menu-wrapper .second-level-navigation.active').find('select, input, textarea, button, a').filter(':visible').first().focus();
        });
        $('.navigation-menu').children('a').click(function (event) {
            event.preventDefault();
            $(this).parent().closest('div').scrollTop(0);
            $(this).siblings("div").addClass('active');
            $(this).parent().closest('div').css({ 'overflow-y': 'hidden' });
            $(this).siblings("div").find('select, input, textarea, button, a').filter(':visible').first().focus();
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
    }
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
        if($('body').hasClass('signin-content-page') || $('body').hasClass('signin-home-page')){  
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