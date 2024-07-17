package ca.sunlife.web.cms.core.models.v1;

import ca.sunlife.web.cms.core.beans.NewsDetails;
import ca.sunlife.web.cms.core.beans.Release;
import ca.sunlife.web.cms.core.constants.AdvisorDetailConstants;
import ca.sunlife.web.cms.core.constants.v1.BasePageModelConstants;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.services.*;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.WCMException;
import com.day.cq.wcm.msm.api.LiveCopy;
import com.day.cq.wcm.msm.api.LiveRelationship;
import com.day.cq.wcm.msm.api.LiveRelationshipManager;
import com.google.gson.JsonObject;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.scripting.SlingBindings;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.jcr.RepositoryException;
import java.io.IOException;
import java.text.ParseException;

import static junitx.framework.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyBoolean;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class BasePageModelTest {

    private final AemContext ctx = new AemContext();

    @Mock
    private SlingHttpServletRequest request;

    @Mock
    private ResourceResolver resolver;

    @Mock
    private Resource resource;

    @Mock
    private LiveRelationshipManager relationshipManager;


    @Mock
    private SiteConfigService configService;

    @Mock
    private SearchService searchService;

    @Mock
    private SEOService seoService;

    @Mock
    private AnalyticsService analyticsService;

    @Mock
    private CNWNewsService cnwNewsService;


    @Mock
    private AdvisorDetailService advisorDetailService;

    private Page currentPage;

    private BasePageModel basePageModel;


    @BeforeEach
    public void setUp(AemContext ctx) throws IllegalAccessException {

        ctx.addModelsForClasses(BasePageModel.class);
        ctx.load().json("/ca/sunlife/web/cms/core/models/v1/BasePageModel.json", "/content");
        ctx.requestPathInfo().setSelectorString("123.234.567");
        // OSGI SiteConfigService
        ctx.registerService(SiteConfigService.class, configService,
                org.osgi.framework.Constants.SERVICE_RANKING, Integer.MAX_VALUE);
        // OSGI SearchService
        ctx.registerService(SearchService.class, searchService,
                org.osgi.framework.Constants.SERVICE_RANKING, Integer.MAX_VALUE);
        // OSGI SEOService
        ctx.registerService(SEOService.class, seoService,
                org.osgi.framework.Constants.SERVICE_RANKING, Integer.MAX_VALUE);
        // OSGI AnalyticsService
        ctx.registerService(AnalyticsService.class, analyticsService,
                org.osgi.framework.Constants.SERVICE_RANKING, Integer.MAX_VALUE);
        // OSGI CNWNewsService
        ctx.registerService(CNWNewsService.class, cnwNewsService,
                org.osgi.framework.Constants.SERVICE_RANKING, Integer.MAX_VALUE);
        // OSGI relationshipManagerService
        ctx.registerService(LiveRelationshipManager.class, relationshipManager,
                org.osgi.framework.Constants.SERVICE_RANKING, Integer.MAX_VALUE);
        // OSGI AdvisorDetailServiceService
        ctx.registerService(AdvisorDetailService.class, advisorDetailService,
                org.osgi.framework.Constants.SERVICE_RANKING, Integer.MAX_VALUE);


        currentPage = ctx.create().page("/content/sunlife/external/ca/slfas/en");
        // Sling Bindings object for currentPage
        SlingBindings slingBindings = (SlingBindings) ctx.request().getAttribute(SlingBindings.class.getName());
        slingBindings.put("currentPage", currentPage);
        ctx.request().setAttribute(SlingBindings.class.getName(), slingBindings);


    }

    private void executeCommonWhenStatement() throws LoginException, RepositoryException, WCMException, ApplicationException, SystemException, IOException, ParseException {
        when(configService.getConfigValues(BasePageModelConstants.STATIC_PATH_CONSTANT, currentPage.getPath())).thenReturn("/content/");
        when(configService.getConfigValues(BasePageModelConstants.PAGE_LOCALE, currentPage.getPath())).thenReturn("en_CA");
        when(configService.getConfigValues("favIcon", currentPage.getPath())).thenReturn("/content/dam/favIcon.png");
        when(configService.getConfigValues(BasePageModelConstants.ENABLE_CONTEXT_HUB_CONSTANT, currentPage.getPath())).thenReturn("/content/dam/favIcon.png");
        when(configService.getConfigValues(BasePageModelConstants.UDO_TAGS_PATH, currentPage.getPath())).thenReturn("udoTags");
        when(configService.getConfigValues(BasePageModelConstants.ENABLE_CONTEXT_HUB_CONSTANT, currentPage.getPath())).thenReturn("true");
        when(configService.getConfigValues("userInfoPath", currentPage.getPath())).thenReturn("userInfoPath");
        when(configService.getConfigValues(BasePageModelConstants.EXTRA_CLIENTLIBS, currentPage.getPath())).thenReturn("ca.sunlife-author-extra-libs");
        when(configService.getConfigValues("disableSocialSharingTags", currentPage.getPath())).thenReturn("true");
        when(configService.getConfigValues("disableContextHubTags", currentPage.getPath())).thenReturn("true");
        when(configService.getConfigValues("nonResponsive", currentPage.getPath())).thenReturn("false");
        when(configService.getConfigValues(BasePageModelConstants.SITE_HEAD_INCLUDE, currentPage.getPath())).thenReturn("<div>SiteHeader</div>");
        when(configService.getConfigValues(BasePageModelConstants.SITE_BODY_INCLUDE, currentPage.getPath())).thenReturn("<div>SiteBody</div>");
        when(configService.getConfigValues(BasePageModelConstants.ADD_OPENING_DIV, currentPage.getPath())).thenReturn("true");
        when(configService.getConfigValues(BasePageModelConstants.WRAPPER_DIV_CLASS, currentPage.getPath())).thenReturn("true");
        when(configService.getConfigValues(BasePageModelConstants.MFA_DOMAIN_PATH, currentPage.getPath())).thenReturn("www.sunlife.ca/mfa/");
        when(configService.getConfigValues(BasePageModelConstants.MFA_ENCRYPTION, currentPage.getPath())).thenReturn("true");
        lenient().when(configService.getConfigValues(BasePageModelConstants.DOMAIN_STR, currentPage.getPath())).thenReturn("com");
        lenient().when(configService.getConfigValues(BasePageModelConstants.DOMAIN_STR, "/content/sunlife/external/master")).thenReturn("ca");
        when(configService.getConfigValues(BasePageModelConstants.SITE_SELECTOR, currentPage.getPath())).thenReturn("siteSelector");
        lenient().when(configService.getConfigValues("siteSuffix", currentPage.getPath())).thenReturn("");
        lenient().when(configService.getConfigValues("pageDescription", currentPage.getPath())).thenReturn("this is page description");
        lenient().when(configService.getConfigValues("autoCompleteUrl", currentPage.getPath())).thenReturn("www.sunlife.ca");
        lenient().when(configService.getConfigValues("searchApi", currentPage.getPath())).thenReturn("/search/api");
        lenient().when(configService.getConfigValues("analyticsScriptPath", currentPage.getPath())).thenReturn("/content/dam/scriptpath");
        lenient().when(configService.getConfigValues("analyticsTealiumScript", currentPage.getPath())).thenReturn("/content/dam/scriptpath");
        lenient().when(configService.getConfigValues(BasePageModelConstants.HREF_LANG, currentPage.getPath())).thenReturn("en");
        lenient().when(configService.getPageRelativeUrl("/content/sunlife/external/master")).thenReturn("masterPath");
        lenient().when(configService.getConfigValues("articleTitleFormat", currentPage.getPath())).thenReturn("true");
        lenient().when(relationshipManager.hasLiveRelationship(any(Resource.class))).thenReturn(true);
        LiveCopy liveCopy = Mockito.mock(LiveCopy.class);
        LiveRelationship rel = Mockito.mock(LiveRelationship.class);
        lenient().when(relationshipManager.getLiveRelationship(any(Resource.class), anyBoolean())).thenReturn(rel);
        lenient().when(rel.getLiveCopy()).thenReturn(liveCopy);
        lenient().when(liveCopy.getBlueprintPath()).thenReturn("/content/sunlife/external/master");
        NewsDetails newsDetail = Mockito.mock(NewsDetails.class);
        lenient().when(cnwNewsService.getCNWNewsDetails(Mockito.anyString(), Mockito.any(String.class))).thenReturn(newsDetail);
        Release release = Mockito.mock(Release.class);
        lenient().when(newsDetail.getRelease()).thenReturn(release);
        lenient().when(release.getHeadline()).thenReturn("this is headline");
        lenient().when(release.getSummary()).thenReturn("this is summary");


    }

    @Test
    public void testCase1() throws LoginException, RepositoryException, WCMException, ApplicationException, SystemException, IOException, ParseException {
        executeCommonWhenStatement();
        ctx.currentResource("/content/basePageList");
        basePageModel = ctx.request().adaptTo(BasePageModel.class);
        assertEquals("/content/sunlife/external/ca/slfas/en", currentPage.getPath());
        assertEquals("com", basePageModel.getFavIcon(), "/content/dam/favIcon.png");
        assertEquals("This is social media description", basePageModel.getSocialMediaDescripton());
        assertEquals("true", basePageModel.getPageIndexing());
        assertEquals("false", basePageModel.getEnablePseudoElementIcon());
        assertEquals("Sun Life Financial", basePageModel.getSeoPageTitle());
        assertEquals("https://www.sunlife.ca", basePageModel.getSeoCanonicalUrl());
        assertEquals("www.sunlife.ca/mfa/", basePageModel.getMfaDomainPath());
        assertEquals("true", basePageModel.getMfaEncryption());


    }

    @Test
    public void testCase2() throws LoginException, RepositoryException, WCMException, ApplicationException, SystemException, IOException, ParseException {
        executeCommonWhenStatement();
        ctx.currentResource("/content/basePageList1");
        basePageModel = ctx.request().adaptTo(BasePageModel.class);

    }

    @Test
    public void testCase3() throws LoginException, RepositoryException, WCMException, ApplicationException, SystemException, IOException, ParseException {
        executeCommonWhenStatement();
        ctx.currentResource("/content/basePageList2");
        basePageModel = ctx.request().adaptTo(BasePageModel.class);
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty(AdvisorDetailConstants.ERROR_CODE_CONSTANT, "ERROR");
        basePageModel.getAdvisorTitle(jsonObject);

    }


}
