package ca.sunlife.web.cms.core.beans;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * The Class FundFactsData.
 *
 * @author TCS
 * @version 1.0
 */
public class FundFactsData {

	/** The mPowerCode. */
	private String mPowerCode;
	
	/** The lang. */
	private String lang;
	
	/** The singleValueMap. */
	@ JsonProperty("values")
	private Values singleValueMap;
	
	// get the values from node simpleMappedValuesQuickFix
	/** The guarantees. */
	private List<Guarantee> guarantees = new ArrayList<>();
	
	/** The assetMixes. */
	private List<AssetMix> assetMixes;
	
	/** The holdings. */
	private List<Holding> holdings;
	
	/** The performanceData. */
	private List<PerformanceData> performanceData;
	
	/** The reasonsToInvest. */
	private List<String> reasonsToInvest;
	
	/** The dscList. */
	private List<String> dscList;
	
	/** The llscList. */
	private List<String> llscList;
	
	/** The fundDataErrorsList. */
	private List<String> fundDataErrorsList;

	/** The totalPercentOfTop10Investments. */
	private String totalPercentOfTop10Investments;
	
	/** The numberOfYears. */
	private String numberOfYears;
	
	/** The maxReturnYear. */
	private String maxReturnYear;
	
	/** The minReturnYear. */
	private String minReturnYear;

	/** The fundLessThanOneYear. */
	private boolean fundLessThanOneYear;
	
	/** The underlying. */
	private boolean underlying;
	
	/** The guaranteeSeriesAvailable. */
	private boolean guaranteeSeriesAvailable;
	
	/** The yearByYearReturnAvailable. */
	private boolean yearByYearReturnAvailable;

	/** The isfELLow. */
	private boolean isfELLow;
	
	/** The isFelFundClass. */
	private boolean isFelFundClass;
	
	/** The isDeferFundClass. */
	private boolean isDeferFundClass;
	
	/** The isIOClass. */
	private boolean isIOClass;

	/** The lowRisk. */
	private boolean lowRisk;
	
	/** The lowMedRisk. */
	private boolean lowMedRisk;
	
	/** The medRisk. */
	private boolean medRisk;
	
	/** The medHighRisk. */
	private boolean medHighRisk;
	
	/** The highRisk. */
	private boolean highRisk;

	/** The returnRate. */
	@ JsonProperty("returnRateAvailable")
	private boolean returnRate;

	/** The traillingCommisionAvailable. */
	private boolean traillingCommisionAvailable;
	
	/** The tunoverisNA. */
	private boolean tunoverisNA;
	
	/** The sunGifSoln. */
	private boolean sunGifSoln;
	
	/** The salesChargesApplicable. */
	private boolean salesChargesApplicable;

	/** The returnCode. */
	@ JsonProperty("ReturnCode")
	private String returnCode;

	/** The returnMsg. */
	@ JsonProperty("ReturnMsg")
	private String returnMsg;

	/**
	 * Gets the mPowerCode.
	 *
	 * @return the mPowerCode
	 */
	public String getmPowerCode() {
		return mPowerCode;
	}

	/**
	 * Sets the mPowerCode.
	 *
	 * @param mPowerCode
	 */
	public void setmPowerCode(String mPowerCode) {
		this.mPowerCode = mPowerCode;
	}

	/**
	 * Gets the lang.
	 *
	 * @return the lang
	 */
	public String getLang() {
		return lang;
	}

	/**
	 * Sets the lang.
	 *
	 * @param lang
	 */
	public void setLang(String lang) {
		this.lang = lang;
	}

	/**
	 * Gets the singleValueMap.
	 *
	 * @return the singleValueMap
	 */
	public Values getSingleValueMap() {
		return singleValueMap;
	}

	/**
	 * Sets the singleValueMap.
	 *
	 * @param singleValueMap
	 */
	public void setSingleValueMap(Values singleValueMap) {
		this.singleValueMap = singleValueMap;
	}

	/**
	 * Gets the guarantees.
	 *
	 * @return the guarantees
	 */
	public List<Guarantee> getGuarantees() {
		return guarantees;
	}

