"use strict";
use(function () {

    var configService = sling.getService(Packages.ca.sunlife.web.cms.core.services.SiteConfigService);
    var navPath = this.path;

     if (navPath == null || navPath.equals("")) {
        return {
            navPath : navPath
        };
    }

    var siteUrl = configService.getPageUrl(currentPage.getPath());

    if (siteUrl == null || siteUrl.equals("")) {
        return {
            navPath : navPath
        };
    }
    return {
        completeURL : siteUrl
    }
});
