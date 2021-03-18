/**
 * 
 */
package ca.sunlife.web.cms.core.servlets;

import java.io.IOException;

import javax.jcr.Session;
import javax.servlet.Servlet;

import org.apache.commons.httpclient.HttpStatus;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.json.JSONException;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * The Class AkamaiEdgeRedirects.
 *
 * @author TCS
 */
@ Component (service = Servlet.class, property = {
    Constants.SERVICE_DESCRIPTION + "=Akamai Edge Redirect Servlet",
    "sling.servlet.methods=" + HttpConstants.METHOD_POST,
    "sling.servlet.resourceTypes=" + "sunlife/core/components/config/akamai-edge-redirects",
    "sling.servlet.extensions=service", "sling.servlet.selectors=config" })
public class AkamaiEdgeRedirects extends SlingAllMethodsServlet {

  /** The Constant serialVersionUID. */
  private static final long serialVersionUID = 1L;
  /** The Constant LOG. */
  private static final Logger LOG = LoggerFactory.getLogger(AkamaiEdgeRedirects.class);

  /** The service. */
  @ Reference
  private transient ca.sunlife.web.cms.core.services.AkamaiEdgeRedirects service;

  /*
   * (non-Javadoc)
   * @see org.apache.sling.api.servlets.SlingAllMethodsServlet#doPost(org.apache.sling.api.
   * SlingHttpServletRequest, org.apache.sling.api.SlingHttpServletResponse)
   */
  @ Override
  public void doPost(final SlingHttpServletRequest request, final SlingHttpServletResponse response)
      throws IOException {
    String responseBody = "";
    try {
      ResourceResolver resolver = request.getResourceResolver();
      Session session = resolver.adaptTo(Session.class);
      String user = null != session ? session.getUserID():"anonymous";
      responseBody = service.publishRules(request.getParameter("policyID"),
          request.getParameter("rules"), user).toString();
      response.setContentType("application/json");
      response.getWriter().write(responseBody);
    } catch (JSONException e) {
      LOG.error("Got exception while processing request :", e);
      responseBody = "Error while processing the request";
      response.setStatus(HttpStatus.SC_BAD_REQUEST);
      response.getWriter().write(responseBody);
    }
  }

}
