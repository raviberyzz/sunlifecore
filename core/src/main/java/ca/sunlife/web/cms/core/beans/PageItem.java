/**
 *
 */
package ca.sunlife.web.cms.core.beans;

/**
 * The Class PageItem.
 *
 * @author TCS
 * @version 1.0
 */
public class PageItem {

  /** The href. */
  private String href;

  /** The index. */
  private int index;

  /** The ellipsis. */
  private boolean ellipsis;

  /**
   * Gets the href.
   *
   * @return the href
   */
  public String getHref() {
    return href;
  }

  /**
   * Sets the href.
   *
   * @param href
   *          the new href
   */
  public void setHref(final String href) {
    this.href = href;
  }

  /**
   * Gets the index.
   *
   * @return the index
   */
  public int getIndex() {
    return index;
  }

  /**
   * Sets the index.
   *
   * @param index
   *          the new index
   */
  public void setIndex(final int index) {
    this.index = index;
  }

  /**
   * Checks if is ellipsis.
   *
   * @return true, if is ellipsis
   */
  public boolean isEllipsis() {
    return ellipsis;
  }

  /**
   * Sets the ellipsis.
   *
   * @param ellipsis
   *          the new ellipsis
   */
  public void setEllipsis(final boolean ellipsis) {
    this.ellipsis = ellipsis;
  }

}
