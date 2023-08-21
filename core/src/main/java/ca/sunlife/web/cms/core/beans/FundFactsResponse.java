package ca.sunlife.web.cms.core.beans;

/**
 * The Class FundFactsResponse.
 *
 * @author TCS
 * @version 1.0
 */
public class FundFactsResponse {

	/** The fundFactsData. */
	private FundFactsData fundFactsData;

	/** The returnCode. */
	private String returnCode;

	/** The returnMessage. */
	private String returnMessage;

	/**
	 * Gets the fundFactsData.
	 *
	 * @return the fundFactsData
	 */
	public FundFactsData getFundFactsData() {
		return fundFactsData;
	}

	/**
	 * Sets the fundFactsData.
	 *
	 * @param fundFactsData
	 */
	public void setFundFactsData(FundFactsData fundFactsData) {
		this.fundFactsData = fundFactsData;
	}

	/**
	 * Gets the returnCode.
	 *
	 * @return the returnCode
	 */
	public String getReturnCode() {
		return returnCode;
	}

	/**
	 * Sets the returnCode.
	 *
	 * @param returnCode
	 */
	public void setReturnCode(String returnCode) {
		this.returnCode = returnCode;
	}

	/**
	 * Gets the returnMessage.
	 *
	 * @return the returnMessage
	 */
	public String getReturnMessage() {
		return returnMessage;
	}

	/**
	 * Sets the returnMessage.
	 *
	 * @param returnMessage
	 */
	public void setReturnMessage(String returnMessage) {
		this.returnMessage = returnMessage;
	}

}
