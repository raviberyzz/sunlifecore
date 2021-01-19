package ca.sunlife.web.cms.core.beans;

import java.util.List;

/**
 * The Class Guarantee.
 *
 * @author TCS
 * @version 1.0
 */
public class Holding {

	protected String holdingName;
	protected String holdingPercentage;
	protected List<String> subHoldingNames;

	/**
	 * @return the holdingName
	 */
	public String getHoldingName() {
		return holdingName;
	}

	/**
	 * @param holdingName
	 *          the holdingName to set
	 */
	public void setHoldingName(String holdingName) {
		this.holdingName = holdingName;
	}

	/**
	 * @return the holdingPercentage
	 */
	public String getHoldingPercentage() {
		return holdingPercentage;
	}

	/**
	 * @param holdingPercentage
	 *          the holdingPercentage to set
	 */
	public void setHoldingPercentage(String holdingPercentage) {
		this.holdingPercentage = holdingPercentage;
	}

	/**
	 * @return the subHoldingNames
	 */
	public List<String> getSubHoldingNames() {
		return subHoldingNames;
	}

	/**
	 * @param subHoldingNames
	 *          the subHoldingNames to set
	 */
	public void setSubHoldingNames(List<String> subHoldingNames) {
		this.subHoldingNames = subHoldingNames;
	}

}
