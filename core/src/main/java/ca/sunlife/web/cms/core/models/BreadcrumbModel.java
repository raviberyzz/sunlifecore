/*
 *
 */

package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.Via;

import com.adobe.cq.wcm.core.components.internal.models.v1.BreadcrumbImpl;
import com.adobe.cq.wcm.core.components.models.Breadcrumb;

/**
 * The Class BreadcrumbModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = SlingHttpServletRequest.class, adapters = Breadcrumb.class, resourceType = "sunlife/core/components/content/breadcrumb")
public class BreadcrumbModel extends BreadcrumbImpl {

  /**
   * Instantiates a new breadcrumb model.
   */
  public BreadcrumbModel() {
    super();
  }

  /** The social share reqd. */
  @ Inject
  @ Via ("resource")
  @ Optional
  private String socialShareReqd;

  /** The Language code. */
  @ Inject
  @ Via ("resource")
  @ Optional
  private String langcode;
  
  /** The Hide Breadcrumb */
  @ Inject
  @ Via ("resource")
  @ Optional
  private String hideBreadcrumb;

  /**
   * Gets the social share reqd.
   *
   * @return the social share reqd
   */
  public String getSocialShareReqd() {
    return socialShareReqd;
  }

 /**
   * Gets the Language code.
   *
   * @return the Language code
   */
   public String getLangcode() {
    return langcode;
  }

  /**
   * Sets the social share reqd.
   *
   * @param socialShareReqd
   *          the new social share reqd
   */
  public void setSocialShareReqd(final String socialShareReqd) {
    this.socialShareReqd = socialShareReqd;
  }
  
  /**
   * Gets the hideBreadcrumb.
   *
   * @return the hideBreadcrumb
   */
  public String getHideBreadcrumb() {
    return hideBreadcrumb;
  }

  /**
   * Sets the hideBreadcrumb.
   *
   * @param hideBreadcrumb
   *          the new hideBreadcrumb
   */
  public void setHideBreadcrumb(final String hideBreadcrumb) {
    this.hideBreadcrumb = hideBreadcrumb;
  }

}
