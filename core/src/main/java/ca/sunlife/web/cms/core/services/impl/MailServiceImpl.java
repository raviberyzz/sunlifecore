
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
import java.util.Map;

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
@Component(service = MailService.class, immediate = true)
@Designate(ocd = MailConfig.class)

public class MailServiceImpl implements MailService {

    /** The Constant serialVersionUID. */
    private static final long serialVersionUID = 1L;

    /** The Constant LOG. */
    private static final Logger LOG = LoggerFactory.getLogger(MailServiceImpl.class);

    /** The mail config. */
    private MailConfig mailConfig;

    /** The http client builder factory. */
    @Reference
    private HttpClientBuilderFactory httpClientBuilderFactory;

    /** The core resource resolver. */
    @Reference
    private CoreResourceResolver coreResourceResolver;

    /*
     * (non-Javadoc)
     * 
     * @see
     * ca.sunlife.web.cms.core.services.MailService#processHttpRequest(org.apache.
     * sling.api. SlingHttpServletRequest)
     */
    private final String cfNodePath = "/".concat(JcrConstants.JCR_CONTENT).concat("/").concat("data").concat("/").concat("master");
    private static final int TIMEOUT = 5000;
    private String fromEmailId = "";
    private String toEmailId = "";
    private String emailSubject = "";
    private String emailBody = "";
    private String isClient = "";
    private String clientToEmailId = "";
    private String clientEmailSubject = "";
    private String clientEmailBody = "";
    private String errorEmailSubject = "";
    private String errorEmailBody = "";
    private String successPageUrl = "";
    private String errorPageUrl = "";
    
    
  @ Override
  public JSONObject processHttpRequest(final SlingHttpServletRequest request) {
    LOG.trace("Inside MailServiceImpl:processHttpRequest");
    
    String cfPath = "";
    String cfName = "";
    String cfLocale = "";
    HttpResponse mailResponse = null;
    JSONObject successResponse = null;
    JSONObject errorResponse = null;

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
        cfLocale = requestParameters.get("cfLocale");
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
		    : StringUtils.EMPTY;
	    clientToEmailId = nullCheck(requestParameters.get("slf-leadgen-email-address"));
	    isClient = mailContent.containsKey("isClient") ? mailContent.get("isClient", String.class)
		    : StringUtils.EMPTY;
	    clientEmailSubject = mailContent.containsKey("client-subject-email") ? mailContent.get("client-subject-email", String.class)
		    : StringUtils.EMPTY;
	    clientEmailBody = mailContent.containsKey("client-body-email") ? mailContent.get("client-body-email", String.class)
		    : StringUtils.EMPTY;
	    emailSubject = mailContent.containsKey("subject-email")
		    ? mailContent.get("subject-email", String.class)
		    : StringUtils.EMPTY;
	    emailBody = mailContent.containsKey("body-email") ? mailContent.get("body-email", String.class)
		    : StringUtils.EMPTY;
	    errorEmailSubject = mailContent.containsKey("error-subject-email")
		    ? mailContent.get("error-subject-email", String.class)
		    : StringUtils.EMPTY;
	    errorEmailBody = mailContent.containsKey("error-body-email") ? mailContent.get("error-body-email", String.class)
		    : StringUtils.EMPTY;
	    successPageUrl = mailContent.containsKey("success-page-url")
		    ? mailContent.get("success-page-url", String.class)
		    : StringUtils.EMPTY;
	    errorPageUrl = mailContent.containsKey("error-page-url")
		    ? mailContent.get("error-page-url", String.class)
		    : StringUtils.EMPTY;
	}
	resourceResolver.close();
	
	successResponse = modifyResponse(populateContent(successPageUrl, requestParameters), mailConfig.getSuccessResponse());
	errorResponse = modifyResponse(populateContent(errorPageUrl, requestParameters), mailConfig.getErrorResponse());
        
