/*
 *
 */

package ca.sunlife.web.cms.advisorhub.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.RepositoryException;

import org.apache.jackrabbit.api.security.user.User;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ca.sunlife.web.cms.core.constants.UserInfoConstants;

/**
  * The Class SearchModel.
  * 
  * @author TCS
  * @version 1.0
  */
@ Model (adaptables = SlingHttpServletRequest.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "sunlife/advisorhub/components/content/search")
public class SearchModel {
	
	
  /** The Constant LOG. */
  private static final Logger LOG = LoggerFactory.getLogger(SearchModel.class);
  
  /** The searchPlaceholder text. */
  @ Inject
  @ Via ("resource")
  private String searchPlaceholder;
  
  /** The searchButton text. */
  @ Inject
  @ Via ("resource")
  private String searchButton;
  
  /** The searchUrl. */
  @ Inject
  @ Via ("resource")
  private String searchUrl;
  
  /** The welcomeText. */
  @ Inject
  @ Via ("resource")
  private String welcomeText;
  
  /**
   * Gets the welcomeText
   * 
   * @return the welcomeText
   */
  public String getWelcomeText() {
	return welcomeText;
  }

  /**
   * Sets welcomeText
   * 
   * @param welcomeText
   *          the welcomeText to set
  */
  public void setWelcomeText(String welcomeText) {
	this.welcomeText = welcomeText;
  }

  /** The sling request. */
  @ Self
  private SlingHttpServletRequest request;
  

  /**
   *Gets the searchPlaceholder
   * 
   * @return the searchPlaceholder
   */
   public String getSearchPlaceholder() {
	return searchPlaceholder;
   }


  /**
   * Sets searchPlaceholder
   * 
   * @param searchPlaceholder
   *          the searchPlaceholder to set
   */
  public void setSearchPlaceholder(String searchPlaceholder) {
	this.searchPlaceholder = searchPlaceholder;
   }


  /**
   * Gets the searchButton
   * 
   * @return the searchButton
   */
  public String getSearchButton() {
	return searchButton;
   }


  /**
   * Sets searchButton
   * 
   * @param searchButton
   *          The searchButton to set
   */
  public void setSearchButton(String searchButton) {
	this.searchButton = searchButton;
   }



  /**
   * Gets the searchUrl
   * 
   * @return the searchUrl
   */
  public String getSearchUrl() {
	return searchUrl;
   }



  /**
   * Sets searchUrl
   * 
   * @param searchUrl
   *           The searchUrl to set
   */
  public void setSearchUrl(String searchUrl) {
	this.searchUrl = searchUrl;
   }
  
  /**
   * Inits the search sling model.
   * 
   */
  @ PostConstruct
  public void init() {
	  LOG.debug("Entry :: Search :: init request :: {}", request);
	  User user = null != request ? request.getResourceResolver().adaptTo(User.class) : null;
	  try {
		LOG.debug("Reading user details: {}", user);		
		if (null != user && null != this.welcomeText && this.welcomeText.length() > 0) {
			String givenName = user.hasProperty(UserInfoConstants.PROFILE_GIVEN_NAME_CONSTANT)
					? user.getProperty(UserInfoConstants.PROFILE_GIVEN_NAME_CONSTANT)[0].getString()
					: "NA"; // Given name
		    this.welcomeText = this.welcomeText.replace("${username}", givenName);
		   }
		}catch (RepositoryException e) {
			LOG.error("RepositoryException :: Search :: init :: {}", e);
	     }	 
    }  
 }
