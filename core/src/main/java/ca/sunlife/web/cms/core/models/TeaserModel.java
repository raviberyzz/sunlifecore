/*
 *
 */

package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface TeaserModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = {
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface TeaserModel {

  /**
   * Gets the image alignment.
   *
   * @return the image alignment
   */
  @ Inject
  String getImageAlignment();

  /**
   * Gets the background image check.
   *
   * @return the background image check
   */
  @ Inject
  String getBackgroundImageCheck();

  /**
   * Gets the file reference.
   *
   * @return the file reference
   */
  @ Inject
  String getFileReference();

  /**
   * Gets the file reference mobile.
   *
   * @return the file reference mobile
   */
  @ Inject
  String getFileReferenceMobile();

  /**
   * Gets the alt text.
   *
   * @return the alt text
   */
  @ Inject
  String getAltText();

  /**
   * Gets the description.
   *
   * @return the description
   */
  @ Inject
  String getDescription();

  /**
   * Gets the link URL.
   *
   * @return the link URL
   */
  @ Inject
  String getLinkURL();

  /**
   * Gets the target.
   *
   * @return the target
   */
  @ Inject
  String getTarget();

  /**
   * Gets the analytics id.
   *
   * @return the analytics id
   */
  @ Inject
  String getAnalyticsId();

  /**
   * Gets the checks if is decorative.
   *
   * @return the checks if is decorative
   */
  @ Inject
  String getIsDecorative();
}
