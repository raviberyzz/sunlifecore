/*
 *
 */

package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface ContainerModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = {
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface ContainerModel {

  /**
   * Gets the analytics id.
   *
   * @return the analytics id
   */
  @ Inject
  public String getAnalyticsId();

  /**
   * Gets the type.
   *
   * @return the type
   */
  @ Inject
  public String getType();

  /**
   * Gets the aria label.
   *
   * @return the aria label
   */
  @ Inject
  public String getAriaLabel();

}
