/*
 *
 */

package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface LayoutContainerModal.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = {
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface LayoutContainerModal {

  /**
   * Gets the noc.
   *
   * @return the noc
   */
  @ Inject
  String getNoc();

  /**
   * Gets the type.
   *
   * @return the type
   */
  @ Inject
  String getType();

  /**
   * Gets the close text.
   *
   * @return the close text
   */
  @ Inject
  String getCloseText();

  /**
   * Gets the modal ID.
   *
   * @return the modal ID
   */
  @ Inject
  String getModalID();

  /**
   * Gets the modal title.
   *
   * @return the modal title
   */
  @ Inject
  String getModalTitle();

  /**
   * Gets the modal title level.
   *
   * @return the modal title level
   */
  @ Inject
  String getModalTitleLevel();

  /**
   * Gets the analytics id.
   *
   * @return the analytics id
   */
  @ Inject
  String getAnalyticsId();

  /**
   * Gets the flex required.
   *
   * @return the flex required
   */
  @ Inject
  String getFlexRequired();
  
  /**
   * Gets the site notification id.
   *
   * @return the site notification id
   */
  @Inject
  String getSiteNotificationId();
}
