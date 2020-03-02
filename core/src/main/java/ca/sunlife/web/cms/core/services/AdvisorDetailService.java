/**
 * 
 */
package ca.sunlife.web.cms.core.services;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;

/**
 * The Interface AdvisorDetailService
 *
 */
public interface AdvisorDetailService {

	/**
	 * Gets advisor details
	 * 
	 * @param language
	 * @param pageId
	 * @param advisorId
	 * @return
	 * @throws ApplicationException 
	 * @throws SystemException 
	 */
	public String getAdvisorDetails(String language, String pageId, String advisorId) throws ApplicationException, SystemException;

}
