document.addEventListener('DOMContentLoaded', function () {
	//Search body label
	const searchBody = document.querySelector('#search');
	const searchBoxDesktop = document.querySelector('#search-box-desktop');
	const searchBoxMobile = document.querySelector('#search-box-mobile');

	// Initialize a Searchbox component. When in the main search page, this is done externally.
	if (searchBody) {
		Coveo.init(searchBody, {
			Analytics: {
				searchHub: searchConfig.searchHub,
			},
			externalComponents: [
				searchBoxDesktop,
				searchBoxMobile
			]
		});
		Coveo.$$(searchBody).on(Coveo.InitializationEvents.afterInitialization, (args) => {
			searchBody.querySelector('.CoveoSearchbox .CoveoSearchButton').append(Coveo.$$('span', {
				className: 'coveo-search-button-label'
			}, Coveo.l("Search")).el);
		});
	} else {
		Coveo.initSearchbox(searchBoxDesktop, searchConfig.searchUrl, {
			Analytics: {
				searchHub: searchConfig.searchHub,
			},
		});
		Coveo.initSearchbox(searchBoxMobile, searchConfig.searchUrl, {
			Analytics: {
				searchHub: searchConfig.searchHub,
			},
		});
	}

	Coveo.$$(searchBoxDesktop).on(Coveo.InitializationEvents.afterInitialization, (args) => {
		searchBoxDesktop.querySelector('.CoveoSearchbox .CoveoSearchButton').append(Coveo.$$('span', {
			className: 'coveo-search-button-label'
		}, Coveo.l("Search")).el);
	});

	Coveo.$$(searchBoxMobile).on(Coveo.InitializationEvents.afterInitialization, (args) => {
		searchBoxMobile.querySelector('.CoveoSearchbox .CoveoSearchButton').append(Coveo.$$('span', {
			className: 'coveo-search-button-label'
		}, Coveo.l("Search")).el);
	});
})

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