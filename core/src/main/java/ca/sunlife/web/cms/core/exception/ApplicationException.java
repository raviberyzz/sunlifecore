/*
 *
 */

package ca.sunlife.web.cms.core.exception;

/**
 * The Class ApplicationException.
 *
 * @author TCS
 * @version 1.0
 */
public class ApplicationException extends Exception {

  /** The Constant serialVersionUID. */
  private static final long serialVersionUID = - 1524596294590010569L;

  /**
   * Instantiates a new application exception.
   */
  public ApplicationException() {
    super();
  }

  /**
   * Instantiates a new application exception.
   *
   * @param errorCode
   *          the error code
   */
  public ApplicationException(final ErrorCodes errorCode) {
    super(ErrorCodes.getValue(errorCode));
  }

  /**
   * Instantiates a new application exception.
   *
   * @param errorCode
   *          the error code
   * @param th
   *          the th
   */
  public ApplicationException(final ErrorCodes errorCode, final Throwable th) {
    super(ErrorCodes.getValue(errorCode), th);
  }

}
