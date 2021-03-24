package ca.sunlife.web.cms.core.beans;

/**
 * The Class PerformanceData.
 *
 * @author TCS
 * @version 1.0
 */
public class PerformanceData {

	/** The returnYear. */
	private String returnYear;
	
	/** The percentage. */
	private String percentage;
	
	/** The colourCd. */
	private String colourCd;

	/**
	 * Constructor for all fields.
	 *
	 * @param returnYear
	 * @param percentage
	 * @param colourCd
	 */
	public PerformanceData(String returnYear, String percentage, String colourCd) {
		super();
		this.returnYear = returnYear;
		this.percentage = percentage;
		this.colourCd = colourCd;
	}

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
