package ca.sunlife.web.cms.core.services;

import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.LoginException;

/**
 * The Interface SiteConfigService.
 */
public interface SiteConfigService {

	/**
	 * Gets the config values.
	 *
	 * @param name the name
	 * @param resourcePath the resource path
	 * @return the config values
	 * @throws LoginException the login exception
	 * @throws RepositoryException the repository exception
	 */
	public String getConfigValues(String name, String resourcePath) throws LoginException, RepositoryException;

	/**
	 * Sets the configuration.
	 *
	 * @throws LoginException the login exception
	 * @throws RepositoryException the repository exception
	 */
	public void setConfiguration() throws LoginException, RepositoryException;
	
	/**
	 * Gets the page url.
	 *
	 * @param pagePath the page path
	 * @return the page url
	 */
	public String getPageUrl(String pagePath);
}
