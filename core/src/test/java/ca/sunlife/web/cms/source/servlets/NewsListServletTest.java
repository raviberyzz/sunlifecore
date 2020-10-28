package ca.sunlife.web.cms.source.servlets;

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
import ca.sunlife.web.cms.source.constants.NewsConstants;
import ca.sunlife.web.cms.source.osgi.config.NewsConfig;
import ca.sunlife.web.cms.source.servlets.NewsListServlet;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * The Class NewsListServletTest.
 */
@ ExtendWith (AemContextExtension.class)
public class NewsListServletTest {
	
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
	
	/** The news list servlet. */
	@ InjectMocks
	private NewsListServlet newsListServlet;
	
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
	private NewsConfig newsConfig;	
	
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
	    String resourcePath = "/content/dam/sunlife/internal/source/en/content-fragments/news-articles";
	    String[] selectors = {resourcePath,resourcePath};
	    String[] newsPath = {resourcePath.concat("~").concat(resourcePath),resourcePath.concat("~").concat(resourcePath)};
	    when(newsConfig.getNewsPath()).thenReturn(newsPath);
	    newsListServlet.activate(newsConfig);
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
	    when(valueMap.get(NewsConstants.PUBLISHED_DATE_CONSTANT, String.class)).thenReturn("20-02-2020");
	    when(valueMap.get(NewsConstants.HEADING_CONSTANT, String.class)).thenReturn("heading");
	    when(valueMap.get(NewsConstants.PAGE_CONSTANT, String.class)).thenReturn("pagePath");
	    when(valueMap.get(NewsConstants.THUMBNAIL_IMAGE_CONSTANT, String.class)).thenReturn("thumbnailImage");
	    when(valueMap.get(NewsConstants.PIN_ARTICLE_CONSTANT, String.class)).thenReturn("pinArticle");
	    when(valueMap.get(NewsConstants.ARTICLE_SUMMARY_CONSTANT, String.class)).thenReturn("\"<html><head><title>First parse</title></head>\"\r\n" + 
	    		"  + \"<body><p>Parsed HTML into a doc.</p></body></html>\";");
	    when(metaDataValueMap.get(TagConstants.PN_TAGS, String.class)).thenReturn("test");
	    newsListServlet.doGet(request, response);	    
	}
}
