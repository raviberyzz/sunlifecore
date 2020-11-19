$(document).ready(function () {
	moment.defineLocale('fr', {
		weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
		weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
		weekdaysMin: 'di_lu_ma_me_je_ve_sa'.split('_'),
		weekdaysParseExact: true,
		longDateFormat: {
			LT: 'HH:mm',
			LTS: 'HH:mm:ss',
			L: 'DD/MM/YYYY',
			LL: 'D MMMM YYYY',
			LLL: 'D MMMM YYYY HH:mm',
			LLLL: 'dddd D MMMM YYYY HH:mm',
		},
		calendar: {
			sameDay: '[Aujourd’hui à] LT',
			nextDay: '[Demain à] LT',
			nextWeek: 'dddd [à] LT',
			lastDay: '[Hier à] LT',
			lastWeek: 'dddd [dernier à] LT',
			sameElse: 'L',
		},
		relativeTime: {
			future: 'dans %s',
			past: 'il y a %s',
			s: 'quelques secondes',
			ss: '%d secondes',
			m: 'une minute',
			mm: '%d minutes',
			h: 'une heure',
			hh: '%d heures',
			d: 'un jour',
			dd: '%d jours',
			w: 'une semaine',
			ww: '%d semaines',
			M: 'un mois',
			MM: '%d mois',
			y: 'un an',
			yy: '%d ans',
		}
	});

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
		$('.time-widget form .dropdown .cmp-form-options__field--drop-down').on('change', function () {
			var lang = $('html').attr('lang') == "fr-CA" ? "fr" : "en";
			moment.locale(lang);
			var todate = moment(new Date());
			var timeVal = $(this).val();
			$('#timeVal').val(todate.tz(timeVal).format('dddd h:mm a'));
			/* time analytics starts here */
			let selCountry = $('.time-widget select#select1 option:selected').text();
			utag.link({
				ev_type: 'other',
				ev_action: 'clk',
				ev_title: 'time-widget',
				ev_data_one: selCountry // the value that populates this variable is the country selected
			});
			/* time analytics ends here */
		})
	}
	// time widget accessibility
	$('.time-widget form').append('<button type="SUBMIT" class="cmp-form-button" style="display:none">Find</button>');

	//breadcrumb margin-bottom fix for non-responsive pages
	/*if($('.title-wrapper-blue-yellow-rings')){
		$('.breadcrumb-wrapper-cool-blue').css('margin-bottom','0!important');
	}*/

	var openAccordion=false;
	$(".html-component .company-summary .accordion .head").click(function(){
        openAccordion = $(this).next().is(':visible');
        $(this).siblings().not("h3").css("display","none");
        if(openAccordion){
            $(this).next().hide();
        }
        else{
			$(this).next().show();
        }
    })
});