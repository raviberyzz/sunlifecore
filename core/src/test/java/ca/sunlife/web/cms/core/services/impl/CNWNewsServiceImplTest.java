package ca.sunlife.web.cms.core.services.impl;

import static org.mockito.Mockito.when;

import java.io.IOException;
import java.lang.annotation.Annotation;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import ca.sunlife.web.cms.core.beans.News;
import ca.sunlife.web.cms.core.models.NewsCategory;
import ca.sunlife.web.cms.core.osgi.config.CNWNewsConfig;
import ca.sunlife.web.cms.core.services.RestService;
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
		this.cnwNewsConfig = new CNWNewsConfig() {
			@Override
			public Class<? extends Annotation> annotationType() {
				return null;
			}
			
			@Override
			public String[] getDateFormatLocaleMapping() {
				return new String[] {"en~MMMM dd, yyyy", "fr~dd MMMM yyyy"};
			}
			
			@Override
			public String getCnwServiceUrl() {
				return null;
			}
		};
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
		List<NewsCategory> categories = new ArrayList<NewsCategory>();
		categories.add(new NewsCategory() {
			@Override
			public String getCategory() {
				return "773";
			}
		});
		Assert.assertEquals("Issue with date formatting , test failed","January 12, 2020",
				CNWNewsServiceImpl.getCNWNewsOverview("en", "3", categories).getReleases().getRelease().get(0).getReleaseDate()
				);

	}
	
	@Test
	void testGetCNWNews() throws IOException {

		String returnString = "{\"releases\":{\"release\":[{\"id\":\"1\",\"headline\":\"headline one\",\"releaseDate\":\"Sun, 12 Jan 2020 18:07:59 EST\",\"summary\":\"summary one\",\"body\":\"body one\"},{\"id\":\"2\",\"headline\":\"headline two\",\"releaseDate\":\"Sun, 12 Jan 2020 18:07:59 EST\",\"summary\":\"summary two\",\"body\":\"body two\"}],\"latestModified\":\"Sun, 12 Jan 2020 18:07:59 EST\",\"matching_count\":\"77\",\"returned_count\":\"8\"}}";
		when(restService.callGetWebService(ArgumentMatchers.anyString())).thenReturn(returnString);
		CNWNewsServiceImpl.activate(cnwNewsConfig);
		List<NewsCategory> categories = new ArrayList<NewsCategory>();
		categories.add(new NewsCategory() {
			@Override
			public String getCategory() {
				return "773";
			}
		});
		News cnwNews = CNWNewsServiceImpl.getCNWNews("en", "testpage_URL", "3", "2019", "10", categories);
		
		Assert.assertEquals(8,cnwNews.getPagination().getTotalPages() );
	}

	@Test
	void testGetCNWNewsDetails() throws IOException, ParseException {

		String returnString = "{\"release\":{\"id\":\"1\",\"headline\":\"headline one\",\"releaseDate\":\"Tue, 02 Jan 2018 18:07:59 EST\",\"summary\":\"summary one\",\"body\":\"body one\"}}";
		CNWNewsServiceImpl.activate(cnwNewsConfig);
		when(restService.callGetWebService(ArgumentMatchers.anyString())).thenReturn(returnString);
		String releaseDate = CNWNewsServiceImpl.getCNWNewsDetails("testid","en").getRelease().getReleaseDate();
		Assert.assertEquals("January 02, 2018", releaseDate);
		
	}

	
}