package ca.sunlife.web.cms.core.services.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.lang.annotation.Annotation;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import ca.sunlife.web.cms.core.beans.News;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.models.NewsCategory;
import ca.sunlife.web.cms.core.osgi.config.CNWNewsConfig;
import ca.sunlife.web.cms.core.services.RestService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junit.framework.Assert;

@ ExtendWith (AemContextExtension.class)
public class CNWNewsServiceImplTest {
	@ Mock
	private RestService restService;
	@ Mock
	private CNWNewsConfig cnwNewsConfig;
	@ InjectMocks
	private CNWNewsServiceImpl CNWNewsServiceImpl;

	@ BeforeEach
	void setup () {
		MockitoAnnotations.initMocks(this);
		setCnwNewsConfig(new String[] { "en~MMMM dd, yyyy", "fr~dd MMMM yyyy" }, null);
	}

	@ Test
	void activateTest () {
		CNWNewsServiceImpl.activate(cnwNewsConfig);
	}

	List<NewsCategory> getNewsCategories (String[] categories) {
		List<NewsCategory> categoryList = new ArrayList<NewsCategory>();
		for (String category : categories) {
			categoryList.add(new NewsCategory() {
				@ Override
				public String getCategory () {
					return category;
				}
			});
		}
		return categoryList;
	}

	void setCnwNewsConfig (String[] dataFormatMap, String cnwUrl) {
		cnwNewsConfig = new CNWNewsConfig() {
			@ Override
			public Class<? extends Annotation> annotationType () {
				return null;
			}

			@ Override
			public String[] getDateFormatLocaleMapping () {
				return dataFormatMap;
			}

			@ Override
			public String getCnwServiceUrl () {
				return cnwUrl;
			}
		};
	}

	@ Test
	void testGetCNWNewsOverview () throws IOException, ApplicationException, SystemException {
		String returnString = "{\"releases\":{\"release\":[{\"id\":\"1\",\"headline\":\"headline one\",\"releaseDate\":\"Sun, 12 Jan 2020 18:07:59 EST\",\"summary\":\"summary one\",\"body\":\"body one\"},{\"id\":\"2\",\"headline\":\"headline two\",\"releaseDate\":\"Sun, 12 Jan 2020 18:07:59 EST\",\"summary\":\"summary two\",\"body\":\"body two\"}],\"latestModified\":null,\"matching_count\":null,\"returned_count\":null}}";
		when(restService.callGetWebService(ArgumentMatchers.anyString(), ArgumentMatchers.any())).thenReturn(returnString);
		CNWNewsServiceImpl.activate(cnwNewsConfig);
		Assert.assertEquals("Issue with date formatting , test failed", "January 12, 2020",
				CNWNewsServiceImpl.getCNWNewsOverview("en", "3", getNewsCategories(new String[] { "773" })).getReleases()
						.getRelease().get(0).getReleaseDate());
		Assert.assertEquals("Issue with date formatting , test failed", "12 janvier 2020",
				CNWNewsServiceImpl.getCNWNewsOverview("fr", "3", getNewsCategories(new String[] { "773" })).getReleases()
						.getRelease().get(0).getReleaseDate());
	}

	@ Test
	void testGetCNWNewsOverviewWhenDateFormatMapIsNotSet () throws IOException, ApplicationException, SystemException {
		String returnString = "{\"releases\":{\"release\":[{\"id\":\"1\",\"headline\":\"headline one\",\"releaseDate\":\"Sun, 12 Jan 2020 18:07:59 EST\",\"summary\":\"summary one\",\"body\":\"body one\"},{\"id\":\"2\",\"headline\":\"headline two\",\"releaseDate\":\"Sun, 12 Jan 2020 18:07:59 EST\",\"summary\":\"summary two\",\"body\":\"body two\"}],\"latestModified\":null,\"matching_count\":null,\"returned_count\":null}}";
		when(restService.callGetWebService(ArgumentMatchers.anyString(), ArgumentMatchers.any())).thenReturn(returnString);
		setCnwNewsConfig(null, null);
		CNWNewsServiceImpl.activate(cnwNewsConfig);
		Assert.assertNull(CNWNewsServiceImpl.getCNWNewsOverview("en", "3", getNewsCategories(new String[] { "773" })));
	}

