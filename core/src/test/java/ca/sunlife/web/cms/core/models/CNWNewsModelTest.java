package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.beans.News;
import ca.sunlife.web.cms.core.services.CNWNewsService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import uk.org.lidalia.slf4jtest.TestLogger;
import uk.org.lidalia.slf4jtest.TestLoggerFactory;

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

	@BeforeEach
	public void setup() {
		MockitoAnnotations.initMocks(this);
		when(currentPage.getLanguage()).thenReturn(TestUtils.CANADA_LOCALE);
		when(request.getRequestPathInfo())
				.thenReturn(TestUtils.getDummyRequestPathInfo(new String[] { DUMMY_ACTIVE_YEAR, DUMMY_PAGE_NUMBER }));
	}

	@Test
	public void testInit() throws IOException {
		String expectedRequestURL = "home.page";// should NOT have the page number

		when(request.getRequestURI()).thenReturn(DUMMY_URI_CURRENT_PAGE);
		when(newsService.getCNWNews(TestUtils.CANADA_LOCALE.getLanguage(), expectedRequestURL, DUMMY_PAGE_NUMBER,
				DUMMY_ACTIVE_YEAR)).thenReturn(new News());
		cnwNewsModel.init();

		// check for yearsToShow
		int currentYear = Calendar.getInstance().get(Calendar.YEAR);
		List<Integer> expectedYearsToShow = Arrays
				.asList(new Integer[] { currentYear, currentYear - 1, currentYear - 2 });
		assertEquals(expectedYearsToShow, cnwNewsModel.getYearsToShow());

		// check for activeYear
		assertEquals(Integer.parseInt(DUMMY_ACTIVE_YEAR), cnwNewsModel.getActiveYear());

		// check for relativeURL
		assertEquals("home", cnwNewsModel.getRelativeURL());

		// check for requestURL
		assertEquals(expectedRequestURL, cnwNewsModel.getRequestURL());

		// news should NOT be null
		assertNotNull(cnwNewsModel.getNews());
	}

	@Test
	public void testInitNegativeCases() throws IOException {
		when(request.getRequestURI()).thenReturn(DUMMY_URI_OTHER_PAGE);
		cnwNewsModel.init();

		// requestURL should have the page number
		assertEquals("home.page-18", cnwNewsModel.getRequestURL());

		// news should be null
		assertNull(cnwNewsModel.getNews());
	}

	@Test
	public void testInitIOException() {
		TestLogger logger = TestLoggerFactory.getTestLogger(cnwNewsModel.getClass());

		try {
			when(request.getRequestURI()).thenReturn(DUMMY_URI_CURRENT_PAGE);
			when(newsService.getCNWNews(TestUtils.CANADA_LOCALE.getLanguage(), "home.page", DUMMY_PAGE_NUMBER,
					DUMMY_ACTIVE_YEAR)).thenThrow(IOException.class);
			cnwNewsModel.init();
		} catch (Exception exception) {
			assertTrue(exception instanceof IOException);
		}

		boolean logHasExceptionMessage = TestUtils.getLogMessageFlag(logger.getLoggingEvents(),
				"Error :: CNWNewsModel :: init method :: {}");
		assertTrue(logHasExceptionMessage);
	}

}
