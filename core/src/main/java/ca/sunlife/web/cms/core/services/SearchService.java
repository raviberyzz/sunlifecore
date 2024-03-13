

package ca.sunlife.web.cms.core.services;

import ca.sunlife.web.cms.core.dto.CoveoSearchConfig;

public interface SearchService {


    /**
     * Gets the search config.
     *
     * @param pagePath the page path
     * @return the search config
     */
    CoveoSearchConfig getSearchConfig(String pagePath);

}
