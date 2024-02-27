/*
 *
 */

package ca.sunlife.web.cms.core.osgi.config.v1;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ ObjectClassDefinition (name = "Sun Life - Site configuration pages", description = "Sun Life Site configuration pages")
public @interface SiteConfig {

  /**
   * Gets the site path.
   *
   * @return the site path
   */
  @ AttributeDefinition (name = "siteConfigPath", description = "Site Config Root Path")
  String getSitePath() default "/content/sunlife/config";

}
