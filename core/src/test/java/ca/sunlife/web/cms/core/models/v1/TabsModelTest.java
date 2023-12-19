package ca.sunlife.web.cms.core.models.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.apache.sling.models.factory.ModelFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension; 

@ExtendWith(AemContextExtension.class)
public class TabsModelTest {

	private final AemContext context = new AemContext();	
	TabsModel tabs;
	
	@Mock
	private ModelFactory modelFactory;
	
	@BeforeEach
    public void setUp(AemContext context) throws Exception{    	 	
    	context.addModelsForClasses(TabsModel.class);
    	context.load().json("/ca/sunlife/web/cms/core/models/v1/tabs/tabs.json", "/content");
    }

	@Test
	void testGetterMethods() {		
		context.currentResource("/content/tabs");
    	tabs = context.request().adaptTo(TabsModel.class);    	    	
    	assertEquals("Sample accessibility label", tabs.getAccessibilityLabel());
    	assertEquals("Sample data title", tabs.getDataTitle());
    	assertEquals("true", tabs.getEnableScrolling());
    	assertEquals("mb-s18", tabs.getSpacing());    	
	}
}
