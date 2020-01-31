package ca.sunlife.web.cms.core.services;

import java.io.IOException;

/**
 * The Interface CNWNewsService
 */
public interface CNWNewsService {

	/**
	 * Gets the CNW news list url
	 * 
	 * @return
	 */
	public String getCNWNewsListUrl();

	/**
	 * Gets the CNW news details url
	 * 
	 * @return
	 */
	public String getCNWNewsDetailsUrl();

	/**
	 * Gets the CNW news list url for top 3 news
	 * 
	 * @return
	 */
	public String getCNWNewsOverview() throws IOException;

	/**
	 * Calls web services(GET) - CNW News
	 * 
	 * @param url
	 * @return
	 * @throws IOException
	 */
	public String getCNWNews(String url) throws IOException;

	/**
	 * Calls web service for getting the CNW news details
	 * 
	 * @param url
	 * @return
	 * @throws IOException
	 */
	public String getCNWNewsDetails(String url) throws IOException;
}
