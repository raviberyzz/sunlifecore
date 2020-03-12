$(document).ready(function () {
	$('footer .accordion-heading').click(function () {
		$(this).siblings('.list-div').toggle('collapse');
		$(this).closest('.col-xs-12').siblings().find('.list-div').css('display', 'none');
        $(this).closest('.col-xs-12').siblings().find('.accordion-heading').attr('aria-expanded', false);
		$(this).closest('.col-xs-12').parent().siblings().find('.list-div').css('display', 'none');
        $(this).closest('.col-xs-12').parent().siblings().find('.accordion-heading').attr('aria-expanded', false);
		if ($(this).attr('aria-expanded') == 'true') {
			$(this).attr('aria-expanded', false);
		}
		else if ($(this).attr('aria-expanded') == 'false') {
			$(this).attr('aria-expanded', true);
		}
	});
	var pathName= window.location.pathname;
	$('.editorial-nav-desktop-wrapper .list-div ul').find('a').each(function(){
		var strLink =  $(this).attr('href');
		var strLink1 = strLink.localeCompare(pathName);
		if(!strLink1){
			$(this).parent().addClass("selected");
		}
	})

	$('.left-nav-list-wrapper .list-div ul').find('a').each(function(){
		var strLink =  $(this).attr('href');
		var strLink1 = strLink.localeCompare(pathName);
		if(!strLink1){
			$(this).parent().addClass("selectedlink");
		}
	})


});

/* Node app js*/
// $(document).ready(function () {
	// $('.accordion-heading').click(function () {
	// 	$(this).siblings('.list-div').toggle('collapse');
	// 	$(this).parent().parent().siblings().children().children('.list-div').css('display', 'none');
	// 	$(this).parent().parent().siblings().children().children('.list-div').siblings('h3').attr('aria-expanded', false);
	// 	if ($(this).attr('aria-expanded') == 'true') {
	// 		$(this).attr('aria-expanded', false);
	// 	}
	// 	else if ($(this).attr('aria-expanded') == 'false') {
	// 		$(this).attr('aria-expanded', true);
	// 	}
	// });
// });