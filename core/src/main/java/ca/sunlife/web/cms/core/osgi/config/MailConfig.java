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
  String getApiUrl();

  /**
   * Gets the api key.
   *
   * @return the api key
   */
  @AttributeDefinition(name = "Mail API KEY", description = "API KEY for Mail service")
  String getApiKey();

  /**
   * Gets the template path.
   *
   * @return the template path
   */
  @AttributeDefinition(name = "Template Path", description = "Content fragment paths for email templates")
  String getTemplatePath();

  /**
   * Gets the template path suffix.
   *
   * @return the template path suffix
   */
  @AttributeDefinition(name = "Template Path Suffic", description = "Content fragment paths for email templates suffix")
  String getTemplatePathSuffix();

  /**
   * Gets the validation file path.
   *
   * @return the validation file path
   */
  @AttributeDefinition(name = "Form Validations Path", description = "Validation json path for form validations")
  String getValidationsPath();

  /**
   * Gets the success response.
   *
   * @return the success response
   */
  @AttributeDefinition(name = "Success Response", description = "JSON Response for success")
  String getSuccessResponse();

  /**
   * Gets the error response.
   *
   * @return the error response
   */
  @AttributeDefinition(name = "Error Response", description = "JSON Response for error")
  String getErrorResponse();
}