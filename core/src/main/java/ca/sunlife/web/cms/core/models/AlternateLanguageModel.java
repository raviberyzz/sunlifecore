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
 * @author mo92 The Interface AlternateLanguageModel
 */
@ Model (adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface AlternateLanguageModel {

  /**
   * Gets the language code.
   *
   * @return language code
   */
  @ Inject
  String getLanguageCode();

  /**
   * Gets the site location.
   *
   * @return site location
   */
  @ Inject
  String getSiteLocation();

  /**
   * Gets the domain.
   *
   * @return domain
   */
  @ Inject
  String getDomain();

  /**
   * Gets if default language.
   *
   * @return if default language
   */
  @ Inject
  String getDefaultLanguage();

}
