/**
 * 
 */
package ca.sunlife.web.cms.core.services.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.atLeastOnce;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.osgi.config.AdvisorWebServiceConfig;
import ca.sunlife.web.cms.core.services.RestService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * @author mo92 The Class AdvisorDetailServiceImplTest
 */
@ ExtendWith (AemContextExtension.class)
public class AdvisorDetailServiceImplTest {

  @ Mock
  private AdvisorWebServiceConfig advisorWebServiceConfig;

  @ InjectMocks
  private AdvisorDetailServiceImpl advisorDetailServiceImpl;

  @ Mock
  private RestService restService;

  @ BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);
    
	setUpConfig( );
  }

  void setUpConfig() {
	  when(advisorWebServiceConfig.getAdvisorPageDataUrl()).thenReturn("/advisor/getDetails");
	  advisorDetailServiceImpl.activate(advisorWebServiceConfig);
  }


  @ Test
  void testGetAdvisorDetails() throws Exception {

	String testData = loadTestData("AdvisorDetailServiceImpl.json");
	
    when(restService.callGetWebService(
        "/advisor/getDetails?language=EN&pageId=ADVISOR&encodedAdvisorId=1111111111111&clientVersion=1.0"))
            .thenReturn(testData);
    
    String resposeData = advisorDetailServiceImpl.getAdvisorDetails("en" , "ADVISOR" ,
        "1111111111111");
    verify(advisorWebServiceConfig, atLeastOnce()).getAdvisorPageDataUrl();
    verify(restService).callGetWebService(anyString());
    assertEquals(testData , resposeData);
  }

  @ Test
  void testGetAdvisorDetailsWhenExceptionOccurs()
      throws ApplicationException , SystemException , IOException {

    when(restService.callGetWebService(
        "/advisor/getDetails?language=EN&pageId=ADVISOR&encodedAdvisorId=1012220000&clientVersion=1.0"))
            .thenThrow(IOException.class);
      assertThrows(ApplicationException.class , () -> {
      advisorDetailServiceImpl.getAdvisorDetails("en" , "ADVISOR" , "1012220000");
    });
      verify(advisorWebServiceConfig, atLeastOnce()).getAdvisorPageDataUrl();
      verify(restService).callGetWebService(anyString());

  }
  
  private String loadTestData(String fileName) throws IOException {
	String testData;
	InputStream is = getClass().getClassLoader().getResourceAsStream(String.format("ca/sunlife/web/cms/core/services/impl/%s", fileName));
	InputStreamReader streamReader = new InputStreamReader(is, StandardCharsets.UTF_8);
	BufferedReader reader = new BufferedReader(streamReader);
	StringBuffer buffer = new StringBuffer();
	String line;
	while((line = reader.readLine()) != null) {
		buffer.append(line);
	}
	testData = buffer.toString();
	return testData;
  }

}


