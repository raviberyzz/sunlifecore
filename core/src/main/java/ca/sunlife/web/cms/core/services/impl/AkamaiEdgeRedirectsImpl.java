/**
 * 
 */
package ca.sunlife.web.cms.core.services.impl;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.LockSupport;

import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.akamai.edgegrid.signer.ClientCredential;
import com.akamai.edgegrid.signer.apachehttpclient.ApacheHttpClientEdgeGridInterceptor;
import com.akamai.edgegrid.signer.apachehttpclient.ApacheHttpClientEdgeGridRoutePlanner;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.ErrorCodes;
import ca.sunlife.web.cms.core.osgi.config.AkamaiEdgeRedirectsConfig;
import ca.sunlife.web.cms.core.services.AkamaiEdgeRedirects;

/**
 * The Class AkamaiEdgeRedirectsImpl.
 *
 * @author TCS
 */
@ Component (service = AkamaiEdgeRedirects.class, immediate = true)
@ Designate (ocd = AkamaiEdgeRedirectsConfig.class)
public class AkamaiEdgeRedirectsImpl implements AkamaiEdgeRedirects {

  /** The Constant FAIL. */
  private static final String FAIL = "Fail";

  /** The Constant SUCCESS. */
  private static final String SUCCESS = "Success";

  /** The Constant CONTENT_TYPE. */
  private static final String CONTENT_TYPE = "Content-type";

  /** The Constant APPLICATION_JSON. */
  private static final String APPLICATION_JSON = "application/json";

  /** The Constant ACCEPT. */
  private static final String ACCEPT = "Accept";

  /** The Constant CLOUDLETS_API_V2_POLICIES. */
  private static final String CLOUDLETS_API_V2_POLICIES = "/cloudlets/api/v2/policies/";

  /** The Constant ERROR_STR. */
  private static final String ERROR_STR = "error";

  /** The config. */
  private AkamaiEdgeRedirectsConfig config;

  /** The Constant LOGGER. */
  private static final Logger LOGGER = LoggerFactory.getLogger(AkamaiEdgeRedirectsImpl.class);

  /** The Constant PROTOCOL. */
  private static final String PROTOCOL = "https://";

  /** The client. */
  private CloseableHttpClient client;
  
  /** The Constant THREAD_SLEEP_TIME. */
  private static final int THREAD_SLEEP_TIME = 1000;

  /**
   * Activate.
   *
   * @param initConfig
   *          the config
   */
  @ Activate
  public void activate(final AkamaiEdgeRedirectsConfig initConfig) {
    LOGGER.debug("Entry :: activate method of AkamaiCacheClearImpl");
    this.config = initConfig;
    final PoolingHttpClientConnectionManager connManager = new PoolingHttpClientConnectionManager();
    // Set the maximum number of connections in the pool
    connManager.setMaxTotal(100);
    // Create a ClientBuilder Object by setting the connection manager
    HttpClientBuilder clientbuilder = HttpClients.custom().setConnectionManager(connManager);

    final RequestConfig reqConfig = RequestConfig.custom()
        .setConnectTimeout(config.getConnectionTimeout())
        .setConnectionRequestTimeout(config.getConnectionTimeout())
        .setSocketTimeout(config.getSocketTimeout()).build();
    final ClientCredential clientCredential = ClientCredential.builder()
        .accessToken(config.getAccessKey()).clientToken(config.getClientToken())
        .clientSecret(config.getClientSecret()).host(config.getHost()).build();
    client = clientbuilder
        .addInterceptorFirst(new ApacheHttpClientEdgeGridInterceptor(clientCredential))
        .setConnectionManager(connManager)
        .setDefaultRequestConfig(reqConfig)
        .setRoutePlanner(new ApacheHttpClientEdgeGridRoutePlanner(clientCredential)).build();
    LOGGER.info("Got akamai host {}", config.getHost());
    LOGGER.debug("Exit :: activate method of AkamaiCacheClearImpl");
  }

