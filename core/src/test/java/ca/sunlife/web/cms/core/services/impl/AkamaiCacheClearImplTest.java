/**
 * 
 */
package ca.sunlife.web.cms.core.services.impl;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.lang.annotation.Annotation;

import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.day.cq.wcm.commons.ReferenceSearch;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.osgi.config.AkamaiConfig;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * @author mo92 The class
 *         AkamaiCacheClearImplTest.
 */
@ ExtendWith(AemContextExtension.class)
public class AkamaiCacheClearImplTest {

	@ Mock
	private AkamaiConfig akamaiConfig;

	@ InjectMocks
	private AkamaiCacheClearImpl akamaiCacheClearImpl;

	@ Mock
	private SiteConfigService configService;
	
	@ Mock
	private CoreResourceResolver coreResourceResolver;
	
	@ Mock
	private ResourceResolver resourceResolver;
	
	@ Mock
	private Resource resource;
	
	@ Mock
	private ValueMap valueMap;
	
	@ Mock
	private ReferenceSearch referenceSearch;
	
	public final static String[] pages = new String[] {"page1"};
	
	public static final String DOMAIN = "aem.com";
	
	@ BeforeEach
	void setup() {
		MockitoAnnotations.initMocks(this);
		akamaiConfig = new AkamaiConfig() {
			
			@ Override
			public Class<? extends Annotation> annotationType() {
				return null;
			}
			
			@ Override
			public String getHost() {
				return DOMAIN;
			}
			
			@ Override
			public String getClientToken() {
				return "12222";
			}
			
			@ Override
			public String getClientSecret() {
				return "de2323dd302ufoflaruiyewr3";
			}
			
			@ Override
			public String getAccessKey() {
				return "adk$~!hkfd2fjro49+_#@";
			}
		};
	}
	
	@ Test
	void testInvalidatePages() {
		akamaiCacheClearImpl.activate(akamaiConfig);
		try {
			when(configService.getConfigValues("domain", "page1")).thenReturn(DOMAIN);
			when(configService.getPageUrl(ArgumentMatchers.anyString( ))).thenReturn("/content/page");
			System.out.println(akamaiCacheClearImpl.invalidatePages(pages));
		} catch (ApplicationException | LoginException | RepositoryException e) {
			assertTrue(e instanceof ApplicationException | e instanceof LoginException);
		}
	}
	
}
