/**
 * 
 */
package ca.sunlife.web.cms.core.services.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.lang.annotation.Annotation;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.osgi.config.ProviderProfileConfig;
import ca.sunlife.web.cms.core.services.RestService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * The class
 * ProviderProfileServiceImplTest.
 */
@ ExtendWith(AemContextExtension.class)
public class ProviderProfileServiceImplTest {

	/**
	 * Mock RestService.
	 */
	@ Mock
	private RestService restService;

	/**
	 * Mock ProviderProfileConfig.
	 */
	@ Mock
	private ProviderProfileConfig providerProfileConfig;
	
	/**
	 * ProviderProfileServiceImpl.
	 */
	@ InjectMocks
	private ProviderProfileServiceImpl profileServiceImpl;

	/**
	 * Initial setup before each
	 * test method.
	 */
	@ BeforeEach
	void setup() {
		MockitoAnnotations.initMocks(this);
		providerProfileConfig = new ProviderProfileConfig() {
			
			@Override
			public Class<? extends Annotation> annotationType() {
				return null;
			}
			
			@Override
			public String getProviderProfileServiceUrl() {
				return "/providerProfile";
			}
			
			@Override
			public String[] getProviderProfileServiceParameters() {
				return null;
			}
		};
	}
	
	/**
	 * Tests activate method.
	 */
	@ Test
	void activateTest() {
		profileServiceImpl.activate(providerProfileConfig);
	}

	/**
	 * Tests getProviderProfile method.
	 */
	@ Test
	void testGetProviderProfile() {
		try {
			profileServiceImpl.activate(providerProfileConfig);
			when(restService.callGetWebService("/providerProfile?providerId=120000&locale=en_CA", null)).thenReturn("{\"providerId\":\"10000\"}");
			assertEquals("<p>10000</p>", profileServiceImpl.getProviderProfile("en_CA", "providerId|120000", "<p>{{providerId}}</p>"));
		} catch (ApplicationException | SystemException | IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * Tests getProviderProfile method when exception.
	 */
	@ Test
	void testGetProviderProfileWhenException() {
		try {
			profileServiceImpl.activate(providerProfileConfig);
			when(restService.callGetWebService("/providerProfile?providerId=120000&locale=en_CA", null)).thenThrow(new ApplicationException());
			profileServiceImpl.getProviderProfile("en_CA", "providerId|120000", "<p>{{providerId}}</p>");
		} catch (ApplicationException | SystemException | IOException e) {
			assertTrue(e instanceof ApplicationException);
		}
	}
}
