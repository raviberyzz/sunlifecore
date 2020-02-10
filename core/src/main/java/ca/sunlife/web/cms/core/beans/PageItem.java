/**
 * 
 */
package ca.sunlife.web.cms.core.beans;

/**
 * @author mo92 
 * The Class PageItem
 */
public class PageItem {

	/**
	 * anchor tag link - href
	 */
	private String href;
	/**
	 * li index
	 */
	private int index;
	/**
	 * ellipsis - ... for pagination
	 */
	private boolean ellipsis;
	
	/**
	 * @return the href
	 */
	public String getHref() {
		return href;
	}

	/**
	 * @param href
	 *            the href to set
	 */
	public void setHref(String href) {
		this.href = href;
	}

	/**
	 * @return the index
	 */
	public int getIndex() {
		return index;
	}

	/**
	 * @param index
	 *            the index to set
	 */
	public void setIndex(int index) {
		this.index = index;
	}

	/**
	 * @return the ellipsis
	 */
	public boolean isEllipsis() {
		return ellipsis;
	}

	/**
	 * @param ellipsis the ellipsis to set
	 */
	public void setEllipsis(boolean ellipsis) {
		this.ellipsis = ellipsis;
	}

}
