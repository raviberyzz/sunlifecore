package ca.sunlife.web.cms.core.services.impl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.impl.client.HttpClientBuilder;
import org.osgi.service.component.annotations.Component;

import ca.sunlife.web.cms.core.services.CNWNewsService;

@Component(service = CNWNewsService.class, immediate = true)
public class CNWNewsServiceImpl implements CNWNewsService {

	@Override
	public String getCnwNews(String url) throws IOException {
		HttpClient client = HttpClientBuilder.create().build();
		HttpUriRequest httpUriRequest = new HttpGet(url);

		HttpResponse response = client.execute(httpUriRequest);

		if(response.getStatusLine().getStatusCode() == 200) {
			try (BufferedReader in = new BufferedReader(new InputStreamReader(response.getEntity().getContent(), "UTF-8")) ) {
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
