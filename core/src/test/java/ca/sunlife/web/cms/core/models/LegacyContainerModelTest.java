package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.services.SiteConfigService;

public class LegacyContainerModelTest {

	@InjectMocks
	private LegacyContainerModel legacyContainerModel;
	 @ Mock
	 private Page currentPage;
	 @ Mock
	 private SiteConfigService configService;
	 @ Mock
	 private SlingHttpServletRequest request;
	private final static String PAGE_PATH = "/content/sunlife/external/ca/en/home";
	private final static String SITE_SELECTOR = "uk";
	@BeforeEach
	void setup()  {
		MockitoAnnotations.initMocks(this);
	}
	public void setInitData() throws LoginException, RepositoryException {
		 when(currentPage.getPath( )).thenReturn(PAGE_PATH);
	 when(configService.getConfigValues(SITE_SELECTOR, PAGE_PATH)).thenReturn(SITE_SELECTOR);
	 
	 }
	@ Test
	void testInit() throws LoginException, RepositoryException {
		legacyContainerModel.initModel();
		}
	@Test
	void testgetRequest() {
		legacyContainerModel.setRequest(request);
		assertNotNull(legacyContainerModel.getRequest());
	}
	
	@Test
	void testgetSiteSelector() {
		legacyContainerModel.setSiteSelector("uk");
		assertEquals(legacyContainerModel.getSiteSelector() , "uk");
	}
	
	@Test
	void testType() {
		legacyContainerModel.setType("type");
		assertEquals(legacyContainerModel.getType() , "type");
	}
}
