

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
   * @return the json object
   */
  JsonObject setOtherUDOTags(final String udoTagStart, String[] tags, JsonObject otherUDOTagsMap);


  /**
   * Sets the UDO tags for advisor pages.
   *
   * @return the json object
   */
  JsonObject setUDOTagsForAdvisorPages(SlingHttpServletRequest request, String advisorType, JsonObject otherUDOTagsMap);


  public void setUDOParameters( Page currentPage,String masterPagePath, String advancedPageType,String pageCategory,String pageSubCategory,String breadCrumb,JsonObject otherUDOTagsMap) throws LoginException, RepositoryException;
}
