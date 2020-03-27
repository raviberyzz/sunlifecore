package ca.sunlife.web.cms.core.beans;

import java.util.Collections;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * @author mo92
 * The Class NewsReleases
 */
public class NewsReleases {

	/** Matching count */
	@JsonProperty("matching_count")
	private String matchingCount;

	/** Returned count */
	@JsonProperty("returned_count")
	private String returnedCount;

	/** Release */
	@JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
	private List<Release> release;

	/** Last modified */
	private String latestModified;

	/**
	 * @return the matchingCount
	 */
	public String getMatchingCount() {
		return matchingCount;
	}

	/**
	 * @param matchingCount
	 *            the matchingCount to set
	 */
	public void setMatchingCount(String matchingCount) {
		this.matchingCount = matchingCount;
	}

	/**
	 * @return the returnedCount
	 */
	public String getReturnedCount() {
		return returnedCount;
	}

	/**
	 * @param returnedCount
	 *            the returnedCount to set
	 */
	public void setReturnedCount(String returnedCount) {
		this.returnedCount = returnedCount;
	}

	/**
	 * @return the release
	 */
	public List<Release> getRelease() {
		return Collections.unmodifiableList(release);
	}

	/**
	 * @param release
	 *            the release to set
	 */
	public void setRelease(List<Release> release) {
		this.release = Collections.unmodifiableList(release);
	}

	/**
	 * @return the latestModified
	 */
	public String getLatestModified() {
		return latestModified;
	}

	/**
	 * @param latestModified
	 *            the latestModified to set
	 */
	public void setLatestModified(String latestModified) {
		this.latestModified = latestModified;
	}

}