	/**
	 * Sets the guarantees.
	 *
	 * @param guarantees
	 */
	public void setGuarantees(List<Guarantee> guarantees) {
		this.guarantees = guarantees;
	}

	/**
	 * Gets the assetMixes.
	 *
	 * @return the assetMixes
	 */
	public List<AssetMix> getAssetMixes() {
		return assetMixes;
	}

	/**
	 * Sets the assetMixes.
	 *
	 * @param assetMixes
	 */
	public void setAssetMixes(List<AssetMix> assetMixes) {
		this.assetMixes = assetMixes;
	}

	/**
	 * Gets the holdings.
	 *
	 * @return the holdings
	 */
	public List<Holding> getHoldings() {
		return holdings;
	}

	/**
	 * Sets the holdings.
	 *
	 * @param holdings
	 */
	public void setHoldings(List<Holding> holdings) {
		this.holdings = holdings;
	}

	/**
	 * Gets the performanceData.
	 *
	 * @return the performanceData
	 */
	public List<PerformanceData> getPerformanceData() {
		return performanceData;
	}

	/**
	 * Sets the performanceData.
	 *
	 * @param performanceData
	 */
	public void setPerformanceData(List<PerformanceData> performanceData) {
		this.performanceData = performanceData;
	}

	/**
	 * Gets the reasonsToInvest.
	 *
	 * @return the reasonsToInvest
	 */
	public List<String> getReasonsToInvest() {
		return reasonsToInvest;
	}

	/**
	 * Sets the reasonsToInvest.
	 *
	 * @param reasonsToInvest
	 */
	public void setReasonsToInvest(List<String> reasonsToInvest) {
		this.reasonsToInvest = reasonsToInvest;
	}

	/**
	 * Gets the dscList.
	 *
	 * @return the dscList
	 */
	public List<String> getDscList() {
		return dscList;
	}

	/**
	 * Sets the dscList.
	 *
	 * @param dscList
	 */
	public void setDscList(List<String> dscList) {
		this.dscList = dscList;
	}

	/**
	 * Gets the llscList.
	 *
	 * @return the llscList
	 */
	public List<String> getLlscList() {
		return llscList;
	}

	/**
	 * Sets the llscList.
	 *
	 * @param llscList
	 */
	public void setLlscList(List<String> llscList) {
		this.llscList = llscList;
	}

	/**
	 * Gets the fundDataErrorsList.
	 *
	 * @return the fundDataErrorsList
	 */
	public List<String> getFundDataErrorsList() {
		return fundDataErrorsList;
	}

	/**
	 * Sets the fundDataErrorsList.
	 *
	 * @param fundDataErrorsList
	 */
	public void setFundDataErrorsList(List<String> fundDataErrorsList) {
		this.fundDataErrorsList = fundDataErrorsList;
	}

	/**
	 * Gets the totalPercentOfTop10Investments.
	 *
	 * @return the totalPercentOfTop10Investments
	 */
	public String getTotalPercentOfTop10Investments() {
		return totalPercentOfTop10Investments;
	}

	/**
	 * Sets the totalPercentOfTop10Investments.
	 *
	 * @param totalPercentOfTop10Investments
	 */
	public void setTotalPercentOfTop10Investments(String totalPercentOfTop10Investments) {
		this.totalPercentOfTop10Investments = totalPercentOfTop10Investments;
	}

	/**
	 * Gets the numberOfYears.
	 *
	 * @return the numberOfYears
	 */
	public String getNumberOfYears() {
		return numberOfYears;
	}

	/**
	 * Sets the numberOfYears.
	 *
	 * @param numberOfYears
	 */
	public void setNumberOfYears(String numberOfYears) {
		this.numberOfYears = numberOfYears;
	}

	/**
	 * Gets the maxReturnYear.
	 *
	 * @return the maxReturnYear
	 */
	public String getMaxReturnYear() {
		return maxReturnYear;
	}

	/**
	 * Sets the maxReturnYear.
	 *
	 * @param maxReturnYear
	 */
	public void setMaxReturnYear(String maxReturnYear) {
		this.maxReturnYear = maxReturnYear;
	}

