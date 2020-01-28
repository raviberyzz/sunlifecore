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

import ca.sunlife.web.cms.core.beans.ReleaseMain;
import ca.sunlife.web.cms.core.services.CNWNewsService;

/**
 * @author mo92
 *
 */
@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CNWNewsModel {
	/** The log. */
	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Inject
	private Page currentPage;

	@Self
	private SlingHttpServletRequest request;

	@Inject
	private CNWNewsService newsService;

	/** news. */
	private ReleaseMain news;

	/** totalNoYears. */
	private int totalNoYears = 3;

	/** activeYear. */
	private int activeYear;

	/** yearsToShow. */
	private List<Integer> yearsToShow;

	/** prevText. */
	private String prevText = "Previous";

	/** nextText. */
	private String nextText = "Next";

	/** ofStr. */
	private String ofStr = "of";

	/** rcordPerPageStr. */
	private String rcordPerPageStr = "10"; // Default to 10 items per page

	/** prevPage. */
	private int prevPage = 0;

	/** curPage. */
	private int curPage = 1;

	/** locale. */
	private String locale;

	private StringBuffer requestURL = new StringBuffer();
	
	/** paginationHtml. */
	private String paginationHtml;
	
	public ReleaseMain getNews() {
		return news;
	}

	public void setNews(ReleaseMain news) {
		this.news = news;
	}

	public Page getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(Page currentPage) {
		this.currentPage = currentPage;
	}

	public SlingHttpServletRequest getRequest() {
		return request;
	}

	public void setRequest(SlingHttpServletRequest request) {
		this.request = request;
	}

	public int getTotalNoYears() {
		return totalNoYears;
	}

	public void setTotalNoYears(int totalNoYears) {
		this.totalNoYears = totalNoYears;
	}

	public int getActiveYear() {
		return activeYear;
	}

	public void setActiveYear(int activeYear) {
		this.activeYear = activeYear;
	}

	public String getPrevText() {
		return prevText;
	}

	public void setPrevText(String prevText) {
		this.prevText = prevText;
	}

	public String getNextText() {
		return nextText;
	}

	public void setNextText(String nextText) {
		this.nextText = nextText;
	}

	public String getOfStr() {
		return ofStr;
	}

	public void setOfStr(String ofStr) {
		this.ofStr = ofStr;
	}

	public List<Integer> getYearsToShow() {
		return yearsToShow;
	}

	public void setYearsToShow(List<Integer> yearsToShow) {
		this.yearsToShow = yearsToShow;
	}

	public String getRcordPerPageStr() {
		return rcordPerPageStr;
	}

	public void setRcordPerPageStr(String rcordPerPageStr) {
		this.rcordPerPageStr = rcordPerPageStr;
	}

	public int getPrevPage() {
		return prevPage;
	}

	public void setPrevPage(int prevPage) {
		this.prevPage = prevPage;
	}

	public int getCurPage() {
		return curPage;
	}

	public void setCurPage(int curPage) {
		this.curPage = curPage;
	}

	public String getLocale() {
		return locale;
	}

	public void setLocale(String locale) {
		this.locale = locale;
	}

	public String getPaginationHtml() {
		return paginationHtml;
	}

	public void setPaginationHtml(String paginationHtml) {
		this.paginationHtml = paginationHtml;
	}

	@PostConstruct
	public void init() {
		logger.debug("Entry :: init ::");
		String pageNum;
		String datePattern = "MMMM dd, yyyy";
		String cnwDatePattern = "EEE, dd MMM yyyy HH:mm:ss zzzzz";
		String category = "";
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
			news = new ObjectMapper().readValue(newsService.getCnwNews(importUrl.toString()), ReleaseMain.class);

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
			// added this fix as WEM 10.5 project
			uri = uri.replaceAll("/sites", "");
			requestURL.append(uri);
			requestURL.append("?");
			logger.debug("generated requestURL: {}", requestURL);
			// since using existing URL, may already have page param - so clean it up, if needed
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
					qs = qs + "&year="+activeYear;
				}
				logger.debug("qs 2: {}", qs);
				requestURL.append(qs);
			  	requestURL.append("&");
			}
			requestURL.append("pageNo=");
			paginationHtml = setPagination();
		} catch (IOException e) {
			logger.error("Error :: init method of CNWNewsModel :: {}", e);
		}
	}

	private String setPagination() {
		logger.debug("requestUrl: {}", requestURL);
		String firstPageText = "";
		int resultSize = 0;
		logger.debug("***before pagination -  rcordPerPageStr={},  matching_count={}", rcordPerPageStr,
				news.getReleases().getMatching_count());
		int recordPerPage = Integer.parseInt(rcordPerPageStr);
		if (news.getReleases().getMatching_count() != null) {
			resultSize = Integer.parseInt(news.getReleases().getMatching_count());
		}
		int mod = resultSize % recordPerPage;
		int totalPages = resultSize / recordPerPage;
		if (mod > 0) {
			totalPages = totalPages + 1;
		}
		logger.debug("<!--mod ={}, totalPages={}", mod, totalPages);

		int firstBreakPt = 5; // first 4 pages
		int firstMinTotal = 6; // first break pt when less than this number
		int secondBreakPt = totalPages - 4; // final 4 pages
		String previousCss = curPage == 1 ? "disabled" : "";
		String nextCss = curPage == totalPages ? "disabled" : "";
		String firstPageCss = curPage == 1 ? "active" : "";
		String ellipsisStr = "<li class=\"ellipsis\"><a><span>…</span></a></li>";

		if (totalPages <= 1) {
			return null;
		}
		
		StringBuilder htmlStr = new StringBuilder();
		htmlStr.append("<nav role=\"navigation\" aria-label=\"Page\" class=\"text-center\">");

		if (curPage == 1) {
			htmlStr.append("<ul class=\"pagination first-page\">");
		} else if (curPage == totalPages) {
			htmlStr.append("<ul class=\"pagination last-page\">");
		} else {
			htmlStr.append("<ul class=\"pagination\">");
		}

		if (curPage > 1) {
			htmlStr.append("<li class=\"previous " + previousCss + "\">");
			htmlStr.append("<a href=\"" + requestURL + prevPage + " \">");
			htmlStr.append("<span class=\"fa fa-angle-left\" aria-hidden=\"true\"></span>");
			htmlStr.append("<span>"+prevText+" </span></a></li>");
		}

		htmlStr.append("<li class=\"link-to-first " + firstPageCss + "\">");
		htmlStr.append("<a href=\""+requestURL+"1\" aria-label=\"" + firstPageText + "\">");
		htmlStr.append("<span class=\"fa fa-angle-double-left\" aria-hidden=\"true\"></span>");
		htmlStr.append("<span>1</span></a></li>");

		/********************************************
		 * First Scenario (Page numbering page 1-4)
		 ********************************************/
		if (curPage < firstBreakPt || totalPages <= firstMinTotal) {
			int maxFirst = firstBreakPt;
			if (totalPages < firstMinTotal + 1) {
				maxFirst = totalPages;
			}

			for (int i = 2; i <= maxFirst; i++) {
				String currCSS = curPage == i ? "active" : "";

				htmlStr.append("<li class=\"" + currCSS + "\">");
				htmlStr.append("<a href=\""+requestURL + i + " \" >");
				htmlStr.append("<span>" + i + "</span>");
				htmlStr.append("</a>");
				htmlStr.append("</li>");

			} // for end

			if (totalPages > firstMinTotal) {
				htmlStr.append("<li class=\"\">");
				htmlStr.append("<a href=\""+requestURL+ totalPages + "\" >");
				htmlStr.append("<span>" + totalPages + "</span>");
				htmlStr.append("</a>");
				htmlStr.append("</li>");
			} // if end
		} // First scenario END

		/********************************************
		 * second Scenario (Page numbering final 4 pages)
		 ********************************************/
		else if (curPage >= secondBreakPt) {
			for (int i = secondBreakPt; i <= totalPages; i++) {
				String currCSS = curPage == i ? "active" : "";

				htmlStr.append("<li class=\"" + currCSS + "\">");
				htmlStr.append("<a href=\""+requestURL + i + "\" >");
				htmlStr.append("<span>" + i + "</span>");
				htmlStr.append("</a>");
				htmlStr.append("</li> ");
			} // for end
		} // second scenario end

		/********************************************
		 * Third Scenario (Page numbering pages 5 - (n-5))
		 ********************************************/
		else {
			logger.debug("{}", ellipsisStr);
			for (int i = curPage - 2; i <= (curPage + 2); i++) {
				String currCSS = (curPage == i) ? "active" : "";
				htmlStr.append("<li class=\"" + currCSS + "\">");
				htmlStr.append("<a href=\""+requestURL + i + "\" >");
				htmlStr.append("<span>" + i + "</span>");
				htmlStr.append("</a>");
				htmlStr.append("</li>");
			}
			logger.debug("{}", ellipsisStr);

			htmlStr.append("<li class=\"\">");
			htmlStr.append("<a href=\""+requestURL + totalPages + "\" >");
			htmlStr.append("<span>" + totalPages + "</span>");
			htmlStr.append("</a>");
			htmlStr.append("</li>");
		} // else end

		if (curPage < totalPages) {
			htmlStr.append("<li class=\"next " + nextCss + "\">");
			htmlStr.append("<a href=\""+requestURL + curPage + 1 + "\">" + nextText + " </a>");
			htmlStr.append("</li>");
		}

		htmlStr.append("</ul>");
		htmlStr.append("<!-- COMPONENT: END -->");
		htmlStr.append("<div class=\"pagination-indicator\">");
		if (("fr").equals(locale)) {
			htmlStr.append("Page "+ curPage +"  de " + totalPages + "");
		} else {
			htmlStr.append("Page "+ curPage +"  of " + totalPages + "");
		}
		htmlStr.append(" </div></nav> ");
		return htmlStr.toString();
	}
	
	// Request Parameters
	/**
	 * pageNo year - Calendar year lang vgnLang rcordPerPageStr - 10 datePattern
	 * cnwdatePattern locale
	 * 
	 * prevText - Previous nextText - Next ofStr - of toalNoYears - 3
	 * 
	 * 
	 */
}
