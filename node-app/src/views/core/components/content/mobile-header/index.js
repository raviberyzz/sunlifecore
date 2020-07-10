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

    // signIn mobile header
    if ($('.slf-header-wrapper').children().hasClass('mobile-header-signIn')) {
        mobileLogoWidthSignIn();
        function mobileLogoWidthSignIn() {  
        var hamburger=$('.hamburger-menu').width();    
        var windowwidth=$(window).width();
        var logowidth=windowwidth-hamburger;
        $('.slf-header-mobile-logo').width(logowidth);
        }
        if ($('.mobile-header-signIn').children().children().next().hasClass('secondary-logo-wrapper')) {
            heightSecondaryLogo = $('.secondary-logo-wrapper').height();
            $('.full-header').parents('.experiencefragment').next().css('margin-top', heightSecondaryLogo);
        }
    } else {
        mobileLogoWidth();
        function mobileLogoWidth() {  
        var hamburger=$('.hamburger-menu').width();
        var signbutton=$('.mobile-sign-in-box').width();     
        var windowwidth=$(window).width();
        var logowidth=windowwidth-signbutton-hamburger;
        $('.slf-header-mobile-logo').width(logowidth);
        } 
    }     
    $("#hamburgerMenu").click(function () { 
        $('.hamburger-menu-wrapper').addClass('active').removeClass('inactive');             
        $('.offcanvas-overlay').addClass('active');
        $('.container').css({'margin-left':'270px'});
        $('body').addClass('overflow-hidden');
        $('.slf-mobile-header-wrapper').css({'position':'static'});
        var windowHeight=$(window).height();
        $('.hamburger-menu-wrapper').height(windowHeight);
    });
    $("#close-hamburger").click(function () {
        $('.hamburger-menu-wrapper').removeClass('active').addClass('inactive');      
        $('.offcanvas-overlay').removeClass('active');
        $('.container').css({'margin-left':'0px'});
        $('body').removeClass('overflow-hidden');
        $('.slf-mobile-header-wrapper').css({'position':'fixed'});
    });
    $('.first-level-navigation .navigation-menu').children("a").click(function(){
        if(event.target.parentNode.children[1].className === "third-level-navigation") {
            sessionStorage.scrollPositionSecond = $(this).parent().closest('div').scrollTop();
        } else {
            sessionStorage.scrollPositionFirst = $(this).parent().closest('div').scrollTop();
        }
    });
    $('.second-level-navigation .go-back').click(function(){
        $(this).closest('div').parent().closest('div').scrollTop(sessionStorage.scrollPositionFirst);
    });
    $('.third-level-navigation .go-back').click(function(){
        $(this).closest('div').parent().closest('div').scrollTop(sessionStorage.scrollPositionSecond);
    });
    $('.navigation-menu').children('a').click(function(){
        $(this).parent().closest('div').scrollTop(0);
        $(this).siblings("div").addClass('active');         
        $(this).parent().closest('div').css({'overflow-y':'hidden'});
    });
    $('.go-back').click(function(event){ 
        $(this).closest("div").removeClass('active');          
        $(this).closest('div').parent().closest('div').css({'overflow-y':'auto'});
    });
    $('.language-region .second-level-navigation .go-back').click(function(){  
        $('.language-region .second-level-navigation').removeClass('active');         
        $('.hamburger-menu-wrapper').css({'overflow-y':'auto'});
        $('.hamburger-menu-wrapper').scrollTop(sessionStorage.scrollPositionFirst);
    });
    $(window).resize(function() {
        if ($('.slf-header-wrapper').children().hasClass('mobile-header-signIn')) {
            function mobileLogoWidthSignIn() {  
            var hamburger=$('.hamburger-menu').width();    
            var windowwidth=$(window).width();
            var logowidth=windowwidth-hamburger;
            $('.slf-header-mobile-logo').width(logowidth);
            }
            mobileLogoWidthSignIn();
        } else {
            function mobileLogoWidth() {  
                var hamburger=$('.hamburger-menu').width();
                var signbutton=$('.mobile-sign-in-box').width();     
                var windowwidth=$(window).width();
                var logowidth=windowwidth-signbutton-hamburger;
                $('.slf-header-mobile-logo').width(logowidth);
                }
            mobileLogoWidth();
        }
        if ($(window).width() > 1024) {
            $('.container').css({'margin':'0 auto'});
            $('body').removeClass('overflow-hidden'); 
        }
        else if ($(window).width() < 1025) {
            var windowHeightResize=$(window).height();
            $('.hamburger-menu-wrapper').height(windowHeightResize);
            if ($('.hamburger-menu-wrapper').hasClass('active')){
                $('.container').css({'margin-left':'270px'});
                $('body').addClass('overflow-hidden');
                $('.slf-mobile-header-wrapper').css({'position':'static'});
            }
            else{
                $('.container').css({'margin':'0 auto'}); 
                $('body').removeClass('overflow-hidden');
                $('.slf-mobile-header-wrapper').css({'position':'fixed'}); 
            } 
        }
    });  
});   