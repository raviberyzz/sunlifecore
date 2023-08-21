package ca.sunlife.web.cms.core.services.impl;

import static org.mockito.Mockito.when;

import java.io.IOException;
import java.lang.annotation.Annotation;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.request.RequestPathInfo;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.osgi.config.FundFactPDFConfig;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.RestService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ ExtendWith (AemContextExtension.class)
public class FundFactPDFServiceImplTest {

	@ Mock
	private RestService restService;
	
	@ Mock
	private FundFactPDFConfig factPDFConfig;
	
	@ Mock
	private SlingHttpServletRequest request;
	
	@ Mock
	private RequestPathInfo pathInfo;
	
	@ Mock
	private Resource currentResource;
	
	@ Mock
	private ValueMap valueMap;
	
	@ Mock
	private Resource pageResource;
	
	@ Mock
	private ResourceResolver resourceResolver;
	
	@ Mock
	private CoreResourceResolver coreResourceResolver;
	
	@ InjectMocks
	private FundFactPDFServiceImpl factPDFService;
	
	@ BeforeEach
	void setup () {
		MockitoAnnotations.initMocks(this);
		factPDFConfig = new FundFactPDFConfig() {
			@ Override
			public Class<? extends Annotation> annotationType() {
				return null;
			}
			
			@ Override
			public String getPichartURL() {
				return "/pieChartUrl";
			}
			
			@ Override
			public String getFundFactsUrl() {
				return "/fundServiceUrl";
			}
			
			@ Override
			public String getBarChartURL() {
				return "/barChartUrl";
			}
		};
	}
	
	@ Test
	void testActivate () {
		factPDFService.activate(factPDFConfig);
	}
	
