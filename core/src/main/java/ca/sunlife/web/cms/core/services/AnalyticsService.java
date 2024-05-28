

package ca.sunlife.web.cms.core.services;

import com.day.cq.wcm.api.Page;
import com.google.gson.JsonObject;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;

import javax.jcr.RepositoryException;

public interface AnalyticsService {


    /**
     * Sets the other UDO tags.
     *
     * @param udoTagStart the new other UDO tags
     */
    void setOtherUDOTags(final String udoTagStart, String[] tags, JsonObject otherUDOTagsMap);


    /**
     * Sets the UDO tags for advisor pages.
     */
    void setUDOTagsForAdvisorPages(SlingHttpServletRequest request, String advisorType, JsonObject otherUDOTagsMap);

    /**
     * @param currentPage      Current page
     * @param masterPagePath   Master page path
     * @param advancedPageType Advanced page type
     * @param pageCategory     Page category
     * @param pageSubCategory  Page sub category
     * @param breadCrumb       Bread crumb
     * @param otherUDOTagsMap  Other UDO tags map
     * @throws LoginException      the login exception
     * @throws RepositoryException the repository exception
     */
    void setUDOParameters(Page currentPage, String masterPagePath, String advancedPageType, String pageCategory, String pageSubCategory, String breadCrumb, JsonObject otherUDOTagsMap) throws LoginException, RepositoryException;
}
