$(document).ready(function () {  
	//for footer
	if ( $('#mainfooter .teaser').length ==0 ) {
		if ($(window).width() < 768) {
			$('#mainfooter .social-link-icon-wrapper').css({ "padding": "0" });
		} else {
			var image_height = $('#mainfooter .image').height();
			$('#mainfooter .social-link-icon-wrapper').css({ "padding": "16px 8px 16px 0" });
			$('#mainfooter .social-link-icon-wrapper').height(image_height);
		}
		$(window).resize(function () {
			if ($(window).width() < 768) {
				$('#mainfooter .social-link-icon-wrapper').css({ "padding": "0" });
			} else {
				var image_height = $('#mainfooter .image').height();
				$('#mainfooter .social-link-icon-wrapper').css({ "padding": "16px 8px 16px 0" });
				$('#mainfooter .social-link-icon-wrapper').height(image_height);
			}
		});

	}

	//For cta height

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