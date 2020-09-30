/**
 * 
 */
package ca.sunlife.web.cms.source.osgi.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

/**
 * The Interface UGCConfig.
 *
 * @author TCS
 * @version 1.0
 */
@ ObjectClassDefinition (name = "Sun Life - Source - News Configuration", description = "Source - UGC Services Configuration")
public @interface UGCConfig {

	/**
   * Gets the UGC service site name.
   *
   * @return the UGC service site name
   */
  @ AttributeDefinition (name = "getUGCServiceSite", description = "UGC service site name")
  String getUGCServiceSite ();
	
	/**
   * Gets the UGC service domain.
   *
   * @return the UGC service domain
   */
  @ AttributeDefinition (name = "getUGCServiceDomain", description = "UGC service doamin")
  String getUGCServiceDomain ();
  
  /**
   * Gets the UGC services.
   *
   * @return the UGC service domain
   */
  @ AttributeDefinition (name = "getUGCServices", description = "UGC services")
  String [] getUGCServices ();
  
}
