/*
 *
 */

package ca.sunlife.web.cms.core.models;

import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface HeaderModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = {
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface HeaderModel {

  /**
   * Gets the list from signin.
   *
   * @return the list from signin
   */
  @ Inject
  String getListFromSignin();
  
  /**
   * Gets the mobilenav experience path.
   *
   * @return the mobilenav experience path.
   */
  @ Inject
  Resource getMobilenav();

  /**
   * Gets the signin desktop title.
   *
   * @return the signin desktop title
   */
  @ Inject
  String getSigninTitle();
  
  /**
   * Gets the signin mobile title.
   *
   * @return the signin mobile title
   */
  @ Inject
  String getSigninMobileTitle();
  
  /**
   * Gets the signin button Id.
   *
   * @return the signin button Id
   */
  @ Inject
  String getSigninButtonId();
  
  /**
   * Gets the button analytics id.
   *
   * @return the button analytics id.
   */
  @ Inject
  String getSigninAnalyticsId();
  
  /**
   * Gets the signin icon.
   *
   * @return the signin icon
   */
  @ Inject
  String getSigninIcon();

  /**
   * Gets the text.
   *
   * @return the text
   */
  @ Inject
  String getText();
  
  /**
   * Gets the SigninURL.
   *
   * @return the SigninURL
   */
  @ Inject
  String getSigninUrl();
  
  /**
   * Gets the SigninTarget.
   *
   * @return the SigninTarget
   */
  @ Inject
  String getSigninTarget();

  /**
   * Gets the LinkTarget.
   *
   * @return the LinkTarget
   */    
  @ Inject
  String getLinkTarget();

  /**
   * Gets the list from search.
   *
   * @return the list from search
   */
  @ Inject
  String getListFromSearch();

  /**
   * Gets the search placeholder.
   *
   * @return the search placeholder
   */
  @ Inject
  String getSearchPlaceholder();

  /**
   * Gets the search button.
   *
   * @return the search button
   */
  @ Inject
  String getSearchButton();

  /**
   * Gets the search title.
   *
   * @return the search title
   */
  @ Inject
  String getSearchTitle();

  /**
   * Gets the search url.
   *
   * @return the search url
   */
  @ Inject
  String getSearchUrl();

  /**
   * Gets the list from region.
   *
   * @return the list from region
   */
  @ Inject
  String getListFromRegion();

  /**
   * Gets the list from.
   *
   * @return the list from
   */
  @ Inject
  String getListFrom();

   
  /**
   * Gets the list from.
   *
   * @return the list from
   */
  @ Inject
  String getIsSignInHeader();

  /**
   * Gets the campaign header.
   *
   * @return the campaign header
   */
  @ Inject
  String getCampaignHeader();

  /**
   * Gets the list from nav.
   *
   * @return the list from nav
   */
  @ Inject
  String getListFromNav();

  /**
   * Gets the list from meganav.
   *
   * @return the list from meganav
   */
  @ Inject
  String getListFromMeganav();

  /**
   * Gets the region title.
   *
   * @return the region title
   */
  @ Inject
  String getRegionTitle();

  /**
   * Gets the sr region text.
   *
   * @return the sr region text
   */
  @ Inject
  String getSrRegionText();

  /**
   * Gets the links.
   *
   * @return the links
   */
  @ Inject
  List <Links> getLinks(); // the name `getLinks` corresponds to the multifield name="./links"

  /**
   * Gets the skip to sign in label.
   *
   * @return the skip to sign in label
   */
  @ Inject
  String getSkipToSignInLabel();

  /**
   * Gets the skip to main content label.
   *
   * @return the skip to main content label
   */

  @ Inject
  String getSkipToMainContentLabel();

  /**
   * Gets the skip to footer label.
   *
   * @return the skip to footer label
   */
  @ Inject
  String getSkipToFooterLabel();

  /**
   * Gets the meganavlinks.
   *
   * @return the meganavlinks
   */
  @ Inject
  Resource getMeganavlinks();
  
  
  /**
   * Gets the mobilenavlinks.
   *
   * @return the mobilenavlinks
   */
  @ Inject
  Resource getMobilenavlinks();

  /**
   * The Interface Links.
   *
   * @author TCS
   * @version 1.0
   */

  @ Model (adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
  interface Links {

    /**
     * Gets the alt text.
     *
     * @return the alt text
     */
    @ Inject
    String getAltText();

    /**
     * Gets the logo image.
     *
     * @return the logo image
     */
    @ Inject
    String getLogoImage();

    /**
     * Gets the mobile logo image.
     *
     * @return the mobile logo image
     */
    @ Inject
    String getMobileLogoImage();

    /**
     * Gets the target.
     *
     * @return the target
     */
    @ Inject
    String getTarget();

    /**
     * Gets the link url.
     *
     * @return the link url
     */
    @ Inject
    String getLinkUrl();

    /**
     * Gets the separator.
     *
     * @return the separator
     */
    @ Inject
    String getSeparator();
	
	/**
     * Gets the hide logo.
     *
     * @return the hide logo
     */
    @ Inject
    String getHideLogo();


  }

  /**
   * Gets the navlinks.
   *
   * @return the navlinks
   */
  @ Inject
  List <Navlinks> getNavlinks(); // the name `getNavlinks` corresponds to the multifield
                                 // name="./navlinks"

  /**
                                  * The Interface Navlinks.
                                  *
                                  * @author TCS
                                  * @version 1.0
                                  */
  @ Model (adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
  interface Navlinks {

    /**
     * Gets the link name.
     *
     * @return the link name
     */
    @ Inject
    String getLinkName();

    /**
     * Gets the target.
     *
     * @return the target
     */
    @ Inject
    String getTarget();

    /**
     * Gets the link url.
     *
     * @return the link url
     */
    @ Inject
    String getLinkUrl();
    
    /**
     * Gets the link icon.
     *
     * @return the link icon
     */
    @ Inject
    String getLinkIcon();
    
    /**
     * Gets the Data title.
     *
     * @return the Data title
     */
    @ Inject
    String getDataTitle();
  }

}
