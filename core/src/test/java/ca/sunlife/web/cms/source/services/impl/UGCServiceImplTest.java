package ca.sunlife.web.cms.source.services.impl;

import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.models.UserInfo;
import ca.sunlife.web.cms.core.services.RestService;
import ca.sunlife.web.cms.source.osgi.config.UGCConfig;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * The Class UGCServiceImplTest.
 */
@ ExtendWith (AemContextExtension.class)
public class UGCServiceImplTest {

	/** The rest service. */
	@ Mock
	private RestService restService;
	
	/** The ugc config. */
	@Mock
	private UGCConfig ugcConfig;
	
	@ InjectMocks
	private UGCServiceImpl ugcServiceImpl;
	
	/**
	 * Setup.
	 */
	@ BeforeEach
	void setup() {
      MockitoAnnotations.initMocks(this);
	}
	
	/**
	 * Test call web service.
	 * @throws IOException 
	 * @throws SystemException 
	 * @throws ApplicationException 
	 */
	@ Test
	void testCallWebService() throws ApplicationException, SystemException, IOException {
		String url = "/bin/test";
		Map<String, String[]> requestParams = new HashMap<>();
		String[] value = {"value"};
		String[] services = {"/bin/test~/bin/test","/bin/test~/bin/test"};
		requestParams.put("key",value);
		UserInfo mockUserInfoModel = Mockito.mock(UserInfo.class);
//		when(mockUserInfoModel.getAcf2Id()).thenReturn("test");
//		when(mockUserInfoModel.getUserName()).thenReturn("test");
//		when(mockUserInfoModel.getEmail()).thenReturn("test@test.com");
		when(ugcConfig.getUGCServices()).thenReturn(services);
		when(ugcConfig.getUGCServiceDomain()).thenReturn(url);
		when(ugcConfig.getAuthToken()).thenReturn("authToken");
		when(ugcConfig.getUGCServiceSite()).thenReturn("servicesite");
		ugcServiceImpl.activate(ugcConfig);	
		when(restService.callGetWebService(url, url)).thenReturn("get service response");
		ugcServiceImpl.callWebService(url, "GET", mockUserInfoModel, requestParams, null);
		ugcServiceImpl.callWebService(url, "POST", mockUserInfoModel, requestParams, null);
	}
}
