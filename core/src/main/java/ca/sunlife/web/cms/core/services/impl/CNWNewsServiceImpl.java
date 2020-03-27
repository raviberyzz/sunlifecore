package ca.sunlife.web.cms.core.services.impl;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.ObjectMapper;

import ca.sunlife.web.cms.core.beans.News;
import ca.sunlife.web.cms.core.beans.NewsDetails;
import ca.sunlife.web.cms.core.beans.PageItem;
import ca.sunlife.web.cms.core.beans.Pagination;
import ca.sunlife.web.cms.core.beans.ReleaseMain;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.models.NewsCategory;
import ca.sunlife.web.cms.core.osgi.config.CNWNewsConfig;
import ca.sunlife.web.cms.core.services.CNWNewsService;
import ca.sunlife.web.cms.core.services.RestService;

/**
 * @author mo92 The class CNWNewsServiceImpl
 *
 */
@Component(service = { CNWNewsService.class }, immediate = true)
@Designate(ocd = CNWNewsConfig.class)
public class CNWNewsServiceImpl implements CNWNewsService {

	/**
	 * The logger.
	 */
	private final Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * CNWNewsConfig object
	 */
	private CNWNewsConfig cnwNewsConfig;

	@Reference
	private RestService restService;

	public static final String CNW_SERVICE_PARAM = "?service=cnw"; // CNW service
	public static final String METHOD_LIST = "&method=list"; // CNW service method
	public static final String HTML_SAFE = "&safehtml=1"; // Safe HTML
	public static final String CATEGORY = "&category[]="; // Category for ca site
	public static final String FORMAT_JSON = "&format=json"; // JSON format output
	public static final String CNW_DATE_PATTERN = "EEE, dd MMM yyyy HH:mm:ss zzzzz"; // CNW date format
	private SimpleDateFormat inputDateFormatter = new SimpleDateFormat(CNW_DATE_PATTERN); // date input formatter
	private HashMap<String, String> dateFormatMap;

	@Activate
	public void activate(CNWNewsConfig cnwNewsConfig) {
		this.cnwNewsConfig = cnwNewsConfig;
		logger.debug("Entry :: CNWNewsServiceImpl :: activate :: cnwNewsConfig: {}, inputFormatter: {}", cnwNewsConfig.getCnwServiceUrl(), this.inputDateFormatter);
		String[] dateFormatConfig = this.cnwNewsConfig.getDateFormatLocaleMapping();
		if (null != dateFormatConfig) {
			dateFormatMap = new HashMap<>();
			for (String dateFormat : dateFormatConfig) {
				String[] dateFormatArray = dateFormat.split("~");
				dateFormatMap.put(dateFormatArray[0], dateFormatArray[1]);
			}
		} else {
			logger.debug("Warning :: date format - locale mapping does not exist :: ");
		}
		logger.debug("Exit :: CNWNewsServiceImpl :: activate :: dateFormatMap: {}", dateFormatMap);
	}

	public ReleaseMain getCNWNewsOverview(String locale, String numberOfNews, List<NewsCategory> newsCategories) throws IOException, ApplicationException, SystemException {
		logger.debug("Entry :: CNWNewsServiceImpl :: getCNWNewsOverview :: locale :: {}", locale);
		if (null == dateFormatMap) {
			logger.debug("getCNWNewsOverview :: Date format is not set, please configure date format :: ");
			return null;
		}
		ReleaseMain releaseMain = null;
		StringBuilder importUrl = new StringBuilder();
		boolean isLocaleEn = (null != locale && "en".equals(locale));
		logger.debug("getCNWNewsOverview :: isLocaleEn :: {}", Boolean.valueOf(isLocaleEn));
		String cnwRequestListURI = this.cnwNewsConfig.getCnwServiceUrl();
		importUrl.append(cnwRequestListURI);
		importUrl.append(CNW_SERVICE_PARAM);
		importUrl.append(METHOD_LIST);
		if (!isLocaleEn) {
			importUrl.append("_" + locale);
		}
		importUrl.append(HTML_SAFE);
		for (NewsCategory category : newsCategories) {
			importUrl.append(CATEGORY + category.getCategory());
		}
		importUrl.append(FORMAT_JSON);
		importUrl.append("&limit=");
		importUrl.append(numberOfNews);

		String response = this.restService.callGetWebService(importUrl.toString());
		if (null != response && response.length() > 0)
			releaseMain = new ObjectMapper().readValue(response, ReleaseMain.class);
		logger.debug("locale: {}, {}", locale, releaseMain);
		if (null != releaseMain && null != releaseMain.getReleases() && null != releaseMain.getReleases().getRelease()) {
			releaseMain.getReleases().getRelease().stream().forEach(o -> {
				try {
					Date date = this.inputDateFormatter.parse(o.getReleaseDate());
					o.setReleaseDate((new SimpleDateFormat(dateFormatMap.get(locale), new Locale(locale))).format(date));
					o.setHeadlineUrl(o.getHeadline().replaceAll(" ", "-").replaceAll("%", "").replaceAll("[~@#$^&*()={}|,.?:<>'/;`%!\"]", "").toLowerCase(Locale.ROOT));
				} catch (ParseException e) {
					logger.error("Error :: parsing the release date {}", e);
					return;
				}
			});
		}
		return releaseMain;
	}

