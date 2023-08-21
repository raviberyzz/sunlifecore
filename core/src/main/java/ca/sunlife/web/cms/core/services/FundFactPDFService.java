package ca.sunlife.web.cms.core.services;

import java.io.IOException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;

/**
 * The Interface FundFactPDFService.
 *
 * @author TCS
 * @version 1.0
 */
public interface FundFactPDFService {

	/**
	 * Gets the compiled mustache templates data.
	 *
	 * @param request
	 *          the request
	 * @throws ApplicationException
	 * @throws SystemException
	 * @throws IOException
	 * @throws LoginException
	 */
	public String getCompiledData(SlingHttpServletRequest request)
			throws ApplicationException, SystemException, IOException, LoginException;

}
