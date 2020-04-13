package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.Via;

import com.adobe.cq.wcm.core.components.internal.models.v1.form.ContainerImpl;
import com.adobe.cq.wcm.core.components.models.form.Container;

/**
 * The Class FormContainer.
 */
@ Model (adaptables = SlingHttpServletRequest.class, adapters = Container.class, resourceType = "sunlife/core/components/form/container")
public class FormContainer extends ContainerImpl {

  /**
   * Instantiates a new form container.
   */
  public FormContainer() {
    super();
  }

  /** The form action. */
  @ Inject
  @ Via ("resource")
  @ Optional
  private String formAction;

  /** The validation. */
  @ Inject
  @ Via ("resource")
  @ Optional
  private String validation;
  
  /** The data section. */
  @ Inject
  @ Via ("resource")
  @ Optional
  private String dataSection;

  /**
   * Gets the form action.
   *
   * @return the formAction
   */
  public String getFormAction() {
    return formAction;
  }

  /**
   * Sets the form action.
   *
   * @param formAction
   *          the formAction to set
   */
  public void setFormAction(final String formAction) {
    this.formAction = formAction;
  }

  /**
   * Gets the validation.
   *
   * @return the validation
   */
  public String getValidation() {
    return validation;
  }

  /**
   * Sets the validation.
   *
   * @param validation
   *          the validation to set
   */
  public void setValidation(final String validation) {
    this.validation = validation;
  }
  
  /**
   * Gets the data section attribute.
   *
   * @return the data section attribute
   */
  public String getDataSection() {
    return dataSection;
  }

  /**
   * Sets the data section attributes
   *
   * @param data section
   *          the data section to set
   */
  public void setDataSection(final String dataSection) {
    this.dataSection = dataSection;
  }

}
