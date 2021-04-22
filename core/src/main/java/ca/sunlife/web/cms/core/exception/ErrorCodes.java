/*
 *
 */

package ca.sunlife.web.cms.core.exception;

/**
 * The Enum ErrorCodes.
 *
 * @author TCS
 * @version 1.0
 */
public enum ErrorCodes {

  /** The sys error 001. */
  SYS_ERROR_001("System error code"),

  /** The app error 001. */
  APP_ERROR_001("Application error code"),

  /** The app error 200. */
  APP_ERROR_200("Not able to purge AKAMAI request"),
  
  APP_ERROR_201("Not able to get or create poilicy version"),
  
  APP_ERROR_202("Unable to parse rules");

  /** The error msg. */
  private String errorMsg;

  /**
   * Instantiates a new error codes.
   *
   * @param s
   *          the s
   */
  ErrorCodes(final String s) {
    errorMsg = s;
  }

  /**
   * Gets the value.
   *
   * @param e
   *          the e
   * @return the value
   */
  public static String getValue(final ErrorCodes e) {
    return e + " " + e.errorMsg;
  }
}
