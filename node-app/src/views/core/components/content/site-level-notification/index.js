$(document).ready(function () {
	$('.site-level-notification .close-div').click(function () {
		$('.site-level-notification').css('display', 'none');
	});
	$('.site-level-notification .close-div').keyup(function (event) {
		if (event.keyCode == 13) {
			$('.site-level-notification').css('display', 'none');
		}
	});
});