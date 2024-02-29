package ca.sunlife.web.cms.core.models;

import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.internal.util.reflection.FieldSetter;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.models.ListPageCfModel;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class ListPageCfModelTest {
	@InjectMocks
	private ListPageCfModel listPageCfModel;

	@Mock
	private Page currentPage;

	@Mock
	private SlingHttpServletRequest request;

	/**
	 * The core resource resolver mock.
	 */
	@Mock
	private CoreResourceResolver coreResourceResolver;
	
	/**
	 * The resource resolver mock.
	 */
	@ Mock
	private ResourceResolver resourceResolver;
	
	/** The session. */
	@ Mock
	private Session session;
	
	/** The session. */
	@ Mock
	private Node rootNode;
	
	/** The session. */
	@ Mock
	private Node regularNode;
	/** The session. */
	@ Mock
	private NodeIterator childNodes;
	
	@Mock 
	private List<Resource> cfParentPath;
	
	


	@BeforeEach
	public void setup() throws RepositoryException, NoSuchFieldException, SecurityException {
		MockitoAnnotations.initMocks(this);
		String regularPagePath = "/content/external/sunlife/ca/en";
		FieldSetter.setField(listPageCfModel, listPageCfModel.getClass().getDeclaredField("regularPagePath"), regularPagePath);
		FieldSetter.setField(listPageCfModel, listPageCfModel.getClass().getDeclaredField("cfParentPath"), cfParentPath);
		when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
		when(session.getRootNode()).thenReturn(rootNode);
		when(rootNode.getNode(Mockito.anyString())).thenReturn(regularNode);
		when(regularNode.getPath()).thenReturn(regularPagePath);
		when(regularNode.getNodes()).thenReturn(childNodes);
		when(childNodes.hasNext()).thenReturn(false);
		when(cfParentPath.isEmpty()).thenReturn(true);
		
	}

	@Test
	void testInitForListPageCfModel() throws LoginException, RepositoryException {
		listPageCfModel.init();
	}
}
