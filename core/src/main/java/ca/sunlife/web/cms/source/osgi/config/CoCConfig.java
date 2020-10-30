/**
 * 
 */
package ca.sunlife.web.cms.source.osgi.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

/**
 * The Interface CoCConfig.
 *
 * @author TCS
 * @version 1.0
 */
@ ObjectClassDefinition(name = "Sun Life - Source - COC Configuration", description = "Source - COC Configuration")
public @interface CoCConfig {

	/**
	 * Gets the Is scheduler enabled?.
	 *
	 * @return the isEnabled Is scheduler enabled?
	 */
	@ AttributeDefinition(name = "isEnabled", description = "Enable schedule?")
	boolean isEnabled();

	/**
	 * Gets the getScheduleName.
	 *
	 * @return the getScheduleName 
	 * 	schedule name
	 */
	@ AttributeDefinition(name = "getScheduleName", description = "Schedule name")
	String getScheduleName();
	
	/**
	 * Gets the getScheduleExpression.
	 *
	 * @return the getScheduleExpression 
	 * 	schedule expression
	 */
	@ AttributeDefinition(name = "getScheduleExpression", description = "Schedule expression")
	String getScheduleExpression() default "*/30 * * * * ?";

	/**
	 * Gets the COC file path.
	 *
	 * @return the getFilePath 
	 * 	COC file path
	 */
	@ AttributeDefinition(name = "getFilePath", description = "COC file path")
	String getFilePath();
	
	/**
	 * Gets the deny group name.
	 *
	 * @return the getDenyGroupName 
	 * 	the deny group name
	 */
	@ AttributeDefinition(name = "getDenyGroupName", description = "COC file path")
	String getDenyGroupName();
	
	/**
	 * Gets the user home directory.
	 *
	 * @return the getDenyGroupName 
	 * 	the user home directory
	 */
	@ AttributeDefinition(name = "getUserHomeDir", description = "User home directory")
	String getUserHomeDir();
}
