$(document).ready(function(){
    $('.accordion .cmp-accordion__header').click(function(){
        if($(this).siblings('.accordion .cmp-accordion__panel').hasClass('in')){
            $(this).find('.cmp-accordion__icon').attr('aria-expanded',false);
            $(this).siblings('.accordion .cmp-accordion__panel').removeClass('in');
        }
        else{     
            $('.accordion .cmp-accordion__panel').removeClass('in');
            $('.accordion .cmp-accordion__icon').attr('aria-expanded',false);
            $(this).siblings('.accordion .cmp-accordion__panel').addClass('in');
            $(this).find('.cmp-accordion__icon').attr('aria-expanded',true);
        }
    });
    $('.expand-collapse .cmp-accordion__header').click(function(){
        if($(this).siblings('.expand-collapse .cmp-accordion__panel').hasClass('in')){
            $(this).find('.cmp-accordion__icon').attr('aria-expanded',false);
            $(this).siblings('.expand-collapse .cmp-accordion__panel').removeClass('in');
        }
        else{     
            $(this).siblings('.expand-collapse .cmp-accordion__panel').addClass('in');
            $(this).find('.cmp-accordion__icon').attr('aria-expanded',true);
        }
    });
    var accLength=$('.accordion .cmp-accordion__item').length;
    var acc=$('.accordion .cmp-accordion__item');
    if($('.accordion').hasClass('first-open')){
        if(accLength>1){
            var firstAcc=acc[0];
            $(firstAcc).find('.cmp-accordion__panel').addClass('in');
            $(firstAcc).find('.cmp-accordion__icon').attr('aria-expanded',true);
        }
    }
});