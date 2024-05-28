package ca.sunlife.web.cms.core.models.v1;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static junitx.framework.Assert.assertEquals;

@ExtendWith(AemContextExtension.class)
public class FormContainerModelTest {

    private static final Logger LOGGER = LoggerFactory.getLogger(FormContainerModelTest.class);

    @InjectMocks
    private FormContainerModel formContainerModel;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        formContainerModel.setSpacing("10");
        formContainerModel.setFormAction("http://www.sunlife.ca");
        formContainerModel.setFormTarget("target");
        formContainerModel.setActionType("post");
        formContainerModel.setDataSection("section");
        formContainerModel.setValidation("true");

    }

    @Test
    public void testInit() {
        try {
            assertEquals("10", formContainerModel.getSpacing());
            assertEquals("http://www.sunlife.ca", formContainerModel.getFormAction());
            assertEquals("target", formContainerModel.getFormTarget());
            assertEquals("post", formContainerModel.getActionType());
            assertEquals("section", formContainerModel.getDataSection());
            assertEquals("true", formContainerModel.getValidation());

        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }
    }

}


