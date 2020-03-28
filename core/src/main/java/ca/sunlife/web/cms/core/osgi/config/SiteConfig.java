package ca.sunlife.web.cms.core.osgi.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

/**
 * The Interface SiteConfig.
 */
@ ObjectClassDefinition (name = "Sunlife Site configuration pages" , description = "Sunlife Site configuration pages")
public @interface SiteConfig {

  /**
   * Gets the site path.
   *
   * @return the site path
   */
  @ AttributeDefinition (name = "siteConfigPath" , description = "Site Config Root Path")
  String getSitePath ();

}
