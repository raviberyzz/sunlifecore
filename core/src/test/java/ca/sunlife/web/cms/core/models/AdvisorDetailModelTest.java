/**
 * 
 */
package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.constants.AdvisorDetailConstants;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.services.AdvisorDetailService;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * @author mo92 The Class AdvisorDetailModelTest
 */
@ ExtendWith (AemContextExtension.class)
public class AdvisorDetailModelTest {

  @ Mock
  private Page currentPage;

  @ Mock
  private SlingHttpServletRequest request;

  @ Mock
  private SlingHttpServletResponse response;

  @ Mock
  private SiteConfigService configService;

  @ InjectMocks
  private AdvisorDetailModel advisorDetailModel;

  @ Mock
  private AdvisorDetailService advisorDetailService;

  @ Mock
  private ValueMap valueMap;

  final static String PAGE_PATH = "/content/sunlife/ca/en/home";

  @ BeforeEach
  public void setup() {
    MockitoAnnotations.initMocks(this);
    when(currentPage.getProperties( )).thenReturn(valueMap);
  }

  @ Test
  void testInitForAdvisor()
      throws LoginException , RepositoryException , ApplicationException , SystemException {
    String responseStr = "{\"AdvisorCorp\":null,\"AdvisorStd\":{\"Address\":{\"City\":\"Kingston\",\"PostalCode\":\"ABC 4R5\",\"Province\":\"Ontario\",\"StreetAddress1\":\"5 Alamein Drive\",\"StreetAddress2\":\"Suite 300\"},\"Aid\":\"1000010000\",\"Bio\":\"I will work closely with you to fully understand your specific situation and goals. Based on your needs, I’ll help you make informed financial choices to build your savings and protect what you save against unexpected events and to prepare financially for the future.\",\"ContactInfo\":{\"CellPhone\":null,\"Email\":\"Masked.Data1607@sunlife.com\",\"Fax\":\"613-476-9244\",\"Phone\":\"613-558-4524\",\"Url\":\"scott.buckley\"},\"Disclaimer\":\"Mutual funds distributed by Sun Life Financial Investment Services (Canada) Inc. \",\"DisplayPhoto\":true,\"FormattedName\":\"Scott Buckley, CFP\",\"GoogleMap\":{\"Latitude\":\"44.25903\",\"Longitude\":\"-76.52087\"},\"Languages\":[\"English\",\"French\"],\"Notices\":[{\"AgentContent\":\"The most important step in providing clear financial solutions is understanding your needs. When we meet, here's the information we'll need for both you and your spouse:<UL> \\u000d\\u000a<LI>Salary or income, investments and insurance amounts<\\/LI>\\u000d\\u000a<LI>Pension and registered savings information<\\/LI>\\u000d\\u000a<LI>Assets and debts<\\/LI>\\u000d\\u000a<LI>Financial information for any business you own<\\/LI><\\/UL>\",\"AgentTitle\":\"Preparing for an appointment\"},{\"AgentContent\":\"Hi ,This isfor testing\",\"AgentTitle\":\"Hi\"}],\"PhotoUrl\":null,\"SocialMediaLinks\":[],\"TDLink\":\"some value&agent=CL002023 target=_blank\",\"Type\":\"ADVISOR\"},\"ClientVersion\":\"1.0\",\"ErrorCode\":\"SUCCESS\",\"ErrorDesc\":\"\",\"HelpfulLinks\":[{\"Alt\":null,\"DisplayData\":\"<A HREF=http:\\/\\/www.cancer.ca\\/ccs\\/internet\\/frontdoor\\/0,,3172,00.html target=\\\"_blank\\\">Canadian Cancer Society - Test Pran<\\/A>\",\"Title\":null,\"Url\":\"http:\\/\\/www.cancer.ca\\/ccs\\/internet\\/frontdoor\\/0,,3172,00.html\"},{\"Alt\":null,\"DisplayData\":\"test\",\"Title\":null,\"Url\":\"test\"},{\"Alt\":null,\"DisplayData\":\"<A HREF=http:\\/\\/www4.gouv.qc.ca\\/EN\\/portail\\/citoyens\\/evenements\\/aines\\/pages\\/placement-adulte-centre-hebergement.aspx target=\\\"_blank\\\">w-phoney<\\/A>\",\"Title\":null,\"Url\":\"http:\\/\\/www4.gouv.qc.ca\\/EN\\/portail\\/citoyens\\/evenements\\/aines\\/pages\\/placement-adulte-centre-hebergement.aspx\"},{\"Alt\":null,\"DisplayData\":\"<A HREF=test link target=\\\"_blank\\\">Suzanne test<\\/A>\",\"Title\":null,\"Url\":\"test link\"}],\"PageType\":\"ADVISOR\",\"ServiceVersion\":\"V1.0\"}";
    String advisorId = "1000010000";
    when(currentPage.getPath( )).thenReturn(PAGE_PATH);
    when(configService.getConfigValues("pageLocale" , PAGE_PATH))
        .thenReturn(TestUtils.CANADA_LOCALE.toString( ));
    when(request.getRequestPathInfo( ))
        .thenReturn(TestUtils.getDummyRequestPathInfo(new String [ ] { advisorId }));
    when(advisorDetailService.getAdvisorDetails("en" , AdvisorDetailConstants.ADVISOR_CONSTANT ,
        advisorId)).thenReturn(responseStr);
    when(currentPage.getProperties( ).get(AdvisorDetailConstants.ADVISOR_TYPE_CONSTANT ,
        String.class)).thenReturn(AdvisorDetailConstants.ADVISOR_CONSTANT);
    advisorDetailModel.init( );
    assertEquals(responseStr , advisorDetailModel.getAdvisorData( ));
    String responseStrWhenNoAddrress2 = "{\"AdvisorCorp\":null,\"AdvisorStd\":{\"Address\":{\"City\":\"Kingston\",\"PostalCode\":\"ABC 4R5\",\"Province\":\"Ontario\",\"StreetAddress1\":\"5 Alamein Drive\",\"StreetAddress2\":\"\"},\"Aid\":\"1000010000\",\"Bio\":\"I will work closely with you to fully understand your specific situation and goals. Based on your needs, I’ll help you make informed financial choices to build your savings and protect what you save against unexpected events and to prepare financially for the future.\",\"ContactInfo\":{\"CellPhone\":null,\"Email\":\"Masked.Data1607@sunlife.com\",\"Fax\":\"613-476-9244\",\"Phone\":\"613-558-4524\",\"Url\":\"scott.buckley\"},\"Disclaimer\":\"Mutual funds distributed by Sun Life Financial Investment Services (Canada) Inc. \",\"DisplayPhoto\":true,\"FormattedName\":\"Scott Buckley, CFP\",\"GoogleMap\":{\"Latitude\":\"44.25903\",\"Longitude\":\"-76.52087\"},\"Languages\":[\"English\",\"French\"],\"Notices\":[{\"AgentContent\":\"The most important step in providing clear financial solutions is understanding your needs. When we meet, here's the information we'll need for both you and your spouse:<UL> \\u000d\\u000a<LI>Salary or income, investments and insurance amounts<\\/LI>\\u000d\\u000a<LI>Pension and registered savings information<\\/LI>\\u000d\\u000a<LI>Assets and debts<\\/LI>\\u000d\\u000a<LI>Financial information for any business you own<\\/LI><\\/UL>\",\"AgentTitle\":\"Preparing for an appointment\"},{\"AgentContent\":\"Hi ,This isfor testing\",\"AgentTitle\":\"Hi\"}],\"PhotoUrl\":null,\"SocialMediaLinks\":[],\"TDLink\":\"some value&agent=CL002023 target=_blank\",\"Type\":\"ADVISOR\"},\"ClientVersion\":\"1.0\",\"ErrorCode\":\"SUCCESS\",\"ErrorDesc\":\"\",\"HelpfulLinks\":[{\"Alt\":null,\"DisplayData\":\"<A HREF=http:\\/\\/www.cancer.ca\\/ccs\\/internet\\/frontdoor\\/0,,3172,00.html target=\\\"_blank\\\">Canadian Cancer Society - Test Pran<\\/A>\",\"Title\":null,\"Url\":\"http:\\/\\/www.cancer.ca\\/ccs\\/internet\\/frontdoor\\/0,,3172,00.html\"},{\"Alt\":null,\"DisplayData\":\"test\",\"Title\":null,\"Url\":\"test\"},{\"Alt\":null,\"DisplayData\":\"<A HREF=http:\\/\\/www4.gouv.qc.ca\\/EN\\/portail\\/citoyens\\/evenements\\/aines\\/pages\\/placement-adulte-centre-hebergement.aspx target=\\\"_blank\\\">w-phoney<\\/A>\",\"Title\":null,\"Url\":\"http:\\/\\/www4.gouv.qc.ca\\/EN\\/portail\\/citoyens\\/evenements\\/aines\\/pages\\/placement-adulte-centre-hebergement.aspx\"},{\"Alt\":null,\"DisplayData\":\"<A HREF=test link target=\\\"_blank\\\">Suzanne test<\\/A>\",\"Title\":null,\"Url\":\"test link\"}],\"PageType\":\"ADVISOR\",\"ServiceVersion\":\"V1.0\"}";
    when(advisorDetailService.getAdvisorDetails("en" , AdvisorDetailConstants.ADVISOR_CONSTANT ,
        advisorId)).thenReturn(responseStrWhenNoAddrress2);
    assertEquals(responseStr , advisorDetailModel.getAdvisorData( ));
  }

