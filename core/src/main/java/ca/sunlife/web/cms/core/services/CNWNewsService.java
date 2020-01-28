package ca.sunlife.web.cms.core.services;

import java.io.IOException;

public interface CNWNewsService {

	/**
	 * Calls GET web services
	 * @param url
	 * @return
	 * @throws IOException
	 */
	public String callGet(String url) throws IOException;
	
}
