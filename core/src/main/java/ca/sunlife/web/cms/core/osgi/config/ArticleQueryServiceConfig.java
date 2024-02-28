package ca.sunlife.web.cms.core.osgi.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

/**
 * The Interface AdvisorWebServiceConfig.
 *
 * @author TCS
 * @version 1.0
 */
@ ObjectClassDefinition (name = "Sun Life - Advisor Web Service Configuration", description = "Article Query Service Configuration")
public @interface ArticleQueryServiceConfig {

  /**
   * Gets the advisor page data url.
   *
   * @return the advisor page data url
   */
  @ AttributeDefinition (name = "getAdvisorPageDataUrl", description = "Get Advisor Page Data URL", defaultValue = "http://uat-bls.clarica.com/WebServices/AdvisorWebPageWS/Service.svc/JSON/GetAdvisorPageData")
  String getAdvisorPageDataUrl ();

}