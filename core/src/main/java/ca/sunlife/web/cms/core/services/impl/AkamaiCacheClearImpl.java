/*
 *
 */

package ca.sunlife.web.cms.core.services.impl;

import java.io.IOException;
import java.util.Collection;
import java.util.Map;

import javax.jcr.RepositoryException;

import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.lang.StringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.jackrabbit.oak.commons.IOUtils;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.akamai.edgegrid.signer.ClientCredential;
import com.akamai.edgegrid.signer.apachehttpclient.ApacheHttpClientEdgeGridInterceptor;
import com.akamai.edgegrid.signer.apachehttpclient.ApacheHttpClientEdgeGridRoutePlanner;
import com.day.cq.wcm.commons.ReferenceSearch;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.ErrorCodes;
import ca.sunlife.web.cms.core.osgi.config.AkamaiConfig;
import ca.sunlife.web.cms.core.services.AkamaiCacheClear;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * The Class AkamaiCacheClearImpl.
 *
 * @author TCS
 * @version 1.0
 */
@ Component (service = AkamaiCacheClear.class, immediate = true)
@ Designate (ocd = AkamaiConfig.class)
public class AkamaiCacheClearImpl implements AkamaiCacheClear {

  /** The Constant DOMAIN. */
  private static final String DOMAIN = "domain";

  /** The config. */
  private AkamaiConfig config;

  /** The config service. */
  @ Reference
  private SiteConfigService configService;

  /** The core resource resolver. */
  @ Reference
  private CoreResourceResolver coreResourceResolver;

  /** The Constant INVALIDATE_API. */
  private static final String INVALIDATE_API = "/ccu/v3/invalidate/url/";

  /** The Constant PROTOCOL. */
  private static final String PROTOCOL = "https://";

  /** The Constant LOGGER. */
  private static final Logger LOGGER = LoggerFactory.getLogger(AkamaiCacheClearImpl.class);

  /**
   * Activate.
   *
   * @param config
   *          the config
   */
  @ Activate
  public void activate(final AkamaiConfig config) {
    LOGGER.debug("Entry :: activate method of AkamaiCacheClearImpl");
    this.config = config;
    LOGGER.info("Got akamai host {}", config.getHost());
    LOGGER.debug("Exit :: activate method of AkamaiCacheClearImpl");
  }

  /*
   * (non-Javadoc)
   * @see ca.sunlife.web.cms.core.services.AkamaiCacheClear#invalidatePages(java.lang.String[])
   */
  @ Override
  public String invalidatePages(final String [ ] paths) throws ApplicationException {
    LOGGER.debug("Entry :: invalidatePages method of AkamaiCacheClearImpl");
    final JSONObject request = new JSONObject();
    final JSONArray objects = new JSONArray();
    try {
      final ResourceResolver resourceResolver = coreResourceResolver.getResourceResolver();
      for (final String path : paths) {
        LOGGER.debug("Processing path {}", path);
        if (path.startsWith("/content/experience-fragments") && ! path.contains("header")
            && ! path.contains("footer")) {
          final Collection <ReferenceSearch.Info> searchResult = new ReferenceSearch()
              .search(resourceResolver, path).values();
          for (final ReferenceSearch.Info info : searchResult) {
            final String refPath = info.getPage().getPath();
            if (StringUtils.isNotBlank(configService.getConfigValues(DOMAIN, refPath))) {
              objects.put(configService.getPageUrl(refPath));
            }

          }
        } else if (StringUtils.isNotBlank(configService.getConfigValues(DOMAIN, path))) {
          objects.put(configService.getPageUrl(path));
        } else {
          LOGGER.warn("Not able to get domain for {}", path);
        }

      }
      if (objects.length() < 1) {
        return "No valid paths to purge";
      }
      request.put("objects", objects);
      return processAkamaiPurge(request.toString());
    } catch (JSONException | LoginException | RepositoryException e) {
      throw new ApplicationException(ErrorCodes.APP_ERROR_200, e);
    }
  }

