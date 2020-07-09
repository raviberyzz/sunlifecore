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
	if ($('.banner-section').parents('.cmp-container').parents().parents().hasClass('col-sm-8')) {
		var containerHeight = $('.banner-section').parents('.cmp-container').parents().parents().next().children().children().children()[0].clientHeight;
        var backGroundSize = "auto"+" "+ containerHeight+"px";
		$('.col-sm-8 .banner-section .image-text-wrapper .desk-img ').css({
			"background-size": backGroundSize,
			"height": containerHeight
		});		
	}
});