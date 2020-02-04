$(document).ready(function () {
	$('footer .accordion-heading').click(function () {
		$(this).siblings('.list-div').toggle('collapse');
		$(this).parent().parent().parent().siblings().children().children().children('.list-div').css('display', 'none');
		$(this).parent().parent().parent().siblings().children().children().children('.list-div').siblings('h3').attr('aria-expanded', false);
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
		strLink1 = strLink.localeCompare(pathName);
		if(!strLink1){
			$(this).parent().addClass("selected");
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