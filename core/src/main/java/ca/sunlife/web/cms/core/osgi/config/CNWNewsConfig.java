/**
 * 
 */
package ca.sunlife.web.cms.core.osgi.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

/**
 * @author mo92 The Interface CNWNewsConfig.
 */
@ObjectClassDefinition(name = "CNW Services Configuration", description = "CNW Services Configuration")
public @interface CNWNewsConfig {
	/**
	 * Web service url for CNW services
	 * 
	 * @return
	 */
	@AttributeDefinition(name = "cnwServiceUrl", description = "CNW Service URL", defaultValue = "http://internal-www.sunlife.ca/slfServiceApp/invokeService.wca")
	String getCnwServiceUrl();

}