  @ Test
  void testInitForCorp()
      throws LoginException , RepositoryException , ApplicationException , SystemException {
    String responseStr = "{\"AdvisorCorp\":{\"Aid\":\"106406728064391616958\",\"CorpAddress\":{\"City\":\"Kitchener\",\"PostalCode\":\"N2H 6M6\",\"Province\":\"Ontario\",\"StreetAddress1\":\"22 Frederick St.\",\"StreetAddress2\":\"Suite 300\"},\"CorpContactInfo\":{\"CellPhone\":\"554-455-5455\",\"Email\":\"Masked.Data739@sunlife.com\",\"Fax\":null,\"Phone\":\"519-561-0306\",\"Url\":\"Wagner.Livock\"},\"CorpName\":\"Wagner, Livock & Associates\",\"CorpSocialMediaLinks\":[{\"LinkName\":\"Twitter\",\"LinkUrl\":\"https:\\/\\/twitter.com\\/IryneThian\"},{\"LinkName\":\"LinkedIn\",\"LinkUrl\":\"http:\\/\\/www.linkedin.com\\/in\\/irynethian\"}],\"CorpTeamMembers\":[{\"Address\":null,\"Aid\":\"106495730064396629957\",\"Bio\":null,\"ContactInfo\":{\"CellPhone\":null,\"Email\":\"Masked.Data221@sunlife.com\",\"Fax\":null,\"Phone\":\"519-560-3497\",\"Url\":\"E\\/search\\/agent\\/default.asp?AID=106495730064396629957\"},\"Disclaimer\":null,\"DisplayPhoto\":true,\"FormattedName\":\"Robert W. Rombough CFP\",\"GoogleMap\":null,\"Languages\":[\"English\"],\"Notices\":null,\"PhotoUrl\":null,\"SocialMediaLinks\":[],\"TDLink\":null,\"Type\":\"ADVISOR\"},{\"Address\":null,\"Aid\":\"106407728051384629953\",\"Bio\":null,\"ContactInfo\":{\"CellPhone\":null,\"Email\":\"Masked.Data1789@sunlife.com\",\"Fax\":null,\"Phone\":\"519-560-4723\",\"Url\":\"E\\/search\\/agent\\/default.asp?AID=106407728051384629953\"},\"Disclaimer\":null,\"DisplayPhoto\":true,\"FormattedName\":\"Omar McLean\",\"GoogleMap\":null,\"Languages\":[\"English\"],\"Notices\":null,\"PhotoUrl\":null,\"SocialMediaLinks\":[],\"TDLink\":null,\"Type\":\"ADVISOR\"}],\"CorpWelcomMessage\":\"We are a team dedicated to helping our clients achieve financial success. In today's world, we believe a team approach allows our organization to provide high quality information about financial products and services. Select each of our team members to learn more about us, and what we can do for you.\",\"Disclaimer\":null,\"GoogleMap\":{\"Latitude\":\"43.44522\",\"Longitude\":\"-80.49286\"},\"Notices\":[],\"Type\":\"CORP\"},\"AdvisorStd\":null,\"ClientVersion\":\"1.0\",\"ErrorCode\":\"SUCCESS\",\"ErrorDesc\":\"\",\"HelpfulLinks\":[{\"Alt\":null,\"DisplayData\":\"test\",\"Title\":null,\"Url\":\"test\"},{\"Alt\":null,\"DisplayData\":\"<A HREF=http:\\/\\/www4.gouv.qc.ca\\/EN\\/portail\\/citoyens\\/evenements\\/aines\\/pages\\/placement-adulte-centre-hebergement.aspx target=\\\"_blank\\\">w-phoney<\\/A>\",\"Title\":null,\"Url\":\"http:\\/\\/www4.gouv.qc.ca\\/EN\\/portail\\/citoyens\\/evenements\\/aines\\/pages\\/placement-adulte-centre-hebergement.aspx\"},{\"Alt\":null,\"DisplayData\":\"<A HREF=test link target=\\\"_blank\\\">Suzanne test<\\/A>\",\"Title\":null,\"Url\":\"test link\"}],\"PageType\":\"CORP\",\"ServiceVersion\":\"V1.0\"}";
    String advisorId = "1000010022";
    when(currentPage.getPath( )).thenReturn(PAGE_PATH);
    when(configService.getConfigValues("pageLocale" , PAGE_PATH))
        .thenReturn(TestUtils.CANADA_LOCALE.toString( ));
    when(request.getRequestPathInfo( ))
        .thenReturn(TestUtils.getDummyRequestPathInfo(new String [ ] { advisorId }));
    when(advisorDetailService.getAdvisorDetails("en" , AdvisorDetailConstants.CORP_CONSTANT ,
        advisorId)).thenReturn(responseStr);
    when(currentPage.getProperties( ).get(AdvisorDetailConstants.ADVISOR_TYPE_CONSTANT ,
        String.class)).thenReturn(AdvisorDetailConstants.CORP_CONSTANT);
    advisorDetailModel.init( );
    assertEquals(responseStr , advisorDetailModel.getAdvisorData( ));
  }

