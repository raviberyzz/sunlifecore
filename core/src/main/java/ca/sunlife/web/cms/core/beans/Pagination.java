/**
 *
 */
package ca.sunlife.web.cms.core.beans;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ca.sunlife.web.cms.core.constants.BasePageModelConstants;

/**
 * The Class Pagination.
 *
 * @author TCS
 * @version 1.0
 */
public class Pagination {

	/** The Constant logger. */
	private static final Logger LOGGER = LoggerFactory.getLogger(Pagination.class);

	/** The prev page. */
	private int prevPage = 0;

	/** The cur page. */
	private int curPage = 1;

	/** The next page no. */
	private int nextPageNo;

	/** The total pages. */
	private int totalPages = 0;

	/** The page items. */
	private List<PageItem> pageItems;

	/** The rcord per page str. */
	private String rcordPerPageStr = "10"; // Default to 10 items per page

	/**
	 * Instantiates a new pagination.
	 */
	public Pagination() {
		super();
	}

	/**
	 * Instantiates a new pagination.
	 *
	 * @param prevPage
	 *          the prev page
	 * @param curPage
	 *          the cur page
	 * @param nextPageNo
	 *          the next page no
	 * @param totalPages
	 *          the total pages
	 * @param pageItems
	 *          the page items
	 */
	public Pagination(final int prevPage, final int curPage, final int nextPageNo, final int totalPages,
			final List<PageItem> pageItems) {
		super();
		this.prevPage = prevPage;
		this.curPage = curPage;
		this.nextPageNo = nextPageNo;
		this.totalPages = totalPages;
		this.pageItems = Collections.unmodifiableList(pageItems);
	}

	/**
	 * Gets the prev page.
	 *
	 * @return the prev page
	 */
	public int getPrevPage() {
		return prevPage;
	}

	/**
	 * Sets the prev page.
	 *
	 * @param prevPage
	 *          the new prev page
	 */
	public void setPrevPage(final int prevPage) {
		this.prevPage = prevPage;
	}

	/**
	 * Gets the cur page.
	 *
	 * @return the cur page
	 */
	public int getCurPage() {
		return curPage;
	}

	/**
	 * Sets the cur page.
	 *
	 * @param curPage
	 *          the new cur page
	 */
	public void setCurPage(final int curPage) {
		this.curPage = curPage;
	}

	/**
	 * Gets the next page no.
	 *
	 * @return the next page no
	 */
	public int getNextPageNo() {
		return nextPageNo;
	}

	/**
	 * Sets the next page no.
	 *
	 * @param nextPageNo
	 *          the new next page no
	 */
	public void setNextPageNo(final int nextPageNo) {
		this.nextPageNo = nextPageNo;
	}

	/**
	 * Gets the total pages.
	 *
	 * @return the total pages
	 */
	public int getTotalPages() {
		return totalPages;
	}

	/**
	 * Sets the total pages.
	 *
	 * @param totalPages
	 *          the new total pages
	 */
	public void setTotalPages(final int totalPages) {
		this.totalPages = totalPages;
	}

	/**
	 * Gets the page items.
	 *
	 * @return the page items
	 */
	public List<PageItem> getPageItems() {
		return Collections.unmodifiableList(pageItems);
	}

	/**
	 * Sets the page items.
	 *
	 * @param pageItems
	 *          the new page items
	 */
	public void setPageItems(final List<PageItem> pageItems) {
		this.pageItems = Collections.unmodifiableList(pageItems);
	}

	/**
	 * Gets the rcord per page str.
	 *
	 * @return the rcord per page str
	 */
	public String getRcordPerPageStr() {
		return rcordPerPageStr;
	}

	/**
	 * Sets the rcord per page str.
	 *
	 * @param rcordPerPageStr
	 *          the new rcord per page str
	 */
	public void setRcordPerPageStr(final String rcordPerPageStr) {
		this.rcordPerPageStr = rcordPerPageStr;
	}

