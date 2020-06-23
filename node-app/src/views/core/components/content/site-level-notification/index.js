$(document).ready(function () {
	$('.site-level-notification .close-div').click(function() {
		if ($(window).width() <= 1024) {
			$('.root > .aem-Grid > *:not(:first-child)').css("top", "0");
			$('.slf-header-wrapper .slf-mobile-header-wrapper').css('top', "0");
		}
		var siteNotification = $(this).closest(".site-level-notification");
        var siteNotificationDiv = $(siteNotification).find(".cmp-container");
        var siteNotificationId = siteNotificationDiv.attr('id');
		createCookie("pageNotification-"+siteNotificationId,"true",1,false);
        $(siteNotification).css('display', 'none');
    });
	$('.site-level-notification .close-div').keyup(function (event) {
		if (event.keyCode == 13) {
			var siteNotification = $(this).closest(".site-level-notification");
	        var siteNotificationDiv = $(siteNotification).find(".cmp-container");
	        var siteNotificationId = siteNotificationDiv.attr('id');
			createCookie("pageNotification-"+siteNotificationId,"true",1,false);
	        $(siteNotification).css('display', 'none');
		}
	});
});