$(document).ready(function () {
    //if mac then add class to body for specific targetting
    if(navigator.userAgent.indexOf('Mac') > 0)
        $('body').addClass('mac-os-target');   
    //for footer
	if ($(window).width() < 768) {
		$('#mainfooter .social-link-icon-wrapper').css({ "padding": "0" });
	} else {
		var teaser_height = $('#mainfooter .teaser').height();
		$('#mainfooter .social-link-icon-wrapper').css({ "padding": "16px 11px 16px 0" });
		$('#mainfooter .social-link-icon-wrapper').height(teaser_height);
	}
	$(window).resize(function () {
		if ($(window).width() < 768) {
			$('#mainfooter .social-link-icon-wrapper').css({ "padding": "0" });
		} else {
			var teaser_height = $('#mainfooter .teaser').height();
			$('#mainfooter .social-link-icon-wrapper').css({ "padding": "16px 11px 16px 0" });
			$('#mainfooter .social-link-icon-wrapper').height(teaser_height);
		}
	});

	// for equal height
	var eachHeight = 0;
	var eachComponent = $('.cta-content-icon-wrapper .container-component');
	eachComponent.each(function () {
		eachHeight = eachHeight > $(this).height() ? eachHeight : $(this).height();

	});

	eachComponent.each(function () {
		$(this).height(eachHeight);
	});

	//for tool card
	var link_height = 0;
	var tool_card_link = $('.tool-card-wrapper .cmp-container').children().find('.cmp-text');
	tool_card_link.each(function (index) {
		if (index % 2 == 0) {

			link_height = link_height > $(this).height() ? link_height : $(this).height();
		}

	});
	tool_card_link.each(function (index) {
		if (index % 2 == 0) {
			$(this).height(link_height);
		}

	});

	var taeser_height = 0;
	var tool_card_teaser = $('.tool-card-wrapper .cmp-container').find('.teaser');
	tool_card_teaser.each(function (index) {
		taeser_height = taeser_height > $(this).height() ? taeser_height : $(this).height();
	});
	tool_card_teaser.each(function (index) {
		$(this).height(taeser_height);

	});

	var taeser_height = 0;
	var tool_card_teaser = $('.tool-card-wrapper .cmp-container').find('.teaser');
	tool_card_teaser.each(function (index) {
		taeser_height = taeser_height > $(this).height() ? taeser_height : $(this).height();
	});
	tool_card_teaser.each(function (index) {
		$(this).height(taeser_height);

	});
/**
 * Commenting the implementation as we are setting the height using flex container
 */
	//for editorial article
    // var editorial_teaser_height=0;
	// var editorial_teaser = $('.editorial-articles-wrapper').find('.teaser');

    // editorail_height();

    // function editorail_height()
    // {
    //     if ($(window).width() > 767)
    //     {
    //         editorial_teaser.each(function (index) {
    //         editorial_teaser_height = editorial_teaser_height > $(this).height() ? editorial_teaser_height : $(this).height();
    //         });
    //         editorial_teaser.each(function (index) {
    //         $(this).height(editorial_teaser_height);
    //         });
    //     }
    //     else
    //     {
    //          editorial_teaser.each(function (index) {
    //         $(this).css('height','auto');
    //         });
    //     }

    // }
/**
 * End of the change
 */
	//for CTA_Height
	// var cta_height = 0;
	// if (($(window).width() > 767)) {
	// 	$('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background,.cta-three-column-wrapper').each(function () {
	// 		cta_height = $(this).parents('.layout-container').height();
	// 		$(this).children().height(cta_height);
	// 	});
	// 	var counter = 0;
	// 	$('.yellow-icon-white-background').each(function () {
	// 		if (counter === 0) {
	// 			cta_height = $(this).parents('.layout-container').height();
	// 		} else {
	// 			cta_height = $(this).parents('.layout-container').height() - 2;
	// 		}
	// 		$(this).children().height(cta_height);
	// 		counter++;
	// 	});

	// }
	// else {
	// 	$('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background, .yellow-icon-white-background,.cta-three-column-wrapper').each(function () {
	// 		$(this).children().css('height', 'auto');
	// 	});
	// }

	var cta_icon_text = $('.no-padding .yellow-icon-white-background').children().find('.icon-text');
    function cta_height(){
         var ctaHeight = 0;
         cta_icon_text.each(function (index) {
            $(this).css('height','fit-content');
            ctaHeight = ctaHeight > $(this).outerHeight() ? ctaHeight : $(this).outerHeight();
		});
		cta_icon_text.each(function (index) {
			$(this).outerHeight(ctaHeight);
		});
    }
	//CTA Padding FIX.
    cta_height();
	cta_padding_fix();

	$(window).resize(function () {
	   cta_padding_fix();
       cta_height();

	});

	function cta_padding_fix() {
		if (($(window).width() > 767)) {
			if ($('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background, .yellow-icon-white-background, .cta-three-column-wrapper').parents('.layout-container').hasClass('no-padding')) {
				
				$('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background, .yellow-icon-white-background, .cta-three-column-wrapper').parents('.layout-container').children().children().css('padding', '');
			}
			else {
				$('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background, .yellow-icon-white-background, .cta-three-column-wrapper').parents('.layout-container').children().children().css('padding', ' 0px 10px 0px 10px');
				$('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background, .yellow-icon-white-background, .cta-three-column-wrapper').closest('.layout-container').children().children().first().css('padding-left', '0');
				$('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background, .yellow-icon-white-background, .cta-three-column-wrapper').closest('.layout-container').children().children().last().css('padding-right', '0');
			}
		}
		else {
			$('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background, .yellow-icon-white-background, .cta-three-column-wrapper').parents('.layout-container').children().children().css('padding', '0');
			$('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background, .yellow-icon-white-background, .cta-three-column-wrapper').parents('.layout-container').children().children().last().children().css('margin-bottom', '0');
		}

	}

	 //Tool card padding fix.
	 tool_card_padding_fix();

	 $(window).resize(function () {
		 tool_card_padding_fix();
	 });
 
	 function tool_card_padding_fix() {
		 if (($(window).width() > 1024)) {
			 if ($('.tool-card-wrapper').parents('.layout-container').hasClass('no-padding')) {
			 }
			 else {
				 $('.tool-card-wrapper').parents('.layout-container').children().children().css('padding', ' 0px 10px 0px 10px');
				 $('.tool-card-wrapper').parents('.layout-container').children().children().first().css('padding-left', '0');
				 $('.tool-card-wrapper').parents('.layout-container').children().children().last().css('padding-right', '0');
			 }
		 }
		 else {
			 $('.tool-card-wrapper').parents('.layout-container').children().children().css('padding', '0px 10px');
			 //$('.tool-card-wrapper').parents('.layout-container').children().children().last().children().css('margin-bottom', '0');
		 }
 
 
	 }
 
	
    //subscribe_legal_text

	subscribe_legal_text();
	$(window).resize(function () {
		subscribe_legal_text();
	});

	function subscribe_legal_text()
    {
        if (($(window).width() < 1025))
        {
            $('.subscribe-main-content-wrapper .legal-text').parents('.text').css('width','100%');
        }
        else
        {
			$('.subscribe-main-content-wrapper .legal-text').parents('.text').css('width','66.66%');
        }

    }
           
    //for bright solution cta 
	$('.cta-home-wrapper').addClass('clearfix');  
	
	// adding span class to parent
		$('h2 span, h3 span, h4 span, h5 span, h6 span').each(function(index,value){
		var spanClass = $( this ).attr('class');
		if (spanClass === 'heading-6' || spanClass === 'heading-5' || spanClass === 'heading-4' || spanClass === 'heading-3' || spanClass === 'heading-2') {
			$( this ).closest(':header').attr('class', spanClass);
		}
		});

	//fix for legal text line-height issue on span element
	if($('.legal-text')){
		$('span.legal-text').each(function(){
		  $(this).parent().addClass($(this).attr('class'));
		})
	}		
});