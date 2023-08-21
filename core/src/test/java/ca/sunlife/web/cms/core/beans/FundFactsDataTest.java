package ca.sunlife.web.cms.core.beans;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ ExtendWith (AemContextExtension.class)
public class FundFactsDataTest {

	FundFactsData fundFactsData;
	
	@BeforeEach
	void setUp() {
		fundFactsData = new FundFactsData();
	}
	
	@Test
	public void testSetmPowerCode() {
		fundFactsData.setmPowerCode("PC");
		assertEquals(fundFactsData.getmPowerCode(), "PC");
	}
	
	@Test
	public void testSetLang() {
		fundFactsData.setLang("EN");
		assertEquals(fundFactsData.getLang(), "EN");
	}
	
	@Test
	public void testSetSingleValueMap() {
		Map<String, String> singleValueMap = new HashMap<String, String>();
		singleValueMap.put("testkey", "testval");
		fundFactsData.setSingleValueMap(singleValueMap);
		assertNotNull(fundFactsData.getSingleValueMap());
	}
	
	@Test
	public void testSetGuarantees() {
		List<Guarantee> guarantees = new ArrayList<Guarantee>();
		Guarantee guarantee = new Guarantee("test", "test", "test", "test", "test");
		guarantees.add(guarantee);
		fundFactsData.setGuarantees(guarantees);
		assertNotNull(fundFactsData.getGuarantees());
	}
	
	@Test
	public void testSetAssetMixes() {
		List<AssetMix> assetMixes = new ArrayList<AssetMix>();
		AssetMix assetMix = new AssetMix("test", "test", "test");
		assetMixes.add(assetMix);
		fundFactsData.setAssetMixes(assetMixes);
		assertNotNull(fundFactsData.getAssetMixes());
	}
	
	@Test
	public void testSetHoldings() {
		List<Holding> holdings = new ArrayList<Holding>();
		List<String> subHoldingNames = new ArrayList<String>();
		Holding holding = new Holding("test", "test", subHoldingNames);
		holdings.add(holding);
		fundFactsData.setHoldings(holdings);
		assertNotNull(fundFactsData.getHoldings());
	}
	
	@Test
	public void testSetPerformanceData() {
		List<PerformanceData> performanceDataList = new ArrayList<PerformanceData>();
		PerformanceData performanceData = new PerformanceData("test", "test", "test");
		performanceDataList.add(performanceData);
		fundFactsData.setPerformanceData(performanceDataList);
		assertNotNull(fundFactsData.getPerformanceData());
	}
	
	@Test
	public void testSetReasonsToInvest() {
		List<String> reasonsToInvest = new ArrayList<String>();
		reasonsToInvest.add("test");
		fundFactsData.setReasonsToInvest(reasonsToInvest);
		assertNotNull(fundFactsData.getReasonsToInvest());
	}
	
	@Test
	public void testSetDscList() {
		List<String> dscList = new ArrayList<String>();
		dscList.add("testDescription");
		fundFactsData.setDscList(dscList);
		assertNotNull(fundFactsData.getDscList());
	}
	
	@Test
	public void testSetLlscList() {
		List<String> llscList = new ArrayList<String>();
		llscList.add("test");
		fundFactsData.setLlscList(llscList);
		assertNotNull(fundFactsData.getLlscList());
	}
	
	@Test
	public void testSetNumberOfYears() {
		fundFactsData.setNumberOfYears("5");
		assertNotNull(fundFactsData.getNumberOfYears());
	}
	
	@Test
	public void testSetTotalPercentOfTop10Investments() {
		fundFactsData.setTotalPercentOfTop10Investments("80");
		assertNotNull(fundFactsData.getTotalPercentOfTop10Investments());
	}
	
	@Test
	public void testSetMaxReturnYear() {
		fundFactsData.setMaxReturnYear("6");
		assertNotNull(fundFactsData.getMaxReturnYear());
	}
	
	@Test
	public void testSetMinReturnYear() {
		fundFactsData.setMinReturnYear("10");
		assertNotNull(fundFactsData.getMinReturnYear());
	}
	
	@Test
	public void testSetFundLessThanOneYear() {
		fundFactsData.setFundLessThanOneYear(true);
		assertTrue(fundFactsData.isFundLessThanOneYear());
	}
	
	@Test
	public void testSetUnderlying() {
		fundFactsData.setUnderlying(true);
		assertTrue(fundFactsData.isUnderlying());
	}
	
	@Test
	public void testSetGuaranteeSeriesAvailable() {
		fundFactsData.setGuaranteeSeriesAvailable(false);
		assertFalse(fundFactsData.isGuaranteeSeriesAvailable());
	}
	
	@Test
	public void testSetIsyearByYearReturnAvailable() {
		fundFactsData.setIsyearByYearReturnAvailable(true);
		assertTrue(fundFactsData.isIsyearByYearReturnAvailable());
	}
	
	@Test
	public void testSetTop10HoldingsAvailable() {
		fundFactsData.setTop10HoldingsAvailable(true);
		assertTrue(fundFactsData.isTop10HoldingsAvailable());
	}
	
	@Test
	public void testSetIsfELLow() {
		fundFactsData.setIsfELLow(true);
		assertTrue(fundFactsData.isIsfELLow());
	}
	
	@Test
	public void testSetFelFundClass() {
		fundFactsData.setFelFundClass(true);
		assertTrue(fundFactsData.isFelFundClass());
	}
	
	@Test
	public void testSetDeferFundClass() {
		fundFactsData.setDeferFundClass(true);
		assertTrue(fundFactsData.isDeferFundClass());
	}
	
	@Test
	public void testSetLowRisk() {
		fundFactsData.setLowRisk(true);
		assertTrue(fundFactsData.isLowRisk());
	}
	
	@Test
	public void testSetLowMedRisk() {
		fundFactsData.setLowMedRisk(true);
		assertTrue(fundFactsData.isLowMedRisk());
	}
	
	@Test
	public void testSetMedRisk() {
		fundFactsData.setMedRisk(true);
		assertTrue(fundFactsData.isMedRisk());
	}
	
	@Test
	public void testsetMedHighRisk() {
		fundFactsData.setMedHighRisk(true);
		assertTrue(fundFactsData.isMedHighRisk());
	}
	
	@Test
	public void testSetHighRisk() {
		fundFactsData.setHighRisk(true);
		assertTrue(fundFactsData.isHighRisk());
	}
	
	@Test
	public void testSetReturnRate() {
		fundFactsData.setReturnRate(true);
		assertTrue(fundFactsData.isReturnRate());
	}
	
	@Test
	public void testSetTraillingCommisionAvailable() {
		fundFactsData.setTraillingCommisionAvailable(true);
		assertTrue(fundFactsData.isTraillingCommisionAvailable());
	}
	
	@Test
	public void testSetTunoverisNA() {
		fundFactsData.setTunoverisNA(true);
		assertTrue(fundFactsData.isTunoverisNA());
	}
	
	@Test
	public void testSetSunGifSoln() {
		fundFactsData.setSunGifSoln(true);
		assertTrue(fundFactsData.isSunGifSoln());
	}
	
	@Test
	public void testSetReturnCode() {
		fundFactsData.setReturnCode("Yes");
		assertNotNull(fundFactsData.getReturnCode());
	}
	
	@Test
	public void testSetReturnMsg() {
		fundFactsData.setReturnMsg("msg");
		assertNotNull(fundFactsData.getReturnMsg());
	}
}
