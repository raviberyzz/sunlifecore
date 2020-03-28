package ca.sunlife.web.cms.core.beans;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * The Class Release.
 */
@ JsonIgnoreProperties (ignoreUnknown = true)
public class Release {

  /** Release id. */
  private String id;

  /** headline. */
  private String headline;

  /** releaseDate. */
  private String releaseDate;

  /** summary. */
  private String summary;

  /** body. */
  private String body;

  /** headlineUrl. */
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
   *          the id to set
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
   *          the headline to set
   */
  public void setHeadline(final String headline) {
    this.headline = headline;
  }

  /**
   * Gets the release date.
   *
   * @return the releaseDate
   */
  public String getReleaseDate() {
    return releaseDate;
  }

  /**
   * Sets the release date.
   *
   * @param releaseDate
   *          the releaseDate to set
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
   *          the summary to set
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
   *          the body to set
   */
  public void setBody(final String body) {
    this.body = body;
  }

  /**
   * Gets the headline url.
   *
   * @return the headlineUrl
   */
  public String getHeadlineUrl() {
    return headlineUrl;
  }

  /**
   * Sets the headline url.
   *
   * @param headlineUrl
   *          the headlineUrl to set
   */
  public void setHeadlineUrl(final String headlineUrl) {
    this.headlineUrl = headlineUrl;
  }

}
