
package ca.sunlife.web.cms.core.services.impl;

import ca.sunlife.web.cms.core.dto.CoveoSearchConfig;
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

    public static final String COVEO_SEARCH_ENABLED = "coveoSearchEnabled";
    public static final String SEARCH_TOKEN = "searchToken";
    public static final String SEARCH_URL = "searchUrl";
    public static final String ORG_ID = "orgId";
    public static final String REST_URI = "restUri";
    public static final String SEARCH_HUB = "searchHub";
    public static final String SITE_LOCALE = "siteLocale";
    public static final String SEARCH_LANGUAGE = "searchLanguage";


    @Override
    public CoveoSearchConfig getSearchConfig(String pagePath) {
        CoveoSearchConfig coveoSearchConfig = null;
        LOGGER.debug("Entry :: getSearchConfig method of SearchServiceImpl, pagePath : {}", pagePath);
        try {
            coveoSearchConfig = new CoveoSearchConfig(
                    configService.getConfigValues(COVEO_SEARCH_ENABLED, pagePath),
                    configService.getConfigValues(SEARCH_TOKEN, pagePath),
                    configService.getConfigValues(SEARCH_URL, pagePath),
                    configService.getConfigValues(ORG_ID, pagePath),
                    configService.getConfigValues(REST_URI, pagePath),
                    configService.getConfigValues(SEARCH_HUB, pagePath),
                    configService.getConfigValues(SITE_LOCALE, pagePath),
                    configService.getConfigValues(SEARCH_LANGUAGE, pagePath));

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

