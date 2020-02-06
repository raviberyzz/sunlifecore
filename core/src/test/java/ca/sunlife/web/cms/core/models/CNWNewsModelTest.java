package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Locale;

import org.apache.sling.api.SlingHttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.beans.NewsReleases;
import ca.sunlife.web.cms.core.beans.ReleaseMain;
import ca.sunlife.web.cms.core.services.CNWNewsService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import uk.org.lidalia.slf4jtest.LoggingEvent;
import uk.org.lidalia.slf4jtest.TestLogger;
import uk.org.lidalia.slf4jtest.TestLoggerFactory;

@ExtendWith(AemContextExtension.class)
public class CNWNewsModelTest {
	private final Locale CANADA_LOCALE = new Locale("en", "CANADA");
	private final String DUMMY_URL = "https://some.dummy.url/path";
	private final String DUMMY_URI = "/sites/dummy/uri";
	private final String MATCHING_COUNT = "102";
	private final String ACTIVE_YEAR = "2012";

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
		when(currentPage.getLanguage()).thenReturn(CANADA_LOCALE);

	}

	@Test
	public void testInit() throws IOException {
		when(request.getParameter("pageNo")).thenReturn("8");
		when(request.getParameter("year")).thenReturn(ACTIVE_YEAR);
		when(request.getQueryString()).thenReturn("pageNo=12&year=2023");

		when(newsService.getCNWNews(ArgumentMatchers.anyString())).thenReturn(
				"{\"releases\":{\"release\":[{\"id\":\"1\",\"headline\":\"headline\",\"releaseDate\":\"Wed, 05 Feb 2020 12:24:03 Eastern Standard Time\",\"summary\":\"summary\",\"body\":\"body\"},{\"id\":\"2\",\"headline\":\"some headline\",\"releaseDate\":\"Mon, 12 Jan 2012 09:12:05 Eastern Standard Time\",\"summary\":\"some summary\",\"body\":\"body content\"}],\"latestModified\":null,\"matching_count\":\""
						+ MATCHING_COUNT + "\",\"returned_count\":null}}");
		when(request.getRequestURI()).thenReturn(DUMMY_URI);
		cnwNewsModel.init();

		assertEquals("February 05, 2020", cnwNewsModel.getNews().getReleases().getRelease().get(0).getReleaseDate());
		assertEquals("January 12, 2012", cnwNewsModel.getNews().getReleases().getRelease().get(1).getReleaseDate());
		assertEquals(DUMMY_URI.replace("/sites", "") + "?&year=" + ACTIVE_YEAR + "&pageNo=",
				cnwNewsModel.getRequestURL().toString());

		int expectedRecordPerPage = Integer.parseInt(cnwNewsModel.getRcordPerPageStr());
		int expectedItems = Integer.parseInt(MATCHING_COUNT);
		int totalPages = expectedItems / expectedRecordPerPage;
		int expectedPages = expectedItems % expectedRecordPerPage == 0 ? totalPages : totalPages + 1;
		assertEquals(expectedPages, cnwNewsModel.getTotalPages());
	}

	@Test
	public void testInitIOException() throws IOException {
		TestLogger logger = TestLoggerFactory.getTestLogger(cnwNewsModel.getClass());

		when(request.getParameter("pageNo")).thenReturn("8");
		when(newsService.getCNWNews(ArgumentMatchers.anyString())).thenThrow(IOException.class);
		when(request.getRequestURI()).thenReturn(DUMMY_URI);
		cnwNewsModel.init();
		final List<LoggingEvent> events = logger.getLoggingEvents();
		boolean logHasIOException = Utils.getLogMessageFlag(logger.getLoggingEvents(),
				"Error :: CNWNewsModel :: init method :: {}");
		assertTrue(logHasIOException);
	}

	@Test
	public void testInitNegativeScenarios() throws IOException {
		TestLogger logger = TestLoggerFactory.getTestLogger(cnwNewsModel.getClass());
		// negative page number
		when(request.getParameter("pageNo")).thenReturn("-10");
		// incorrect date format
		when(newsService.getCNWNews(ArgumentMatchers.anyString())).thenReturn(
				"{\"releases\":{\"release\":[{\"id\":\"1\",\"headline\":\"headline\",\"releaseDate\":\"30/10/2018 06:19:21 AM\",\"summary\":\"summary\",\"body\":\"body\"},{\"id\":\"2\",\"headline\":\"some headline\",\"releaseDate\":\"Mon, 12 Jan 2012 09:12:05 Eastern Standard Time\",\"summary\":\"some summary\",\"body\":\"body content\"}],\"matching_count\":\"23\"}}");
		when(request.getRequestURI()).thenReturn(DUMMY_URI);
		cnwNewsModel.init();

		assertEquals(1, cnwNewsModel.getCurPage());
		boolean logHasParseError = Utils.getLogMessageFlag(logger.getLoggingEvents(),
				"Error :: parsing the release date {}");
		assertTrue(logHasParseError);
	}

	@Test
	public void testSetPaginationFirstScenario() throws NoSuchMethodException, SecurityException,
			IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		ReleaseMain news = mock(ReleaseMain.class);
		cnwNewsModel.setNews(news);
		NewsReleases newsReleases = new NewsReleases();
		newsReleases.setMatchingCount("903");
		when(news.getReleases()).thenReturn(newsReleases);

		Method setPaginationMethod = cnwNewsModel.getClass().getDeclaredMethod("setPagination");
		setPaginationMethod.setAccessible(true);
		setPaginationMethod.invoke(cnwNewsModel);

		assertEquals(5, cnwNewsModel.getPageItems().size());
	}

	@Test
	public void testSetPaginationThirdScenario() throws NoSuchMethodException, SecurityException,
			IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		ReleaseMain news = mock(ReleaseMain.class);
		cnwNewsModel.setNews(news);
		NewsReleases newsReleases = new NewsReleases();
		newsReleases.setMatchingCount("645");
		when(news.getReleases()).thenReturn(newsReleases);
		cnwNewsModel.setSecondBreakPt(20);
		cnwNewsModel.setCurPage(12);

		Method setPaginationMethod = cnwNewsModel.getClass().getDeclaredMethod("setPagination");
		setPaginationMethod.setAccessible(true);
		setPaginationMethod.invoke(cnwNewsModel);

		// expect list size =
		// {(curPage + 2) - (curPage - 2) + 1} <<-- for loop
		// + 1<<-- last item
		assertEquals(6, cnwNewsModel.getPageItems().size());

	}

	@Test
	public void testSetPaginationZeroPages() throws NoSuchMethodException, SecurityException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException {
		ReleaseMain news = mock(ReleaseMain.class);
		cnwNewsModel.setNews(news);
		NewsReleases newsReleases = new NewsReleases();
		newsReleases.setMatchingCount("0");
		when(news.getReleases()).thenReturn(newsReleases);

		Method setPaginationMethod = cnwNewsModel.getClass().getDeclaredMethod("setPagination");
		setPaginationMethod.setAccessible(true);
		setPaginationMethod.invoke(cnwNewsModel);
		assertEquals(0, cnwNewsModel.getTotalPages());
	}

	@Test
	public void testGetFullURL() {
		when(request.getRequestURL()).thenReturn(new StringBuffer(DUMMY_URL));
		assertEquals((DUMMY_URL + "?vgnLocale=" + CANADA_LOCALE), cnwNewsModel.getFullURL());
	}

}
