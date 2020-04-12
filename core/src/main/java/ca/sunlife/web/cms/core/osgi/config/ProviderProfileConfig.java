package ca.sunlife.web.cms.core.osgi.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

/**
 * The Interface
 * ProviderProfileConfig.
 */
@ObjectClassDefinition(name = "Provider profile configuration", description = "Provider profile configuration")
public @interface ProviderProfileConfig {

	/**
	 * provider profile service
	 * url.
	 *
	 * @return the provider
	 *         profile service url
	 */
	@AttributeDefinition(name = "providerProfileServiceUrl", description = "Provider profile service URL", defaultValue = "http://dev-mbrconsumer.ca.sunlife/healthcommunity/pub/req/providersearch/providerProfile")
	String getProviderProfileServiceUrl();

	/**
	 * gets the list of all
	 * provider profile service
	 * parameters.
	 * 
	 * @return the ist of all
	 *         provider profile
	 *         service parameters
	 */
	@AttributeDefinition(name = "providerProfileServiceParameters", description = "Provider profile service parameter", type = AttributeType.STRING)
	String[] getProviderProfileServiceParameters();

}
