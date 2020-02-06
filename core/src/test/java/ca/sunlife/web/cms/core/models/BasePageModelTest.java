package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.reflect.FieldUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.services.SiteConfigService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import uk.org.lidalia.slf4jtest.LoggingEvent;
import uk.org.lidalia.slf4jtest.TestLogger;
import uk.org.lidalia.slf4jtest.TestLoggerFactory;

@ExtendWith(AemContextExtension.class)
public class BasePageModelTest {
	private final String OG_TITLE = "og:title=";
	private final String SEO_PAGE_TITLE = "seoPageTitle";
	private final String DUMMY_DOMAIN = "dummyDomain";
	@Mock
	private Page currentPage;
	@Mock
	private SiteConfigService configService;
	@Mock
	private SlingHttpServletRequest request;
	@Mock
	private Map<String, String> altLanguageLinks;
	@Mock
	private ResourceResolver resolver;

	@InjectMocks
	private BasePageModel basePageModel;

	@BeforeEach
	public void setUp() throws IllegalAccessException {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void testInitMethodNullFields() throws NoSuchMethodException, SecurityException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException {
		TestLogger logger = TestLoggerFactory.getTestLogger(basePageModel.getClass());

		Method initMethod = basePageModel.getClass().getDeclaredMethod("initModel");
		initMethod.setAccessible(true);
		initMethod.invoke(basePageModel);

		boolean logHasNullOgTitle = Utils.getLogArgumentFlag(logger.getLoggingEvents(), OG_TITLE + null);
		assertTrue(logHasNullOgTitle);

	}

	@Test
	public void testInitMethodValidFields() throws NoSuchMethodException, SecurityException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException {
		TestLogger logger = TestLoggerFactory.getTestLogger(basePageModel.getClass());
		FieldUtils.writeField(basePageModel, "canonicalUrl", "canonicalUrl", true);
		FieldUtils.writeField(basePageModel, "description", "description", true);
		FieldUtils.writeField(basePageModel, "seoPageTitle", SEO_PAGE_TITLE, true);
		FieldUtils.writeField(basePageModel, "seoAltUrls", "xyz~pqrs,abc~def", true);
		Method initMethod = basePageModel.getClass().getDeclaredMethod("initModel");
		initMethod.setAccessible(true);
		initMethod.invoke(basePageModel);

		boolean logHasValidOgTitle = Utils.getLogArgumentFlag(logger.getLoggingEvents(), OG_TITLE + SEO_PAGE_TITLE);
		assertTrue(logHasValidOgTitle);
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

		Method setAltMethod = basePageModel.getClass().getDeclaredMethod("setAtlLanguages", methodArgs);
		setAltMethod.setAccessible(true);
		setAltMethod.invoke(basePageModel, "en~fr,en~hindi", "pageLocale", "pagePath", DUMMY_DOMAIN);

		boolean logHasDummyDomain = Utils.getLogArgumentFlag(logger.getLoggingEvents(), DUMMY_DOMAIN);
		assertTrue(logHasDummyDomain);
	}
}
