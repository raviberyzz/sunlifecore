package ca.sunlife.web.cms.core.osgi.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

/**
 * The Interface CoreResourceResolverConfig.
 */
@ObjectClassDefinition(name = "Sunlife Core Resource Resolver", description = "Sunlife Core Resource Resolver")
public @interface CoreResourceResolverConfig {
	
	/**
	 * Gets the system user.
	 *
	 * @return the system user
	 */
	@AttributeDefinition(name = "systemUser", description = "System User name for sunlife core application")
	String getSystemUser();
}
