package ca.sunlife.web.cms.core.models.v1;

import ca.sunlife.web.cms.core.models.v1.impl.FooterImpl;
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
public class SitemapModelTest {
    private static final Logger LOGGER = LoggerFactory.getLogger(SitemapModelTest.class);
    private final AemContext context = new AemContext();
    @InjectMocks
    private SitemapModel sitemapMode1;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        context.addModelsForClasses(SitemapModel.class);
        context.load().json("/ca/sunlife/web/cms/core/models/v1/sitemap/sitemap.json", "/content");
    }

    @Test
    public void testInit() {
        try {
            context.currentResource("/content/sitemap");
            SitemapModel sitemapModel = context.request().adaptTo(SitemapModel.class);
            sitemapMode1.getSpacing();
            sitemapMode1.getAccessibilityLabel();
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }
    }

}


