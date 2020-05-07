package ca.sunlife.web.cms.core.models;

import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface LifeMoments.
 */
@ Model (adaptables = {
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface LifeMomentsModel {
  /**
   * Gets the heading.
   *
   * @return the heading
   */
  @ Inject
  String getHeading();


  /**
   * Gets the description.
   *
   * @return the description
   */
  @ Inject
  String getDescription();
  
  
  /**
   * Gets the Life Moments Links.
   *
   * @return the Life Moments Links
   */
  @ Inject
  List <LifeMomentsItemsModel> getLinks();

}
