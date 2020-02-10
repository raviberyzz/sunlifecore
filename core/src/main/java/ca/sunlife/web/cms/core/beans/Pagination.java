/**
 * 
 */
package ca.sunlife.web.cms.core.beans;

import java.util.List;

/**
 * @author mo92
 * The calss Pagination.
 */
public class Pagination {

	/** prevPage */
	private int prevPage = 0;

	/** curPage */
	private int curPage = 1;

	/** Next page no. */
	private int nextPageNo;
	
	/** total pages */
	private int totalPages = 0;
	
	/** page items - li */
	private List<PageItem> pageItems;
	
	/** rcordPerPageStr */
	private String rcordPerPageStr = "10"; // Default to 10 items per page

	/**
	 * @param prevPage
	 * @param curPage
	 * @param nextPageNo
	 * @param totalPages
	 * @param pageItems
	 */
	public Pagination(int prevPage, int curPage, int nextPageNo, int totalPages, List<PageItem> pageItems) {
		super();
		this.prevPage = prevPage;
		this.curPage = curPage;
		this.nextPageNo = nextPageNo;
		this.totalPages = totalPages;
		this.pageItems = pageItems;
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
	 * @return the nextPageNo
	 */
	public int getNextPageNo() {
		return nextPageNo;
	}

	/**
	 * @param nextPageNo the nextPageNo to set
	 */
	public void setNextPageNo(int nextPageNo) {
		this.nextPageNo = nextPageNo;
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

}