	/**
	 * Gets the minReturnYear.
	 *
	 * @return the minReturnYear
	 */
	public String getMinReturnYear() {
		return minReturnYear;
	}

	/**
	 * Sets the minReturnYear.
	 *
	 * @param minReturnYear
	 */
	public void setMinReturnYear(String minReturnYear) {
		this.minReturnYear = minReturnYear;
	}

	/**
	 * Gets the fundLessThanOneYear.
	 *
	 * @return the fundLessThanOneYear
	 */
	public boolean isFundLessThanOneYear() {
		return fundLessThanOneYear;
	}

	/**
	 * Sets the fundLessThanOneYear.
	 *
	 * @param fundLessThanOneYear
	 */
	public void setFundLessThanOneYear(boolean fundLessThanOneYear) {
		this.fundLessThanOneYear = fundLessThanOneYear;
	}

	/**
	 * Gets the underlying.
	 *
	 * @return the underlying
	 */
	public boolean isUnderlying() {
		return underlying;
	}

	/**
	 * Sets the underlying.
	 *
	 * @param underlying
	 */
	public void setUnderlying(boolean underlying) {
		this.underlying = underlying;
	}

	/**
	 * Gets the guaranteeSeriesAvailable.
	 *
	 * @return the guaranteeSeriesAvailable
	 */
	public boolean isGuaranteeSeriesAvailable() {
		return guaranteeSeriesAvailable;
	}

	/**
	 * Sets the guaranteeSeriesAvailable.
	 *
	 * @param guaranteeSeriesAvailable
	 */
	public void setGuaranteeSeriesAvailable(boolean guaranteeSeriesAvailable) {
		this.guaranteeSeriesAvailable = guaranteeSeriesAvailable;
	}

	/**
	 * Gets the yearByYearReturnAvailable.
	 *
	 * @return the yearByYearReturnAvailable
	 */
	public boolean isYearByYearReturnAvailable() {
		return yearByYearReturnAvailable;
	}

	/**
	 * Sets the yearByYearReturnAvailable.
	 *
	 * @param yearByYearReturnAvailable
	 */
	public void setYearByYearReturnAvailable(boolean yearByYearReturnAvailable) {
		this.yearByYearReturnAvailable = yearByYearReturnAvailable;
	}

	/**
	 * Gets the isfELLow.
	 *
	 * @return the isfELLow
	 */
	public boolean isIsfELLow() {
		return isfELLow;
	}

	/**
	 * Sets the isfELLow.
	 *
	 * @param isfELLow
	 */
	public void setIsfELLow(boolean isfELLow) {
		this.isfELLow = isfELLow;
	}

	/**
	 * Gets the isFelFundClass.
	 *
	 * @return the isFelFundClass
	 */
	public boolean isFelFundClass() {
		return isFelFundClass;
	}

	/**
	 * Sets the isFelFundClass.
	 *
	 * @param isFelFundClass
	 */
	public void setFelFundClass(boolean isFelFundClass) {
		this.isFelFundClass = isFelFundClass;
	}

	/**
	 * Gets the isDeferFundClass.
	 *
	 * @return the isDeferFundClass
	 */
	public boolean isDeferFundClass() {
		return isDeferFundClass;
	}

	/**
	 * Sets the isDeferFundClass.
	 *
	 * @param isDeferFundClass
	 */
	public void setDeferFundClass(boolean isDeferFundClass) {
		this.isDeferFundClass = isDeferFundClass;
	}

	/**
	 * Gets the isIOClass.
	 *
	 * @return the isIOClass
	 */
	public boolean isIOClass() {
		return isIOClass;
	}

	/**
	 * Sets the isIOClass.
	 *
	 * @param isIOClass
	 */
	public void setIOClass(boolean isIOClass) {
		this.isIOClass = isIOClass;
	}

	/**
	 * Gets the lowRisk.
	 *
	 * @return the lowRisk
	 */
	public boolean isLowRisk() {
		return lowRisk;
	}

