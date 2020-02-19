$(document).ready(function () {
	$('.editorial-nav-mobile-wrapper .cmp-form-button').addClass('fa fa-chevron-right');
		var pathName= window.location.pathname ;
		$('.editorial-nav-mobile-wrapper .cmp-form-options .cmp-form-options__field').find('option').each(function(){
		var strLink =  $(this).attr('value');
		var strLink1 = strLink.localeCompare(pathName);
		if(!strLink1){
			$(this).attr("selected","selected");
		}
	})
	$('.editorial-nav-mobile-wrapper .cmp-form-button').click(function(){
		var link_selected=$('.editorial-nav-mobile-wrapper .cmp-form-options .cmp-form-options__field--drop-down').val();
		window.location.href=link_selected;
		return false;
	});

	 //Sunscribe Pop Up
	 subscribe_popup_form();
	 $(window).resize(function () {
		 subscribe_popup_form();
	 });
 
	 function subscribe_popup_form(){
		 if ($(window).width() > 767)
		 {
			 $('.subscribe-popup-form-wrapper form .text').first().css('width','25%');
			 $('.subscribe-popup-form-wrapper form .text').last().css('width','50%');
		 }
		 else
		 {
			 $('.subscribe-popup-form-wrapper form .text').first().css('width','100%');
			 $('.subscribe-popup-form-wrapper form .text').last().css('width','100%');
		 }
	 }

	 //CTA Form
	cta_form();
	$(window).resize(function () {
		cta_form();
	});

   function cta_form()
   {
	   if ($(window).width() > 1024)
	   {
		   $('.cta-form-wrapper form  .cmp-form-button').removeClass('fa fa-chevron-right');
		   $('.cta-form-wrapper form .cmp-form-button').html($('.cta-form-wrapper form .cmp-form-button').val());
	   }
	   else
	   {
		   $('.cta-form-wrapper form .cmp-form-button').html('');
		   $('.cta-form-wrapper form  .cmp-form-button').addClass('fa fa-chevron-right');
	   }
   }
   //Home CTA Form
   home_cta_form();
   $(window).resize(function () {
	   home_cta_form();
   });
   
  function home_cta_form()
  {
	  if ($(window).width() > 767)
	  {
		  $('.home-cta-form-wrapper form  .cmp-form-button').removeClass('fa fa-chevron-right');
		  $('.home-cta-form-wrapper form .cmp-form-button').html($('.cta-form-wrapper form .cmp-form-button').val());
	  }
	  else
	  {
		  $('.home-cta-form-wrapper form .cmp-form-button').html('');
		  $('.home-cta-form-wrapper form  .cmp-form-button').addClass('fa fa-chevron-right');
	  }
  }

});
