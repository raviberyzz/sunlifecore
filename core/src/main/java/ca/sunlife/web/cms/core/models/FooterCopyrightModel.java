package ca.sunlife.web.cms.core.models;

import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface FooterCopyrightModel.
 */
@ Model (adaptables = {
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface FooterCopyrightModel {

  /**
   * Gets the title.
   *
   * @return the title
   */
  @ Inject
  String getTitle();

  /**
   * Gets the copyright text.
   *
   * @return the copyright text
   */
  @ Inject
  String getCopyrightText();

  /**
   * Gets the slf text.
   *
   * @return the slf text
   */
  @ Inject
  String getSlfText();

  /**
   * Gets the footer items.
   *
   * @return the footer items
   */
  @ Inject
  List <FooterItems> getFooterItems();

  /**
   * The Interface FooterItems.
   */
  @ Model (adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
  interface FooterItems {

    /**
     * Gets the label.
     *
     * @return the label
     */
    @ Inject
    String getLabel();

    /**
     * Gets the url.
     *
     * @return the url
     */
    @ Inject
    String getUrl();

    /**
     * Gets the target.
     *
     * @return the target
     */
    @ Inject
    String getTarget();

    /**
     * Gets the checkbox separator.
     *
     * @return the checkbox separator
     */
    @ Inject
    String getCheckboxSeparator();

    /**
     * Gets the checkbox hide.
     *
     * @return the checkbox hide
     */
    @ Inject
    String getCheckboxHide();
  }
}
