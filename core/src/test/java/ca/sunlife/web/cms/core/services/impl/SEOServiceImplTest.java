

package ca.sunlife.web.cms.core.services.impl;

import ca.sunlife.web.cms.core.constants.ArticleConstants;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.internal.util.reflection.FieldSetter;

import java.util.Map;

import static junitx.framework.Assert.assertEquals;
import static org.mockito.Mockito.when;


@ExtendWith(AemContextExtension.class)
public class SEOServiceImplTest {

    @Mock
    private SiteConfigService configService;

    @Mock
    private CoreResourceResolver coreResourceResolver;

    @Mock
    ResourceResolver resolver;

    @Mock
    Resource resouce;
    @Mock
    ValueMap valueMap;

    final private SEOServiceImpl searchServiceImpl = new SEOServiceImpl();

    @BeforeEach
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);

        FieldSetter.setField(searchServiceImpl,
                searchServiceImpl.getClass().getDeclaredField("configService"),
                configService);

        FieldSetter.setField(searchServiceImpl,
                searchServiceImpl.getClass().getDeclaredField("coreResourceResolver"),
                coreResourceResolver);

        when(valueMap.get("fragmentPath", String.class)).thenReturn("articleType");
        when(resolver.getResource(Mockito.anyString())).thenReturn(resouce);
        when(resouce.getValueMap()).thenReturn(valueMap);
        when(valueMap.containsKey("fragmentPath")).thenReturn(true);
        when(coreResourceResolver.getResourceResolver()).thenReturn(resolver);
        when(configService.getConfigValues(ArticleConstants.ARTICLE_TYPE_CONSTANT, "/content")).thenReturn("articleType");
        when(configService.getConfigValues("siteName", "/content")).thenReturn("siteName");
        when(configService.getConfigValues(ArticleConstants.ARTICLE_PUBLISHER_CONSTANT, "/content")).thenReturn("articlePublisherForMetaTag");
        when(configService.getConfigValues(ArticleConstants.ARTICLE_CREATOR_CONSTANT, "/content")).thenReturn("articleCreator");
        when(configService.getConfigValues(ArticleConstants.ARTICLE_SITE_CONSTANT, "/content")).thenReturn("articleSite");
    }

    @Test
    void testCase1() {
        Map<String, String> customMetadata = new java.util.HashMap<>();
        searchServiceImpl.activate();
        Map<String, String> customMetadataExpected = searchServiceImpl.setArticlePageSocialMetaTags("/content", customMetadata);
        assertEquals(customMetadataExpected.size() > 0, true);
    }

}

