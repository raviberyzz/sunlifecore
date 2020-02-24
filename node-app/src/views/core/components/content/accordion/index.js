$(document).ready(function(){
    $('.accordion-container .cmp-accordion__header').click(function(){
        if($(this).siblings('.accordion-container .cmp-accordion__panel').hasClass('in')){
            $(this).find('.cmp-accordion__icon').attr('aria-expanded',false);
            $(this).siblings('.accordion-container .cmp-accordion__panel').removeClass('in');
        }
        else{     
            $('.accordion-container .cmp-accordion__panel').removeClass('in');
            $('.accordion-container .cmp-accordion__icon').attr('aria-expanded',false);
            $(this).siblings('.accordion-container .cmp-accordion__panel').addClass('in');
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
    /* For first open accordion */
    var accLength=$('.accordion-container .cmp-accordion__item').length;
    var acc=$('.accordion-container .cmp-accordion__item');
    if($('.accordion-container').hasClass('first-open')){
        if(accLength>1){
            var firstAcc=acc[0];
            $(firstAcc).find('.cmp-accordion__panel').addClass('in');
            $(firstAcc).find('.cmp-accordion__icon').attr('aria-expanded',true);
        }
    }
    
    /* for Link list */
    $('.cmp-accordion__panel .accordion-heading').click(function () {
		$(this).siblings('.list-div').toggle('collapse');
		$(this).parent().parent().parent().siblings().children().children().children('.list-div').css('display', 'none');
		$(this).parent().parent().parent().siblings().children().children().children('.list-div').siblings('h3').attr('aria-expanded', false);
		if ($(this).attr('aria-expanded') == 'true') {
			$(this).attr('aria-expanded', false);
		}
		else if ($(this).attr('aria-expanded') == 'false') {
			$(this).attr('aria-expanded', true);
		}
    });
});