  @ Test
  void testInitWhenThereAreNoSelectors() throws LoginException , RepositoryException {
    when(currentPage.getPath( )).thenReturn(PAGE_PATH);
    when(configService.getConfigValues("pageLocale" , PAGE_PATH))
        .thenReturn(TestUtils.CANADA_LOCALE.toString( ));
    when(request.getRequestPathInfo( ))
        .thenReturn(TestUtils.getDummyRequestPathInfo(new String [ ] { }));
    when(currentPage.getProperties( ).get(AdvisorDetailConstants.ADVISOR_TYPE_CONSTANT ,
        String.class)).thenReturn(AdvisorDetailConstants.ADVISOR_CONSTANT);
    advisorDetailModel.init( );
    assertNull(advisorDetailModel.getAdvisorData( ));
  }

  @ Test
  void testInitWhenAdvisorTypeIsNull() throws LoginException , RepositoryException {
    when(currentPage.getPath( )).thenReturn(PAGE_PATH);
    when(configService.getConfigValues("pageLocale" , PAGE_PATH))
        .thenReturn(TestUtils.CANADA_LOCALE.toString( ));
    when(request.getRequestPathInfo( ))
        .thenReturn(TestUtils.getDummyRequestPathInfo(new String [ ] { "100001200" }));
    advisorDetailModel.init( );
    assertNull(advisorDetailModel.getAdvisorData( ));
  }

