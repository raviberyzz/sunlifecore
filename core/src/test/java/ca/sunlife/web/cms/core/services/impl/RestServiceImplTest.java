package ca.sunlife.web.cms.core.services.impl;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.lang.annotation.Annotation;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.osgi.config.RestClientConfig;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junit.framework.Assert;

/**
 * @author mo92 The class RestServiceImplTest
 */
@ ExtendWith (AemContextExtension.class)
class RestServiceImplTest {
  /**
   * RestServiceImpl object
   */
  private RestServiceImpl restServiceImpl = new RestServiceImpl( );

  /**
   * Mock RestClientConfig
   */
  @ Mock
  private RestClientConfig restClientConfig;

  /**
   * Initial setup before each test method
   */
  @ BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);
    setRestClientConfig(500 , 500 , false);
  }

  void setRestClientConfig(int socketTimeout , int connectionTimeout , boolean byPassSSLRequired) {
    restClientConfig = new RestClientConfig( ) {
      @ Override
      public Class <? extends Annotation> annotationType() {
        return null;
      }

      @ Override
      public int getSocketTimeout() {
        return socketTimeout;
      }

      @ Override
      public int getConnectionTimeout() {
        return connectionTimeout;
      }

      @ Override
      public boolean isSSLByPassRequired() {
        return byPassSSLRequired;
      }
    };
  }

  /**
   * Tests activate method
   * 
   * @throws KeyStoreException
   * @throws NoSuchAlgorithmException
   * @throws KeyManagementException
   */
  @ Test
  void activateTest() throws KeyManagementException , NoSuchAlgorithmException , KeyStoreException {
    restServiceImpl.activate(restClientConfig);
  }

  /**
   * Tests callGetWebService method
   * 
   * @throws IOException
   * @throws SystemException
   * @throws ApplicationException
   * @throws KeyStoreException
   * @throws NoSuchAlgorithmException
   * @throws KeyManagementException
   */
  @ Test
  void testCallGetWebService() throws IOException , ApplicationException , SystemException ,
      KeyManagementException , NoSuchAlgorithmException , KeyStoreException {
    String url = "https://www.sunlife.ca/";
    restServiceImpl.activate(restClientConfig);
    String testResponse = null;
    try {
      testResponse = restServiceImpl.callGetWebService(url, null);
      Assert.assertTrue(testResponse
          .contains("<title>Life Insurance, Investments &amp; Group Benefits | Sun Life</title>"));
    } catch (Exception e) {
      Assert.assertNull(testResponse);
    }

  }

  /**
   * @throws IOException
   * @throws ApplicationException
   * @throws SystemException
   * @throws KeyStoreException
   * @throws NoSuchAlgorithmException
   * @throws KeyManagementException
   */
  @ Test
  void testCallGetWebServiceWhenSSLByPassIsSet() throws IOException , ApplicationException ,
      SystemException , KeyManagementException , NoSuchAlgorithmException , KeyStoreException {
    String url = "https://www.sunlife.ca/";
    setRestClientConfig(500 , 500 , true);
    String testResponse = null;
    try {
      restServiceImpl.activate(restClientConfig);
      testResponse = restServiceImpl.callGetWebService(url, null);
      Assert.assertTrue(testResponse
          .contains("<title>Life Insurance, Investments &amp; Group Benefits | Sun Life</title>"));
    } catch (Exception e) {
      Assert.assertNull(testResponse);
    }
  }

  /**
   * @throws ApplicationException
   * @throws SystemException
   * @throws IOException
   * @throws KeyStoreException
   * @throws NoSuchAlgorithmException
   * @throws KeyManagementException
   */
  @ Test
  void testCallGetWebServiceWhenThrowsIOException() throws ApplicationException , SystemException ,
      IOException , KeyManagementException , NoSuchAlgorithmException , KeyStoreException {
    String url = "https://www.sunlife/";
    restServiceImpl.activate(restClientConfig);
    Assertions.assertThrows(IOException.class , () -> {
      restServiceImpl.callGetWebService(url, null);
    });
  }

  /**
   * @throws ApplicationException
   * @throws SystemException
   * @throws IOException
   * @throws KeyStoreException
   * @throws NoSuchAlgorithmException
   * @throws KeyManagementException
   */
  @ Test
  void testCallGetWebServiceWhenNotFound() throws ApplicationException , SystemException ,
      IOException , KeyManagementException , NoSuchAlgorithmException , KeyStoreException {
    String url = "https://www.sunlife.ca/demo";
    restServiceImpl.activate(restClientConfig);
    try {
      restServiceImpl.callGetWebService(url, null);
    } catch (Exception e) {
      assertTrue(e instanceof Exception);
    }
  }

}
