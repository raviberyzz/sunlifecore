package ca.sunlife.web.cms.advisorhub.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import javax.jcr.RepositoryException;
import javax.jcr.Value;
import org.apache.sling.api.resource.LoginException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import ca.sunlife.web.cms.advisorhub.models.SearchModel;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * @author TCS
 *
 */
@ ExtendWith (AemContextExtension.class)
public class SearchModelTest {
	
	
	@ InjectMocks
	private SearchModel SearchModel;	
	
	@ Mock
	private Value value1;
		
	@ BeforeEach
	void setup() {
      MockitoAnnotations.initMocks(this);
	}
	
	@ Test
	void testInit() throws RepositoryException, LoginException {
		when(value1.getString()).thenReturn("test");
		SearchModel.setWelcomeText("Welcome ${username}");
		SearchModel.init();
		assertEquals("Welcome <div class=\"username\"></div>", SearchModel.getWelcomeText());
	}
}
