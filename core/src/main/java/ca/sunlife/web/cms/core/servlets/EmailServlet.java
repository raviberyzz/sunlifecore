package ca.sunlife.web.cms.core.servlets;

import java.io.IOException;

import javax.servlet.Servlet;
import javax.servlet.ServletException;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ca.sunlife.web.cms.core.services.MailService;

/**
 * The Class EmailServlet.
 */
@ Component (service = Servlet.class, property = { Constants.SERVICE_DESCRIPTION + "=Email Servlet",
    "sling.servlet.methods= [" + HttpConstants.METHOD_GET + "," + HttpConstants.METHOD_POST + "]",
    "sling.servlet.resourceTypes=" + "sunlife/core/components/config/email",
    "sling.servlet.extensions=json" })
public class EmailServlet extends SlingAllMethodsServlet {

  /** The Constant serialVersionUID. */
  private static final long serialVersionUID = 1L;

  /** The Constant LOG. */
  private static final Logger LOG = LoggerFactory.getLogger(EmailServlet.class);

  /** The mail service. */
  @ Reference
  private transient MailService mailService;
  

  /*
   * (non-Javadoc)
   * @see org.apache.sling.api.servlets.SlingAllMethodsServlet#doPost(org.apache.sling.
   * api.SlingHttpServletRequest, org.apache.sling.api.SlingHttpServletResponse)
   */
  @ Override
  public void doPost(final SlingHttpServletRequest request, final SlingHttpServletResponse response)
      throws ServletException, IOException {
    LOG.debug("Processing reqest");
    String redirectUrl = mailService.processHttpRequest(request);
    response.sendRedirect(StringUtils.isNotBlank(redirectUrl)? redirectUrl : "");
  }

  /*
   * (non-Javadoc)
   * @see org.apache.sling.api.servlets.SlingSafeMethodsServlet#doGet(org.apache.sling.
   * api.SlingHttpServletRequest, org.apache.sling.api.SlingHttpServletResponse)
   */
  @ Override
  public void doGet(final SlingHttpServletRequest request, final SlingHttpServletResponse response)
      throws ServletException, IOException {
    doPost(request, response);
  }

}