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
	String getFundFactsUrl();

	/**
	 * Gets the pichartURL.
	 *
	 * @return the pichartURL
	 */
	@ AttributeDefinition(name = "pichartURL", description = "PI chart URL", defaultValue = "https://www.sunlife.com.hk/slfcharts/genChart")
	String getPichartURL();

	/**
	 * Gets the barChartURL.
	 *
	 * @return the barChartURL
	 */
	@ AttributeDefinition(name = "barChartURL", description = "Bar chart URL", defaultValue = "https://www.sunlife.com.hk/slfcharts/genChart?ctype=bchart")
	String getBarChartURL();

}
