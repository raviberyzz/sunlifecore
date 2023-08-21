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

public class LegacyLayoutContainerModelTest {

	@InjectMocks
	private LegacyLayoutContainerModel legacyLayoutContainerModel;
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
		setInitData();
		legacyLayoutContainerModel.initModel();
		}
	
	@Test
	void testgetRequest() {
		legacyLayoutContainerModel.setRequest(request);
		assertNotNull(legacyLayoutContainerModel.getRequest());
	}
	
	@Test
	void testgetSiteSelector() {
		legacyLayoutContainerModel.setSiteSelector("uk");
		assertEquals(legacyLayoutContainerModel.getSiteSelector() , "uk");
	}
	
	@Test
	void testType() {
		legacyLayoutContainerModel.setType("type");
		assertEquals(legacyLayoutContainerModel.getType() , "type");
	}
}
