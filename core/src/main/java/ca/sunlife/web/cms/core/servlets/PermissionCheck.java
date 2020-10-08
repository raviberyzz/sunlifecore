/**
 * 
 */
package ca.sunlife.web.cms.core.servlets;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.servlet.Servlet;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * The Class PermissionCheck.
 *
 * @author TCS
 * @version 1.0
 */
@ Component (service = Servlet.class, property = {
    Constants.SERVICE_DESCRIPTION + "=Validate Permissions Servlet",
    "sling.servlet.methods=" + HttpConstants.METHOD_HEAD,
    "sling.servlet.resourceTypes=" + "sunlife/core/components/config/check-permission",
    "sling.servlet.extensions=service", "sling.servlet.selectors=config" })
public class PermissionCheck extends SlingSafeMethodsServlet {
  /** The Constant serialVersionUID. */
  private static final long serialVersionUID = 1L;
  /** The Constant LOG. */
  private static final Logger LOG = LoggerFactory.getLogger(AkamaiEdgeRedirects.class);

  /* (non-Javadoc)
   * @see org.apache.sling.api.servlets.SlingSafeMethodsServlet#doHead(org.apache.sling.api.SlingHttpServletRequest, org.apache.sling.api.SlingHttpServletResponse)
   */
  public void doHead(SlingHttpServletRequest request, SlingHttpServletResponse response) {
 // retrieve the requested URL
    String uri = request.getParameter("uri");
    Session session = request.getResourceResolver().adaptTo(javax.jcr.Session.class);
    // obtain the session from the request
    if(StringUtils.isBlank(uri) || null == session) {
      response.setStatus(SlingHttpServletResponse.SC_FORBIDDEN);
    }else {
   // perform the permissions check
      try {
        session.checkPermission(uri, Session.ACTION_READ);
        LOG.debug("authchecker says OK");
        response.setStatus(SlingHttpServletResponse.SC_OK);
      } catch (java.security.AccessControlException | RepositoryException e) {
        LOG.debug("authchecker says READ access DENIED! {}", uri);
        response.setStatus(SlingHttpServletResponse.SC_FORBIDDEN);
      }
    }
  }
}
