package ca.sunlife.web.cms.core.models.v1;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.services.CNWNewsService;
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
import java.io.IOException;
import java.text.ParseException;

import static junitx.framework.Assert.assertEquals;
import static org.mockito.Mockito.when;


@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class NewsDetailsModelTest {

    private final AemContext ctx = new AemContext();
    @Mock
    private CNWNewsService newsService;


    private NewsDetailsModel cnwNewsDetailsModel;


    @Mock
    private SiteConfigService configService;

    private Page currentPage;


    @BeforeEach
    public void setup() throws LoginException, RepositoryException {
        ctx.addModelsForClasses(ArticleListModel.class, ComponentExporter.class);
        ctx.load().json("/ca/sunlife/web/cms/core/models/v1/NewsDetailsModel.json", "/content");
        ctx.requestPathInfo().setSelectorString("123.234.567");
        // OSGI SiteConfigService
        ctx.registerService(SiteConfigService.class, configService,
                org.osgi.framework.Constants.SERVICE_RANKING, Integer.MAX_VALUE);
        // OSGI DAMContentFragmentService
        ctx.registerService(CNWNewsService.class, newsService,
                org.osgi.framework.Constants.SERVICE_RANKING, Integer.MAX_VALUE);

        // Sling Bindings object for currentPage
        currentPage = ctx.create().page("/content/dam/sunlife/external/ca/en/content-fragments/tools-and-resources");
        SlingBindings slingBindings = (SlingBindings) ctx.request().getAttribute(SlingBindings.class.getName());
        slingBindings.put("currentPage", currentPage);

        when(configService.getConfigValues("pageLocale", currentPage.getPath())).thenReturn("en_CA");

    }


    @Test
    public void testInit() throws IOException, ParseException, ApplicationException, SystemException {

        ctx.currentResource("/content/newsdetails");
        cnwNewsDetailsModel = ctx.request().adaptTo(NewsDetailsModel.class);
        assertEquals("mb-sl12", cnwNewsDetailsModel.getSpacing());


    }


}


