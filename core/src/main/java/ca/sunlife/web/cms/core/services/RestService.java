/**
 *
 */
package ca.sunlife.web.cms.core.services;

import java.io.IOException;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;

/**
 * The Interface RestService.
 *
 * @author mo92 The Interface RestService
 */
public interface RestService {

  /**
   * Calls the GET url using HTTP client.
   *
   * @param url
   *          the url
   * @return the string
   * @throws ApplicationException
   *           the application exception
   * @throws SystemException
   *           the system exception
   * @throws IOException
   *           Signals that an I/O exception has occurred.
   */
  public String callGetWebService(String url)
      throws ApplicationException, SystemException, IOException;

}
