/*search/search.js*/
document.addEventListener('DOMContentLoaded', function () {
	//Search body label
	const searchBody = document.querySelector('#search');
	const searchBoxDesktop = document.querySelector('#search-box-desktop');
	const searchBoxMobile = document.querySelector('#search-box-mobile');

	const userContext = {
		'userlocale': document.querySelector("meta[property='og:locale']").getAttribute("content"),
		'userlanguage': Globalize.culture().englishName.replace(/\s(.*)/g, '')
	};


	// Initialize a Searchbox component. When in the main search page, this is done externally.
	if (searchBody) {
		Coveo.$$(searchBody).on(Coveo.InitializationEvents.afterInitialization, (args) => {
			//searchBody - label 
			searchBody.querySelector('.CoveoSearchbox .CoveoSearchButton').append(Coveo.$$('span', {
				className: 'coveo-search-button-label'
			}, Coveo.l("Search")).el);

			//searchBoxDesktop - label 
			searchBoxDesktop.querySelector('.CoveoSearchbox .CoveoSearchButton').append(Coveo.$$('span', {
				className: 'coveo-search-button-label'
			}, Coveo.l("Search")).el);
		});

		Coveo.init(searchBody, {
			Analytics: {
				searchHub: searchConfig.searchHub,
			},
			externalComponents: [
				searchBoxDesktop,
				searchBoxMobile
			]
		});

		Coveo.$$(searchBody).on(Coveo.QueryEvents.buildingQuery, function (e, args) {
			args.queryBuilder.addContext(userContext);
		});
	} else {
		//searchBoxDesktop - label 
		Coveo.$$(searchBoxDesktop).on(Coveo.InitializationEvents.afterInitialization, (args) => {
			searchBoxDesktop.querySelector('.CoveoSearchbox .CoveoSearchButton').append(Coveo.$$('span', {
				className: 'coveo-search-button-label'
			}, Coveo.l("Search")).el);
		});

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
	Coveo.$$(searchBoxDesktop).on(Coveo.QueryEvents.buildingQuery, function (e, args) {
		args.queryBuilder.addContext(userContext);
	});
	Coveo.$$(searchBoxMobile).on(Coveo.QueryEvents.buildingQuery, function (e, args) {
		args.queryBuilder.addContext(userContext);
	});
	Coveo.$$(searchBody).on("buildingQuery", function (e, args) {
		//Reset Banner 
		$("#bodySearchAd").html("");
		$("#search-result-banner-right").html("");
	});
})

//Set the banner
function searchBanners(paramValues) {
	loadBanner("#bodySearchAd", paramValues.param1);
	loadBanner("#search-result-banner-right", paramValues.param2);
}

function searchBodyBanner(paramValues) {
	loadBanner("#bodySearchAd", paramValues.param1);
}

function searchRightBanner(paramValues) {
	loadBanner("#search-result-banner-right", paramValues.param1);
}

function loadBanner(id, url) {
	if (typeof url != "undefined" && $(id).length != 0) {
		$(id).load(convertURL(url));
	}
}

function convertURL(url) {
	const found = url.match(/\.nocloudconfigs\.html$/);
	if (found == null) {
		url = url.replace(/\.html$/, ".nocloudconfigs.html");
	}
	return url;
}

