/**
 *
 */
package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface AlternateLanguageModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface AlternateLanguageModel {

  /**
   * Gets the language code.
   *
   * @return the language code
   */
  @ Inject
  String getLanguageCode();

  /**
   * Gets the site location.
   *
   * @return the site location
   */
  @ Inject
  String getSiteLocation();

  /**
   * Gets the domain.
   *
   * @return the domain
   */
  @ Inject
  String getDomain();

  /**
   * Gets the default language.
   *
   * @return the default language
   */
  @ Inject
  String getDefaultLanguage();

}