  /* (non-Javadoc)
   * @see ca.sunlife.web.cms.core.services.AkamaiEdgeRedirects#publishRules(java.lang.String, java.lang.String)
   */
  public JSONObject publishRules(String policyID, String rules) throws JSONException {
    JSONObject returnJson = new JSONObject();
    if (StringUtils.isBlank(policyID)) {
      return returnJson.put(ERROR_STR, "Invalid Policy ID");
    }
    if (StringUtils.isBlank(policyID)) {
      return returnJson.put(ERROR_STR, "No rules provided");
    }
    try {
      String latestVersion = getOrCreateVersion(policyID);
      returnJson = createOrUpdateRules(policyID, latestVersion, rules);
      LockSupport.parkNanos(TimeUnit.MILLISECONDS.toNanos(THREAD_SLEEP_TIME));
      returnJson.put("publishStatus", activateRules(policyID, latestVersion));
    } catch (ApplicationException e) {
      LOGGER.error("Got Application exception", e);
      return returnJson.put(ERROR_STR, e.getMessage());
    }
    return returnJson;
  }

  /**
   * Activate rules.
   *
   * @param policyID
   *          the policy ID
   * @param latestVersion
   *          the latest version
   * @return the string
   */
  private String activateRules(String policyID, String latestVersion) {
    try {
      final HttpPost activateVersion = new HttpPost(
          PROTOCOL.concat(config.getHost()).concat(CLOUDLETS_API_V2_POLICIES).concat(policyID)
              .concat("/versions/").concat(latestVersion).concat("/activations"));
      LOGGER.debug("Activate version {}", activateVersion.getURI());
      activateVersion.setHeader(ACCEPT, APPLICATION_JSON);
      activateVersion.setHeader(CONTENT_TYPE, APPLICATION_JSON);
      JSONObject activateVersionRequestBody = new JSONObject();
      activateVersionRequestBody.put("network", "production");
      activateVersion.setEntity(new StringEntity(activateVersionRequestBody.toString()));
      final CloseableHttpResponse activateVersionResponse = client.execute(activateVersion);
      LOGGER.debug("Got AKAMAI response code {} while activating policy ", activateVersionResponse.getStatusLine().getStatusCode());
      String activateResponse = IOUtils.toString(activateVersionResponse.getEntity().getContent(),
          StandardCharsets.UTF_8);
      LOGGER.debug("Response {}", activateResponse);
      if (activateVersionResponse.getStatusLine().getStatusCode() != HttpStatus.SC_OK) {
        activateVersionResponse.close();
        return FAIL;
      }
      activateVersionResponse.close();
    } catch (JSONException | IOException e) {
      LOGGER.error("Unable to create rule ", e);
      return FAIL;
    }
    return SUCCESS;
  }

  /**
   * Creates the or update rules.
   *
   * @param policyID
   *          the policy ID
   * @param latestVersion
   *          the latest version
   * @param rules
   *          the rules
   * @return the JSON object
   * @throws ApplicationException
   *           the application exception
   */
  private JSONObject createOrUpdateRules(String policyID, String latestVersion, String rules)
      throws ApplicationException {
    JSONObject returnJson = new JSONObject();
    try {
      JSONArray rewriteRules = new JSONArray(rules);
      final String api = PROTOCOL.concat(config.getHost()).concat(CLOUDLETS_API_V2_POLICIES)
          .concat(policyID).concat("/versions/").concat(latestVersion);
      final HttpGet getRules = new HttpGet(api.concat("?omitRules=false"));
      getRules.setHeader(ACCEPT, APPLICATION_JSON);
      getRules.setHeader(CONTENT_TYPE, APPLICATION_JSON);
      final CloseableHttpResponse rulesResponse = client.execute(getRules);
      LOGGER.debug("Got AKAMAI response code {}", rulesResponse.getStatusLine().getStatusCode());
      final String rulesContent = IOUtils.toString(rulesResponse.getEntity().getContent(),
          StandardCharsets.UTF_8);
      LOGGER.debug("Got createOrUpdate response {} ", rulesContent);
      if (rulesResponse.getStatusLine().getStatusCode() != HttpStatus.SC_OK) {
        rulesResponse.close();
        throw new ApplicationException(ErrorCodes.APP_ERROR_202);
      }
      JSONObject jsonObj = new JSONObject(rulesContent);
      JSONArray matchRules = jsonObj.getJSONArray("matchRules");
      rulesResponse.close();
      for (int i = 0 ; i < rewriteRules.length() ; i++ ) {
        JSONObject rule = rewriteRules.getJSONObject(i);
        String state = rule.getString("state");
        String name = rule.getString("name");
        boolean ruleUpdatedFlag = false;
        for (int index = 0 ; index < matchRules.length() ; index++ ) {
          JSONObject match = matchRules.getJSONObject(index);
          if (match.getString("name").equalsIgnoreCase(name)) {
            String akaRuleId = match.getString("akaRuleId");
            if (state.equalsIgnoreCase("delete")) {
              returnJson.put(name,
                  updateRule(rule, api.concat("/rules/").concat(akaRuleId), true));
            } else {
              returnJson.put(name,
                  updateRule(rule, api.concat("/rules/").concat(akaRuleId), false));
            }
            ruleUpdatedFlag = true;
            break;
          }
        }
        if (! ruleUpdatedFlag && ! state.equalsIgnoreCase("delete")) {
          returnJson.put(name, createRule(rule, api));
        }
      }
    } catch (JSONException | IOException e) {
      throw new ApplicationException(ErrorCodes.APP_ERROR_202, e);
    }
    return returnJson;
  }

