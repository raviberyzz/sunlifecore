/**
 * 
 */
package ca.sunlife.web.cms.core.osgi.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

/**
 * @author mo92
 * The Interface AdvisorWebServiceConfig
 */
@ObjectClassDefinition(name = "Advisor Web Service Configuration", description = "Advisor Web Service Configuration")
public @interface AdvisorWebServiceConfig {

	@AttributeDefinition(name = "getAdvisorPageDataUrl", description = "Get Advisor Page Data URL", defaultValue = "http://uat-bls.clarica.com/WebServices/AdvisorWebPageWS/Service.svc/JSON/GetAdvisorPageData")
	String getAdvisorPageDataUrl();
	
}
