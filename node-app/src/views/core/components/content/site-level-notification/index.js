$(document).ready(function () {
	$('.site-level-notification .close-div').click(function () {
		createCookie("pageNotification","true",1,false);
		$('.site-level-notification').css('display', 'none');
	});
	$('.site-level-notification .close-div').keyup(function (event) {
		if (event.keyCode == 13) {
			createCookie("pageNotification","true",1,false);
			$('.site-level-notification').css('display', 'none');
		}
	});
});