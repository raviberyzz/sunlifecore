package ca.sunlife.web.cms.core.services;

import java.util.Map;

public interface SEOService {

    /**
     * Sets the article page social meta tags.
     *
     * @param pagePath       the page path
     * @param customMetadata the custom metadata
     * @return the article page social meta tags
     */
    Map<String, String> setArticlePageSocialMetaTags(String pagePath, Map<String, String> customMetadata);


}
