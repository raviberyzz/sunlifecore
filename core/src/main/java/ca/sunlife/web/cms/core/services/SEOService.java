package ca.sunlife.web.cms.core.services;

import com.google.gson.JsonObject;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;

import javax.jcr.RepositoryException;
import java.util.Map;

public interface SEOService {

    /**
     * Sets the article page social meta tags.
     *
     * @throws LoginException      the login exception
     * @throws RepositoryException the repository exception
     */
    Map<String, String> setArticlePageSocialMetaTags(ResourceResolver resolver, String pagePath, SiteConfigService configService, Map<String, String> customMetadata) throws LoginException, RepositoryException;


    /**
     * Sets the other UDO tags.
     *
     * @param udoTagStart the new other UDO tags
     * @return the json object
     */
    JsonObject setOtherUDOTags(final String udoTagStart, String[] tags, JsonObject otherUDOTagsMap);


    /**
     * Sets the UDO tags for advisor pages.
     *
     * @return the json object
     */
    JsonObject setUDOTagsForAdvisorPages(SlingHttpServletRequest request, String advisorType, JsonObject otherUDOTagsMap);

}
