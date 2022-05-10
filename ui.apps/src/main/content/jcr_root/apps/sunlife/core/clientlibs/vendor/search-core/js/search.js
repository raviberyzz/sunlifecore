/*search/search.js*/
document.addEventListener('DOMContentLoaded', function () {
	//Search body label
	const searchBody = document.querySelector('#search');
	const searchBoxDesktop = document.querySelector('#search-box-desktop');
	const searchBoxMobile = document.querySelector('#search-box-mobile');

	if (typeof coveoSearchlanguage === 'undefined') {
		coveoSearchlanguage = Globalize.culture().englishName.replace(/\s(.*)/g, '');
	}

	const userContext = {
		'userlocale': document.querySelector("meta[property='og:locale']").getAttribute("content"),
		'userlanguage': coveoSearchlanguage
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
		Coveo.Dom.useNativeJavaScriptEvents = true;
		Coveo.$$(searchBody).on(Coveo.AnalyticsEvents.analyticsEventReady, function (event) {
			var analyticsEvent = event.detail.coveoAnalyticsEventData.actionCause;
			var filter = event.detail.coveoAnalyticsEventData.originLevel2;
			var numberOfResults = event.detail.coveoAnalyticsEventData.numberOfResults;
			var queryText = event.detail.coveoAnalyticsEventData.queryText;
			if (filter == "default") filter = "all";
			if (analyticsEvent == "searchboxSubmit" || analyticsEvent == "searchFromLink") {
				utag.link({ "ev_type": "other", "ev_action": "clk", "ev_title": "search module-search", "ev_data_one": event.detail.coveoAnalyticsEventData.queryText});
				utag.link({ "ev_type": "other", "ev_action": "clk", "ev_title": "onsite search_client input", "ev_data_one": "search_count=" + numberOfResults + ":search_filter=" + filter,"page_search_term":queryText });
			}
			else if (analyticsEvent == "interfaceChange")
				utag.link({ "ev_type": "other", "ev_action": "clk", "ev_title": "onsite search_filter", "ev_data_one": "search_count=" + numberOfResults + ":search_filter=" + filter,"page_search_term":queryText });
			else if (analyticsEvent == "omniboxAnalytics")
				utag.link({ "ev_type": "other", "ev_action": "clk", "ev_title": "onsite search_typeahead_text", "ev_data_one": "search_count=" + numberOfResults + ":search_filter=" + filter,"page_search_term":queryText });
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

