$(document).ready(function () { 
    var cta_icon_text = $('.no-padding .yellow-icon-white-background').children().find('.text:first-child');
    function cta_height(){
         var ctaHeight = 0;
         cta_icon_text.each(function (index) {
            $(this).css('height','fit-content');
            ctaHeight = ctaHeight > $(this).outerHeight() ? ctaHeight : $(this).outerHeight();

	});
        cta_icon_text.each(function (index) {
             $(this).outerHeight(ctaHeight);
	});
    }

     var cta_icon_texts = $('.no-padding .yellow-icon-white-background').children().find('.text:first-child').next();
    function cta_heights(){
         var ctaHeights = 0;
         cta_icon_texts.each(function (index) {
            $(this).css('height','fit-content');

            ctaHeights = ctaHeights > $(this).outerHeight() ? ctaHeights : $(this).outerHeight();


	});
        cta_icon_texts.each(function (index) {
           $(this).outerHeight(ctaHeights);

	});
    }
	//CTA Padding FIX.
    cta_height();
    cta_heights();


    $(window).resize(function () {
       cta_height();
       cta_heights();

    });
});