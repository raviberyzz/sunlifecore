package ca.sunlife.web.cms.core.models.v1.impl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(AemContextExtension.class)
public class DynamicCardContainerImplTest {

    private final AemContext context = new AemContext();

    private DynamicCardContainerImpl dynamicCardContainer;

    @BeforeEach
    public void setup(AemContext context) throws Exception {
        context.addModelsForClasses(DynamicCardContainerImpl.class);
        context.load().json("/ca/sunlife/web/cms/core/models/v1/dynamic-card-container/dynamic-card-container.json", "/content");
    }

    @Test
    void testGetCardType() throws Exception {
        dynamicCardContainer = context.currentResource("/content/dynamic-card-container").adaptTo(DynamicCardContainerImpl.class);
        assertEquals("horizontal", dynamicCardContainer.getCardType());
    }
}
