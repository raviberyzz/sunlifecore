/*
 *
 */

package ca.sunlife.web.cms.core.osgi.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

/**
 * The Interface MailConfig.
 *
 * @author TCS
 * @version 1.0
 */
@ObjectClassDefinition (name = "Sun Life - Mail API Configuration", description = "API configuration for mail service - URL and KEY")
public @interface MailConfig {

  /**
   * Gets the api url.
   *
   * @return the api url
   */
  @AttributeDefinition(name = "Mail API", description = "Mail API URL")
  String getApiUrl() default "https://sit-www.sunlife.ca/slfServiceApp/invokeService.wca?service=email&amp;method=email&amp;format=json";

  /**
   * Gets the api key.
   *
   * @return the api key
   */
  @AttributeDefinition(name = "Mail API KEY", description = "API KEY for Mail service")
  String getApiKey() default "Ng1vE%^Uvdk$aP@E7SepA1N06#lQ!*kLs4siHSFq";

  /**
   * Gets the template path.
   *
   * @return the template path
   */
  @AttributeDefinition(name = "Template Path", description = "Content fragment paths for email templates")
  String getTemplatePath() default "/content/dam/sunlife/external/";

  /**
   * Gets the template path suffix.
   *
   * @return the template path suffix
   */
  @AttributeDefinition(name = "Template Path Suffic", description = "Content fragment paths for email templates suffix")
  String getTemplatePathSuffix() default "/content-fragments/email-templates/";

  /**
   * Gets the validation file path.
   *
   * @return the validation file path
   */
  @AttributeDefinition(name = "Form Validations Path", description = "Validation json path for form validations")
  String getValidationsPath() default "/content/dam/sunlife/global/shared-assets/json/sl-email-config.json";

  /**
   * Gets the success response.
   *
   * @return the success response
   */
  @AttributeDefinition(name = "Success Response", description = "JSON Response for success")
  String getSuccessResponse() default "success";

  /**
   * Gets the error response.
   *
   * @return the error response
   */
  @AttributeDefinition(name = "Error Response", description = "JSON Response for error")
  String getErrorResponse() default "failure";
}