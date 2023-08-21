$(document).ready(function () {
	$('.site-level-notification .close-div').click(function() {
        var notification = $(this).closest(".site-level-notification");
		if ($(window).width() <= 1024) {
            var flag = 0;
            var marginFlag = true;
            $('.notification').each(function(index,value){
                if(flag == 1){
					$(this).css('top', $(this).position().top - notification.outerHeight());
                    if(marginFlag==true){
						$(this).css('margin-top', 0);
                        marginFlag=false;
                    }
                }
                if(notification[0] == value){
					flag =1 ;
                }
            });
            var headerTop = $('.slf-header-wrapper .slf-mobile-header-wrapper').position().top;
            var notificationHeight = $(this).closest(".site-level-notification").outerHeight();
			$('.root > .aem-Grid > *:not(:first-child)').css("top", headerTop-notificationHeight);
			$('.slf-header-wrapper .slf-mobile-header-wrapper').css('top', headerTop-notificationHeight);
		}
		var siteNotification = $(this).closest(".site-level-notification");
        var siteNotificationDiv = $(siteNotification).find(".cmp-container");
        var siteNotificationId = siteNotificationDiv.attr('id');
		createCookie("pageNotification-"+siteNotificationId,"true",1,false);
        $(siteNotification).css('display', 'none');
		$(siteNotification).removeClass('notification');
    });
	$('.site-level-notification .close-div').keyup(function (event) {
		if (event.keyCode == 13) {
			var siteNotification = $(this).closest(".site-level-notification");
	        var siteNotificationDiv = $(siteNotification).find(".cmp-container");
	        var siteNotificationId = siteNotificationDiv.attr('id');
			createCookie("pageNotification-"+siteNotificationId,"true",1,false);
	        $(siteNotification).css('display', 'none');
			$(siteNotification).removeClass('notification');
		}
	});

	//Last Child margin issue handle
	
    if ($('.site-level-notification').length > 0) {
		var siteLvlNotification= $('.site-level-notification').filter(function () { return !$(this).hasClass('container-component') });
        siteLvlNotification.last().css('margin-bottom','0');
	}
});