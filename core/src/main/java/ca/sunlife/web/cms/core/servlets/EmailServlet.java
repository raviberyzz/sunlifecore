package ca.sunlife.web.cms.core.servlets;

import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.ValueFormatException;
import javax.servlet.Servlet;
import javax.servlet.ServletException;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.osgi.services.HttpClientBuilderFactory;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.crx.JcrConstants;
import com.github.mustachejava.DefaultMustacheFactory;
import com.github.mustachejava.Mustache;
import com.github.mustachejava.MustacheFactory;

import ca.sunlife.web.cms.core.osgi.config.MailConfig;

/**
 * The Class EmailServlet.
 */
@ Component (service = Servlet.class, property = { Constants.SERVICE_DESCRIPTION + "=Email Servlet",
    "sling.servlet.methods= [" + HttpConstants.METHOD_GET + "," + HttpConstants.METHOD_POST + "]",
    "sling.servlet.resourceTypes=" + "sunlife/core/components/config/email",
    "sling.servlet.extensions=json" })
@ Designate (ocd = MailConfig.class)
public class EmailServlet extends SlingAllMethodsServlet {

  /** The Constant serialVersionUID. */
  private static final long serialVersionUID = 1L;

  /** The Constant LOG. */
  private static final Logger LOG = LoggerFactory.getLogger(EmailServlet.class);

  /** The mail config. */
  private transient MailConfig mailConfig;

  /** The http client builder factory. */
  @ Reference
  private transient HttpClientBuilderFactory httpClientBuilderFactory;
  
  /**
   * Activate.
   *
   * @param config the config
   */
  @Activate
  protected void activate(MailConfig config) {
    mailConfig = config;
  }

  /**
   * Null check.
   *
   * @param value
   *          the value
   * @return the string
   */
  // null check method
  public String nullCheck(String value) {
    return value != null ? value : "";
  }

  /*
   * (non-Javadoc)
   * @see org.apache.sling.api.servlets.SlingAllMethodsServlet#doPost(org.apache.sling.
   * api.SlingHttpServletRequest, org.apache.sling.api.SlingHttpServletResponse)
   */
  @ Override
  public void doPost(final SlingHttpServletRequest request, final SlingHttpServletResponse response)
      throws ServletException, IOException {

    // variable initialization - Starts
    // CF - Content Fragment

    final String cfPathSuffix = "/".concat(JcrConstants.JCR_CONTENT).concat("/").concat("data");
    final int timeOut = 5000;
    final int successStatusCode = 200;
    String cfPath = "";
    String cfName = "";
    String fromEmailId = "";
    String toEmailId = "";
    String ccEmailId = "";
    String bccEmailId = "";
    String emailSubject = "";
    String emailBody = "";
    String fromEmailText = "";
    String componentPath = "";
    String successPageUrl = "";
    String errorPageUrl = "";

    // variable initialization - Ends

    try {
      // getting all request parameters - Starts
      Enumeration <String> requestParameterNames = request.getParameterNames();
      HashMap <String, String> requestParameters = new HashMap <>();
      while (requestParameterNames.hasMoreElements()) {
        final String key = requestParameterNames.nextElement();
        requestParameters.put(key, request.getParameter(key));
      }
      // getting all request parameters - Ends

      componentPath = requestParameters.get(":formstart");
      toEmailId = requestParameters.get("email-id");

      if (null != request) {
        Resource componentResource = request.getResourceResolver().getResource(componentPath);
        if (null != componentResource) {
          Node componentNode = componentResource.adaptTo(Node.class);
          if (null != componentNode && null != componentNode.getProperty("id")) {
            cfName = componentNode.getProperty("id").getString();
          }
        }
        // content fragment path
        cfPath = mailConfig.templatePath() + cfName + cfPathSuffix;
        Resource contentResource = request.getResourceResolver().getResource(cfPath);
        if (null != contentResource) {
          Node node = contentResource.adaptTo(Node.class);
          if (null != node && node.hasNodes()) {
            NodeIterator ite = node.getNodes();
            while (ite.hasNext()) {
              Node childNode = ite.nextNode();
              fromEmailId = nullCheck(childNode.getProperty("from-email-id").getString());
              ccEmailId = nullCheck(childNode.getProperty("cc-email-id").getString());
              bccEmailId = nullCheck(childNode.getProperty("bcc-email-id").getString());
              emailSubject = nullCheck(childNode.getProperty("subject-email").getString());
              emailBody = nullCheck(childNode.getProperty("body-email").getString());
              fromEmailText = nullCheck(childNode.getProperty("from-text-email").getString());
              successPageUrl = nullCheck(childNode.getProperty("success-page-url").getString())
                  + ".html";
              errorPageUrl = nullCheck(childNode.getProperty("error-page-url").getString())
                  + ".html";
            }
          }
        }
        MustacheFactory mf = new DefaultMustacheFactory();
        StringWriter writer = new StringWriter();
        Mustache mustache = mf.compile(new StringReader(emailBody), " ");
        mustache.execute(writer, requestParameters);
        emailBody = writer.toString();
        // Mail API service
        HttpClientBuilder builder = httpClientBuilderFactory.newBuilder();
        RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(timeOut)
            .setSocketTimeout(timeOut).build();
        builder.setDefaultRequestConfig(requestConfig);
        HttpClient client = builder.build();
        HttpPost post = new HttpPost(mailConfig.apiUrl());
        List <BasicNameValuePair> apiParameters = new ArrayList <>(1);
        apiParameters.add(new BasicNameValuePair("slf-from-email-address", fromEmailId));
        apiParameters.add(new BasicNameValuePair("slf-to-email-address", toEmailId));
        apiParameters.add(new BasicNameValuePair("slf-cc-email-address", ccEmailId));
        apiParameters.add(new BasicNameValuePair("slf-bcc-email-address", bccEmailId));
        apiParameters.add(new BasicNameValuePair("slf-email-subject", emailSubject));
        apiParameters.add(new BasicNameValuePair("slf-email-body", emailBody));
        apiParameters.add(new BasicNameValuePair("slf-from-email-text", fromEmailText));
        apiParameters.add(new BasicNameValuePair("slf-api-key", mailConfig.apiKey()));
        post.setEntity(new UrlEncodedFormEntity(apiParameters));
        HttpResponse emailResponse = client.execute(post);
        LOG.debug("Response code for email is :: " + emailResponse.getStatusLine().getStatusCode()
            + " :: " + emailResponse.getStatusLine().getReasonPhrase());
        response.sendRedirect(
            emailResponse.getStatusLine().getStatusCode() == successStatusCode ? successPageUrl
                : errorPageUrl);

      }
    } catch (PathNotFoundException pathEx) {
      LOG.error("Exception occured :: Path not found {}", pathEx);
    } catch (ValueFormatException valEx) {
      LOG.error("Exception occured :: Incorrect value format {}", valEx);
    } catch (RepositoryException repEx) {
      LOG.error("Exception occured :: Repository not found {}", repEx);
    }
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