	@ Test
	void testGetCNWNewsOverviewWhenDateParseException () throws IOException, ApplicationException, SystemException {
		String returnString = "{\"releases\":{\"release\":[{\"id\":\"1\",\"headline\":\"headline one\",\"releaseDate\":\"10-10-2020\",\"summary\":\"summary one\",\"body\":\"body one\"},{\"id\":\"2\",\"headline\":\"headline two\",\"releaseDate\":\"Sun, 12 Jan 2020 18:07:59 EST\",\"summary\":\"summary two\",\"body\":\"body two\"}],\"latestModified\":null,\"matching_count\":null,\"returned_count\":null}}";
		when(restService.callGetWebService(ArgumentMatchers.anyString(), ArgumentMatchers.any())).thenReturn(returnString);
		CNWNewsServiceImpl.activate(cnwNewsConfig);
		assertEquals(2, CNWNewsServiceImpl.getCNWNewsOverview("en", "3", getNewsCategories(new String[] { "773" }))
				.getReleases().getRelease().size());
	}

	@ Test
	void testGetCNWNews () throws IOException, ApplicationException, SystemException {
		String returnString = "{\"releases\":{\"release\":[{\"id\":\"1\",\"headline\":\"headline one\",\"releaseDate\":\"Sun, 12 Jan 2020 18:07:59 EST\",\"summary\":\"summary one\",\"body\":\"body one\"},{\"id\":\"2\",\"headline\":\"headline two\",\"releaseDate\":\"Sun, 12 Jan 2020 18:07:59 EST\",\"summary\":\"summary two\",\"body\":\"body two\"}],\"latestModified\":\"Sun, 12 Jan 2020 18:07:59 EST\",\"matching_count\":\"77\",\"returned_count\":\"8\"}}";
		when(restService.callGetWebService(ArgumentMatchers.anyString(), ArgumentMatchers.any())).thenReturn(returnString);
		CNWNewsServiceImpl.activate(cnwNewsConfig);
		News cnwNews = CNWNewsServiceImpl.getCNWNews("en", "testpage_URL", "3", "2019", "10",
				getNewsCategories(new String[] { "773" }));
		Assert.assertEquals(8, cnwNews.getPagination().getTotalPages());
		News cnwNewsFr = CNWNewsServiceImpl.getCNWNews("fr", "testpage_URL", "3", "2019", "10",
				getNewsCategories(new String[] { "773" }));
		Assert.assertEquals(8, cnwNewsFr.getPagination().getTotalPages());
	}

	@ Test
	void testGetCNWNewsWhenDateFormatMapIsNotSet () throws IOException, ApplicationException, SystemException {
		String returnString = "{\"releases\":{\"release\":[{\"id\":\"1\",\"headline\":\"headline one\",\"releaseDate\":\"Sun, 12 Jan 2020 18:07:59 EST\",\"summary\":\"summary one\",\"body\":\"body one\"},{\"id\":\"2\",\"headline\":\"headline two\",\"releaseDate\":\"Sun, 12 Jan 2020 18:07:59 EST\",\"summary\":\"summary two\",\"body\":\"body two\"}],\"latestModified\":\"Sun, 12 Jan 2020 18:07:59 EST\",\"matching_count\":\"77\",\"returned_count\":\"8\"}}";
		when(restService.callGetWebService(ArgumentMatchers.anyString(), ArgumentMatchers.any())).thenReturn(returnString);
		setCnwNewsConfig(null, null);
		CNWNewsServiceImpl.activate(cnwNewsConfig);
		News cnwNews = CNWNewsServiceImpl.getCNWNews("en", "testpage_URL", "3", "2019", "10",
				getNewsCategories(new String[] { "773" }));
		Assert.assertNull(cnwNews);
	}

	@ Test
	void testGetCNWNewsWhenDateParseException () throws IOException, ApplicationException, SystemException {
		String returnString = "{\"releases\":{\"release\":[{\"id\":\"1\",\"headline\":\"headline one\",\"releaseDate\":\"10-10-2020\",\"summary\":\"summary one\",\"body\":\"body one\"},{\"id\":\"2\",\"headline\":\"headline two\",\"releaseDate\":\"Sun, 12 Jan 2020 18:07:59 EST\",\"summary\":\"summary two\",\"body\":\"body two\"}],\"latestModified\":\"Sun, 12 Jan 2020 18:07:59 EST\",\"matching_count\":\"77\",\"returned_count\":\"8\"}}";
		when(restService.callGetWebService(ArgumentMatchers.anyString(), ArgumentMatchers.any())).thenReturn(returnString);
		CNWNewsServiceImpl.activate(cnwNewsConfig);
		News cnwNews = CNWNewsServiceImpl.getCNWNews("en", "testpage_URL", "3", "2019", "10",
				getNewsCategories(new String[] { "773" }));
		Assert.assertEquals(2, cnwNews.getReleaseMain().getReleases().getRelease().size());
	}

