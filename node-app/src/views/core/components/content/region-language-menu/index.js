console.log('region-language-menu loaded');
$(document).ready(function(){
    $('.content-region .nav-select').parent().addClass('in');
    $('.content-region .nav-select').parent().siblings().attr('aria-expanded','true');
    $('.content-region .accordion-heading').click(function(){
        if($(this).attr('aria-expanded') == 'false'){
            $(this).attr('aria-expanded','true');
            $(this).siblings().addClass('in');
        }
        else{
            $(this).attr('aria-expanded','false');
            $(this).siblings().removeClass('in');
        }
    });
    $('.tab-content .accordion-heading').click(function(){
        if($(this).attr('aria-expanded') == 'false'){
            $(this).attr('aria-expanded','true');
            $(this).siblings().addClass('in');
        }
        else{
            $(this).attr('aria-expanded','false');
            $(this).siblings().removeClass('in');
        }
    });

    $('.slf-tab-region .slf-tab').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('.region-present').siblings().css("display", "none");
    $('.language-present').siblings().css("display", "none");
    $(".mobile-header .first").click(function(){
        $('.mobile-header .first').addClass('active');
        $('.mobile-header .second').removeClass('active');
        $('.mobile-header .region-tab').css({'display':'block'});
        $('.mobile-header .language-tab').css({'display':'none'});
    });
    $(".mobile-header .second").click(function(){
        $('.mobile-header .first').removeClass('active');
        $('.mobile-header .second').addClass('active');
        $('.mobile-header .region-tab').css({'display':'none'});
        $('.mobile-header .language-tab').css({'display':'block'});
    });
});