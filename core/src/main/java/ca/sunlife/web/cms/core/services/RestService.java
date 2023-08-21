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
	 *  the url
	 * @param requestHeaders
	 *  the requestHeaders
	 * @return
	 * @throws ApplicationException
	 * 	ApplicationException
	 * @throws SystemException
	 *  SystemException
	 * @throws IOException
	 * 	IOException
	 */
	String callGetWebService(final String url, final String requestHeaders)
			throws ApplicationException, SystemException, IOException;

	/**
	 * @param url
	 * 	url
	 * @param requestHeaders
	 * 	requestHeaders
	 * @param requestParams
	 * 	requestParams
	 * @return
	 * @throws ApplicationException
	 * 	ApplicationException
	 * @throws SystemException
	 * 	SystemException
	 * @throws IOException
	 * 	IOException
	 */
	String callPostWebService(final String url, final String requestHeaders, final String requestParams)
			throws ApplicationException, SystemException, IOException;
	
	/**
	 * @param url
	 * 	url
	 * @param requestHeaders
	 * 	requestHeaders
	 * @param requestParams
	 * 	requestParams
	 * @return
	 * @throws ApplicationException
	 * 	ApplicationException
	 * @throws SystemException
	 * 	SystemException
	 * @throws IOException
	 * 	IOException
	 */
	String callDeleteWebService(final String url, final String requestHeaders, final String requestParams)
			throws ApplicationException, SystemException, IOException;

}
