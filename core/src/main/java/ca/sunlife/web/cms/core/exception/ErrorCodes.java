package ca.sunlife.web.cms.core.exception;

public enum ErrorCodes {
	SYS_ERROR_001("System error code"),
	APP_ERROR_001("Application error code");
	
	private String errorMsg;
	
	ErrorCodes(String s){
		this.errorMsg = s;
	}
	
	public static String getValue(ErrorCodes e) {
		return e+" "+e.errorMsg;
	}
}
