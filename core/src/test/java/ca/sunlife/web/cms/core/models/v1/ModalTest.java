package ca.sunlife.web.cms.core.models.v1;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class ModalTest {

	private static final Logger LOGGER = LoggerFactory.getLogger(Modal.class);
	private final AemContext context = new AemContext();

	@InjectMocks
	private Modal moda1;

	@BeforeEach
	public void setup() {
		MockitoAnnotations.initMocks(this);
		context.addModelsForClasses(Modal.class);
		context.load().json("/ca/sunlife/web/cms/core/models/v1/modal/modal.json", "/content");
	}

	@Test
	public void testInit() {
		try {
			context.currentResource("/content/modal");
			Modal modal = context.request().adaptTo(Modal.class);
			moda1.getAdditionalText();
			moda1.getButtons();
			moda1.getContent();
			moda1.getDataSection();
			moda1.getHeading();
			moda1.getModalID();
			moda1.getModalTypes();
			moda1.isTrigger();
			moda1.getId();
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		}
	}
}
