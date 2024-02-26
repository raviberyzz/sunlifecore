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

@ExtendWith({AemContextExtension.class})
public class BreadcrumbModelTest {

    private static final Logger LOGGER = LoggerFactory.getLogger(BreadcrumbModelTest.class);
    private final AemContext context = new AemContext();

    @InjectMocks
    private BreadcrumbModel breadcrumbMode1;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        context.addModelsForClasses(BreadcrumbModel.class);
        context.load().json("/ca/sunlife/web/cms/core/models/v1/breadcrumb/breadcrumb.json", "/content");
    }

    @Test
    public void testInit() {
        try {
            context.currentResource("/content/breadcrumb");
            BreadcrumbModel breadcrumbModel = context.request().adaptTo(BreadcrumbModel.class);
            breadcrumbMode1.getSpacing();
            breadcrumbMode1.getLangcode();
            breadcrumbMode1.getStartLevel();


        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }
    }
}


