package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

import java.io.IOException;

import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.constants.ProviderProfileConstants;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.ProviderProfileService;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * The class ProviderProfileModelTest.
 */
@ ExtendWith (AemContextExtension.class)
public class ProviderProfileModelTest {

	/**
	 * The current page.
	 */
	@ Mock
	private Page currentPage;

	/**
	 * The sling request.
	 */
	@ Mock
	private SlingHttpServletRequest request;
	
	/**
	 * The coreResourceResolver.
	 */
	@ Mock
	private CoreResourceResolver coreResourceResolver;
	
	/**
	 * The resourceResolver.
	 */
	@ Mock
	private ResourceResolver resourceResolver;
	
	/**
	 * The providerProfileResource.
	 */
	@ Mock
	private Resource providerProfileResource;
	
	/**
	 * The configService.
	 */
	@ Mock
	 private SiteConfigService configService;
	
	/**
	 * The providerProfileModel.
	 */
	@ InjectMocks
	private ProviderProfileModel providerProfileModel;

	/**
	 * The providerProfileService.
	 */
	@ Mock
	private ProviderProfileService providerProfileService;
	
	/**
	 * The valueMap.
	 */
	@ Mock
	private ValueMap valueMap;
	
	/** Fragment path. */
	private static final String FRAGMENT_PATH = "/content/dam/sunlife/content-fragments/mustach-template";
	
	/**
	 * The Constant
	 * JCR_CONTENT_DATA_MASTER.
	 */
	private static final String JCR_CONTENT_DATA_MASTER = "/jcr:content/data/master";
	
	@ BeforeEach
	public void setup() {
		MockitoAnnotations.initMocks(this);
	}
	
	@ Test
	void testInitWithFragmentPathIsNull() {
		providerProfileModel.init();
		assertNull(providerProfileModel.getProfileHTML());
	}
	
	@ Test
	void testInit() {
		providerProfileModel.setFragmentPath(FRAGMENT_PATH);
		when(currentPage.getPath()).thenReturn("/content/sunlife/external/ca/en/home");
		try {
			when(configService.getConfigValues("pageLocale", currentPage.getPath())).thenReturn("en_CA");
			when(coreResourceResolver.getResourceResolver()).thenReturn(resourceResolver);
			when(resourceResolver.getResource(FRAGMENT_PATH.concat(JCR_CONTENT_DATA_MASTER))).thenReturn(providerProfileResource);
			valueMap.put(ProviderProfileConstants.FRAGMENT_VAR_CONSTANT, "<p>{{providerName}}</p>");
			when(providerProfileResource.getValueMap()).thenReturn(valueMap);
			when(request.getParameter(ProviderProfileConstants.WEB_PARAM_CONSTANT)).thenReturn(null);
			when(providerProfileService.getProviderProfile("en_CA", request.getParameter(ProviderProfileConstants.WEB_PARAM_CONSTANT),
				                                                                                                                        valueMap.get(ProviderProfileConstants.FRAGMENT_VAR_CONSTANT, String.class))).thenReturn("<p>Name</p>");
			providerProfileModel.init();
			assertNull(providerProfileModel.getProfileHTML());
		} catch (LoginException e) {
			e.printStackTrace();
		} catch (RepositoryException e) {
			e.printStackTrace();
		} catch (ApplicationException e) {
			e.printStackTrace();
		} catch (SystemException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
