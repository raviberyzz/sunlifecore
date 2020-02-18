package ca.sunlife.web.cms.core.services;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

import ca.sunlife.web.cms.core.beans.News;
import ca.sunlife.web.cms.core.beans.NewsDetails;
import ca.sunlife.web.cms.core.beans.ReleaseMain;
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
	 */
	public ReleaseMain getCNWNewsOverview(String locale, String numberOfNews, List<NewsCategory> newsCategories) throws IOException;

	/**
	 * Gets CNW News Release List
	 * 
	 * @param locale
	 * @param requestURL
	 * @param pageNum
	 * @param strYear
	 * @return News
	 * @throws IOException
	 */
	public News getCNWNews(String locale, String requestURL, String pageNum, String strYear, String pageSize, List<NewsCategory> newsCategories) throws IOException;

	/**
	 * Gets CNW news details using release id
	 * 
	 * @param id
	 * @param locale
	 * @return NewsDetails
	 * @throws IOException
	 * @throws ParseException
	 */
	public NewsDetails getCNWNewsDetails(String id, String locale) throws IOException, ParseException;
}
