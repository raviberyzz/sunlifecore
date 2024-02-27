/**
 * 
 */
package ca.sunlife.web.cms.core.models.v1.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.Calendar;

import javax.jcr.RepositoryException;

import org.apache.commons.lang.StringUtils;
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

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * The Class ArticleModelTest.
 */
@ ExtendWith(AemContextExtension.class)
public class ArticleImplTest {

	/**
	 * The current page mock.
	 */
	@ Mock
	private Page currentPage;

	/**
	 * The core resource resolver
	 * mock.
	 */
	@ Mock
	private CoreResourceResolver coreResourceResolver;

	/**
	 * The resource resolver mock.
	 */
	@ Mock
	private ResourceResolver resourceResolver;

	/** The config service. */
	@ Mock
	private SiteConfigService configService;

	/**
	 * The article resource mock.
	 */
	@ Mock
	private Resource articleResource;

	/**
	 * The author resource mock.
	 */
	@ Mock
	private Resource authorResource;

	/**
	 * The article model mock.
	 */
	@ InjectMocks
	private ArticleImpl articleImpl;

	/**
	 * The article content mock.
	 */
	@ Mock
	private ValueMap articleContent;

	/**
	 * The author content mock.
	 */
	@ Mock
	private ValueMap authorContent;

	/**
	 * The value map for page
	 * properties.
	 */
	@ Mock
	private ValueMap pageProperties;

	/** The fragment path. */
	private static final String FRAGMENT = "/content/dam/sunlife/external/ca/en/fragment1/";

	/**
	 * The Constant
	 * JCR_CONTENT_DATA_MASTER.
	 */
	private static final String JCR_CONTENT_DATA_MASTER = "/jcr:content/data/master";

	/**
	 * The Constant
	 * ARTICLE_PAGE_LINK.
	 */
	private static final String ARTICLE_PAGE_LINK = "articlePageLink";

	/**
	 * The Constant
	 * ARTICLE_MAIN_DESCRIPTION.
	 */
	private static final String ARTICLE_MAIN_DESCRIPTION = "articleMainDescription";

	/**
	 * The Constant ARTICLE_IMAGE.
	 */
	private static final String ARTICLE_IMAGE = "articleImage";

	/**
	 * The Constant
	 * ARTICLE_HEADLINE.
	 */
	private static final String ARTICLE_HEADLINE = "articleHeadline";

	/**
	 * The Constant
	 * ARTICLE_MINI_DESCRIPTION.
	 */
	private static final String ARTICLE_MINI_DESCRIPTION = "articleMiniDescription";

	/**
	 * The Constant AUTHOR_BODY.
	 */
	private static final String AUTHOR_BODY = "authorBody";

	/**
	 * The Constant AUTHOR_NAME.
	 */
	private static final String AUTHOR_NAME = "authorName";

	/**
	 * The Constant
	 * ARTICLE_AUTHOR.
	 */
	private static final String ARTICLE_AUTHOR = "articleAuthor";

	/**
	 * Sets up mocks.
	 */
	@ BeforeEach
	void setup() {
		MockitoAnnotations.initMocks(this);
		articleImpl.setResourceType("/content/sunlife/external/ca/en/tools-and-resources/money-and-finances/investing-basics/3-market-trends-to-watch-for-the-rest-of-2017-video/jcr:content/root/layout_container/container1/layout_container/container1/article");
	}

	/**
	 * Tests init method when
	 * fragment path is not
	 * specified.
	 */
	@ Test
	void testInitWhenFragmentPathIsNull() {
		articleImpl.init();
	}

