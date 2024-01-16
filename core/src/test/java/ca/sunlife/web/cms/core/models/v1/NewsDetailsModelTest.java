package ca.sunlife.web.cms.core.models.v1;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.text.ParseException;
import java.util.Locale;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.request.RequestPathInfo;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.beans.NewsDetails;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.services.CNWNewsService;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;


@ExtendWith(AemContextExtension.class)
public class NewsDetailsModelTest {
	private final String DUMMY = "dummy";
	private final String[] DUMMY_STRING_ARRAY = { DUMMY, "string", "array" };
	final Locale CANADA_LOCALE = new Locale("en" , "CA");

	@Mock
	private Page currentPage;

	@Mock
	private SlingHttpServletRequest request;

	@Mock
	private CNWNewsService newsService;

	@InjectMocks
	private NewsDetailsModel cnwNewsDetailsModel;
	
	@Mock
	private NewsDetailsModel ndModel;

	@Mock
	private SiteConfigService configService;
	
	@Mock
	Logger logger;
	
	@BeforeEach
	public void setup() {
		MockitoAnnotations.initMocks(this);
		try {
			when(configService.getConfigValues("pageLocale", currentPage.getPath())).thenReturn("en_CA");
		} catch (Exception e) {
			assertTrue(e instanceof Exception);
		}
	}
	
	
	@ Test
  public void testInit() throws IOException , ParseException , ApplicationException , SystemException {
    when(request.getRequestPathInfo( )).thenReturn(getDummyRequestPathInfo(DUMMY_STRING_ARRAY));

    cnwNewsDetailsModel.init( );
    assertNull(cnwNewsDetailsModel.getNewsDetails( ));
    assertNull(cnwNewsDetailsModel.getAccessibilityLabel());
    assertNull(cnwNewsDetailsModel.getSpacing());

    when(newsService.getCNWNewsDetails(DUMMY , CANADA_LOCALE.getLanguage( ))).thenReturn(new NewsDetails( ));
    cnwNewsDetailsModel.init( );
    assertNotNull(cnwNewsDetailsModel.getNewsDetails( ));
  }

	@Test
	public void testInitException() {
		try { 
			cnwNewsDetailsModel.init();
		} catch (Exception e) {
			assertTrue(e instanceof NullPointerException);
		}
	}
	
	public RequestPathInfo getDummyRequestPathInfo(String [ ] dummySelector) {
	    return new RequestPathInfo( ) {

	      @ Override
	      public Resource getSuffixResource() {
	        // TODO Auto-generated method stub
	        return null;
	      }

	      @ Override
	      public String getSuffix() {
	        // TODO Auto-generated method stub
	        return null;
	      }

	      @ Override
	      public String [ ] getSelectors() {
	        return dummySelector;
	      }

	      @ Override
	      public String getSelectorString() {
	        // TODO Auto-generated method stub
	        return null;
	      }

	      @ Override
	      public String getResourcePath() {
	        // TODO Auto-generated method stub
	        return null;
	      }

	      @ Override
	      public String getExtension() {
	        // TODO Auto-generated method stub
	        return null;
	      }
	    };
} }


