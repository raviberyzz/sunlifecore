/*
 *
 */

package ca.sunlife.web.cms.core.osgi.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

/**
 * The Interface ProviderProfileConfig.
 *
 * @author TCS
 * @version 1.0
 */
@ ObjectClassDefinition (name = "Sun Life - Provider profile configuration", description = "Provider profile configuration")
public @interface ProviderProfileConfig {

  /**
   * Gets the provider profile service url.
   *
   * @return the provider profile service url
   */
  @ AttributeDefinition (name = "providerProfileServiceUrl", description = "Provider profile service URL", defaultValue = "http://dev-mbrconsumer.ca.sunlife/healthcommunity/pub/req/providersearch/providerProfile")
  String getProviderProfileServiceUrl ();

  /**
   * Gets the provider profile service parameters.
   *
   * @return the provider profile service parameters
   */
  @ AttributeDefinition (name = "providerProfileServiceParameters", description = "Provider profile service parameter", type = AttributeType.STRING)
  String [ ] getProviderProfileServiceParameters ();

}
