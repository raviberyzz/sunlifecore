$(document).ready(function () {
	//for footer
	if ($(window).width() < 768) {
		$('footer .social-link-icon-wrapper').css({ "padding": "0" });
	} else {
		var teaser_height = $('footer .teaser').height();
		$('footer .social-link-icon-wrapper').css({ "padding": "16px 15px 16px 0" });
		$('footer .social-link-icon-wrapper').height(teaser_height);
	}
	$(window).resize(function () {
		if ($(window).width() < 768) {
			$('footer .social-link-icon-wrapper').css({ "padding": "0" });
		} else {
			var teaser_height = $('footer .teaser').height();
			$('footer .social-link-icon-wrapper').css({ "padding": "16px 15px 16px 0" });
			$('footer .social-link-icon-wrapper').height(teaser_height);
		}
	});

	// for equal height
	var eachHeight = 0;
	var eachComponent = $('.cta-content-icon-wrapper .container-component');
	eachComponent.each(function () {
		eachHeight = eachHeight > $(this).height() ? eachHeight : $(this).height();

	});

	eachComponent.each(function () {
		$(this).height(eachHeight);
	});

	//for tool card
	var link_height = 0;
	var tool_card_link = $('.tool-card-wrapper .cmp-container').children().find('.cmp-text');
	tool_card_link.each(function (index) {
		if (index % 2 == 0) {

			link_height = link_height > $(this).height() ? link_height : $(this).height();
		}

	});
	tool_card_link.each(function (index) {
		if (index % 2 == 0) {
			$(this).height(link_height);
		}

	});

	var taeser_height = 0;
	var tool_card_teaser = $('.tool-card-wrapper .cmp-container').find('.teaser');
	tool_card_teaser.each(function (index) {
		taeser_height = taeser_height > $(this).height() ? taeser_height : $(this).height();
	});
	tool_card_teaser.each(function (index) {
		$(this).height(taeser_height);

	});

	//for editorial article
	var editorial_teaser = $('.editorial-articles-wrapper').find('.teaser');
	editorial_teaser.each(function (index) {
		taeser_height = taeser_height > $(this).height() ? taeser_height : $(this).height();
	});
	editorial_teaser.each(function (index) {
		$(this).height(taeser_height);

	});

	//for CTA_Height
	var cta_height = 0;
	if (($(window).width() > 767)) {
		$('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background').each(function () {
			cta_height = $(this).parents('.layout-container').height();
			$(this).children().height(cta_height);
		});
		var counter = 0;
		$('.yellow-icon-white-background').each(function () {
			if (counter === 0) {
				cta_height = $(this).parents('.layout-container').height();
			} else {
				cta_height = $(this).parents('.layout-container').height() - 2;
			}
			$(this).children().height(cta_height);
			counter++;
		});

	}
	else {
		$('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background, .yellow-icon-white-background').each(function () {
			$(this).children().css('height', 'auto');
		});
	}

	var cta_icon_text = $('.no-padding .yellow-icon-white-background').children().find('.icon-text');
	cta_icon_text.each(function (index) {
		taeser_height = taeser_height > $(this).height() ? taeser_height : $(this).height();
	});
	cta_icon_text.each(function (index) {
		$(this).height(taeser_height);

	});

	//CTA Padding FIX.

	cta_padding_fix();

	$(window).resize(function () {
		cta_padding_fix();
	});

	function cta_padding_fix() {
		if (($(window).width() > 767)) {
			if ($('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background, .yellow-icon-white-background').parents('.layout-container').hasClass('no-padding')) {
			}
			else {
				$('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background, .yellow-icon-white-background').parents('.layout-container').children().children().css('padding', ' 0px 10px 0px 10px');
				$('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background, .yellow-icon-white-background').parents('.layout-container').children().children().first().css('padding-left', '0');
				$('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background, .yellow-icon-white-background').parents('.layout-container').children().children().last().css('padding-right', '0');
			}
		}
		else {
			$('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background, .yellow-icon-white-background').parents('.layout-container').children().children().css('padding', '0');
			$('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background, .yellow-icon-white-background').parents('.layout-container').children().children().last().children().css('margin-bottom', '0');
		}

	}

	//Home CTA Button

	if (($(window).width() < 768)) {
		$('.no-padding .yellow-icon-white-background form .cmp-form-button').html('<span class="fa fa-chevron-right"></span>');
	}

});