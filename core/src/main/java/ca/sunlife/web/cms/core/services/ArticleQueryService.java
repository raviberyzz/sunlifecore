/**
 *
 */
package ca.sunlife.web.cms.core.services;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;

/**
 * The Interface ArticleQueryService.
 *
 * @author TCS
 * @version 1.0
 */
public interface ArticleQueryService {

  /**
   * Gets the Article Query details.
   *
   * @param selectors
   *          the language
   * @param queryParameterMap
   *          the page id
   * @param advisorId
   *          the advisor id
   * @return the advisor details
   * @throws ApplicationException
   *           the application exception
   * @throws SystemException
   *           the system exception
   */
  public String getAdvisorDetails(String language, String pageId, String advisorId)
      throws ApplicationException, SystemException;

}

