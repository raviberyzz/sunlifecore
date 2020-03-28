package ca.sunlife.web.cms.core.services;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

import ca.sunlife.web.cms.core.beans.News;
import ca.sunlife.web.cms.core.beans.NewsDetails;
import ca.sunlife.web.cms.core.beans.ReleaseMain;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.models.NewsCategory;

/**
 * The Interface CNWNewsService.
 */
public interface CNWNewsService {

  /**
   * Gets top 3 CNW news.
   *
   * @param locale
   *          the locale
   * @param numberOfNews
   *          the number of news
   * @param newsCategories
   *          the news categories
   * @return ReleaseMain
   * @throws IOException
   *           Signals that an I/O exception has occurred.
   * @throws ApplicationException
   *           the application exception
   * @throws SystemException
   *           the system exception
   */
  public ReleaseMain getCNWNewsOverview(String locale , String numberOfNews ,
      List <NewsCategory> newsCategories)
      throws IOException , ApplicationException , SystemException;

  /**
   * Gets CNW News Release List.
   *
   * @param locale
   *          the locale
   * @param requestURL
   *          the request URL
   * @param pageNum
   *          the page num
   * @param strYear
   *          the str year
   * @param pageSize
   *          the page size
   * @param newsCategories
   *          the news categories
   * @return News
   * @throws IOException
   *           Signals that an I/O exception has occurred.
   * @throws ApplicationException
   *           the application exception
   * @throws SystemException
   *           the system exception
   */
  public News getCNWNews(String locale , String requestURL , String pageNum , String strYear ,
      String pageSize , List <NewsCategory> newsCategories)
      throws IOException , ApplicationException , SystemException;

  /**
   * Gets CNW news details using release id.
   *
   * @param id
   *          the id
   * @param locale
   *          the locale
   * @return NewsDetails
   * @throws IOException
   *           Signals that an I/O exception has occurred.
   * @throws ParseException
   *           the parse exception
   * @throws ApplicationException
   *           the application exception
   * @throws SystemException
   *           the system exception
   */
  public NewsDetails getCNWNewsDetails(String id , String locale)
      throws IOException , ParseException , ApplicationException , SystemException;
}
