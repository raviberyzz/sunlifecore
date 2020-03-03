/**
 * 
 */
package ca.sunlife.web.cms.core.services;

import java.io.IOException;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;

/**
 * @author mo92
 * The Interface RestService
 */
public interface RestService {

	/**
	 * Calls the GET url using HTTP client
	 * @param url
	 * @return
	 * @throws SystemException 
	 * @throws ApplicationException 
	 * @throws IOException 
	 */
	public String callGetWebService(String url) throws ApplicationException, SystemException, IOException;
	
}
