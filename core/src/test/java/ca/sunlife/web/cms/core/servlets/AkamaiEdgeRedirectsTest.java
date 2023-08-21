/**
 * 
 */
package ca.sunlife.web.cms.core.servlets;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

import javax.jcr.RepositoryException;
import javax.servlet.ServletException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * @author mo92
 *
 */
@ ExtendWith (AemContextExtension.class)
public class AkamaiEdgeRedirectsTest {

	@ Mock
	private SlingHttpServletRequest request;
	
	@ Mock
	private SlingHttpServletResponse response;
	
	@ InjectMocks
	private AkamaiEdgeRedirects akamaiEdgeRedirects;
	
	@ Mock
	private ResourceResolver resourceResolver;
	
	@ Mock
	private transient ca.sunlife.web.cms.core.services.AkamaiEdgeRedirects service;
	
	@ BeforeEach
	void setup() {
      MockitoAnnotations.initMocks(this);
	}
	
	@ Test
	void testDoPost() throws RepositoryException, LoginException, IOException, ServletException, JSONException {
		StringWriter stringWriter = new StringWriter();
    PrintWriter writer = new PrintWriter(stringWriter);
    when(response.getWriter()).thenReturn(writer);
		when(request.getParameter("policyID")).thenReturn("12222");
		when(request.getParameter("rules")).thenReturn("rule2");
		when(request.getResourceResolver()).thenReturn(resourceResolver);
		JSONObject json = new JSONObject();
		json.put("url", "/en/home");
		when(service.publishRules("12222", "rule2", "anonymous")).thenReturn(json);
		akamaiEdgeRedirects.doPost(request, response);
		writer.flush();
		assertEquals("{\"url\":\"/en/home\"}", stringWriter.toString());
	}
}
