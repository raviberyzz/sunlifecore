package ca.sunlife.web.cms.core.beans;

import java.util.ArrayList;
import java.util.Collections;
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
	private String mPowerCode;
	
	/** The lang. */
	private String lang;
	// productName fundName , planDate
	/** The singleValueMap. */
	private Map<String, String> singleValueMap = new HashMap<>();
	// get the values from node simpleMappedValuesQuickFix
	/** The guarantees. */
	private List<Guarantee> guarantees = new ArrayList<>();
	
	/** The assetMixes. */
	private List<AssetMix> assetMixes = new ArrayList<>();
	
	/** The holdings. */
	private List<Holding> holdings = new ArrayList<>();
	
	/** The performanceData. */
	private List<PerformanceData> performanceData = new ArrayList<>();

	/** The reasonsToInvest. */
	private List<String> reasonsToInvest = new ArrayList<>();
	
	/** The dscList. */
	private List<String> dscList = new ArrayList<>();
	
	/** The llscList. */
	private List<String> llscList = new ArrayList<>();

	/** The totalPercentOfTop10Investments. */
	private String totalPercentOfTop10Investments;
	
	/** The numberOfYears. */
	private String numberOfYears;
	
	/** The maxReturnYear. */
	private String maxReturnYear;
	
	/** The minReturnYear. */
	private String minReturnYear;

	/** The isFundLessThanOneYear. */
	private boolean isFundLessThanOneYear;
	
	/** The isUnderlying. */
	private boolean isUnderlying;
	
	/** The isGuaranteeSeriesAvailable. */
	private boolean isGuaranteeSeriesAvailable;
	
	/** The isyearByYearReturnAvailable. */
	private boolean isyearByYearReturnAvailable;

	/** The assetMixAvailable. */
	private boolean assetMixAvailable;
	
	/** The top10HoldingsAvailable. */
	private boolean top10HoldingsAvailable;

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

	/** The isReturnRate. */
	private boolean isReturnRate;
	
	/** The isTraillingCommisionAvailable. */
	private boolean isTraillingCommisionAvailable = true;
	
	/** The isTunoverisNA. */
	private boolean isTunoverisNA;
	
	/** The isSunGifSoln. */
	private boolean isSunGifSoln = true;
	
	/** The returnCode. */
	private String returnCode;
	
	/** The returnMsg. */
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
		return Collections.unmodifiableList(guarantees);
	}

	/**
	 * Sets the guarantees.
	 *
	 * @param guarantees
	 */
	public void setGuarantees(List<Guarantee> guarantees) {
		this.guarantees = Collections.unmodifiableList(guarantees);
	}

	/**
	 * Gets the assetMixes.
	 *
	 * @return the assetMixes
	 */
	public List<AssetMix> getAssetMixes() {
		return Collections.unmodifiableList(assetMixes);
	}

	/**
	 * Sets the assetMixes.
	 *
	 * @param assetMixes
	 */
	public void setAssetMixes(List<AssetMix> assetMixes) {
		this.assetMixes = Collections.unmodifiableList(assetMixes);
	}

	/**
	 * Gets the holdings.
	 *
	 * @return the holdings
	 */
	public List<Holding> getHoldings() {
		return Collections.unmodifiableList(holdings);
	}

	/**
	 * Sets the holdings.
	 *
	 * @param holdings
	 */
	public void setHoldings(List<Holding> holdings) {
		this.holdings = Collections.unmodifiableList(holdings);
	}

	/**
	 * Gets the performanceData.
	 *
	 * @return the performanceData
	 */
	public List<PerformanceData> getPerformanceData() {
		return Collections.unmodifiableList(performanceData);
	}

	/**
	 * Sets the performanceData.
	 *
	 * @param performanceData
	 */
	public void setPerformanceData(List<PerformanceData> performanceData) {
		this.performanceData = Collections.unmodifiableList(performanceData);
	}

	/**
	 * Gets the reasonsToInvest.
	 *
	 * @return the reasonsToInvest
	 */
	public List<String> getReasonsToInvest() {
		return Collections.unmodifiableList(reasonsToInvest);
	}

	/**
	 * Sets the reasonsToInvest.
	 *
	 * @param reasonsToInvest
	 */
	public void setReasonsToInvest(List<String> reasonsToInvest) {
		this.reasonsToInvest = Collections.unmodifiableList(reasonsToInvest);
	}

	/**
	 * Gets the dscList.
	 *
	 * @return the dscList
	 */
	public List<String> getDscList() {
		return Collections.unmodifiableList(dscList);
	}

	/**
	 * Sets the dscList.
	 *
	 * @param dscList
	 */
	public void setDscList(List<String> dscList) {
		this.dscList = Collections.unmodifiableList(dscList);
	}

	/**
	 * Gets the llscList.
	 *
	 * @return the llscList
	 */
	public List<String> getLlscList() {
		return Collections.unmodifiableList(llscList);
	}

	/**
	 * Sets the llscList.
	 *
	 * @param llscList
	 */
	public void setLlscList(List<String> llscList) {
		this.llscList = Collections.unmodifiableList(llscList);
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