	/**
	 * Instantiates a new pagination.
	 *
	 * @param request
	 *          the request
	 * @param pageSize
	 *          the page size
	 * @param total
	 *          the total
	 * @param pageUrl
	 *          the page url
	 */
	public Pagination(final SlingHttpServletRequest request, final int pageSize, final int total, final String pageUrl) {
		super();
		int pageNo = 1;
		final String[] selectors = request.getRequestPathInfo().getSelectors();
		String path = "";

		if (null != request.getResource()) {
			path = request.getResource().getPath();
		}

		if (selectors.length > 0 && StringUtils.isNumeric(selectors[selectors.length - 1])
				&& (!path.contains(BasePageModelConstants.SLFAS_PATH))) {
			pageNo = Integer.parseInt(selectors[selectors.length - 1]);
		}
		if (selectors.length > 0 && StringUtils.isNumeric(selectors[0])
				&& (path.contains(BasePageModelConstants.SLFAS_PATH))) {
			pageNo = Integer.parseInt(selectors[0]);
		}
		if (pageNo > 1) {
			prevPage = pageNo - 1;
		} else {
			prevPage = pageNo;
		}
		curPage = pageNo;
		if (totalPages < curPage) {
			nextPageNo = curPage + 1;
		}
		LOGGER.debug("Pagination :: curPage: {}, prevPage: {}, requestURL: {}", curPage, prevPage, pageUrl);
		final int firstBreakPt = 5;
		final int firstMinTotal = 6;
		int resultSize = 0;
		final String requestUrlStr = pageUrl;
		LOGGER.debug("***before pagination -  rcordPerPageStr={},  totalResults={}", pageSize, total);

		final int recordPerPage = pageSize;
		resultSize = total;
		final int mod = resultSize % recordPerPage;
		totalPages = resultSize / recordPerPage;
		if (mod > 0) {
			totalPages++;
		}
		LOGGER.debug("mod ={}, totalPages={}", Integer.valueOf(mod), Integer.valueOf(totalPages));

		final int secondBreakPt = totalPages - 4;
		pageItems = new ArrayList<>();
		final PageItem pageItemEllipsis = new PageItem();
		pageItemEllipsis.setEllipsis(true);

		if (curPage < firstBreakPt || totalPages <= firstMinTotal) {
			int maxFirst = firstBreakPt;
			if (totalPages < firstMinTotal + 1) {
				maxFirst = totalPages;
			}
			setInnerPageItems(2, maxFirst, requestUrlStr);
			if (totalPages > firstMinTotal) {
				pageItems.add(pageItemEllipsis);

				final PageItem pageItem = new PageItem();
				pageItem.setHref(requestUrlStr + String.valueOf(totalPages));
				pageItem.setIndex(totalPages);
				pageItems.add(pageItem);
			}
		} else if (curPage >= secondBreakPt) {
			pageItems.add(pageItemEllipsis);
			setInnerPageItems(secondBreakPt, totalPages, requestUrlStr);
		} else {
			pageItems.add(pageItemEllipsis);
			setInnerPageItems(curPage - 2, curPage + 2, requestUrlStr);
			pageItems.add(pageItemEllipsis);

			final PageItem pageItem = new PageItem();
			pageItem.setHref(requestUrlStr + String.valueOf(totalPages));
			pageItem.setIndex(totalPages);
			pageItems.add(pageItem);
		}
	}

	/**
	 * Sets the inner page items.
	 *
	 * @param startIndex
	 *          the start index
	 * @param endIndex
	 *          the end index
	 * @param requestUrlStr
	 *          the request url str
	 */
	public void setInnerPageItems(final int startIndex, final int endIndex, final String requestUrlStr) {
		for (int i = startIndex; i <= endIndex; i++) {
			final PageItem pageItem = new PageItem();
			pageItem.setHref(requestUrlStr + String.valueOf(i));
			pageItem.setIndex(i);
			pageItems.add(pageItem);
		}
	}

}
