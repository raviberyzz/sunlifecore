package ca.sunlife.web.cms.advisorhub.osgi.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

/**
 * The Interface FormsConfig.
 *
 * @author TCS
 * @version 1.0 
 */
@ ObjectClassDefinition (name = "Sun Life - Advisorhub - Forms Configuration", description = "Advisorhub - Forms Configuration")
public @interface FormsConfig {
	
   
	/**
	 * Gets the forms content fragment path
	 * 
	 * @returns the forms content fragment path
	 * 
	 */
	@ AttributeDefinition (name = "getFormsPath", description = "Forms - content fragment paths")
	String[] getFormsPath();

}
