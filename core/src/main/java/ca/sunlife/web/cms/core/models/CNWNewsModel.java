/*
 *
 */

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
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.services.CNWNewsService;
import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * The Class CNWNewsModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = { SlingHttpServletRequest.class,
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CNWNewsModel {

  /** The logger. */
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

  /** The news type. */
  @ Inject
  @ Via ("resource")
  private String newsType;

  // overview starts

  /** The number of news. */
  @ Inject
  @ Via ("resource")
  private String numberOfNews;

  // overview ends

  /** The latest year. */
  @ Inject
  @ Via ("resource")
  private String latestYear;

  /** The number of tabs. */
  @ Inject
  @ Via ("resource")
  private String numberOfTabs;

  /** The news categories. */
  @ Inject
  @ Via ("resource")
  private List <NewsCategory> newsCategories;

  /** The news article url. */
  @ Inject
  @ Via ("resource")
  private String newsArticleUrl;

  /** The page size. */
  @ Inject
  @ Via ("resource")
  private String pageSize;

  /** The previous text. */
  @ Inject
  @ Via ("resource")
  private String previousText;

  /** The next text. */
  @ Inject
  @ Via ("resource")
  private String nextText;

  /** The page text. */
  @ Inject
  @ Via ("resource")
  private String pageText;

  /** The of text. */
  @ Inject
  @ Via ("resource")
  private String ofText;

  /** The no news message. */
  @ Inject
  @ Via ("resource")
  private String noNewsMessage;

  /** The locale. */
  private String locale;

  /** The news. */
  private News news;

  /** The active year. */
  private int activeYear;

  /** The years to show. */
  private List <Integer> yearsToShow;

  /** The request URL. */
  private String requestURL;

  /** The relative URL. */
  private String relativeURL;

  // overview starts
  /** The release main. */
  private ReleaseMain releaseMain;

  // overview ends

  /** The news article shortened url. */
  private String newsArticleShortenedUrl;

  /**
   * Gets the latest year.
   *
   * @return the latest year
   */
  public String getLatestYear() {
    return latestYear;
  }

  /**
   * Sets the latest year.
   *
   * @param latestYear
   *          the new latest year
   */
  public void setLatestYear(final String latestYear) {
    this.latestYear = latestYear;
  }

  /**
   * Gets the number of tabs.
   *
   * @return the number of tabs
   */
  public String getNumberOfTabs() {
    return numberOfTabs;
  }

  /**
   * Sets the number of tabs.
   *
   * @param numberOfTabs
   *          the new number of tabs
   */
  public void setNumberOfTabs(final String numberOfTabs) {
    this.numberOfTabs = numberOfTabs;
  }

  /**
   * Gets the news article url.
   *
   * @return the news article url
   */
  public String getNewsArticleUrl() {
    return newsArticleUrl;
  }

  /**
   * Sets the news article url.
   *
   * @param newsArticleUrl
   *          the new news article url
   */
  public void setNewsArticleUrl(final String newsArticleUrl) {
    this.newsArticleUrl = newsArticleUrl;
  }

  /**
   * Gets the page size.
   *
   * @return the page size
   */
  public String getPageSize() {
    return pageSize;
  }

  /**
   * Sets the page size.
   *
   * @param pageSize
   *          the new page size
   */
  public void setPageSize(final String pageSize) {
    this.pageSize = pageSize;
  }

  /**
   * Gets the previous text.
   *
   * @return the previous text
   */
  public String getPreviousText() {
    return previousText;
  }

  /**
   * Sets the previous text.
   *
   * @param previousText
   *          the new previous text
   */
  public void setPreviousText(final String previousText) {
    this.previousText = previousText;
  }

  /**
   * Gets the next text.
   *
   * @return the next text
   */
  public String getNextText() {
    return nextText;
  }

  /**
   * Sets the next text.
   *
   * @param nextText
   *          the new next text
   */
  public void setNextText(final String nextText) {
    this.nextText = nextText;
  }

  /**
   * Gets the page text.
   *
   * @return the page text
   */
  public String getPageText() {
    return pageText;
  }

  /**
   * Sets the page text.
   *
   * @param pageText
   *          the new page text
   */
  public void setPageText(final String pageText) {
    this.pageText = pageText;
  }

  /**
   * Gets the of text.
   *
   * @return the of text
   */
  public String getOfText() {
    return ofText;
  }

  /**
   * Sets the of text.
   *
   * @param ofText
   *          the new of text
   */
  public void setOfText(final String ofText) {
    this.ofText = ofText;
  }

  /**
   * Gets the active year.
   *
   * @return the active year
   */
  public int getActiveYear() {
    return activeYear;
  }

  /**
   * Sets the active year.
   *
   * @param activeYear
   *          the new active year
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
   *          the new news
   */
  public void setNews(final News news) {
    this.news = news;
  }

  /**
   * Gets the years to show.
   *
   * @return the years to show
   */
  public List <Integer> getYearsToShow() {
    return Collections.unmodifiableList(yearsToShow);
  }

  /**
   * Sets the years to show.
   *
   * @param yearsToShow
   *          the new years to show
   */
  public void setYearsToShow(final List <Integer> yearsToShow) {
    this.yearsToShow = Collections.unmodifiableList(yearsToShow);
  }

  /**
   * Gets the request URL.
   *
   * @return the request URL
   */
  public String getRequestURL() {
    return requestURL;
  }

  /**
   * Sets the request URL.
   *
   * @param requestURL
   *          the new request URL
   */
  public void setRequestURL(final String requestURL) {
    this.requestURL = requestURL;
  }

  /**
   * Gets the relative URL.
   *
   * @return the relative URL
   */
  public String getRelativeURL() {
    return relativeURL;
  }

  /**
   * Sets the relative URL.
   *
   * @param relativeURL
   *          the new relative URL
   */
  public void setRelativeURL(final String relativeURL) {
    this.relativeURL = relativeURL;
  }

  /**
   * Gets the news categories.
   *
   * @return the news categories
   */
  public List <NewsCategory> getNewsCategories() {
    return Collections.unmodifiableList(newsCategories);
  }

  /**
   * Sets the news categories.
   *
   * @param newsCategories
   *          the new news categories
   */
  public void setNewsCategories(final List <NewsCategory> newsCategories) {
    this.newsCategories = Collections.unmodifiableList(newsCategories);
  }

  /**
   * Gets the news type.
   *
   * @return the news type
   */
  public String getNewsType() {
    return newsType;
  }

  /**
   * Sets the news type.
   *
   * @param newsType
   *          the new news type
   */
  public void setNewsType(final String newsType) {
    this.newsType = newsType;
  }

  /**
   * Gets the number of news.
   *
   * @return the number of news
   */
  public String getNumberOfNews() {
    return numberOfNews;
  }

  /**
   * Sets the number of news.
   *
   * @param numberOfNews
   *          the new number of news
   */
  public void setNumberOfNews(final String numberOfNews) {
    this.numberOfNews = numberOfNews;
  }

  /**
   * Gets the release main.
   *
   * @return the release main
   */
  public ReleaseMain getReleaseMain() {
    return releaseMain;
  }

  /**
   * Sets the release main.
   *
   * @param releaseMain
   *          the new release main
   */
  public void setReleaseMain(final ReleaseMain releaseMain) {
    this.releaseMain = releaseMain;
  }

  /**
   * Gets the no news message.
   *
   * @return the no news message
   */
  public String getNoNewsMessage() {
    return noNewsMessage;
  }

  /**
   * Sets the no news message.
   *
   * @param noNewsMessage
   *          the new no news message
   */
  public void setNoNewsMessage(final String noNewsMessage) {
    this.noNewsMessage = noNewsMessage;
  }

  /**
   * Gets the news article shortened url.
   *
   * @return the news article shortened url
   */
  public String getNewsArticleShortenedUrl() {
    return newsArticleShortenedUrl;
  }

  /**
   * Sets the news article shortened url.
   *
   * @param newsArticleShortenedUrl
   *          the new news article shortened url
   */
  public void setNewsArticleShortenedUrl(final String newsArticleShortenedUrl) {
    this.newsArticleShortenedUrl = newsArticleShortenedUrl;
  }

  /**
   * Inits the.
   */
  @ PostConstruct
  public void init() {
    logger.debug("Entry :: CNWNewsModel :: init :: newsType: {}", newsType);
    if (null == newsType) {
      return;
    }
    try {
      //final String pageLocale = configService.getConfigValues("pageLocale", currentPage.getPath());
      final String pageLocale = "en";
      if (null != pageLocale && pageLocale.length() > 0) {
        locale = pageLocale.split("_") [ 0 ];
      }
      logger.debug("Fetched locale: {}, newsType: {}", locale, newsType);
      if (newsType.equals("1")) {
        processOverviewData();
      } else {
        processReleasesData();
      }
      if (null != newsArticleUrl && newsArticleUrl.length() > 0) {
        newsArticleShortenedUrl = configService.getPageRelativeUrl(newsArticleUrl);
      }
    } catch (IOException | ApplicationException | SystemException | LoginException
        | RepositoryException e) {
      logger.error("Error :: CNWNewsModel :: init :: error trace: {}", e);
    }
  }

  /**
   * Process overview data.
   *
   * @throws IOException
   *           Signals that an I/O exception has occurred.
   * @throws ApplicationException
   *           the application exception
   * @throws SystemException
   *           the system exception
   */
  public void processOverviewData() throws IOException, ApplicationException, SystemException {
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
   * Process releases data.
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
  public void processReleasesData() throws IOException, ApplicationException, SystemException,
      LoginException, RepositoryException {
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
    for (int i = 0; i < totalNoYears; i++) {
      yearsToShow.add(downYear--);
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
    relativeURL = configService.getPageRelativeUrl(relativeURL);
    requestURL = configService.getPageRelativeUrl(requestURL);
    logger.debug("requestURL - after clean up: {}", requestURL);
    news = newsService.getCNWNews(locale, requestURL, pageNum, String.valueOf(activeYear), pageSize,
        newsCategories);
    if (logger.isDebugEnabled()) {
      logger.debug("Final news object :: {}", new ObjectMapper().writeValueAsString(news));
    }
  }
}
