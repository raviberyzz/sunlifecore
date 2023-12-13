package ca.sunlife.web.cms.core.models.v1.impl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import com.adobe.cq.wcm.core.components.models.Embed;
import org.mockito.Mockito;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.mock;

@ExtendWith({ AemContextExtension.class })
public class EmbedImplTest {

    private final AemContext context = new AemContext();
    EmbedImpl embed;

    @BeforeEach
    public void setUp(AemContext context) throws Exception{
        context.addModelsForClasses(EmbedImpl.class);
        context.load().json("/ca/sunlife/web/cms/core/models/v1/embed/embed.json", "/content");
    }

    @Test
    void testGetterMethods() {
        context.currentResource("/content/embed");
        embed = context.request().adaptTo(EmbedImpl.class);       
        assertNull(embed.getUrl());
        assertNull(embed.getEmbeddableResourceType());
        assertEquals(Embed.Type.HTML, embed.getType());
        assertEquals("<div>html</div>", embed.getHtml());        

    }
}