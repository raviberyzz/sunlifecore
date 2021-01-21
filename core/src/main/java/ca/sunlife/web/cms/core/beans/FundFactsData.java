package ca.sunlife.web.cms.core.beans;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * The Class FundFactsData.
 *
 * @author TCS
 * @version 1.0
 */
public class FundFactsData {

	/** The mPowerCode. */
	String mPowerCode;
	
	/** The lang. */
	String lang;
	// productName fundName , planDate
	/** The singleValueMap. */
	Map<String, String> singleValueMap = new HashMap<>();
	// get the values from node simpleMappedValuesQuickFix
	/** The guarantees. */
	List<Guarantee> guarantees = new ArrayList<>();
	
	/** The assetMixes. */
	List<AssetMix> assetMixes = new ArrayList<>();
	
	/** The holdings. */
	List<Holding> holdings = new ArrayList<>();
	
	/** The performanceData. */
	List<PerformanceData> performanceData = new ArrayList<>();

	/** The reasonsToInvest. */
	List<String> reasonsToInvest = new ArrayList<>();
	
	/** The dscList. */
	List<String> dscList = new ArrayList<>();
	
	/** The llscList. */
	List<String> llscList = new ArrayList<>();

	/** The totalPercentOfTop10Investments. */
	public String totalPercentOfTop10Investments;
	
	/** The numberOfYears. */
	public String numberOfYears;
	
	/** The maxReturnYear. */
	public String maxReturnYear;
	
	/** The minReturnYear. */
	public String minReturnYear;

	/** The isFundLessThanOneYear. */
	boolean isFundLessThanOneYear;
	
	/** The isUnderlying. */
	boolean isUnderlying;
	
	/** The isGuaranteeSeriesAvailable. */
	boolean isGuaranteeSeriesAvailable;
	
	/** The isyearByYearReturnAvailable. */
	boolean isyearByYearReturnAvailable;

	/** The assetMixAvailable. */
	public boolean assetMixAvailable;
	
	/** The top10HoldingsAvailable. */
	public boolean top10HoldingsAvailable;

	/** The isfELLow. */
	public boolean isfELLow;
	
	/** The isFelFundClass. */
	public boolean isFelFundClass;
	
	/** The isDeferFundClass. */
	public boolean isDeferFundClass;
	
	/** The isIOClass. */
	public boolean isIOClass;

	/** The lowRisk. */
	public boolean lowRisk;
	
	/** The lowMedRisk. */
	public boolean lowMedRisk;
	
	/** The medRisk. */
	public boolean medRisk;
	
	/** The medHighRisk. */
	public boolean medHighRisk;
	
	/** The highRisk. */
	public boolean highRisk;

	/** The isReturnRate. */
	public boolean isReturnRate;
	
	/** The isTraillingCommisionAvailable. */
	public boolean isTraillingCommisionAvailable = true;
	
	/** The isTunoverisNA. */
	public boolean isTunoverisNA;
	
	/** The isSunGifSoln. */
	public boolean isSunGifSoln = true;
	
	/** The returnCode. */
	public String returnCode;
	
	/** The returnMsg. */
	public String returnMsg;

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
	public Map<String, String> getSingleValueMap() {
		return singleValueMap;
	}

