/*search-box/search-box.js*/
$(document).on("click", '.magic-box-input', function(e){
	$('#search-box-desktop :input').on('keydown', function (e) {
	  if (e.key === 'Enter' || e.keyCode === 13) {
		  if ($('#sun-search').hasClass('in')) {
					 $('#sun-search').removeClass('in');
					 $("#search-btn").attr('aria-expanded', 'false');
				 }
	   }
   });
});
 
$(document).on("click", '.magic-box-input', function(e){  
	   $('#search-box-desktop .CoveoSearchButton.coveo-accessible-button').on('click', function(e){
		   if ($('#sun-search').hasClass('in')) {
					 $('#sun-search').removeClass('in');
					 $("#search-btn").attr('aria-expanded', 'false');
				 }
	   });
});

$(document).on("click", '.magic-box-input', function(e){  
   $('#search-box-mobile :input').on('keydown', function (e) {
	   if (e.key === 'Enter' || e.keyCode === 13) {
		 $('.hamburger-menu-wrapper').removeClass('active').addClass('inactive');
			   $('.offcanvas-overlay').removeClass('active');
			   $('.container').css({ 'margin-left': '0px' });
			   $('body').removeClass('overflow-hidden');
			   $('.slf-mobile-header-wrapper').css({ 'position': 'fixed' });
			   $('#hamburgerMenu button').attr("aria-expanded", "false");
			   $('#hamburgerMenu button').focus();
	   }
   });
});