  @ Test
  void testInitWhenApplicationException()
      throws LoginException , RepositoryException , ApplicationException , SystemException {
    String advisorId = "1000010023";
    when(currentPage.getPath( )).thenReturn(PAGE_PATH);
    when(configService.getConfigValues("pageLocale" , PAGE_PATH))
        .thenReturn(TestUtils.CANADA_LOCALE.toString( ));
    when(request.getRequestPathInfo( ))
        .thenReturn(TestUtils.getDummyRequestPathInfo(new String [ ] { advisorId }));
    when(currentPage.getProperties( ).get(AdvisorDetailConstants.ADVISOR_TYPE_CONSTANT ,
        String.class)).thenReturn(AdvisorDetailConstants.ADVISOR_CONSTANT);
    when(advisorDetailService.getAdvisorDetails("en" , AdvisorDetailConstants.ADVISOR_CONSTANT ,
        advisorId)).thenThrow(ApplicationException.class);
    advisorDetailModel.init( );
    assertNull(advisorDetailModel.getAdvisorData( ));
  }

  @ Test
  void testInitWhenThereIsJSONParseException()
      throws LoginException , RepositoryException , ApplicationException , SystemException {
    String responseStr = "{\"dvisorCorp\":{\"Aid\":\"100001002299\",\"CorpAddress\":{\"City\":\"Kitchener\",\"PostalCode\":\"N2H 6M6\",\"Province\":\"Ontario\",\"StreetAddress1\":\"22 Frederick St.\",\"StreetAddress2\":\"Suite 300\"},\"CorpContactInfo\":{\"CellPhone\":\"554-455-5455\",\"Email\":\"Masked.Data739@sunlife.com\",\"Fax\":null,\"Phone\":\"519-561-0306\",\"Url\":\"Wagner.Livock\"},\"CorpName\":\"Wagner, Livock & Associates\",\"CorpSocialMediaLinks\":[{\"LinkName\":\"Twitter\",\"LinkUrl\":\"https:\\/\\/twitter.com\\/IryneThian\"},{\"LinkName\":\"LinkedIn\",\"LinkUrl\":\"http:\\/\\/www.linkedin.com\\/in\\/irynethian\"}],\"CorpTeamMembers\":[{\"Address\":null,\"Aid\":\"106495730064396629957\",\"Bio\":null,\"ContactInfo\":{\"CellPhone\":null,\"Email\":\"Masked.Data221@sunlife.com\",\"Fax\":null,\"Phone\":\"519-560-3497\",\"Url\":\"E\\/search\\/agent\\/default.asp?AID=106495730064396629957\"},\"Disclaimer\":null,\"DisplayPhoto\":true,\"FormattedName\":\"Robert W. Rombough CFP\",\"GoogleMap\":null,\"Languages\":[\"English\"],\"Notices\":null,\"PhotoUrl\":null,\"SocialMediaLinks\":[],\"TDLink\":null,\"Type\":\"ADVISOR\"},{\"Address\":null,\"Aid\":\"106407728051384629953\",\"Bio\":null,\"ContactInfo\":{\"CellPhone\":null,\"Email\":\"Masked.Data1789@sunlife.com\",\"Fax\":null,\"Phone\":\"519-560-4723\",\"Url\":\"E\\/search\\/agent\\/default.asp?AID=106407728051384629953\"},\"Disclaimer\":null,\"DisplayPhoto\":true,\"FormattedName\":\"Omar McLean\",\"GoogleMap\":null,\"Languages\":[\"English\"],\"Notices\":null,\"PhotoUrl\":null,\"SocialMediaLinks\":[],\"TDLink\":null,\"Type\":\"ADVISOR\"}],\"CorpWelcomMessage\":\"We are a team dedicated to helping our clients achieve financial success. In today's world, we believe a team approach allows our organization to provide high quality information about financial products and services. Select each of our team members to learn more about us, and what we can do for you.\",\"Disclaimer\":null,\"GoogleMap\":{\"Latitude\":\"43.44522\",\"Longitude\":\"-80.49286\"},\"Notices\":[],\"Type\":\"CORP\"},\"AdvisorStd\":null,\"ClientVersion\":\"1.0\",\"ErrorCode\":\"SUCCESS\",\"ErrorDesc\":\"\",\"HelpfulLinks\":[{\"Alt\":null,\"DisplayData\":\"test\",\"Title\":null,\"Url\":\"test\"},{\"Alt\":null,\"DisplayData\":\"<A HREF=http:\\/\\/www4.gouv.qc.ca\\/EN\\/portail\\/citoyens\\/evenements\\/aines\\/pages\\/placement-adulte-centre-hebergement.aspx target=\\\"_blank\\\">w-phoney<\\/A>\",\"Title\":null,\"Url\":\"http:\\/\\/www4.gouv.qc.ca\\/EN\\/portail\\/citoyens\\/evenements\\/aines\\/pages\\/placement-adulte-centre-hebergement.aspx\"},{\"Alt\":null,\"DisplayData\":\"<A HREF=test link target=\\\"_blank\\\">Suzanne test<\\/A>\",\"Title\":null,\"Url\":\"test link\"}],\"PageType\":\"CORP\",\"ServiceVersion\":\"V1.0\"}";
    String advisorId = "100001002299";
    when(currentPage.getPath( )).thenReturn(PAGE_PATH);
    when(configService.getConfigValues("pageLocale" , PAGE_PATH))
        .thenReturn(TestUtils.CANADA_LOCALE.toString( ));
    when(request.getRequestPathInfo( ))
        .thenReturn(TestUtils.getDummyRequestPathInfo(new String [ ] { advisorId }));
    when(advisorDetailService.getAdvisorDetails("en" , AdvisorDetailConstants.CORP_CONSTANT ,
        advisorId)).thenReturn(responseStr);
    when(currentPage.getProperties( ).get(AdvisorDetailConstants.ADVISOR_TYPE_CONSTANT ,
        String.class)).thenReturn(AdvisorDetailConstants.CORP_CONSTANT);
    advisorDetailModel.init( );
    assertNull(advisorDetailModel.getAdvisorMapData( ));
  }

