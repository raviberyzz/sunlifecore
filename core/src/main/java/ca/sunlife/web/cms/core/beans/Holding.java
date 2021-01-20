package ca.sunlife.web.cms.core.beans;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * The Class Guarantee.
 *
 * @author TCS
 * @version 1.0
 */
public class Holding {

	/** The holdingName. */
	protected String holdingName;
	
	/** The holdingPercentage. */
	@JsonProperty("investmentPercentage")
	protected String holdingPercentage;
	
	/** The subHoldingNames. */
	protected List<String> subHoldingNames;

	/**
	 * Gets the holdingName.
	 *
	 * @return the holdingName
	 */
	public String getHoldingName() {
		return holdingName;
	}

	/**
	 * Sets the holdingName.
	 *
	 * @param holdingName
	 */
	public void setHoldingName(String holdingName) {
		this.holdingName = holdingName;
	}

	/**
	 * Gets the holdingPercentage.
	 *
	 * @return the holdingPercentage
	 */
	public String getHoldingPercentage() {
		return holdingPercentage;
	}

	/**
	 * Sets the holdingPercentage.
	 *
	 * @param holdingPercentage
	 */
	public void setHoldingPercentage(String holdingPercentage) {
		this.holdingPercentage = holdingPercentage;
	}

	/**
	 * Gets the subHoldingNames.
	 *
	 * @return the subHoldingNames
	 */
	public List<String> getSubHoldingNames() {
		return subHoldingNames;
	}

	/**
	 * Sets the subHoldingNames.
	 *
	 * @param subHoldingNames
	 */
	public void setSubHoldingNames(List<String> subHoldingNames) {
		this.subHoldingNames = subHoldingNames;
	}

}
