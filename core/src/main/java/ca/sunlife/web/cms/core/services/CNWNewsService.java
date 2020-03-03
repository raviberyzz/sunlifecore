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
 * The Interface CNWNewsService
 */
public interface CNWNewsService {

	/**
	 * Gets top 3 CNW news
	 * 
	 * @param locale
	 * @return ReleaseMain
	 * @throws IOException 
	 * @throws SystemException 
	 * @throws ApplicationException 
	 * @throws ParseException 
	 */
	public ReleaseMain getCNWNewsOverview(String locale, String numberOfNews, List<NewsCategory> newsCategories) throws IOException, ApplicationException, SystemException;

	/**
	 * Gets CNW News Release List
	 * 
	 * @param locale
	 * @param requestURL
	 * @param pageNum
	 * @param strYear
	 * @return News
	 * @throws IOException
	 * @throws SystemException 
	 * @throws ApplicationException 
	 */
	public News getCNWNews(String locale, String requestURL, String pageNum, String strYear, String pageSize, List<NewsCategory> newsCategories) throws IOException, ApplicationException, SystemException;

	/**
	 * Gets CNW news details using release id
	 * 
	 * @param id
	 * @param locale
	 * @return NewsDetails
	 * @throws IOException
	 * @throws ParseException
	 * @throws SystemException 
	 * @throws ApplicationException 
	 */
	public NewsDetails getCNWNewsDetails(String id, String locale) throws IOException, ParseException, ApplicationException, SystemException;
}
