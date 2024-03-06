package ca.sunlife.web.cms.core.models.v1.impl;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextBuilder;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.factory.ModelFactory;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.mockito.internal.util.reflection.FieldSetter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.acs.commons.models.injectors.annotation.impl.ChildResourceFromRequestAnnotationProcessorFactory;
import com.adobe.acs.commons.models.injectors.impl.AemObjectInjector;
import com.adobe.acs.commons.models.injectors.impl.ChildResourceFromRequestInjector;

import static junitx.framework.Assert.assertEquals;

import java.util.Calendar;

import javax.jcr.RepositoryException;

import ca.sunlife.web.cms.core.models.BreadcrumbModel;
import ca.sunlife.web.cms.core.models.v1.Breadcrumb;
import ca.sunlife.web.cms.core.models.v1.TabsModel;
import ca.sunlife.web.cms.core.models.v1.impl.BreadcrumbImpl;

@ExtendWith({ AemContextExtension.class })
public class BreadcrumbImplTest {

	private final AemContext context = new AemContext();

	@InjectMocks
	private BreadcrumbImpl breadcrumb;

	@BeforeEach
	public void setup() {
		MockitoAnnotations.initMocks(this);
		context.addModelsForClasses(BreadcrumbImpl.class);
		context.load().json("/ca/sunlife/web/cms/core/models/v1/breadcrumb/breadcrumb.json", "/content");

	}

	@Test
	public void testInit() {

		context.currentResource("/content/breadcrumb");
		breadcrumb = context.request().adaptTo(BreadcrumbImpl.class);
		assertEquals("mb-sl24", breadcrumb.getSpacing());
		assertEquals("en", breadcrumb.getLangcode());
		assertEquals("4", breadcrumb.getStartLevel());

	}

}
