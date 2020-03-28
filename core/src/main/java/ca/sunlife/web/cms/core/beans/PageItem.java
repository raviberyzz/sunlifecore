/**
 *
 */
package ca.sunlife.web.cms.core.beans;

/**
 * The Class PageItem.
 *
 * @author mo92 The Class PageItem
 */
public class PageItem {

  /** anchor tag link - href. */
  private String href;

  /** li index. */
  private int index;
  /**
   * ellipsis - ... for pagination
   */
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
   *          the href to set
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
   *          the index to set
   */
  public void setIndex(final int index) {
    this.index = index;
  }

  /**
   * Checks if is ellipsis.
   *
   * @return the ellipsis
   */
  public boolean isEllipsis() {
    return ellipsis;
  }

  /**
   * Sets the ellipsis.
   *
   * @param ellipsis
   *          the ellipsis to set
   */
  public void setEllipsis(final boolean ellipsis) {
    this.ellipsis = ellipsis;
  }

}
