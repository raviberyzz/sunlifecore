$(document).ready(function(){
    $('.desktop-region-language-menu-wrapper .content-region .nav-select').parent().addClass('in');
    $('.desktop-region-language-menu-wrapper .content-region .nav-select').parent().siblings().attr('aria-expanded','true');
    $('.desktop-region-language-menu-wrapper .content-region .accordion-heading').click(function(){
        if($(this).attr('aria-expanded') == 'false'){
            $(this).attr('aria-expanded','true');
            $(this).siblings().addClass('in');
        }
        else{
            $(this).attr('aria-expanded','false');
            $(this).siblings().removeClass('in');
        }
    });
    // $('.tab-content .accordion-heading').click(function(){
    //     if($(this).attr('aria-expanded') == 'false'){
    //         $(this).attr('aria-expanded','true');
    //         $(this).siblings().addClass('in');
    //     }
    //     else{
    //         $(this).attr('aria-expanded','false');
    //         $(this).siblings().removeClass('in');
    //     }
    // });

    $('.desktop-region-language-menu-wrapper .slf-tab-region .slf-tab').click(function(){
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

    
  /*link farm table code starts here */
  var linkFarm = $(".cmp-linkfarm-table");
        if(linkFarm.length){
            /*desktop logic start*/
            $(".desktop-linkfarm-table").removeClass('desktop-region-language-menu-wrapper');
            $('.list-unstyled').addClass('in');
            $('.slf-language').remove();
            $('.cross-btn').remove();
            $('.cmp-linkfarm-table .slf-region').removeClass('col-xs-9').addClass('col-xs-12');
            /*desktop logic end */
                $('.cmp-linkfarm-table .col-xs-12').removeClass("mobile-language-region");
                $('.go-back').remove();
                $('.slf-tab-region').remove();
                $('.tab-content .tab-pane').addClass('active');
                $(".region-link").addClass("slf-accordion-arrow");
                $('.cmp-linkfarm-table .tab-content .slf-accordion-arrow .accordion-heading').click(function(){
            if($(this).attr('aria-expanded') == 'false'){
                $(this).attr('aria-expanded','true');
                $(this).siblings().toggle('fast');
            }
            else{
                $(this).attr('aria-expanded','false');
                $(this).siblings().toggle('fast');
            }
            $(this).closest('li').siblings().find(".collapse").css("display", "none");
            $(this).closest('li').siblings().find(".accordion-heading").attr("aria-expanded","false");
                $(this).siblings().find('.collapse').css("display","block");
                    if($(this).closest(".region-link").find(".collapse").length === 1){
                        var offset = $(this).offset();
                        $("html, body").animate({
                            scrollTop :offset.top
                        });
                    }
        });
        if(window.innerWidth < 767){
            $('.desktop-linkfarm-table').attr("style","display:none");
        }
  }
   /*link farm table code ends here */
});