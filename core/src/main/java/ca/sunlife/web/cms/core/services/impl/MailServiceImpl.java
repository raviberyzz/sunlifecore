
/*
 *
 */

package ca.sunlife.web.cms.core.services.impl;

import java.io.*;
import java.net.HttpURLConnection;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

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
import org.json.JSONArray;
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

import javax.jcr.Node;
import javax.jcr.RepositoryException;

/**
 * The Class MailServiceImpl.
 *
 * @author TCS
 * @version 1.0
 */
@Component(service = MailService.class, immediate = true, configurationPid="ca.sunlife.web.cms.core.services.impl.MailServiceImpl", name="ca.sunlife.web.cms.core.services.impl.MailServiceImpl")
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
    private final String validationNodePath = "/".concat(JcrConstants.JCR_CONTENT).concat("/").concat("renditions").concat("/").concat("original");
    private static final int TIMEOUT = 5000;

    @Override
    public JSONObject processHttpRequest(final SlingHttpServletRequest request) {
        LOG.trace("Inside MailServiceImpl:processHttpRequest");
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
                final HashMap <String, String> requestParameters = fetchRequestParams(request);
                ResourceResolver resourceResolver = coreResourceResolver.getResourceResolver();

                final ValueMap mailContent = getEmailConfig(requestParameters, request.getResourceResolver());
                isRequestValid = isValidForm(mailContent, requestParameters, request.getResourceResolver());
                if (isRequestValid) {
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

                successResponse = modifyResponse(populateContent(successPageUrl, requestParameters), mailConfig.getSuccessResponse());
                errorResponse = modifyResponse(populateContent(errorPageUrl, requestParameters), mailConfig.getErrorResponse());
                if (isRequestValid && ishoneyPotFieldEmpty(requestParameters)) {
                    LOG.debug("isClient------..   {}",isClient);
                    if ("true".equalsIgnoreCase(isClient)) {
                        mailResponse = sendMail(fromEmailId, ccEmailId, bccEmailId, clientToEmailId, clientEmailSubject, clientEmailBody, requestParameters);
                        if (mailResponse.getStatusLine().getStatusCode() == HttpURLConnection.HTTP_OK) {
                            LOG.debug("Mail sent to client..");
                        } else {
                            LOG.error("Error in sending mail to client.. {} {}", mailResponse.getStatusLine().getStatusCode(), mailResponse.getStatusLine().getReasonPhrase());
                            mailResponse = sendMail(fromEmailId, ccEmailId, bccEmailId, toEmailId, errorEmailSubject, errorEmailBody, requestParameters);
                            LOG.debug("Error Mail to Marketing team - Response :: {}", mailResponse.getStatusLine().getStatusCode());
                        }
                    }

                    mailResponse = sendMail(fromEmailId, ccEmailId, bccEmailId, toEmailId, emailSubject, emailBody, requestParameters);
                    LOG.debug("mailResponse------..   {}",mailResponse);
                    if (null!= mailResponse && null != mailResponse.getStatusLine() && mailResponse.getStatusLine().getStatusCode() == HttpURLConnection.HTTP_OK) {
                        LOG.debug("Mail sent to marketing team..");
                        return successResponse;
                    } else {
                        // LOG.error("Error in sending mail to marketing team.. {} {}",  mailResponse.getStatusLine().getStatusCode(), mailResponse.getStatusLine().getReasonPhrase());
                        LOG.error("Error in sending mail to marketing team.. {} {}",mailResponse);
                        return errorResponse;
                    }
                }

                return errorResponse;
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
            apiParameters.add(new BasicNameValuePair("slf-email-body", Base64.getEncoder().encodeToString(populateContent(emailBodyParam, requestParametersParam).getBytes(StandardCharsets.UTF_8))));
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
     * init Params
     *
     * @param request input request
     * @return map
     */
    private HashMap <String, String> fetchRequestParams(SlingHttpServletRequest request){
        // getting all request parameters - Starts
        final Enumeration <String> requestParameterNames = request.getParameterNames();
        LOG.debug("Request parameters {}", requestParameterNames);
        final HashMap <String, String> requestParameters = new HashMap <>();

        while (requestParameterNames.hasMoreElements()) {
            final String key = requestParameterNames.nextElement();
            requestParameters.put(key, request.getParameter(key));
        }
        // getting all request parameters - Ends
        return requestParameters;
    }

    /**
     * get email config from the content fragment
     *
     * @param requestParameters input params
     * @param resourceResolver AEM resource resolver
     * @return config values
     */
    private ValueMap getEmailConfig(HashMap<String, String> requestParameters, ResourceResolver resourceResolver) {
        final String cfName = requestParameters.get("cfname");
        final String cfLocale = requestParameters.get("cfLocale");

        ValueMap mailContent = null;
        if (isValid(cfName) && isValid(cfLocale)) {
            String cfPath = mailConfig.getTemplatePath() + cfLocale + mailConfig.getTemplatePathSuffix() + cfName + cfNodePath;
            LOG.debug("cfPath {}", cfPath);
            Resource contentResource = resourceResolver.getResource(cfPath);
            if (null != contentResource) {
                LOG.debug("Content Resource Path {}", contentResource.getPath());
                mailContent = contentResource.getValueMap();
            }
        }
        return mailContent;
    }

    /**
     * Read JSON file from DAM asset AEM
     *
     * @param resolver AEM resource resolver
     * @param filePath AEM path
     * @return JSON content
     */
    private JSONObject getJsonFromFile(ResourceResolver resolver, String filePath) {
        JSONObject jsonObj = new JSONObject();
        Resource resource = resolver.getResource(filePath);
        try {
            if (resource != null) {
                Node rootNode = resource.adaptTo(Node.class);
                if (rootNode != null) {
                    Node jcNode = rootNode.getNode(JcrConstants.JCR_CONTENT);
                    InputStream content = jcNode.getProperty(JcrConstants.JCR_DATA).getBinary().getStream();
                    StringBuilder sb = new StringBuilder();
                    String line;
                    BufferedReader br = new BufferedReader(new
                            InputStreamReader(content, StandardCharsets.UTF_8));
                    while ((line = br.readLine()) != null) {
                        sb.append(line);
                    }
                    jsonObj = new JSONObject(sb.toString());
                }
            }
        } catch (RepositoryException | JSONException | IOException e) {
            LOG.error("Exception occurred in reading file :: Exception {}", e.getMessage(), e);
        }
        return jsonObj;
    }

    /**
     * Perform validations on form fields
     *
     * @param requestParameters input params
     * @param resourceResolver  resolve dam resource
     * @return isValid
     */
    private boolean isValidForm(ValueMap mailContent, HashMap<String, String> requestParameters, ResourceResolver resourceResolver) {
        if (mailContent == null) {
            return false;
        }

        final String cfName = requestParameters.get("cfname");
        final String cfLocale = requestParameters.get("cfLocale");

        JSONObject formDetails = getValidationDetails(cfName, cfLocale, resourceResolver);
        if (formDetails != null) {
            LOG.debug("Form validations found..");
            if (!isMandatoryValid(formDetails, requestParameters)) {
                return false;
            }

            for (Map.Entry<String, String> requestParam : requestParameters.entrySet()) {
                String key = requestParam.getKey();
                String value = requestParam.getValue();

                if (!isFormFieldValid(key, value, formDetails)) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * get form validation details
     *
     * @param cfName           content fragment name
     * @param cfLocale         content fragment locale
     * @param resourceResolver resourceResolver
     * @return form details
     */
    private JSONObject getValidationDetails(String cfName, String cfLocale, ResourceResolver resourceResolver) {
        JSONObject formDetails = null;
        try {
            //Check for missing config
            final String configFilePath = mailConfig.getValidationsPath().concat(validationNodePath);
            LOG.debug("Request validation config file path {} ", configFilePath);

            final JSONObject configJSON = getJsonFromFile(resourceResolver, configFilePath);
            if (configJSON.length() > 0) {//Check if region has any validations declared
                LOG.debug("Request validation config file exists");
                String formRegion = null;
                if (cfLocale.contains("/")) {
                    StringTokenizer strLocale = new StringTokenizer(cfLocale);
                    formRegion = strLocale.nextToken("/");
                }
                if (null != formRegion) {
                    final String validationFilePath = configJSON.optString(formRegion);
                    LOG.debug("Request region validation file path {} ", validationFilePath);

                    if (null != validationFilePath) {
                        final JSONObject regionJSON = getJsonFromFile(resourceResolver, validationFilePath.concat(validationNodePath));
                        if (regionJSON.length() > 0) {//Check if form has any validations declared
                            LOG.debug("Request validation file exists");
                            formDetails = regionJSON.optJSONObject(cfName);
                        }
                    }
                }
            }
        } catch (NoSuchMethodError e) {
            LOG.error("Exception occurred in validation file :: NoSuchMethodError {}", e.getMessage(), e);
        }
        return formDetails;
    }

    /**
     * Check if all mandatory params exists in request
     *
     * @param formDetails       validation details
     * @param requestParameters input params
     * @return isValid
     */
    private boolean isMandatoryValid(JSONObject formDetails, Map<String, String> requestParameters) {
        try {
            JSONArray mandatoryFields = formDetails.optJSONArray("mandatoryFields");
            for (int i = 0; i < mandatoryFields.length(); i++) {
                String mandatoryKey = mandatoryFields.getString(i);
                String paramValue = requestParameters.getOrDefault(mandatoryKey, "NA");
                if (paramValue.equals("NA") || paramValue.trim().length() == 0) {
                    return false;
                }
            }
        } catch (JSONException e) {
            LOG.error("Exception occurred in validation file :: JSONException {}", e.getMessage(), e);
        }
        return true;
    }

    /**
     * Custom field validations declared in validation file
     *
     * @param key         request param key
     * @param value       request param value
     * @param formDetails validations declared for the input field
     * @return isValid
     */
    private boolean isFormFieldValid(String key, String value, JSONObject formDetails) {
        String filterRegex = formDetails.optString("filterRegex");
        if (null != filterRegex && hasInvalidChars(value, filterRegex)) {
            return false;
        }

        JSONObject fieldDetails = formDetails.optJSONObject(key);
        LOG.debug("Request param and validation {} :: {} :: {}", key, value, fieldDetails);

        if (null != fieldDetails && fieldDetails.length() > 0) {
            int minLength = fieldDetails.optInt("minLength", -1);
            int maxLength = fieldDetails.optInt("maxLength", -1);
            if ((minLength > 0 && value.length() < minLength) || (maxLength > 0 && value.length() > maxLength)) {
                return false;
            }
            String regexPattern = fieldDetails.optString("regex", "NA");
            return regexPattern.equals("NA") || isValidPattern(regexPattern, value);
        }
        return true;
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
     * perform regex validation
     *
     * @param value Param value
     * @return isMatches
     */
    private static boolean isValidPattern(String pattern, String value) {
        LOG.debug("Request param regex validation {} :: {}", pattern, value);
        return Pattern.compile(pattern)
                .matcher(value)
                .matches();
    }

    /**
     * perform regex validation
     *
     * @param value Param value
     * @return isMatches
     */
    private static boolean hasInvalidChars(String value, String filterRegex) {
        return Pattern.compile(filterRegex)
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

     private static boolean ishoneyPotFieldEmpty(HashMap<String, String> requestParameters) {
        final String honeyPotFieldPhone = requestParameters.get("cmp-alertnate-phone-number");
        final String honeyPotFieldEmail = requestParameters.get("cmp-alertnate-email");
        return (null != honeyPotFieldPhone || null != honeyPotFieldEmail);
     }

}