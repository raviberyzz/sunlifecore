package ca.sunlife.web.cms.core.models.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.day.cq.wcm.api.Page;

import io.wcm.testing.mock.aem.junit5.AemContext;

public class NavigationRootTest {

	private final AemContext context = new AemContext();

	private NavigationRoot navigationRoot;

	@BeforeEach
	public void setUp() {

		// Setting up the context with a mock ResourceResolver
		ResourceResolver resourceResolver = mock(ResourceResolver.class);
		Resource mockContentResource = mock(Resource.class);
		when(resourceResolver.getResource("/content/navigation")).thenReturn(mockContentResource);
		Page mockPage = mock(Page.class);
		when(mockPage.getPath()).thenReturn("/content/navigation");
		context.registerService(ResourceResolver.class, resourceResolver);
		context.currentPage(mockPage);
		navigationRoot = new NavigationRoot(mockPage, 2);
	}

	@Test
	public void testGetPage() {
		// Test getPage method
		Page page = navigationRoot.getPage();
		assertEquals("/content/navigation", page.getPath());
		assertEquals(1, navigationRoot.getStartLevel());
		assertEquals(3, navigationRoot.getStructureDepth());
	}

}
