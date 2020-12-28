$(document).ready(function () { 
    var cta_text = $('.no-padding .yellow-icon-white-background').children().find('.text:first-child');
    function cta_height(){
         var ctaHeight = 0;
         cta_text.each(function (index) {
            $(this).css('height','fit-content');
            ctaHeight = ctaHeight > $(this).outerHeight() ? ctaHeight : $(this).outerHeight();

	});
        cta_text.each(function (index) {
             $(this).outerHeight(ctaHeight);
	});
    }

     
    cta_height();
   

    $(window).resize(function () {
       cta_height();

    });
});