/*
 *
 */

package ca.sunlife.web.cms.core.beans;

import java.util.Collections;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * The Class NewsReleases.
 *
 * @author TCS
 * @version 1.0
 */
public class NewsReleases {

  /** The matching count. */
  @ JsonProperty ("matching_count")
  private String matchingCount;

  /** The returned count. */
  @ JsonProperty ("returned_count")
  private String returnedCount;

  /** The release. */
  @ JsonFormat (with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
  private List <Release> release;

  /** The latest modified. */
  private String latestModified;

  /**
   * Gets the matching count.
   *
   * @return the matching count
   */
  public String getMatchingCount() {
    return matchingCount;
  }

  /**
   * Sets the matching count.
   *
   * @param matchingCount
   *          the new matching count
   */
  public void setMatchingCount(final String matchingCount) {
    this.matchingCount = matchingCount;
  }

  /**
   * Gets the returned count.
   *
   * @return the returned count
   */
  public String getReturnedCount() {
    return returnedCount;
  }

  /**
   * Sets the returned count.
   *
   * @param returnedCount
   *          the new returned count
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
   *          the new release
   */
  public void setRelease(final List <Release> release) {
    this.release = Collections.unmodifiableList(release);
  }

  /**
   * Gets the latest modified.
   *
   * @return the latest modified
   */
  public String getLatestModified() {
    return latestModified;
  }

  /**
   * Sets the latest modified.
   *
   * @param latestModified
   *          the new latest modified
   */
  public void setLatestModified(final String latestModified) {
    this.latestModified = latestModified;
  }

}
