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
public class SitemapModelTest {
    private final Logger LOGGER = LoggerFactory.getLogger(SitemapModelTest.class);
    @InjectMocks
    private SitemapModel sitemapModel;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        sitemapModel.setSpacing("10");
    }

    @Test
    public void testInit() {
        try {

            assertEquals("10", sitemapModel.getSpacing());
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }
    }

}


