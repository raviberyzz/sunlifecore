
/* 
 *
 */

package ca.sunlife.web.cms.core.services.impl;

import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

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

    @Override
    public JSONObject processHttpRequest(final SlingHttpServletRequest request) {
        LOG.trace("Inside MailServiceImpl:processHttpRequest");
        String cfPath = "";
        String cfName = "";
        String cfLocale = "";
        String fromEmailId = "";
        String toEmailId = "";
        String emailSubject = "";
        String emailBody = "";
        String isClient = "";
        String ccEmailId = "";
        String bccEmailId = "";
        String clientToEmailId = "";
        String clientEmailSubject = "";
        String clientEmailBody = "";
        String errorEmailSubject = "";
        String errorEmailBody = "";
        String successPageUrl = "";
        String errorPageUrl = "";
        boolean isRequestValid = true;
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
                    if(!isRequestParamValid(key, requestParameters.get(key))){
                        isRequestValid = false;
                        break;
                    }
                }
                // getting all request parameters - Ends
                cfName = requestParameters.get("cfname");
                cfLocale = requestParameters.get("cfLocale");
                if(!isValid(cfName) || !isValid(cfLocale)) {
                    isRequestValid = false;
                }
                if(isRequestValid) {
                    ResourceResolver resourceResolver = coreResourceResolver.getResourceResolver();
                    // content fragment path
                    cfPath = mailConfig.getTemplatePath() + cfLocale + mailConfig.getTemplatePathSuffix() + cfName + cfNodePath;
                    LOG.debug("cfPath {}", cfPath);
                    Resource contentResource = request.getResourceResolver().getResource(cfPath);
                    if (null != contentResource) {
                        LOG.debug("Content Resource Path {}", contentResource.getPath());
                        final ValueMap mailContent = contentResource.getValueMap();
                        fromEmailId = getMapValue(mailContent, "from-email-id");
                        toEmailId = getMapValue(mailContent, "to-email-id");
                        clientToEmailId = nullCheck(requestParameters.get("slf-leadgen-email-address"));
                        isClient = getMapValue(mailContent, "isClient");
                        ccEmailId = getMapValue(mailContent, "cc-email-id");
                        bccEmailId = getMapValue(mailContent, "bcc-email-id");
                        clientEmailSubject = getMapValue(mailContent, "client-subject-email");
                        clientEmailBody = getMapValue(mailContent, "client-body-email");
                        emailSubject = getMapValue(mailContent, "subject-email");
                        emailBody = getMapValue(mailContent, "body-email");
                        errorEmailSubject = getMapValue(mailContent, "error-subject-email");
                        errorEmailBody = getMapValue(mailContent, "error-body-email");
                        successPageUrl = getMapValue(mailContent, "success-page-url");
                        errorPageUrl = getMapValue(mailContent, "error-page-url");
                    }
                    resourceResolver.close();
                }

                successResponse = modifyResponse(populateContent(successPageUrl, requestParameters), mailConfig.getSuccessResponse());
                errorResponse = modifyResponse(populateContent(errorPageUrl, requestParameters), mailConfig.getErrorResponse());

                if(isRequestValid) {
                    if ("true".equalsIgnoreCase(isClient)) {
                        mailResponse = sendMail(fromEmailId, ccEmailId, bccEmailId, clientToEmailId, clientEmailSubject, clientEmailBody, requestParameters);
                        if (mailResponse.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
                            LOG.debug("Mail sent to client..");
                        } else {
                            LOG.error("Error in sending mail to client.. {} {}", mailResponse.getStatusLine().getStatusCode(), mailResponse.getStatusLine().getReasonPhrase());
                            mailResponse = sendMail(fromEmailId, ccEmailId, bccEmailId, toEmailId, errorEmailSubject, errorEmailBody, requestParameters);
                            LOG.debug("Error Mail to Marketing team - Response :: {}", mailResponse.getStatusLine().getStatusCode());
                        }
                    }

                    mailResponse = sendMail(fromEmailId, ccEmailId, bccEmailId, toEmailId, emailSubject, emailBody, requestParameters);
                    if (mailResponse.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
                        LOG.debug("Mail sent to marketing team..");
                        return successResponse;
                    } else {
                        LOG.error("Error in sending mail to marketing team.. {} {}", mailResponse.getStatusLine().getStatusCode(), mailResponse.getStatusLine().getReasonPhrase());
                        return errorResponse;
                    }
                } else {
                    LOG.error("Error in sending mail to marketing team - Request not valid");
                    return errorResponse;
                }
            }
        } catch (final LoginException e) {
            LOG.error("Exception occurred :: LoginException {}", e.getMessage(), e);
        }
        return null;
    }

    /**
     * @param mailContent content-fragment content
     * @param key key to fetch the value from content-fragment
     * @return value
     */
    private String getMapValue(ValueMap mailContent, String key) {
        return mailContent.containsKey(key)
                ? mailContent.get(key, String.class)
                : StringUtils.EMPTY;
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
     * @param ccEmailIdParam the cc email id param
     * @param bccEmailIdParam the bcc email id param
     * @param toEmailIdParam the to email id param
     * @param emailSubjectParam the email subject param
     * @param emailBodyParam the email body param
     * @param requestParametersParam the request parameters param
     * @return the http response
     */
    public HttpResponse sendMail(String fromEmailIdParam, String ccEmailIdParam, String bccEmailIdParam, String toEmailIdParam, String emailSubjectParam, String emailBodyParam,
                                 Map <String, String> requestParametersParam) {
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
            apiParameters.add(new BasicNameValuePair("slf-cc-email-address", populateContent(ccEmailIdParam, requestParametersParam)));
            apiParameters.add(new BasicNameValuePair("slf-bcc-email-address", populateContent(bccEmailIdParam, requestParametersParam)));
            apiParameters.add(new BasicNameValuePair("slf-to-email-address", populateContent(toEmailIdParam, requestParametersParam)));
            apiParameters.add(new BasicNameValuePair("slf-email-subject", populateContent(emailSubjectParam, requestParametersParam)));
            apiParameters.add(new BasicNameValuePair("slf-email-body", Base64.getEncoder().encodeToString(populateContent(emailBodyParam, requestParametersParam).getBytes(Charset.forName("UTF-8")))));
            apiParameters.add(new BasicNameValuePair("slf-api-key", mailConfig.getApiKey()));
            post.setEntity(new UrlEncodedFormEntity(apiParameters, StandardCharsets.UTF_8));
            LOG.debug("Trying to connect to mail API...");
            return client.execute(post);
        } catch (final IOException e) {
            LOG.error("Exception occurred :: IOException {}", e.getMessage(), e);
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
        LOG.debug("Populating content with variable :: {}", content);
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
            LOG.error("Error in modifying response :: {}", ex.getMessage(), ex);
        }
        return null;
    }

    /**
     * Perform sanity check
     *
     * @param key Param key
     * @param value Param value
     * @return isValid
     */
	private static boolean isRequestParamValid(String key, String value) {
        if(isValid(key) && isValid(value)) {
            if(key.contains("email") && (!isValidEmail(value))) {
                    return false;
            }
            //Checking if value contains any html tag
            return !hasHTMLTags(value);
        }
        return true;
    }

    /**
     * perform regex validation
     *
     * @param value Param value
     * @return isMatches
     */
    private static boolean isValidEmail(String value) {
        final String emailRegex = "^[A-Za-z0-9+_.-]+@(.+)$";
        return Pattern.compile(emailRegex)
                .matcher(value)
                .matches();
    }

    /**
     * perform regex validation
     *
     * @param value Param value
     * @return isMatches
     */
    private static boolean hasHTMLTags(String value) {
        final String htmlRegex = "<\\/?[a-z][\\s\\S]*>";
      	return Pattern.compile(htmlRegex)
                .matcher(value)
                .find();
    }

    /**
     * check if string is valid
     * 
     * @param value Param value
     * @return isValid
     */
    private static boolean isValid(String value) {
        return null != value && !value.trim().isEmpty();
    }
}
