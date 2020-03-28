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
 * The Class CNWNewsModel.
 *
 * @author mo92 The Class CNWNewsModel - Sling model for CNW News list
 */
@ Model (adaptables = { SlingHttpServletRequest.class ,
    Resource.class } , defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CNWNewsModel {

  /** The log. */
  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  /** The current page. */
  @ Inject
  private Page currentPage;

  /** The request. */
  @ Self
  private SlingHttpServletRequest request;

  /** The news service. */
  @ Inject
  private CNWNewsService newsService;

  /** The config service. */
  @ Inject
  private SiteConfigService configService;

  /** News display type. */
  @ Inject
  @ Via ("resource")
  private String newsType;

  // overview starts

  /** Number of news to be displayed. */
  @ Inject
  @ Via ("resource")
  private String numberOfNews;

  // overview ends

  /** Latest year. */
  @ Inject
  @ Via ("resource")
  private String latestYear;

  /** No. of tabs */
  @ Inject
  @ Via ("resource")
  private String numberOfTabs;

  /** News categories. */
  @ Inject
  @ Via ("resource")
  private List <NewsCategory> newsCategories;

  /** News article url. */
  @ Inject
  @ Via ("resource")
  private String newsArticleUrl;

  /** Page size. */
  @ Inject
  @ Via ("resource")
  private String pageSize;

  /** Previous button text. */
  @ Inject
  @ Via ("resource")
  private String previousText;

  /** Next button text. */
  @ Inject
  @ Via ("resource")
  private String nextText;

  /** Page label text. */
  @ Inject
  @ Via ("resource")
  private String pageText;

  /** Of label text. */
  @ Inject
  @ Via ("resource")
  private String ofText;

  /** Message when no news are there. */
  @ Inject
  @ Via ("resource")
  private String noNewsMessage;

  /** The locale. */
  private String locale;

  /** News. */
  private News news;

  /** Active Year. */
  private int activeYear;

  /** Years To Show - Tabs. */
  private List <Integer> yearsToShow;

  /** requestURL. */
  private String requestURL;

  /** relative URL - without any selectors. */
  private String relativeURL;

  // overview starts
  /** Release News Object. */
  private ReleaseMain releaseMain;

  // overview ends

  /** The news article shortened url. */
  private String newsArticleShortenedUrl;

  /**
   * Gets the latest year.
   *
   * @return the latestYear
   */
  public String getLatestYear() {
    return latestYear;
  }

  /**
   * Sets the latest year.
   *
   * @param latestYear
   *          the latestYear to set
   */
  public void setLatestYear(final String latestYear) {
    this.latestYear = latestYear;
  }

  /**
   * Gets the number of tabs.
   *
   * @return the numberOfTabs
   */
  public String getNumberOfTabs() {
    return numberOfTabs;
  }

  /**
   * Sets the number of tabs.
   *
   * @param numberOfTabs
   *          the numberOfTabs to set
   */
  public void setNumberOfTabs(final String numberOfTabs) {
    this.numberOfTabs = numberOfTabs;
  }

  /**
   * Gets the news article url.
   *
   * @return the newsArticleUrl
   */
  public String getNewsArticleUrl() {
    return newsArticleUrl;
  }

  /**
   * Sets the news article url.
   *
   * @param newsArticleUrl
   *          the newsArticleUrl to set
   */
  public void setNewsArticleUrl(final String newsArticleUrl) {
    this.newsArticleUrl = newsArticleUrl;
  }

  /**
   * Gets the page size.
   *
   * @return the pageSize
   */
  public String getPageSize() {
    return pageSize;
  }

  /**
   * Sets the page size.
   *
   * @param pageSize
   *          the pageSize to set
   */
  public void setPageSize(final String pageSize) {
    this.pageSize = pageSize;
  }

  /**
   * Gets the previous text.
   *
   * @return the previousText
   */
  public String getPreviousText() {
    return previousText;
  }

  /**
   * Sets the previous text.
   *
   * @param previousText
   *          the previousText to set
   */
  public void setPreviousText(final String previousText) {
    this.previousText = previousText;
  }

  /**
   * Gets the next text.
   *
   * @return the nextText
   */
  public String getNextText() {
    return nextText;
  }

  /**
   * Sets the next text.
   *
   * @param nextText
   *          the nextText to set
   */
  public void setNextText(final String nextText) {
    this.nextText = nextText;
  }

  /**
   * Gets the page text.
   *
   * @return the pageText
   */
  public String getPageText() {
    return pageText;
  }

  /**
   * Sets the page text.
   *
   * @param pageText
   *          the pageText to set
   */
  public void setPageText(final String pageText) {
    this.pageText = pageText;
  }

  /**
   * Gets the of text.
   *
   * @return the ofText
   */
  public String getOfText() {
    return ofText;
  }

  /**
   * Sets the of text.
   *
   * @param ofText
   *          the ofText to set
   */
  public void setOfText(final String ofText) {
    this.ofText = ofText;
  }

  /**
   * Gets the active year.
   *
   * @return the activeYear
   */
  public int getActiveYear() {
    return activeYear;
  }

  /**
   * Sets the active year.
   *
   * @param activeYear
   *          the activeYear to set
   */
  public void setActiveYear(final int activeYear) {
    this.activeYear = activeYear;
  }

  /**
   * Gets the news.
   *
   * @return the news
   */
  public News getNews() {
    return news;
  }

  /**
   * Sets the news.
   *
   * @param news
   *          the news to set
   */
  public void setNews(final News news) {
    this.news = news;
  }

  /**
   * Gets the years to show.
   *
   * @return the yearsToShow
   */
  public List <Integer> getYearsToShow() {
    return Collections.unmodifiableList(yearsToShow);
  }

  /**
   * Sets the years to show.
   *
   * @param yearsToShow
   *          the yearsToShow to set
   */
  public void setYearsToShow(final List <Integer> yearsToShow) {
    this.yearsToShow = Collections.unmodifiableList(yearsToShow);
  }

  /**
   * Gets the request URL.
   *
   * @return the requestURL
   */
  public String getRequestURL() {
    return requestURL;
  }

  /**
   * Sets the request URL.
   *
   * @param requestURL
   *          the requestURL to set
   */
  public void setRequestURL(final String requestURL) {
    this.requestURL = requestURL;
  }

  /**
   * Gets the relative URL.
   *
   * @return the relativeURL
   */
  public String getRelativeURL() {
    return relativeURL;
  }

  /**
   * Sets the relative URL.
   *
   * @param relativeURL
   *          the relativeURL to set
   */
  public void setRelativeURL(final String relativeURL) {
    this.relativeURL = relativeURL;
  }

  /**
   * Gets the news categories.
   *
   * @return the newsCategories
   */
  public List <NewsCategory> getNewsCategories() {
    return Collections.unmodifiableList(newsCategories);
  }

  /**
   * Sets the news categories.
   *
   * @param newsCategories
   *          the newsCategories to set
   */
  public void setNewsCategories(final List <NewsCategory> newsCategories) {
    this.newsCategories = Collections.unmodifiableList(newsCategories);
  }

  /**
   * Gets the news type.
   *
   * @return the newsType
   */
  public String getNewsType() {
    return newsType;
  }

  /**
   * Sets the news type.
   *
   * @param newsType
   *          the newsType to set
   */
  public void setNewsType(final String newsType) {
    this.newsType = newsType;
  }

  /**
   * Gets the number of news.
   *
   * @return the numberOfNews
   */
  public String getNumberOfNews() {
    return numberOfNews;
  }

  /**
   * Sets the number of news.
   *
   * @param numberOfNews
   *          the numberOfNews to set
   */
  public void setNumberOfNews(final String numberOfNews) {
    this.numberOfNews = numberOfNews;
  }

  /**
   * Gets the release main.
   *
   * @return the releaseMain
   */
  public ReleaseMain getReleaseMain() {
    return releaseMain;
  }

  /**
   * Sets the release main.
   *
   * @param releaseMain
   *          the releaseMain to set
   */
  public void setReleaseMain(final ReleaseMain releaseMain) {
    this.releaseMain = releaseMain;
  }

  /**
   * Gets the no news message.
   *
   * @return the noNewsMessage
   */
  public String getNoNewsMessage() {
    return noNewsMessage;
  }

  /**
   * Sets the no news message.
   *
   * @param noNewsMessage
   *          the noNewsMessage to set
   */
  public void setNoNewsMessage(final String noNewsMessage) {
    this.noNewsMessage = noNewsMessage;
  }

  /**
   * Gets the news article shortened url.
   *
   * @return the newsArticleShortenedUrl
   */
  public String getNewsArticleShortenedUrl() {
    return newsArticleShortenedUrl;
  }

  /**
   * Sets the news article shortened url.
   *
   * @param newsArticleShortenedUrl
   *          the newsArticleShortenedUrl to set
   */
  public void setNewsArticleShortenedUrl(final String newsArticleShortenedUrl) {
    this.newsArticleShortenedUrl = newsArticleShortenedUrl;
  }

  /**
   * Post construct method - init once the model gets instantiated.
   */
  @ PostConstruct
  public void init() {
    logger.debug("Entry :: CNWNewsModel :: init :: newsType: {}", newsType);

    locale = currentPage.getLanguage().getLanguage();
    logger.debug("Fetched locale: {}, newsType: {}", locale, newsType);

    if (null == newsType) {
      return;
    }
    try {
      if (newsType.equals("1")) {
        processOverviewData();
      } else {
        processReleasesData();
      }
      if (null != newsArticleUrl && newsArticleUrl.length() > 0) {
        final String pagePath = currentPage.getPath();
        final String siteUrl = configService
            .getConfigValues(BasePageModelConstants.SITE_URL_CONSTANT, pagePath);
        newsArticleShortenedUrl = shortenURL(newsArticleUrl, siteUrl);
      }
    } catch (IOException | ApplicationException | SystemException | LoginException
        | RepositoryException e) {
      logger.error("Error :: CNWNewsModel :: init :: error trace: {}", e);
    }
  }

  /**
   * Gets news overview data.
   *
   * @throws IOException
   *           Signals that an I/O exception has occurred.
   * @throws ApplicationException
   *           the application exception
   * @throws SystemException
   *           the system exception
   */
  public void processOverviewData() throws IOException , ApplicationException , SystemException {
    logger.debug(
        "Entry :: CNWNewsDetailsModel :: processOverviewData :: numberOfNews: {}, newsCategories: {}, locale: {}",
        numberOfNews, newsCategories, locale);
    if (null == numberOfNews || null == newsCategories) {
      return;
    }
    releaseMain = newsService.getCNWNewsOverview(locale, numberOfNews, newsCategories);
    logger.debug("Fetched news :: {}", releaseMain);
  }

  /**
   * Gets new listing data.
   *
   * @throws IOException
   *           Signals that an I/O exception has occurred.
   * @throws ApplicationException
   *           the application exception
   * @throws SystemException
   *           the system exception
   * @throws LoginException
   *           the login exception
   * @throws RepositoryException
   *           the repository exception
   */
  public void processReleasesData() throws IOException , ApplicationException , SystemException ,
      LoginException , RepositoryException {
    logger.debug(
        "Entry :: CNWNewsModel :: processReleasesData :: latestYear: {}, numberOfTabs: {}, locale: {}, newsCategories: {}, pageSize: {}",
        latestYear, numberOfTabs, locale, newsCategories, pageSize);
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
    yearsToShow = new ArrayList <>();
    for (int i = 0 ; i < totalNoYears ; i++ ) {
      yearsToShow.add(downYear-- );
    }
    logger.debug("yearsToShow :: {}", yearsToShow);

    activeYear = year;

    final String [ ] selectors = request.getRequestPathInfo().getSelectors();
    if (selectors.length > 0) {
      strYear = selectors [ 0 ]; // Year - Selector
      if (selectors.length > 1) {
        pageNum = selectors [ 1 ]; // Page number - Selector
      }
    }
    logger.debug("Fetched params  pageNum: {}, strYear: {}", pageNum, strYear);

    if (null != strYear && ! "".equals(strYear) && ! "html".equals(strYear)) {
      activeYear = Integer.parseInt(strYear);
    }
    logger.debug("activeYear :: {}", activeYear);

    final String uri = request.getRequestURI();
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
    final String siteUrl = configService.getConfigValues(BasePageModelConstants.SITE_URL_CONSTANT,
        pagePath);
    relativeURL = shortenURL(relativeURL, siteUrl);
    requestURL = shortenURL(requestURL, siteUrl);
    logger.debug("requestURL - after clean up: {}", requestURL);
    news = newsService.getCNWNews(locale, requestURL, pageNum, String.valueOf(activeYear), pageSize,
        newsCategories);
    if (logger.isDebugEnabled()) {
      logger.debug("Final news object :: {}", new ObjectMapper().writeValueAsString(news));
    }
  }

  /**
   * Generates shorten url.
   *
   * @param pagePath
   *          the page path
   * @param siteUrl
   *          the site url
   * @return shortened url
   */
  public String shortenURL(final String pagePath , final String siteUrl) {
    if (null == siteUrl) {
      return null;
    }
    return pagePath.replace(
        siteUrl.substring(0, siteUrl.lastIndexOf(BasePageModelConstants.SLASH_CONSTANT)), "");
  }
}
