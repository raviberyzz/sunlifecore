$(document).ready(function () {
	//for footer
	if ($('#mainfooter .teaser').length == 0) {
		if ($(window).width() < 768) {
			$('#mainfooter .social-link-icon-wrapper').css({ "padding": "0" });
		} else {
			var image_height = $('#mainfooter .image').height();
			$('#mainfooter .social-link-icon-wrapper').css({ "padding": "16px 11px 16px 0" });
			$('#mainfooter .social-link-icon-wrapper').height(image_height);
		}
		$(window).resize(function () {
			if ($(window).width() < 768) {
				$('#mainfooter .social-link-icon-wrapper').css({ "padding": "0" });
			} else {
				var image_height = $('#mainfooter .image').height();
				$('#mainfooter .social-link-icon-wrapper').css({ "padding": "16px 11px 16px 0" });
				$('#mainfooter .social-link-icon-wrapper').height(image_height);
			}
		});

	}

	// What time is it widget logic
	if ($('.time-widget')) {
		$('.time-widget form .dropdown .cmp-form-options__field--drop-down').on('change', function(){
			var todate = moment(new Date());
			var timeVal = $(this).val();
			$('#timeVal').val(todate.tz(timeVal).format('dddd h:mm a'));
			/* time analytics starts here */
			let selCountry=$('.time-widget select#select1 option:selected').text();
			utag.link({
				ev_type: 'other',
				ev_action: 'clk',
				ev_title: 'time-widget',
				ev_data_one: selCountry // the value that populates this variable is the country selected
			});			
			/* time analytics ends here */
		})
	}
});