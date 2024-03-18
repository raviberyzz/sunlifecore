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
 * The Interface StickyBarModel.
 *
 * @author ASIA
 * @version 1.0
 */
@ Model (adaptables = {
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface StickyBarModel {

  /**
   * Gets the links.
   *
   * @return the links
   */
  @ Inject
  List <Links> getLinks();

  /**
   * The Interface Links.
   *
   * @author ASIA
   * @version 1.0
   */
  @ Model (adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
  interface Links {

    /**
     * Gets the link name.
     *
     * @return the link name
     */
    @ Inject
    String getLinkName();

    /**
     * Gets the link url.
     *
     * @return the link url
     */
    @ Inject
    String getLinkUrl();

    /**
     * Gets the target.
     *
     * @return the target
     */
    @ Inject
    String getLinkTarget();
    
    /**
     * Gets the dataTitle.
     *
     * @return the dataTitle
     */
    @ Inject
    String getDataTitle();
  }

  /**
   * Gets the additionalButton.
   *
   * @return the additionalButton
   */
  @ Inject
  String getAdditionalButton();

  /**
   * Gets the CTA Label.
   *
   * @return the CTA Label
   */
  @ Inject
  String getButtonLabel();

  /**
   * Gets the CTA Link.
   *
   * @return the CTA Link
   */
  @ Inject
  String getButtonLink();

  /**
   * Gets the CTA Target.
   *
   * @return the CTA Target
   */
  @ Inject
  String getButtonTarget();

  /**
   * Gets the Second CTA Label.
   *
   * @return the Second CTA Label
   */
  @ Inject
  String getSecButtonLabel();

  /**
   * Gets the Second CTA Link.
   *
   * @return the Second CTA Link
   */
  @ Inject
  String getSecButtonLink();

  /**
   * Gets the Second CTA Target.
   *
   * @return the Second CTA Target
   */
  @ Inject
  String getSecButtonTarget();

   /**
   * Gets the Need Logo.
   *
   * @return the Need Logo
   */
  @ Inject
  String getNeedLogo();

   /**
   * Gets the Logo image.
   *
   * @return the Logo image
   */
  @ Inject
  String getLogoImage();

   /**
   * Gets the Logo link.
   *
   * @return the Logo link
   */
  @ Inject
  String getLogoLink();

   /**
   * Gets the Logo Alt text.
   *
   * @return the Logo Alt text
   */
  @ Inject
  String getAltText();

   /**
   * Gets the Logo target.
   *
   * @return the Logo target
   */
  @ Inject
  String getLogoTarget();

   /**
   * Gets the View StickyBar value.
   *
   * @return the View StickyBar value
   */
  @ Inject
  String getHideStickyBar();

  /**
   * Gets the View NavLink Dropdown value.
   *
   * @return the View NavLink Dropdown value
   */
  @ Inject
  String getHideNavLinksDropdown();

   /**
   * Gets the NavLink Dropdown Title.
   *
   * @return the NavLink Dropdown Title
   */
  @ Inject
  String getNavLinksDropdownTitle();

}
