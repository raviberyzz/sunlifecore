package ca.sunlife.web.cms.core.osgi.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

/**
 * The Interface CoreResourceResolverConfig.
 */
@ ObjectClassDefinition (name = "Sun Life - Core Resource Resolver", description = "Sunlife Core Resource Resolver")
public @interface CoreResourceResolverConfig {

  /**
   * Gets the system user.
   *
   * @return the system user
   */
  @ AttributeDefinition (name = "subService", description = "Sub service name for sunlife core application", defaultValue = "application")
  String getSubService ();
}
