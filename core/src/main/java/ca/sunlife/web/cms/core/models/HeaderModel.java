package ca.sunlife.web.cms.core.models;

import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface HeaderModel.
 */
@ Model (adaptables = {
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface HeaderModel {

  /**
   * Read the sign in display value @ return the sign in display value.
   *
   * @return the list from signin
   */
  @ Inject
  String getListFromSignin();

  /**
   * Read the sign in title @ return the sign in title.
   *
   * @return the signin title
   */
  @ Inject
  String getSigninTitle();

  /**
   * Gets the Sign in text.
   *
   * @return the Sign in text
   */
  @ Inject
  String getText();

  /**
   * Read the search display value @ return the search display value.
   *
   * @return the list from search
   */
  @ Inject
  String getListFromSearch();

  /**
   * Read the Search placeholder value @ return the Search placeholder value.
   *
   * @return the search placeholder
   */
  @ Inject
  String getSearchPlaceholder();

  /**
   * Read the Search button value @ return the Search button value.
   *
   * @return the search button
   */
  @ Inject
  String getSearchButton();

  /**
   * Read the Search title @ return the Search title.
   *
   * @return the search title
   */
  @ Inject
  String getSearchTitle();

  /**
   * Read the Search action @ return the Search action.
   *
   * @return the search url
   */
  @ Inject
  String getSearchUrl();

  /**
   * Read the Region display value @ return the Region display value.
   *
   * @return the list from region
   */
  @ Inject
  String getListFromRegion();

  /**
   * Read the logo display value @ return the logo display value.
   *
   * @return the list from
   */
  @ Inject
  String getListFrom();
  
  /**
   * Read the campaign header display value @ return the campaign header display value.
   *
   * @return the Is Campaign Header
   */
  @ Inject
  String getCampaignHeader();

  /**
   * Read the Utility Nav display value @ return the Utility Nav display value.
   *
   * @return the list from nav
   */
  @ Inject
  String getListFromNav();

  /**
   * Read the MegaNav display value @ return the MegaNav display value.
   *
   * @return the list from meganav
   */
  @ Inject
  String getListFromMeganav();

  /**
   * Gets the Region title.
   *
   * @return the Region title
   */
  @ Inject
  String getRegionTitle();
  
  /**
   * Gets the Region screen reader text.
   *
   * @return the Region screen reader text
   */
  @ Inject
  String getSrRegionText();
  
  /**
   * Gets the Search screen reader text.
   *
   * @return the Search screen reader text
   */
  @ Inject
  String getSrSearchText();

  /**
   * Gets the links.
   *
   * @return the links
   */
  @ Inject
  List <Links> getLinks(); // the name `getLinks` corresponds to the multifield name="./links"

  /**
   * Gets the skip to signin label.
   *
   * @return the skip to signin label
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
   * The Interface Links.
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

  }


}