	/**
	 * Sets the singleValueMap.
	 *
	 * @param singleValueMap
	 */
	public void setSingleValueMap(Map<String, String> singleValueMap) {
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
	 * Gets the isFundLessThanOneYear.
	 *
	 * @return the isFundLessThanOneYear
	 */
	public boolean isFundLessThanOneYear() {
		return isFundLessThanOneYear;
	}

	/**
	 * Sets the isFundLessThanOneYear.
	 *
	 * @param isFundLessThanOneYear
	 */
	public void setFundLessThanOneYear(boolean isFundLessThanOneYear) {
		this.isFundLessThanOneYear = isFundLessThanOneYear;
	}

	/**
	 * Gets the isUnderlying.
	 *
	 * @return the isUnderlying
	 */
	public boolean isUnderlying() {
		return isUnderlying;
	}

	/**
	 * Sets the isUnderlying.
	 *
	 * @param isUnderlying
	 */
	public void setUnderlying(boolean isUnderlying) {
		this.isUnderlying = isUnderlying;
	}

	/**
	 * Gets the isGuaranteeSeriesAvailable.
	 *
	 * @return the isGuaranteeSeriesAvailable
	 */
	public boolean isGuaranteeSeriesAvailable() {
		return isGuaranteeSeriesAvailable;
	}

	/**
	 * Sets the isGuaranteeSeriesAvailable.
	 *
	 * @param isGuaranteeSeriesAvailable
	 */
	public void setGuaranteeSeriesAvailable(boolean isGuaranteeSeriesAvailable) {
		this.isGuaranteeSeriesAvailable = isGuaranteeSeriesAvailable;
	}

	/**
	 * Gets the isyearByYearReturnAvailable.
	 *
	 * @return the isyearByYearReturnAvailable
	 */
	public boolean isIsyearByYearReturnAvailable() {
		return isyearByYearReturnAvailable;
	}

	/**
	 * Sets the isyearByYearReturnAvailable.
	 *
	 * @param isyearByYearReturnAvailable
	 */
	public void setIsyearByYearReturnAvailable(boolean isyearByYearReturnAvailable) {
		this.isyearByYearReturnAvailable = isyearByYearReturnAvailable;
	}

	/**
	 * Gets the assetMixAvailable.
	 *
	 * @return the assetMixAvailable
	 */
	public boolean isAssetMixAvailable() {
		return assetMixAvailable;
	}

	/**
	 * Sets the assetMixAvailable.
	 *
	 * @param assetMixAvailable
	 */
	public void setAssetMixAvailable(boolean assetMixAvailable) {
		this.assetMixAvailable = assetMixAvailable;
	}

	/**
	 * Gets the top10HoldingsAvailable.
	 *
	 * @return the top10HoldingsAvailable
	 */
	public boolean isTop10HoldingsAvailable() {
		return top10HoldingsAvailable;
	}

	/**
	 * Sets the top10HoldingsAvailable.
	 *
	 * @param top10HoldingsAvailable
	 */
	public void setTop10HoldingsAvailable(boolean top10HoldingsAvailable) {
		this.top10HoldingsAvailable = top10HoldingsAvailable;
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
	 * Gets the isReturnRate.
	 *
	 * @return the isReturnRate
	 */
	public boolean isReturnRate() {
		return isReturnRate;
	}

	/**
	 * Sets the isReturnRate.
	 *
	 * @param isReturnRate
	 */
	public void setReturnRate(boolean isReturnRate) {
		this.isReturnRate = isReturnRate;
	}

	/**
	 * Gets the isTraillingCommisionAvailable.
	 *
	 * @return the isTraillingCommisionAvailable
	 */
	public boolean isTraillingCommisionAvailable() {
		return isTraillingCommisionAvailable;
	}

	/**
	 * Sets the isTraillingCommisionAvailable.
	 *
	 * @param isTraillingCommisionAvailable
	 */
	public void setTraillingCommisionAvailable(boolean isTraillingCommisionAvailable) {
		this.isTraillingCommisionAvailable = isTraillingCommisionAvailable;
	}

	/**
	 * Gets the isTunoverisNA.
	 *
	 * @return the isTunoverisNA
	 */
	public boolean isTunoverisNA() {
		return isTunoverisNA;
	}

	/**
	 * Sets the isTunoverisNA.
	 *
	 * @param isTunoverisNA
	 */
	public void setTunoverisNA(boolean isTunoverisNA) {
		this.isTunoverisNA = isTunoverisNA;
	}

	/**
	 * Gets the isSunGifSoln.
	 *
	 * @return the isSunGifSoln
	 */
	public boolean isSunGifSoln() {
		return isSunGifSoln;
	}

	/**
	 * Sets the isSunGifSoln.
	 *
	 * @param isSunGifSoln
	 */
	public void setSunGifSoln(boolean isSunGifSoln) {
		this.isSunGifSoln = isSunGifSoln;
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
