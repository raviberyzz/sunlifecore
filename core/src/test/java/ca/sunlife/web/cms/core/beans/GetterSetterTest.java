package ca.sunlife.web.cms.core.beans;

import java.util.ArrayList;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ ExtendWith(AemContextExtension.class)
public class GetterSetterTest {
	private NewsDetails newsDetails;
	private News news;
	private PageItem pageItem;
	private Release release;
	private ReleaseMain releaseMain;
	private FundFactsData factsData;
	private Values values;
	private Guarantee guarantee;
	private AssetMix assetMix;
	private Holding holding;
	private FundFactsResponse factsResponse;
	private PerformanceData performanceData;

	@ BeforeEach
	void setup() {
		newsDetails = new NewsDetails();
		news = new News();
		pageItem = new PageItem();
		release = new Release();
		releaseMain = new ReleaseMain();
		factsData = new FundFactsData();
		values = new Values();
		guarantee = new Guarantee("test", "10", "2", "100", "3");
		assetMix = new AssetMix("test asset", "50", "red");
		holding = new Holding("test holding", "3", new ArrayList<String>());
		factsResponse = new FundFactsResponse();
		performanceData = new PerformanceData("2020", "10", "red");
	}

	@ Test
	void testNewsDetails() {
		TestUtils.executeTestBean(newsDetails);
	}

	@ Test
	void testNews() {
		TestUtils.executeTestBean(news);
	}

	@ Test
	void testPageItem() {
		TestUtils.executeTestBean(pageItem);
	}

	@ Test
	void testRelease() {
		TestUtils.executeTestBean(release);
	}

	@ Test
	void testGuarantee() {
		TestUtils.executeTestBean(guarantee);
	}

	@ Test
	void testReleaseMain() {
		TestUtils.executeTestBean(releaseMain);
	}

	@ Test
	void testFactsData() {
		TestUtils.executeTestBean(factsData);
	}

	@ Test
	void testValues() {
		TestUtils.executeTestBean(values);
	}

	@ Test
	void testAssetMix() {
		TestUtils.executeTestBean(assetMix);
	}

	@ Test
	void testHolding() {
		TestUtils.executeTestBean(holding);
	}
	
	@ Test
	void testFactsResponse() {
		TestUtils.executeTestBean(factsResponse);
	}
	
	@ Test
	void testPerformanceData() {
		TestUtils.executeTestBean(performanceData);
	}
}


