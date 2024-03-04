package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import javax.jcr.RepositoryException;
import org.apache.sling.api.resource.LoginException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.MockitoAnnotations;
import org.mockito.internal.util.reflection.FieldSetter;
import ca.sunlife.web.cms.core.models.AccordionModel;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * The class AccordionModelTest.
 */
@ExtendWith(AemContextExtension.class)
public class AccordionModelTest {
	
	private AccordionModel accordionModel;
	
	@BeforeEach
    public void setUp(AemContext context) throws Exception { 
		MockitoAnnotations.initMocks(this);
		accordionModel = new AccordionModel();
    }
	
	@ Test
	void testAccessibilityLabel() throws LoginException, RepositoryException, NoSuchFieldException, SecurityException {
		String analyticsId = "Sample Accessibility Label";
		FieldSetter.setField(accordionModel, accordionModel.getClass().getDeclaredField("analyticsId"), analyticsId);
		assertEquals("Sample Accessibility Label", accordionModel.getAnalyticsId());
	}	
}
