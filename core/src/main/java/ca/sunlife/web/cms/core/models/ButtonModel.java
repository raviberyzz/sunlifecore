/*
 *
 */

package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface ButtonModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = {
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface ButtonModel {

  /**
   * Gets the target.
   *
   * @return the target
   */
  @ Inject
  String getTarget();

  /**
   * Gets the data title.
   *
   * @return the data title
   */
  @ Inject
  String getDataTitle();

}