  /**
   * Creates the rule.
   *
   * @param rule
   *          the rule
   * @param api
   *          the api
   * @return the string
   */
  private String createRule(JSONObject rule, String api) {
    try {
      final HttpPost createRule = new HttpPost(api.concat("/rules?index=1"));
      createRule.setHeader(ACCEPT, APPLICATION_JSON);
      createRule.setHeader(CONTENT_TYPE, APPLICATION_JSON);
      JSONObject createRuleRequestBody = new JSONObject();
      JSONArray matchesArr = new JSONArray();
      JSONObject match = new JSONObject();
      match.put("name", rule.getString("name"));
      match.put("type", "erMatchRule");
      match.put("start", 0);
      match.put("end", 0);
      match.put("id", 0);
      match.put("matchURL", rule.getString("source"));
      match.put("redirectURL", rule.getString("destination"));
      match.put("useIncomingQueryString", true);
      match.put("statusCode", 301);
      matchesArr.put(match);
      createRuleRequestBody.put("matches", matchesArr);
      createRule.setEntity(new StringEntity(match.toString()));
      LOGGER.debug("Create Rule {}", createRuleRequestBody);
      final CloseableHttpResponse createRuleResponse = client.execute(createRule);
      LOGGER.debug("Got AKAMAI response code {} while creating rule",
          createRuleResponse.getStatusLine().getStatusCode());
      final String createRuleContent = IOUtils.toString(createRuleResponse.getEntity().getContent(),
          StandardCharsets.UTF_8);
      LOGGER.debug("Got response {} ", createRuleContent);
      if (createRuleResponse.getStatusLine().getStatusCode() == HttpStatus.SC_CREATED) {
        createRuleResponse.close();
        return "Faile";
      }
      createRuleResponse.close();
    } catch (JSONException | IOException e) {
      LOGGER.error("Unable to create rule ", e);
      return FAIL;
    }
    return SUCCESS;
  }

  /**
   * Update rule.
   *
   * @param rule
   *          the rule
   * @param api
   *          the api
   * @param disabled
   *          the disabled
   * @return the string
   */
  private String updateRule(JSONObject rule, String api, boolean disabled) {
    try {
      final HttpPut updateRule = new HttpPut(api);
      updateRule.setHeader(ACCEPT, APPLICATION_JSON);
      updateRule.setHeader(CONTENT_TYPE, APPLICATION_JSON);
      JSONObject updateRuleRequestBody = new JSONObject();
      JSONArray matchesArr = new JSONArray();
      JSONObject match = new JSONObject();
      match.put("name", rule.getString("name"));
      match.put("type", "erMatchRule");
      match.put("start", 0);
      match.put("end", 0);
      match.put("id", 0);
      match.put("matchURL", rule.getString("source"));
      match.put("redirectURL", rule.getString("destination"));
      match.put("useIncomingQueryString", true);
      match.put("disabled", disabled);
      match.put("statusCode", 301);
      matchesArr.put(match);
      updateRuleRequestBody.put("matches", matchesArr);
      updateRule.setEntity(new StringEntity(match.toString()));
      LOGGER.debug("Update Rule {}", updateRuleRequestBody);
      final CloseableHttpResponse updateRuleResponse = client.execute(updateRule);
      LOGGER.debug("Got AKAMAI response code for update rule {} ",
          updateRuleResponse.getStatusLine().getStatusCode());
      final String updateRuleContent = IOUtils.toString(updateRuleResponse.getEntity().getContent(),
          StandardCharsets.UTF_8);
      LOGGER.debug("Got response {} ", updateRuleContent);
      if (updateRuleResponse.getStatusLine().getStatusCode() != HttpStatus.SC_OK) {
        updateRuleResponse.close();
        return FAIL;
      }
      updateRuleResponse.close();
    } catch (JSONException | IOException e) {
      LOGGER.error("Unable to update rule ", e);
      return FAIL;
    }
    return SUCCESS;
  }