  /**
   * Process akamai purge.
   *
   * @param jsonRequest
   *          the json request
   * @return the string
   * @throws ApplicationException
   *           the application exception
   */
  private String processAkamaiPurge(final String jsonRequest) throws ApplicationException {
    LOGGER.debug("Entry :: processAkamaiPurge method of AkamaiCacheClearImpl");
    try {
      final ClientCredential clientCredential = ClientCredential.builder()
          .accessToken(config.getAccessKey()).clientToken(config.getClientToken())
          .clientSecret(config.getClientSecret()).host(config.getHost()).build();
      final HttpClient client = HttpClientBuilder.create()
          .addInterceptorFirst(new ApacheHttpClientEdgeGridInterceptor(clientCredential))
          .setRoutePlanner(new ApacheHttpClientEdgeGridRoutePlanner(clientCredential)).build();
      final HttpPost httpPost = new HttpPost(
          PROTOCOL.concat(config.getHost()).concat(INVALIDATE_API).concat(config.getEnvironment()));
      final StringEntity entity = new StringEntity(jsonRequest);
      httpPost.setHeader("Accept", "application/json");
      httpPost.setHeader("Content-type", "application/json");
      httpPost.setEntity(entity);
      final HttpResponse response = client.execute(httpPost);
      LOGGER.debug("Got AKAMAI response code {}", response.getStatusLine().getStatusCode());
      if (response.getStatusLine().getStatusCode() != HttpStatus.SC_CREATED) {
        throw new ApplicationException(ErrorCodes.APP_ERROR_200);
      } else {
        final String content = IOUtils.readString(response.getEntity().getContent());
        LOGGER.debug(" AKAMAI Respose {}", content);
        return content;
      }
    } catch (final IOException e) {
      throw new ApplicationException(ErrorCodes.APP_ERROR_200, e);
    }
  }

  /*
   * (non-Javadoc)
   * @see ca.sunlife.web.cms.core.services.AkamaiCacheClear#invalidateAssets(java.lang.String[])
   */
  @ Override
  public String invalidateAssets(final String [ ] paths) throws ApplicationException {
    LOGGER.debug("Entry :: invalidateAssets method of AkamaiCacheClearImpl");
    try {
      final ResourceResolver resourceResolver = coreResourceResolver.getResourceResolver();
      final JSONObject request = new JSONObject();
      final JSONArray objects = new JSONArray();
      for (final String path : paths) {
        final Resource resource = resourceResolver.getResource(path);
        if (resource != null && ((String) resource.getValueMap()
            .getOrDefault(com.day.cq.commons.jcr.JcrConstants.JCR_PRIMARYTYPE, ""))
                .equalsIgnoreCase(com.day.cq.dam.api.DamConstants.NT_DAM_ASSET)) {
          final Map <String, ReferenceSearch.Info> searchResult = new ReferenceSearch()
              .search(resourceResolver, path);
          searchResult.forEach((key, reference) -> {
            try {
              final String domain = configService.getConfigValues(DOMAIN, reference.getPagePath());
              LOGGER.debug("Adding domain {}", domain.concat(path));
              if (StringUtils.isNotBlank(domain)) {
                objects.put(domain.concat(path));
              } else {
                LOGGER.warn("Not able to get the domain for asset {} and page {}", path,
                    reference.getPagePath());
              }

            } catch (LoginException | RepositoryException e) {
              LOGGER.error("Error while processing {} with exception {}", path, e);
            }
          });
        }
        resourceResolver.close();
      }
      if (objects.length() < 1) {
        return "No valid paths to purge";
      }
      request.put("objects", objects);
      return processAkamaiPurge(request.toString());
    } catch (LoginException | JSONException e) {
      throw new ApplicationException(ErrorCodes.APP_ERROR_200, e);
    }
  }

}
