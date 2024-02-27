/*
 *
 */

package ca.sunlife.web.cms.core.services.impl.v1;


import ca.sunlife.web.cms.core.beans.v1.NewsDetails;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.models.v1.*;
import ca.sunlife.web.cms.core.osgi.config.v1.CNWNewsConfig;
import ca.sunlife.web.cms.core.services.v1.CNWNewsService;
import ca.sunlife.web.cms.core.services.v1.RestService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.text.Normalizer;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@ Component (service = { CNWNewsService.class }, immediate = true)
@ Designate (ocd = CNWNewsConfig.class)
public class CNWNewsServiceImpl implements CNWNewsService {

  /** The logger. */
  private final Logger logger = LoggerFactory.getLogger(getClass());

  /** The cnw news config. */
  private CNWNewsConfig cnwNewsConfig;

  /** The rest service. */
  @ Reference
  private RestService restService;

  /** The Constant CNW_SERVICE_PARAM. */
  public static final String CNW_SERVICE_PARAM = "?service=cnw"; // CNW service

  /** The Constant METHOD_LIST. */
  public static final String METHOD_LIST = "&method=list"; // CNW service method

  /** The Constant HTML_SAFE. */
  public static final String HTML_SAFE = "&safehtml=1"; // Safe HTML

  /** The Constant CATEGORY. */
  public static final String CATEGORY = "&category[]="; // Category for ca site

  /** The Constant FORMAT_JSON. */
  public static final String FORMAT_JSON = "&format=json"; // JSON format output

  /** The Constant CNW_DATE_PATTERN. */
  public static final String CNW_DATE_PATTERN = "EEE, dd MMM yyyy HH:mm:ss zzzzz"; // CNW date
                                                                                   // format

  /**
                                                                                    * The input date
                                                                                    * formatter.
                                                                                    */
  private final SimpleDateFormat inputDateFormatter = new SimpleDateFormat(CNW_DATE_PATTERN); // date
                                                                                              // input

  /**
                                                                                               * The
                                                                                               * date
                                                                                               * format
                                                                                               * map.
                                                                                               */
  // formatter
  private HashMap <String, String> dateFormatMap;

  /**
   * Activate.
   *
   * @param newsConfig
   *          the cnw news config
   */
  @ Activate
  public void activate(CNWNewsConfig newsConfig) {
    this.cnwNewsConfig = newsConfig;
    logger.debug("Entry :: CNWNewsServiceImpl :: activate :: cnwNewsConfig: {}, inputFormatter: {}",
        newsConfig.getCnwServiceUrl(), inputDateFormatter);
    final String [ ] dateFormatConfig = this.cnwNewsConfig.getDateFormatLocaleMapping();
    if (null != dateFormatConfig) {
      dateFormatMap = new HashMap <>();
      for (final String dateFormat : dateFormatConfig) {
        final String [ ] dateFormatArray = dateFormat.split("~");
        dateFormatMap.put(dateFormatArray [ 0 ], dateFormatArray [ 1 ]);
      }
    } else {
      logger.debug("Warning :: date format - locale mapping does not exist :: ");
    }
    logger.debug("Exit :: CNWNewsServiceImpl :: activate :: dateFormatMap: {}", dateFormatMap);
  }

  /*
   * (non-Javadoc)
   * @see ca.sunlife.web.cms.core.services.CNWNewsService#getCNWNewsOverview(java.lang.String,
   * java.lang.String, java.util.List)
   */
  @ Override
  public ReleaseMain getCNWNewsOverview(final String locale, final String numberOfNews,
                                        final List <NewsCategory> newsCategories)
      throws IOException, ApplicationException, SystemException {
    logger.debug("Entry :: CNWNewsServiceImpl :: getCNWNewsOverview :: locale :: {}", locale);
    if (null == dateFormatMap) {
      logger
          .debug("getCNWNewsOverview :: Date format is not set, please configure date format :: ");
      return null;
    }
    ReleaseMain releaseMain = null;
    final StringBuilder importUrl = new StringBuilder();
    final boolean isLocaleEn = null != locale && "en".equals(locale);
    logger.debug("getCNWNewsOverview :: isLocaleEn :: {}", Boolean.valueOf(isLocaleEn));
    final String cnwRequestListURI = cnwNewsConfig.getCnwServiceUrl();
    importUrl.append(cnwRequestListURI);
    importUrl.append(CNW_SERVICE_PARAM);
    importUrl.append(METHOD_LIST);
    if (! isLocaleEn) {
      importUrl.append("_" + locale);
    }
    importUrl.append(HTML_SAFE);
    for (final NewsCategory category : newsCategories) {
      importUrl.append(CATEGORY + category.getCategory());
    }
    importUrl.append(FORMAT_JSON);
    importUrl.append("&limit=");
    importUrl.append(numberOfNews);

    final String response = restService.callGetWebService(importUrl.toString(), null);
    if (null != response && response.length() > 0) {
      releaseMain = new ObjectMapper().readValue(response, ReleaseMain.class);
    }
    logger.debug("locale: {}, {}", locale, releaseMain);
    if (null != releaseMain && null != releaseMain.getReleases()
        && null != releaseMain.getReleases().getRelease()) {
      releaseMain.getReleases().getRelease().stream().forEach(o -> {
        try {
          final Date date = inputDateFormatter.parse(o.getReleaseDate());
          o.setReleaseDate(
              new SimpleDateFormat(dateFormatMap.get(locale), new Locale(locale)).format(date));
          String headlineURL = o.getHeadline().replaceAll(" ", "-").replaceAll("%", "")
              .replaceAll("[~@#$^&*()={}|,.?:<>'/;`%!\"]", "").toLowerCase(Locale.ROOT);
          headlineURL = Normalizer.normalize(headlineURL, Normalizer.Form.NFD);
          o.setHeadlineUrl(headlineURL);
        } catch (final ParseException e) {
          logger.error("Error :: parsing the release date {}", e);
          return;
        }
      });
    }
    return releaseMain;
  }

