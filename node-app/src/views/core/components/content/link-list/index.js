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
	// $('.links .accordion-heading').keyup(function (event) {
    //     if (event.keyCode == 13) {
	// 		if($(this).attr('aria-expanded')=='false'){
	// 		$(this).attr('aria-expanded','true');
	// 		$(this).siblings().css('display','block');
	// 		}
	// 		else{
	// 			$(this).attr('aria-expanded','false');
	// 			$(this).siblings().css('display','none');
	// 	}
	//   }
// 	});
// });