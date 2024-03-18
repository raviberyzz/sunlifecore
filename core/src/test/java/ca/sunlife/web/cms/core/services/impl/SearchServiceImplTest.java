package ca.sunlife.web.cms.core.services.impl;

import ca.sunlife.web.cms.core.dto.CoveoSearchConfig;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.internal.util.reflection.FieldSetter;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;


@ExtendWith(AemContextExtension.class)
public class SearchServiceImplTest {


    @Mock
    private SiteConfigService configService;

    final private SearchServiceImpl searchServiceImpl = new SearchServiceImpl();



    @BeforeEach
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);

        FieldSetter.setField(searchServiceImpl,
                searchServiceImpl.getClass().getDeclaredField("configService"),
                configService);
        when(configService.getConfigValues(SearchServiceImpl.COVEO_SEARCH_ENABLED, "/content")).thenReturn("true");
        when(configService.getConfigValues(SearchServiceImpl.SEARCH_TOKEN, "/content")).thenReturn("xcdf-fdfd-dddse-ddd");
        when(configService.getConfigValues(SearchServiceImpl.SEARCH_URL, "/content")).thenReturn("/content/sunlife/external/ca/en/search-detail");
        when(configService.getConfigValues(SearchServiceImpl.ORG_ID, "/content")).thenReturn("non-prod");
        when(configService.getConfigValues(SearchServiceImpl.REST_URI, "/content")).thenReturn("www.sunlife.ca");
        when(configService.getConfigValues(SearchServiceImpl.SEARCH_HUB, "/content")).thenReturn("sunlifeCA");
        when(configService.getConfigValues(SearchServiceImpl.SITE_LOCALE, "/content")).thenReturn("en");
        when(configService.getConfigValues(SearchServiceImpl.SEARCH_LANGUAGE, "/content")).thenReturn("english");


    }

    @Test
    void testCase1() {
        searchServiceImpl.activate();
        CoveoSearchConfig coveoSearchConfig = searchServiceImpl.getSearchConfig("/content");
        assertEquals("true", coveoSearchConfig.getCoveoSearchEnabled());
        assertEquals("xcdf-fdfd-dddse-ddd", coveoSearchConfig.getSearchToken());
        assertEquals("/content/sunlife/external/ca/en/search-detail", coveoSearchConfig.getSearchUrl());
        assertEquals("non-prod", coveoSearchConfig.getOrgId());
        assertEquals("www.sunlife.ca", coveoSearchConfig.getRestUri());
        assertEquals("sunlifeCA", coveoSearchConfig.getSearchHub());
        assertEquals("en", coveoSearchConfig.getSiteLocale());
        assertEquals("english", coveoSearchConfig.getSearchLanguage());


    }
}

