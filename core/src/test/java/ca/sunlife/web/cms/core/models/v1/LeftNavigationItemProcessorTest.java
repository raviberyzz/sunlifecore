package ca.sunlife.web.cms.core.models.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.adobe.cq.wcm.core.components.commons.link.LinkBuilder;
import com.adobe.cq.wcm.core.components.commons.link.LinkManager;
import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.day.cq.commons.Filter;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageFilter;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.components.Component;

import ca.sunlife.web.cms.core.models.v1.LeftNavigationItemProcessor;
import ca.sunlife.web.cms.core.models.v1.NavigationRoot;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class LeftNavigationItemProcessorTest {

	@Mock
	private SiteConfigService configService;

	@Mock
	private SlingHttpServletRequest request;

	@Mock
	private ResourceResolver resolver;

	@Mock
	private LinkManager linkManager;

	@Mock
	private Component component;

	@Mock
	private ValueMap valueMap;

	@Mock
	private LinkBuilder linkBuilder;

	@Mock
	private Page currentPage;

	@Mock
	private PageManager pageManager;

	@InjectMocks
	private LeftNavigationItemProcessor leftNavigationItemProcessor;

	@BeforeEach
	public void setUp() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void testProcessNavigationList() throws RepositoryException, LoginException {
		// Prepare test data
		List<NavigationItem> navigationItems = new ArrayList<>();
		List<NavigationItem> items = new ArrayList<>();
		when(configService.getConfigValues(anyString(), anyString())).thenReturn("Test Title");
		when(currentPage.getPageManager()).thenReturn(mock(PageManager.class));
		when(currentPage.getPath()).thenReturn("/test");
		List<NavigationItem> result = leftNavigationItemProcessor.processNavigationList(navigationItems, configService,
				currentPage, request, linkManager, component, resolver, items);
		assertNotNull(result);
		assertEquals(0, result.size());
	}

	@Test
	public void testGetRelativePath() {
		Page root = mock(Page.class);
		Page child = mock(Page.class);
		when(root.getPath()).thenReturn("/content/sunlife");
		when(child.getPath()).thenReturn("/content/sunlife/.");
		String relativePath = leftNavigationItemProcessor.getRelativePath(root, child);
		assertEquals(".", relativePath);
	}

	@Test
	public void testGetRootItems() {
		NavigationRoot navigationRoot = mock(NavigationRoot.class);
		Page page = mock(Page.class);
		Iterator<Page> iterator = mock(Iterator.class);
		when(navigationRoot.getPage()).thenReturn(page);
		when(page.listChildren((Filter<Page>) any(PageFilter.class))).thenReturn(iterator);
		when(navigationRoot.getStartLevel()).thenReturn(0);
		when(navigationRoot.getStructureDepth()).thenReturn(0);
		when(page.getPath()).thenReturn("/root");
		List<NavigationRoot> result = leftNavigationItemProcessor.getRootItems(navigationRoot, 0, 0);
		assertNotNull(result);
		assertEquals(1, result.size());
	}

}