	/**
	 * Tests init method.
	 */
	@ Test
	void testInit() {
		String pagePath = "/content/sunlife/external/ca/en/home";
		articleImpl.setFragmentPath(FRAGMENT);
		try {
			when(coreResourceResolver.getResourceResolver()).thenReturn(resourceResolver);
			when(resourceResolver.getResource(FRAGMENT.concat(JCR_CONTENT_DATA_MASTER))).thenReturn(articleResource);
			when(currentPage.getPath()).thenReturn(pagePath);
			when(articleResource.getValueMap()).thenReturn(articleContent);

			when(articleContent.containsKey(ARTICLE_HEADLINE)).thenReturn(true);
			when(articleContent.containsKey(ARTICLE_IMAGE)).thenReturn(true);
			when(articleContent.containsKey(ARTICLE_MAIN_DESCRIPTION)).thenReturn(true);
			when(articleContent.containsKey(ARTICLE_PAGE_LINK)).thenReturn(true);
			when(articleContent.containsKey(ARTICLE_MINI_DESCRIPTION)).thenReturn(true);
			when(articleContent.containsKey(ARTICLE_AUTHOR)).thenReturn(true);
			// when(articleContent.containsKey("articlePublishedDate")).thenReturn(true);

			when(articleContent.get(ARTICLE_HEADLINE, String.class)).thenReturn("This the article headline");
			when(articleContent.get(ARTICLE_IMAGE, String.class)).thenReturn("This the article image");
			when(articleContent.get(ARTICLE_MAIN_DESCRIPTION, String.class)).thenReturn("This the article desc");
			when(articleContent.get(ARTICLE_PAGE_LINK, String.class)).thenReturn("/content/sunlife/article1");
			when(articleContent.get(ARTICLE_MINI_DESCRIPTION, String.class)).thenReturn("article mini desc");
			when(articleContent.getOrDefault(ARTICLE_AUTHOR, StringUtils.EMPTY)).thenReturn("article author");
			// when(articleContent.get("articlePublishedDate",
			// String.class)).thenReturn("10-12-2019");
			when(resourceResolver.getResource("article author/jcr:content/data/master")).thenReturn(authorResource);
			when(authorResource.getValueMap()).thenReturn(authorContent);
			when(authorContent.containsKey(AUTHOR_NAME)).thenReturn(true);
			when(authorContent.containsKey(AUTHOR_BODY)).thenReturn(true);
			when(authorContent.get(AUTHOR_NAME, String.class)).thenReturn("author name");
			when(authorContent.get(AUTHOR_BODY, String.class)).thenReturn("author body");
			when(pageProperties.containsKey("socialMediaImage")).thenReturn(true);
			when(pageProperties.containsKey("socialMediaDescripton")).thenReturn(true);
			when(pageProperties.getOrDefault("socialMediaImage", StringUtils.EMPTY)).thenReturn("/content/dam/sunlife/image");
			when(pageProperties.getOrDefault("socialMediaDescripton", StringUtils.EMPTY)).thenReturn("This the social media desc");
			//when(pageProperties.getOrDefault("socialShare", StringUtils.EMPTY)).thenReturn("True");
			when(currentPage.getProperties()).thenReturn(pageProperties);
			when(configService.getConfigValues("articleDateFormat", pagePath)).thenReturn("dd/MM/yyyy");
			when(configService.getConfigValues("domain", pagePath)).thenReturn("www.ca-dev.com/");
			when(configService.getConfigValues("socialMediaImage", pagePath)).thenReturn("/content/dam/sunlife/image");
			when(configService.getConfigValues("pageDescription", pagePath)).thenReturn("Page description");
			when(configService.getConfigValues("articlePublisherLogo", pagePath)).thenReturn("logo");
			when(currentPage.getLastModified()).thenReturn(Calendar.getInstance());
			// when(articleContent.getOrDefault("articlePublishedDate",
			// new
			// GregorianCalendar())).thenReturn(new
			// Date());
		} catch (LoginException | RepositoryException e) {
			assertTrue(e instanceof LoginException);
		}
		articleImpl.init();
		assertEquals("www.ca-dev.com/logo", articleImpl.getPublisherLogo());
	}

	/**
	 * Tests init method.
	 */
	@ Test
	void testInitWhenParamsAreNull() {
		String pagePath = "/content/sunlife/external/ca/en/home";
		articleImpl.setFragmentPath(FRAGMENT);
		try {
			when(coreResourceResolver.getResourceResolver()).thenReturn(resourceResolver);
			when(resourceResolver.getResource(FRAGMENT.concat(JCR_CONTENT_DATA_MASTER))).thenReturn(articleResource);
			when(currentPage.getPath()).thenReturn(pagePath);
			when(articleResource.getValueMap()).thenReturn(articleContent);

			pageProperties.put("socialMediaImage", "/content/dam/sunlife/image");
			pageProperties.put("socialMediaDescripton", "This the social media desc");

			when(currentPage.getProperties()).thenReturn(pageProperties);
			when(configService.getConfigValues("articleDateFormat", pagePath)).thenReturn("dd/MM/yyyy");
			when(configService.getConfigValues("domain", pagePath)).thenReturn("www.ca-dev.com/");
			when(configService.getConfigValues("socialMediaImage", pagePath)).thenReturn("/content/dam/sunlife/image");
			when(configService.getConfigValues("pageDescription", pagePath)).thenReturn("Page description");
			when(configService.getConfigValues("articlePublisherLogo", pagePath)).thenReturn("logo");
			when(currentPage.getLastModified()).thenReturn(Calendar.getInstance());
		} catch (LoginException | RepositoryException e) {
			assertTrue(e instanceof LoginException);
		}
		articleImpl.init();
		assertEquals("", articleImpl.getArticleData().get(ARTICLE_HEADLINE));
	}

	/**
	 * Tests init method when
	 * exception.
	 */
	@ Test
	void testInitWhenException() {
		articleImpl.setFragmentPath(FRAGMENT);
		try {
			when(coreResourceResolver.getResourceResolver()).thenThrow(new LoginException());
			articleImpl.init();
		} catch (LoginException e) {
			assertTrue(e instanceof LoginException);
		}
	}
}
