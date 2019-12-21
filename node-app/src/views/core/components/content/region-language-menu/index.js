console.log('region-language-menu loaded');
$(document).ready(function(){
    $('.slf-tab-region .slf-tab').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('.region-present').siblings().css("display", "none");
    $('.language-present').siblings().css("display", "none");
    $(".mobile-header .first").click(function(){
        $('.mobile-header .first').addClass('active');
        $('.mobile-header .second').removeClass('active');
        $('.mobile-header #region-tab').css({'display':'block'});
        $('.mobile-header #language-tab').css({'display':'none'});
    });
    $(".mobile-header .second").click(function(){
        $('.mobile-header .first').removeClass('active');
        $('.mobile-header .second').addClass('active');
        $('.mobile-header #region-tab').css({'display':'none'});
        $('.mobile-header #language-tab').css({'display':'block'});
    });
});