/**
 *
 */
package ca.sunlife.web.cms.core.services.impl;

import java.io.IOException;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;

import org.apache.commons.httpclient.HttpStatus;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.util.EntityUtils;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.ErrorCodes;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.osgi.config.RestClientConfig;
import ca.sunlife.web.cms.core.services.RestService;

/**
 * The Class RestServiceImpl.
 *
 * @author mo92 The Class RestServiceImpl.
 */
@ Component (service = RestService.class , immediate = true)
@ Designate (ocd = RestClientConfig.class)
public class RestServiceImpl implements RestService {

  /** The log. */
  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  /** Http Client. */
  private CloseableHttpClient client;

  /**
   * Activate.
   *
   * @param clientConfig
   *          the client config
   * @throws KeyManagementException
   *           the key management exception
   * @throws NoSuchAlgorithmException
   *           the no such algorithm exception
   * @throws KeyStoreException
   *           the key store exception
   */
  @ Activate
  public void activate(final RestClientConfig clientConfig)
      throws KeyManagementException , NoSuchAlgorithmException , KeyStoreException {
    logger.debug(
        "Entry :: RestClientConfig params: activate method :: Socket timeout: {}, Conn timeout: {}",
        clientConfig.getSocketTimeout(), clientConfig.getConnectionTimeout());
    final RequestConfig config = RequestConfig.custom()
        .setConnectTimeout(clientConfig.getConnectionTimeout())
        .setConnectionRequestTimeout(clientConfig.getConnectionTimeout())
        .setSocketTimeout(clientConfig.getSocketTimeout()).build();
    final HttpClientBuilder httpClientBuilder = HttpClients.custom();
    httpClientBuilder.setDefaultRequestConfig(config);
    if (clientConfig.isSSLByPassRequired()) {
      setSSLForTestEnvironment(httpClientBuilder);
    }
    client = httpClientBuilder.build();
    logger.debug("Exit :: RestClientConfig :: config :: {}", config);
  }

  /**
   * Sets the SSL for test environment.
   *
   * @param httpClientBuilder
   *          the new SSL for test environment
   * @throws KeyManagementException
   *           the key management exception
   * @throws NoSuchAlgorithmException
   *           the no such algorithm exception
   * @throws KeyStoreException
   *           the key store exception
   */
  public static void setSSLForTestEnvironment(final HttpClientBuilder httpClientBuilder)
      throws KeyManagementException , NoSuchAlgorithmException , KeyStoreException {
    httpClientBuilder.setSSLHostnameVerifier(NoopHostnameVerifier.INSTANCE)
        .setSSLContext(new SSLContextBuilder().loadTrustMaterial((arg0 , arg1) -> true).build());
  }

  /*
   * (non-Javadoc)
   * @see ca.sunlife.web.cms.core.services.RestService#callGetWebService(java.lang. String)
   */
  @ Override
  public String callGetWebService(final String url)
      throws ApplicationException , SystemException , IOException {
    logger.debug("Entry :: RestServiceImpl :: callGetWebService :: url :: {}", url);
    CloseableHttpResponse response = null;
    int statusCode;
    String responseStr = null;
    try {
      final HttpGet httpGet = new HttpGet(url);
      response = client.execute(httpGet);
      statusCode = response.getStatusLine().getStatusCode();
      logger.debug("Response code :: {}", statusCode);
      if (statusCode != HttpStatus.SC_OK) {
        throw new SystemException(ErrorCodes.APP_ERROR_001);
      } else {
        responseStr = EntityUtils.toString(response.getEntity());
      }
    } finally {
      if (null != response) {
        response.close();
      }
    }
    return responseStr;
  }
}
