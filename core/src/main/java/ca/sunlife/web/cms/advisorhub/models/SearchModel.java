/*
 *
 */

package ca.sunlife.web.cms.advisorhub.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
  * The Class SearchModel.
  * 
  * @author TCS
  * @version 1.0
  */
@ Model (adaptables = {
	    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface SearchModel {
	
	 
  /**
	*Gets the searchPlaceholder
	* 
	* @return the searchPlaceholder
	*/
  @ Inject
  String getSearchPlaceholder();
 
  /**
   * Gets the searchButton
   * 
   * @return the searchButton
   */
  @ Inject
  String getSearchButton();
  
  
  /**
   * Gets the searchUrl
   * 
   * @return the searchUrl
   */
  @ Inject
  String getSearchUrl();
  
  /**
   * Gets the welcomeText
   * 
   * @return the welcomeText
   */
  @ Inject
  String getWelcomeText();
  
  
  /**
   * Gets the analyticsId
   * 
   * @return the analyticsId
   */
  @ Inject
  String getAnalyticsId();
  
    
 }
