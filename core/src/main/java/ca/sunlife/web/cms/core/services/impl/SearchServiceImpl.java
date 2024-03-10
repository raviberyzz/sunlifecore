
package ca.sunlife.web.cms.core.services.impl;

import ca.sunlife.web.cms.core.beans.v1.CoveoSearchConfig;
import ca.sunlife.web.cms.core.services.SearchService;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import org.apache.sling.api.resource.LoginException;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;


@Component(service = {SearchService.class}, immediate = true)
public class SearchServiceImpl implements SearchService {

    private static final Logger LOGGER = LoggerFactory.getLogger(SearchService.class);

    @Reference
    private SiteConfigService configService;

    private static final String COVEO_SEARCH_ENABLED = "coveoSearchEnabled";
    private static final String SEARCH_TOKEN = "searchToken";
    private static final String SEARCH_URL = "searchUrl";
    private static final String ORG_ID = "orgId";
    private static final String REST_URI = "restUri";
    private static final String SEARCH_HUB = "searchHub";
    private static final String SITE_LOCALE = "siteLocale";
    private static final String SEARCH_LANGUAGE = "searchLanguage";


    @Override
    public CoveoSearchConfig getSearchConfig(String pagePath) {
        LOGGER.debug("Entry :: getSearchConfig method of SearchServiceImpl, pagePath : {}", pagePath);
        CoveoSearchConfig coveoSearchConfig = new CoveoSearchConfig();
        try {
            if (null != configService) {
                coveoSearchConfig.setCoveoSearchEnabled(configService.getConfigValues(COVEO_SEARCH_ENABLED, pagePath));
                coveoSearchConfig.setSearchToken(configService.getConfigValues(SEARCH_TOKEN, pagePath));
                coveoSearchConfig.setSearchUrl(configService.getConfigValues(SEARCH_URL, pagePath));
                coveoSearchConfig.setOrgId(configService.getConfigValues(ORG_ID, pagePath));
                coveoSearchConfig.setRestUri(configService.getConfigValues(REST_URI, pagePath));
                coveoSearchConfig.setSearchHub(configService.getConfigValues(SEARCH_HUB, pagePath));
                coveoSearchConfig.setSiteLocale(configService.getConfigValues(SITE_LOCALE, pagePath));
                coveoSearchConfig.setSearchLanguage(configService.getConfigValues(SEARCH_LANGUAGE, pagePath));
            }

        } catch (LoginException | RepositoryException e) {
            LOGGER.error("Error while getting search config", e);
        }
        return coveoSearchConfig;

    }

    @Activate
    public void activate() {
        LOGGER.debug("Entry :: activate method of SearchServiceImpl");
    }
}

