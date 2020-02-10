package ca.sunlife.web.cms.core.models;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;
import com.fasterxml.jackson.databind.ObjectMapper;

import ca.sunlife.web.cms.core.beans.News;
import ca.sunlife.web.cms.core.services.CNWNewsService;

/**
 * @author mo92 
 * The Class CNWNewsModel - Sling model for CNW News list
 * 
 */
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CNWNewsModel {

	/** The log */
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Inject
	private Page currentPage;

	@Self
	private SlingHttpServletRequest request;

	@Inject
	private CNWNewsService newsService;

	/** News article url */
	@Inject
	@Via("resource")
	private String newsArticleUrl;

	/** Previous button text */
	@Inject
	@Via("resource")
	private String previousText;

	/** Next button text */
	@Inject
	@Via("resource")
	private String nextText;

	/** Page label text */
	@Inject
	@Via("resource")
	private String pageText;

	/** Of label text */
	@Inject
	@Via("resource")
	private String ofText;

	/** News */
	private News news;

	/** Active Year */
	private int activeYear;

	/** Years To Show - Tabs */
	private List<Integer> yearsToShow;

	/** requestURL */
	private String requestURL;

	/** relative URL - without any selectors */
	private String relativeURL;

	/**
	 * @return the newsArticleUrl
	 */
	public String getNewsArticleUrl() {
		return newsArticleUrl;
	}

	/**
	 * @param newsArticleUrl the newsArticleUrl to set
	 */
	public void setNewsArticleUrl(String newsArticleUrl) {
		this.newsArticleUrl = newsArticleUrl;
	}

	/**
	 * @return the previousText
	 */
	public String getPreviousText() {
		return previousText;
	}

	/**
	 * @param previousText
	 *            the previousText to set
	 */
	public void setPreviousText(String previousText) {
		this.previousText = previousText;
	}

	/**
	 * @return the nextText
	 */
	public String getNextText() {
		return nextText;
	}

	/**
	 * @param nextText
	 *            the nextText to set
	 */
	public void setNextText(String nextText) {
		this.nextText = nextText;
	}

	/**
	 * @return the pageText
	 */
	public String getPageText() {
		return pageText;
	}

	/**
	 * @param pageText
	 *            the pageText to set
	 */
	public void setPageText(String pageText) {
		this.pageText = pageText;
	}

	/**
	 * @return the ofText
	 */
	public String getOfText() {
		return ofText;
	}

	/**
	 * @param ofText
	 *            the ofText to set
	 */
	public void setOfText(String ofText) {
		this.ofText = ofText;
	}

	/**
	 * @return the news
	 */
	public News getNews() {
		return news;
	}

	/**
	 * @param news
	 *            the news to set
	 */
	public void setNews(News news) {
		this.news = news;
	}

	/**
	 * @return the activeYear
	 */
	public int getActiveYear() {
		return activeYear;
	}

	/**
	 * @param activeYear
	 *            the activeYear to set
	 */
	public void setActiveYear(int activeYear) {
		this.activeYear = activeYear;
	}

	/**
	 * @return the yearsToShow
	 */
	public List<Integer> getYearsToShow() {
		return yearsToShow;
	}

	/**
	 * @param yearsToShow
	 *            the yearsToShow to set
	 */
	public void setYearsToShow(List<Integer> yearsToShow) {
		this.yearsToShow = yearsToShow;
	}

	/**
	 * @return the requestURL
	 */
	public String getRequestURL() {
		return requestURL;
	}

	/**
	 * @param requestURL
	 *            the requestURL to set
	 */
	public void setRequestURL(String requestURL) {
		this.requestURL = requestURL;
	}

	/**
	 * @return the relativeURL
	 */
	public String getRelativeURL() {
		return relativeURL;
	}

	/**
	 * @param relativeURL
	 *            the relativeURL to set
	 */
	public void setRelativeURL(String relativeURL) {
		this.relativeURL = relativeURL;
	}

	@PostConstruct
	public void init() throws IOException {
		logger.debug("Entry :: CNWNewsModel :: init ");
		String locale = null;
		int year;
		int totalNoYears = 3;
		String strYear = null;
		String pageNum = null;
		try {

			year = Calendar.getInstance().get(Calendar.YEAR);
			int downYear = year;
			yearsToShow = new ArrayList<>();
			for (int i = 0; i < totalNoYears; i++) {
				yearsToShow.add(downYear--);
			}
			logger.debug("yearsToShow :: {}", yearsToShow);

			activeYear = year;
			locale = currentPage.getLanguage().getLanguage();
			logger.debug("Fetched locale :: {}", locale);
			String[] selectors = request.getRequestPathInfo().getSelectors();
			if (selectors.length > 0) {
				strYear = selectors[0]; // Year - Selector
				if (selectors.length > 1) {
					pageNum = selectors[1]; // Page number - Selector
				}
			}
			logger.debug("Fetched params  pageNum: {}, strYear: {}", pageNum, strYear);

			if (null != strYear && !"".equals(strYear)) {
				activeYear = Integer.parseInt(strYear);
			}
			logger.debug("activeYear :: {}", activeYear);

			String uri = request.getRequestURI();
			logger.debug("uri: {}", uri);
			relativeURL = uri.substring(0, uri.indexOf('.'));
			requestURL = uri.substring(0, uri.lastIndexOf('.'));
			logger.debug("relativeURL: {}, requestURL: {}", relativeURL, requestURL);
			if (null != pageNum) { // Code to remove page number from url
				requestURL = requestURL.replaceAll("." + pageNum + "$", "");
			}
			logger.debug("requestURL - after clean up: {}", requestURL);
			news = newsService.getCNWNews(locale, requestURL, pageNum, String.valueOf(activeYear));
			if (logger.isDebugEnabled()) {
				logger.debug("Final news object :: {}", new ObjectMapper().writeValueAsString(news));
			}
		} catch (IOException e) {
			logger.error("Error :: CNWNewsModel :: init method :: {}", e);
			throw e;
		}
	}

}
