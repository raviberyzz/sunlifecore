/**
 * 
 */
package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.HashMap;
import java.util.Map;

import javax.jcr.RepositoryException;

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
 * @author yl26 The class
 *         RelatedArticlesTest.
 */
@ ExtendWith(AemContextExtension.class)
public class RelatedArticlesTest {
	
	/** The Constant JCR_CONTENT_DATA_MASTER. */
	private static final String JCR_CONTENT_DATA_MASTER = "/jcr:content/data/master";
	
	/** The Constant ELEMENT_NAMES. */
	  private static final String [ ] ELEMENT_NAMES = { "articlePublishedDate", "articleHeadline",
	      "articlePageLink", "articleAuthor", "articleMiniDescription", "articleImage",
	      "articleMainDescription", "articleThumbnailImage" };

	  /** The article data. */
	  private final Map <String, String> articleData = new HashMap <>();

	/**
	 * The current page mock.
	 */
	@ Mock
	private Page currentPage;

	/** The config service. */
	@ Mock
	private SiteConfigService configService;

	/**
	 * The Related Articles
	 * model.
	 */
	@ InjectMocks
	private RelatedArticles relatedArticles;
	
	/** The articleContent. */
	@ Mock
	private ValueMap articleContent;
	
	/** The resolver. */
	@ Mock
	private ResourceResolver resolver;
	
	/**
	 * The core resource resolver.
	 */
	@ Mock
	private CoreResourceResolver coreResourceResolver;
	
	/** The article resource. */
	@ Mock
	private Resource articleResource;

	/**
	 * Sets up mocks.
	 */
	@ BeforeEach
	void setup() {
		MockitoAnnotations.initMocks(this);
	}

	/**
	 * Tests init method when
	 * fragment path is not
	 * specified.
	 */
	@ Test
	void testInitWhenFragmentPathIsNull() {
		relatedArticles.init();
	}

	/**
	 * Tests init method.
	 */
	@ Test
	void testInit() {
		String fragmentPath = "/content/dam/sunlife/fragment/";
		String pagePath = "/content/sunlife/ca/en/home";
		try {
				relatedArticles.setArticleFragmentPath(fragmentPath);
				when(currentPage.getPath()).thenReturn(pagePath);
				when(coreResourceResolver.getResourceResolver()).thenReturn(resolver);
				when(resolver.getResource(fragmentPath.concat(JCR_CONTENT_DATA_MASTER))).thenReturn(articleResource);
				when(articleResource.getValueMap()).thenReturn(articleContent);
				//when(currentPage.getPath()).thenReturn("/content/dam/sunlife/external/slgi/en/content-fragments/insights-and-resources/insights/investor-education");
				relatedArticles.init();
		} catch (LoginException e) {
			e.printStackTrace();
		}
			
	}
	
	/**
	 * Tests init method for exception.
	 */
	@ Test
	void testInitWhenException() {
		String fragmentPath = "/content/dam/sunlife/fragment/";
		try {
			relatedArticles.setArticleFragmentPath(fragmentPath);
			when(coreResourceResolver.getResourceResolver()).thenThrow(new LoginException());
			relatedArticles.init();
		} catch (Exception e) {
			assertTrue(e instanceof LoginException);
		}
	}

}
