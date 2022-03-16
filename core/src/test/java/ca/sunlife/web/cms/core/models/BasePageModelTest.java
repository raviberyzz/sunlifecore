package ca.sunlife.web.cms.core.models;

import ca.sunlife.web.cms.core.beans.NewsDetails;
import ca.sunlife.web.cms.core.beans.Release;
import ca.sunlife.web.cms.core.constants.BasePageModelConstants;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.services.CNWNewsService;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.WCMException;
import com.day.cq.wcm.msm.api.LiveRelationshipManager;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import javax.jcr.RepositoryException;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.text.ParseException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ ExtendWith (AemContextExtension.class)
public class BasePageModelTest {

  @ Mock
  private Page currentPage;

  @ Mock
  private SlingHttpServletRequest request;

  @ Mock
  private ResourceResolver resolver;

  @ Mock
  private Resource resource;
  
  @ Mock
  private LiveRelationshipManager relationshipManager;
  
  @ InjectMocks
  private BasePageModel basePageModel;

  @ Mock
  private SiteConfigService configService;

  @ Mock
  private CNWNewsService cnwNewsService;

  @ Mock
  private Page page;

  @ Mock
  private Page page2;

  @ Mock
  private Page page3;

  private final static String LOCALE = "en_CA";
  private final static String PAGE_PATH = "/content/sunlife/external/ca/en/home";
  private final static String RELEASE_ID = "12355";

  @ BeforeEach
  public void setUp() throws IllegalAccessException {
    MockitoAnnotations.initMocks(this);
  }

  public void setInitData() throws LoginException , RepositoryException {
    when(currentPage.getPath( )).thenReturn(PAGE_PATH);
    when(configService.getConfigValues("domain" , PAGE_PATH)).thenReturn("www.dev-ca.sunlife.ca");
    when(configService.getConfigValues("pageLocale" , PAGE_PATH)).thenReturn(LOCALE);
    when(configService.getConfigValues("udoTagsPath" , PAGE_PATH))
        .thenReturn("/content/cq:tags/sunlife/UDO/ca");
    when(configService.getConfigValues(BasePageModelConstants.SITE_URL_CONSTANT , PAGE_PATH))
        .thenReturn("/content/sunlife/external/ca/en");
    when(request.getRequestPathInfo( ))
        .thenReturn(TestUtils.getDummyRequestPathInfo(new String [ ] { RELEASE_ID }));
    when(configService.getConfigValues("socialMediaImage" , PAGE_PATH))
        .thenReturn("/content/dam/sunlife/images/social.png");
    when(resolver.getResource(PAGE_PATH)).thenReturn(resource);
    when(currentPage.getLanguage( )).thenReturn(TestUtils.CANADA_LOCALE);
    when(configService.getConfigValues("mfaDomainPath" , PAGE_PATH)).thenReturn("https://mfa-dev.sunlifecorp.com");
  }

  public void setAltLangParams() throws LoginException , RepositoryException {
    when(configService.getConfigValues("altLangCount" , PAGE_PATH)).thenReturn("2");
    when(configService.getConfigValues(
        BasePageModelConstants.ALTERNATE_URL_ITEMS_CONSTANT + 0 + "_domain" , PAGE_PATH))
            .thenReturn("https://dev-www.ca.sunlife");
    when(configService.getConfigValues(
        BasePageModelConstants.ALTERNATE_URL_ITEMS_CONSTANT + 0 + "_languageCode" , PAGE_PATH))
            .thenReturn("en_CA");
    when(configService.getConfigValues(
        BasePageModelConstants.ALTERNATE_URL_ITEMS_CONSTANT + 0 + "_siteLocation" , PAGE_PATH))
            .thenReturn("/content/sunlife/external/ca/en");
    when(configService.getConfigValues(
        BasePageModelConstants.ALTERNATE_URL_ITEMS_CONSTANT + 0 + "_defaultLanguage" , PAGE_PATH))
            .thenReturn("true");
    when(configService.getConfigValues(
        BasePageModelConstants.ALTERNATE_URL_ITEMS_CONSTANT + 1 + "_domain" , PAGE_PATH))
            .thenReturn("https://dev-www.ca.sunlife");
    when(configService.getConfigValues(
        BasePageModelConstants.ALTERNATE_URL_ITEMS_CONSTANT + 1 + "_languageCode" , PAGE_PATH))
            .thenReturn("fr_CA");
    when(configService.getConfigValues(
        BasePageModelConstants.ALTERNATE_URL_ITEMS_CONSTANT + 1 + "_siteLocation" , PAGE_PATH))
            .thenReturn("/content/sunlife/external/ca/fr");
  }

  @ Test
  public void testInitMethodValidFields()
          throws IllegalAccessException, NoSuchMethodException, SecurityException,
          IllegalArgumentException, InvocationTargetException, LoginException, RepositoryException, WCMException {
    setInitData( );
    basePageModel.init( );
  }

  @ Test
  public void testInitForCnwPageType() throws LoginException, RepositoryException, IOException,
          ParseException, ApplicationException, SystemException, WCMException {
    setInitData( );
    basePageModel.setAdvancedPageType(BasePageModelConstants.PAGE_TYPE_CNW_CONSTANT);
    Release release = new Release( );
    release.setHeadline("This is my news headline.");
    release.setId(RELEASE_ID);
    release.setSummary("This is the test news release summary.");
    NewsDetails newsDetails = new NewsDetails( );
    newsDetails.setRelease(release);
    when(cnwNewsService.getCNWNewsDetails(RELEASE_ID , "en")).thenReturn(newsDetails);
    basePageModel.setSeoCanonicalUrl("www.dev-ca.sunlife.ca/en/home/");
    basePageModel.init( );
    setAltLangParams( );
    when(resource.adaptTo(Page.class)).thenReturn(page);
    when(page.getDepth( )).thenReturn(7);
    when(page.getAbsoluteParent(4)).thenReturn(page2);
    when(page2.getName( )).thenReturn("Home");

    when(page.getAbsoluteParent(5)).thenReturn(page3);
    when(page3.getName( )).thenReturn("Insurance");

    when(page.getAbsoluteParent(6)).thenReturn(page);
    when(page.getName( )).thenReturn("Health Insurance");

    basePageModel.init( );
    assertEquals("This is my news headline." , basePageModel.getSeoPageTitle( ));

    basePageModel.setTags(new String[] {"sunlife:UDO/ca/page_audience/Advisor",
    "sunlife:UDO/ca/abcs", "sunlife:UDO/ca/page_audience/Agent",
    "sunlife:UDO/ca/page_manager/None", "sunlife:UDO/ca/page_manager/Value1",
    "sunlife:UDO/ca/page_manager/Value2", "sunlife:UDO/ca/page_dir/None"});
    basePageModel.init( );

  }

  @ Test
  public void testInitForAdvisorPageType() {
    try {
      setInitData( );
      basePageModel.setAdvancedPageType(BasePageModelConstants.PAGE_TYPE_ADVISOR_CONSTANT);
      basePageModel.init( );
    } catch (Exception e) {
      assertTrue(e instanceof NullPointerException);
    }

  }
  
  @ Test
  public void testInitForArticlePageType() {
    try {
      setInitData( );
      basePageModel.setAdvancedPageType(BasePageModelConstants.PAGE_TYPE_ARTICLE_PAGES_CONSTANT);
      basePageModel.init( );
    } catch (Exception e) {
      assertTrue(e instanceof NullPointerException);
    }

  }
}
