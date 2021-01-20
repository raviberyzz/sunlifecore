package ca.sunlife.web.cms.core.beans;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * The Class PerformanceData.
 *
 * @author TCS
 * @version 1.0
 */
public class PerformanceData {

	/** The returnYear. */
	@JsonProperty("year")
	protected String returnYear;
	
	/** The percentage. */
	protected String percentage;
	
	/** The colourCd. */
	protected String colourCd;

	/**
	 * Gets the returnYear.
	 *
	 * @return the returnYear
	 */
	public String getReturnYear() {
		return returnYear;
	}

	/**
	 * Sets the returnYear.
	 *
	 * @param returnYear
	 */
	public void setReturnYear(String returnYear) {
		this.returnYear = returnYear;
	}

	/**
	 * Gets the percentage.
	 *
	 * @return the percentage
	 */
	public String getPercentage() {
		return percentage;
	}

	/**
	 * Sets the percentage.
	 *
	 * @param percentage
	 */
	public void setPercentage(String percentage) {
		this.percentage = percentage;
	}

	/**
	 * Gets the colourCd.
	 *
	 * @return the colourCd
	 */
	public String getColourCd() {
		return colourCd;
	}

	/**
	 * Sets the colourCd.
	 *
	 * @param colourCd
	 */
	public void setColourCd(String colourCd) {
		this.colourCd = colourCd;
	}
	
}
