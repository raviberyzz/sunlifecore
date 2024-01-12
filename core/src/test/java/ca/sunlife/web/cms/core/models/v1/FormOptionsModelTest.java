package ca.sunlife.web.cms.core.models.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension; 

@ExtendWith(AemContextExtension.class)
public class FormOptionsModelTest {

	private final AemContext context = new AemContext();	
	FormOptionsModel formOptionsModel;
	

	
	@BeforeEach
    public void setUp(AemContext context) throws Exception{    	 	
    	context.addModelsForClasses(FormOptionsModel.class);
    	context.load().json("/ca/sunlife/web/cms/core/models/v1/form-options/form-options.json", "/content");
    }

	@Test
	void testGetterMethods() {		
		context.currentResource("/content/options");
		formOptionsModel = context.request().adaptTo(FormOptionsModel.class);
    	assertEquals("test-id", formOptionsModel.getId());
    	assertEquals("test-required", formOptionsModel.getRequired());
    	assertEquals("test-constraintMessage", formOptionsModel.getConstraintMessage());
    	assertEquals("test-dataSection", formOptionsModel.getDataSection());
    	assertEquals("mb-s18", formOptionsModel.getSpacing());    	
	}
	
}
