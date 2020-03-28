package ca.sunlife.web.cms.core.beans;

import java.util.Collections;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * The Class NewsReleases.
 *
 * @author mo92 The Class NewsReleases
 */
public class NewsReleases {

  /** Matching count. */
  @ JsonProperty ("matching_count")
  private String matchingCount;

  /** Returned count. */
  @ JsonProperty ("returned_count")
  private String returnedCount;

  /** Release. */
  @ JsonFormat (with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
  private List <Release> release;

  /** Last modified. */
  private String latestModified;

  /**
   * Gets the matching count.
   *
   * @return the matchingCount
   */
  public String getMatchingCount() {
    return matchingCount;
  }

  /**
   * Sets the matching count.
   *
   * @param matchingCount
   *          the matchingCount to set
   */
  public void setMatchingCount(final String matchingCount) {
    this.matchingCount = matchingCount;
  }

  /**
   * Gets the returned count.
   *
   * @return the returnedCount
   */
  public String getReturnedCount() {
    return returnedCount;
  }

  /**
   * Sets the returned count.
   *
   * @param returnedCount
   *          the returnedCount to set
   */
  public void setReturnedCount(final String returnedCount) {
    this.returnedCount = returnedCount;
  }

  /**
   * Gets the release.
   *
   * @return the release
   */
  public List <Release> getRelease() {
    return Collections.unmodifiableList(release);
  }

  /**
   * Sets the release.
   *
   * @param release
   *          the release to set
   */
  public void setRelease(final List <Release> release) {
    this.release = Collections.unmodifiableList(release);
  }

  /**
   * Gets the latest modified.
   *
   * @return the latestModified
   */
  public String getLatestModified() {
    return latestModified;
  }

  /**
   * Sets the latest modified.
   *
   * @param latestModified
   *          the latestModified to set
   */
  public void setLatestModified(final String latestModified) {
    this.latestModified = latestModified;
  }

}
