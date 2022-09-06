/*search/search.js*/
var coveoSetInterval;
var coveoSearchcount = 0;
var userContext;
document.addEventListener('DOMContentLoaded', function () {
    //Search body label
    const searchBoxDesktop = document.querySelector('#search-box-desktop');
    if (coveoSearchlanguage == '') {
        coveoSearchlanguage = Globalize.culture().englishName.replace(/\s(.*)/g, '');
    }
    userContext = {
        'userlocale': document.querySelector("meta[property='og:locale']").getAttribute("content"),
        'userlanguage': coveoSearchlanguage
    };
    if (searchBoxDesktop != null) {
        coveoSearch();
    }
    else {
        coveoSetInterval = setInterval(coveoSearch, 500)
    }
});

function coveoSearch() {
    coveoSearchcount++;
    const searchBody = document.querySelector('#coveo-search-body');
    const searchBoxDesktop = document.querySelector('#search-box-desktop');
    const searchBoxMobile = document.querySelector('#search-box-mobile');

    if (searchBoxDesktop != null && coveoSearchcount < 5) {
        coveoSearchcount = 0;
        clearInterval(coveoSetInterval);
        // Initialize a Searchbox component. When in the main search page, this is done externally.
        if (searchBody) {
            Coveo.Dom.useNativeJavaScriptEvents = true;
            Coveo.$$(searchBody).on(Coveo.AnalyticsEvents.analyticsEventReady, function (event) {
                var analyticsEvent = event.detail.coveoAnalyticsEventData.actionCause;
                var filter = event.detail.coveoAnalyticsEventData.originLevel2;
                var numberOfResults = event.detail.coveoAnalyticsEventData.numberOfResults;
                var queryText = event.detail.coveoAnalyticsEventData.queryText;
                var pageUrl = event.detail.coveoAnalyticsEventData.originLevel3;
                if (analyticsEvent != "searchFromLink" || pageUrl == "")
                    pageUrl = utag_data.page_canonical_url;
                if (filter == "default") filter = "all";
                if (analyticsEvent == "searchboxSubmit" || analyticsEvent == "searchFromLink") {
                    utag.link({ "ev_type": "other", "ev_action": "clk", "ev_title": "search module-search", "ev_data_one": queryText, "page_search_term": queryText, "page_canonical_url": pageUrl });
                    utag.link({ "ev_type": "other", "ev_action": "clk", "ev_title": "onsite search_client input", "ev_data_one": "search_count=" + numberOfResults + ":search_filter=" + filter, "page_search_term": queryText });
                }
                else if (analyticsEvent == "interfaceChange")
                    utag.link({ "ev_type": "other", "ev_action": "clk", "ev_title": "onsite search_filter", "ev_data_one": "search_count=" + numberOfResults + ":search_filter=" + filter, "page_search_term": queryText });
                else if (analyticsEvent == "omniboxAnalytics")
                    utag.link({ "ev_type": "other", "ev_action": "clk", "ev_title": "onsite search_typeahead_text", "ev_data_one": "search_count=" + numberOfResults + ":search_filter=" + filter, "page_search_term": queryText });
                else if (analyticsEvent == "didyoumeanAutomatic")
                    utag.link({ "ev_type": "other", "ev_action": "clk", "ev_title": "onsite search_autocorrected", "ev_data_one": "search_count=" + numberOfResults + ":search_filter=" + filter, "page_search_term": queryText });
            });
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

            Coveo.$$(searchBody).on("buildingQuery", function (e, args) {
                //Reset Banner 
                $("#bodySearchAd").html("");
                $("#search-result-banner-right").html("");
            });

        } else {
            //searchBoxDesktop - label 
            Coveo.$$(searchBoxDesktop).on(Coveo.InitializationEvents.afterInitialization, (args) => {
                searchBoxDesktop.querySelector('.CoveoSearchbox .CoveoSearchButton').append(Coveo.$$('span', {
                    className: 'coveo-search-button-label'
                }, Coveo.l("Search")).el);

                Coveo.$$(searchBoxDesktop).on("buildingQuery", function (e, args) {
                    let query = Coveo.state(searchBoxDesktop, 'q');
                    let hiddenEl = document.querySelector('.coveo-desktop-error-hidden');
                    if (!hiddenEl) {
                        hiddenEl = document.querySelector('.coveo-desktop-error-shown');
                    }
                    if (!query) {
                        args.cancel = true; // !!! necessary to cancel the request!!!
                        Coveo.$$(hiddenEl).removeClass('coveo-desktop-error-hidden');
                        Coveo.$$(hiddenEl).addClass('coveo-desktop-error-shown');
                        var elmnt = $('#search-box-desktop input')[0].getBoundingClientRect();
                        $('.coveo-desktop-error-shown').css('width',elmnt.width)

                    } else {
                        if (Coveo.$$(hiddenEl).hasClass('coveo-desktop-error-shown')) {
                            Coveo.$$(hiddenEl).removeClass('coveo-desktop-error-shown');
                            Coveo.$$(hiddenEl).addClass('coveo-desktop-error-hidden');
                        }
                    }
                });
            });

            Coveo.$$(searchBoxMobile).on(Coveo.InitializationEvents.afterInitialization, (args) => {
                Coveo.$$(searchBoxMobile).on("buildingQuery", function (e, args) {
                    let query = Coveo.state(searchBoxMobile, 'q');
                    let hiddenEl = document.querySelector('.coveo-mobile-error-hidden');
                    if (!hiddenEl) {
                        hiddenEl = document.querySelector('.coveo-mobile-error-shown');
                    }
                    if (!query) {
                        args.cancel = true; // !!! necessary to cancel the request!!!
                        Coveo.$$(hiddenEl).removeClass('coveo-mobile-error-hidden');
                        Coveo.$$(hiddenEl).addClass('coveo-mobile-error-shown');
                        $('.first-level-navigation').addClass('mt-40');
                    } else {
                        if (Coveo.$$(hiddenEl).hasClass('coveo-mobile-error-shown')) {
                            Coveo.$$(hiddenEl).removeClass('coveo-mobile-error-shown');
                            Coveo.$$(hiddenEl).addClass('coveo-mobile-error-hidden');
                            $('.first-level-navigation').removeClass('mt-40');
                        }
                    }
                });
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
    }
    else if (coveoSearchcount > 5) {
        coveoSearchcount = 0;
        clearInterval(coveoSetInterval);
    }
}

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
