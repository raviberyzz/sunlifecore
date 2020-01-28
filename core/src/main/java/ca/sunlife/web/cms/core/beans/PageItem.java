/**
 * 
 */
package ca.sunlife.web.cms.core.beans;

/**
 * @author mo92
 *
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
	 * li Class
	 */
	private String liClass;
	/**
	 * @return the href
	 */
	public String getHref() {
		return href;
	}
	/**
	 * @param href the href to set
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
	 * @param index the index to set
	 */
	public void setIndex(int index) {
		this.index = index;
	}
	/**
	 * @return the liClass
	 */
	public String getLiClass() {
		return liClass;
	}
	/**
	 * @param liClass the liClass to set
	 */
	public void setLiClass(String liClass) {
		this.liClass = liClass;
	}
	
}
