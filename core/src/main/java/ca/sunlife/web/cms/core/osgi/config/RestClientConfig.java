package ca.sunlife.web.cms.core.osgi.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

/**
 * The Interface RestClientConfig.
 */
@ ObjectClassDefinition (name = "Rest Client Configuration" , description = "Rest Client Configuration")
public @interface RestClientConfig {

  /**
   * Gets the socket timeout.
   *
   * @return the site path
   */
  @ AttributeDefinition (name = "socketTimeout" , description = "Socket Timeout")
  int getSocketTimeout ();

  /**
   * Gets the connection timeout.
   *
   * @return the site path
   */
  @ AttributeDefinition (name = "connectionTimeout" , description = "Connection Timeout")
  int getConnectionTimeout ();

  /**
   * Gets parameter for SSL by pass is needed or not.
   *
   * @return true, if is SSL by pass required
   */
  @ AttributeDefinition (name = "byPassSSLRequired" , description = "By Pass SSL for Test Environment" , type = AttributeType.BOOLEAN)
  boolean isSSLByPassRequired ();
}
