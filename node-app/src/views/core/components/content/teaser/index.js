$(document).ready(function () {
	if ($(window).width() < 768) {
		$(".banner-section .right-image-position .hide-in-editorial").insertAfter(".banner-section .right-image-position .right-item");
	} else {
		$(".banner-section .right-image-position .hide-in-editorial").insertBefore(".banner-section .right-image-position .right-item");
	}
	$(window).resize(function () {
		if ($(window).width() < 768) {
			$(".banner-section .right-image-position .hide-in-editorial").insertAfter(".banner-section .right-image-position .right-item");
		} else {
			$(".banner-section .right-image-position .hide-in-editorial").insertBefore(".banner-section .right-image-position .right-item");
		}
	});
});