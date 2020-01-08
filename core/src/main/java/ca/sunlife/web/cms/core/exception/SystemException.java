package ca.sunlife.web.cms.core.exception;

/**
 * The Class SystemException.
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
	 * @param errorCode the error code
	 */
	public SystemException(ErrorCodes errorCode) {
		super(ErrorCodes.getValue(errorCode));
	}
	
	/**
	 * Instantiates a new system exception.
	 *
	 * @param errorCode the error code
	 * @param th the th
	 */
	public SystemException(ErrorCodes errorCode,Throwable th) {
		super(ErrorCodes.getValue(errorCode),th);
	}
}
