package ca.sunlife.web.cms.core.services.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.lang.annotation.Annotation;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.osgi.config.AdvisorWebServiceConfig;
import ca.sunlife.web.cms.core.services.RestService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * @author mo92 The class RestServiceImplTest
 */
@ExtendWith(AemContextExtension.class)
class RestServiceImplTest {
	@Mock
	private AdvisorWebServiceConfig advisorWebServiceConfig;

	@InjectMocks
	private AdvisorDetailServiceImpl advisorDetailServiceImpl;

	@Mock
	private RestService restService;

	@BeforeEach
	void setup() {
		MockitoAnnotations.initMocks(this);
	}

	void setUpConfig() {
		advisorWebServiceConfig = new AdvisorWebServiceConfig() {
			@Override
			public Class<? extends Annotation> annotationType() {
				return null;
			}

			@Override
			public String getAdvisorPageDataUrl() {
				return "/advisor/getDetails";
			}
		};
		advisorDetailServiceImpl.activate(advisorWebServiceConfig);
	}

	@Test
	void activate() {
		advisorDetailServiceImpl.activate(advisorWebServiceConfig);
	}

	@Test
	void testGetAdvisorDetails() throws ApplicationException, SystemException, IOException {
		String responseStr = "{\"AdvisorCorp\":null,\"AdvisorStd\":{\"Address\":{\"City\":\"Kingston\",\"PostalCode\":\"K7L 4R5\",\"Province\":\"Ontario\",\"StreetAddress1\":\"5 Alamein Drive\",\"StreetAddress2\":\"\"},\"Aid\":\"1111111111111\",\"Bio\":\"I will work closely with you to fully understand your specific situation and goals. Based on your needs, I’ll help you make informed financial choices to build your savings and protect what you save against unexpected events and to prepare financially for the future.\",\"ContactInfo\":{\"CellPhone\":null,\"Email\":\"Masked.Data1607@sunlife.com\",\"Fax\":\"613-476-9244\",\"Phone\":\"613-558-4524\",\"Url\":\"scott.buckley\"},\"Disclaimer\":\"Mutual funds distributed by Sun Life Financial Investment Services (Canada) Inc. \",\"DisplayPhoto\":true,\"FormattedName\":\"Scott Buckley, CFP\",\"GoogleMap\":{\"Latitude\":\"44.25903\",\"Longitude\":\"-76.52087\"},\"Languages\":[\"English\",\"French\"],\"Notices\":[{\"AgentContent\":\"The most important step in providing clear financial solutions is understanding your needs. When we meet, here's the information we'll need for both you and your spouse:<UL> \\u000d\\u000a<LI>Salary or income, investments and insurance amounts<\\/LI>\\u000d\\u000a<LI>Pension and registered savings information<\\/LI>\\u000d\\u000a<LI>Assets and debts<\\/LI>\\u000d\\u000a<LI>Financial information for any business you own<\\/LI><\\/UL>\",\"AgentTitle\":\"Preparing for an appointment\"},{\"AgentContent\":\"Hi ,This isfor testing\",\"AgentTitle\":\"Hi\"}],\"PhotoUrl\":null,\"SocialMediaLinks\":[],\"TDLink\":\"some value&agent=CL002023 target=_blank\",\"Type\":\"ADVISOR\"},\"ClientVersion\":\"1.0\",\"ErrorCode\":\"SUCCESS\",\"ErrorDesc\":\"\",\"HelpfulLinks\":[{\"Alt\":null,\"DisplayData\":\"<A HREF=http:\\/\\/www.cancer.ca\\/ccs\\/internet\\/frontdoor\\/0,,3172,00.html target=\\\"_blank\\\">Canadian Cancer Society - Test Pran<\\/A>\",\"Title\":null,\"Url\":\"http:\\/\\/www.cancer.ca\\/ccs\\/internet\\/frontdoor\\/0,,3172,00.html\"},{\"Alt\":null,\"DisplayData\":\"test\",\"Title\":null,\"Url\":\"test\"},{\"Alt\":null,\"DisplayData\":\"<A HREF=http:\\/\\/www4.gouv.qc.ca\\/EN\\/portail\\/citoyens\\/evenements\\/aines\\/pages\\/placement-adulte-centre-hebergement.aspx target=\\\"_blank\\\">w-phoney<\\/A>\",\"Title\":null,\"Url\":\"http:\\/\\/www4.gouv.qc.ca\\/EN\\/portail\\/citoyens\\/evenements\\/aines\\/pages\\/placement-adulte-centre-hebergement.aspx\"},{\"Alt\":null,\"DisplayData\":\"<A HREF=test link target=\\\"_blank\\\">Suzanne test<\\/A>\",\"Title\":null,\"Url\":\"test link\"}],\"PageType\":\"ADVISOR\",\"ServiceVersion\":\"V1.0\"}";
		setUpConfig();
		when(restService.callGetWebService(
				"/advisor/getDetails?language=EN&pageId=ADVISOR&encodedAdvisorId=1111111111111&clientVersion=1.0",
				null)).thenReturn(responseStr);
		String resposeData = advisorDetailServiceImpl.getAdvisorDetails("en", "ADVISOR", "1111111111111");
		assertEquals(responseStr, resposeData);
	}

	@Test
	void testGetAdvisorDetailsWhenExceptionOccurs() throws ApplicationException, SystemException, IOException {
		setUpConfig();
		when(restService.callGetWebService(
				"/advisor/getDetails?language=EN&pageId=ADVISOR&encodedAdvisorId=1012220000&clientVersion=1.0", null))
						.thenThrow(IOException.class);
		Assertions.assertThrows(ApplicationException.class, () -> {
			advisorDetailServiceImpl.getAdvisorDetails("en", "ADVISOR", "1012220000");
		});
	}

}
