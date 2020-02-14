package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
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

import ca.sunlife.web.cms.core.beans.ReleaseMain;
import ca.sunlife.web.cms.core.services.CNWNewsService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class CNWNewsOverviewModelTest {
	@Mock
	private Page currentPage;
	@Mock
	private CNWNewsService newsService;

	@InjectMocks
	private CNWNewsOverviewModel cnwNewsOverviewModel;

	@BeforeEach
	public void setUp() throws IOException {
		MockitoAnnotations.initMocks(this);
		when(currentPage.getLanguage()).thenReturn(TestUtils.CANADA_LOCALE);
	}

	@Test
	void testInit() throws IOException {
		// releaseMain should be null initially
		cnwNewsOverviewModel.init();
		assertNull(cnwNewsOverviewModel.getReleaseMain());

		// releaseMain should NOT be null in below case
		when(newsService.getCNWNewsOverview(TestUtils.CANADA_LOCALE.getLanguage())).thenReturn(new ReleaseMain());
		cnwNewsOverviewModel.init();
		assertNotNull(cnwNewsOverviewModel.getReleaseMain());
	}

}
