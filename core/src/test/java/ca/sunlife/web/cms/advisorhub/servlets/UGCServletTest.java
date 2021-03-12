package ca.sunlife.web.cms.advisorhub.servlets;

import static org.mockito.Mockito.when;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestPathInfo;
import org.apache.sling.api.resource.ResourceResolver;
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
import ca.sunlife.web.cms.advisorhub.services.UGCService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * The Class UGCServletTest.
 */
@ ExtendWith (AemContextExtension.class)
public class UGCServletTest {

	/** The request. */
	@ Mock
	private SlingHttpServletRequest request;
	
	/** The response. */
	@ Mock
	private SlingHttpServletResponse response;
	
	/** The request path info. */
	@Mock
	private RequestPathInfo requestPathInfo;
	
	/** The resourceResolver. */
	@ Mock
	private ResourceResolver resourceResolver;
	
	/** The ugc service. */
	@Mock
	private UGCService ugcService;
	
	/** The ugc servlet. */
	@ InjectMocks
	private UGCServlet ugcServlet;
	
	/**
	 * Setup.
	 */
	@ BeforeEach
	void setup() {
      MockitoAnnotations.initMocks(this);
	}
	
	/**
	 * Test do get.
	 * @throws IOException 
	 * @throws SystemException 
	 * @throws ApplicationException 
	 * @throws ServletException 
	 */
	@ Test
	void testDoGetAndDoPost() throws ApplicationException, SystemException, IOException, ServletException {
		StringWriter stringWriter = new StringWriter();
	    PrintWriter writer = new PrintWriter(stringWriter);
	    String url = "/bin/test";
	    String[] selectors = {url,url};
	    Map<String, String[]> params = new HashMap<>();
	    UserInfo mockUserInfoModel = Mockito.mock(UserInfo.class);
	    when(request.getResourceResolver()).thenReturn(resourceResolver);
	    when(response.getWriter()).thenReturn(writer);
	    when(request.getRequestPathInfo()).thenReturn(requestPathInfo);
	    when(requestPathInfo.getSelectors()).thenReturn(selectors);
	    when(mockUserInfoModel.getProfile()).thenReturn("userProfile");
	    when(request.getParameterMap()).thenReturn(params);
	    when(ugcService.callWebService(request.getRequestPathInfo().getSelectors()[1], "GET", mockUserInfoModel, request.getParameterMap(), null)).thenReturn("serviceResponse");
	    ugcServlet.doGet(request, response);
	    when(request.getReader()).thenReturn(null);
	    ugcServlet.doPost(request, response);
	}
}