	@ Test
	void testGetCompiledData () throws ApplicationException, SystemException, IOException, LoginException {
		String res = "{\"fundFactsResponse\":{\"fundFactsData\":{\"assetMixes\":[{\"colourCd\":\"\",\"name\":\"Canadian Equity\",\"percentage\":\"18.4\"},{\"colourCd\":\"\",\"name\":\"Canadian Fixed Income\",\"percentage\":\"15.6\"},{\"colourCd\":\"\",\"name\":\"U.S. Equity\",\"percentage\":\"25.8\"},{\"colourCd\":\"\",\"name\":\"U.S. Fixed Income\",\"percentage\":\"7.3\"},{\"colourCd\":\"\",\"name\":\"International Equity\",\"percentage\":\"27.3\"},{\"colourCd\":\"\",\"name\":\"International Fixed Income\",\"percentage\":\"4.6\"},{\"colourCd\":\"\",\"name\":\"Cash and Cash Equivalents\",\"percentage\":\"1.1\"}],\"dscList\":[\"5.5\",\"5.0\",\"5.0\",\"4.0\",\"4.0\",\"3.0\",\"2.0\",\"Nil\"],\"fundDataErrorsList\":[\"Basic value MgmtFee for the fund S33IA is empty\"],\"fundLessThanOneYear\":false,\"guaranteeSeriesAvailable\":true,\"guarantees\":[{\"MER\":\"2.58\",\"minimumInvestment\":\"500\",\"netAsset\":\"12.4483\",\"numberUnits\":\"1.0538129054E7\",\"series\":\"Investment Series - FEL/LL/DSC\"},{\"MER\":\"2.92\",\"minimumInvestment\":\"500\",\"netAsset\":\"12.2517\",\"numberUnits\":\"7455946.514\",\"series\":\"Estate Series - FEL/LL/DSC\"}],\"holdings\":[{\"holdingName\":\"iShares Core S&P 500 ETF\",\"investmentPercentage\":\"10.9\",\"subHoldingNames\":[]},{\"holdingName\":\"PH&N Bond Fund, Series O\",\"investmentPercentage\":\"8.5\",\"subHoldingNames\":[]},{\"holdingName\":\"Sun Life BlackRock Canadian Composite Equity Fund, Series I\",\"investmentPercentage\":\"8.4\",\"subHoldingNames\":[]},{\"holdingName\":\"Sun Life Granite Tactical Completion Fund, Series I\",\"investmentPercentage\":\"8.2\",\"subHoldingNames\":[]},{\"holdingName\":\"Sun Life Schroder Global Mid Cap Fund, Series I\",\"investmentPercentage\":\"6.5\",\"subHoldingNames\":[]},{\"holdingName\":\"Sun Life Real Assets Fund\",\"investmentPercentage\":\"5.8\",\"subHoldingNames\":[]},{\"holdingName\":\"Sun Life BlackRock Canadian Universe Bond Fund, Series I\",\"investmentPercentage\":\"5.5\",\"subHoldingNames\":[]},{\"holdingName\":\"Sun Life MFS International Value Fund, Series I\",\"investmentPercentage\":\"4.6\",\"subHoldingNames\":[]},{\"holdingName\":\"Sun Life JPMorgan International Equity Fund\",\"investmentPercentage\":\"4.6\",\"subHoldingNames\":[]},{\"holdingName\":\"Sun Life MFS International Growth Fund, Series I\",\"investmentPercentage\":\"4.6\",\"subHoldingNames\":[]}],\"lang\":\"EN\",\"llscList\":[\"3.0\",\"2.5\",\"2.0\",\"Nil\"],\"mPowerCode\":\"S33IA\",\"maxReturnYear\":\"6\",\"minReturnYear\":\"1\",\"numberOfYears\":\"7\",\"performanceData\":[{\"colourCd\":\"\",\"percentage\":\"16.8\",\"year\":\"2013\"},{\"colourCd\":\"\",\"percentage\":\"10.2\",\"year\":\"2014\"},{\"colourCd\":\"\",\"percentage\":\"7.6\",\"year\":\"2015\"},{\"colourCd\":\"\",\"percentage\":\"3.6\",\"year\":\"2016\"},{\"colourCd\":\"\",\"percentage\":\"8.1\",\"year\":\"2017\"},{\"colourCd\":\"\",\"percentage\":\"-3.8\",\"year\":\"2018\"},{\"colourCd\":\"\",\"percentage\":\"14.0\",\"year\":\"2019\"}],\"reasonsToInvest\":[\"Seek capital appreciation and income, with a bias towards capital appreciation\",\"Seek diversification through a broad range of asset classes, geographies, and investment styles\",\"Are medium to long-term investors\",\"Are comfortable with low to medium investment risk\"],\"returnRateAvailable\":true,\"salesChargesApplicable\":true,\"totalPercentOfTop10Investments\":\"67.6%\",\"underlying\":false,\"values\":{\"TotalValueOn\":\"31/12/2019\",\"ProductName\":\"Sun GIF Solutions\",\"FELLow\":\"0.0\",\"TotalNumberOfInvestments\":\"22\",\"FundClass\":\"IA\",\"TurnOver\":\"39\",\"ReturnAmount\":\"1245.26\",\"RiskRatingValue\":\"low-to-medium\",\"DateSeries\":\"04/05/2015\",\"WithdrawDays\":\"30\",\"SubAdvisor\":\"N/A\",\"ReturnRate\":\"4.8\",\"FundUnderlying\":\"International Fixed Income\",\"DateFund\":\"04/05/2015\",\"MgmtFee\":\"\",\"TotalValueAmount\":\"285729852\",\"AdvisorCommission\":\"5.0\",\"UnderlyingFund\":\"Sun Life Granite Balanced Growth Portfolio\",\"PlanDate\":\"08/06/2020\",\"FELHigh\":\"5.0\",\"ReasonsToInvestCaution\":\"Do not invest in this fund unless you are willing to accept the potential loss of a portion of your investment or if you have a short-term investment horizon.\",\"FundManager\":\"Sun Life Global Investments (Canada) Inc.\",\"FundName\":\"Sun GIF Solutions Sun Life Granite Balanced Growth\",\"FundObjective\":\"The fund's investment objective is to seek capital appreciation and income, with a bias towards capital appreciation, by investing primarily in equity mutual funds and, to a lesser extent, fixed income mutual funds.\",\"TrailingCommission\":\"1.0\"},\"yearByYearReturnAvailable\":true},\"returnCode\":\"1\",\"returnMessage\":\"There are existing data errors with this fund. Please see the data errors list.\"}}";
		factPDFService.activate(factPDFConfig);
		when(request.getRequestPathInfo()).thenReturn(pathInfo);
		String[] reqParams = new String[2];
		reqParams[0] = "fundsfact";
		reqParams[1] = "mp~S33IA|lang~en|fundProductSeriesCd~P01S01|fundSalesChargeOptionCd~SC1";
		when(request.getRequestPathInfo().getSelectors()).thenReturn(reqParams);
		when(restService.callGetWebService("/fundServiceUrl?fundCode=S33IA&lang=EN", null)).thenReturn(res);
		when(request.getResource()).thenReturn(currentResource);
		when(currentResource.getValueMap()).thenReturn(valueMap);
		when(coreResourceResolver.getResourceResolver()).thenReturn(resourceResolver);
		when(request.getResource().getPath()).thenReturn("/content/home");
		when(coreResourceResolver.getResourceResolver()
				.getResource(request.getResource().getPath().concat("/root"))).thenReturn(pageResource);
		factPDFService.getCompiledData(request);
	}
}
