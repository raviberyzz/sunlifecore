/*
 *
 */

package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface SelectorExFragMap.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = { SlingHttpServletRequest.class,
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface SelectorExFragMap {

  /**
   * Gets the selector.
   *
   * @return the selector.
   */
  @ Inject
  public String getSelector();

  /**
   * Gets the exfrag path.
   *
   * @return the exfrag path.
   */
  @ Inject
  public String getExfragPath();

}
