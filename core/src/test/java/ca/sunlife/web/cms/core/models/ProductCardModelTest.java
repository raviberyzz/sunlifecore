/**
 * 
 */
package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

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
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.adobe.cq.dam.cfm.converter.ContentTypeConverter;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.SearchResult;
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
	
	/** The predicateGroup. */
	@ Mock
	PredicateGroup predicateGroup;
	
	/** The Query. */
	@ Mock
	Query query;
	
	/** The SearchResults. */
	@ Mock
	SearchResult searchResult;
	
	/** The resourceIterator. */
	@ Mock
	Iterator <Resource> resourceIterator;
	
	/** The resource. */
	@ Mock	
	Resource resource;
	
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
		Map <String, String> queryParameterMap = new HashMap <>();
		queryParameterMap.put("path", folderPath);
	    queryParameterMap.put("type", com.day.cq.dam.api.DamConstants.NT_DAM_ASSET);
	    queryParameterMap.put("p.limit", Integer.toString(1));
	    queryParameterMap.put("p.offset", Integer.toString(0));
	    queryParameterMap.put("1_property", JcrConstants.JCR_CONTENT + "/data/cq:model");
	    queryParameterMap.put("1_property.value",
	        "/conf/sunlife-apac/settings/dam/cfm/models/product-card-model");
	    queryParameterMap.put("tagid.property", JcrConstants.JCR_CONTENT + "/metadata/cq:tags");
	    queryParameterMap.put("tagid", tagNames[0]);
	    queryParameterMap.put("orderby",
	        "@" + JcrConstants.JCR_CONTENT + "/data/master/productCardName");
	    predicateGroup = PredicateGroup.create(queryParameterMap);	    
	    when(queryBuilder.createQuery(Mockito.any(), Mockito.any())).thenReturn(query);
	    when(query.getResult()).thenReturn(searchResult);
	    when(searchResult.getResources()).thenReturn(resourceIterator);
	    when(resourceIterator.next()).thenReturn(resource);		
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
