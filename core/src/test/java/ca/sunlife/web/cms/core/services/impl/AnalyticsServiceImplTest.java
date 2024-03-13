package ca.sunlife.web.cms.core.services.impl;

import ca.sunlife.web.cms.core.constants.AdvisorDetailConstants;
import ca.sunlife.web.cms.core.constants.ArticleConstants;
import ca.sunlife.web.cms.core.constants.v1.BasePageModelConstants;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import com.day.cq.wcm.api.Page;
import com.google.gson.JsonObject;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.request.RequestPathInfo;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.internal.util.reflection.FieldSetter;

import javax.jcr.RepositoryException;

import static junitx.framework.Assert.assertEquals;
import static org.mockito.Mockito.when;


@ExtendWith(AemContextExtension.class)
public class AnalyticsServiceImplTest {

    @Mock
    private SiteConfigService configService;

    @Mock
    private CoreResourceResolver coreResourceResolver;

    @Mock
    ResourceResolver resolver;

    @Mock
    private Page currentPage;

    @Mock
    private SlingHttpServletRequest request;

    @Mock
    private RequestPathInfo requestPathInfo;
    final private AnalyticsServiceImpl analyticsServiceImpl = new AnalyticsServiceImpl();

    @BeforeEach
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);

        FieldSetter.setField(analyticsServiceImpl,
                analyticsServiceImpl.getClass().getDeclaredField("configService"),
                configService);

        FieldSetter.setField(analyticsServiceImpl,
                analyticsServiceImpl.getClass().getDeclaredField("coreResourceResolver"),
                coreResourceResolver);

        when(request.getRequestPathInfo()).thenReturn(requestPathInfo);
        when(requestPathInfo.getSelectors()).thenReturn(new String[]{"advisor"});
        when(currentPage.getPath()).thenReturn("/content/sunlife/external/ca/en");
        when(coreResourceResolver.getResourceResolver()).thenReturn(resolver);
        when(configService.getConfigValues(BasePageModelConstants.SITE_URL_CONSTANT, "/content/sunlife/external/ca/en")).thenReturn("siteUrl");
        when(configService.getConfigValues("siteName", "/content")).thenReturn("siteName");
        when(configService.getConfigValues(ArticleConstants.ARTICLE_PUBLISHER_CONSTANT, "/content")).thenReturn("articlePublisherForMetaTag");
        when(configService.getConfigValues(ArticleConstants.ARTICLE_CREATOR_CONSTANT, "/content")).thenReturn("articleCreator");
        when(configService.getConfigValues(ArticleConstants.ARTICLE_SITE_CONSTANT, "/content")).thenReturn("articleSite");
    }

    @Test
    void testCase1() throws LoginException, RepositoryException {
        JsonObject customMetadata = new JsonObject();
        customMetadata.addProperty("path", "/content/sunlife/external/ca/en/sunlife");
        String[] tags = {"tag1:tag1/dam/path/en/sunlife", "tag2:tag2"};
        analyticsServiceImpl.activate();
        analyticsServiceImpl.setUDOParameters(currentPage, "/content/sunlife/external/ca/en", "advisor", "pageCategory", "pageSubCategory", "breadCrumb", customMetadata);
        analyticsServiceImpl.setOtherUDOTags("/tag1/dam", tags, customMetadata);
        assertEquals(customMetadata.size() > 1, true);
    }

    @Test
    void testCase2() {
        analyticsServiceImpl.activate();
        JsonObject otherUDOTagsMap = new JsonObject();
        otherUDOTagsMap.addProperty("path", "/content/sunlife");
        analyticsServiceImpl.setUDOTagsForAdvisorPages(request, "advisorType", otherUDOTagsMap);

        assertEquals(otherUDOTagsMap.has(AdvisorDetailConstants.PAGE_ADVISOR_ID_CONSTANT), true);
    }

}

