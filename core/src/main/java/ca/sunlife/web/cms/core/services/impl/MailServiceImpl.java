/*
 *
 */

package ca.sunlife.web.cms.core.services.impl;

import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.lang.StringUtils;
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
import org.apache.sling.api.resource.ValueMap;
import org.json.JSONException;
import org.json.JSONObject;
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
 *
 * @author TCS
 * @version 1.0
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

  /** The core resource resolver. */
  @ Reference
  private CoreResourceResolver coreResourceResolver;

  /*
   * (non-Javadoc)
   * @see ca.sunlife.web.cms.core.services.MailService#processHttpRequest(org.apache.sling.api.
   * SlingHttpServletRequest)
   */
  @ Override
  public JSONObject processHttpRequest(final SlingHttpServletRequest request) {
    LOG.trace("Inside MailServiceImpl:processHttpRequest");
    final String cfNodePath = "/".concat(JcrConstants.JCR_CONTENT).concat("/").concat("data").concat("/").concat("master");
    final int timeOut = 5000;
    final String SPLITVAR = "-";
    String cfPath = "";
    String cfName = "";
    String fromEmailId = "";
    String toEmailId = "";
    String ccEmailId = "";
    String bccEmailId = "";
    String emailSubject = "";
    String emailBody = "";
    String fromEmailText = "";
    String successPageUrl = "";
    String errorPageUrl = "";
    JSONObject successResponse = null;
    JSONObject errorResponse = null;

    // variable initialization - Ends

    try {
      if (null != request) {
        // getting all request parameters - Starts
        final Enumeration <String> requestParameterNames = request.getParameterNames();
        LOG.debug("Request parameters {}", requestParameterNames);
        final HashMap <String, String> requestParameters = new HashMap <>();
        while (requestParameterNames.hasMoreElements()) {
          final String key = requestParameterNames.nextElement();
          requestParameters.put(key, request.getParameter(key));
        }
        // getting all request parameters - Ends

        cfName = requestParameters.get("cfname");
        final String localeInfo = requestParameters.get("locale");
        final String localeArray[] = StringUtils.lowerCase(localeInfo).split(SPLITVAR);
        final String cfLocale = localeArray[1] + "/" + localeArray[0];
        LOG.debug("Locale info is :: {}", cfLocale);
	ResourceResolver resourceResolver = coreResourceResolver.getResourceResolver();
	// content fragment path
	cfPath = mailConfig.getTemplatePath() + cfLocale + mailConfig.getTemplatePathSuffix() + cfName + cfNodePath;
	LOG.debug("cfPath {}", cfPath);
	Resource contentResource = request.getResourceResolver().getResource(cfPath);
	if (null != contentResource) {
	    LOG.debug("Content Resource Path {}", contentResource.getPath());
	    final ValueMap mailContent = contentResource.getValueMap();
	    fromEmailId = mailContent.containsKey("from-email-id")
		    ? mailContent.get("from-email-id", String.class)
		    : StringUtils.EMPTY;
	    toEmailId = mailContent.containsKey("to-email-id") ? mailContent.get("to-email-id", String.class)
		    : nullCheck(requestParameters.get("toEmailId"));
	    ccEmailId = mailContent.containsKey("cc-email-id") ? mailContent.get("cc-email-id", String.class)
		    : StringUtils.EMPTY;
	    bccEmailId = mailContent.containsKey("bcc-email-id") ? mailContent.get("bcc-email-id", String.class)
		    : StringUtils.EMPTY;
	    emailSubject = mailContent.containsKey("subject-email")
		    ? mailContent.get("subject-email", String.class)
		    : StringUtils.EMPTY;
	    emailBody = mailContent.containsKey("body-email") ? mailContent.get("body-email", String.class)
		    : StringUtils.EMPTY;
	    fromEmailText = mailContent.containsKey("from-text-email")
		    ? mailContent.get("from-text-email", String.class)
		    : StringUtils.EMPTY;
	    successPageUrl = mailContent.containsKey("success-page-url")
		    ? mailContent.get("success-page-url", String.class)
		    : StringUtils.EMPTY;
	    errorPageUrl = mailContent.containsKey("error-page-url")
		    ? mailContent.get("error-page-url", String.class)
		    : StringUtils.EMPTY;
	}
	resourceResolver.close();
	
        final MustacheFactory mf = new DefaultMustacheFactory();
        final StringWriter writer = new StringWriter();
        final Mustache mustache = mf.compile(new StringReader(nullCheck(emailBody)), " ");
        mustache.execute(writer, requestParameters);
        emailBody = writer.toString();
        // Mail API service
        final HttpClientBuilder builder = httpClientBuilderFactory.newBuilder();
        final RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(timeOut)
            .setSocketTimeout(timeOut).build();
        builder.setDefaultRequestConfig(requestConfig);
        final HttpClient client = builder.build();
        final HttpPost post = new HttpPost(mailConfig.getApiUrl());
        final List <BasicNameValuePair> apiParameters = new ArrayList <>(1);
        apiParameters.add(new BasicNameValuePair("slf-from-email-address", fromEmailId));
        apiParameters.add(new BasicNameValuePair("slf-to-email-address", toEmailId));
        apiParameters.add(new BasicNameValuePair("slf-cc-email-address", ccEmailId));
        apiParameters.add(new BasicNameValuePair("slf-bcc-email-address", bccEmailId));
        apiParameters.add(new BasicNameValuePair("slf-email-subject", emailSubject));
        apiParameters.add(new BasicNameValuePair("slf-email-body", emailBody));
        apiParameters.add(new BasicNameValuePair("slf-from-email-text", fromEmailText));
        apiParameters.add(new BasicNameValuePair("slf-api-key", mailConfig.getApiKey()));
        post.setEntity(new UrlEncodedFormEntity(apiParameters));
        LOG.debug("Trying to connect to mail API...");
        final HttpResponse emailResponse = client.execute(post);
        LOG.debug("Response code for email is :: " + emailResponse.getStatusLine().getStatusCode()
            + " :: " + emailResponse.getStatusLine().getReasonPhrase());
        successResponse = modifyResponse(successPageUrl, mailConfig.getSuccessResponse());
	errorResponse = modifyResponse(errorPageUrl, mailConfig.getErrorResponse());
	return emailResponse.getStatusLine().getStatusCode() == HttpStatus.SC_OK ? successResponse
		: errorResponse;

      }
    } catch (final IOException e) {
      LOG.error("Exception occured :: IOException {}", e);
    } catch (final LoginException e) {
      LOG.error("Exception occured :: LoginException {}", e);
    }
    return null;
  }

  /**
   * Activate.
   *
   * @param config
   *          the config
   */
  @ Activate
  protected void activate(final MailConfig config) {
    mailConfig = config;
  }

  /**
   * Null check.
   *
   * @param value
   *          the value
   * @return the string
   */
  public String nullCheck(final String value) {
    return value != null ? value : StringUtils.EMPTY;
  }
  
  /**
   * Modify response.
   *
   * @param url
   *            the url
   * @param osgiResponse
   *            the osgi response
   * @return the JSON object
   */
  public JSONObject modifyResponse(String url, String osgiResponse) {
	JSONObject response = new JSONObject();
	try {
	    if (StringUtils.isEmpty(url)) {
		response.put("type", "json");
		response.put("response", osgiResponse);
	    } else {
		response.put("type", "url");
		response.put("url", url.concat(".html"));
	    }

	    return response;

	} catch (JSONException ex) {
	    LOG.error("Error in modifying response :: " + ex);
	}
	return null;

  }

}
