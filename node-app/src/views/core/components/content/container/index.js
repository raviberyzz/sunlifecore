$(document).ready(function () {
	$('.site-level-notification').prepend('<i class="fa fa-close" tabindex="0"></i>');
	$('.site-level-notification .fa-close').click(function () {
		$('.site-level-notification').css('display', 'none');
	});
	$('.site-level-notification .fa-close').keyup(function (event) {
		if (event.keyCode == 13) {
			$('.site-level-notification').css('display', 'none');
		}
	});

	//for footer
	var teaser_height = $('footer .teaser').height();
	$('footer .social-link-icon-wrapper').height(teaser_height);

	//for footer
	var teaser_height = $('footer .teaser').height();
	$('footer .social-link-icon-wrapper').height(teaser_height);

	// for equal height
	var maxheight = 0;
	var iconText = $('.cta-content-icon-wrapper .container-component').find('.icon-text');
	iconText.each(function () {
		maxheight = maxheight > $(this).height() ? maxheight : $(this).height();

	});
	iconText.each(function () {
		$(this).height(maxheight);
	});

	var eachHeight = 0;
	var eachComponent = $('.cta-content-icon-wrapper .container-component');
	eachComponent.each(function () {
		eachHeight = eachHeight > $(this).height() ? eachHeight : $(this).height();

	});

	eachComponent.each(function () {
		$(this).height(eachHeight);
	});
});