  @ Test
  void testInitWhenThereIsNoDataPresent()
      throws LoginException , RepositoryException , ApplicationException , SystemException {
    String responseStr = "{\"dvisorCorp\":{\"Aid\":\"100001002299\",\"CorpAddress\":{\"City\":\"Kitchener\",\"PostalCode\":\"N2H 6M6\",\"Province\":\"Ontario\",\"StreetAddress1\":\"22 Frederick St.\",\"StreetAddress2\":\"Suite 300\"},\"CorpContactInfo\":{\"CellPhone\":\"554-455-5455\",\"Email\":\"Masked.Data739@sunlife.com\",\"Fax\":null,\"Phone\":\"519-561-0306\",\"Url\":\"Wagner.Livock\"},\"CorpName\":\"Wagner, Livock & Associates\",\"CorpSocialMediaLinks\":[{\"LinkName\":\"Twitter\",\"LinkUrl\":\"https:\\/\\/twitter.com\\/IryneThian\"},{\"LinkName\":\"LinkedIn\",\"LinkUrl\":\"http:\\/\\/www.linkedin.com\\/in\\/irynethian\"}],\"CorpTeamMembers\":[{\"Address\":null,\"Aid\":\"106495730064396629957\",\"Bio\":null,\"ContactInfo\":{\"CellPhone\":null,\"Email\":\"Masked.Data221@sunlife.com\",\"Fax\":null,\"Phone\":\"519-560-3497\",\"Url\":\"E\\/search\\/agent\\/default.asp?AID=106495730064396629957\"},\"Disclaimer\":null,\"DisplayPhoto\":true,\"FormattedName\":\"Robert W. Rombough CFP\",\"GoogleMap\":null,\"Languages\":[\"English\"],\"Notices\":null,\"PhotoUrl\":null,\"SocialMediaLinks\":[],\"TDLink\":null,\"Type\":\"ADVISOR\"},{\"Address\":null,\"Aid\":\"106407728051384629953\",\"Bio\":null,\"ContactInfo\":{\"CellPhone\":null,\"Email\":\"Masked.Data1789@sunlife.com\",\"Fax\":null,\"Phone\":\"519-560-4723\",\"Url\":\"E\\/search\\/agent\\/default.asp?AID=106407728051384629953\"},\"Disclaimer\":null,\"DisplayPhoto\":true,\"FormattedName\":\"Omar McLean\",\"GoogleMap\":null,\"Languages\":[\"English\"],\"Notices\":null,\"PhotoUrl\":null,\"SocialMediaLinks\":[],\"TDLink\":null,\"Type\":\"ADVISOR\"}],\"CorpWelcomMessage\":\"We are a team dedicated to helping our clients achieve financial success. In today's world, we believe a team approach allows our organization to provide high quality information about financial products and services. Select each of our team members to learn more about us, and what we can do for you.\",\"Disclaimer\":null,\"GoogleMap\":{\"Latitude\":\"43.44522\",\"Longitude\":\"-80.49286\"},\"Notices\":[],\"Type\":\"CORP\"},\"AdvisorStd\":null,\"ClientVersion\":\"1.0\",\"ErrorCode\":\"SUCCESS\",\"ErrorDesc\":\"\",\"HelpfulLinks\":[{\"Alt\":null,\"DisplayData\":\"test\",\"Title\":null,\"Url\":\"test\"},{\"Alt\":null,\"DisplayData\":\"<A HREF=http:\\/\\/www4.gouv.qc.ca\\/EN\\/portail\\/citoyens\\/evenements\\/aines\\/pages\\/placement-adulte-centre-hebergement.aspx target=\\\"_blank\\\">w-phoney<\\/A>\",\"Title\":null,\"Url\":\"http:\\/\\/www4.gouv.qc.ca\\/EN\\/portail\\/citoyens\\/evenements\\/aines\\/pages\\/placement-adulte-centre-hebergement.aspx\"},{\"Alt\":null,\"DisplayData\":\"<A HREF=test link target=\\\"_blank\\\">Suzanne test<\\/A>\",\"Title\":null,\"Url\":\"test link\"}],\"PageType\":\"CORP\",\"ServiceVersion\":\"V1.0\"}";
    String advisorId = "100001002299";
    when(currentPage.getPath( )).thenReturn(PAGE_PATH);
    when(configService.getConfigValues("pageLocale" , PAGE_PATH))
        .thenReturn(TestUtils.CANADA_LOCALE.toString( ));
    when(request.getRequestPathInfo( ))
        .thenReturn(TestUtils.getDummyRequestPathInfo(new String [ ] { "1000010022997" }));
    when(advisorDetailService.getAdvisorDetails("en" , AdvisorDetailConstants.CORP_CONSTANT ,
        advisorId)).thenReturn(responseStr);
    when(currentPage.getProperties( ).get(AdvisorDetailConstants.ADVISOR_TYPE_CONSTANT ,
        String.class)).thenReturn(AdvisorDetailConstants.CORP_CONSTANT);
    advisorDetailModel.init( );
    assertNull(advisorDetailModel.getAdvisorData( ));
  }
}
