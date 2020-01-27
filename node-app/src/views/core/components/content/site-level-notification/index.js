$(document).ready(function () {
	$('.site-level-notification .fa-close').click(function () {
		$('.site-level-notification').css('display', 'none');
	});
	$('.site-level-notification .fa-close').keyup(function (event) {
		if (event.keyCode == 13) {
			$('.site-level-notification').css('display', 'none');
		}
	});
});