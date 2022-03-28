Coveo.SearchEndpoint.configureCloudV2Endpoint('', searchConfig.token, searchConfig.restUri);
document.addEventListener('DOMContentLoaded', function () {
    //Desktop search box
    const searchBoxDesktop = document.querySelector('#search-box-desktop');
    Coveo.initSearchbox(searchBoxDesktop, searchConfig.searchUrl, {
      Analytics: {
        searchHub: searchConfig.searchHub,
      },
    });
  
    Coveo.$$(searchBoxDesktop).on(Coveo.InitializationEvents.afterInitialization, (args) => {
      searchBoxDesktop.querySelector('.CoveoSearchbox .CoveoSearchButton').append(Coveo.$$('span', {
        className: 'coveo-search-button-label'
      }, Coveo.l("Search")).el);
    });
    //Mobile search box
    const searchBoxMobile = document.querySelector('#search-box-mobile');
    Coveo.initSearchbox(searchBoxMobile, searchConfig.searchUrl, {
      Analytics: {
        searchHub: searchConfig.searchHub,
      },
    });
  
  })