/**
 * 
 */
package ca.sunlife.web.cms.source.osgi.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

/**
 * The Interface NewsConfig.
 *
 * @author TCS
 * @version 1.0
 */
@ ObjectClassDefinition (name = "Sun Life - Source - News Configuration", description = "Source - News Configuration")
public @interface NewsConfig {

  /**
   * Gets the news content fragment paths.
   *
   * @return the news content fragment paths
   */
  @ AttributeDefinition (name = "getNewsPath", description = "News articles - content fragment paths")
  String[] getNewsPath ();

}
