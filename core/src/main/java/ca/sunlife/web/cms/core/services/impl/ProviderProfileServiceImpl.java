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
 * @author mo92 The Class
 *         ProviderProfileServiceImpl.
 */
@Component(service = { ProviderProfileService.class }, immediate = true)
@Designate(ocd = ProviderProfileConfig.class)
public class ProviderProfileServiceImpl implements ProviderProfileService {
	/**
	 * The logger.
	 */
	private final Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * The ProviderProfileConfig
	 * object.
	 */
	private ProviderProfileConfig providerProfileConfig;

	/** The rest service. */
	@Reference
	private RestService restService;

	/**
	 * Activates the provider
	 * profile config.
	 * 
	 * @param providerProfileConfig
	 *            the provider
	 *            profile config
	 */
	@Activate
	public void activate(final ProviderProfileConfig providerProfileConfig) {
		this.providerProfileConfig = providerProfileConfig;
		logger.debug("ProviderProfileServiceImpl :: activate :: ProviderProfileServiceUrl: {} ", this.providerProfileConfig.getProviderProfileServiceUrl());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * ca.sunlife.web.cms.core.
	 * services.
	 * ProviderProfileService#
	 * getProviderProfile(java.
	 * lang.String,
	 * java.lang.String,
	 * java.lang.String)
	 */
	@Override
	public String getProviderProfile(String locale, String pageNo, String mustachTemplate) throws ApplicationException, SystemException,
	                                                                                                                        IOException {
		logger.debug("Entry :: ProviderProfileServiceImpl :: getProviderProfile :: locale :: {}, pageNo :: {}", locale, pageNo);
		StringBuilder url = new StringBuilder(providerProfileConfig.getProviderProfileServiceUrl());
		url.append("?");
		Map<String, String> queryParameterMap = getQueryParameters(pageNo);

		if (null != queryParameterMap && queryParameterMap.size() > 0) {
			queryParameterMap.forEach((key, value) -> url.append(key + "=" + value + "&"));
		}
		url.append(ProviderProfileConstants.LOCALE_CONSTANT + "=" + locale);
		logger.debug("provider profile url :: {}", url);
		String providerProfileResponse = restService.callGetWebService(url.toString());
		logger.debug("providerProfileResponse :: {}", providerProfileResponse);
		@SuppressWarnings("unchecked")
		HashMap<String, Object> profileDataMap = new ObjectMapper().readValue(providerProfileResponse, HashMap.class);
		MustacheFactory mf = new DefaultMustacheFactory();
		StringWriter writer = new StringWriter();
		Mustache mustache = mf.compile(new StringReader(mustachTemplate), " ");
		mustache.execute(writer, profileDataMap);
		return writer.toString().replace("&amp;", "&");
	}

	/**
	 * Fetches query parameters
	 * 
	 * @param queryString
	 * @return
	 */
	private Map<String, String> getQueryParameters(String queryString) {
		logger.debug("Entry :: ProviderProfileServiceImpl :: getQueryParameters :: queryString :: {}", queryString);
		Map<String, String> queryParamMap = null;
		if (null != queryString) {
			queryParamMap = new HashMap<>();
			String[] parameterArray = queryString.split(ProviderProfileConstants.WEB_PARAM_FORMAT_DELIMETER_CONSTANT);
			for (String parameter : parameterArray) {
				String[] actualParameterArray = parameter.split(ProviderProfileConstants.WEB_PARAM_KEY_DELIMETER_CONSTANT);
				queryParamMap.put(actualParameterArray[0], actualParameterArray[1]);
			}
		}
		logger.info("ProviderProfileServiceImpl :: queryParamMap :: {}", queryParamMap);
		logger.debug("Exit :: ProviderProfileServiceImpl :: getQueryParameters :: queryParamMap :: {}", queryParamMap);
		return queryParamMap;
	}

}
