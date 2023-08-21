/*
 *
 */

package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface ListModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = {
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface ManualListModel {

  /**
   * Gets the title.
   *
   * @return the title
   */
  @ Inject
  String getTitle();
  
  /**
   * Gets the links.
   *
   * @return the links
   */
  @ Inject
  Resource getLinks();


}
