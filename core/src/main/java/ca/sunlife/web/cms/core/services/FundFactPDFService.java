package ca.sunlife.web.cms.core.services;

import java.io.IOException;

import org.apache.sling.api.SlingHttpServletRequest;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;

/**
 * The Interface FundFactPDFService.
 *
 * @author TCS
 * @version 1.0
 */
public interface FundFactPDFService {

	public String getCompiledData(SlingHttpServletRequest request) throws ApplicationException, SystemException, IOException;
	
}
