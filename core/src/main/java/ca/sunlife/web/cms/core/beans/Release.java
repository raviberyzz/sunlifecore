package ca.sunlife.web.cms.core.beans;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
/**
 * The Class Release.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Release {
	/**
	 * Release id
	 */
	private String id;
	/**
	 * headline
	 */
	private String headline;
	/**
	 * releaseDate
	 */
	private String releaseDate;
	/**
	 * summary
	 */
	private String summary;
	/**
	 * body
	 */
	private String body;
	/** 
	 * headlineUrl
	 */
	private String headlineUrl;
	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}
	/**
	 * @return the headline
	 */
	public String getHeadline() {
		return headline;
	}
	/**
	 * @param headline the headline to set
	 */
	public void setHeadline(String headline) {
		this.headline = headline;
	}
	/**
	 * @return the releaseDate
	 */
	public String getReleaseDate() {
		return releaseDate;
	}
	/**
	 * @param releaseDate the releaseDate to set
	 */
	public void setReleaseDate(String releaseDate) {
		this.releaseDate = releaseDate;
	}
	/**
	 * @return the summary
	 */
	public String getSummary() {
		return summary;
	}
	/**
	 * @param summary the summary to set
	 */
	public void setSummary(String summary) {
		this.summary = summary;
	}
	/**
	 * @return the body
	 */
	public String getBody() {
		return body;
	}
	/**
	 * @param body the body to set
	 */
	public void setBody(String body) {
		this.body = body;
	}
	/**
	 * @return the headlineUrl
	 */
	public String getHeadlineUrl() {
		return headlineUrl;
	}
	/**
	 * @param headlineUrl the headlineUrl to set
	 */
	public void setHeadlineUrl(String headlineUrl) {
		this.headlineUrl = headlineUrl;
	}
	
}
