package ca.sunlife.web.cms.core.models.v1;

import ca.sunlife.web.cms.core.beans.News;
import ca.sunlife.web.cms.core.beans.ReleaseMain;
import ca.sunlife.web.cms.core.constants.BasePageModelConstants;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;

import ca.sunlife.web.cms.core.models.NewsCategory;
import ca.sunlife.web.cms.core.services.CNWNewsService;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import uk.org.lidalia.slf4jtest.TestLogger;
import uk.org.lidalia.slf4jtest.TestLoggerFactory;

import javax.jcr.RepositoryException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(AemContextExtension.class)
public class CNWNewsModelTest {
  private final String DUMMY_ACTIVE_YEAR = "1950";
  private final String DUMMY_PAGE_NUMBER = "23";
  private final String DUMMY_URI_CURRENT_PAGE = "home.page-23.content";
  private final String DUMMY_URI_OTHER_PAGE = "home.page-18.content";

  @Mock
  private Page currentPage;

  @Mock
  private SlingHttpServletRequest request;

  @Mock
  private CNWNewsService newsService;

  @InjectMocks
  private CNWNewsModel cnwNewsModel;

  @Mock
  private SiteConfigService configService;

  @BeforeEach
  public void setup() throws LoginException, RepositoryException {
    MockitoAnnotations.initMocks(this);
    //when(currentPage.getLanguage( )).thenReturn(TestUtils.CANADA_LOCALE);
    when(configService.getConfigValues("pageLocale", "/content/sunlife/ca/en/home")).thenReturn("en_CA");
    when(currentPage.getPath()).thenReturn("/content/sunlife/ca/en/home");
    when(configService.getConfigValues(BasePageModelConstants.SITE_URL_CONSTANT,
            "/content/sunlife/ca/en/home")).thenReturn("/content/sunlife");
    when(configService.getPageRelativeUrl("/content/sunlife/ca/en/home")).thenReturn("home");
  }

  void setSelectors() {
    when(request.getRequestPathInfo()).thenReturn(TestUtils
            .getDummyRequestPathInfo(new String[]{DUMMY_ACTIVE_YEAR, DUMMY_PAGE_NUMBER}));
  }

  void setInitialData(String year, String numberOfTabs, String pageSize, String[] categories) {
    cnwNewsModel.setLatestYear(year);
    cnwNewsModel.setNumberOfTabs(numberOfTabs);
    cnwNewsModel.setPageSize(pageSize);
    List<NewsCategory> newsCategories = new ArrayList<NewsCategory>();
    for (String category : categories) {
      newsCategories.add(new NewsCategory() {
        @Override
        public String getCategory() {
          return category;
        }
      });
    }
    cnwNewsModel.setNewsCategories(newsCategories);
  }

  @Test
  public void testInit() throws IOException, ApplicationException, SystemException {
    setSelectors();
    setInitialData("2020", "3", "10", new String[]{"773"});
    String expectedRequestURL = "home.page";// should NOT have the page number
    when(configService.getPageRelativeUrl("home")).thenReturn("home");
    when(configService.getPageRelativeUrl("home/page")).thenReturn("home/page");
    when(request.getRequestURI()).thenReturn(DUMMY_URI_CURRENT_PAGE);
    when(newsService.getCNWNews(TestUtils.CANADA_LOCALE.getLanguage(),
            expectedRequestURL.replace(".", "/"), DUMMY_PAGE_NUMBER, DUMMY_ACTIVE_YEAR, "10",
            cnwNewsModel.getNewsCategories())).thenReturn(new News());
    cnwNewsModel.setNewsType("2");
    cnwNewsModel.init();

    // check for yearsToShow
    int currentYear = 2020;
    List<Integer> expectedYearsToShow = Arrays
            .asList(new Integer[]{currentYear, currentYear - 1, currentYear - 2});
    assertEquals(expectedYearsToShow, cnwNewsModel.getYearsToShow());


    // check for activeYear
    assertEquals(Integer.parseInt(DUMMY_ACTIVE_YEAR), cnwNewsModel.getActiveYear());

    // check for relativeURL
    assertEquals("home", cnwNewsModel.getRelativeURL());

    // check for requestURL
    assertEquals(expectedRequestURL.replace(".", "/"), cnwNewsModel.getRequestURL());

    // news should NOT be null
    assertNotNull(cnwNewsModel.getNews());
  }

  @Test
  public void testInitNegativeCases() throws IOException {
    setSelectors();
    setInitialData("2020", "3", "10", new String[]{"773"});
    when(request.getRequestURI()).thenReturn(DUMMY_URI_OTHER_PAGE);
    when(configService.getPageRelativeUrl("home/page-18")).thenReturn("home/page-18");
    cnwNewsModel.setNewsType("2");
    cnwNewsModel.init();
    assertEquals("home.page-18".replace(".", "/"), cnwNewsModel.getRequestURL());

    // news should be null
    assertNull(cnwNewsModel.getNews());
  }

