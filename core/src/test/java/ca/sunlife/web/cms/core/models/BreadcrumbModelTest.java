package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import javax.jcr.RepositoryException;
import org.apache.sling.api.resource.LoginException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.MockitoAnnotations;
import org.mockito.internal.util.reflection.FieldSetter;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * The class BreadcrumbModelTest.
 */
@ExtendWith(AemContextExtension.class)
public class BreadcrumbModelTest {
	
	private BreadcrumbModel breadcrumbModel;
	
	@BeforeEach
    public void setUp(AemContext context) throws Exception { 
		MockitoAnnotations.initMocks(this);
		breadcrumbModel = new BreadcrumbModel();
    }
	
	@ Test
	void testAccessibilityLabel() throws LoginException, RepositoryException, NoSuchFieldException, SecurityException {
		String socialShareReqd = "true";
		FieldSetter.setField(breadcrumbModel, breadcrumbModel.getClass().getDeclaredField("socialShareReqd"), socialShareReqd);
		assertEquals("true", breadcrumbModel.getSocialShareReqd());
	}	
}
