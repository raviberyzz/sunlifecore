$(document).ready(function () {
    $("#hamburgerMenu").click(function () { 
        $('.hamburger-menu-wrapper').addClass('active').removeClass('inactive');             
        $('.offcanvas-overlay').addClass('active');
        $('.container').css({'margin-left':'270px'});
        $('body').addClass('overflow-hidden');
    });
    $("#close-hamburger").click(function () {
        $('.hamburger-menu-wrapper').removeClass('active').addClass('inactive');      
        $('.offcanvas-overlay').removeClass('active');
        $('.container').css({'margin-left':'0'});
        $('body').removeClass('overflow-hidden');
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
    $('.navigation-menu').children("a").click(function(){
        $(this).parent().closest('div').scrollTop(0);
        $(this).siblings("div").addClass('active');         
        $(this).parent().closest('div').css({'overflow-y':'hidden'});
    });
    $('.go-back').click(function(){ 
        $(this).closest("div").removeClass('active');          
        $(this).closest('div').parent().closest('div').css({'overflow-y':'auto'});
    });
    $('.language-region .second-level-navigation .go-back').click(function(){  
        $('.language-region .second-level-navigation').removeClass('active');         
        $('.hamburger-menu-wrapper').css({'overflow-y':'auto'});
        $('.hamburger-menu-wrapper').scrollTop(sessionStorage.scrollPositionFirst);
    });
    $(window).resize(function() { 
        if ($(window).width() > 1024) {
            $('.container').css({'margin-left':'0'});
            $('body').removeClass('overflow-hidden'); 
        }
        else if ($(window).width() < 1025) {
            if ($('.hamburger-menu-wrapper').hasClass('active')){
                $('.container').css({'margin-left':'270px'});
                $('body').addClass('overflow-hidden'); 
            }
            else{
                $('.container').css({'margin-left':'0'}); 
                $('body').removeClass('overflow-hidden'); 
            } 
        }
        else{
        }
    });  
});     