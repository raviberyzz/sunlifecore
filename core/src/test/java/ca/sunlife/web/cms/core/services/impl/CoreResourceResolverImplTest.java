package ca.sunlife.web.cms.core.services.impl;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import ca.sunlife.web.cms.core.osgi.config.CoreResourceResolverConfig;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ ExtendWith (AemContextExtension.class)
public class CoreResourceResolverImplTest {

  @ Mock
  CoreResourceResolverConfig config;

  @ Mock
  private ResourceResolverFactory resourceResolverFactory;

  @ Mock
  ResourceResolver resolver;

  @ InjectMocks
  private CoreResourceResolverImpl serviceImpl;

  @ BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);
  }

  @ Test
  void activate() {
    serviceImpl.activate(config);
  }

  @ Test
  void getResourceResolver() throws LoginException {
    when(resourceResolverFactory.getServiceResourceResolver(any( ))).thenReturn(resolver);
    ResourceResolver resolverRet = serviceImpl.getResourceResolver( );
    assertNotNull(resolverRet);
  }

  @ Test
  void closeResourceResolver() {
    when(resolver.isLive( )).thenReturn(true);
    serviceImpl.closeResourceResolver(resolver);
  }

  @ Test
  void closeResourceResolverNeg() {
    when(resolver.isLive( )).thenReturn(false);
    serviceImpl.closeResourceResolver(resolver);
  }

  @ Test
  void closeResourceResolverNeg1() {
    when(resolver.isLive( )).thenReturn(false);
    serviceImpl.closeResourceResolver(null);
  }

}
