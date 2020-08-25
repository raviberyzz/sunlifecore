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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import ca.sunlife.web.cms.core.services.SiteConfigService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * @author mo92
 *
 */
@ ExtendWith (AemContextExtension.class)
public class SiteConfigServletTest {

	@ Mock
	private SlingHttpServletRequest request;
	
	@ Mock
	private SlingHttpServletResponse response;
	
	@ InjectMocks
	private SiteConfigServlet configServlet;
	
	@ Mock
	private SiteConfigService configService;
	
	@ BeforeEach
	void setup() {
      MockitoAnnotations.initMocks(this);
	}
	
	@ Test
	void testDoGet() throws RepositoryException, LoginException, IOException, ServletException {
		StringWriter stringWriter = new StringWriter();
    PrintWriter writer = new PrintWriter(stringWriter);
    when(response.getWriter()).thenReturn(writer);
		when(request.getParameter("param")).thenReturn("domain");
		when(request.getParameter("path")).thenReturn("/en/home");
		when(configService.getConfigValues("domain", "/en/home")).thenReturn("testval");
		configServlet.doGet(request, response);
		writer.flush();
		assertEquals("The value is: testval", stringWriter.toString());
	}
	
}
