$(document).ready(function () {
    $('.right-navigation-wrapper').each(function (index) {
        var rightRailContainer = $(this).children();
        if(index != 0) {
            $(this).css('margin-top','24px');
        }
        $(this).find('.aem-GridColumn.aem-GridColumn--default--12').removeClass('aem-GridColumn aem-GridColumn--default--12')
        if (rightRailContainer.hasClass('cmp-container')) {
            var comp = rightRailContainer.children().filter(function () { return !$(this).hasClass('separator') });
            if(comp.length == 1) {
                comp.each(function () {
                    $(this).addClass("col-xs-12");
                });
            }else if(comp.length == 2 || comp.length == 4) {
                comp.each(function () {
                    $(this).addClass("col-xs-12 col-sm-6 col-md-12");
                });
            }else if(comp.length == 3 || comp.length == 6) {
                comp.each(function () {
                    $(this).addClass("col-xs-12 col-sm-4 col-md-12");
                });
            }else if(comp.length == 5) {
                comp.each(function (i) {
                    if(i<3) {
                        $(this).addClass("col-xs-12 col-sm-4 col-md-12");
                    }else {
                        $(this).addClass("col-xs-12 col-sm-6 col-md-12");
                    }
                });
            }
        }
    });
    function updateRightRailHeight() {
        $('.right-navigation-wrapper').each(function(i){
          /*  if (($(window).width() < 1025 && $(window).width() > 767)) {
                $(this).css('margin-top','0');
            } else if($(window).width() > 1025){
                if(i > 0 )  $(this).css('margin-top','24px');
            } */
            if (($(window).width() < 1025 && $(window).width() > 767)) {
                if(i == 0){ 
                    $(this).css('margin-top','24px');  
                } else {
                    $(this).css('margin-top','0');
                }
            } else if($(window).width() > 1025){
                    if(i > 0 ) {
                        $(this).css('margin-top','24px');
                    }   else if(i==0){
                            $(this).css('margin-top','0px');
                        }
            } 
            var rightRailContainer = $(this).children();
            if (rightRailContainer.hasClass('cmp-container')) {
                var comp = rightRailContainer.children().filter(function () { return !$(this).hasClass('separator') });
                if (($(window).width() < 1025 && $(window).width() > 767)) {
                    if(comp.length == 2) {
                        var ht = $(comp[0]).outerHeight() >= $(comp[1]).outerHeight() ? $(comp[0]).outerHeight() : $(comp[1]).outerHeight();
                        $(comp).outerHeight(ht);
                    }else if(comp.length == 3) {
                        var ht = 0;
                        $(comp).each(function(){
                            if(ht<=$(this).outerHeight()) {
                                ht = $(this).outerHeight();
                            }
                        });
                        $(comp).outerHeight(ht);
                    }else if(comp.length == 4) {
                        var ht = $(comp[0]).outerHeight() >= $(comp[1]).outerHeight() ? $(comp[0]).outerHeight() : $(comp[1]).outerHeight();
                        $(comp[0]).outerHeight(ht);
                        $(comp[1]).outerHeight(ht);
                        ht = $(comp[2]).outerHeight() >= $(comp[3]).outerHeight() ? $(comp[2]).outerHeight() : $(comp[3]).outerHeight();
                        $(comp[2]).outerHeight(ht);
                        $(comp[3]).outerHeight(ht);
                    }else if(comp.length == 5 || comp.length == 6) {
                        var ht = 0, ht1 =0;
                        $(comp).each(function(i){
                            if(i <3 && ht<=$(this).outerHeight()) {
                                ht = $(this).outerHeight();
                            }else if(i > 2 && ht1 <= $(this).outerHeight()) {
                                ht1 = $(this).outerHeight();
                            }
                        });
                        $(comp).each(function(i){
                            if(i<3) {
                                $(this).outerHeight(ht);
                            }else {
                                $(this).outerHeight(ht1);
                            }
                        });
                    }
                }else {
                    $(comp).outerHeight('auto');
                }
            }
        });
    }
    updateRightRailHeight();
    $(window).resize(updateRightRailHeight);
            /*

            //For legal text Height
            $('.right-navigation-wrapper form .legal-text').parent().css({ 'text-size': '14px', 'line-height': '18px' });

            if ($('.right-navigation-wrapper .cmp-container').children().first().hasClass('light-orange')) {

                $('.right-navigation-wrapper .cmp-container').children().first().css('border-top', 'none');
                $('.right-navigation-wrapper .cmp-container').children().first().css('border-bottom', 'none');
            }
            // for multiple experience fragments start
            comp.each(function () {
                if ($(this).hasClass('experiencefragment')) {
                    var currentElem = $(this).find('.light-orange');
                    if (currentElem.length == 1) {
                        var orangeBackground = $(this).find('.light-orange');
                        orangeBackground.removeClass('light-orange');
                        $(this).addClass('light-orange');
                        $(this).removeClass('col-sm-6');
                        $(this).addClass('col-sm-12');
                        $(this).next().removeClass('col-sm-6');
                        $(this).next().addClass('col-sm-12');
                    }
                }
            })
            // for multiple experience fragments end
           
        } // rightRails end  starts here
        */
 //search-result page

 $('.right-navigation-wrapper .html-component #search-result-banner-right').parents('.html-component').css('min-height', '0');
 $('.right-navigation-wrapper .html-component #search-result-banner-right').parents('.html-component').css('padding', '0');

});
