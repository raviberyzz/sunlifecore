$(document).ready(function () {
	$('footer .accordion-heading').click(function () {
		$(this).siblings('.list-div').toggle('collapse');
		$(this).parent().parent().siblings().children().children('.list-div').css('display', 'none');
		$(this).parent().parent().siblings().children().children('.list-div').siblings('h3').attr('aria-expanded', false);
		if ($(this).attr('aria-expanded') == 'true') {
			$(this).attr('aria-expanded', false);
		}
		else if ($(this).attr('aria-expanded') == 'false') {
			$(this).attr('aria-expanded', true);
		}
	});
});