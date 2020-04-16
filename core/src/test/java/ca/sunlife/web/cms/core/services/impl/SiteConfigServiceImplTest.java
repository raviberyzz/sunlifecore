package ca.sunlife.web.cms.core.services.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;

import ca.sunlife.web.cms.core.constants.BasePageModelConstants;
import ca.sunlife.web.cms.core.osgi.config.SiteConfig;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ ExtendWith (AemContextExtension.class)
public class SiteConfigServiceImplTest {

  private final AemContext context = new AemContext( );

  @ Mock
  private CoreResourceResolver resourceResolver;

  @ Mock
  private QueryBuilder builder;

  @ Mock
  ResourceResolver resolver;

  @ Mock
  Resource altLangResource;

  @ Mock
  Query query;

  @ Mock
  SearchResult result;

  @ Mock
  Map <String , HashMap <String , String>> siteConfigMap;

  @ InjectMocks
  private SiteConfigServiceImpl serviceImpl;

  @ BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);
  }

  @ Test
  void activate() throws LoginException , RepositoryException {
    Resource metadataResource = context.create( ).resource("/content" , "jcr:primaryType" ,
        "nt:unstructured");
    when(resourceResolver.getResourceResolver( )).thenReturn(resolver);
    when(builder.createQuery(any( ) , any( ))).thenReturn(query);
    when(query.getResult( )).thenReturn(result);
    Hit mockHit = mock(Hit.class);
    final List <Hit> hits = Collections.singletonList(mockHit);
    when(result.getHits( )).thenReturn(hits);
    when(resolver.getResource(any(String.class))).thenReturn(metadataResource);
    when(mockHit.getPath( )).thenReturn("/abc");
    when(resolver.getResource("/abc/jcr:content/config/alternateLanguages"))
        .thenReturn(altLangResource);
    serviceImpl.activate(mock(SiteConfig.class));
  }

  @ Test
  void getConfigValues1() {
    String name = "NAME";
    String path = "/PAGE/NewPage";
    HashMap <String , String> map = new HashMap <String , String>( );
    map.put(name , "ABC");
    when(siteConfigMap.containsKey(any( ))).thenReturn(true);
    when(siteConfigMap.get(any( ))).thenReturn(map);
    String out = serviceImpl.getConfigValues(name , path);
    assertNotNull(out);
  }

  @ Test
  void getConfigValuesNeg() {
    String name = "NAME";
    String path = "/PAGE/NewPage";
    HashMap <String , String> map = new HashMap <String , String>( );
    map.put(name , "ABC");
    when(siteConfigMap.containsKey(any( ))).thenReturn(false);
    when(siteConfigMap.get(any( ))).thenReturn(map);
    String out = serviceImpl.getConfigValues(name , path);
    assertNotNull(out);
  }

  @ Test
  void setConfiguration() {

  }
  
  /**
  * Tests get page url.
  */
  @ Test
  void testGetPageUrl() {
	  String name = "domain";
	  HashMap <String , String> map = new HashMap <String , String>( );
	  map.put(name , "www.aem-site.ca/en/");
	  map.put(BasePageModelConstants.SITE_URL_CONSTANT , "/content/sunlife/ca/en/");
	  when(siteConfigMap.containsKey(any( ))).thenReturn(true);
	  when(siteConfigMap.get(any( ))).thenReturn(map);
	  assertEquals("www.aem-site.ca/en//home/", serviceImpl.getPageUrl("/content/sunlife/ca/en/home"));
  }
}