        if ("true".equalsIgnoreCase(isClient)) {
            mailResponse = sendMail(fromEmailId, clientToEmailId, clientEmailSubject, clientEmailBody, mailConfig.getApiKey(), requestParameters);
            if (mailResponse.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
        	LOG.debug("Mail sent to client..");
            } else {
        	LOG.error("Error in sending mail to client.. {} {}", mailResponse.getStatusLine().getStatusCode(), mailResponse.getStatusLine().getReasonPhrase());
        	mailResponse = sendMail(fromEmailId, toEmailId, errorEmailSubject, errorEmailBody, mailConfig.getApiKey(), requestParameters);
        	LOG.debug("Error Mail to Marketing team - Response :: {}", mailResponse.getStatusLine().getStatusCode());
            }
        }
        
        mailResponse = sendMail(fromEmailId, toEmailId, emailSubject, emailBody, mailConfig.getApiKey(), requestParameters);
        if (mailResponse.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
    		LOG.debug("Mail sent to marketing team..");
    		return successResponse;
        } else {
    		LOG.error("Error in sending mail to marketing team.. {} {}", mailResponse.getStatusLine().getStatusCode(), mailResponse.getStatusLine().getReasonPhrase());
    		return errorResponse;
        }
        

	
      }
    } catch (final LoginException e) {
      LOG.error("Exception occured :: LoginException {}", e);
    }
    return null;
  }

    /**
     * Activate.
     *
     * @param config
     *            the config
     */
    @Activate
    protected void activate(final MailConfig config) {
	mailConfig = config;
    }

    /**
     * Null check.
     *
     * @param value
     *            the value
     * @return the string
     */
    public String nullCheck(final String value) {
	return value != null ? value : StringUtils.EMPTY;
    }

    
    /**
     * Send mail.
     *
     * @param fromEmailIdParam the from email id param
     * @param toEmailIdParam the to email id param
     * @param emailSubjectParam the email subject param
     * @param emailBodyParam the email body param
     * @param apiKeyParam the api key param
     * @param requestParametersParam the request parameters param
     * @return the http response
     */
    public HttpResponse sendMail(String fromEmailIdParam, String toEmailIdParam, String emailSubjectParam, String emailBodyParam,
	    String apiKeyParam, Map <String, String> requestParametersParam) {
	// Mail API service
	try {
	    HttpClientBuilder builder = httpClientBuilderFactory.newBuilder();
	    RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(TIMEOUT).setSocketTimeout(TIMEOUT)
		    .build();
	    builder.setDefaultRequestConfig(requestConfig);
	    HttpClient client = builder.build();
	    HttpPost post = new HttpPost(mailConfig.getApiUrl());
	    List<BasicNameValuePair> apiParameters = new ArrayList<>(1);
	    apiParameters.add(new BasicNameValuePair("slf-from-email-address", populateContent(fromEmailIdParam, requestParametersParam)));
	    apiParameters.add(new BasicNameValuePair("slf-to-email-address", populateContent(toEmailIdParam, requestParametersParam)));
	    apiParameters.add(new BasicNameValuePair("slf-email-subject", populateContent(emailSubjectParam, requestParametersParam)));
	    apiParameters.add(new BasicNameValuePair("slf-email-body", populateContent(emailBodyParam, requestParametersParam)));
	    apiParameters.add(new BasicNameValuePair("slf-api-key", apiKeyParam));
	    post.setEntity(new UrlEncodedFormEntity(apiParameters));
	    LOG.debug("Trying to connect to mail API...");
	    return client.execute(post);
	} catch (final IOException e) {
	      LOG.error("Exception occured :: IOException {}", e);
	}
	return null;

    }
    
    
    /**
     * Populate content.
     *
     * @param content the content
     * @param requestParametersParam the request parameters param
     * @return the string
     */
    public String populateContent(String content, Map <String, String> requestParametersParam) {
	LOG.debug("Populating content with variables...");
	final MustacheFactory mf = new DefaultMustacheFactory();
	final StringWriter writer = new StringWriter();
	final Mustache mustache = mf.compile(new StringReader(nullCheck(content)), " ");
	mustache.execute(writer, requestParametersParam);
	return writer.toString();
	
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
	    if (StringUtils.isEmpty(url) || StringUtils.isBlank(url)) {
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
