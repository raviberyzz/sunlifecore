$(document).ready(function () {
	$('#mainfooter .bottom-footer-section .text h3').addClass('accordion-heading');
	$('#mainfooter .bottom-footer-section .text h3').attr('aria-expanded','false');
    $('#mainfooter .bottom-footer-section .text p').addClass('collapse list-div');

	$('#mainfooter .text .accordion-heading').click(function () {
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

});