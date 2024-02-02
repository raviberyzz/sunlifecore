package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.models.factory.ModelFactory;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension; 

@ExtendWith(AemContextExtension.class)
public class AccordionModelTest {

	private final AemContext context = new AemContext();	
	AccordionModel accordion;
	
	@Mock
	private ModelFactory modelFactory;
	
	@BeforeEach
    public void setUp(AemContext context) throws Exception{    	 	
    	context.addModelsForClasses(AccordionModel.class);
    	context.load().json("/ca/sunlife/web/cms/core/models/v1/accordion/accordion.json", "/content");
    }

	@Test
	void testGetterMethods() {		
		context.currentResource("/content/accordion");
    	accordion = context.request().adaptTo(AccordionModel.class);
    	assertEquals("h3", accordion.getHeadingElement());
    	assertEquals("Sample accessibility label", accordion.getAccessibilityLabel());
    	assertEquals("Sample data title", accordion.getDataTitle());
    	assertEquals("true", accordion.getSingleExpansion());
    	assertEquals("mb-s18", accordion.getSpacing());    	
	}
	
}
