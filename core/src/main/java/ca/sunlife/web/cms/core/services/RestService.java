/**
 *
 */
package ca.sunlife.web.cms.core.services;

import java.io.IOException;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;

/**
 * The Interface RestService.
 *
 * @author TCS
 * @version 1.0
 */
public interface RestService {

	/**
	 * @param url
	 * @param requestHeaders
	 * @return
	 * @throws ApplicationException
	 * @throws SystemException
	 * @throws IOException
	 */
	String callGetWebService (final String url, final String requestHeaders)
			throws ApplicationException, SystemException, IOException;

	/**
	 * @param url
	 * @param requestHeaders
	 * @param requestParams
	 * @return
	 * @throws ApplicationException
	 * @throws SystemException
	 * @throws IOException
	 */
	String callPostWebService (final String url, final String requestHeaders, final String requestParams)
			throws ApplicationException, SystemException, IOException;

}
