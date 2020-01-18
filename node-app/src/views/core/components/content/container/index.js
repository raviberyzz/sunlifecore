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
	 var teaser_height=$('footer .teaser').height();
	    $('footer .social-link-icon-wrapper').height(teaser_height); 

});