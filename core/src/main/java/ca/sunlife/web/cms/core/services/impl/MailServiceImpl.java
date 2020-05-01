package ca.sunlife.web.cms.core.services.impl;

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

import org.apache.commons.httpclient.HttpStatus;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.osgi.services.HttpClientBuilderFactory;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
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
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.MailService;

/**
 * The Class MailServiceImpl.
 */
@ Component (service = MailService.class, immediate = true)
@ Designate (ocd = MailConfig.class)

public class MailServiceImpl implements MailService {
  /** The Constant serialVersionUID. */
  private static final long serialVersionUID = 1L;

  /** The Constant LOG. */
  private static final Logger LOG = LoggerFactory.getLogger(MailServiceImpl.class);

  /** The mail config. */
  private MailConfig mailConfig;

  /** The http client builder factory. */
  @ Reference
  private HttpClientBuilderFactory httpClientBuilderFactory;
  
  @Reference
  private CoreResourceResolver coreResourceResolver;

  /* (non-Javadoc)
   * @see ca.sunlife.web.cms.core.services.MailService#processHttpRequest(org.apache.sling.api.SlingHttpServletRequest)
   */
  @ Override
  public String processHttpRequest(SlingHttpServletRequest request) {
    LOG.trace("Inside MailServiceImpl:processHttpRequest");
    final String cfPathSuffix = "/".concat(JcrConstants.JCR_CONTENT).concat("/").concat("data");
    final int timeOut = 5000;
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
      if (null != request) {
        // getting all request parameters - Starts
        Enumeration <String> requestParameterNames = request.getParameterNames();
        LOG.debug("Request parameters {}",requestParameterNames);
        HashMap <String, String> requestParameters = new HashMap <>();
        while (requestParameterNames.hasMoreElements()) {
          final String key = requestParameterNames.nextElement();
          requestParameters.put(key, request.getParameter(key));
        }
        // getting all request parameters - Ends

        componentPath = requestParameters.get(":formstart");
        toEmailId = requestParameters.get("email-id");
        ResourceResolver resourceResolver = coreResourceResolver.getResourceResolver();
        Resource componentResource = resourceResolver.getResource(componentPath);
        if (null != componentResource) {
          LOG.debug("Got the component path {}", componentResource.getPath());
          Node componentNode = componentResource.adaptTo(Node.class);
          if (null != componentNode && null != componentNode.getProperty("id")) {
            cfName = componentNode.getProperty("id").getString();
          }
        }
        // content fragment path
        cfPath = mailConfig.getTemplatePath() + cfName + cfPathSuffix;
        LOG.debug("cfPath {}", cfPath);
        Resource contentResource = request.getResourceResolver().getResource(cfPath);
        if (null != contentResource) {
          LOG.debug("Content Resource Path {}", contentResource.getPath());
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
        resourceResolver.close();
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
        HttpPost post = new HttpPost(mailConfig.getApiUrl());
        List <BasicNameValuePair> apiParameters = new ArrayList <>(1);
        apiParameters.add(new BasicNameValuePair("slf-from-email-address", fromEmailId));
        apiParameters.add(new BasicNameValuePair("slf-to-email-address", toEmailId));
        apiParameters.add(new BasicNameValuePair("slf-cc-email-address", ccEmailId));
        apiParameters.add(new BasicNameValuePair("slf-bcc-email-address", bccEmailId));
        apiParameters.add(new BasicNameValuePair("slf-email-subject", emailSubject));
        apiParameters.add(new BasicNameValuePair("slf-email-body", emailBody));
        apiParameters.add(new BasicNameValuePair("slf-from-email-text", fromEmailText));
        apiParameters.add(new BasicNameValuePair("slf-api-key", mailConfig.getApiKey()));
        post.setEntity(new UrlEncodedFormEntity(apiParameters));
        HttpResponse emailResponse = client.execute(post);
        LOG.debug("Response code for email is :: " + emailResponse.getStatusLine().getStatusCode()
            + " :: " + emailResponse.getStatusLine().getReasonPhrase());
        return emailResponse.getStatusLine().getStatusCode() == HttpStatus.SC_OK ? successPageUrl
                : errorPageUrl;

      }
    } catch (PathNotFoundException pathEx) {
      LOG.error("Exception occured :: Path not found {}", pathEx);
    } catch (ValueFormatException valEx) {
      LOG.error("Exception occured :: Incorrect value format {}", valEx);
    } catch (RepositoryException repEx) {
      LOG.error("Exception occured :: Repository not found {}", repEx);
    } catch (IOException e) {
      LOG.error("Exception occured :: IOException {}", e);
    } catch (LoginException e) {
      LOG.error("Exception occured :: LoginException {}", e);
    } 
    return null;
  }
  
  /**
   * Activate.
   *
   * @param config the config
   */
  @Activate
  protected void activate(MailConfig config) {
    this.mailConfig = config;
  }
  
  /**
   * Null check.
   *
   * @param value
   *          the value
   * @return the string
   */
  public String nullCheck(String value) {
    return value != null ? value : "";
  }


}
