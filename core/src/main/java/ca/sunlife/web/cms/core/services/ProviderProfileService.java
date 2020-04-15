package ca.sunlife.web.cms.core.services;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import java.io.IOException;

/**
 * The Interface
 * ProviderProfileService.
 */
public interface ProviderProfileService {

	/**
	 * Gets provider profile data.
	 * 
	 * @param locale
	 *            the locale
	 * @param pageNo
	 *            the page no
	 * @param mustachTemplate
	 *            the mustache
	 *            template
	 * @return string string
	 * @throws ApplicationException
	 *             the application
	 *             exception
	 * @throws SystemException
	 *             the system
	 *             exception
	 * @throws IOException
	 *             the IO
	 *             exception
	 */
	public String getProviderProfile(String locale, String pageNo, String mustachTemplate) throws ApplicationException, SystemException,
	                                                                                                                        IOException;
}
