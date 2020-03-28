/**
 *
 */
package ca.sunlife.web.cms.core.beans;

/**
 * The Class News.
 *
 * @author mo92 the class News
 */
public class News {

  /** release - news. */
  private ReleaseMain releaseMain;

  /** pagination. */
  private Pagination pagination;

  /**
   * Gets the release main.
   *
   * @return the releaseMain
   */
  public ReleaseMain getReleaseMain() {
    return releaseMain;
  }

  /**
   * Sets the release main.
   *
   * @param releaseMain
   *          the releaseMain to set
   */
  public void setReleaseMain(final ReleaseMain releaseMain) {
    this.releaseMain = releaseMain;
  }

  /**
   * Gets the pagination.
   *
   * @return the pagination
   */
  public Pagination getPagination() {
    return pagination;
  }

  /**
   * Sets the pagination.
   *
   * @param pagination
   *          the pagination to set
   */
  public void setPagination(final Pagination pagination) {
    this.pagination = pagination;
  }

}
