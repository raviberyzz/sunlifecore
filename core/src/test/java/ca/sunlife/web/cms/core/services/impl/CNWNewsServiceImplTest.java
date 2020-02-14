package ca.sunlife.web.cms.core.services.impl;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.text.ParseException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.internal.matchers.Any;

import ca.sunlife.web.cms.core.beans.News;
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
	void activateTest() {
		CNWNewsServiceImpl.activate(cnwNewsConfig);
	}
	@Test
	void testGetCNWNewsOverview() throws IOException {
		String returnString = "{\"releases\":{\"release\":[{\"id\":\"1\",\"headline\":\"headline one\",\"releaseDate\":\"Sun, 12 Jan 2020 18:07:59 EST\",\"summary\":\"summary one\",\"body\":\"body one\"},{\"id\":\"2\",\"headline\":\"headline two\",\"releaseDate\":\"Sun, 12 Jan 2020 18:07:59 EST\",\"summary\":\"summary two\",\"body\":\"body two\"}],\"latestModified\":null,\"matching_count\":null,\"returned_count\":null}}";
		when(restService.callGetWebService(ArgumentMatchers.anyString())).thenReturn(returnString);
		CNWNewsServiceImpl.activate(cnwNewsConfig);

		Assert.assertEquals("Issue with date formatting , test failed","12 January 2020",
				CNWNewsServiceImpl.getCNWNewsOverview("en_CA").getReleases().getRelease().get(0).getReleaseDate()
				);

	}
	
	@Test
	void testGetCNWNews() throws IOException {

		String returnString = "{\"releases\":{\"release\":[{\"id\":\"1\",\"headline\":\"headline one\",\"releaseDate\":\"Sun, 12 Jan 2020 18:07:59 EST\",\"summary\":\"summary one\",\"body\":\"body one\"},{\"id\":\"2\",\"headline\":\"headline two\",\"releaseDate\":\"Sun, 12 Jan 2020 18:07:59 EST\",\"summary\":\"summary two\",\"body\":\"body two\"}],\"latestModified\":\"Sun, 12 Jan 2020 18:07:59 EST\",\"matching_count\":\"77\",\"returned_count\":\"8\"}}";
		when(restService.callGetWebService(ArgumentMatchers.anyString())).thenReturn(returnString);
		News cnwNews = CNWNewsServiceImpl.getCNWNews("en_CA", "testpage_URL", "3", "2019");
		
		Assert.assertEquals(8,cnwNews.getPagination().getTotalPages() );
	}

	@Test
	void testGetCNWNewsDetails() throws IOException, ParseException {

		String returnString = "{\"release\":{\"id\":\"1\",\"headline\":\"headline one\",\"releaseDate\":\"Tue, 02 Jan 2018 18:07:59 EST\",\"summary\":\"summary one\",\"body\":\"body one\"}}";
		
		when(restService.callGetWebService(ArgumentMatchers.anyString())).thenReturn(returnString);
		String releaseDate = CNWNewsServiceImpl.getCNWNewsDetails("testid","en").getRelease().getReleaseDate();
		Assert.assertEquals("January 02, 2018", releaseDate);
		
	}

	
}