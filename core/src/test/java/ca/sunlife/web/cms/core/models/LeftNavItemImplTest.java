/**
 * 
 */
package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.adobe.cq.wcm.core.components.internal.models.v2.PageImpl;
import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.adobe.cq.wcm.core.components.commons.link.Link;
import com.adobe.cq.wcm.core.components.commons.link.LinkBuilder;
import com.adobe.cq.wcm.core.components.commons.link.LinkManager;
import com.day.cq.wcm.api.components.Component;

/**
 * @author mo92 The class LeftNavItemImplTest.
 */
public class LeftNavItemImplTest {

	@Mock
	private Page page;

	private LeftNavItemImpl itemImpl;

	@Mock
	private SlingHttpServletRequest request;

	@Mock
	private List<NavigationItem> navigationItems;

	@Mock
	private PageManager pageManager;

	@Mock
	private LinkManager linkManager;

	@Mock
	private Component component;

	@Mock
	private ValueMap valueMap;

	@Mock
	private LinkBuilder linkBuilder;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	void testLeftNavItemImpl() {
		when(page.getPageManager()).thenReturn(pageManager);
		when(page.getProperties()).thenReturn(valueMap);
		when(valueMap.get(PageImpl.PN_REDIRECT_TARGET, String.class)).thenReturn("Titlee");
		when(pageManager.getPage("Titlee")).thenReturn(page);
		when(page.getPath()).thenReturn("homepage");
		Link<?> link = mock(Link.class);
		LinkBuilder linkBuilder = mock(LinkBuilder.class);
		when(linkManager.get(page)).thenReturn(linkBuilder);
		when(linkManager.get(page).build()).thenReturn(link);
		itemImpl = new LeftNavItemImpl(page, true, request, 1, navigationItems, "nav", linkManager, component);
		assertNotNull(itemImpl.getPath());
	}

	@Test
	void testgetTitle() {
		when(page.getNavigationTitle()).thenReturn("title1");
		when(page.getPageTitle()).thenReturn("title2");
		when(page.getTitle()).thenReturn("title3");
		when(page.getName()).thenReturn("title4");
		when(page.getPageManager()).thenReturn(pageManager);
		when(page.getProperties()).thenReturn(valueMap);
		when(valueMap.get(PageImpl.PN_REDIRECT_TARGET, String.class)).thenReturn("Titlee");
		when(pageManager.getPage("Titlee")).thenReturn(page);
		when(page.getPath()).thenReturn("homepage");
		Link<?> link = mock(Link.class);
		LinkBuilder linkBuilder = mock(LinkBuilder.class);
		when(linkManager.get(page)).thenReturn(linkBuilder);
		when(linkManager.get(page).build()).thenReturn(link);
		itemImpl = new LeftNavItemImpl(page, true, request, 1, navigationItems, "nav", linkManager, component);
		itemImpl.getTitle();
		assertNotNull(itemImpl.getPath());
	}
}
