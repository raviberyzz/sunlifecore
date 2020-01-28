package ca.sunlife.web.cms.core.beans;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class NewsReleases {

	@JsonProperty("matching_count")
	private String matchingCount;
	
	@JsonProperty("returned_count")
	private String returnedCount;

	private List<Release> release;

	/**
	 * @return the matchingCount
	 */
	public String getMatchingCount() {
		return matchingCount;
	}

	/**
	 * @param matchingCount the matchingCount to set
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
	 * @param returnedCount the returnedCount to set
	 */
	public void setReturnedCount(String returnedCount) {
		this.returnedCount = returnedCount;
	}

	/**
	 * @return the release
	 */
	public List<Release> getRelease() {
		return release;
	}

	/**
	 * @param release the release to set
	 */
	public void setRelease(List<Release> release) {
		this.release = release;
	}
	
}
