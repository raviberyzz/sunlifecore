/*
 *
 */

package ca.sunlife.web.cms.core.models;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.dam.cfm.converter.ContentTypeConverter;
import com.adobe.cq.wcm.core.components.internal.models.v1.contentfragment.DAMContentFragmentImpl;
import com.adobe.cq.wcm.core.components.models.contentfragment.DAMContentFragment;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.beans.Pagination;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * The Class AnnouncementList.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = { SlingHttpServletRequest.class,
    Resource.class }, adapters = AnnouncementList.class, resourceType = "sunlife/core/components/content/news-announcement-list", defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AnnouncementList {

  /** The parent path. */
  @ Inject
  @ Via ("resource")
  private String parentPath;

  /** The max items. */
  @ Inject
  @ Via ("resource")
  private int maxItems;

  /** The news type. */
  @ Inject
  @ Via ("resource")
  private String newsType;

  /** The content type converter. */
  @ Inject
  private ContentTypeConverter contentTypeConverter;

  /** The core resource resolver. */
  @ Inject
  private CoreResourceResolver coreResourceResolver;

  /** The config service. */
  @ Inject
  private SiteConfigService configService;

  /** The latest year. */
  @ Inject
  @ Via ("resource")
  private String latestYear;

  /** The number of tabs. */
  @ Inject
  @ Via ("resource")
  private String numberOfTabs;

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

  /** The request. */
  @ Self (injectionStrategy = InjectionStrategy.REQUIRED)
  private SlingHttpServletRequest request;

  /** The current page. */
  @ ScriptVariable
  private Page currentPage;

  /** The active year. */
  private int activeYear;

  /** The years to show. */
  private List <Integer> yearsToShow;

  /** The request URL. */
  private String requestURL;

  /** The relative URL. */
  private String relativeURL;

  /** The page num. */
  private int pageNum = 0;

  /** The date format. */
  private String dateFormat;

  /** The pagination. */
  private Pagination pagination;

  /** The page url. */
  private String pageUrl;

  /** The total match. */
  private int totalMatch;
  
  /** The page locale. */
  private String pageLocale;

  /** The items. */
  private final List <DAMContentFragment> items = new ArrayList <>();

  /** The Constant ELEMENT_NAMES. */
  private static final String [ ] ELEMENT_NAMES = { "articlePublishedDate", "newsroomHeading",
      "newsroomPagePath", "newsroomMiniDesc", "newsroomContent" };

  /** The slash. */
  private static String slash = "/";
  
  /** The Constant SLFAS_PATH. */
  private static final String SLFAS_PATH = "/content/sunlife/external/ca/slfas/";
  
  /** The Constant SITE_SELECTOR. */
  private static final String SITE_SELECTOR = "siteSelector";

  /** The Constant LOGGER. */
  private static final Logger LOGGER = LoggerFactory.getLogger(AnnouncementList.class);

  /**
   * Gets the page url.
   *
   * @return the page url
   */
  public final String getPageUrl() {
    return pageUrl;
  }

  /**
   * Sets the page url.
   *
   * @param pageUrl
   *          the new page url
   */
  public final void setPageUrl(final String pageUrl) {
    this.pageUrl = pageUrl;
  }

  /**
   * Gets the pagination.
   *
   * @return the pagination
   */
  public final Pagination getPagination() {
    return pagination;
  }

  /**
   * Sets the pagination.
   *
   * @param pagination
   *          the new pagination
   */
  public final void setPagination(final Pagination pagination) {
    this.pagination = pagination;
  }

  /**
   * Gets the total match.
   *
   * @return the total match
   */
  public final int getTotalMatch() {
    return totalMatch;
  }

  /**
   * Sets the total match.
   *
   * @param totalMatch
   *          the new total match
   */
  public final void setTotalMatch(final int totalMatch) {
    this.totalMatch = totalMatch;
  }

  /**
   * Gets the date format.
   *
   * @return the date format
   */
  public final String getDateFormat() {
    return dateFormat;
  }

  /**
   * Sets the date format.
   *
   * @param dateFormat
   *          the new date format
   */
  public final void setDateFormat(final String dateFormat) {
    this.dateFormat = dateFormat;
  }

  /**
   * Gets the page num.
   *
   * @return the page num
   */
  public final int getPageNum() {
    return pageNum;
  }

  /**
   * Sets the page num.
   *
   * @param pageNum
   *          the new page num
   */
  public final void setPageNum(final int pageNum) {
    this.pageNum = pageNum;
  }

  /**
   * Gets the parent path.
   *
   * @return the parent path
   */
  public final String getParentPath() {
    return parentPath;
  }

  /**
   * Sets the parent path.
   *
   * @param parentPath
   *          the new parent path
   */
  public final void setParentPath(final String parentPath) {
    this.parentPath = parentPath;
  }

  /**
   * Gets the max items.
   *
   * @return the max items
   */
  public final int getMaxItems() {
    return maxItems;
  }

  /**
   * Sets the max items.
   *
   * @param maxItems
   *          the new max items
   */
  public final void setMaxItems(final int maxItems) {
    this.maxItems = maxItems;
  }

  /**
   * Gets the list items.
   *
   * @return the list items
   */
  public Collection <DAMContentFragment> getListItems() {
    return Collections.unmodifiableCollection(items);
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
   * Gets the page locale.
   *
   * @return the page locale
   */
  public String getPageLocale() {
	return pageLocale;
  }

  /**
   * Sets the page locale.
   *
   * @param pageLocale the new page locale
   */
  public void setPageLocale(String pageLocale) {
	this.pageLocale = pageLocale;
  }

/**
   * Inits the model.
   */
  @ PostConstruct
  private void initModel() {
	  String pageLocaleDefault = StringUtils.EMPTY;
    if (StringUtils.isEmpty(getParentPath())) {
      return;
    }
    final String [ ] selectors = request.getRequestPathInfo().getSelectors();
    ResourceResolver resourceResolver = null;
    try {
      setDateFormat(configService.getConfigValues("articleDateFormat", currentPage.getPath()));
      final String locale = configService.getConfigValues("pageLocale", currentPage.getPath());
      if (null != locale && locale.length() > 0) { 
    	  pageLocaleDefault = locale.contains("-") ? locale.split("-")[ 0 ] : locale.split("_")[0];
        }

      setPageLocale(pageLocaleDefault);
      resourceResolver = coreResourceResolver.getResourceResolver();
      final Session session = resourceResolver.adaptTo(Session.class);
      if (session == null) {
        LOGGER.warn("Session was null therefore no query was executed");
        return;
      }
      final QueryBuilder queryBuilder = resourceResolver.adaptTo(QueryBuilder.class);
      if (queryBuilder == null) {
        LOGGER.warn("Query builder was null therefore no query was executed");
        return;
      }

      final Map <String, String> queryParameterMap = new HashMap <>();
      setQueryParameterMap(selectors, queryParameterMap);

      final PredicateGroup predicateGroup = PredicateGroup.create(queryParameterMap);
      LOGGER.debug("Query Params : {} : predicateGroup {}", queryParameterMap, predicateGroup);
      final Query query = queryBuilder.createQuery(predicateGroup, session);

      final SearchResult searchResult = query.getResult();

      LOGGER.debug("Query statement: '{}' : total matches: {}", searchResult.getQueryStatement(),
          searchResult.getTotalMatches());

      setTotalMatch(Integer.parseInt(searchResult.getTotalMatches() + StringUtils.EMPTY));
      // Query builder has a leaking resource resolver, so the following work around
      // is required.
      ResourceResolver leakingResourceResolver = null;
      try {
        // Iterate over the hits if you need special information
        final Iterator <Resource> resourceIterator = searchResult.getResources();
        while (resourceIterator.hasNext()) {
          final Resource resource = resourceIterator.next();
          if (leakingResourceResolver == null) {
            // Get a reference to QB's leaking resource resolver
            leakingResourceResolver = resource.getResourceResolver();
          }

          final DAMContentFragment contentFragmentModel = new DAMContentFragmentImpl(resource,
              contentTypeConverter, null, ELEMENT_NAMES);

          items.add(contentFragmentModel);
        }
      } finally {
        if (null != leakingResourceResolver) {
          // Always close the leaking query builder resource resolver
          leakingResourceResolver.close();
        }
      }
      String path = configService.getPageRelativeUrl(currentPage.getPath());
          
      if ("2".equals(newsType)) {
        processReleasesData();
      }
      setPagination(new Pagination(request, getMaxItems(), getTotalMatch(), path));
      setPageUrl(path);
    } catch (IOException | ApplicationException | SystemException | LoginException
        | RepositoryException e) {
      LOGGER.error("Login exception while trying to get resource resolver {}", e);
    } finally {
      if (null != resourceResolver) {
        resourceResolver.close();
      }
    }

  }

  /**
   * Sets the query parameter map.
   *
   * @param selectors
   *          the selectors
   * @param queryParameterMap
   *          the query parameter map
 * @throws RepositoryException 
 * @throws LoginException 
   */
  private void setQueryParameterMap(final String [ ] selectors,
      final Map <String, String> queryParameterMap) throws LoginException, RepositoryException {
    int offset = 0;
    final int limit = getMaxItems();
    if (selectors.length > 0) {
    	if (currentPage.getPath().contains(SLFAS_PATH)) {
    		setPageNum(Integer.parseInt(getPageNoForSlfas(selectors)));
        } else {
    		setPageNum(Integer.parseInt(selectors [ 0 ]));
        } 
      
      offset = (getPageNum() - 1) * getMaxItems(); // Pagination
    }
    queryParameterMap.put("path", getParentPath());
    queryParameterMap.put("type", com.day.cq.dam.api.DamConstants.NT_DAM_ASSET);
    queryParameterMap.put("p.limit", Integer.toString(limit));
    queryParameterMap.put("p.offset", Integer.toString(offset));
    queryParameterMap.put("1_property", JcrConstants.JCR_CONTENT + "/data/cq:model");
    queryParameterMap.put("1_property.value",
        "/conf/sunlife-apac/settings/dam/cfm/models/newsroom-model");
    queryParameterMap.put("orderby",
        "@" + JcrConstants.JCR_CONTENT + "/data/master/articlePublishedDate");
    queryParameterMap.put("orderby.sort", "desc");

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

    int year;
    int totalNoYears;
    String pageNumStr = null;
    if (null == latestYear) {
      final String requestPath = currentPage.getPath();
      year = Integer.parseInt(requestPath.substring(requestPath.lastIndexOf(slash) + 1));
    } else {
      year = Integer.parseInt(latestYear);
    }

    int downYear = year;
    totalNoYears = Integer.parseInt(numberOfTabs);
    LOGGER.debug("downYear: {}, totalNoYears: {}", downYear, totalNoYears);
    yearsToShow = new ArrayList <>();
    for (int i = 0; i < totalNoYears; i++) {
      yearsToShow.add(downYear--);
    }
    LOGGER.debug("yearsToShow :: {}", yearsToShow);
    try {
    	activeYear = Integer.parseInt(currentPage.getPath().substring(currentPage.getPath().lastIndexOf(slash) + 1));	
    } catch (NumberFormatException  e) {
    	LOGGER.error("URL doesnot contain year : {}", e);
    	activeYear = Calendar.getInstance().get(Calendar.YEAR);
    }
    

    final String [ ] selectors = request.getRequestPathInfo().getSelectors();
    if (selectors.length > 0) { 
    	if (currentPage.getPath().contains(SLFAS_PATH)) {
        	pageNumStr = getPageNoForSlfas( selectors);
          } 
    	else {
    		pageNumStr = selectors [ 0 ];
    	} 
    }
    
    LOGGER.debug("Fetched params  pageNum: {}, year: {}", pageNumStr, year);
    LOGGER.debug("activeYear :: {}", activeYear);
    final String uri = request.getRequestURI();
    LOGGER.debug("uri: {}", uri);
    relativeURL = uri.contains(".") ? uri.substring(0, uri.indexOf('.')) : uri;
    relativeURL = relativeURL.substring(0, relativeURL.lastIndexOf(slash));
    requestURL = uri.contains(".") ? uri.substring(0, uri.lastIndexOf('.')) : uri;
    LOGGER.debug("relativeURL: {}, requestURL: {}", relativeURL, requestURL);
    if (null != pageNumStr) { // Code to remove page number from url
      requestURL = requestURL.replaceAll("." + pageNumStr + "$", "");
    }
    requestURL = requestURL.replace(".", slash);
    relativeURL = configService.getPageUrl(relativeURL).substring(0, configService.getPageUrl(relativeURL).lastIndexOf(slash));
    requestURL = configService.getPageUrl(requestURL).substring(0, configService.getPageUrl(requestURL).lastIndexOf(slash));
    LOGGER.debug("requestURL - after clean up: {}", requestURL);
  }

/**
 * @param pageNumStr
 * @param selectors
 * @return
 * @throws LoginException
 * @throws RepositoryException
 */
private String getPageNoForSlfas(final String[] selectors)
		throws LoginException, RepositoryException {
	String pageNumStr = null;
	if (selectors.length == 1 && !(selectors [ 0 ].equalsIgnoreCase(configService.getConfigValues(SITE_SELECTOR, currentPage.getPath())))) {
    	pageNumStr = selectors [ 0 ];
    } else if (selectors.length == 1 && selectors [ 0 ].equalsIgnoreCase(configService.getConfigValues(SITE_SELECTOR, currentPage.getPath()))) {
    	pageNumStr = "1";
    } else if (selectors.length > 1 && (selectors [ 0 ].equalsIgnoreCase(configService.getConfigValues(SITE_SELECTOR, currentPage.getPath())))) {
    	pageNumStr = selectors [ 1 ];
    }
    else if (selectors.length > 1 && !(selectors [ 0 ].equalsIgnoreCase(configService.getConfigValues(SITE_SELECTOR, currentPage.getPath())))) {
    	pageNumStr = selectors [ 0 ];
    }
	return pageNumStr;
}


}
