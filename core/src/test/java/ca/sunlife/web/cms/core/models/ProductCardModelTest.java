/**
 * 
 */
package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import javax.inject.Inject;
import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.commons.lang.reflect.FieldUtils;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.adobe.cq.dam.cfm.converter.ContentTypeConverter;
import com.day.cq.search.QueryBuilder;
import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * @author yl26 The class
 *         ProductCardModelTest.
 */
@ ExtendWith (AemContextExtension.class)
public class ProductCardModelTest{

	
	/**
	 * The Constant
	 * JCR_CONTENT_DATA_MASTER.
	 */
	private static final String JCR_CONTENT_DATA_MASTER = "/jcr:content/data/master";	
	  
	/** The resolver. */
	@ Mock
	private ResourceResolver resolver;
	
	/** The session. */
	@ Mock
	private Session session;
	
	/** The querybuilder. */
	@ Mock
	QueryBuilder queryBuilder;

	/** The article resource. */
	@ Mock
	private Resource productResource;

	/** The config service. */
	@ Mock
	private SiteConfigService configService;

	/**
	 * The core resource resolver.
	 */
	@ Mock
	private CoreResourceResolver coreResourceResolver;

	/** The current page. */
	@ Mock
	private Page currentPage;

	/** The articleContent. */
	@ Mock
	private ValueMap productContent;
	
	//@ Mock
	private String [ ] tagNames;

	/** The productCardModel. */
	@ InjectMocks
	private ProductCardModel productCardModel;
	
	/**
	 * Sets up mocks.
	 * 
	 * @throws IllegalAccessException
	 */
	@ BeforeEach
	void setUp() throws IllegalAccessException {
		MockitoAnnotations.initMocks(this);
		tagNames = new String[]{"tag1","tag2"};
		FieldUtils.writeField(productCardModel, "tagNames", tagNames, true);
	}

	/**
	 * Tests init method.
	 * @throws Exception 
	 */
	@ Test
	void testInit() throws Exception {
		String fragmentPath = "/content/dam/sunlife/fragment/";
		String pagePath = "/content/sunlife/ca/en/home";		
		
			productCardModel.setTopc("static");
			productCardModel.setProductCardFragmentPath(fragmentPath);
			when(currentPage.getPath()).thenReturn(pagePath);
			when(coreResourceResolver.getResourceResolver()).thenReturn(resolver);
			when(resolver.getResource(fragmentPath.concat(JCR_CONTENT_DATA_MASTER))).thenReturn(productResource);
			when(productResource.getValueMap()).thenReturn(productContent);			

			productCardModel.init();	

	}
	
	/**
	 * Tests init dynamic method.
	 * @throws LoginException 
	 */
	@ Test
	void testInitdynamic() throws Exception {
		
		String folderPath = "/content/sunlife/ca/en";
		String pagePath = "/content/sunlife/ca/en/home";
		
		productCardModel.setTopc("dynamic");
		productCardModel.setFolderPath(folderPath);
		when(currentPage.getPath()).thenReturn(pagePath);
		when(coreResourceResolver.getResourceResolver()).thenReturn(resolver);
		when(resolver.adaptTo(Session.class)).thenReturn(session);
		when(resolver.adaptTo(QueryBuilder.class)).thenReturn(queryBuilder);
		//when(tagNames).thenReturn(tagNames);
		productCardModel.init();	
	}
	
	/**
	 * Tests init method for exception.
	 */
	@ Test
	void testInitWhenException() {
		String fragmentPath = "/content/dam/sunlife/fragment/";
		try {
			productCardModel.setProductCardFragmentPath(fragmentPath);
			when(coreResourceResolver.getResourceResolver()).thenThrow(new LoginException());
			productCardModel.init();
		} catch (Exception e) {
			assertTrue(e instanceof LoginException);
		}
	}
	
	/**
	 * Tests init method for no fragment path specified.
	 */
	@ Test
	void testInitWhenFragmentPathIsNull() {
		productCardModel.init();
	}
}
