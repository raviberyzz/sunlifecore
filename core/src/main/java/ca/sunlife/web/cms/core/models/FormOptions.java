/*
 *
 */

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
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = SlingHttpServletRequest.class, adapters = Options.class, resourceType = "sunlife/core/components/form/options")
public class FormOptions extends OptionsImpl {
	
  /**
	* Instantiates a new form options.
   */
  public FormOptions() {
	    super();
  }

  /** The id. */
  @ Inject
  @ Via ("resource")
  @ Optional
  private String id;
  
  /**
   * Gets the constraint message.
   *
   * @return the constraint message
   */
  @ Inject
  @ Via ("resource")
  @ Optional
  private String constraintMessage;
  
  /**
   * Gets the required.
   *
   * @return the required
   */
  @ Inject
  @ Via ("resource")
  @ Optional
  private String required;

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
  
 
  
  
  /**
   * Gets the form action.
   *
   * @return the form action
   */
  public String getRequired() {
    return required;
  }

  /**
   * Sets the form action.
   *
   * @param formAction
   *          the new form action
   */
  public void setRequired(final String required) {
    this.required = required;
  }
  
  /**
   * Gets the form action.
   *
   * @return the form action
   */
  public String getConstraintMessage() {
    return constraintMessage;
  }

  /**
   * Sets the form action.
   *
   * @param formAction
   *          the new form action
   */
  public void setConstraintMessage(final String constraintMessage) {
    this.constraintMessage = constraintMessage;
  }
  
}
