/*
 *
 */

package ca.sunlife.web.cms.core.osgi.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

/**
 * The Interface RestClientConfig.
 *
 * @author TCS
 * @version 1.0
 */
@ ObjectClassDefinition (name = "Sun Life - Rest Client Configuration", description = "Rest Client Configuration")
public @interface RestClientConfig {

  /**
   * Gets the socket timeout.
   *
   * @return the socket timeout
   */
  @ AttributeDefinition (name = "socketTimeout", description = "Socket Timeout")
  int getSocketTimeout ();

  /**
   * Gets the connection timeout.
   *
   * @return the connection timeout
   */
  @ AttributeDefinition (name = "connectionTimeout", description = "Connection Timeout")
  int getConnectionTimeout ();

  /**
   * Checks if is SSL by pass required.
   *
   * @return true, if is SSL by pass required
   */
  @ AttributeDefinition (name = "byPassSSLRequired", description = "By Pass SSL for Test Environment", type = AttributeType.BOOLEAN)
  boolean isSSLByPassRequired ();
}
