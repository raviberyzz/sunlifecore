package ca.sunlife.web.cms.core.services.impl;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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

	public static final String CNW_SERVICE_PARAM = "?service=cnw"; //	CNW service
	public static final String METHOD_LIST = "&method=list";	//	CNW service method
	public static final String HTML_SAFE = "&safehtml=1";	//	Safe HTML
	public static final String CATEGORY_773 = "&category=773"; // Category for ca site
	public static final String FORMAT_JSON = "&format=json"; // JSON format output
	public static final String CNW_DATE_PATTERN = "EEE, dd MMM yyyy HH:mm:ss zzzzz"; // CNW date format
	public static final String DATE_PATTERN_EN = "MMMM dd, yyyy"; // English site date format
	public static final String DATE_PATTERN_FR = "dd MMMM yyyy"; // French site date format
	private SimpleDateFormat inputDateFormatter = new SimpleDateFormat(CNW_DATE_PATTERN); // date input formatter

	@Activate
	public void activate(CNWNewsConfig cnwNewsConfig) {
		this.cnwNewsConfig = cnwNewsConfig;
		this.logger.debug("cnwNewsConfig: {}, inputFormatter: {}", cnwNewsConfig.getCnwServiceUrl(), this.inputDateFormatter);
	}

	public ReleaseMain getCNWNewsOverview(String locale) throws IOException {
		this.logger.debug("Entry :: CNWNewsServiceImpl :: getCNWNewsOverview :: locale :: {}", locale);
		ReleaseMain releaseMain = null;
		StringBuilder importUrl = new StringBuilder();
		boolean isLocaleEn = (null != locale && "en".equals(locale));
		this.logger.debug("getCNWNewsOverview :: isLocaleEn :: {}", Boolean.valueOf(isLocaleEn));
		String cnwRequestListURI = this.cnwNewsConfig.getCnwServiceUrl();
		importUrl.append(cnwRequestListURI);
		importUrl.append(CNW_SERVICE_PARAM);
		importUrl.append(METHOD_LIST);
		if (!isLocaleEn) {
			importUrl.append("_" + locale);
		}
		importUrl.append(HTML_SAFE);
		importUrl.append(CATEGORY_773);
		importUrl.append(FORMAT_JSON);
		importUrl.append("&limit=3");

		releaseMain = new ObjectMapper().readValue(this.restService.callGetWebService(importUrl.toString()), ReleaseMain.class);
		this.logger.debug("locale: {}, {}", locale, releaseMain);
		releaseMain.getReleases().getRelease().stream().forEach(o -> {
			try {
				Date date = this.inputDateFormatter.parse(o.getReleaseDate());
				o.setReleaseDate((new SimpleDateFormat(isLocaleEn ? DATE_PATTERN_EN : DATE_PATTERN_FR, new Locale(locale))).format(date));
			} catch (ParseException e) {
				this.logger.error("Error :: parsing the release date {}", e);
			}
		});
		return releaseMain;
	}

	public News getCNWNews(String locale, String requestURL, String pageNum, String activeYear) throws IOException {
		this.logger.debug("Entry :: CNWNewsServiceImpl :: getCNWNews ");
		String rcordPerPageStr = "10";
		int curPage = 1;
		int prevPage = 0;
		try {
			boolean isLocaleEn = (null != locale && "en".equals(locale));
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
			importUrl.append(CATEGORY_773);
			importUrl.append("&start_date=");
			importUrl.append(activeYear);
			importUrl.append("0101&end_date=");
			importUrl.append(activeYear);
			importUrl.append("1231");
			importUrl.append("&limit=");
			importUrl.append(rcordPerPageStr);

			if (pageNum != null) {
				curPage = Integer.parseInt(pageNum);
				if (curPage <= 0) {
					curPage = 1;
				}
				prevPage = curPage - 1;
				int offset = prevPage * Integer.parseInt(rcordPerPageStr);
				importUrl.append("&offset=");
				importUrl.append(offset);
			}
			this.logger.debug("importUrl: {}", importUrl);
			ReleaseMain news = new ObjectMapper().readValue(this.restService.callGetWebService(importUrl.toString()), ReleaseMain.class);
			news.getReleases().getRelease().stream().forEach(o -> {
				try {
					Date date = this.inputDateFormatter.parse(o.getReleaseDate());
					o.setReleaseDate((new SimpleDateFormat(isLocaleEn ? DATE_PATTERN_EN : DATE_PATTERN_FR, new Locale(locale))).format(date));
				} catch (ParseException e) {
					this.logger.error("Error :: parsing the release date {}", e);
				}
			});
			this.logger.debug("Fetched news :: {}", news);

			News newsObj = new News();
			newsObj.setReleaseMain(news);
			newsObj.setPagination(setPagination(curPage, prevPage, requestURL, news));
			this.logger.debug("Exit :: CNWNewsServiceImpl :: getCNWNews :: {}", newsObj);
			return newsObj;
		} catch (IOException e) {
			this.logger.error("Error :: CNWNewsServiceImpl :: getCNWNews :: {}", e);
			throw e;
		}
	}

	private Pagination setPagination(int curPage, int prevPage, String requestURL, ReleaseMain news) {
		this.logger.debug("Entry :: CNWNewsServiceImpl :: setPagination :: curPage: {}, prevPage: {}, requestURL: {}", curPage, prevPage, requestURL);
		String rcordPerPageStr = "10";
		int firstBreakPt = 5;
		int firstMinTotal = 6;
		int resultSize = 0;
		String requestUrlStr = requestURL + ".";
		this.logger.debug("***before pagination -  rcordPerPageStr={},  matching_count={}", rcordPerPageStr, news.getReleases().getMatchingCount());

		int recordPerPage = Integer.parseInt(rcordPerPageStr);
		resultSize = Integer.parseInt(news.getReleases().getMatchingCount());
		int mod = resultSize % recordPerPage;
		int totalPages = resultSize / recordPerPage;
		if (mod > 0) {
			totalPages++;
		}
		this.logger.debug("mod ={}, totalPages={}", Integer.valueOf(mod), Integer.valueOf(totalPages));

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

			for (int i = 2; i <= maxFirst; i++) {
				PageItem pageItem = new PageItem();
				pageItem.setHref(requestUrlStr + String.valueOf(i));
				pageItem.setIndex(i);
				pageItems.add(pageItem);
			}

			if (totalPages > firstMinTotal) {
				pageItems.add(pageItemEllipsis);

				PageItem pageItem = new PageItem();
				pageItem.setHref(requestUrlStr + String.valueOf(totalPages));
				pageItem.setIndex(totalPages);
				pageItems.add(pageItem);

			}

		} else if (curPage >= secondBreakPt) {

			pageItems.add(pageItemEllipsis);

			for (int i = secondBreakPt; i <= totalPages; i++) {
				PageItem pageItem = new PageItem();
				pageItem.setHref(requestUrlStr + String.valueOf(i));
				pageItem.setIndex(i);
				pageItems.add(pageItem);

			}

		} else {

			pageItems.add(pageItemEllipsis);

			for (int i = curPage - 2; i <= curPage + 2; i++) {
				PageItem pageItem = new PageItem();
				pageItem.setHref(requestUrlStr + String.valueOf(i));
				pageItem.setIndex(i);
				pageItems.add(pageItem);
			}

			pageItems.add(pageItemEllipsis);

			PageItem pageItem = new PageItem();
			pageItem.setHref(requestUrlStr + String.valueOf(totalPages));
			pageItem.setIndex(totalPages);
			pageItems.add(pageItem);
		}
		int nextPageNo = curPage + 1;
		return new Pagination(prevPage, curPage, nextPageNo, totalPages, pageItems);
	}

	public NewsDetails getCNWNewsDetails(String id, String locale) throws IOException, ParseException {
		this.logger.debug("Entry :: CNWNewsServiceImpl :: getCNWNewsDetails :: id: {}, locale: {}", id, locale);
		NewsDetails newsDetails = null;
		StringBuilder importUrl = new StringBuilder();
		importUrl.append(this.cnwNewsConfig.getCnwServiceUrl());
		importUrl.append(CNW_SERVICE_PARAM);
		importUrl.append("&method=get");
		importUrl.append(HTML_SAFE);
		importUrl.append(FORMAT_JSON);
		importUrl.append("&id=" + id);
		try {
			newsDetails = new ObjectMapper().readValue(this.restService.callGetWebService(importUrl.toString()), NewsDetails.class);
			boolean isLocaleEn = (null != locale && "en".equals(locale));
			newsDetails.getRelease().setReleaseDate((new SimpleDateFormat(isLocaleEn ? DATE_PATTERN_EN : DATE_PATTERN_FR, new Locale(locale))).format(this.inputDateFormatter.parse(newsDetails.getRelease().getReleaseDate())));
		} catch (ParseException e) {
			this.logger.error("Error :: ParseException :: {}", e);
			throw e;
		}
		this.logger.debug("Exit :: CNWNewsServiceImpl :: getCNWNewsDetails :: newsDetails :: {}", newsDetails);
		return newsDetails;
	}
}
