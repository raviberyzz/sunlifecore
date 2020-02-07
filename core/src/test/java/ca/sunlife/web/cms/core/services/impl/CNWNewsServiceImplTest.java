package ca.sunlife.web.cms.core.services.impl;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.io.IOException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.internal.matchers.Any;

import ca.sunlife.web.cms.core.osgi.config.CNWNewsConfig;
import ca.sunlife.web.cms.core.services.RestService;
import ca.sunlife.web.cms.core.services.impl.CNWNewsServiceImpl;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junit.framework.Assert;

@ExtendWith(AemContextExtension.class)
public class CNWNewsServiceImplTest {
	@Mock
	private RestService restService;
	@Mock
	private CNWNewsConfig cnwNewsConfig;
	@InjectMocks
	private CNWNewsServiceImpl CNWNewsServiceImpl;

	@BeforeEach
	void setup() {
		MockitoAnnotations.initMocks(this);

	}

	@Test
	void testCNWNewsServiceImpl() throws IOException {

		when(cnwNewsConfig.getCNWNewsList()).thenReturn("kk");
		CNWNewsServiceImpl.activate(cnwNewsConfig);

		Assert.assertEquals("kk", CNWNewsServiceImpl.getCNWNewsListUrl());

		CNWNewsServiceImpl.getCNWNewsDetailsUrl();
	}

	@Test
	void testGetCNWNewsOverview() throws IOException {

		when(restService.callGetWebService(any())).thenReturn("success");
		Assert.assertEquals("success", CNWNewsServiceImpl.getCNWNewsOverview());
	}

	@Test
	void testGetCNWNews() throws IOException {

		when(restService.callGetWebService("testUrl")).thenReturn("success");
		Assert.assertEquals("success", CNWNewsServiceImpl.getCNWNews("testUrl"));
	}

	@Test
	void testGetCNWNewsDetails() throws IOException {

		when(restService.callGetWebService("testUrl")).thenReturn("success");
		Assert.assertEquals("success", CNWNewsServiceImpl.getCNWNewsDetails("testUrl"));

	}

}