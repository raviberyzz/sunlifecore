document.addEventListener('DOMContentLoaded', function () {
    Coveo.SearchEndpoint.configureCloudV2Endpoint('', seachBodyConfig.token, seachBodyConfig.restUri);
    //Desktop search box
    const searchBoxDesktop = document.querySelector('#search-box-desktop');
    Coveo.initSearchbox(searchBoxDesktop, seachBodyConfig.searchUrl, {
      Analytics: {
        searchHub: seachBodyConfig.searchHub,
      },
    });
  
    Coveo.$$(searchBoxDesktop).on(Coveo.InitializationEvents.afterInitialization, (args) => {
      searchBoxDesktop.querySelector('.CoveoSearchbox .CoveoSearchButton').append(Coveo.$$('span', {
        className: 'coveo-search-button-label'
      }, Coveo.l("Search")).el);
    });
    //Mobile search box
    const searchBoxMobile = document.querySelector('#search-box-mobile');
    Coveo.initSearchbox(searchBoxMobile, seachBodyConfig.searchUrl, {
      Analytics: {
        searchHub: seachBodyConfig.searchHub,
      },
    });
  
  })