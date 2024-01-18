package ca.sunlife.web.cms.core.models.v1;

import ca.sunlife.web.cms.core.beans.NewsDetails;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.services.CNWNewsService;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.request.RequestPathInfo;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.io.IOException;
import java.text.ParseException;
import java.util.Locale;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;


@ExtendWith(AemContextExtension.class)
public class NewsDetailsModelTest {
    private String releaseID = "12704";
    private final String[] DUMMY_STRING_ARRAY = {releaseID, "string", "array"};
    private final Locale CANADA_LOCALE = new Locale("en", "CA");

    @Mock
    private Page currentPage;

    @Mock
    private SlingHttpServletRequest request;

    @Mock
    private CNWNewsService newsService;

    @InjectMocks
    private NewsDetailsModel cnwNewsDetailsModel;


    @Mock
    private SiteConfigService configService;


    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        try {
            when(configService.getConfigValues("pageLocale", currentPage.getPath())).thenReturn("en_CA");
        } catch (Exception e) {
            assertTrue(e instanceof Exception);
        }
    }


    @Test
    public void testInit() throws IOException, ParseException, ApplicationException, SystemException {
        when(request.getRequestPathInfo()).thenReturn(getDummyRequestPathInfo(DUMMY_STRING_ARRAY));

        cnwNewsDetailsModel.init();
        assertNull(cnwNewsDetailsModel.getNewsDetails());
        assertNull(cnwNewsDetailsModel.getSpacing());

        when(newsService.getCNWNewsDetails(releaseID, CANADA_LOCALE.getLanguage())).thenReturn(new NewsDetails());
        cnwNewsDetailsModel.init();
        assertNotNull(cnwNewsDetailsModel.getNewsDetails());
    }

    @Test
    public void testInitException() {
        try {
            cnwNewsDetailsModel.init();
        } catch (Exception e) {
            assertTrue(e instanceof NullPointerException);
        }
    }

    public RequestPathInfo getDummyRequestPathInfo(String[] dummySelector) {
        return new RequestPathInfo() {

            @Override
            public Resource getSuffixResource() {
                return null;
            }

            @Override
            public String getSuffix() {
                return null;
            }

            @Override
            public String[] getSelectors() {
                return dummySelector;
            }

            @Override
            public String getSelectorString() {
                return null;
            }

            @Override
            public String getResourcePath() {
                return null;
            }

            @Override
            public String getExtension() {
                return null;
            }
        };
    }
}


