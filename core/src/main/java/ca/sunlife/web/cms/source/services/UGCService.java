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
	 * @param url
	 * @param methodType
	 * @param userInfo
	 * @param requestParams
	 * @return
	 * @throws ApplicationException
	 * @throws SystemException
	 * @throws IOException
	 */
	public String callWebService (String url, String methodType, String userInfo, Map<String, String[]> requestParams)
			throws ApplicationException, SystemException, IOException;

}