	/**
	 * Sets the lowRisk.
	 *
	 * @param lowRisk
	 */
	public void setLowRisk(boolean lowRisk) {
		this.lowRisk = lowRisk;
	}

	/**
	 * Gets the lowMedRisk.
	 *
	 * @return the lowMedRisk
	 */
	public boolean isLowMedRisk() {
		return lowMedRisk;
	}

	/**
	 * Sets the lowMedRisk.
	 *
	 * @param lowMedRisk
	 */
	public void setLowMedRisk(boolean lowMedRisk) {
		this.lowMedRisk = lowMedRisk;
	}

	/**
	 * Gets the medRisk.
	 *
	 * @return the medRisk
	 */
	public boolean isMedRisk() {
		return medRisk;
	}

	/**
	 * Sets the medRisk.
	 *
	 * @param medRisk
	 */
	public void setMedRisk(boolean medRisk) {
		this.medRisk = medRisk;
	}

	/**
	 * Gets the medHighRisk.
	 *
	 * @return the medHighRisk
	 */
	public boolean isMedHighRisk() {
		return medHighRisk;
	}

	/**
	 * Sets the medHighRisk.
	 *
	 * @param medHighRisk
	 */
	public void setMedHighRisk(boolean medHighRisk) {
		this.medHighRisk = medHighRisk;
	}

	/**
	 * Gets the highRisk.
	 *
	 * @return the highRisk
	 */
	public boolean isHighRisk() {
		return highRisk;
	}

	/**
	 * Sets the highRisk.
	 *
	 * @param highRisk
	 */
	public void setHighRisk(boolean highRisk) {
		this.highRisk = highRisk;
	}

	/**
	 * Gets the returnRate.
	 *
	 * @return the returnRate
	 */
	public boolean isReturnRate() {
		return returnRate;
	}

	/**
	 * Sets the returnRate.
	 *
	 * @param returnRate
	 */
	public void setReturnRate(boolean returnRate) {
		this.returnRate = returnRate;
	}

	/**
	 * Gets the traillingCommisionAvailable.
	 *
	 * @return the traillingCommisionAvailable
	 */
	public boolean isTraillingCommisionAvailable() {
		return traillingCommisionAvailable;
	}

	/**
	 * Sets the traillingCommisionAvailable.
	 *
	 * @param traillingCommisionAvailable
	 */
	public void setTraillingCommisionAvailable(boolean traillingCommisionAvailable) {
		this.traillingCommisionAvailable = traillingCommisionAvailable;
	}

	/**
	 * Gets the tunoverisNA.
	 *
	 * @return the tunoverisNA
	 */
	public boolean isTunoverisNA() {
		return tunoverisNA;
	}

	/**
	 * Sets the tunoverisNA.
	 *
	 * @param tunoverisNA
	 */
	public void setTunoverisNA(boolean tunoverisNA) {
		this.tunoverisNA = tunoverisNA;
	}

	/**
	 * Gets the sunGifSoln.
	 *
	 * @return the sunGifSoln
	 */
	public boolean isSunGifSoln() {
		return sunGifSoln;
	}

	/**
	 * Sets the sunGifSoln.
	 *
	 * @param sunGifSoln
	 */
	public void setSunGifSoln(boolean sunGifSoln) {
		this.sunGifSoln = sunGifSoln;
	}

	/**
	 * Gets the salesChargesApplicable.
	 *
	 * @return the salesChargesApplicable
	 */
	public boolean isSalesChargesApplicable() {
		return salesChargesApplicable;
	}

	/**
	 * Sets the salesChargesApplicable.
	 *
	 * @param salesChargesApplicable
	 */
	public void setSalesChargesApplicable(boolean salesChargesApplicable) {
		this.salesChargesApplicable = salesChargesApplicable;
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
	 * Gets the returnMsg.
	 *
	 * @return the returnMsg
	 */
	public String getReturnMsg() {
		return returnMsg;
	}

	/**
	 * Sets the returnMsg.
	 *
	 * @param returnMsg
	 */
	public void setReturnMsg(String returnMsg) {
		this.returnMsg = returnMsg;
	}

}
