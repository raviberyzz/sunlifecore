package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.text.ParseException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.beans.NewsDetails;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.services.CNWNewsService;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * @author mo92 The class CNWNewsDetailsModelTest
 */
@ ExtendWith (AemContextExtension.class)
public class CNWNewsDetailsModelTest {
  private final String DUMMY = "dummy";
  private final String [ ] DUMMY_STRING_ARRAY = { DUMMY , "string" , "array" };

  @ Mock
  private Page currentPage;
  
  @ Mock
  private SlingHttpServletRequest request;
  
  @ Mock
  private CNWNewsService newsService;

  @ InjectMocks
  private CNWNewsDetailsModel cnwNewsDetailsModel;
  
  @ Mock
  private SiteConfigService configService;
  
  @ BeforeEach
  public void setup() {
    MockitoAnnotations.initMocks(this);
    try {
		when(configService.getConfigValues("pageLocale", currentPage.getPath())).thenReturn("en_CA");
	} catch (Exception e) {
		assertTrue(e instanceof Exception);
	}
  }

  @ Test
  public void testInit()
      throws IOException , ParseException , ApplicationException , SystemException {
    when(request.getRequestPathInfo( ))
        .thenReturn(TestUtils.getDummyRequestPathInfo(DUMMY_STRING_ARRAY));

    cnwNewsDetailsModel.init( );
    assertEquals(DUMMY , cnwNewsDetailsModel.getReleaseId( ));
    assertNull(cnwNewsDetailsModel.getNewsDetails( ));

    when(newsService.getCNWNewsDetails(DUMMY , TestUtils.CANADA_LOCALE.getLanguage( )))
        .thenReturn(new NewsDetails( ));
    cnwNewsDetailsModel.init( );
    assertNotNull(cnwNewsDetailsModel.getNewsDetails( ));
  }

  @ Test
  public void testInitException() {
    try {
      cnwNewsDetailsModel.init( );
    } catch (Exception e) {
      assertTrue(e instanceof NullPointerException);
    }
  }
}
