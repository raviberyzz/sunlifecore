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
import ca.sunlife.web.cms.core.constants.BasePageModelConstants;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * The Class AnnouncementList.
 */
@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, adapters = AnnouncementList.class, resourceType = "sunlife/core/components/content/news-announcement-list", defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AnnouncementList {

	/** The parent path. */
	@Inject
	@Via("resource")
	private String parentPath;

	/** The max items. */
	@Inject
	@Via("resource")
	private int maxItems;

	/** The news type. */
	@Inject
	@Via("resource")
	private String newsType;

	/** The content type converter. */
	@Inject
	private ContentTypeConverter contentTypeConverter;

	/** The core resource resolver. */
	@Inject
	private CoreResourceResolver coreResourceResolver;

	/** The config service. */
	@Inject
	private SiteConfigService configService;

	/** The latest year. */
	@Inject
	@Via("resource")
	private String latestYear;

	/** No. of tabs */
	@Inject
	@Via("resource")
	private String numberOfTabs;

	/** Previous button text. */
	@Inject
	@Via("resource")
	private String previousText;

	/** Next button text. */
	@Inject
	@Via("resource")
	private String nextText;

	/** Page label text. */
	@Inject
	@Via("resource")
	private String pageText;

	/** Of label text. */
	@Inject
	@Via("resource")
	private String ofText;

	/** Message when no news are there. */
	@Inject
	@Via("resource")
	private String noNewsMessage;

	/** The sling http servlet request. */
	@Self(injectionStrategy = InjectionStrategy.REQUIRED)
	private SlingHttpServletRequest request;

	/** The current page. */
	@ScriptVariable
	private Page currentPage;

	/** Active Year. */
	private int activeYear;

	/** Years To Show - Tabs. */
	private List<Integer> yearsToShow;

	/** requestURL. */
	private String requestURL;

	/** relative URL - without any selectors. */
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

	/** The items. */
	private final List<DAMContentFragment> items = new ArrayList<>();

	/** The element names. */
	private static final String[] ELEMENT_NAMES = { "articlePublishedDate", "newsroomHeading", "newsroomPagePath",
			"newsroomContent" };
	private static String JCR_SLASH="/";
	/** The logger. */
	private static final Logger LOGGER = LoggerFactory.getLogger(AnnouncementList.class);

	/**
	 * Gets the page url.
	 *
	 * @return the pageUrl
	 */
	public final String getPageUrl() {
		return pageUrl;
	}

	/**
	 * Sets the page url.
	 *
	 * @param pageUrl
	 *            the pageUrl to set
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
	 *            the pagination to set
	 */
	public final void setPagination(final Pagination pagination) {
		this.pagination = pagination;
	}

	/**
	 * Gets the total match.
	 *
	 * @return the totalMatch
	 */
	public final int getTotalMatch() {
		return totalMatch;
	}

	/**
	 * Sets the total match.
	 *
	 * @param totalMatch
	 *            the totalMatch to set
	 */
	public final void setTotalMatch(final int totalMatch) {
		this.totalMatch = totalMatch;
	}

	/**
	 * Gets the date format.
	 *
	 * @return the dateFormat
	 */
	public final String getDateFormat() {
		return dateFormat;
	}

	/**
	 * Sets the date format.
	 *
	 * @param dateFormat
	 *            the dateFormat to set
	 */
	public final void setDateFormat(final String dateFormat) {
		this.dateFormat = dateFormat;
	}

	/**
	 * Gets the page num.
	 *
	 * @return the pageNum
	 */
	public final int getPageNum() {
		return pageNum;
	}

	/**
	 * Sets the page num.
	 *
	 * @param pageNum
	 *            the pageNum to set
	 */
	public final void setPageNum(final int pageNum) {
		this.pageNum = pageNum;
	}

	/**
	 * Gets the parent path.
	 *
	 * @return the parentPath
	 */
	public final String getParentPath() {
		return parentPath;
	}

	/**
	 * Sets the parent path.
	 *
	 * @param parentPath
	 *            the parentPath to set
	 */
	public final void setParentPath(final String parentPath) {
		this.parentPath = parentPath;
	}

	/**
	 * Gets the max items.
	 *
	 * @return the maxItems
	 */
	public final int getMaxItems() {
		return maxItems;
	}

	/**
	 * Sets the max items.
	 *
	 * @param maxItems
	 *            the maxItems to set
	 */
	public final void setMaxItems(final int maxItems) {
		this.maxItems = maxItems;
	}

	/**
	 * Gets the list items.
	 *
	 * @return the list items
	 */
	public Collection<DAMContentFragment> getListItems() {
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
	 * @param newsType the new news type
	 */
	public void setNewsType(String newsType) {
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
	 * @param latestYear the new latest year
	 */
	public void setLatestYear(String latestYear) {
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
	 * @param numberOfTabs the new number of tabs
	 */
	public void setNumberOfTabs(String numberOfTabs) {
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
	 * @param previousText the new previous text
	 */
	public void setPreviousText(String previousText) {
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
	 * @param nextText the new next text
	 */
	public void setNextText(String nextText) {
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
	 * @param pageText the new page text
	 */
	public void setPageText(String pageText) {
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
	 * @param ofText the new of text
	 */
	public void setOfText(String ofText) {
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
	 * @param noNewsMessage the new no news message
	 */
	public void setNoNewsMessage(String noNewsMessage) {
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
	 * @param activeYear the new active year
	 */
	public void setActiveYear(int activeYear) {
		this.activeYear = activeYear;
	}

	/**
	 * Gets the years to show.
	 *
	 * @return the years to show
	 */
	public List<Integer> getYearsToShow() {
		return yearsToShow;
	}

	/**
	 * Sets the years to show.
	 *
	 * @param yearsToShow the new years to show
	 */
	public void setYearsToShow(List<Integer> yearsToShow) {
		this.yearsToShow = yearsToShow;
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
	 * @param requestURL the new request URL
	 */
	public void setRequestURL(String requestURL) {
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
	 * @param relativeURL the new relative URL
	 */
	public void setRelativeURL(String relativeURL) {
		this.relativeURL = relativeURL;
	}

	/**
	 * Inits the model.
	 */
	@PostConstruct
	private void initModel() {
		if (StringUtils.isEmpty(getParentPath())) {
			return;
		}
		final String[] selectors = request.getRequestPathInfo().getSelectors();
		ResourceResolver resourceResolver = null;
		try {
			setDateFormat(configService.getConfigValues("articleDateFormat", currentPage.getPath()));
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

			final Map<String, String> queryParameterMap = new HashMap<>();
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
				final Iterator<Resource> resourceIterator = searchResult.getResources();
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
			String path = currentPage.getPath();
			path = path.replace(configService.getConfigValues("siteUrl", path), "");
			if ("2".equals(newsType)) {
				 path = currentPage.getPath();
				processReleasesData();
				if (selectors.length > 0) {
					path = path + JCR_SLASH + selectors[0];
				} else {
					path = path + JCR_SLASH + activeYear;
				}
			}
			setPagination(new Pagination(request, getMaxItems(), getTotalMatch(), path));
			setPageUrl(path);
		} catch (IOException | ApplicationException | SystemException | LoginException | RepositoryException e) {
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
	 *            the selectors
	 * @param queryParameterMap
	 *            the query parameter map
	 */
	private void setQueryParameterMap(final String[] selectors, Map<String, String> queryParameterMap) {
		int offset = 0;
		int limit = getMaxItems();
		int year = latestYear == null ? Calendar.getInstance().get(Calendar.YEAR) : Integer.parseInt(latestYear);
		String completePath;
		if ("1".equals(newsType)) {
			completePath = getParentPath();
		} else {
			completePath = selectors.length == 0 ? getParentPath() + JCR_SLASH + year : getParentPath() + JCR_SLASH + selectors[0];
		}
		if (selectors.length > 1) {
			setPageNum(Integer.parseInt(selectors[1]));
			offset = (getPageNum() - 1) * getMaxItems(); // Pagination
		}
		queryParameterMap.put("path", completePath);
		queryParameterMap.put("type", com.day.cq.dam.api.DamConstants.NT_DAM_ASSET);
		queryParameterMap.put("p.limit", Integer.toString(limit));
		queryParameterMap.put("p.offset", Integer.toString(offset));
		queryParameterMap.put("1_property", JcrConstants.JCR_CONTENT + "/data/cq:model");
		queryParameterMap.put("1_property.value", "/conf/sunlife-apac/settings/dam/cfm/models/newsroom-model");
		queryParameterMap.put("orderby", "@" + JcrConstants.JCR_CONTENT + "/data/master/articlePublishedDate");
		queryParameterMap.put("orderby.sort", "desc");

	}

	/**
	 * Process releases data.
	 *
	 * @throws IOException Signals that an I/O exception has occurred.
	 * @throws ApplicationException the application exception
	 * @throws SystemException the system exception
	 * @throws LoginException the login exception
	 * @throws RepositoryException the repository exception
	 */
	public void processReleasesData()
			throws IOException, ApplicationException, SystemException, LoginException, RepositoryException {

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
		LOGGER.debug("downYear: {}, totalNoYears: {}", downYear, totalNoYears);
		yearsToShow = new ArrayList<>();
		for (int i = 0; i < totalNoYears; i++) {
			yearsToShow.add(downYear--);
		}
		LOGGER.debug("yearsToShow :: {}", yearsToShow);

		activeYear = year;

		final String[] selectors = request.getRequestPathInfo().getSelectors();
		if (selectors.length > 0) {
			strYear = selectors[0]; // Year - Selector
			if (selectors.length > 1) {
				pageNum = selectors[1]; // Page number - Selector
			}
		}
		LOGGER.debug("Fetched params  pageNum: {}, strYear: {}", pageNum, strYear);

		if (null != strYear && !"".equals(strYear) && !"html".equals(strYear)) {
			activeYear = Integer.parseInt(strYear);
		}
		LOGGER.debug("activeYear :: {}", activeYear);

		final String uri = request.getRequestURI();
		LOGGER.debug("uri: {}", uri);
		relativeURL = uri.contains(".") ? uri.substring(0, uri.indexOf('.')) : uri;
		requestURL = uri.contains(".") ? uri.substring(0, uri.lastIndexOf('.')) : uri;
		LOGGER.debug("relativeURL: {}, requestURL: {}", relativeURL, requestURL);
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
		LOGGER.debug("requestURL - after clean up: {}", requestURL);
	}

	/**
	 * Generates shorten url.
	 *
	 * @param pagePath
	 *            the page path
	 * @param siteUrl
	 *            the site url
	 * @return shortened url
	 */
	public String shortenURL(final String pagePath, final String siteUrl) {
		if (null == siteUrl) {
			return null;
		}
		return pagePath.replace(siteUrl.substring(0, siteUrl.lastIndexOf(BasePageModelConstants.SLASH_CONSTANT)), "");
	}
}
