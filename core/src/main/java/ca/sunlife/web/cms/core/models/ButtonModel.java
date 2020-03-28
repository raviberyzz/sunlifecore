package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface ButtonModel.
 */
@ Model (adaptables = {
    Resource.class } , defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface ButtonModel {

  /**
   * Gets the target.
   *
   * @return the target
   */
  @ Inject
  String getTarget();

  /**
   * Gets the dataTitle.
   *
   * @return the dataTitle
   */
  @ Inject
  String getDataTitle();

}
