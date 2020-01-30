/**
 * 
 */
package ca.sunlife.web.cms.core.services.impl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.impl.client.HttpClientBuilder;
import org.osgi.service.component.annotations.Component;

import ca.sunlife.web.cms.core.services.RestService;

/**
 * @author mo92
 *
 * The Class RestServiceImpl.
 */
@Component(service = RestService.class, immediate = true)
public class RestServiceImpl implements RestService {
	
	public static final int TIMEOUT = 10000; // Needs to be checked
	
	/* (non-Javadoc)
	 * @see ca.sunlife.web.cms.core.services.RestService#callGetWebService(java.lang.String)
	 */
	@Override
	public String callGetWebService(String url) throws IOException {
		int timeout = 5;
		RequestConfig config = RequestConfig.custom()
				.setConnectTimeout(timeout * TIMEOUT)
				.setConnectionRequestTimeout(timeout * TIMEOUT)
				.setSocketTimeout(timeout * TIMEOUT).build();
		
		HttpClient client = HttpClientBuilder.create().setDefaultRequestConfig(config).build();
		HttpUriRequest httpUriRequest = new HttpGet(url);

		HttpResponse response = client.execute(httpUriRequest);

		if (response.getStatusLine().getStatusCode() == 200) {
			try (BufferedReader in = new BufferedReader(
					new InputStreamReader(response.getEntity().getContent(), "UTF-8"))) {
				String inputLine;
				StringBuilder responseStr = new StringBuilder();
				while ((inputLine = in.readLine()) != null) {
					responseStr.append(inputLine);
				}
				return responseStr.toString();
			}
		}
		return null;
	
	}

}
