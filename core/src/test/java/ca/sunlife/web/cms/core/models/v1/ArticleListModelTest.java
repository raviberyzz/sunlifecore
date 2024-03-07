package ca.sunlife.web.cms.core.models.v1;

import ca.sunlife.web.cms.core.services.DAMContentFragmentService;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import com.adobe.cq.export.json.ComponentExporter;
import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.scripting.SlingBindings;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.jcr.RepositoryException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class ArticleListModelTest {

    private final AemContext ctx = new AemContext();
    @Mock
    private SiteConfigService configService;

    @Mock
    private DAMContentFragmentService damContentFragmentService;

    private Page currentPage;

    private ArticleListModel articleList;

    @BeforeEach
    public void setUp(AemContext ctx) throws Exception {
        ctx.addModelsForClasses(ArticleListModel.class, ComponentExporter.class);
        ctx.load().json("/ca/sunlife/web/cms/core/models/v1/ArticleListModel.json", "/content");
        ctx.requestPathInfo().setSelectorString("123.234.567");
        // OSGI SiteConfigService
        ctx.registerService(SiteConfigService.class, configService,
                org.osgi.framework.Constants.SERVICE_RANKING, Integer.MAX_VALUE);
        // OSGI DAMContentFragmentService
        ctx.registerService(DAMContentFragmentService.class, damContentFragmentService,
                org.osgi.framework.Constants.SERVICE_RANKING, Integer.MAX_VALUE);
        // Sling Bindings object for currentPage
        currentPage = ctx.create().page("/content/dam/sunlife/external/ca/en/content-fragments/tools-and-resources");
        SlingBindings slingBindings = (SlingBindings) ctx.request().getAttribute(SlingBindings.class.getName());
        slingBindings.put("currentPage", currentPage);
        ctx.request().setAttribute(SlingBindings.class.getName(), slingBindings);


    }

    @Test
    void testCaseAll() throws LoginException, RepositoryException {
        // When condition
        when(configService.getConfigValues("articleDateFormat", currentPage.getPath())).thenReturn("MMM dd, yyyy");
        when(configService.getConfigValues("pageLocale", currentPage.getPath())).thenReturn("en_CA");
        ctx.currentResource("/content/articleList");
        articleList = ctx.request().adaptTo(ArticleListModel.class);
        assertEquals("articleList", articleList.getDisplayType());
        assertEquals("/content/dam/sunlife/external/ca/en/content-fragments/tools-and-resources", articleList.getParentPath());
        assertEquals(3, articleList.getHideTop());
        assertEquals(10, articleList.getMaxItems());
        assertEquals("Sample accessibility label", articleList.getAccessibilityLabel());
        assertEquals("mb-sl12", articleList.getSpacing());
        assertEquals("sunlife/core/components/content/core-articleList/v1/articleList", articleList.getExportedType());
        assertEquals("tag1, tag2", (articleList.getTagNames())[0]);
        assertEquals("Article List", articleList.getTitle());
        assertEquals("h2", articleList.getTitleLevel());
        assertEquals("en", articleList.getPageLocale());
        assertEquals("MMM dd, yyyy", articleList.getDateFormat());
    }

    @Test
    void testCaseDisplayType() {
        ctx.currentResource("/content/articleList2");
        articleList = ctx.request().adaptTo(ArticleListModel.class);
        assertEquals("editorialList", articleList.getDisplayType());
    }

    @Test
    void testCaseEmptyParentPath() {
        ctx.currentResource("/content/articleList3");
        articleList = ctx.request().adaptTo(ArticleListModel.class);
        assertEquals("", articleList.getParentPath());
    }

    @Test
    void testValidateException() {
        try {
            ctx.requestPathInfo().setSelectorString("selector.343.332");
            when(configService.getConfigValues("articleDateFormat", currentPage.getPath())).thenReturn("MMM dd, yyyy");
            when(configService.getConfigValues("pageLocale", currentPage.getPath())).thenThrow(new LoginException());
            ctx.currentResource("/content/articleList4");
            articleList = ctx.request().adaptTo(ArticleListModel.class);
            assertEquals(0, articleList.getHideTop());
        } catch (LoginException | RepositoryException exception) {
            assertThrows(LoginException.class, () -> {
                throw exception;
            });
        }
    }

    @Test
    void testCaseWithSelector() throws LoginException, RepositoryException {
        ctx.requestPathInfo().setSelectorString("selector.343.332");
        when(configService.getConfigValues("articleDateFormat", currentPage.getPath())).thenReturn("MMM dd, yyyy");
        when(configService.getConfigValues("pageLocale", currentPage.getPath())).thenReturn("en_CA");
        ctx.currentResource("/content/articleList");
        articleList = ctx.request().adaptTo(ArticleListModel.class);

    }
}




