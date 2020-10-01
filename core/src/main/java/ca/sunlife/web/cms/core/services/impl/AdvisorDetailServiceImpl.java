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
 * The Class AdvisorDetailServiceImpl.
 *
 * @author TCS
 * @version 1.0
 */
@ Component (service = AdvisorDetailService.class, immediate = true)
@ Designate (ocd = AdvisorWebServiceConfig.class)
public class AdvisorDetailServiceImpl implements AdvisorDetailService {

  /** The logger. */
  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  /** The rest service. */
  @ Reference
  private RestService restService;

  /** The advisor web service config. */
  private AdvisorWebServiceConfig advisorWebServiceConfig;

  /**
   * Activate.
   *
   * @param webServiceConfig
   *          the web service config
   */
  @ Activate
  public void activate(final AdvisorWebServiceConfig webServiceConfig) {
    advisorWebServiceConfig = webServiceConfig;
    logger.debug("advisorWebServiceConfig :: Advisor page data url: {}",
        webServiceConfig.getAdvisorPageDataUrl());
  }

  /*
   * (non-Javadoc)
   * @see ca.sunlife.web.cms.core.services.AdvisorDetailService#getAdvisorDetails(java. lang.String,
   * java.lang.String, java.lang.String)
   */
  @ Override
  public String getAdvisorDetails(final String language, final String pageId,
      final String advisorId) throws ApplicationException, SystemException {
    logger.debug(
        "Entry :: getAdvisorDetails method of AdvisorDetailServiceImpl :: language: {}, pageId: {}, advisorId: {}",
        language, pageId, advisorId);
    StringBuilder builder = null;
    try {
      builder = new StringBuilder();
      builder.append(advisorWebServiceConfig.getAdvisorPageDataUrl());
      builder.append("?");
      builder.append("language=" + language.toUpperCase(Locale.ROOT));
      builder.append("&pageId=" + pageId);
      builder.append("&encodedAdvisorId=" + advisorId);
      builder.append("&clientVersion=1.0");
      logger.debug("getAdvisorDetails url: {}", builder);
      return restService.callGetWebService(builder.toString(), null);
    } catch (final IOException e) {
      throw new ApplicationException(ErrorCodes.APP_ERROR_001, e);
    }
  }

}
