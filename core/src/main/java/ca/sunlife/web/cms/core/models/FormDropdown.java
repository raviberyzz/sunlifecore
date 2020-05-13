/*
 *
 */

package ca.sunlife.web.cms.core.models;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface FormDropdown.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = {
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface FormDropdown {

  /**
   * Gets the title.
   *
   * @return the title
   */
  @ Inject
  @ Named (com.day.cq.commons.jcr.JcrConstants.JCR_TITLE)
  public String getTitle();

  /**
   * Gets the id.
   *
   * @return the id
   */
  @ Inject
  public String getId();

  /**
   * Gets the checks if is screen reader.
   *
   * @return the checks if is screen reader
   */
  @ Inject
  public String getIsScreenReader();

  /**
   * Gets the data title.
   *
   * @return the data title
   */
  @ Inject
  public String getDataTitle();

  /**
   * Gets the data value.
   *
   * @return the data value
   */
  @ Inject
  public String getDataValue();

  /**
   * Gets the required.
   *
   * @return the required
   */
  @ Inject
  public String getRequired();

  /**
   * Gets the constraint message.
   *
   * @return the constraint message
   */
  @ Inject
  public String getConstraintMessage();

  /**
   * Gets the name.
   *
   * @return the name
   */
  @ Inject
  public String getName();

  /**
   * Gets the type.
   *
   * @return the type
   */
  @ Inject
  public String getType();

  /**
   * Gets the help message.
   *
   * @return the help message
   */
  @ Inject
  public String getHelpMessage();

  /**
   * Gets the aria label.
   *
   * @return the aria label
   */
  @ Inject
  public String getAriaLabel();

  /**
   * Gets the items group.
   *
   * @return the items group
   */
  @ Inject
  public List <ItemsGroup> getItemsGroup();

  /**
   * Gets the custom action generation required.
   *
   * @return the custom action generation required
   */
  @ Inject
  public String getCustomActionGenerationRequired();

  /**
   * The Interface ItemsGroup.
   *
   * @author TCS
   * @version 1.0
   */
  @ Model (adaptables = {
      Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
  public interface ItemsGroup {

    /**
     * Gets the group text.
     *
     * @return the group text
     */
    @ Inject
    public String getGroupText();

    /**
     * Gets the items.
     *
     * @return the items
     */
    @ Inject
    public List <Items> getItems();

  }

  /**
   * The Interface Items.
   *
   * @author TCS
   * @version 1.0
   */
  @ Model (adaptables = {
      Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
  public interface Items {

    /**
     * Gets the text.
     *
     * @return the text
     */
    @ Inject
    public String getText();

    /**
     * Gets the value.
     *
     * @return the value
     */
    @ Inject
    public String getValue();

    /**
     * Checks if is selected.
     *
     * @return true, if is selected
     */
    @ Inject
    public boolean isSelected();

    /**
     * Checks if is disabled.
     *
     * @return true, if is disabled
     */
    @ Inject
    public boolean isDisabled();

    /**
     * Gets the short name.
     *
     * @return the short name
     */
    @ Inject
    public String getShortName();

  }

}
