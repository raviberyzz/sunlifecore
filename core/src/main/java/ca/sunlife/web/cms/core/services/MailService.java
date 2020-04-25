package ca.sunlife.web.cms.core.services;

import org.apache.sling.api.SlingHttpServletRequest;

/**
 * The Interface MailService.
 */
public interface MailService {

  /**
   * Process http request.
   *
   * @param request
   *          the request
   * @return the string
   */
  public String processHttpRequest(SlingHttpServletRequest request);
}
