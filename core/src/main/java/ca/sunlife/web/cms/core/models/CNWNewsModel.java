package ca.sunlife.web.cms.core.models;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;
import com.fasterxml.jackson.databind.ObjectMapper;

import ca.sunlife.web.cms.core.beans.PageItem;
import ca.sunlife.web.cms.core.beans.ReleaseMain;
import ca.sunlife.web.cms.core.services.CNWNewsService;

/**
 * @author mo92
 *
 */
@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CNWNewsModel {

	@Inject
	private Page currentPage;

	@Self
	private SlingHttpServletRequest request;

	@Inject
	private CNWNewsService newsService;

	/** The log */
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	/** news */
	private ReleaseMain news;

	/** totalNoYears */
	private int totalNoYears = 3;

	/** activeYear */
	private int activeYear;

	/** yearsToShow */
	private List<Integer> yearsToShow;

	/** prevText */
	private String prevText = "Previous";

	/** nextText */
	private String nextText = "Next";

	/** ofStr */
	private String ofStr = "of";

	/** rcordPerPageStr */
	private String rcordPerPageStr = "10"; // Default to 10 items per page

	/** prevPage */
	private int prevPage = 0;

	/** curPage */
	private int curPage = 1;

	/** locale */
	private String locale;

	/** requestURL */
	private StringBuilder requestURL;

	/** paginationHtml */
	private String paginationHtml;

	/** Pagination fields start */
	private int totalPages;
	private int firstBreakPt = 5; // first 4 pages
	private int firstMinTotal = 6; // first break pt when less than this number
	private int secondBreakPt;
	private List<PageItem> pageItems;
	private String firstPageText;
	/** Pagination fields start */
	
	/**
	 * @return the news
	 */
	public ReleaseMain getNews() {
		return news;
	}

	/**
	 * @param news the news to set
	 */
	public void setNews(ReleaseMain news) {
		this.news = news;
	}

	/**
	 * @return the totalNoYears
	 */
	public int getTotalNoYears() {
		return totalNoYears;
	}

	/**
	 * @param totalNoYears the totalNoYears to set
	 */
	public void setTotalNoYears(int totalNoYears) {
		this.totalNoYears = totalNoYears;
	}

	/**
	 * @return the activeYear
	 */
	public int getActiveYear() {
		return activeYear;
	}

	/**
	 * @param activeYear the activeYear to set
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
	 * @param yearsToShow the yearsToShow to set
	 */
	public void setYearsToShow(List<Integer> yearsToShow) {
		this.yearsToShow = yearsToShow;
	}

	/**
	 * @return the prevText
	 */
	public String getPrevText() {
		return prevText;
	}

	/**
	 * @param prevText the prevText to set
	 */
	public void setPrevText(String prevText) {
		this.prevText = prevText;
	}

	/**
	 * @return the nextText
	 */
	public String getNextText() {
		return nextText;
	}

	/**
	 * @param nextText the nextText to set
	 */
	public void setNextText(String nextText) {
		this.nextText = nextText;
	}

	/**
	 * @return the ofStr
	 */
	public String getOfStr() {
		return ofStr;
	}

	/**
	 * @param ofStr the ofStr to set
	 */
	public void setOfStr(String ofStr) {
		this.ofStr = ofStr;
	}

	/**
	 * @return the rcordPerPageStr
	 */
	public String getRcordPerPageStr() {
		return rcordPerPageStr;
	}

	/**
	 * @param rcordPerPageStr the rcordPerPageStr to set
	 */
	public void setRcordPerPageStr(String rcordPerPageStr) {
		this.rcordPerPageStr = rcordPerPageStr;
	}

	/**
	 * @return the prevPage
	 */
	public int getPrevPage() {
		return prevPage;
	}

	/**
	 * @param prevPage the prevPage to set
	 */
	public void setPrevPage(int prevPage) {
		this.prevPage = prevPage;
	}

	/**
	 * @return the curPage
	 */
	public int getCurPage() {
		return curPage;
	}

	/**
	 * @param curPage the curPage to set
	 */
	public void setCurPage(int curPage) {
		this.curPage = curPage;
	}

	/**
	 * @return the locale
	 */
	public String getLocale() {
		return locale;
	}

	/**
	 * @param locale the locale to set
	 */
	public void setLocale(String locale) {
		this.locale = locale;
	}

	/**
	 * @return the requestURL
	 */
	public StringBuilder getRequestURL() {
		return requestURL;
	}

	/**
	 * @param requestURL the requestURL to set
	 */
	public void setRequestURL(StringBuilder requestURL) {
		this.requestURL = requestURL;
	}

	/**
	 * @return the paginationHtml
	 */
	public String getPaginationHtml() {
		return paginationHtml;
	}

	/**
	 * @param paginationHtml the paginationHtml to set
	 */
	public void setPaginationHtml(String paginationHtml) {
		this.paginationHtml = paginationHtml;
	}

	/**
	 * @return the firstBreakPt
	 */
	public int getFirstBreakPt() {
		return firstBreakPt;
	}

	/**
	 * @param firstBreakPt the firstBreakPt to set
	 */
	public void setFirstBreakPt(int firstBreakPt) {
		this.firstBreakPt = firstBreakPt;
	}

	/**
	 * @return the firstMinTotal
	 */
	public int getFirstMinTotal() {
		return firstMinTotal;
	}

	/**
	 * @param firstMinTotal the firstMinTotal to set
	 */
	public void setFirstMinTotal(int firstMinTotal) {
		this.firstMinTotal = firstMinTotal;
	}

	/**
	 * @return the secondBreakPt
	 */
	public int getSecondBreakPt() {
		return secondBreakPt;
	}

	/**
	 * @param secondBreakPt the secondBreakPt to set
	 */
	public void setSecondBreakPt(int secondBreakPt) {
		this.secondBreakPt = secondBreakPt;
	}

	/**
	 * @return the pageItems
	 */
	public List<PageItem> getPageItems() {
		return pageItems;
	}

	/**
	 * @param pageItems the pageItems to set
	 */
	public void setPageItems(List<PageItem> pageItems) {
		this.pageItems = pageItems;
	}

	/**
	 * @return the firstPageText
	 */
	public String getFirstPageText() {
		return firstPageText;
	}

	/**
	 * @param firstPageText the firstPageText to set
	 */
	public void setFirstPageText(String firstPageText) {
		this.firstPageText = firstPageText;
	}

	/**
	 * @return the totalPages
	 */
	public int getTotalPages() {
		return totalPages;
	}

	/**
	 * @param totalPages the totalPages to set
	 */
	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}

	@PostConstruct
	public void init() {
		logger.debug("Entry :: CNWNewsModel :: init ::");
		String pageNum;
		String datePattern = "MMMM dd, yyyy";
		String cnwDatePattern = "EEE, dd MMM yyyy HH:mm:ss zzzzz";
		String category = "&category=773";
		String strYear;

		try {
			int year = Calendar.getInstance().get(Calendar.YEAR);
			int downYear = year;
			yearsToShow = new ArrayList<>();
			for (int i = 0; i < totalNoYears; i++) {
				yearsToShow.add(downYear--);
			}
			logger.debug("yearsToShow :: {}", yearsToShow);

			activeYear = year;

			locale = currentPage.getLanguage().getLanguage();
			logger.debug("Fetched locale :: {}", locale);
			pageNum = request.getParameter("pageNo");
			strYear = request.getParameter("year");
			logger.debug("Fetched params  pageNum: {}, strYear: {}", pageNum, strYear);
			if (null != strYear && !"".equals(strYear)) {
				activeYear = Integer.parseInt(strYear);
			}
			logger.debug("Fetched locale :: {}", activeYear);

			StringBuilder importUrl = new StringBuilder();
			String cnwRequestListURI = "http://internal-www.sunlife.ca/slfServiceApp/invokeService.wca?service=cnw&method=list&safehtml=1&format=json&fields=releaseDate,headline,subheadline,summary";
			importUrl.append(cnwRequestListURI);
			importUrl.append(category); // get items categorized as SLGI
			importUrl.append("&start_date=");
			importUrl.append(activeYear); // generate beginning of year: Jan 01, <year>
			importUrl.append("0101&end_date=");
			importUrl.append(activeYear);
			importUrl.append("1231"); // generate end of year: Dec 31, <year>
			importUrl.append("&limit=");
			importUrl.append(rcordPerPageStr); // number of items per page

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
			logger.debug("importUrl: {}", importUrl);
			news = new ObjectMapper().readValue(newsService.callGet(importUrl.toString()), ReleaseMain.class);

			news.getReleases().getRelease().stream().forEach(o -> {
				SimpleDateFormat inputFormatter = new SimpleDateFormat(cnwDatePattern);
				Date date;
				try {
					date = inputFormatter.parse(o.getReleaseDate());
					o.setReleaseDate(new SimpleDateFormat(datePattern, new Locale(locale)).format(date));
				} catch (ParseException e) {
					logger.error("Error :: parsing the release date {}", e);
				}
			});
			logger.debug("Fetched news :: {}", news);

			String uri = request.getRequestURI();
			String qs = request.getQueryString();
			logger.debug("uri: {}", uri);
			logger.debug("qs: {}", qs);
			uri = uri.replaceAll("/sites", "");
			requestURL = new StringBuilder();
			requestURL.append(uri);
			requestURL.append("?");
			logger.debug("generated requestURL: {}", requestURL);
			// since using existing URL, may already have page param - so clean it up, if
			// needed
			if (qs != null) {
				logger.debug("qs: {}", qs);
				if (qs.indexOf("pageNo") != -1) {
					qs = qs.replaceAll("&?pageNo=[^&]+", "");
					qs = qs.replaceAll("&+$", "");
				}
				logger.debug("qs 1: {}", qs);
				if (qs.indexOf("year") != -1) {
					qs = qs.replaceAll("&?year=[^&]+", "");
					qs = qs.replaceAll("&+$", "");
					qs = qs + "&year=" + activeYear;
				}
				logger.debug("qs 2: {}", qs);
				requestURL.append(qs);
				requestURL.append("&");
			}
			requestURL.append("pageNo=");
			setPagination();
		} catch (IOException e) {
			logger.error("Error :: CNWNewsModel :: init method :: {}", e);
		}
	}

	private void setPagination() {
		logger.debug("Entry :: CNWNewsModel :: setPagination :: requestUrl: {}", requestURL);
		int resultSize = 0;
		logger.debug("***before pagination -  rcordPerPageStr={},  matching_count={}", rcordPerPageStr,
				news.getReleases().getMatchingCount());
		
		int recordPerPage = Integer.parseInt(rcordPerPageStr);
		resultSize = Integer.parseInt(news.getReleases().getMatchingCount());
		int mod = resultSize % recordPerPage;
		totalPages = resultSize / recordPerPage;
		if (mod > 0) {
			totalPages = totalPages + 1;
		}
		logger.debug("<!--mod ={}, totalPages={}", mod, totalPages);

		secondBreakPt = totalPages - 4; // final 4 pages

		if (totalPages <= 1) {
			return;
		}
		pageItems = new ArrayList<>();
		/********************************************
		 * First Scenario (Page numbering page 1-4)
		 ********************************************/
		if (curPage < firstBreakPt || totalPages <= firstMinTotal) {
			int maxFirst = firstBreakPt;
			if (totalPages < firstMinTotal + 1) {
				maxFirst = totalPages;
			}

			for (int i = 2; i <= maxFirst; i++) {
				PageItem pageItem = new PageItem();
				pageItem.setHref(requestURL + String.valueOf(i));
				pageItem.setIndex(i);
				pageItems.add(pageItem);
			} // for end

			if (totalPages > firstMinTotal) {
				PageItem pageItem = new PageItem();
				pageItem.setHref(requestURL + String.valueOf(totalPages));
				pageItem.setIndex(totalPages);
				pageItems.add(pageItem);
			} // if end
		} // First scenario END

		/********************************************
		 * second Scenario (Page numbering final 4 pages)
		 ********************************************/
		else if (curPage >= secondBreakPt) {
			for (int i = secondBreakPt; i <= totalPages; i++) {
				PageItem pageItem = new PageItem();
				pageItem.setHref(requestURL + String.valueOf(i));
				pageItem.setIndex(i);
				pageItems.add(pageItem);
			} // for end
		} // second scenario end

		/********************************************
		 * Third Scenario (Page numbering pages 5 - (n-5))
		 ********************************************/
		else {
			for (int i = curPage - 2; i <= (curPage + 2); i++) {
				PageItem pageItem = new PageItem();
				pageItem.setHref(requestURL + String.valueOf(i));
				pageItem.setIndex(i);
				pageItems.add(pageItem);
			}
			PageItem pageItem = new PageItem();
			pageItem.setHref(requestURL + String.valueOf(totalPages));
			pageItem.setIndex(totalPages);
			pageItems.add(pageItem);
		} // else end

	}

	/**
	 * Generates the full request url
	 * @return
	 */
	public String getFullURL() {
		StringBuilder requestURLStr = new StringBuilder(request.getRequestURL().toString());
		String queryString = "vgnLocale=" + currentPage.getLanguage();
		logger.debug("queryString {} ", queryString);
		return requestURLStr.append('?').append(queryString).toString();
	}
}
