package ca.sunlife.web.cms.advisorhub.models;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.day.cq.wcm.api.Page;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.SiteConfigService;

public class OutageModelTest {
	
	/**
	 * The current page mock.
	 */
	@ Mock
	private Page currentPage;

	/**
	 * The core resource resolver
	 * mock.
	 */
	@ Mock
	private CoreResourceResolver coreResourceResolver;

	/**
	 * The resource resolver mock.
	 */
	@ Mock
	private ResourceResolver resourceResolver;
	
	/**
	 * The outagee resource mock.
	 */
	@ Mock
	private Resource outageResource;
	
	/**
	 * The outagee model mock.
	 */
	@ InjectMocks
	private OutageModel outageModel;
	
	/** The fragment path. */
	private static final String FRAGMENT = "/content/dam/sunlife/external/advisorhub/en/fragment1/";

	/** The config service. */
	@ Mock
	private SiteConfigService configService;
	
	/**
	 * Tests init method when
	 * fragment path is not
	 * specified.
	 */
	@ BeforeEach
	void setup() {
      MockitoAnnotations.initMocks(this);
	}
	/**
	 * Tests init method.
	 */
	@ Test
	void testInit() {
		String pagePath = "/content/sunlife/external/advisorhub/en/home";
		outageModel.setFragmentPath(FRAGMENT);
		try {
			when(configService.getConfigValues("outageDateFormat", pagePath)).thenReturn("dd/MM/yyyy");
			when(configService.getConfigValues("pageLocale", pagePath)).thenReturn("en_CA");
			when(coreResourceResolver.getResourceResolver()).thenReturn(resourceResolver);
			when(resourceResolver.getResource(outageModel.getFragmentPath())).thenReturn(outageResource);
		} catch (LoginException | RepositoryException e) {
			assertTrue(e instanceof LoginException);
		}
	}


}
