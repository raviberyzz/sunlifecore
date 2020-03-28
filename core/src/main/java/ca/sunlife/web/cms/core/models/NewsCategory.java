package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface NewsCategory.
 */
@ Model (adaptables = {
    Resource.class } , defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface NewsCategory {

  /**
   * Gets the news category.
   *
   * @return the category
   */
  @ Inject
  public String getCategory();

}
