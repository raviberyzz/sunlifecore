package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.io.IOException;
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

import ca.sunlife.web.cms.core.services.CNWNewsService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import uk.org.lidalia.slf4jtest.LoggingEvent;
import uk.org.lidalia.slf4jtest.TestLogger;
import uk.org.lidalia.slf4jtest.TestLoggerFactory;

@ExtendWith(AemContextExtension.class)
public class CNWNewsDetailsModelTest {
	@Mock
	private Page currentPage;
	@Mock
	private SlingHttpServletRequest request;
	@Mock
	private CNWNewsService newsService;

	@InjectMocks
	private CNWNewsDetailsModel cnwNewsDetailsModel;

	@BeforeEach
	public void setup() {
		MockitoAnnotations.initMocks(this);
		when(currentPage.getLanguage()).thenReturn(new Locale("en", "CANADA"));
	}
/*
	@Test
	public void testInit() throws IOException {
		when(newsService.getCNWNewsDetails(ArgumentMatchers.anyString())).thenReturn(
				"{\"release\":{\"id\":\"1\",\"headline\":\"headlines\",\"releaseDate\":\"Wed, 05 Feb 2020 10:18:21 Eastern Standard Time\",\"summary\":\"short summary\",\"body\":\"body content\"}}");
		cnwNewsDetailsModel.init();
		assertEquals("February 05, 2020", cnwNewsDetailsModel.getNewsDetails().getRelease().getReleaseDate());
	}

	@Test
	public void testInitIOException() throws IOException {
		TestLogger logger = TestLoggerFactory.getTestLogger(cnwNewsDetailsModel.getClass());

		when(newsService.getCNWNewsDetails(ArgumentMatchers.anyString())).thenThrow(IOException.class);
		cnwNewsDetailsModel.init();

		boolean logHasIOException = Utils.getLogMessageFlag(logger.getLoggingEvents(),
				"Error :: NWNewsDetailsModel :: init :: IOException :: {}");
		assertTrue(logHasIOException);
	}

	@Test
	public void testInitParseException() throws IOException {
		TestLogger logger = TestLoggerFactory.getTestLogger(cnwNewsDetailsModel.getClass());

		// incorrect Date format
		when(newsService.getCNWNewsDetails(ArgumentMatchers.anyString())).thenReturn(
				"{\"release\":{\"id\":\"1\",\"headline\":\"headlines\",\"releaseDate\":\"03/12/2018 08:32:43 AM\",\"summary\":\"short summary\",\"body\":\"body content\"}}");
		cnwNewsDetailsModel.init();

		boolean logHasParseError = Utils.getLogMessageFlag(logger.getLoggingEvents(),
				"Error :: CNWNewsDetailsModel :: init :: ParseException :: {}");
		assertTrue(logHasParseError);
	}
*/
	@Test
	public void testInitException() {
		TestLogger logger = TestLoggerFactory.getTestLogger(cnwNewsDetailsModel.getClass());

		// not initializing fields to get Null Pointer Exception
		cnwNewsDetailsModel.init();

		boolean logHasException = Utils.getLogMessageFlag(logger.getLoggingEvents(),
				"Error :: CNWNewsDetailsModel :: init :: Exception :: {}");
		assertTrue(logHasException);
	}
}
