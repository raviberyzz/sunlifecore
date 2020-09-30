/*
 *
 */

package ca.sunlife.web.cms.core.services.impl;

import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.mustachejava.DefaultMustacheFactory;
import com.github.mustachejava.Mustache;
import com.github.mustachejava.MustacheFactory;

import ca.sunlife.web.cms.core.constants.ProviderProfileConstants;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.osgi.config.ProviderProfileConfig;
import ca.sunlife.web.cms.core.services.ProviderProfileService;
import ca.sunlife.web.cms.core.services.RestService;

/**
 * The Class ProviderProfileServiceImpl.
 *
 * @author TCS
 * @version 1.0
 */
@ Component (service = { ProviderProfileService.class }, immediate = true)
@ Designate (ocd = ProviderProfileConfig.class)
public class ProviderProfileServiceImpl implements ProviderProfileService {

  /** The logger. */
  private static final Logger LOG = LoggerFactory.getLogger(ProviderProfileServiceImpl.class);

  /** The provider profile config. */
  private ProviderProfileConfig providerProfileConfig;

  /** The rest service. */
  @ Reference
  private RestService restService;

  /**
   * Activate.
   *
   * @param profileConfig
   *          the provider profile config
   */
  @ Activate
  public void activate(ProviderProfileConfig profileConfig) {
    this.providerProfileConfig = profileConfig;
    LOG.debug("ProviderProfileServiceImpl :: activate :: ProviderProfileServiceUrl: {} ",
        this.providerProfileConfig.getProviderProfileServiceUrl());
  }

  /*
   * (non-Javadoc)
   * @see ca.sunlife.web.cms.core. services. ProviderProfileService# getProviderProfile(java.
   * lang.String, java.lang.String, java.lang.String)
   */
  @ Override
  public String getProviderProfile(final String locale, final String pageNo,
      final String mustachTemplate) throws ApplicationException, SystemException, IOException {
    LOG.debug(
        "Entry :: ProviderProfileServiceImpl :: getProviderProfile :: locale :: {}, pageNo :: {}",
        locale, pageNo);
    final StringBuilder url = new StringBuilder(
        providerProfileConfig.getProviderProfileServiceUrl());
    url.append("?");
    final Map <String, String> queryParameterMap = getQueryParameters(pageNo);

    if (null != queryParameterMap && queryParameterMap.size() > 0) {
      if (queryParameterMap.containsKey("distance")) {
      	queryParameterMap.remove("distance");
      }
      if (queryParameterMap.containsKey("position")) {
      	queryParameterMap.remove("position");
      }
    }
    if (null != queryParameterMap && queryParameterMap.size() > 0) {
      queryParameterMap.forEach((key, value) -> url.append(key + "=" + value + "&"));
    }
    url.append(ProviderProfileConstants.LOCALE_CONSTANT + "=" + locale);
    LOG.debug("New provider profile url :: {}", url);
    final String providerProfileResponse = restService.callGetWebService(url.toString(), null);
    LOG.debug("providerProfileResponse :: {}", providerProfileResponse);
    if (null != providerProfileResponse && providerProfileResponse.length() > 0) {
    	@ SuppressWarnings ("unchecked")
      final HashMap <String, Object> profileDataMap = new ObjectMapper()
          .readValue(providerProfileResponse, HashMap.class);
      final MustacheFactory mf = new DefaultMustacheFactory();
      final StringWriter writer = new StringWriter();
      final Mustache mustache = mf.compile(new StringReader(mustachTemplate), " ");
      mustache.execute(writer, profileDataMap);
      return writer.toString().replace("&amp;", "&");
    }
    return null;
  }

  /**
   * Gets the query parameters.
   *
   * @param queryString
   *          the query string
   * @return the query parameters
   */
  private Map <String, String> getQueryParameters(final String queryString) {
    LOG.debug("Entry :: ProviderProfileServiceImpl :: getQueryParameters :: queryString :: {}",
        queryString);
    Map <String, String> queryParamMap = null;
    if (null != queryString) {
      queryParamMap = new HashMap <>();
      final String [ ] parameterArray = queryString
          .split(ProviderProfileConstants.WEB_PARAM_FORMAT_DELIMETER_CONSTANT);
      for (final String parameter : parameterArray) {
        final String [ ] actualParameterArray = parameter
            .split(ProviderProfileConstants.WEB_PARAM_KEY_DELIMETER_CONSTANT);
        if ( actualParameterArray.length > 1 ) {
        	queryParamMap.put(actualParameterArray [ 0 ], actualParameterArray [ 1 ]);
        }
      }
    }
    LOG.info("ProviderProfileServiceImpl :: queryParamMap :: {}", queryParamMap);
    LOG.debug("Exit :: ProviderProfileServiceImpl :: getQueryParameters :: queryParamMap :: {}",
        queryParamMap);
    return queryParamMap;
  }

}
