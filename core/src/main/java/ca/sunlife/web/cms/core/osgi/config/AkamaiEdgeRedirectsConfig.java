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
  String getHost () default "akab-v7jr6pxagknzk3cq-bxnesmo7jwpebmrd.luna.akamaiapis.net";
  
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
  String getAccessKey () default "akab-o7f4jgrrf6jtl7mg-ay7aqph6telhmzqm";

  /**
   * Gets the client secret.
   *
   * @return the client secret
   */
  @ AttributeDefinition (name = "clientSecret", description = "Client Secret")
  String getClientSecret () default "uZIDq9QHLYY88GXQ8ZijRpnVNYk1lfrDLKczZkViXZE=";

  /**
   * Gets the client token.
   *
   * @return the client token
   */
  @ AttributeDefinition (name = "clientToken", description = "Client Token")
  String getClientToken () default "akab-riiprq6w6gs4jehm-7b5yjbp6qjm7bvbv";
  
  /**
   * Gets the socket timeout.
   *
   * @return the socket timeout
   */
  @ AttributeDefinition (name = "socketTimeout", description = "Socket Timeout")
  int getSocketTimeout () default 250000;

  /**
   * Gets the connection timeout.
   *
   * @return the connection timeout
   */
  @ AttributeDefinition (name = "connectionTimeout", description = "Connection Timeout")
  int getConnectionTimeout () default 250000;
}
