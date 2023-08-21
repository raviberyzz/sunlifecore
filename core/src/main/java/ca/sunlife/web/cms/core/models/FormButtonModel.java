/*
 *
 */

package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.Via;

import com.adobe.cq.wcm.core.components.internal.models.v1.form.ButtonImpl;
import com.adobe.cq.wcm.core.components.models.form.Button;

/**
 * The Class FormButtonModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = SlingHttpServletRequest.class, adapters = Button.class, resourceType = "sunlife/core/components/form/button")
public class FormButtonModel extends ButtonImpl {

  /**
   * Instantiates a new form button model.
   */
  public FormButtonModel() {
    super();
  }

  /** The data title. */
  @ Inject
  @ Via ("resource")
  @ Optional
  private String dataTitle;

  /** The id. */
  @ Inject
  @ Via ("resource")
  @ Optional
  private String id;

  /*
   * (non-Javadoc)
   * @see com.adobe.cq.wcm.core.components.internal.models.v1.form.ButtonImpl#getTitle()
   */
  @ Override
  public String getTitle() {
    return title;
  }

  /**
   * Gets the data title.
   *
   * @return the data title
   */
  public String getDataTitle() {
    return dataTitle;
  }

  /**
   * Sets the data title.
   *
   * @param dataTitle
   *          the new data title
   */
  public void setDataTitle(final String dataTitle) {
    this.dataTitle = dataTitle;
  }

  /*
   * (non-Javadoc)
   * @see com.adobe.cq.wcm.core.components.internal.models.v1.form.AbstractFieldImpl#getId()
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
