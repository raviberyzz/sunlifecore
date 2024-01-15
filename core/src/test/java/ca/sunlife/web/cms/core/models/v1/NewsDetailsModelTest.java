package ca.sunlife.web.cms.core.models.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.text.ParseException;

import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.request.RequestPathInfo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.beans.NewsDetails;
import ca.sunlife.web.cms.core.beans.Release;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.services.CNWNewsService;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class NewsDetailsModelTest {
	private final String releaseId = "123047";
	private final String[] DUMMY_STRING_ARRAY = { releaseId, "string", "array" };

	@Mock
	private Page currentPage;

	@Mock
	private SlingHttpServletRequest request;
	
	@Mock
	private RequestPathInfo requestPathInfo;

	@Mock
	private CNWNewsService newsService;

	@Mock
	private NewsDetails newsDetails;
	

	@Mock
	private Release release;

	@InjectMocks
	private NewsDetailsModel cnwNewsDetailsModel;

	@Mock
	private SiteConfigService configService;

	@BeforeEach
	public void setup() {
		MockitoAnnotations.initMocks(this);
		try {
			Mockito.when(configService.getConfigValues("pageLocale", currentPage.getPath())).thenReturn("en_CA");
			Mockito.when(newsService.getCNWNewsDetails(Mockito.anyString(), Mockito.anyString()))
					.thenReturn(newsDetails);
			Mockito.when(newsDetails.getRelease()).thenReturn(release);
			//Mockito.when(release.getId()).thenReturn(releaseId);
			Mockito.when(cnwNewsDetailsModel.getSpacing()).thenReturn("22");
			Mockito.when(cnwNewsDetailsModel.getAccessibilityLabel()).thenReturn("aria-label");
			Mockito.when(request.getRequestPathInfo()).thenReturn(requestPathInfo);
			Mockito.when(request.getRequestPathInfo().getSelectors()).thenReturn(DUMMY_STRING_ARRAY);
			//	Mockito.when(request.get)
			
			
		} catch (Exception e) {
			// Do nothing
		}
	}

	@Test
	public void testInit() throws IOException, ParseException, ApplicationException, SystemException {
	//	when(request.getRequestPathInfo()).thenReturn(TestUtils.getDummyRequestPathInfo(DUMMY_STRING_ARRAY));

		cnwNewsDetailsModel.init();
	//	assertEquals("22",cnwNewsDetailsModel.getSpacing());
		cnwNewsDetailsModel.getSpacing();
		cnwNewsDetailsModel.getAccessibilityLabel();
		//assertEquals("22",cnwNewsDetailsModel.getSpacing());
		assertEquals("123047", cnwNewsDetailsModel.getNewsDetails().getRelease().getId());
//		assertNull(cnwNewsDetailsModel.getNewsDetails());
//
//		cnwNewsDetailsModel.init();
	//	assertNotNull(cnwNewsDetailsModel.getNewsDetails());
	}

	@Test
	public void testInitException() {
		
		try {
			cnwNewsDetailsModel.init();
			Mockito.doThrow(new RepositoryException()).doNothing().when(newsService).getCNWNewsDetails(Mockito.anyString(),Mockito.any(String.class));
		} catch (IOException | ParseException | ApplicationException | SystemException exception) {
			assertTrue(exception instanceof NullPointerException);
		}
	}
}
