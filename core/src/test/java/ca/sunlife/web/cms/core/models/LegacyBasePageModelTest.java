package ca.sunlife.web.cms.core.models;

import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.WCMMode;

import ca.sunlife.web.cms.core.services.SiteConfigService;


public class LegacyBasePageModelTest {
	
	@InjectMocks
	private LegacyBasePageModel legacyBasePageModel;
	  @ Mock
	  private Page currentPage;
	  @ Mock
	  private SiteConfigService configService;
	  @ Mock
	  private SlingHttpServletRequest request;
	
	private final static String PAGE_PATH = "/content/sunlife/external/ca/en/home";
	private final static String SITE_SELECTOR = "uk";
	@ BeforeEach
	void setup()  {
		MockitoAnnotations.initMocks(this);
	}
	
	 public void setInitData() throws LoginException, RepositoryException {
		 when(currentPage.getPath( )).thenReturn(PAGE_PATH);
	 when(configService.getConfigValues(SITE_SELECTOR, PAGE_PATH)).thenReturn(SITE_SELECTOR);
	 when(WCMMode.fromRequest(request)).thenReturn(WCMMode.PREVIEW);
	 }
	
	@ Test
	void testInit() throws LoginException, RepositoryException {
		setInitData();
		legacyBasePageModel.init();
		when(WCMMode.fromRequest(request)).thenReturn(WCMMode.EDIT);
		legacyBasePageModel.init();
		when(WCMMode.fromRequest(request)).thenReturn(WCMMode.DESIGN);
		legacyBasePageModel.init();
	}
	@Test
	void testRequest() {
		legacyBasePageModel.setRequest(request);
		assertNotNull(legacyBasePageModel.getRequest());
	}
	@Test
	void testSiteSelector() {
		legacyBasePageModel.setSiteSelector("selector");
		assertEquals(legacyBasePageModel.getSiteSelector() , "selector");
	}
}
