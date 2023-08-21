/*
 *
 */

package ca.sunlife.web.cms.core.osgi.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

/**
 * The Interface CoreResourceResolverConfig.
 *
 * @author TCS
 * @version 1.0
 */
@ ObjectClassDefinition (name = "Sun Life - Core Resource Resolver", description = "Sunlife Core Resource Resolver")
public @interface CoreResourceResolverConfig {

  /**
   * Gets the sub service.
   *
   * @return the sub service
   */
  @ AttributeDefinition (name = "subService", description = "Sub service name for sunlife core application", defaultValue = "application")
  String getSubService ();
}
