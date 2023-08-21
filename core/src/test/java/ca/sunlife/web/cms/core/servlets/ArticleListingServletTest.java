package ca.sunlife.web.cms.core.servlets;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Value;
import javax.servlet.ServletException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
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

import com.day.cq.replication.ReplicationStatus;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class ArticleListingServletTest {

	@Mock
	private SlingHttpServletRequest request;

	@Mock
	private SlingHttpServletResponse response;

	@Mock
	private ResourceResolver resourceResolver;

	@InjectMocks
	ArticleListingServlet articleListingServlet;

	@Mock
	private Resource resource;

	@Mock
	private Node node;

	@Mock
	NodeIterator nodeIterotor;

	@Mock
	Property property;

	@Mock
	PageManager pageManager;

	@Mock
	Page page;

	@Mock
	ReplicationStatus replicationStatus;

	@Mock
	ValueMap articleContent;

	@Mock
	Value value;

	@Mock
	TagManager tagManager;

	@Mock
	Tag tag;

	@BeforeEach
	void setup() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	void testDoGet() throws IOException, RepositoryException, ServletException {
		StringWriter stringWriter = new StringWriter();
		PrintWriter writer = new PrintWriter(stringWriter);
		when(request.getResourceResolver()).thenReturn(resourceResolver);
		when(response.getWriter()).thenReturn(writer);
		ArrayList<String> pageList = new ArrayList<>();
		String cfPath = "/content/dam/sunlife/external/ca/sl/cf/test";
		pageList.add("/content/sunlife/external/ca/sl/sunhub/en/content-for-clients");
		when(resourceResolver.getResource(anyString())).thenReturn(resource);
		when(resource.adaptTo(Node.class)).thenReturn(node);
		when(node.getNodes()).thenReturn(nodeIterotor);
		when(nodeIterotor.hasNext()).thenReturn(true, true, false);
		when(nodeIterotor.nextNode()).thenReturn(node);
		when(node.getName()).thenReturn("multicontentfragment");
		when(node.hasNode("cfmultifield")).thenReturn(true);
		when(node.getProperty("cfPath")).thenReturn(property);
		when(property.getString()).thenReturn(cfPath);
		when(node.getNode(anyString())).thenReturn(node);
		when(node.getProperty(anyString())).thenReturn(property);
		Value value = Mockito.mock(Value.class);
		Value[] values = new Value[] { value };
		when(property.getValues()).thenReturn(values);
		when(value.getString()).thenReturn("sunlife:slf/sunhub/article-type/inhouse");
		when(resourceResolver.adaptTo(TagManager.class)).thenReturn(tagManager);
		when(tagManager.resolve(anyString())).thenReturn(tag);
		when(tag.getTitle()).thenReturn("In House");
		when(resourceResolver.adaptTo(PageManager.class)).thenReturn(pageManager);
		when(pageManager.getPage(anyString())).thenReturn(page);
		when(page.adaptTo(ReplicationStatus.class)).thenReturn(replicationStatus);
		when(replicationStatus.isActivated()).thenReturn(true);
		when(resource.getValueMap()).thenReturn(articleContent);
		when(articleContent.containsKey(anyString())).thenReturn(true);
		when(articleContent.get("articlePublishedDate", String.class)).thenReturn("2019-08-08T09:30:00.000+05:30");
		articleListingServlet.doGet(request, response);
	}

}
