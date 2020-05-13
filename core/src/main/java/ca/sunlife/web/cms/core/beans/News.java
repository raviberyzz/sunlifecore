/**
 *
 */
package ca.sunlife.web.cms.core.beans;

/**
 * The Class News.
 *
 * @author TCS
 * @version 1.0
 */
public class News {

  /** The release main. */
  private ReleaseMain releaseMain;

  /** The pagination. */
  private Pagination pagination;

  /**
   * Gets the release main.
   *
   * @return the release main
   */
  public ReleaseMain getReleaseMain() {
    return releaseMain;
  }

  /**
   * Sets the release main.
   *
   * @param releaseMain
   *          the new release main
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
   *          the new pagination
   */
  public void setPagination(final Pagination pagination) {
    this.pagination = pagination;
  }

}
