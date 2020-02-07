/**
 * 
 */
package ca.sunlife.web.cms.core.beans;

/**
 * @author mo92
 *
 */
public class News {

	/**
	 * release - news
	 */
	private ReleaseMain releaseMain;
	/**
	 * pagination
	 */
	private Pagination pagination;

	/**
	 * @return the releaseMain
	 */
	public ReleaseMain getReleaseMain() {
		return releaseMain;
	}

	/**
	 * @param releaseMain
	 *            the releaseMain to set
	 */
	public void setReleaseMain(ReleaseMain releaseMain) {
		this.releaseMain = releaseMain;
	}

	/**
	 * @return the pagination
	 */
	public Pagination getPagination() {
		return pagination;
	}

	/**
	 * @param pagination
	 *            the pagination to set
	 */
	public void setPagination(Pagination pagination) {
		this.pagination = pagination;
	}

}
