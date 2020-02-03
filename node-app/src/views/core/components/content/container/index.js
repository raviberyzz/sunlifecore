$(document).ready(function () {
	//for footer
	var teaser_height = $('footer .teaser').height();
	$('footer .social-link-icon-wrapper').height(teaser_height);

	//for footer
	var teaser_height = $('footer .teaser').height();
	$('footer .social-link-icon-wrapper').height(teaser_height);

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
	var tool_card_link = $('.tool-card-wrapper .cmp-container .aem-Grid--default--3').children().find('.cmp-text');
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
	var tool_card_teaser = $('.tool-card-wrapper .cmp-container .aem-Grid--default--3').find('.teaser');
	tool_card_teaser.each(function (index) {
		taeser_height = taeser_height > $(this).height() ? taeser_height : $(this).height();
	});
	tool_card_teaser.each(function (index) {
		$(this).height(taeser_height);

	});

	//for editorial article
	var editorial_teaser=$('.editorial-articles-wrapper').find('.teaser');
    editorial_teaser.each(function (index) {
		taeser_height= taeser_height > $(this).height() ?taeser_height : $(this).height();
	});
    editorial_teaser.each(function (index) {
            $(this).height(taeser_height);
       
	});

	//for CTA_Height
	var cta_height=0;
// 	$('.yellow-icon-blue-background, .blue-icon-yellow-background').each(function(){
// 	 cta_height=$(this).parents('.layout-container').height();
// 	 $(this).children().height(cta_height-80);
//  });

// $('.yellow-icon-white-background').each(function(){
// 	  cta_height=$(this).parents('.layout-container').height();
// 	 $(this).children().height(cta_height-80);
//  });

// 	 var cta_icon_text=$('.no-padding .yellow-icon-white-background').children().find('.icon-text');
//     cta_icon_text.each(function (index) {
// 		taeser_height = taeser_height > $(this).height() ? taeser_height : $(this).height();
// 	});
// 	cta_icon_text.each(function (index) {
// 		$(this).height(taeser_height);

// 	});


	//for CTA_Height
    var cta_height=0;
		$('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background').each(function(){
		 cta_height=$(this).parents('.layout-container').height();
		 $(this).children().height(cta_height);
	 });
	var counter = 0;
    $('.yellow-icon-white-background').each(function(){
        if (counter === 0) {
			cta_height=$(this).parents('.layout-container').height() ;
        } else {
			cta_height=$(this).parents('.layout-container').height() - 2;
        }
        $(this).children().height(cta_height);
        counter ++;
	 });

    var cta_icon_text=$('.no-padding .yellow-icon-white-background').children().find('.icon-text');
    cta_icon_text.each(function (index) {
		taeser_height = taeser_height > $(this).height() ? taeser_height : $(this).height();
	});
	cta_icon_text.each(function (index) {
		$(this).height(taeser_height);

	});

	//CTA Padding FIX.
	if ($('.yellow-icon-blue-background, .yellow-icon-grey-background, .blue-icon-yellow-background, .yellow-icon-white-background').parents('.layout-container').hasClass('no-padding'))
    {
    }
    else
    {
        $('.yellow-icon-blue-background').parents('.layout-container').children().children().first().css('padding-left','0');
        $('.yellow-icon-blue-background').parents('.layout-container').children().children().last().css('padding-right','0');
    }


});