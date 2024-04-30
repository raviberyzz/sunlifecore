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

@ExtendWith({AemContextExtension.class})
public class BreadcrumbModelTest {

    private static final Logger LOGGER = LoggerFactory.getLogger(BreadcrumbModelTest.class);

    @InjectMocks
    BreadcrumbModel breadcrumbModel;


    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        breadcrumbModel.setLangcode("en");
        breadcrumbModel.setSpacing("10");
        breadcrumbModel.setStartLevel("1");

    }

    @Test
    public void testInit() {

        try {
            assertEquals("10", breadcrumbModel.getSpacing());
            assertEquals("en", breadcrumbModel.getLangcode());
            assertEquals("1", breadcrumbModel.getStartLevel());
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }
    }
}


