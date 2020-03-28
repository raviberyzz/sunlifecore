package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.Via;

import com.adobe.cq.wcm.core.components.internal.models.v1.form.OptionsImpl;
import com.adobe.cq.wcm.core.components.models.form.Options;

/**
 * The Class FormOptions.
 */
@ Model (adaptables = SlingHttpServletRequest.class , adapters = Options.class , resourceType = "sunlife/core/components/form/options")
public class FormOptions extends OptionsImpl {
  /** The id. */
  @ Inject
  @ Via ("resource")
  @ Optional
  private String id;

  /**
   * Gets the id.
   *
   * @return the id
   */
  @ Override
  public String getId() {
    return id;
  }

  /**
   * Sets the id.
   *
   * @param id
   *          the new id
   */
  public void setId(final String id) {
    this.id = id;
  }
}
