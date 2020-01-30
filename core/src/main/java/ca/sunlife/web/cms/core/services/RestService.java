/**
 * 
 */
package ca.sunlife.web.cms.core.services;

import java.io.IOException;

/**
 * @author mo92
 * The Interface RestService
 */
public interface RestService {

	/**
	 * Calls the GET url using HTTP client
	 * @param url
	 * @return
	 * @throws IOException
	 */
	public String callGetWebService(String url) throws IOException;
	
}
