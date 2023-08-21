$(document).ready(function () {
    if(typeof ContextHub == "undefined"){
        bindRegionEvent();
    }
    else{
        setTimeout(bindRegionEvent, 3000);
    }

    function bindRegionEvent(){
        $('.desktop-region-language-menu-wrapper .content-region .nav-select').parent().addClass('in');
        $('.desktop-region-language-menu-wrapper .content-region .nav-select').parent().siblings('.accordion-heading').css('font-weight','700');
        $('.desktop-region-language-menu-wrapper .content-region .nav-select').parent().siblings('.accordion-heading').addClass('nav-heading');
        $('.desktop-region-language-menu-wrapper .content-region .nav-select').parent().siblings().attr('aria-expanded', 'true');
        $('.desktop-region-language-menu-wrapper .content-region .accordion-heading').click(function () {
            if ($(this).attr('aria-expanded') == 'false') {
                $(this).attr('aria-expanded', 'true');
                $(this).siblings().addClass('in');
            }
            else {
                $(this).attr('aria-expanded', 'false');
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
        /* mobile navigation code */
        $('.mobile-region-language-menu-wrapper .region-link .accordion-heading').click(function () {
            if ($(this).attr('aria-expanded') == 'false') {
                $(this).attr('aria-expanded', 'true');
                $(this).siblings().addClass('in');
            }
            else {
                $(this).attr('aria-expanded', 'false');
                $(this).siblings().removeClass('in');
            }
        });
        $('.desktop-region-language-menu-wrapper .slf-tab-region .slf-tab').click(function () {
            $(this).addClass('active').siblings().removeClass('active');
        });
        $('.region-present').siblings().css("display", "none");
        $('.language-present').siblings().css("display", "none");
        $(".mobile-header .first").click(function () {
            $('.mobile-header .first').addClass('active');
            $('.mobile-header .second').removeClass('active');
            $('.mobile-header .region-tab').css({ 'display': 'block' });
            $('.mobile-header .language-tab').css({ 'display': 'none' });
        });
        $(".mobile-header .second").click(function () {
            $('.mobile-header .first').removeClass('active');
            $('.mobile-header .second').addClass('active');
            $('.mobile-header .region-tab').css({ 'display': 'none' });
            $('.mobile-header .language-tab').css({ 'display': 'block' });
        });
        
        // No language present scenario starts here
        var languageNumber = $('.mobile-header .mobile-region-language-menu-wrapper .language-tab ul').children('li');
        if(languageNumber.length == 1){
            $('.mobile-header .mobile-region-language-menu-wrapper .slf-tab-region').css("display","none");
            $('.mobile-header .mobile-region-language-menu-wrapper .region-tab').prepend('<p>Regions</p>');
            $('.mobile-header .mobile-region-language-menu-wrapper .region-tab').children('p').css('padding','0 0 4px 16px');
            $('.mobile-header .mobile-region-language-menu-wrapper .region-tab').children('p').css('margin-bottom','8px');
            $('.mobile-header .mobile-region-language-menu-wrapper .region-tab').children('p').css('font-weight','700');
        }
        // No language present scenario ends here
    }
     /*link farm table code starts here */
     var linkFarm = $(".cmp-linkfarm-table");
     if (linkFarm.length) {
         /**** desktop logic start ****/
         // removing the class desktop-region-language-menu-wrapper to target link-farm-table
         $(".cmp-linkfarm-table .desktop-linkfarm-table").removeClass('desktop-region-language-menu-wrapper');
         // expanding the country list items by default in link-farm-table
         $('.cmp-linkfarm-table .desktop-linkfarm-table .slf-region .content-region .list-unstyled ').addClass('in');
         //removing the language section in link-farm-table
         $('.cmp-linkfarm-table .slf-language').remove();
         //removing the close button. 
         $('.cmp-linkfarm-table .cross-btn').remove();
         // removing the language section and expanding the link-farm-table to col-xs-12
         $('.cmp-linkfarm-table .slf-region').removeClass('col-xs-9').addClass('col-xs-12');
         /***** desktop logic end *****/
 
         //removing the mobile language region in desktop view
         $('.cmp-linkfarm-table .col-xs-12').removeClass("mobile-language-region");
         $('.cmp-linkfarm-table .go-back').remove();
        // $('.slf-tab-region').remove();
         $('.tab-content .tab-pane').addClass('active');
         $(".region-link").addClass("slf-accordion-arrow");
         // in mobile view expand the country links and scroll to the top of the page
         $('.cmp-linkfarm-table .tab-content .slf-accordion-arrow .accordion-heading').click(function () {
             /*if ($(this).attr('aria-expanded') == 'false') {
                 $(this).attr('aria-expanded', 'true');
                 $(this).siblings().toggle('fast');
             }
             else {
                 $(this).attr('aria-expanded', 'false');
                 $(this).siblings().toggle('fast');
             }*/
             $(this).closest('li').siblings().find(".collapse").removeClass("in");
             $(this).closest('li').siblings().find(".accordion-heading").attr("aria-expanded", "false");
             $(this).siblings().find('.collapse').css("display", "block");
             if ($(this).closest(".region-link").find(".collapse").length === 1) {
                 var offset = $(this).offset();
                 var headerHeight = $('.slf-mobile-header-wrapper').position().top + $('.slf-mobile-header-wrapper').height();
                 var scroll = offset.top - headerHeight;
                 $("html, body").animate({
                     scrollTop: scroll
                 });
             }
 
         });
             /*hiding the desktop link farm table for mobile view*/
             function resizing(){
                 if (window.innerWidth < 767) {
                     $('.cmp-linkfarm-table .desktop-linkfarm-table').attr("style", "display:none!important;");
                     $('.cmp-linkfarm-table .mobile-region-language-menu-wrapper').attr("style", "display:block;");
                 }else if(window.innerWidth > 767){
                     $('.cmp-linkfarm-table .desktop-linkfarm-table').attr("style", "display:block;");
                     $('.cmp-linkfarm-table .mobile-region-language-menu-wrapper').attr("style", "display:none;");
                 }
             }
                resizing();
             $(window).resize(resizing);
 
     }
     /*link farm table code ends here */

     //Link farm table accessibility

     /*$('.cmp-linkfarm-table .desktop-linkfarm-table .accordion-heading').removeAttr('href');
     $('.cmp-linkfarm-table .desktop-linkfarm-table .accordion-heading').removeAttr('aria-expanded');*/
     $('.cmp-linkfarm-table .desktop-linkfarm-table .accordion-heading').replaceWith(function() { 
        return '<span class="accordion-heading">' + this.innerHTML + '</span>'; 
    });
});