  @Test
  public void testInitIOException() {
    TestLogger logger = TestLoggerFactory.getTestLogger(cnwNewsModel.getClass());
    try {
      setSelectors();
      setInitialData("2020", "3", "10", new String[]{"773"});
      when(request.getRequestURI()).thenReturn(DUMMY_URI_CURRENT_PAGE);
      when(newsService.getCNWNews(TestUtils.CANADA_LOCALE.getLanguage(),
              "home.page".replace(".", "/"), DUMMY_PAGE_NUMBER, DUMMY_ACTIVE_YEAR, "10",
              cnwNewsModel.getNewsCategories())).thenThrow(IOException.class);
      cnwNewsModel.setNewsType("2");
      cnwNewsModel.init();
    } catch (Exception exception) {
      assertTrue(exception instanceof IOException);
    }
    boolean logHasExceptionMessage = TestUtils.getLogMessageFlag(logger.getLoggingEvents(),
            "Error :: CNWNewsModel");
    assertTrue(!logHasExceptionMessage);
  }

  @Test
  void testProcessOverviewDataWhenDataIsNull()
          throws IOException, ApplicationException, SystemException {
    setSelectors();
    cnwNewsModel.processOverviewData();
    assertNull(cnwNewsModel.getReleaseMain());
  }

  @Test
  void testProcessOverviewDataWhenThrowsException()
          throws IOException, ApplicationException, SystemException {
    cnwNewsModel.setNewsType("1");
    cnwNewsModel.setNumberOfNews("3");
    List<NewsCategory> categories = new ArrayList<NewsCategory>();
    categories.add(new NewsCategory() {
      @Override
      public String getCategory() {
        return "773";
      }
    });
    cnwNewsModel.setNewsCategories(categories);
    when(newsService.getCNWNewsOverview(TestUtils.CANADA_LOCALE.getLanguage(), "3", categories))
            .thenThrow(IOException.class);
    assertNull(cnwNewsModel.getReleaseMain());
  }

  @Test
  void testInitWhenLatestYearIsNull() throws IOException, ApplicationException, SystemException {
    setSelectors();
    setInitialData(null, "3", "10", new String[]{"773"});
    cnwNewsModel.setNewsType("2");
    when(request.getRequestURI()).thenReturn(DUMMY_URI_CURRENT_PAGE);
    when(newsService.getCNWNews(TestUtils.CANADA_LOCALE.getLanguage(),
            "home.page".replace(".", "/"), DUMMY_PAGE_NUMBER,
            String.valueOf(Calendar.getInstance().get(Calendar.YEAR)), "10",
            cnwNewsModel.getNewsCategories())).thenReturn(new News());
    cnwNewsModel.init();
    assertNull(cnwNewsModel.getNews());
  }

  @Test
  void testInitWhenApplicationSystemException()
          throws IOException, ApplicationException, SystemException {
    setSelectors();
    setInitialData(DUMMY_ACTIVE_YEAR, "3", "10", new String[]{"773"});
    cnwNewsModel.setNewsType("2");
    when(request.getRequestURI()).thenReturn(DUMMY_URI_CURRENT_PAGE);
    when(newsService.getCNWNews(TestUtils.CANADA_LOCALE.getLanguage(),
            "home.page".replace(".", "/"), DUMMY_PAGE_NUMBER, DUMMY_ACTIVE_YEAR, "10",
            cnwNewsModel.getNewsCategories())).thenThrow(ApplicationException.class);
    assertNull(cnwNewsModel.getReleaseMain());
  }

  @Test
  void testOverviewData() throws IOException, ApplicationException, SystemException {
    setSelectors();
    setInitialData("2020", "3", "10", new String[]{"773"});
    // releaseMain should be null initially
    cnwNewsModel.init();
    cnwNewsModel.setNumberOfNews("3");
    // cnwNewsModel.setNewsType(null);
    assertNull(cnwNewsModel.getReleaseMain());
    // releaseMain should NOT be null in below case
    List<NewsCategory> categories = new ArrayList<NewsCategory>();
    categories.add(new NewsCategory() {
      @Override
      public String getCategory() {
        return "773";
      }
    });
    cnwNewsModel.setNewsCategories(categories);
    cnwNewsModel.setNumberOfNews("3");
    cnwNewsModel.setNewsType("1");
    when(newsService.getCNWNewsOverview(TestUtils.CANADA_LOCALE.getLanguage(), "3", categories))
            .thenReturn(new ReleaseMain());
    cnwNewsModel.init();
    assertNotNull(cnwNewsModel.getReleaseMain());
  }

  @Test
  void testInitWhenNoSelectors() throws IOException, ApplicationException, SystemException {
    setInitialData(null, "3", "10", new String[]{"773"});
    cnwNewsModel.init();
    assertNull(cnwNewsModel.getReleaseMain());

    setInitialData(DUMMY_ACTIVE_YEAR, "3", "10", new String[]{"773"});
    cnwNewsModel.setNewsType("2");
    when(request.getRequestPathInfo())
            .thenReturn(TestUtils.getDummyRequestPathInfo(new String[]{}));
    when(request.getRequestURI()).thenReturn(DUMMY_URI_CURRENT_PAGE);
    when(newsService.getCNWNews(TestUtils.CANADA_LOCALE.getLanguage(),
            "home.page-23.1950".replace(".", "/"), null, DUMMY_ACTIVE_YEAR, "10",
            cnwNewsModel.getNewsCategories())).thenReturn(new News());
    when(configService.getPageRelativeUrl("home/page-23/1950")).thenReturn("home/page-23/1950");
    cnwNewsModel.init();

    assertNotNull(cnwNewsModel.getNews());
  }
}
