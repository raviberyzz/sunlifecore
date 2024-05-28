package ca.sunlife.web.cms.core.models.v1.impl;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(AemContextExtension.class)
public class CardImplTest {

    private final AemContext context = new AemContext();

    private CardImpl card;

    private Page page;
    private Resource resource;

    @BeforeEach
    public void setup(AemContext context) throws Exception {
        context.addModelsForClasses(CardImpl.class);
        context.load().json("/ca/sunlife/web/cms/core/models/v1/card/card.json", "/content");
    }

    @Test
    void testGetComboList() throws Exception {
        card = context.currentResource("/content/card").adaptTo(CardImpl.class);
        assertEquals(1, card.getComboList().size());
        card.getCardContainer();
    }
}
