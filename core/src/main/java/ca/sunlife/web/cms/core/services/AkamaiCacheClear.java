package ca.sunlife.web.cms.core.services;

import ca.sunlife.web.cms.core.exception.ApplicationException;

/**
 * The Interface AkamaiCacheClear.
 */
public interface AkamaiCacheClear {
  
  /**
   * Invalidate pages.
   *
   * @param paths the paths
   * @return the string
   * @throws ApplicationException the application exception
   */
  public String invalidatePages(String[] paths) throws ApplicationException;
  
  /**
   * Invalidate assets.
   *
   * @param paths the paths
   * @return the string
   * @throws ApplicationException the application exception
   */
  public String invalidateAssets(String[] paths) throws ApplicationException;
}
