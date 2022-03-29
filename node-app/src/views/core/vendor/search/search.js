//Configure a search endpoint.
Coveo.SearchEndpoint.configureCloudV2Endpoint('', searchConfig.token, searchConfig.restUri);
	
document.addEventListener('DOMContentLoaded', function () {
	//Search body label
	const searchBody = document.querySelector('#search');
	const searchBoxDesktop = document.querySelector('#search-box-desktop');
	const searchBoxMobile = document.querySelector('#search-box-mobile');

	// Initialize a Searchbox component. When in the main search page, this is done externally.
	if ( searchBody  ) {
		Coveo.init( searchBody, {
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