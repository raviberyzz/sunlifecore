/**
 * 
 */
package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import javax.jcr.RepositoryException;

import org.apache.commons.lang.reflect.FieldUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.request.RequestPathInfo;
import org.apache.sling.api.resource.LoginException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.services.SiteConfigService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * @author yl26 The class
 *         SelectorToExperienceFragmentModelMapTest.
 */
@ ExtendWith(AemContextExtension.class)
public class SelectorToExfragMapModelTest {

	/**
	 * The current page mock.
	 */
	
	private Page page;

	/** The config service. */
	//@ Mock
	private SiteConfigService configService;
	
	/** The config service. */
	@ Mock
	private RequestPathInfo requestPathInfo;

	
	private SlingHttpServletRequest request;
	
	List <SelectorExFragMap> items;
	
	String[] selectors = {"adv","inv"};
	/**
	 * The selector to experience fragment
	 * model.
	 */
	//@ InjectMocks
	private SelectorToExfragMapModel selectorToExfragMapModel;

	/**
	 * Sets up mocks.
	 */
	@ BeforeEach
	void setup() throws Exception{
		MockitoAnnotations.initMocks(this);
		selectorToExfragMapModel = new SelectorToExfragMapModel();
		request = Mockito.mock(SlingHttpServletRequest.class);
		FieldUtils.writeField(selectorToExfragMapModel, "request", request, true);
		configService = Mockito.mock(SiteConfigService.class);
		FieldUtils.writeField(selectorToExfragMapModel, "configService", configService, true);
		page = Mockito.mock(Page.class);
		FieldUtils.writeField(selectorToExfragMapModel, "currentPage", page, true);
		items = new ArrayList <SelectorExFragMap>();
		SelectorExFragMap sefp = new SelectorExFragMapImpl("adv","/content/experience-fragments/sunlife/fragment3");
		SelectorExFragMap sefp1 = new SelectorExFragMapImpl("inv","/content/experience-fragments/sunlife/fragment4");
		FieldUtils.writeField(selectorToExfragMapModel, "items", items, true);
		items.add(sefp);
		items.add(sefp1);
	}
	/**
	 * Tests init method.
	 * @throws RepositoryException 
	 * @throws LoginException 
	 */
	@ Test
	void testInit() throws LoginException, RepositoryException {
		String pagePath = "/content/sunlife/ca/en/home";
		when(page.getPath()).thenReturn(pagePath);
		selectorToExfragMapModel.setFragPath("/content/experience-fragments/sunlife/fragment3");		
		when(request.getRequestPathInfo()).thenReturn(requestPathInfo);
		when(requestPathInfo.getSelectors()).thenReturn(selectors);			
		when(request.getRequestPathInfo().getResourcePath()).thenReturn(pagePath);
		when(page.getPath()).thenReturn("/content/experience-fragments/sunlife/home");
		when(configService.getConfigValues("siteName","/content/experience-fragments/sunlife/home")).thenReturn("abc");		
		selectorToExfragMapModel.init();		

		when(configService.getConfigValues("experienceFragmentPath", page.getPath())).thenReturn("/content/experience-fragments/ca/en");
		selectorToExfragMapModel.setFragPath("/content/experience-fragments/sunlife/external/ca/en/footer/master");		
		assertDoesNotThrow(()->selectorToExfragMapModel.init());
	}

	/**
	 * Tests init method when
	 * exception.
	 * @throws RepositoryException 
	 */
	@ Test
	void testInitWhenException() throws LoginException, RepositoryException, NullPointerException {
		selectorToExfragMapModel.setFragPath("/content/experience-fragments/sunlife/fragment3");
		when(page.getPath()).thenReturn("/content/sunlife/en/home");		
		when(configService.getConfigValues("siteName", page.getPath())).thenThrow(new LoginException());
		//when(request.getRequestPathInfo()).thenReturn(requestPathInfo);
		when(requestPathInfo.getSelectors()).thenReturn(selectors);			
		assertThrows(NullPointerException.class, ()->selectorToExfragMapModel.init());
		//selectorToExfragMapModel.init();
	}
	
	/**
	 * Tests init method when
	 * exception.
	 * @throws RepositoryException 
	 * @throws LoginException 
	 */
	@ Test
	void testInitWhenRepositoryException() throws LoginException, RepositoryException {
		String pagePath = "/content/sunlife/ca/en/home";
		selectorToExfragMapModel.setFragPath("/content/experience-fragments/sunlife/fragment3");
		when(page.getPath()).thenReturn("/content/sunlife/en/home");		
		when(configService.getConfigValues("", "/content/experience-fragments/sunlife/home")).thenThrow(new RepositoryException());
		when(request.getRequestPathInfo()).thenReturn(requestPathInfo);
		when(requestPathInfo.getSelectors()).thenReturn(selectors);
		when(request.getRequestPathInfo().getResourcePath()).thenReturn(pagePath);
		//assertThrows(RepositoryException.class, ()->selectorToExfragMapModel.init());
		selectorToExfragMapModel.init();
		
	}

}
