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
});