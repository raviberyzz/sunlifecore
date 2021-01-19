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

	private String mPowerCode;
	private String lang;
	// productName fundName , planDate
	private Map<String, String> singleValueMap = new HashMap<>();
	// get the values from node simpleMappedValuesQuickFix
	private List<Guarantee> guarantees = new ArrayList<>();
	private List<AssetMix> assetMixes = new ArrayList<>();
	private List<Holding> holdings = new ArrayList<>();
	private List<PerformanceData> performanceData = new ArrayList<>();
	private List<String> reasonsToInvest = new ArrayList<>();
	private List<String> dscList = new ArrayList<>();
	private List<String> llscList = new ArrayList<>();

	private String totalPercentOfTop10Investments;
	private String numberOfYears;
	private String maxReturnYear;
	private String minReturnYear;

	boolean isFundLessThanOneYear;
	boolean isUnderlying;
	boolean isGuaranteeSeriesAvailable;
	boolean isyearByYearReturnAvailable;

	private boolean isfELLow = false;
	private boolean isFelFundClass = false;
	private boolean isDeferFundClass = false;
	private boolean isIOClass = false;

	private boolean lowRisk = false;
	private boolean lowMedRisk = false;
	private boolean medRisk = false;
	private boolean medHighRisk = false;
	private boolean highRisk = false;

	private boolean isReturnRate = false;
	private boolean isTraillingCommisionAvailable = true;
	private boolean isTunoverisNA = false;
	private boolean isSunGifSoln = true;
	private String ReturnCode;
	private String ReturnMsg;

	/**
	 * @return the mPowerCode
	 */
	public String getmPowerCode() {
		return mPowerCode;
	}

	/**
	 * @param mPowerCode
	 *          the mPowerCode to set
	 */
	public void setmPowerCode(String mPowerCode) {
		this.mPowerCode = mPowerCode;
	}

	/**
	 * @return the lang
	 */
	public String getLang() {
		return lang;
	}

	/**
	 * @param lang
	 *          the lang to set
	 */
	public void setLang(String lang) {
		this.lang = lang;
	}

	/**
	 * @return the singleValueMap
	 */
	public Map<String, String> getSingleValueMap() {
		return singleValueMap;
	}

	/**
	 * @param singleValueMap
	 *          the singleValueMap to set
	 */
	public void setSingleValueMap(Map<String, String> singleValueMap) {
		this.singleValueMap = singleValueMap;
	}

	/**
	 * @return the guarantees
	 */
	public List<Guarantee> getGuarantees() {
		return guarantees;
	}

	/**
	 * @param guarantees
	 *          the guarantees to set
	 */
	public void setGuarantees(List<Guarantee> guarantees) {
		this.guarantees = guarantees;
	}

	/**
	 * @return the assetMixes
	 */
	public List<AssetMix> getAssetMixes() {
		return assetMixes;
	}

	/**
	 * @param assetMixes
	 *          the assetMixes to set
	 */
	public void setAssetMixes(List<AssetMix> assetMixes) {
		this.assetMixes = assetMixes;
	}

	/**
	 * @return the holdings
	 */
	public List<Holding> getHoldings() {
		return holdings;
	}

	/**
	 * @param holdings
	 *          the holdings to set
	 */
	public void setHoldings(List<Holding> holdings) {
		this.holdings = holdings;
	}

	/**
	 * @return the performanceData
	 */
	public List<PerformanceData> getPerformanceData() {
		return performanceData;
	}

	/**
	 * @param performanceData
	 *          the performanceData to set
	 */
	public void setPerformanceData(List<PerformanceData> performanceData) {
		this.performanceData = performanceData;
	}

	/**
	 * @return the reasonsToInvest
	 */
	public List<String> getReasonsToInvest() {
		return reasonsToInvest;
	}

	/**
	 * @param reasonsToInvest
	 *          the reasonsToInvest to set
	 */
	public void setReasonsToInvest(List<String> reasonsToInvest) {
		this.reasonsToInvest = reasonsToInvest;
	}

	/**
	 * @return the dscList
	 */
	public List<String> getDscList() {
		return dscList;
	}

	/**
	 * @param dscList
	 *          the dscList to set
	 */
	public void setDscList(List<String> dscList) {
		this.dscList = dscList;
	}

	/**
	 * @return the llscList
	 */
	public List<String> getLlscList() {
		return llscList;
	}

	/**
	 * @param llscList
	 *          the llscList to set
	 */
	public void setLlscList(List<String> llscList) {
		this.llscList = llscList;
	}

	/**
	 * @return the totalPercentOfTop10Investments
	 */
	public String getTotalPercentOfTop10Investments() {
		return totalPercentOfTop10Investments;
	}

	/**
	 * @param totalPercentOfTop10Investments
	 *          the totalPercentOfTop10Investments to set
	 */
	public void setTotalPercentOfTop10Investments(String totalPercentOfTop10Investments) {
		this.totalPercentOfTop10Investments = totalPercentOfTop10Investments;
	}

	/**
	 * @return the numberOfYears
	 */
	public String getNumberOfYears() {
		return numberOfYears;
	}

	/**
	 * @param numberOfYears
	 *          the numberOfYears to set
	 */
	public void setNumberOfYears(String numberOfYears) {
		this.numberOfYears = numberOfYears;
	}

	/**
	 * @return the maxReturnYear
	 */
	public String getMaxReturnYear() {
		return maxReturnYear;
	}

	/**
	 * @param maxReturnYear
	 *          the maxReturnYear to set
	 */
	public void setMaxReturnYear(String maxReturnYear) {
		this.maxReturnYear = maxReturnYear;
	}

	/**
	 * @return the minReturnYear
	 */
	public String getMinReturnYear() {
		return minReturnYear;
	}

	/**
	 * @param minReturnYear
	 *          the minReturnYear to set
	 */
	public void setMinReturnYear(String minReturnYear) {
		this.minReturnYear = minReturnYear;
	}

	/**
	 * @return the isFundLessThanOneYear
	 */
	public boolean isFundLessThanOneYear() {
		return isFundLessThanOneYear;
	}

	/**
	 * @param isFundLessThanOneYear
	 *          the isFundLessThanOneYear to set
	 */
	public void setFundLessThanOneYear(boolean isFundLessThanOneYear) {
		this.isFundLessThanOneYear = isFundLessThanOneYear;
	}

	/**
	 * @return the isUnderlying
	 */
	public boolean isUnderlying() {
		return isUnderlying;
	}

	/**
	 * @param isUnderlying
	 *          the isUnderlying to set
	 */
	public void setUnderlying(boolean isUnderlying) {
		this.isUnderlying = isUnderlying;
	}

	/**
	 * @return the isGuaranteeSeriesAvailable
	 */
	public boolean isGuaranteeSeriesAvailable() {
		return isGuaranteeSeriesAvailable;
	}

	/**
	 * @param isGuaranteeSeriesAvailable
	 *          the isGuaranteeSeriesAvailable to set
	 */
	public void setGuaranteeSeriesAvailable(boolean isGuaranteeSeriesAvailable) {
		this.isGuaranteeSeriesAvailable = isGuaranteeSeriesAvailable;
	}

	/**
	 * @return the isyearByYearReturnAvailable
	 */
	public boolean isIsyearByYearReturnAvailable() {
		return isyearByYearReturnAvailable;
	}

	/**
	 * @param isyearByYearReturnAvailable
	 *          the isyearByYearReturnAvailable to set
	 */
	public void setIsyearByYearReturnAvailable(boolean isyearByYearReturnAvailable) {
		this.isyearByYearReturnAvailable = isyearByYearReturnAvailable;
	}

	/**
	 * @return the isfELLow
	 */
	public boolean isIsfELLow() {
		return isfELLow;
	}

	/**
	 * @param isfELLow
	 *          the isfELLow to set
	 */
	public void setIsfELLow(boolean isfELLow) {
		this.isfELLow = isfELLow;
	}

	/**
	 * @return the isFelFundClass
	 */
	public boolean isFelFundClass() {
		return isFelFundClass;
	}

	/**
	 * @param isFelFundClass
	 *          the isFelFundClass to set
	 */
	public void setFelFundClass(boolean isFelFundClass) {
		this.isFelFundClass = isFelFundClass;
	}

	/**
	 * @return the isDeferFundClass
	 */
	public boolean isDeferFundClass() {
		return isDeferFundClass;
	}

	/**
	 * @param isDeferFundClass
	 *          the isDeferFundClass to set
	 */
	public void setDeferFundClass(boolean isDeferFundClass) {
		this.isDeferFundClass = isDeferFundClass;
	}

	/**
	 * @return the isIOClass
	 */
	public boolean isIOClass() {
		return isIOClass;
	}

	/**
	 * @param isIOClass
	 *          the isIOClass to set
	 */
	public void setIOClass(boolean isIOClass) {
		this.isIOClass = isIOClass;
	}

	/**
	 * @return the lowRisk
	 */
	public boolean isLowRisk() {
		return lowRisk;
	}

	/**
	 * @param lowRisk
	 *          the lowRisk to set
	 */
	public void setLowRisk(boolean lowRisk) {
		this.lowRisk = lowRisk;
	}

	/**
	 * @return the lowMedRisk
	 */
	public boolean isLowMedRisk() {
		return lowMedRisk;
	}

	/**
	 * @param lowMedRisk
	 *          the lowMedRisk to set
	 */
	public void setLowMedRisk(boolean lowMedRisk) {
		this.lowMedRisk = lowMedRisk;
	}

	/**
	 * @return the medRisk
	 */
	public boolean isMedRisk() {
		return medRisk;
	}

	/**
	 * @param medRisk
	 *          the medRisk to set
	 */
	public void setMedRisk(boolean medRisk) {
		this.medRisk = medRisk;
	}

	/**
	 * @return the medHighRisk
	 */
	public boolean isMedHighRisk() {
		return medHighRisk;
	}

	/**
	 * @param medHighRisk
	 *          the medHighRisk to set
	 */
	public void setMedHighRisk(boolean medHighRisk) {
		this.medHighRisk = medHighRisk;
	}

	/**
	 * @return the highRisk
	 */
	public boolean isHighRisk() {
		return highRisk;
	}

	/**
	 * @param highRisk
	 *          the highRisk to set
	 */
	public void setHighRisk(boolean highRisk) {
		this.highRisk = highRisk;
	}

	/**
	 * @return the isReturnRate
	 */
	public boolean isReturnRate() {
		return isReturnRate;
	}

	/**
	 * @param isReturnRate
	 *          the isReturnRate to set
	 */
	public void setReturnRate(boolean isReturnRate) {
		this.isReturnRate = isReturnRate;
	}

	/**
	 * @return the isTraillingCommisionAvailable
	 */
	public boolean isTraillingCommisionAvailable() {
		return isTraillingCommisionAvailable;
	}

	/**
	 * @param isTraillingCommisionAvailable
	 *          the isTraillingCommisionAvailable to set
	 */
	public void setTraillingCommisionAvailable(boolean isTraillingCommisionAvailable) {
		this.isTraillingCommisionAvailable = isTraillingCommisionAvailable;
	}

	/**
	 * @return the isTunoverisNA
	 */
	public boolean isTunoverisNA() {
		return isTunoverisNA;
	}

	/**
	 * @param isTunoverisNA
	 *          the isTunoverisNA to set
	 */
	public void setTunoverisNA(boolean isTunoverisNA) {
		this.isTunoverisNA = isTunoverisNA;
	}

	/**
	 * @return the isSunGifSoln
	 */
	public boolean isSunGifSoln() {
		return isSunGifSoln;
	}

	/**
	 * @param isSunGifSoln
	 *          the isSunGifSoln to set
	 */
	public void setSunGifSoln(boolean isSunGifSoln) {
		this.isSunGifSoln = isSunGifSoln;
	}

	/**
	 * @return the returnCode
	 */
	public String getReturnCode() {
		return ReturnCode;
	}

	/**
	 * @param returnCode
	 *          the returnCode to set
	 */
	public void setReturnCode(String returnCode) {
		ReturnCode = returnCode;
	}

	/**
	 * @return the returnMsg
	 */
	public String getReturnMsg() {
		return ReturnMsg;
	}

	/**
	 * @param returnMsg
	 *          the returnMsg to set
	 */
	public void setReturnMsg(String returnMsg) {
		ReturnMsg = returnMsg;
	}

}
