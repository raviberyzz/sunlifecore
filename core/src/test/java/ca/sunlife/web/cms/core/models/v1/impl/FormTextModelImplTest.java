package ca.sunlife.web.cms.core.models.v1.impl;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

import static junitx.framework.Assert.assertEquals;

@ExtendWith({ AemContextExtension.class })
public class FormTextModelImplTest {

	private final AemContext context = new AemContext();


	private FormTextModelImpl formtext;

	@BeforeEach
	public void setup() {
		MockitoAnnotations.initMocks(this);
		context.addModelsForClasses(FormTextModelImpl.class);
		context.load().json("/ca/sunlife/web/cms/core/models/v1/formtext/formtext.json", "/content");

	}

	@Test
	public void testInit() {

		context.currentResource("/content/formtext");
		formtext = context.request().adaptTo(FormTextModelImpl.class);
		assertEquals("mb-sl24", formtext.getSpacing());
		assertEquals("search", formtext.getIcon());
		assertEquals("Test Validation", formtext.getValidation());
		assertEquals("Test Validation Error", formtext.getValidationError());
		assertEquals(true, formtext.isIconPosition());

	}

}
