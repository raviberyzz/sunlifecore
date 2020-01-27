$(document).ready(function () {
	//for footer
	var teaser_height = $('footer .teaser').height();
	$('footer .social-link-icon-wrapper').height(teaser_height);

	//for footer
	var teaser_height = $('footer .teaser').height();
	$('footer .social-link-icon-wrapper').height(teaser_height);

	// for equal height
	var eachHeight = 0;
	var eachComponent = $('.cta-content-icon-wrapper .container-component');
	eachComponent.each(function () {
		eachHeight = eachHeight > $(this).height() ? eachHeight : $(this).height();

	});

	eachComponent.each(function () {
		$(this).height(eachHeight);
	});
});