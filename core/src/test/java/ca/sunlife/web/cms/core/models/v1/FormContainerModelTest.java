package ca.sunlife.web.cms.core.models.v1;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ExtendWith(AemContextExtension.class)
public class FormContainerModelTest {

    private static final Logger LOGGER = LoggerFactory.getLogger(FormContainerModelTest.class);
    private final AemContext context = new AemContext();

    @InjectMocks
    private FormContainerModel formContainerMode1;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        context.addModelsForClasses(FormContainerModel.class);
        context.load().json("/ca/sunlife/web/cms/core/models/v1/formContainer/formContainer.json", "/content");
    }

    @Test
    public void testInit() {
        try {
            context.currentResource("/content/formContainer");
            FormContainerModel formContainerModel = context.request().adaptTo(FormContainerModel.class);
            formContainerMode1.getSpacing();
            formContainerMode1.getFormAction();
            formContainerMode1.getFormTarget();
            formContainerMode1.getActionType();
            formContainerMode1.getDataSection();
            formContainerMode1.getValidation();

        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }
    }

}


