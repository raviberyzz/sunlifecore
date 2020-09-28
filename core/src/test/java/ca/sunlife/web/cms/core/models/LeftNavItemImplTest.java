/**
 * 
 */
package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertNotNull;
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

/**
 * @author mo92
 * The class LeftNavItemImplTest.
 */
public class LeftNavItemImplTest {

	@ Mock
	private Page page;
	
	private LeftNavItemImpl itemImpl;
	
	@ Mock
	private SlingHttpServletRequest request;
	
	@ Mock
	private List <NavigationItem> navigationItems;
	
	@ Mock
	private PageManager pageManager;
	
	@ Mock
	private ValueMap valueMap;
	
	@ BeforeEach
	void setUp( ) {
		MockitoAnnotations.initMocks(this);
	}
	
	@ Test
	void testLeftNavItemImpl() {
		when(page.getPageManager()).thenReturn(pageManager);
		when(page.getProperties()).thenReturn(valueMap);
		when(valueMap.get(PageImpl.PN_REDIRECT_TARGET, String.class)).thenReturn("Titlee");
		when(pageManager.getPage("Titlee")).thenReturn(page);
		when(page.getPath()).thenReturn("homepage");
		itemImpl = new LeftNavItemImpl(page, true, request, 1, navigationItems, "nav");
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
		itemImpl = new LeftNavItemImpl(page, true, request, 1, navigationItems, "nav");
		itemImpl.getTitle();
	}
}