  /*
   * (non-Javadoc)
   * @see ca.sunlife.web.cms.core.services.CNWNewsService#getCNWNews(java.lang.String,
   * java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.util.List)
   */
  @ Override
  public News getCNWNews(final String locale, final String requestURL, final String pageNum,
                         final String activeYear, final String pageSize, final List <NewsCategory> newsCategories)
      throws IOException, ApplicationException, SystemException {
    logger.debug("Entry :: CNWNewsServiceImpl :: getCNWNews ");
    int curPage = 1;
    int prevPage = 0;
    News newsObj = null;
    if (null == dateFormatMap) {
      logger.debug("getCNWNews :: Date format is not set, please configure date format :: ");
      return null;
    }
    final StringBuilder importUrl = new StringBuilder();
    final String cnwRequestListURI = cnwNewsConfig.getCnwServiceUrl();
    importUrl.append(cnwRequestListURI);
    importUrl.append(CNW_SERVICE_PARAM);
    importUrl.append(METHOD_LIST);
    if (null != locale && ! "en".equals(locale)) {
      importUrl.append("_" + locale);
    }
    importUrl.append(HTML_SAFE);
    importUrl.append(FORMAT_JSON);
    importUrl.append("&fields=releaseDate,headline,subheadline,summary");
    for (final NewsCategory category : newsCategories) {
      importUrl.append(CATEGORY + category.getCategory());
    }
    importUrl.append("&start_date=");
    importUrl.append(activeYear);
    importUrl.append("0101&end_date=");
    importUrl.append(activeYear);
    importUrl.append("1231");
    importUrl.append("&limit=");
    importUrl.append(pageSize);

    if (pageNum != null) {
      curPage = Integer.parseInt(pageNum);
      if (curPage <= 0) {
        curPage = 1;
      }
      prevPage = curPage - 1;
      final int offset = prevPage * Integer.parseInt(pageSize);
      importUrl.append("&offset=");
      importUrl.append(offset);
    }
    logger.debug("importUrl: {}", importUrl);
    final ReleaseMain news = new ObjectMapper()
        .readValue(restService.callGetWebService(importUrl.toString(), null), ReleaseMain.class);
    if (null != news && null != news.getReleases() && null != news.getReleases().getRelease()) {
      news.getReleases().getRelease().stream().forEach(o -> {
        try {
          final Date date = inputDateFormatter.parse(o.getReleaseDate());
          o.setReleaseDate(
              new SimpleDateFormat(dateFormatMap.get(locale), new Locale(locale)).format(date));
          String headlineURL = o.getHeadline().replaceAll(" ", "-").replaceAll("%", "")
              .replaceAll("[~@#$^&*()={}|,.?:<>'/;`%!\"]", "").toLowerCase(Locale.ROOT);
          headlineURL = Normalizer.normalize(headlineURL, Normalizer.Form.NFD);
          o.setHeadlineUrl(headlineURL);
        } catch (final ParseException e) {
          logger.error("Error :: parsing the release date {}", e);
        }
      });
      newsObj = new News();
      newsObj.setReleaseMain(news);
      newsObj.setPagination(
          setPagination(curPage, prevPage, requestURL, news.getReleases().getMatchingCount()));
      logger.debug("Fetched news - returned count :: {}", news.getReleases().getReturnedCount());
    }

    logger.debug("Fetched news :: {}", news);
    logger.debug("Exit :: CNWNewsServiceImpl :: getCNWNews :: {}", newsObj);
    return newsObj;
  }

