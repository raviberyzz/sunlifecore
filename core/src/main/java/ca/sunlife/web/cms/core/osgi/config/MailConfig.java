package ca.sunlife.web.cms.core.osgi.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Mail API Configuration", description = "API configuration for mail service - URL and KEY")
public @interface MailConfig {

	/**
	 * Api url.
	 *
	 * @return the string
	 */
	@AttributeDefinition(name = "Mail API", description = "Mail API URL")
	String apiUrl();

	/**
	 * Api key.
	 *
	 * @return the string
	 */
	@AttributeDefinition(name = "Mail API KEY", description = "API KEY for Mail service")
	String apiKey();

}
