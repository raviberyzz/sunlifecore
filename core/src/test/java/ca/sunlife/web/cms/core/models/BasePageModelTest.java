package ca.sunlife.web.cms.core.models;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import org.apache.commons.lang3.reflect.FieldUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.services.SiteConfigService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class BasePageModelTest {
	//private final String DUMMY_URL = "dummy/url";

	@Mock
	private Page currentPage;
	@Mock
	private SiteConfigService configService;
	@Mock
	private SlingHttpServletRequest request;

	@InjectMocks
	private BasePageModel basePageModel;

	@BeforeEach
	public void setUp() throws IllegalAccessException {
		/*MockitoAnnotations.initMocks(this);
		FieldUtils.writeField(basePageModel, "canonicalUrl", DUMMY_URL, true);*/
	}

	@Test
	public void testInitMethodValidFields() throws IllegalAccessException, NoSuchMethodException, SecurityException,
			IllegalArgumentException, InvocationTargetException {
		/*Method initMethod = basePageModel.getClass().getDeclaredMethod("init");
		initMethod.setAccessible(true);
		initMethod.invoke(basePageModel);*/
	}

}
