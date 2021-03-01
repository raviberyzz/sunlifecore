package ca.sunlife.web.cms.advisorhub.servlets;

import static org.mockito.Mockito.when;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestPathInfo;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.day.cq.tagging.TagConstants;

import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.advisorhub.constants.FormsConstants;
import ca.sunlife.web.cms.advisorhub.osgi.config.FormsConfig;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import ca.sunlife.web.cms.advisorhub.servlets.FormsListingServlet;


/**
 * The Class FormsListingServletTest.
 */
@ ExtendWith (AemContextExtension.class)
public class FormsListingServletTest {
	
	/** The Constant JCR_CONTENT_DATA_MASTER. */
	private static final String JCR_CONTENT_DATA_MASTER = "/jcr:content/data/master";

	/** The Constant JCR_CONTENT_METADATA. */
	private static final String JCR_CONTENT_METADATA = "/jcr:content/metadata";
	
	/** The request. */
	@ Mock
	private SlingHttpServletRequest request;
	
	/** The response. */
	@ Mock
	private SlingHttpServletResponse response;
	
	/** The request path info. */
	@Mock
	private RequestPathInfo requestPathInfo;
	
	/** The core resource resolver. */
	@ Mock
	private CoreResourceResolver coreResourceResolver;
	
	/** The resolver. */
	@ Mock
	private ResourceResolver resolver;
	
	/** The forms listing servlet. */
	@ InjectMocks
	private FormsListingServlet formsListingServlet;
	
	/** The resource. */
	@ Mock
	private Resource resource;
	
	/** The content fragment data. */
	@ Mock
	private Resource contentFragmentData;
	
	/** The content fragment meta data. */
	@ Mock
	private Resource contentFragmentMetaData;
	
	/** The value map. */
	@ Mock
	private ValueMap valueMap;
	
	/** The meta data value map. */
	@ Mock
	private ValueMap metaDataValueMap;
	
	@Mock
	private FormsConfig formsConfig;	
	
	/**
	 * Setup.
	 */
	@ BeforeEach
	void setup() {
      MockitoAnnotations.initMocks(this);
	}
	
	/**
	 * Test do get.
	 *
	 * @throws IOException Signals that an I/O exception has occurred.
	 * @throws LoginException the login exception
	 * @throws ServletException the servlet exception
	 */
	@ Test
	void testDoGet() throws IOException, LoginException, ServletException {
		StringWriter stringWriter = new StringWriter();
	    PrintWriter writer = new PrintWriter(stringWriter);
	    List<Resource> childResourceList = new ArrayList<>();
	    Resource mockresource = Mockito.mock(Resource.class);
	    childResourceList.add(mockresource);
	    String resourcePath = "/content/dam/sunlife/external/advisorhub/en/content-fragments/forms";
	    String[] selectors = {resourcePath,resourcePath};
	    String[] formsPath = {resourcePath.concat("~").concat(resourcePath),resourcePath.concat("~").concat(resourcePath)};
	    when(formsConfig.getFormsPath()).thenReturn(formsPath);
	    formsListingServlet.activate(formsConfig);
	    when(request.getRequestPathInfo()).thenReturn(requestPathInfo);
	    when(requestPathInfo.getSelectors()).thenReturn(selectors);
	    Iterator<Resource> childResourceIterator = childResourceList.iterator();
	    when(response.getWriter()).thenReturn(writer);
	    when(coreResourceResolver.getResourceResolver()).thenReturn(resolver);
	    when(resolver.getResource(resourcePath)).thenReturn(resource);
	    when(resource.listChildren()).thenReturn(childResourceIterator);
	    when(mockresource.getName()).thenReturn("ChildResource");
	    when(mockresource.getPath()).thenReturn(resourcePath);
	    when(resolver.getResource(mockresource.getPath().concat(JCR_CONTENT_DATA_MASTER))).thenReturn(contentFragmentData);
	    when(resolver.getResource(mockresource.getPath().concat(JCR_CONTENT_METADATA))).thenReturn(contentFragmentMetaData);
	    when(contentFragmentData.getValueMap()).thenReturn(valueMap);
	    when(contentFragmentMetaData.getValueMap()).thenReturn(metaDataValueMap);	    
	    when(valueMap.get(FormsConstants.FORM_NUMBER, String.class)).thenReturn("formNumber");
	    when(valueMap.get(FormsConstants.FORM_INFORMATION, String.class)).thenReturn("formInformation");
	    when(valueMap.get(FormsConstants.LAST_UPDATED, String.class)).thenReturn("lastUpdated");
	    when(valueMap.get(FormsConstants.ESIGN, String.class)).thenReturn("eSign");
	    when(valueMap.get(FormsConstants.FAVOURITES, String.class)).thenReturn("favourites");
	    when(valueMap.get(FormsConstants.TAGS_CONSTANT, String.class)).thenReturn("tags");
	    when(metaDataValueMap.get(TagConstants.PN_TAGS, String.class)).thenReturn("test");
	    formsListingServlet.doGet(request, response);	
	}

}