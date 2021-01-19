package ca.sunlife.web.cms.core.osgi.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

/**
 * The Interface FundFactPDFConfig.
 *
 * @author TCS
 * @version 1.0
 */
@ ObjectClassDefinition(name = "Sun Life - GIF - Fund Fact PDF configuration", description = "Sun Life - GIF - Fund Fact PDF configuration")
public @interface FundFactPDFConfig {

	/**
	 * Gets the fund facts service url.
	 *
	 * @return the fundFactsUrl
	 */
	@ AttributeDefinition(name = "fundFactsUrl", description = "Fund facts service URL", defaultValue = "http://sunlife.ca/indsegfundsservices/fundFacts.wca")
	String getfundFactsUrl();

}
