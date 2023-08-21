/*
 *
 */

package ca.sunlife.web.cms.core.services;

import java.util.Set;

import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.LoginException;

/**
 * The Interface SiteConfigService.
 *
 * @author TCS
 * @version 1.0
 */
public interface SiteConfigService {

  /**
   * Gets the config values.
   *
   * @param name
   *          the name
   * @param resourcePath
   *          the resource path
   * @return the config values
   * @throws LoginException
   *           the login exception
   * @throws RepositoryException
   *           the repository exception
   */
  public String getConfigValues(String name, String resourcePath)
      throws LoginException, RepositoryException;

  /**
   * Sets the configuration.
   *
   * @throws LoginException
   *           the login exception
   * @throws RepositoryException
   *           the repository exception
   */
  public void setConfiguration() throws LoginException, RepositoryException;

  /**
   * Gets the page url.
   *
   * @param pagePath
   *          the page path
   * @return the page url
   */
  public String getPageUrl(String pagePath);
  
  /**
   * Gets the page relative url.
   *
   * @param pagePath
   *          the page path
   * @return the page relative url
   */
  public String getPageRelativeUrl(String pagePath);
  
  /**
   * Gets the all sites.
   *
   * @param propName
   *          the prop name
   * @return the all sites
   */
  public Set<String> getAllSites(String propName);
}
