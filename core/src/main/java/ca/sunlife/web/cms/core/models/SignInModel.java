/*
 *
 */

package ca.sunlife.web.cms.core.models;


import java.util.List;
import javax.inject.Inject;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface SignInModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = {
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface SignInModel {
	
  /**
   * Gets the title.
   *
   * @return the title
   */
  @ Inject
  String getTitle();

  /**
   * Gets the background colour.
   *
   * @return the background colour
   */
  @ Inject
  String getBackgroundColour();
  
  /**
   * Gets the access id placeholder.
   *
   * @return the access id placeholder
   */
  @ Inject
  String getAccessIDPlaceholder();
  
   /**
   * Gets the password placeholder.
   *
   * @return the password placeholder
   */
  @ Inject
  String getPasswordPlaceholder();
  
  /**
   * Gets the checkbox label.
   *
   * @return the checkbox label
   */
  @ Inject
  String getCheckboxLabel();
  
  /**
   * Gets the sign in button label.
   *
   * @return the sign in button label
   */
  @ Inject
  String getSignInButtonLabel();
  
  /**
   * Gets the form action url.
   *
   * @return the form action url
   */
  @ Inject
  String getFormActionUrl();
  
  /**
   * Gets the forgot access id label.
   *
   * @return the forgot access id label
   */
  @ Inject
  String getForgotAccessIdLabel();
  
  /**
   * Gets the forgot access id link.
   *
   * @return the forgot access id link
   */
  @ Inject
  String getForgotAccessIdLink();
  
  /**
   * Gets the forgot password label.
   *
   * @return the forgot password label
   */
  @ Inject
  String getForgotPasswordLabel();
  
  /**
   * Gets the forgot password link.
   *
   * @return the forgot password link
   */
  @ Inject
  String getForgotPasswordLink();
  
  /**
   * Gets the sign in content.
   *
   * @return the sign in content
   */
  @ Inject
  String getSignInContent();
  
  /**
   * Gets the domain.
   *
   * @return the domain
   */
  @ Inject
  String getDomain();
  
  /**
   * Gets the language.
   *
   * @return the language
   */
  @ Inject
  String getLanguage();
  
  /**
   * Gets the loglang.
   *
   * @return the loglang
   */
  @ Inject
  String getLogLang();
  
  /**
   * Gets the target.
   *
   * @return the target
   */
  @ Inject
  String getTarget();

  /**
   * Gets the error message placeholder.
   *
   * @return the error message placeholder
   */
  @ Inject
  String getErrorMsgPlaceholder();
  
  /**
   * Gets the hidden metadata.
   *
   * @return the hidden metadata
   */
  @ Inject
  List <HiddenMetadata> getHiddenMetadata(); // the name `getHiddenMetadata` corresponds to the multifield name="./hiddenMetadata"
  
  
  /**
   * The Interface HiddenMetadata.
   *
   * @author TCS
   * @version 1.0
   */

  @ Model (adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
  interface HiddenMetadata {

    /**
     * Gets the name.
     *
     * @return the name
     */
    @ Inject
    String getName();

    /**
     * Gets the value.
     *
     * @return the value
     */
    @ Inject
    String getValue();

  }


}
