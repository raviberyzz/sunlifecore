/**
 * 
 */
package ca.sunlife.web.cms.source.services;

import java.io.IOException;
import java.util.Map;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.models.UserInfo;

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
	 * 	url
	 * @param methodType
	 *  methodType
	 * @param userInfo
	 * 	userInfo
	 * @param requestParams
	 * 	requestParams
	 * @param requestJsonPost
	 * 	requestJsonPost
	 * @return
	 *  string response
	 * @throws ApplicationException
	 * 	ApplicationException
	 * @throws SystemException
	 * 	SystemException
	 * @throws IOException
	 * 	IOException
	 */
	public String callWebService(String url, String methodType, UserInfo userInfo, Map<String, String[]> requestParams, String requestJsonPost)
			throws ApplicationException, SystemException, IOException;

}
