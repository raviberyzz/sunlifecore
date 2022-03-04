/*
 *
 */

package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface SubLinkModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface SubLinkModel {

  /**
   * Gets the sub link name.
   *
   * @return the sub link name
   */
  @ Inject
  String getSubLinkName();
  
  /**
   * Gets the sub link language code.
   *
   * @return the sub link language code
   */
  @ Inject
  String getSubLinkLangCode();

  /**
   * Gets the sub link url.
   *
   * @return the sub link url
   */
  @ Inject
  String getSubLinkUrl();

  /**
   * Gets the sub link target.
   *
   * @return the sub link target
   */
  @ Inject
  String getSubLinkTarget();
  
  /**
   * Gets the sub link data title.
   *
   * @return the sub link data title
   */
  @ Inject
  String getSubLinkDataTitle();

  /**
   * Gets the sub link separator.
   *
   * @return the sub link separator
   */
  @ Inject
  String getSubLinkSeparator();

  /**
   * Gets the sub link highlight.
   *
   * @return the sub link highlight
   */
  @ Inject
  String getSubLinkHighlight();

  /**
   * Gets the selected.
   *
   * @return the selected
   */
  @ Inject
  String getSelected();
}
