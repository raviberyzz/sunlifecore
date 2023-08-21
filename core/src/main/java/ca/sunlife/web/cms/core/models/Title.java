/*
 *
 */

package ca.sunlife.web.cms.core.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.designer.Style;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * The Class Title.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = { SlingHttpServletRequest.class,
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, adapters = Title.class, resourceType = "sunlife/core/components/content/title")
public class Title {

  /** The Constant PN_TITLE_LINK_DISABLED. */
  private static final String PN_TITLE_LINK_DISABLED = "linkDisabled";

  /**
   * Gets the type.
   *
   * @return the type
   */
  public final String getType() {
    return type;
  }

  /**
   * Gets the link URL.
   *
   * @return the link URL
   */
  public final String getLinkURL() {
    return linkURL;
  }

  /**
   * Gets the text.
   *
   * @return the text
   */
  public final String getText() {
    return text;
  }

  /**
   * Checks if is link disabled.
   *
   * @return true, if is link disabled
   */
  public final boolean isLinkDisabled() {
    return linkDisabled;
  }

  /** The type. */
  @ Inject
  @ Via ("resource")
  private String type;

  /** The link URL. */
  @ Inject
  @ Via ("resource")
  private String linkURL;

  /** The text. */
  @ Inject
  @ Via ("resource")
  @ Named (JcrConstants.JCR_TITLE)
  private String text;

  /** The link disabled. */
  private boolean linkDisabled = false;

  /** The current page. */
  @ ScriptVariable
  private Page currentPage;

  /** The current style. */
  @ ScriptVariable (injectionStrategy = InjectionStrategy.OPTIONAL)
  @ JsonIgnore
  private Style currentStyle;

  /**
   * Sets the text.
   *
   * @param text
   *          the new text
   */
  public void setText(final String text) {
    this.text = text;
  }

  /**
   * Inits the.
   */
  @ PostConstruct
  public void init() {
    if (StringUtils.isBlank(text)) {
      text = StringUtils.defaultIfEmpty(currentPage.getPageTitle(), currentPage.getTitle());
    }

    if (currentStyle != null) {
      linkDisabled = currentStyle.get(Title.PN_TITLE_LINK_DISABLED, linkDisabled);
    }
  }

}
