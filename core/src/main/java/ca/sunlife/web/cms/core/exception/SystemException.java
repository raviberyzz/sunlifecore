/*
 *
 */

package ca.sunlife.web.cms.core.exception;

/**
 * The Class SystemException.
 *
 * @author TCS
 * @version 1.0
 */
public class SystemException extends Exception {

  /** The Constant serialVersionUID. */
  private static final long serialVersionUID = 1L;

  /**
   * Instantiates a new system exception.
   */
  public SystemException() {
    super();
  }

  /**
   * Instantiates a new system exception.
   *
   * @param errorCode
   *          the error code
   */
  public SystemException(final ErrorCodes errorCode) {
    super(ErrorCodes.getValue(errorCode));
  }

  /**
   * Instantiates a new system exception.
   *
   * @param errorCode
   *          the error code
   * @param th
   *          the th
   */
  public SystemException(final ErrorCodes errorCode, final Throwable th) {
    super(ErrorCodes.getValue(errorCode), th);
  }
}
