/*
 *
 */

package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@ Model (adaptables = {
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface NewsCategory {

  /**
   * Gets the category.
   *
   * @return the category
   */
  @ValueMapValue
  public String getCategory();

}
