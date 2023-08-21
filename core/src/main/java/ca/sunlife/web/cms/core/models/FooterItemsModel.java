/**
 *
 */
package ca.sunlife.web.cms.core.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * The Class FooterItemsModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = { SlingHttpServletRequest.class,
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FooterItemsModel {

  /** The logger. */
  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  /** The label. */
  @ Inject
  private String label;

  /** The url. */
  @ Inject
  private String url;

  /** The target. */
  @ Inject
  private String target;

  /** The checkbox separator. */
  @ Inject
  private String checkboxSeparator;

  /** The checkbox hide. */
  @ Inject
  private String checkboxHide;

  /** The content url. */
  private boolean contentUrl;

  /**
   * Gets the label.
   *
   * @return the label
   */
  public String getLabel() {
    return label;
  }

  /**
   * Sets the label.
   *
   * @param label
   *          the new label
   */
  public void setLabel(final String label) {
    this.label = label;
  }

  /**
   * Gets the url.
   *
   * @return the url
   */
  public String getUrl() {
    return url;
  }

  /**
   * Sets the url.
   *
   * @param url
   *          the new url
   */
  public void setUrl(final String url) {
    this.url = url;
  }

  /**
   * Gets the target.
   *
   * @return the target
   */
  public String getTarget() {
    return target;
  }

  /**
   * Sets the target.
   *
   * @param target
   *          the new target
   */
  public void setTarget(final String target) {
    this.target = target;
  }

  /**
   * Gets the checkbox separator.
   *
   * @return the checkbox separator
   */
  public String getCheckboxSeparator() {
    return checkboxSeparator;
  }

  /**
   * Sets the checkbox separator.
   *
   * @param checkboxSeparator
   *          the new checkbox separator
   */
  public void setCheckboxSeparator(final String checkboxSeparator) {
    this.checkboxSeparator = checkboxSeparator;
  }

  /**
   * Gets the checkbox hide.
   *
   * @return the checkbox hide
   */
  public String getCheckboxHide() {
    return checkboxHide;
  }

  /**
   * Sets the checkbox hide.
   *
   * @param checkboxHide
   *          the new checkbox hide
   */
  public void setCheckboxHide(final String checkboxHide) {
    this.checkboxHide = checkboxHide;
  }

  /**
   * Checks if is content url.
   *
   * @return true, if is content url
   */
  public boolean isContentUrl() {
    return contentUrl;
  }

  /**
   * Sets the content url.
   *
   * @param contentUrl
   *          the new content url
   */
  public void setContentUrl(final boolean contentUrl) {
    this.contentUrl = contentUrl;
  }

  /**
   * Inits the.
   */
  @ PostConstruct
  public void init() {
    logger.debug("Entry :: init method of FooterItemsImpl :: label {}", label);
    if (null != url && url.length() > 0) {
      contentUrl = url.startsWith("/");
    }
    logger.debug("Exit :: init method of FooterItemsImpl :: contentUrl :: {}", contentUrl);
  }
}