  /**
   * Gets the or create version.
   *
   * @param policyID
   *          the policy ID
   * @return the or create version
   * @throws ApplicationException
   *           the application exception
   */
  private String getOrCreateVersion(String policyID) throws ApplicationException {
    try {
      final HttpGet versions = new HttpGet(
          PROTOCOL.concat(config.getHost()).concat(CLOUDLETS_API_V2_POLICIES).concat(policyID)
              .concat("/versions?includeRules=false&pageSize=1"));
      LOGGER.debug("Got versions path {}", versions.getURI());
      versions.setHeader(ACCEPT, APPLICATION_JSON);
      versions.setHeader(CONTENT_TYPE, APPLICATION_JSON);
      CloseableHttpResponse versionsResponse;
      versionsResponse = client.execute(versions);
      LOGGER.debug("Got AKAMAI response code {}", versionsResponse.getStatusLine().getStatusCode());
      final String versionsContent = IOUtils.toString(versionsResponse.getEntity().getContent(),
          StandardCharsets.UTF_8);
      LOGGER.debug("Got AKAMAI versions Response {}",versionsContent);
      if (versionsResponse.getStatusLine().getStatusCode() != HttpStatus.SC_OK) {
        versionsResponse.close();
        throw new ApplicationException(ErrorCodes.APP_ERROR_201);
      }
      versionsResponse.close();
      String version = "";
      if (versionsContent.startsWith("[")) {
        JSONArray jsonArr = new JSONArray(versionsContent);
        JSONObject versionJson = jsonArr.getJSONObject(0);
        version = String.valueOf(versionJson.getInt("version"));
        if (versionJson.has("rulesLocked") && versionJson.getBoolean("rulesLocked")) {
          return createPolicyVersion(policyID, version);
        }
      } else {
        throw new ApplicationException(ErrorCodes.APP_ERROR_201);
      }
      return version;
    } catch (IOException | JSONException e) {
      throw new ApplicationException(ErrorCodes.APP_ERROR_201, e);
    }
  }

  /**
   * Creates the policy version.
   *
   * @param policyID
   *          the policy ID
   * @param version
   *          the version
   * @return the string
   * @throws ApplicationException
   *           the application exception
   */
  private String createPolicyVersion(String policyID, String version) throws ApplicationException {
    try {
      final HttpPost createVersion = new HttpPost(
          PROTOCOL.concat(config.getHost()).concat(CLOUDLETS_API_V2_POLICIES).concat(policyID)
              .concat("/versions?cloneVersion=" + version));
      createVersion.setHeader(ACCEPT, APPLICATION_JSON);
      createVersion.setHeader(CONTENT_TYPE, APPLICATION_JSON);
      JSONObject createVersionRequestBody = new JSONObject();
      createVersionRequestBody.put("description", "Created based on version : " + version);
      createVersion.setEntity(new StringEntity(createVersionRequestBody.toString()));

      final CloseableHttpResponse createVersionResponse = client.execute(createVersion);
      LOGGER.debug("Got AKAMAI response code while creating version {} ",
          createVersionResponse.getStatusLine().getStatusCode());
      final String createVersionContent = IOUtils
          .toString(createVersionResponse.getEntity().getContent(), StandardCharsets.UTF_8);
      LOGGER.debug("Got akamai response {}", createVersionContent);
      if (createVersionResponse.getStatusLine().getStatusCode() != HttpStatus.SC_CREATED) {
        createVersionResponse.close();
        throw new ApplicationException(ErrorCodes.APP_ERROR_201);
      }
      JSONObject jsonObj = new JSONObject(createVersionContent);
      createVersionResponse.close();
      return String.valueOf(jsonObj.getInt("version"));
    } catch (IOException | JSONException e) {
      throw new ApplicationException(ErrorCodes.APP_ERROR_201, e);
    }
  }

}
