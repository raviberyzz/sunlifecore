/**
 * 
 */
package ca.sunlife.web.cms.core.servlets;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.ServletException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import ca.sunlife.web.cms.core.services.MailService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * @author mo92
 *
 */
@ ExtendWith (AemContextExtension.class)
public class EmailServletTest {

	@ Mock
	private SlingHttpServletRequest request;
	
	@ Mock
	private SlingHttpServletResponse response;
	
	@ Mock
	private MailService mailService;
	
	@ InjectMocks
	private EmailServlet emailServlet;
	
	@ BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);
  }
	
	@ Test
  void testDoPost() throws JSONException, ServletException, IOException {
		String jsonRes = "{\"url\" : \"val\"}";
		JSONObject json = new JSONObject();
		json.put("type", "url");
		json.put("url", "/home");
		StringWriter stringWriter = new StringWriter();
    PrintWriter writer = new PrintWriter(stringWriter);
    when(response.getWriter()).thenReturn(writer);
		when(mailService.processHttpRequest(request)).thenReturn(json);
		emailServlet.doPost(request, response);
		writer.flush();
		assertTrue(response.getStatus() == 0);
		json.put("type", "json");
		json.put("response", jsonRes);
		emailServlet.doPost(request, response);
		writer.flush();
		assertEquals(jsonRes, stringWriter.toString());
	}
}