	public News getCNWNews(String locale, String requestURL, String pageNum, String activeYear, String pageSize, List<NewsCategory> newsCategories) throws IOException, ApplicationException, SystemException {
		logger.debug("Entry :: CNWNewsServiceImpl :: getCNWNews ");
		int curPage = 1;
		int prevPage = 0;
		News newsObj = null;
		if (null == dateFormatMap) {
            logger.debug("getCNWNews :: Date format is not set, please configure date format :: ");
            return null;
        }
        StringBuilder importUrl = new StringBuilder();
        String cnwRequestListURI = this.cnwNewsConfig.getCnwServiceUrl();
        importUrl.append(cnwRequestListURI);
        importUrl.append(CNW_SERVICE_PARAM);
        importUrl.append(METHOD_LIST);
        if (null != locale && !"en".equals(locale)) {
            importUrl.append("_" + locale);
        }
        importUrl.append(HTML_SAFE);
        importUrl.append(FORMAT_JSON);
        importUrl.append("&fields=releaseDate,headline,subheadline,summary");
        for (NewsCategory category : newsCategories) {
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
            int offset = prevPage * Integer.parseInt(pageSize);
            importUrl.append("&offset=");
            importUrl.append(offset);
        }
        logger.debug("importUrl: {}", importUrl);
        ReleaseMain news = new ObjectMapper().readValue(this.restService.callGetWebService(importUrl.toString()), ReleaseMain.class);
        if (null != news && null != news.getReleases() && null != news.getReleases().getRelease()) {
            news.getReleases().getRelease().stream().forEach(o -> {
                try {
                    Date date = this.inputDateFormatter.parse(o.getReleaseDate());
                    o.setReleaseDate((new SimpleDateFormat(dateFormatMap.get(locale), new Locale(locale))).format(date));
                    o.setHeadlineUrl(o.getHeadline().replaceAll(" ", "-").replaceAll("%", "").replaceAll("[~@#$^&*()={}|,.?:<>'/;`%!\"]", "").toLowerCase(Locale.ROOT));
                } catch (ParseException e) {
                    logger.error("Error :: parsing the release date {}", e);
                }
            });
            newsObj = new News();
            newsObj.setReleaseMain(news);
            newsObj.setPagination(setPagination(curPage, prevPage, requestURL, news.getReleases().getMatchingCount()));
        }

        logger.debug("Fetched news :: {}", news);
        logger.debug("Exit :: CNWNewsServiceImpl :: getCNWNews :: {}", newsObj);
        return newsObj;
	}

	private Pagination setPagination(int curPage, int prevPage, String requestURL, String totalResults) {
		logger.debug("Entry :: CNWNewsServiceImpl :: setPagination :: curPage: {}, prevPage: {}, requestURL: {}", curPage, prevPage, requestURL);
		String rcordPerPageStr = "10";
		int firstBreakPt = 5;
		int firstMinTotal = 6;
		int resultSize = 0;
		final String requestUrlStr = requestURL + "/";
		logger.debug("***before pagination -  rcordPerPageStr={},  totalResults={}", rcordPerPageStr, totalResults);

		int recordPerPage = Integer.parseInt(rcordPerPageStr);
		resultSize = Integer.parseInt(totalResults);
		int mod = resultSize % recordPerPage;
		int totalPages = resultSize / recordPerPage;
		if (mod > 0) {
			totalPages++;
		}
		logger.debug("mod ={}, totalPages={}", Integer.valueOf(mod), Integer.valueOf(totalPages));

		int secondBreakPt = totalPages - 4;

		if (totalPages <= 1) {
			return null;
		}
		List<PageItem> pageItems = new ArrayList<>();
		PageItem pageItemEllipsis = new PageItem();
		pageItemEllipsis.setEllipsis(true);

		if (curPage < firstBreakPt || totalPages <= firstMinTotal) {
			int maxFirst = firstBreakPt;
			if (totalPages < firstMinTotal + 1) {
				maxFirst = totalPages;
			}
			setInnerPageItems(2, maxFirst, pageItems, requestUrlStr);
			if (totalPages > firstMinTotal) {
				pageItems.add(pageItemEllipsis);

				PageItem pageItem = new PageItem();
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

			PageItem pageItem = new PageItem();
			pageItem.setHref(requestUrlStr + String.valueOf(totalPages));
			pageItem.setIndex(totalPages);
			pageItems.add(pageItem);
		}
		int nextPageNo = curPage + 1;
		return new Pagination(prevPage, curPage, nextPageNo, totalPages, pageItems);
	}

	public void setInnerPageItems(int startIndex, int endIndex, List<PageItem> pageItems, String requestUrlStr) {
		for (int i = startIndex; i <= endIndex; i++) {
			PageItem pageItem = new PageItem();
			pageItem.setHref(requestUrlStr + String.valueOf(i));
			pageItem.setIndex(i);
			pageItems.add(pageItem);
		}
	}

	public NewsDetails getCNWNewsDetails(String id, String locale) throws IOException, ParseException, ApplicationException, SystemException {
		logger.debug("Entry :: CNWNewsServiceImpl :: getCNWNewsDetails :: id: {}, locale: {}", id, locale);
		NewsDetails newsDetails = null;
		StringBuilder importUrl = new StringBuilder();
		importUrl.append(this.cnwNewsConfig.getCnwServiceUrl());
		importUrl.append(CNW_SERVICE_PARAM);
		importUrl.append("&method=get");
		importUrl.append(HTML_SAFE);
		importUrl.append(FORMAT_JSON);
		importUrl.append("&id=" + id);
		newsDetails = new ObjectMapper().readValue(this.restService.callGetWebService(importUrl.toString()), NewsDetails.class);
        newsDetails.getRelease().setReleaseDate((new SimpleDateFormat(dateFormatMap.get(locale), new Locale(locale))).format(this.inputDateFormatter.parse(newsDetails.getRelease().getReleaseDate())));
		logger.debug("Exit :: CNWNewsServiceImpl :: getCNWNewsDetails :: newsDetails :: {}", newsDetails);
		return newsDetails;
	}
}
