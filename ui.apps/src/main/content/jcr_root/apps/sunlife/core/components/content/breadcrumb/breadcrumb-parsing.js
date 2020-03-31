"use strict";
use(function () {

    var configService = sling.getService(Packages.ca.sunlife.web.cms.core.services.SiteConfigService);
    var navPath = this.path;

     if (navPath == null || navPath.equals("")) {
        return {
            navPath : navPath
        };
    }

    var siteUrl = configService.getConfigValues('siteUrl',currentPage.getPath());

    if (siteUrl == null || siteUrl.equals("")) {
        return {
            navPath : navPath
        };
    }

    var updatedUrl = navPath.substring(siteUrl.lastIndexOf('/'),navPath.lastIndexOf('.'));

     return {
           updatedUrl : updatedUrl
        }

});