  /**
   * Sets the pagination.
   *
   * @param curPage
   *          the cur page
   * @param prevPage
   *          the prev page
   * @param requestURL
   *          the request URL
   * @param totalResults
   *          the total results
   * @return the pagination
   */
  private Pagination setPagination(final int curPage, final int prevPage, final String requestURL,
                                   final String totalResults) {
    logger.debug(
        "Entry :: CNWNewsServiceImpl :: setPagination :: curPage: {}, prevPage: {}, requestURL: {}",
        curPage, prevPage, requestURL);
    final String rcordPerPageStr = "10";
    final int firstBreakPt = 5;
    final int firstMinTotal = 6;
    int resultSize = 0;
    final String requestUrlStr = requestURL;
    logger.debug("***before pagination -  rcordPerPageStr={},  totalResults={}", rcordPerPageStr,
        totalResults);

    final int recordPerPage = Integer.parseInt(rcordPerPageStr);
    resultSize = Integer.parseInt(totalResults);
    final int mod = resultSize % recordPerPage;
    int totalPages = resultSize / recordPerPage;
    if (mod > 0) {
      totalPages++;
    }
    logger.debug("mod ={}, totalPages={}", Integer.valueOf(mod), Integer.valueOf(totalPages));

    final int secondBreakPt = totalPages - 4;

    if (totalPages <= 1) {
      return null;
    }
    final List <PageItem> pageItems = new ArrayList <>();
    final PageItem pageItemEllipsis = new PageItem();
    pageItemEllipsis.setEllipsis(true);

    if (curPage < firstBreakPt || totalPages <= firstMinTotal) {
      int maxFirst = firstBreakPt;
      if (totalPages < firstMinTotal + 1) {
        maxFirst = totalPages;
      }
      setInnerPageItems(2, maxFirst, pageItems, requestUrlStr);
      if (totalPages > firstMinTotal) {
        pageItems.add(pageItemEllipsis);

        final PageItem pageItem = new PageItem();
        pageItem.setHref(requestUrlStr + String.valueOf(totalPages));
        pageItem.setIndex(totalPages);
        pageItems.add(pageItem);
      }
    } else if (curPage >= secondBreakPt) {
      pageItems.add(pageItemEllipsis);
      setInnerPageItems(secondBreakPt, totalPages, pageItems, requestUrlStr);
    } else {
      pageItems.add(pageItemEllipsis);
      setInnerPageItems(curPage - 2, curPage + 2, pageItems, requestUrlStr);
      pageItems.add(pageItemEllipsis);

      final PageItem pageItem = new PageItem();
      pageItem.setHref(requestUrlStr + String.valueOf(totalPages));
      pageItem.setIndex(totalPages);
      pageItems.add(pageItem);
    }
    final int nextPageNo = curPage + 1;
    return new Pagination(prevPage, curPage, nextPageNo, totalPages, pageItems);
  }

  /**
   * Sets the inner page items.
   *
   * @param startIndex
   *          the start index
   * @param endIndex
   *          the end index
   * @param pageItems
   *          the page items
   * @param requestUrlStr
   *          the request url str
   */
  public void setInnerPageItems(final int startIndex, final int endIndex,
      final List <PageItem> pageItems, final String requestUrlStr) {
    for (int i = startIndex; i <= endIndex; i++) {
      final PageItem pageItem = new PageItem();
      pageItem.setHref(requestUrlStr + String.valueOf(i));
      pageItem.setIndex(i);
      pageItems.add(pageItem);
    }
  }

  /*
   * (non-Javadoc)
   * @see ca.sunlife.web.cms.core.services.CNWNewsService#getCNWNewsDetails(java.lang.String,
   * java.lang.String)
   */
  @ Override
  public NewsDetails getCNWNewsDetails(final String id, final String locale)
      throws IOException, ParseException, ApplicationException, SystemException {
    logger.debug("Entry :: CNWNewsServiceImpl :: getCNWNewsDetails :: id: {}, locale: {}", id,
        locale);
    NewsDetails newsDetails = null;
    final StringBuilder importUrl = new StringBuilder();
    importUrl.append(cnwNewsConfig.getCnwServiceUrl());
    importUrl.append(CNW_SERVICE_PARAM);
    importUrl.append("&method=get");
    if (null != locale && ! "en".equals(locale)) {
      importUrl.append("_" + locale);
    }
    importUrl.append(HTML_SAFE);
    importUrl.append(FORMAT_JSON);
    importUrl.append("&id=" + id);
    newsDetails = new ObjectMapper().readValue(restService.callGetWebService(importUrl.toString(), null),
        NewsDetails.class);
    newsDetails.getRelease()
        .setReleaseDate(new SimpleDateFormat(dateFormatMap.get(locale), new Locale(locale))
            .format(inputDateFormatter.parse(newsDetails.getRelease().getReleaseDate())));
    logger.debug("Exit :: CNWNewsServiceImpl :: getCNWNewsDetails :: newsDetails :: {}",
        newsDetails);
    return newsDetails;
  }
}
