/**
 * 
 */
package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.jcr.RepositoryException;

import org.apache.commons.lang.reflect.FieldUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.adobe.cq.wcm.core.components.internal.models.v2.PageImpl;
import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * @author yl26
 * The class NavigationModelTest.
 */
public class NavigationModelTest {

	@ Mock
	private Page page;
	
	@ Mock
	private SiteConfigService configService;
	
	@ Mock
	private SlingHttpServletRequest request;
	
	//@ Mock
	private List <NavigationItem> navigationItems;
	
	private List <NavigationItem> childItems;
	
	@ Mock
	private PageManager pageManager;
	
	@ Mock
	private ValueMap valueMap;	
	
	@ InjectMocks
	NavigationModel navModel;
	
	@ BeforeEach
	void setUp( ) throws IllegalAccessException {
		MockitoAnnotations.initMocks(this);
	}
	
	@ Test
	void testProcessNavigationList() throws LoginException, RepositoryException {
		String pagePath = "/content/sunlife/ca/en/home";
		when(page.getPath()).thenReturn("/content/experience-fragments/sunlife/home/header");
		when(configService.getConfigValues("navigationOverview",pagePath)).thenReturn("SLGI");
		navigationItems = new ArrayList <NavigationItem>(); 
		childItems = new ArrayList <NavigationItem>(); 
		NavigationItem navItem1 = new NavigationItemImpl("/content/sunlife/ca/en/home", "home", "home", "home",childItems);
		NavigationItem navItem2 = new NavigationItemImpl("/content/sunlife/ca/en/home1", "home1", "home1", "home1", childItems);		
		navigationItems.add(navItem1);
		navigationItems.add(navItem2);
		navModel.processNavigationList(navigationItems);
	}	
	
}
