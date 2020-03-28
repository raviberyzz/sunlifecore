package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.Via;

import com.adobe.cq.wcm.core.components.internal.models.v1.AccordionImpl;
import com.adobe.cq.wcm.core.components.models.Accordion;

/**
 * The Class AccordionModel.
 */
@ Model (adaptables = SlingHttpServletRequest.class , adapters = Accordion.class , resourceType = "sunlife/core/components/content/accordion")
public class AccordionModel extends AccordionImpl {

  /**
   * Instantiates a new accordion model.
   */
  public AccordionModel() {
    super();
  }

  /** The accordion analytics id. */
  @ Inject
  @ Via ("resource")
  @ Optional
  private String analyticsId;

  /**
   * Gets the analytics id.
   *
   * @return the analytics id
   */
  public String getAnalyticsId() {
    return analyticsId;
  }

  /**
   * Sets the analytics id.
   *
   * @param analyticsId
   *          the analytics text
   */
  public void setAnalyticsId(final String analyticsId) {
    this.analyticsId = analyticsId;
  }

}
