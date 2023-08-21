/**
 *
 */
package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface AlternateUrl.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = {
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public @interface AlternateUrl {

  /**
   * Gets the alt language seo.
   *
   * @return the alt language seo
   */
  @ Inject
  @ Named ("altLanguageSeo")
  String getAltLanguageSeo ();

  /**
   * Gets the alt language url seo.
   *
   * @return the alt language url seo
   */
  @ Inject
  @ Named ("altLanguageUrlSeo")
  String getAltLanguageUrlSeo ();

}
