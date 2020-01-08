package ca.sunlife.web.cms.core.exception;

/**
 * The Class ApplicationException.
 */
public class ApplicationException extends Exception {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = -1524596294590010569L;
	
	/**
	 * Instantiates a new application exception.
	 */
	public ApplicationException() {
		super();
	}
	
	/**
	 * Instantiates a new application exception.
	 *
	 * @param errorCode the error code
	 */
	public ApplicationException(ErrorCodes errorCode) {
		super(ErrorCodes.getValue(errorCode));
	}
	
	/**
	 * Instantiates a new application exception.
	 *
	 * @param errorCode the error code
	 * @param th the th
	 */
	public ApplicationException(ErrorCodes errorCode,Throwable th) {
		super(ErrorCodes.getValue(errorCode),th);
	}

}
