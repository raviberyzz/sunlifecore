/*
 *
 */

package ca.sunlife.web.cms.core.services;

import java.io.IOException;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;

/**
 * The Interface ProviderProfileService.
 *
 * @author TCS
 * @version 1.0
 */
public interface ProviderProfileService {

  /**
   * Gets the provider profile.
   *
   * @param locale
   *          the locale
   * @param pageNo
   *          the page no
   * @param mustachTemplate
   *          the mustach template
   * @return the provider profile
   * @throws ApplicationException
   *           the application exception
   * @throws SystemException
   *           the system exception
   * @throws IOException
   *           Signals that an I/O exception has occurred.
   */
  public String getProviderProfile(String locale, String pageNo, String mustachTemplate)
      throws ApplicationException, SystemException, IOException;
}
