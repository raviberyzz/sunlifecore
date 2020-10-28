package ca.sunlife.web.cms.source.servlets;

import static org.mockito.Mockito.when;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestPathInfo;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.day.cq.tagging.Tag;

import ca.sunlife.web.cms.source.servlets.CustomTagServlet;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * The Class CustomTagServletTest.
 */
@ ExtendWith (AemContextExtension.class)
public class CustomTagServletTest {

	/** The request. */
	@ Mock
	private SlingHttpServletRequest request;
	
	/** The response. */
	@ Mock
	private SlingHttpServletResponse response;
	
	/** The request path info. */
	@Mock
	private RequestPathInfo requestPathInfo;
	
	/** The resource. */
	@ Mock
	private Resource resource;
	
	/** The tag. */
	@Mock
	private Tag tag;
	
	/** The custom tag servlet. */
	@ InjectMocks
	private CustomTagServlet customTagServlet;
	
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
	 * @throws ServletException the servlet exception
	 */
	@ Test
	void testDoGet() throws IOException, ServletException {
		StringWriter stringWriter = new StringWriter();
	    PrintWriter writer = new PrintWriter(stringWriter);
	    List<Tag> childtagList = new ArrayList<>();
	    Tag mockChildTag = Mockito.mock(Tag.class);
	    childtagList.add(mockChildTag);
	    String[] selectors = {"test","test1"};
	    when(request.getRequestPathInfo()).thenReturn(requestPathInfo);
	    when(requestPathInfo.getSelectors()).thenReturn(selectors);
	    when(response.getWriter()).thenReturn(writer);
	    when(request.getResource()).thenReturn(resource);
	    when(resource.adaptTo(Tag.class)).thenReturn(tag);
	    when(tag.getName()).thenReturn("nameOfTag");
	    when(tag.getTitle()).thenReturn("tagTitle");
	    when(tag.getTagID()).thenReturn("tagId");
	    when(tag.listChildren()).thenReturn(childtagList.iterator());
	    when(mockChildTag.listChildren()).thenReturn(childtagList.iterator());
	    when(mockChildTag.getName()).thenReturn("nameOfTag");
	    when(mockChildTag.getTitle()).thenReturn("tagTitle");
	    when(mockChildTag.getTagID()).thenReturn("tagId");
	    customTagServlet.doGet(request, response);	   
	}
	
	/**
	 * Test do get with no tag.
	 * @throws IOException 
	 * @throws ServletException 
	 */
	@Test
	void testDoGetWithNoTag() throws ServletException, IOException {
		when(request.getResource()).thenReturn(resource);
		customTagServlet.doGet(request, response);
	}
	
	/**
	 * Test do get with one selector.
	 * @throws IOException 
	 * @throws ServletException 
	 */
	@Test
	void testDoGetWithOneSelector() throws ServletException, IOException {
		String[] selectors = {"test"};
		when(request.getResource()).thenReturn(resource);
	    when(request.getRequestPathInfo()).thenReturn(requestPathInfo);
	    when(requestPathInfo.getSelectors()).thenReturn(selectors);
	    when(resource.adaptTo(Tag.class)).thenReturn(tag);
	    customTagServlet.doGet(request, response);
	}
	
}
