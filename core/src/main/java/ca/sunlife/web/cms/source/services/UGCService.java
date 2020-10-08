/**
 * 
 */
package ca.sunlife.web.cms.source.services;

import java.io.IOException;
import java.util.Map;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;

/**
 * The Interface UGCService.
 *
 * @author TCS
 * @version 1.0
 */
public interface UGCService {

	/**
	 * Calls web service.
	 * @param url
	 * @param methodType
	 * @param userInfo
	 * @param requestParams
	 * @param requestJsonPost
	 * @return
	 * @throws ApplicationException
	 * @throws SystemException
	 * @throws IOException
	 */
	public String callWebService (String url, String methodType, String userInfo, Map<String, String[]> requestParams, String requestJsonPost)
			throws ApplicationException, SystemException, IOException;

}
