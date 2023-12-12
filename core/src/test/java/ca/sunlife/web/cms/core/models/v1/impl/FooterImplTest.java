package ca.sunlife.web.cms.core.models.v1.impl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith({ AemContextExtension.class })
public class FooterImplTest {

    private final AemContext context = new AemContext();
    FooterImpl footer;

    @BeforeEach
    public void setUp(AemContext context) throws Exception{
        context.addModelsForClasses(FooterImpl.class);
        context.load().json("/ca/sunlife/web/cms/core/models/v1/footer/footer.json", "/content");
    }

    @Test
    void testGetterMethods() {
        context.currentResource("/content/footer");
        footer = context.request().adaptTo(FooterImpl.class);
        assertEquals(1, footer.getTopLinks().size());
        assertEquals(1, footer.getBottomLinks().size());
        assertEquals(1, footer.getSocialMedia().size());

    }
}


