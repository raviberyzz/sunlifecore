/*
 *
 */

package ca.sunlife.web.cms.core.services;

import org.apache.sling.api.SlingHttpServletRequest;
import org.json.JSONObject;

/**
 * The Interface MailService.
 *
 * @author TCS
 * @version 1.0
 */
public interface MailService {

  /**
   * Process http request.
   *
   * @param request
   *          the request
   * @return the string
   */
  public JSONObject processHttpRequest(SlingHttpServletRequest request);
}
