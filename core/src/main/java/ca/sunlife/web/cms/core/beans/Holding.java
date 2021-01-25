package ca.sunlife.web.cms.core.beans;

import java.util.List;

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
	protected String holdingPercentage;
	
	/** The subHoldingNames. */
	protected List<String> subHoldingNames;

	/**
	 * Constructor for this class.
	 * @param holdingName
	 * @param holdingPercentage
	 * @param subHoldingNames
	 */
	public Holding(String holdingName, String holdingPercentage, List<String> subHoldingNames) {
		super();
		this.holdingName = holdingName;
		this.holdingPercentage = holdingPercentage;
		this.subHoldingNames = subHoldingNames;
	}

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
