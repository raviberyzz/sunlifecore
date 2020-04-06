package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Class MegaMenuModel.
 */
@ Model (adaptables = {
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface MegaMenuModel {

  /**
   * Gets the meganavlinks.
   *
   * @return the meganavlinks
   */
  @ Inject
  Resource getMeganavlinks();

}
