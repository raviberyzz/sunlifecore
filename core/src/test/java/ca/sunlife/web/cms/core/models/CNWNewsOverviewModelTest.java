package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.Locale;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.services.CNWNewsService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import uk.org.lidalia.slf4jtest.TestLogger;
import uk.org.lidalia.slf4jtest.TestLoggerFactory;

@ExtendWith(AemContextExtension.class)
public class CNWNewsOverviewModelTest {
	@Mock
	private Page currentPage;

	@Mock
	private CNWNewsService newsService;

	@InjectMocks
	private CNWNewsOverviewModel cnwNewsOverviewModel;

	@BeforeEach
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		when(currentPage.getLanguage()).thenReturn(new Locale("en", "CANADA"));
	}
/*
	@Test
	void testInit() throws IOException {
		when(newsService.getCNWNewsOverview()).thenReturn(
				"{\"releases\":{\"release\":[{\"id\":\"1\",\"headline\":\"headline\",\"releaseDate\":\"Sun, 03 Mar 2012 19:12:19 -0500\",\"summary\":\"summary\",\"body\":\"body\"},{\"id\":2,\"headline\":\"short headline\",\"releaseDate\":\"Mon, 10 Feb 2020 10:45:23 -0500\",\"summary\":\"short summary\",\"body\":\"body content\"}],\"latestModified\":null,\"matching_count\":null,\"returned_count\":null}}");
		cnwNewsOverviewModel.init();

		assertEquals("March 03, 2012",
				cnwNewsOverviewModel.getReleaseMain().getReleases().getRelease().get(0).getReleaseDate());
		assertEquals("February 10, 2020",
				cnwNewsOverviewModel.getReleaseMain().getReleases().getRelease().get(1).getReleaseDate());
	}

	@Test
	void testInitParseError() throws IOException {
		TestLogger logger = TestLoggerFactory.getTestLogger(cnwNewsOverviewModel.getClass());

		// incorrect date format
		when(newsService.getCNWNewsOverview()).thenReturn(
				"{\"releases\":{\"release\":[{\"id\":\"1\",\"headline\":\"headline\",\"releaseDate\":\"31/12/2019 10:12:30\",\"summary\":\"summary\",\"body\":\"body\"}],\"latestModified\":null,\"matching_count\":null,\"returned_count\":null}}");
		cnwNewsOverviewModel.init();

		boolean logHasParseerror = Utils.getLogMessageFlag(logger.getLoggingEvents(),
				"Error :: parsing the release date");
		assertTrue(logHasParseerror);
	}*/
}
