/**
 * 
 */
package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

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

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * @author mo92 The class
 *         NewsroomAnnouncementModel.
 */
public class NewsroomAnnouncementModelTest {

	/**
	 * The Constant
	 * ARTICLE_PUBLISHED_DATE.
	 */
	//private static final String ARTICLE_PUBLISHED_DATE = "articlePublishedDate";

	/**
	 * The Constant
	 * NEWSROOM_PAGE_PATH.
	 */
	private static final String NEWSROOM_PAGE_PATH = "newsroomPagePath";

	/**
	 * The Constant
	 * NEWSROOM_CONTENT.
	 */
	private static final String NEWSROOM_CONTENT = "newsroomContent";

	/**
	 * The Constant
	 * JCR_CONTENT_DATA_MASTER.
	 */
	private static final String JCR_CONTENT_DATA_MASTER = "/jcr:content/data/master";

	/**
	 * The Constant
	 * NEWSROOM_HEADING.
	 */
	private static final String NEWSROOM_HEADING = "newsroomHeading";

	/** The resolver. */
	@ Mock
	private ResourceResolver resolver;

	/** The article resource. */
	@ Mock
	private Resource articleResource;

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

	/** The announcementModel. */
	@ InjectMocks
	private NewsroomAnnouncementModel announcementModel;
	
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
		String fragmentPath = "/content/dam/sunlife/fragment/";
		String pagePath = "/content/sunlife/ca/en/home";
		try {
			announcementModel.setFragmentPath(fragmentPath);
			when(currentPage.getPath()).thenReturn(pagePath);
			when(coreResourceResolver.getResourceResolver()).thenReturn(resolver);
			when(resolver.getResource(fragmentPath.concat(JCR_CONTENT_DATA_MASTER))).thenReturn(articleResource);
			when(articleResource.getValueMap()).thenReturn(articleContent);
			when(articleContent.containsKey(NEWSROOM_HEADING)).thenReturn(true);
			when(articleContent.containsKey(NEWSROOM_CONTENT)).thenReturn(true);
			when(articleContent.containsKey(NEWSROOM_PAGE_PATH)).thenReturn(true);
			//when(articleContent.containsKey(ARTICLE_PUBLISHED_DATE)).thenReturn(true);
			when(configService.getConfigValues("articleDateFormat", pagePath)).thenReturn("dd/MM/yyyy");
			//when(articleContent.getOrDefault(ARTICLE_PUBLISHED_DATE, new GregorianCalendar())).thenReturn(new Date());
			
			announcementModel.init();
			when(articleContent.get(NEWSROOM_HEADING, String.class)).thenReturn("news heading");
			when(articleContent.get(NEWSROOM_CONTENT, String.class)).thenReturn("news content");
			when(articleContent.get(NEWSROOM_PAGE_PATH, String.class)).thenReturn("news page path");
			
			announcementModel.init();
		} catch (LoginException | RepositoryException e) {
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
			announcementModel.setFragmentPath(fragmentPath);
			when(coreResourceResolver.getResourceResolver()).thenThrow(new LoginException());
			announcementModel.init();
		} catch (Exception e) {
			assertTrue(e instanceof LoginException);
		}
	}
	
	/**
	 * Tests init method for no fragment path specified.
	 */
	@ Test
	void testInitWhenFragmentPathIsNull() {
		announcementModel.init();
	}
}
