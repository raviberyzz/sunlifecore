package ca.sunlife.web.cms.core.models.v1.impl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith({ AemContextExtension.class })
public class ArticleListImplTest {

    private final AemContext context = new AemContext();
    ArticleListImpl articleList;

    @BeforeEach
    public void setUp(AemContext context) throws Exception{
        context.addModelsForClasses(ArticleListImpl.class);
        context.load().json("/ca/sunlife/web/cms/core/models/v1/articleList/articleList.json", "/content");
    }

    @Test
    void testGetterMethods() {
        context.currentResource("/content/articleList");
        articleList = context.request().adaptTo(ArticleListImpl.class);
        assertEquals("/content/dam/sunlife/external/ca/en/content-fragments/tools-and-resources", articleList.getParentPath());
        assertEquals("Article List", articleList.getDisplayType());
        assertEquals(3, articleList.getHideTop());
        assertEquals(10, articleList.getMaxItems());
    	assertEquals("Sample accessibility label", articleList.getAccessibilityLabel());
    	assertEquals("mb-sl12", articleList.getSpacing());    	

    }
}
