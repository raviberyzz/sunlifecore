/*
 *
 */

package ca.sunlife.web.cms.core.models.signin;


import javax.inject.Inject;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface SignInModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = {
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface SignInModel {

  /**
   * Gets the background colour.
   *
   * @return the background colour
   */
  @ Inject
  String getBackgroundColour();
  
  /**
   * Gets the action url.
   *
   * @return the action url
   */
  @ Inject
  String getActionUrl();


}
