/**
 *
 */
package ca.sunlife.web.cms.core.osgi.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

/**
 * The Interface CNWNewsConfig.
 *
 * @author mo92 The Interface CNWNewsConfig.
 */
@ ObjectClassDefinition (name = "CNW Services Configuration" , description = "CNW Services Configuration")
public @interface CNWNewsConfig {

  /**
   * Web service url for CNW services.
   *
   * @return the cnw service url
   */
  @ AttributeDefinition (name = "cnwServiceUrl" , description = "CNW Service URL" , defaultValue = "http://internal-www.sunlife.ca/slfServiceApp/invokeService.wca")
  String getCnwServiceUrl ();

  /**
   * Gets the date format locale mapping.
   *
   * @return the date format locale mapping
   */
  @ AttributeDefinition (name = "dateFormatLocaleMapping" , description = "Date format locale mapping" , defaultValue = {
      "en~MMMM dd, yyyy" , "fr~dd MMMM yyyy" })
  String [ ] getDateFormatLocaleMapping ();

}
