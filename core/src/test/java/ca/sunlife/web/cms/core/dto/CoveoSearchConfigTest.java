package ca.sunlife.web.cms.core.dto;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(AemContextExtension.class)
public class CoveoSearchConfigTest {

    CoveoSearchConfig coveoSearchConfig;

    @BeforeEach
    void setUp() {
        coveoSearchConfig = new CoveoSearchConfig("true", "xcdf-fdfd-dddse-ddd", "/content/sunlife/external/ca/en/search-detail", "non-prod", "www.sunlife.ca", "sunlifeCA", "en", "english");
    }

    @Test
    public void testCase() {
        assertEquals(coveoSearchConfig.getCoveoSearchEnabled(), "true");
        assertEquals(coveoSearchConfig.getSearchToken(), "xcdf-fdfd-dddse-ddd");
        assertEquals(coveoSearchConfig.getSearchUrl(), "/content/sunlife/external/ca/en/search-detail");
        assertEquals(coveoSearchConfig.getSiteLocale(), "en");
        assertEquals(coveoSearchConfig.getSearchLanguage(), "english");
        assertEquals(coveoSearchConfig.getOrgId(), "non-prod");
        assertEquals(coveoSearchConfig.getRestUri(), "www.sunlife.ca");
        assertEquals(coveoSearchConfig.getSearchHub(), "sunlifeCA");
    }

}
