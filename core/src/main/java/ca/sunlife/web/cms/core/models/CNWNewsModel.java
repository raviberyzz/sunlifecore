package ca.sunlife.web.cms.core.models;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
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
import ca.sunlife.web.cms.core.beans.ReleaseMain;
import ca.sunlife.web.cms.core.constants.BasePageModelConstants;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.services.CNWNewsService;
import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * @author mo92 The Class CNWNewsModel - Sling model for CNW News list
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

	/** The config service. */
	@Inject
	private SiteConfigService configService;
	
	/** News display type */
	@Inject
	@Via("resource")
	private String newsType;

	// overview starts

	/** Number of news to be displayed */
	@Inject
	@Via("resource")
	private String numberOfNews;

	// overview ends

	/** Latest year */
	@Inject
	@Via("resource")
	private String latestYear;

	/** No. of tabs */
	@Inject
	@Via("resource")
	private String numberOfTabs;

	/** News categories */
	@Inject
	@Via("resource")
	private List<NewsCategory> newsCategories;

	/** News article url */
	@Inject
	@Via("resource")
	private String newsArticleUrl;

	/** Page size */
	@Inject
	@Via("resource")
	private String pageSize;

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
	
	/** Message when no news are there */
	@Inject
	@Via("resource")
	private String noNewsMessage;

	private String locale;

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

	// overview starts
	/** Release News Object */
	private ReleaseMain releaseMain;

	// overview ends

	private String newsArticleShortenedUrl;
	
	/**
	 * @return the latestYear
	 */
	public String getLatestYear() {
		return latestYear;
	}

	/**
	 * @param latestYear
	 *            the latestYear to set
	 */
	public void setLatestYear(String latestYear) {
		this.latestYear = latestYear;
	}

	/**
	 * @return the numberOfTabs
	 */
	public String getNumberOfTabs() {
		return numberOfTabs;
	}

	/**
	 * @param numberOfTabs
	 *            the numberOfTabs to set
	 */
	public void setNumberOfTabs(String numberOfTabs) {
		this.numberOfTabs = numberOfTabs;
	}

	/**
	 * @return the newsArticleUrl
	 */
	public String getNewsArticleUrl() {
		return newsArticleUrl;
	}

	/**
	 * @param newsArticleUrl
	 *            the newsArticleUrl to set
	 */
	public void setNewsArticleUrl(String newsArticleUrl) {
		this.newsArticleUrl = newsArticleUrl;
	}

	/**
	 * @return the pageSize
	 */
	public String getPageSize() {
		return pageSize;
	}

	/**
	 * @param pageSize
	 *            the pageSize to set
	 */
	public void setPageSize(String pageSize) {
		this.pageSize = pageSize;
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
	 * @return the yearsToShow
	 */
	public List<Integer> getYearsToShow() {
		return Collections.unmodifiableList(yearsToShow);
	}

	/**
	 * @param yearsToShow
	 *            the yearsToShow to set
	 */
	public void setYearsToShow(List<Integer> yearsToShow) {
		this.yearsToShow = Collections.unmodifiableList(yearsToShow);
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

	/**
	 * @return the newsCategories
	 */
	public List<NewsCategory> getNewsCategories() {
		return Collections.unmodifiableList(newsCategories);
	}

	/**
	 * @param newsCategories
	 *            the newsCategories to set
	 */
	public void setNewsCategories(List<NewsCategory> newsCategories) {
		this.newsCategories = Collections.unmodifiableList(newsCategories);
	}

	/**
	 * @return the newsType
	 */
	public String getNewsType() {
		return newsType;
	}

	/**
	 * @param newsType
	 *            the newsType to set
	 */
	public void setNewsType(String newsType) {
		this.newsType = newsType;
	}

	/**
	 * @return the numberOfNews
	 */
	public String getNumberOfNews() {
		return numberOfNews;
	}

	/**
	 * @param numberOfNews
	 *            the numberOfNews to set
	 */
	public void setNumberOfNews(String numberOfNews) {
		this.numberOfNews = numberOfNews;
	}

	/**
	 * @return the releaseMain
	 */
	public ReleaseMain getReleaseMain() {
		return releaseMain;
	}

	/**
	 * @param releaseMain
	 *            the releaseMain to set
	 */
	public void setReleaseMain(ReleaseMain releaseMain) {
		this.releaseMain = releaseMain;
	}

	/**
	 * @return the noNewsMessage
	 */
	public String getNoNewsMessage() {
		return noNewsMessage;
	}

	/**
	 * @param noNewsMessage the noNewsMessage to set
	 */
	public void setNoNewsMessage(String noNewsMessage) {
		this.noNewsMessage = noNewsMessage;
	}

	/**
	 * @return the newsArticleShortenedUrl
	 */
	public String getNewsArticleShortenedUrl() {
		return newsArticleShortenedUrl;
	}

	/**
	 * @param newsArticleShortenedUrl the newsArticleShortenedUrl to set
	 */
	public void setNewsArticleShortenedUrl(String newsArticleShortenedUrl) {
		this.newsArticleShortenedUrl = newsArticleShortenedUrl;
	}

	/**
	 * Post construct method - init once the model gets instantiated
	 */
	@PostConstruct
	public void init() {
		logger.debug("Entry :: CNWNewsModel :: init :: newsType: {}", newsType);

		locale = currentPage.getLanguage().getLanguage();
		logger.debug("Fetched locale: {}, newsType: {}", locale, newsType);

		if( null == newsType )
			return;
		try {
			if (newsType.equals("1")) {
				processOverviewData();
			} else {
				processReleasesData();
			}
			if( null != newsArticleUrl && newsArticleUrl.length() > 0 ) {
				final String pagePath = currentPage.getPath();
				final String siteUrl = configService.getConfigValues(BasePageModelConstants.SITE_URL_CONSTANT, pagePath);
				newsArticleShortenedUrl = shortenURL(newsArticleUrl, siteUrl);
			}
		} catch (IOException | ApplicationException | SystemException | LoginException | RepositoryException e) {
			logger.error("Error :: CNWNewsModel :: init :: error trace: {}", e);
		}
	}

	/**
	 * Gets news overview data 
	 * @throws IOException
	 * @throws ApplicationException
	 * @throws SystemException
	 */
	public void processOverviewData() throws IOException, ApplicationException, SystemException {
		logger.debug("Entry :: CNWNewsDetailsModel :: processOverviewData :: numberOfNews: {}, newsCategories: {}, locale: {}", numberOfNews, newsCategories, locale);
		if (null == numberOfNews || null == newsCategories) {
            return;
        }
        releaseMain = newsService.getCNWNewsOverview(locale, numberOfNews, newsCategories);
		logger.debug("Fetched news :: {}", releaseMain);
	}

	/**
	 * Gets new listing data
	 * @throws IOException
	 * @throws ApplicationException
	 * @throws SystemException
	 */
	public void processReleasesData() throws IOException, ApplicationException, SystemException, LoginException, RepositoryException {
		logger.debug("Entry :: CNWNewsModel :: processReleasesData :: latestYear: {}, numberOfTabs: {}, locale: {}, newsCategories: {}, pageSize: {}", latestYear, numberOfTabs, locale, newsCategories, pageSize);
		int year;
		int totalNoYears;
		String strYear = null;
		String pageNum = null;
		if (null == latestYear) {
            year = Calendar.getInstance().get(Calendar.YEAR);
        } else {
            year = Integer.parseInt(latestYear);
        }

        int downYear = year;
        totalNoYears = Integer.parseInt(numberOfTabs);
        logger.debug("downYear: {}, totalNoYears: {}", downYear, totalNoYears);
        yearsToShow = new ArrayList<>();
        for (int i = 0; i < totalNoYears; i++) {
            yearsToShow.add(downYear--);
        }
        logger.debug("yearsToShow :: {}", yearsToShow);

        activeYear = year;

        String[] selectors = request.getRequestPathInfo().getSelectors();
        if (selectors.length > 0) {
            strYear = selectors[0]; // Year - Selector
            if (selectors.length > 1) {
                pageNum = selectors[1]; // Page number - Selector
            }
        }
        logger.debug("Fetched params  pageNum: {}, strYear: {}", pageNum, strYear);

        if (null != strYear && !"".equals(strYear) && !"html".equals(strYear)) {
            activeYear = Integer.parseInt(strYear);
        }
        logger.debug("activeYear :: {}", activeYear);

        String uri = request.getRequestURI();
        logger.debug("uri: {}", uri);
        relativeURL = uri.contains(".") ? uri.substring(0, uri.indexOf('.')) : uri;
        requestURL = uri.contains(".") ? uri.substring(0, uri.lastIndexOf('.')) : uri;
        logger.debug("relativeURL: {}, requestURL: {}", relativeURL, requestURL);
        if (null != pageNum) { // Code to remove page number from url
            requestURL = requestURL.replaceAll("." + pageNum + "$", "");
        }
        if (selectors.length == 0) {
            requestURL = requestURL + "." + activeYear;
        }
        requestURL = requestURL.replace(".", "/");
        final String pagePath = currentPage.getPath();
        final String siteUrl = configService.getConfigValues(BasePageModelConstants.SITE_URL_CONSTANT, pagePath);
        relativeURL = shortenURL(relativeURL, siteUrl);
        requestURL = shortenURL(requestURL, siteUrl);
        logger.debug("requestURL - after clean up: {}", requestURL);
        news = newsService.getCNWNews(locale, requestURL, pageNum, String.valueOf(activeYear), pageSize, newsCategories);
        if (logger.isDebugEnabled()) {
            logger.debug("Final news object :: {}", new ObjectMapper().writeValueAsString(news));
        }
	}
	
	/**
	 * Generates shorten url
	 * @param url
	 * @return shortened url
	 */
	public String shortenURL(String pagePath, String siteUrl) {
		if( null == siteUrl )
			return null;
		return pagePath.replace(siteUrl.substring(0, siteUrl.lastIndexOf(BasePageModelConstants.SLASH_CONSTANT)), "");
	}
}
