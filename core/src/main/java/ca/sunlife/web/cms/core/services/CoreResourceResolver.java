/*
 *
 */

package ca.sunlife.web.cms.core.services;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;

/**
 * The Interface CoreResourceResolver.
 *
 * @author TCS
 * @version 1.0
 */
public interface CoreResourceResolver {

  /**
   * Gets the resource resolver.
   *
   * @return the resource resolver
   * @throws LoginException
   *           the login exception
   */
  public ResourceResolver getResourceResolver() throws LoginException;

  /**
   * Close resource resolver.
   *
   * @param resourceResolver
   *          the resource resolver
   */
  public void closeResourceResolver(ResourceResolver resourceResolver);
}
