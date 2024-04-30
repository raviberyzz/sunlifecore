/*
 *
 */

package ca.sunlife.web.cms.core.osgi.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.osgi.service.metatype.annotations.Option;

/**
 * The Interface AkamaiConfig.
 *
 * @author TCS
 * @version 1.0
 */
@ ObjectClassDefinition (name = "Sun Life - Akamai Edge Redirects Configuration", description = "Sun Life Akamai Edge Redirects Configuration")
public @interface AkamaiEdgeRedirectsConfig {

  /**
   * Gets the host.
   *
   * @return the host
   */
  @ AttributeDefinition (name = "host", description = "Akamai Host")
  String getHost ();
  
  /**
   * Gets the environment.
   *
   * @return the environment
   */
  @AttributeDefinition(
      name = "Environment",
      description = "Select akamai environment",
      options = {
          @Option(label = "PRODUCTION", value = "production"),
          @Option(label = "STAGING", value = "staging")
      }
  )
  String getEnvironment() default "production";

  /**
   * Gets the access key.
   *
   * @return the access key
   */
  @ AttributeDefinition (name = "accessKey", description = "Access Key")
  String getAccessKey ();

  /**
   * Gets the client secret.
   *
   * @return the client secret
   */
  @ AttributeDefinition (name = "clientSecret", description = "Client Secret")
  String getClientSecret ();

  /**
   * Gets the client token.
   *
   * @return the client token
   */
  @ AttributeDefinition (name = "clientToken", description = "Client Token")
  String getClientToken ();
  
  /**
   * Gets the socket timeout.
   *
   * @return the socket timeout
   */
  @ AttributeDefinition (name = "socketTimeout", description = "Socket Timeout")
  int getSocketTimeout () default 300000;

  /**
   * Gets the connection timeout.
   *
   * @return the connection timeout
   */
  @ AttributeDefinition (name = "connectionTimeout", description = "Connection Timeout")
  int getConnectionTimeout () default 300000;
}
