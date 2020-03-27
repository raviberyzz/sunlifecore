/**
 * 
 */
package ca.sunlife.web.cms.core.services.impl;

import java.io.IOException;
import java.util.Locale;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.ErrorCodes;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.osgi.config.AdvisorWebServiceConfig;
import ca.sunlife.web.cms.core.services.AdvisorDetailService;
import ca.sunlife.web.cms.core.services.RestService;

/**
 * @author mo92
 * The class AdvisorDetailServiceImpl
 */
@Component( service = AdvisorDetailService.class , immediate = true )
@Designate( ocd = AdvisorWebServiceConfig.class )
public class AdvisorDetailServiceImpl implements AdvisorDetailService {

	/** The log */
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	/** RestService injected */
	@Reference
	private RestService restService;
	
	/** Advisor WebService Config injected */
	private AdvisorWebServiceConfig advisorWebServiceConfig;
	
	/**
	 * Activate method
	 * @param webServiceConfig
	 */
	@Activate
	public void activate(AdvisorWebServiceConfig webServiceConfig) {
		this.advisorWebServiceConfig = webServiceConfig;
		logger.debug("advisorWebServiceConfig :: Advisor page data url: {}", webServiceConfig.getAdvisorPageDataUrl());
	}
	
	/* (non-Javadoc)
	 * @see ca.sunlife.web.cms.core.services.AdvisorDetailService#getAdvisorDetails(java.lang.String, java.lang.String, java.lang.String)
	 */
	@Override
	public String getAdvisorDetails(String language, String pageId, String advisorId) throws ApplicationException, SystemException {
		logger.debug("Entry :: getAdvisorDetails method of AdvisorDetailServiceImpl :: language: {}, pageId: {}, advisorId: {}", language, pageId, advisorId);
		StringBuilder builder = null;
		try {
			builder = new StringBuilder();
			builder.append(advisorWebServiceConfig.getAdvisorPageDataUrl());
			builder.append("?");
			builder.append("language="+language.toUpperCase(Locale.ROOT));
			builder.append("&pageId="+pageId);
			builder.append("&encodedAdvisorId="+advisorId);
			builder.append("&clientVersion=1.0");
			logger.debug("getAdvisorDetails url: {}", builder);
			return restService.callGetWebService(builder.toString());
		} catch (IOException e) {
			throw new ApplicationException(ErrorCodes.APP_ERROR_001, e);
		}
	}

}
