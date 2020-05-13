/*
 *
 */

package ca.sunlife.web.cms.core.beans;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * The Class Release.
 *
 * @author TCS
 * @version 1.0
 */
@ JsonIgnoreProperties (ignoreUnknown = true)
public class Release {

  /** The id. */
  private String id;

  /** The headline. */
  private String headline;

  /** The release date. */
  private String releaseDate;

  /** The summary. */
  private String summary;

  /** The body. */
  private String body;

  /** The headline url. */
  private String headlineUrl;

  /**
   * Gets the id.
   *
   * @return the id
   */
  public String getId() {
    return id;
  }

  /**
   * Sets the id.
   *
   * @param id
   *          the new id
   */
  public void setId(final String id) {
    this.id = id;
  }

  /**
   * Gets the headline.
   *
   * @return the headline
   */
  public String getHeadline() {
    return headline;
  }

  /**
   * Sets the headline.
   *
   * @param headline
   *          the new headline
   */
  public void setHeadline(final String headline) {
    this.headline = headline;
  }

  /**
   * Gets the release date.
   *
   * @return the release date
   */
  public String getReleaseDate() {
    return releaseDate;
  }

  /**
   * Sets the release date.
   *
   * @param releaseDate
   *          the new release date
   */
  public void setReleaseDate(final String releaseDate) {
    this.releaseDate = releaseDate;
  }

  /**
   * Gets the summary.
   *
   * @return the summary
   */
  public String getSummary() {
    return summary;
  }

  /**
   * Sets the summary.
   *
   * @param summary
   *          the new summary
   */
  public void setSummary(final String summary) {
    this.summary = summary;
  }

  /**
   * Gets the body.
   *
   * @return the body
   */
  public String getBody() {
    return body;
  }

  /**
   * Sets the body.
   *
   * @param body
   *          the new body
   */
  public void setBody(final String body) {
    this.body = body;
  }

  /**
   * Gets the headline url.
   *
   * @return the headline url
   */
  public String getHeadlineUrl() {
    return headlineUrl;
  }

  /**
   * Sets the headline url.
   *
   * @param headlineUrl
   *          the new headline url
   */
  public void setHeadlineUrl(final String headlineUrl) {
    this.headlineUrl = headlineUrl;
  }

}
