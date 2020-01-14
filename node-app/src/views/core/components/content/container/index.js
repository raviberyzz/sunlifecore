$(document).ready(function () {
	$('.site-level-notification').prepend('<i class="fa fa-close"></i>');
	$('.site-level-notification .fa-close').click(function () {
		$('.site-level-notification').css('display', 'none');
	});
});