	@ Test
	void testGetCNWNewsWhenNewsItemsAreLessThanTen () throws IOException, ApplicationException, SystemException {
		String returnString = "{\"releases\":{\"matching_count\": 2,\"release\":[{\"headline\": \"Placements mondiaux Sun Life lance ses mandats priv&eacute;s de placement\",\"id\": 123287,\"releaseDate\": \"Wed, 26 Feb 2020 09:00:00 -0500\",\"subheadline\":{},\"summary\": \"<p>Placements mondiaux Sun Life (Canada) inc. (&laquo; Placements mondiaux Sun Life &raquo;) lance aujourd'hui les Mandats priv&eacute;s de placement Sun Life (&laquo; les mandats &raquo;). Les mandats s'appuient sur les...<\\/p>\"},{\"headline\": \"100 000 $ pour plus de services en sant&eacute; mentale pour les jeunes de la r&eacute;gion de Qu&eacute;bec\",\"id\": 123286,\"releaseDate\": \"Mon, 24 Feb 2020 14:45:00 -0500\",\"subheadline\": {},\"summary\": \"<p>Le maire de Qu&eacute;bec, M. R&eacute;gis Labeaume, et le pr&eacute;sident de la Sun Life Canada, M. Jacques Goulet, annoncent aujourd'hui la cr&eacute;ation d'un fonds d'investissement en sant&eacute; mentale au montant de...<\\/p>\"}],\"returned_count\": 2}}";
		when(restService.callGetWebService(ArgumentMatchers.anyString(), ArgumentMatchers.any())).thenReturn(returnString);
		CNWNewsServiceImpl.activate(cnwNewsConfig);
		News cnwNews = CNWNewsServiceImpl.getCNWNews("en", "testpage_URL", "0", "2019", "10",
				getNewsCategories(new String[] { "773" }));
		Assert.assertEquals(2, cnwNews.getReleaseMain().getReleases().getRelease().size());
	}

	@ Test
	void testGetCNWNewsToTestFirstPageBreak () throws IOException, ApplicationException, SystemException {
		String returnString = "{\"releases\":{\"matching_count\": 50,\"release\":[{\"headline\": \"Placements mondiaux Sun Life lance ses mandats priv&eacute;s de placement\",\"id\": 123287,\"releaseDate\": \"Wed, 26 Feb 2020 09:00:00 -0500\",\"subheadline\":{},\"summary\": \"<p>Placements mondiaux Sun Life (Canada) inc. (&laquo; Placements mondiaux Sun Life &raquo;) lance aujourd'hui les Mandats priv&eacute;s de placement Sun Life (&laquo; les mandats &raquo;). Les mandats s'appuient sur les...<\\/p>\"},{\"headline\": \"100 000 $ pour plus de services en sant&eacute; mentale pour les jeunes de la r&eacute;gion de Qu&eacute;bec\",\"id\": 123286,\"releaseDate\": \"Mon, 24 Feb 2020 14:45:00 -0500\",\"subheadline\": {},\"summary\": \"<p>Le maire de Qu&eacute;bec, M. R&eacute;gis Labeaume, et le pr&eacute;sident de la Sun Life Canada, M. Jacques Goulet, annoncent aujourd'hui la cr&eacute;ation d'un fonds d'investissement en sant&eacute; mentale au montant de...<\\/p>\"}],\"returned_count\": 2}}";
		when(restService.callGetWebService(ArgumentMatchers.anyString(), ArgumentMatchers.any())).thenReturn(returnString);
		CNWNewsServiceImpl.activate(cnwNewsConfig);
		News cnwNews = CNWNewsServiceImpl.getCNWNews("en", "testpage_URL", "1", "2019", "10",
				getNewsCategories(new String[] { "773" }));
		Assert.assertEquals(2, cnwNews.getReleaseMain().getReleases().getRelease().size());
	}

	@ Test
	void testGetCNWNewsToTestSecondPageBreak () throws IOException, ApplicationException, SystemException {
		String returnString = "{\"releases\":{\"matching_count\": 70,\"release\":[{\"headline\": \"Placements mondiaux Sun Life lance ses mandats priv&eacute;s de placement\",\"id\": 123287,\"releaseDate\": \"Wed, 26 Feb 2020 09:00:00 -0500\",\"subheadline\":{},\"summary\": \"<p>Placements mondiaux Sun Life (Canada) inc. (&laquo; Placements mondiaux Sun Life &raquo;) lance aujourd'hui les Mandats priv&eacute;s de placement Sun Life (&laquo; les mandats &raquo;). Les mandats s'appuient sur les...<\\/p>\"},{\"headline\": \"100 000 $ pour plus de services en sant&eacute; mentale pour les jeunes de la r&eacute;gion de Qu&eacute;bec\",\"id\": 123286,\"releaseDate\": \"Mon, 24 Feb 2020 14:45:00 -0500\",\"subheadline\": {},\"summary\": \"<p>Le maire de Qu&eacute;bec, M. R&eacute;gis Labeaume, et le pr&eacute;sident de la Sun Life Canada, M. Jacques Goulet, annoncent aujourd'hui la cr&eacute;ation d'un fonds d'investissement en sant&eacute; mentale au montant de...<\\/p>\"}],\"returned_count\": 2}}";
		when(restService.callGetWebService(ArgumentMatchers.anyString(), ArgumentMatchers.any())).thenReturn(returnString);
		CNWNewsServiceImpl.activate(cnwNewsConfig);
		News cnwNews = CNWNewsServiceImpl.getCNWNews("en", "testpage_URL", "6", "2019", "10",
				getNewsCategories(new String[] { "773" }));
		Assert.assertEquals(2, cnwNews.getReleaseMain().getReleases().getRelease().size());
	}

