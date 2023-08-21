/**
 * 
 */
package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface GenericModal.
 *
 * @author TCS
 */
@ Model (adaptables = {
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface GenericModal {
  
  /**
   * Gets the component type.
   *
   * @return the component type
   */
  @Inject
  String getComponentType();
  
  /**
   * Gets the component data.
   *
   * @return the component data
   */
  @Inject
  String getComponentData();
  
  /**
   * Gets the component name.
   *
   * @return the component name
   */
  @Inject
  String getComponentName();

  /**
   * Gets the component display name.
   *
   * @return the component display name
   */
  @Inject
  String getComponentDisplayName();
}
