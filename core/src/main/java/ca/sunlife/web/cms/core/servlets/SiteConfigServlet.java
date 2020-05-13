/**
 *
 */
package ca.sunlife.web.cms.core.servlets;

import java.io.IOException;

import javax.jcr.RepositoryException;
import javax.servlet.Servlet;
import javax.servlet.ServletException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * The Class SiteConfigServlet.
 *
 * @author TCS
 * @version 1.0
 */
@ Component (service = Servlet.class, property = {
    Constants.SERVICE_DESCRIPTION + "=Site Config Servlet",
    "sling.servlet.methods=" + HttpConstants.METHOD_GET,
    "sling.servlet.resourceTypes=" + "sunlife/core/components/config/configuration",
    "sling.servlet.extensions=json", "sling.servlet.selectors=config" })
public class SiteConfigServlet extends SlingSafeMethodsServlet {

  /** The Constant serialVersionUID. */
  private static final long serialVersionUID = 1L;

  /** The Constant LOG. */
  private static final Logger LOG = LoggerFactory.getLogger(SiteConfigServlet.class);

  /** The config service. */
  @ Reference
  private transient SiteConfigService configService;

  /*
   * (non-Javadoc)
   * @see org.apache.sling.api.servlets.SlingSafeMethodsServlet#doGet(org.apache.sling.
   * api.SlingHttpServletRequest, org.apache.sling.api.SlingHttpServletResponse)
   */
  @ Override
  protected void doGet(final SlingHttpServletRequest request,
      final SlingHttpServletResponse response) throws ServletException, IOException {
    try {
      final String name = request.getParameter("param");
      final String path = request.getParameter("path");
      response.getWriter().write("The value is: " + configService.getConfigValues(name, path));
    } catch (LoginException | RepositoryException e) {
      LOG.error("Error :: SiteConfigServlet :: {}", e);
    }
  }

}
