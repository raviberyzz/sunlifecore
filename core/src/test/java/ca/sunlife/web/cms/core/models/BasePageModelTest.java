package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import javax.jcr.RepositoryException;

import org.apache.commons.lang3.reflect.FieldUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.adobe.cq.wcm.core.components.internal.models.v1.SocialMediaHelperImpl;
import com.day.cq.commons.Externalizer;
import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.services.SiteConfigService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import uk.org.lidalia.slf4jtest.TestLogger;
import uk.org.lidalia.slf4jtest.TestLoggerFactory;

@ExtendWith(AemContextExtension.class)
public class BasePageModelTest {
	private final String TWITTER_TITLE = "twitter:title";
	private final String SEO_PAGE_TITLE = "seoPageTitle";
	private final String DUMMY_DOMAIN = "dummyDomain";
	private final String DUMMY_URL = "dummy/url";
	private final String DUMMY_PATH = "/some/dummy/path/for/test";
	private final String PAGE_CATEGORY = "category";
	private final String PAGE_SUBCATEGORY = "subCategory";

	@Mock
	private Page currentPage;
	@Mock
	private SiteConfigService configService;
	@Mock
	private SlingHttpServletRequest request;
	@Mock
	private ResourceResolver resolver;
	@Mock
	private Externalizer externalizer;

	@InjectMocks
	private BasePageModel basePageModel;

	@BeforeEach
	public void setUp() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void testInitMethodNullFields() throws NoSuchMethodException, SecurityException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException {
		Method initMethod = basePageModel.getClass().getDeclaredMethod("init");
		initMethod.setAccessible(true);
		initMethod.invoke(basePageModel);
		assertTrue(basePageModel.getCustomMetadata().isEmpty());

	}

	@Test
	public void testInitMethodValidFieldss() throws IllegalAccessException, NoSuchMethodException, SecurityException,
			IllegalArgumentException, InvocationTargetException {
		TestLogger logger = TestLoggerFactory.getTestLogger(basePageModel.getClass());
		BasePageModel spy = Mockito.spy(new BasePageModel());

		FieldUtils.writeField(spy, "canonicalUrl", "canonicalUrl", true);
		FieldUtils.writeField(spy, "description", "description", true);
		FieldUtils.writeField(spy, "currentPage", currentPage, true);
		FieldUtils.writeField(spy, "configService", configService, true); //
		FieldUtils.writeField(basePageModel, "socialMediaEnabled", true, true);

		spy.setSeoPageTitle(SEO_PAGE_TITLE);
		doReturn(true).when((SocialMediaHelperImpl) spy).isSocialMediaEnabled();
		// doReturn(true).when( spy).isSocialMediaEnabled();

		Method initMethod = BasePageModel.class.getDeclaredMethod("init");
		initMethod.setAccessible(true);
		initMethod.invoke(spy);

		// System.out.println(logger.getLoggingEvents());
		boolean logHasValidOgTitle = TestUtils.getLogArgumentFlag(logger.getLoggingEvents(),
				TWITTER_TITLE + SEO_PAGE_TITLE); // assertTrue(logHasValidOgTitle);
	}

	@Test
	public void testSetAtlLanguages() throws IllegalAccessException, NoSuchMethodException, SecurityException,
			IllegalArgumentException, InvocationTargetException {
		TestLogger logger = TestLoggerFactory.getTestLogger(basePageModel.getClass());

		Class[] methodArgs = new Class[4];
		for (int i = 0; i < 4; i++) {
			methodArgs[i] = String.class;
		}

		when(resolver.getResource(ArgumentMatchers.anyString())).thenReturn(mock(Resource.class));
		when(externalizer.publishLink(ArgumentMatchers.any(ResourceResolver.class), ArgumentMatchers.anyString()))
				.thenReturn(DUMMY_URL);
		when(request.getRequestURI()).thenReturn("dummy/uri");
		when(request.getRequestURL()).thenReturn(new StringBuffer(DUMMY_URL));

		Method setAltMethod = basePageModel.getClass().getDeclaredMethod("setAtlLanguages", methodArgs);
		setAltMethod.setAccessible(true);
		setAltMethod.invoke(basePageModel, "en_fr,en_hindi", "page_Locale", "pagePath", DUMMY_DOMAIN);

		boolean logHasDummyDomain = TestUtils.getLogArgumentFlag(logger.getLoggingEvents(), DUMMY_URL);
		assertTrue(logHasDummyDomain);
	}

	@Test
	public void testSetUDOParameters() throws LoginException, RepositoryException, IllegalAccessException {
		TestLogger logger = TestLoggerFactory.getTestLogger(basePageModel.getClass());
		Page categoryPage = mock(Page.class);
		FieldUtils.writeField(basePageModel, "currentPage", currentPage, true);
		FieldUtils.writeField(basePageModel, "configService", configService, true);

		when(currentPage.getPath()).thenReturn(DUMMY_URL);
		when(configService.getConfigValues(ArgumentMatchers.eq("siteUrl"), ArgumentMatchers.anyString()))
				.thenReturn(DUMMY_PATH);

		when(currentPage.getDepth()).thenReturn(7);
		when(currentPage.getAbsoluteParent(4)).thenReturn(mock(Page.class));
		when(currentPage.getAbsoluteParent(5)).thenReturn(categoryPage);
		when(currentPage.getAbsoluteParent(6)).thenReturn(currentPage);

		when(categoryPage.getNavigationTitle()).thenReturn(PAGE_CATEGORY);
		when(categoryPage.getPageTitle()).thenReturn("PAGE TITLE");
		when(currentPage.getNavigationTitle()).thenReturn(PAGE_SUBCATEGORY);
		when(currentPage.getPageTitle()).thenReturn("page title");
		when(currentPage.getTitle()).thenReturn("title");
		when(currentPage.getName()).thenReturn("name");
		basePageModel.setUDOParameters();

		boolean logHasCategories = TestUtils.getLogArgumentFlag(logger.getLoggingEvents(),
				"/" + PAGE_CATEGORY + "/" + PAGE_SUBCATEGORY);
		assertTrue(logHasCategories);
	}
}