	@ Test
	void testGetCNWNewsWhenNoPageBreak () throws IOException, ApplicationException, SystemException {
		String returnString = "{\"releases\":{\"matching_count\": 120,\"release\":[{\"headline\": \"Placements mondiaux Sun Life lance ses mandats priv&eacute;s de placement\",\"id\": 123287,\"releaseDate\": \"Wed, 26 Feb 2020 09:00:00 -0500\",\"subheadline\":{},\"summary\": \"<p>Placements mondiaux Sun Life (Canada) inc. (&laquo; Placements mondiaux Sun Life &raquo;) lance aujourd'hui les Mandats priv&eacute;s de placement Sun Life (&laquo; les mandats &raquo;). Les mandats s'appuient sur les...<\\/p>\"},{\"headline\": \"100 000 $ pour plus de services en sant&eacute; mentale pour les jeunes de la r&eacute;gion de Qu&eacute;bec\",\"id\": 123286,\"releaseDate\": \"Mon, 24 Feb 2020 14:45:00 -0500\",\"subheadline\": {},\"summary\": \"<p>Le maire de Qu&eacute;bec, M. R&eacute;gis Labeaume, et le pr&eacute;sident de la Sun Life Canada, M. Jacques Goulet, annoncent aujourd'hui la cr&eacute;ation d'un fonds d'investissement en sant&eacute; mentale au montant de...<\\/p>\"}],\"returned_count\": 2}}";
		when(restService.callGetWebService(ArgumentMatchers.anyString(), ArgumentMatchers.any())).thenReturn(returnString);
		CNWNewsServiceImpl.activate(cnwNewsConfig);
		News cnwNews = CNWNewsServiceImpl.getCNWNews("en", "testpage_URL", "6", "2019", "10",
				getNewsCategories(new String[] { "773" }));
		Assert.assertEquals(2, cnwNews.getReleaseMain().getReleases().getRelease().size());
	}

	@ Test
	void testGetCNWNewsWhenCnwServiceIsDown () throws IOException, ApplicationException, SystemException {
		when(restService.callGetWebService(ArgumentMatchers.anyString(), ArgumentMatchers.any())).thenThrow(new IOException());
		CNWNewsServiceImpl.activate(cnwNewsConfig);
		Assertions.assertThrows(IOException.class, () -> {
			CNWNewsServiceImpl.getCNWNews("en", "testpage_URL", "5", "2020", "10", getNewsCategories(new String[] { "774" }));
		});
	}

	@ Test
	void testGetCNWNewsDetails () throws IOException, ParseException, ApplicationException, SystemException {
		String returnString = "{\"release\":{\"id\":\"1\",\"headline\":\"headline one\",\"releaseDate\":\"Tue, 02 Jan 2018 18:07:59 EST\",\"summary\":\"summary one\",\"body\":\"body one\"}}";
		CNWNewsServiceImpl.activate(cnwNewsConfig);
		when(restService.callGetWebService(ArgumentMatchers.anyString(), ArgumentMatchers.any())).thenReturn(returnString);
		String releaseDate = CNWNewsServiceImpl.getCNWNewsDetails("testid", "en").getRelease().getReleaseDate();
		Assert.assertEquals("January 02, 2018", releaseDate);
	}

	@ Test
	void testGetCNWNewsDetailsWhenDateParseException ()
			throws IOException, ParseException, ApplicationException, SystemException {
		String returnString = "{\"release\":{\"id\":\"1\",\"headline\":\"headline one\",\"releaseDate\":\"10/10/2020\",\"summary\":\"summary one\",\"body\":\"body one\"}}";
		CNWNewsServiceImpl.activate(cnwNewsConfig);
		when(restService.callGetWebService(ArgumentMatchers.anyString(), ArgumentMatchers.any())).thenReturn(returnString);
		Assertions.assertThrows(ParseException.class, () -> {
			CNWNewsServiceImpl.getCNWNewsDetails("testid", "en");
		});
	}

}
