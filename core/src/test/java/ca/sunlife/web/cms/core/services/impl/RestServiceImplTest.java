package ca.sunlife.web.cms.core.services.impl;

import org.apache.http.Header;
import org.apache.http.StatusLine;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.entity.InputStreamEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Matchers;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junit.framework.Assert;

@ExtendWith(AemContextExtension.class)
class RestServiceImplTest{
	private RestServiceImpl restServiceImpl = new RestServiceImpl();

	

	@Test
	void testCallGetWebService() throws IOException {
		
		String url = "https://www.sunlife.ca/";

		String testResponse = restServiceImpl.callGetWebService(url);
		
	    Assert.assertTrue(testResponse.contains("<title>Sun Life | Life Insurance, Investments & Group Benefits</title>"));

	}

}
