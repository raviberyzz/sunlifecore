$(document).ready(function () {
	if ($(window).width() < 768) {
		$(this).siblings(".banner-section .right-image-position .hide-in-editorial").insertAfter(".banner-section .right-image-position .right-item");
	} else {
		$(this).siblings(".banner-section .right-image-position .hide-in-editorial").insertBefore(".banner-section .right-image-position .right-item");
	}
	$(window).resize(function () {
		if ($(window).width() < 768) {
			$(this).siblings(".banner-section .right-image-position .hide-in-editorial").insertAfter(".banner-section .right-image-position .right-item");
		} else {
			$(this).siblings(".banner-section .right-image-position .hide-in-editorial").insertBefore(".banner-section .right-image-position .right-item");
		}
		if ($(window).width() > 767 && $('.same-signin-height').length > 0) {
			if($('.sign-in').length > 0) {
				var signInHeight = $('.sign-in').height();
				$('.same-signin-height').css({
					"height": signInHeight
				});
			}
		} else {
            $('.same-signin-height').css({
					"height": "inherit"
				});
        }
	});
	if ($(window).width() > 767 && $('.same-signin-height').length > 0) {
		if($('.sign-in').length > 0) {
			var signInHeight = $('.sign-in').height();
			$('.same-signin-height').css({
                "height": signInHeight
            });
		}
	} else {
		$('.same-signin-height').css({
				"height": "inherit"
			});
	}
});
