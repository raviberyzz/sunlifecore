package ca.sunlife.web.cms.source.models;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.day.cq.tagging.TagConstants;
import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import ca.sunlife.web.cms.source.constants.NewsConstants;

/**
 * The Class NewsArticleModelTest.
 */
public class NewsArticleModelTest {

	/** The Constant JCR_CONTENT_DATA_MASTER. */
	private static final String JCR_CONTENT_DATA_MASTER = "/jcr:content/data/master";

	/** The Constant JCR_CONTENT_METADATA. */
	private static final String JCR_CONTENT_METADATA = "/jcr:content/metadata";
	
	/** The resolver. */
	@ Mock
	private ResourceResolver resolver;

	/** The article resource. */
	@ Mock
	private Resource articleResource;
	
	/** The metadata resource. */
	@Mock
	private Resource metadataResource;

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
	private ValueMap articleContent;
	
	/** The metadata content. */
	@Mock
	private ValueMap metadataContent;
	
	@ InjectMocks
	NewsArticleModel newsArticleModel;
	
	/**
	 * Sets up mocks.
	 * 
	 * @throws IllegalAccessException
	 */
	@ BeforeEach
	void setUp() throws IllegalAccessException {
		MockitoAnnotations.initMocks(this);
	}
	
	/**
	 * Tests init method.
	 */
	@ Test
	void testInit() {
		String fragmentPath = "/content/dam/sunlife/internal/source/content-fragment/";
		String pagePath = "/content/sunlife/internal/source/en/home";
		String [] tags = {"sunlife:source/business-groups/canada","sunlife:source","sunlife:"};
		try {
			newsArticleModel.setResourceType("/content/sunlife/internal/source/en/news/news-article/jcr:content/root/layout_container/container1/news_announcement");
			newsArticleModel.setFragmentPath(fragmentPath);
			when(currentPage.getPath()).thenReturn(pagePath);
			when(coreResourceResolver.getResourceResolver()).thenReturn(resolver);
			when(resolver.getResource(fragmentPath.concat(JCR_CONTENT_DATA_MASTER))).thenReturn(articleResource);
			when(resolver.getResource(fragmentPath.concat(JCR_CONTENT_METADATA))).thenReturn(metadataResource);
			when(articleResource.getValueMap()).thenReturn(articleContent);
			when(metadataResource.getValueMap()).thenReturn(metadataContent);
			when(articleContent.containsKey(NewsConstants.HEADING_CONSTANT)).thenReturn(true);
			when(articleContent.containsKey(NewsConstants.ARTICLE_SUMMARY_CONSTANT)).thenReturn(true);
			when(articleContent.containsKey(NewsConstants.PAGE_CONSTANT)).thenReturn(true);
			when(articleContent.containsKey(NewsConstants.THUMBNAIL_IMAGE_CONSTANT)).thenReturn(true);
			when(articleContent.containsKey(NewsConstants.PIN_ARTICLE_CONSTANT)).thenReturn(true);
			when(metadataContent.containsKey(TagConstants.PN_TAGS)).thenReturn(true);
			when(configService.getConfigValues("articleDateFormat", pagePath)).thenReturn("dd/MM/yyyy");
			//when(articleContent.get(NewsConstants.TO_CONSTANT, String.class)).thenReturn("To");
			//when(articleContent.get(NewsConstants.FROM_CONSTANT, String.class)).thenReturn("From");
			when(articleContent.get(NewsConstants.HEADING_CONSTANT, String.class)).thenReturn("Heading");
			when(articleContent.get(NewsConstants.ARTICLE_SUMMARY_CONSTANT, String.class)).thenReturn("Article content summary");
			when(articleContent.get(NewsConstants.PAGE_CONSTANT, String.class)).thenReturn("/content/sunlife/internal/source/en");
			when(articleContent.get(NewsConstants.THUMBNAIL_IMAGE_CONSTANT, String.class)).thenReturn("/content/dam/sunlife/internal/source/en");
			when(articleContent.get(NewsConstants.PIN_ARTICLE_CONSTANT, String.class)).thenReturn("true");
			when(metadataContent.get(TagConstants.PN_TAGS, String [].class)).thenReturn(tags);
			newsArticleModel.setPageLocaleDefault("en_CA");
			newsArticleModel.init();
		} catch (LoginException | RepositoryException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * Tests init method for exception.
	 */
	@ Test
	void testInitWhenException() {
		String fragmentPath = "/content/dam/sunlife/internal/source/content-fragment/";		
		try {
			newsArticleModel.setFragmentPath(fragmentPath);
			when(coreResourceResolver.getResourceResolver()).thenThrow(new LoginException());
			newsArticleModel.init();
		} catch (LoginException e) {
			assertTrue(e instanceof LoginException);
		}
	}
	
	/**
	 * Tests init method for no fragment path specified.
	 */
	@ Test
	void testInitWhenFragmentPathIsNull() {
		newsArticleModel.init();
	}
	
	@Test
	void testSetterAndGetter() {
		List<String> tagList = new ArrayList<>();
		tagList.add("test");
		newsArticleModel.setCheckboxDisplayComments("true");
		newsArticleModel.setCheckboxDisplayRating("true");
		newsArticleModel.setCheckboxDisplayTags("true");
		newsArticleModel.setTagList(tagList);
		newsArticleModel.setCheckboxHideDate("01-01-2000");
		assertTrue(newsArticleModel.getCheckboxDisplayComments().equals("true"));
		assertTrue(newsArticleModel.getCheckboxDisplayRating().equals("true"));
		assertTrue(newsArticleModel.getCheckboxDisplayTags().equals("true"));
		assertTrue(newsArticleModel.getTagList().get(0).equals("test"));
		assertTrue(newsArticleModel.getCheckboxHideDate().equals("01-01-2000"));
		assertNotNull(newsArticleModel.getArticleData());
	}
}
