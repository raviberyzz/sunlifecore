package ca.sunlife.web.cms.advisorhub.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import javax.jcr.RepositoryException;
import javax.jcr.Value;
import org.apache.jackrabbit.api.security.user.User;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import ca.sunlife.web.cms.core.constants.UserInfoConstants;
import ca.sunlife.web.cms.advisorhub.models.SearchModel;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * @author TCS
 *
 */
@ ExtendWith (AemContextExtension.class)
public class SearchModelTest {
	
	@ Mock
	private SlingHttpServletRequest request;
	
	@ Mock
	private ResourceResolver resourceResolver;
	
	@ InjectMocks
	private SearchModel SearchModel;
	
	@ Mock
	private User user;
	
	@ Mock
	private Value value1;
		
	@ BeforeEach
	void setup() {
      MockitoAnnotations.initMocks(this);
	}
	
	@ Test
	void testInit() throws RepositoryException, LoginException {
		Value[] vals = new Value[] {value1};
		when(value1.getString()).thenReturn("test");
		when(request.getResourceResolver()).thenReturn(resourceResolver);
		when(resourceResolver.adaptTo(User.class)).thenReturn(user);
		when(user.hasProperty(UserInfoConstants.PROFILE_GIVEN_NAME_CONSTANT)).thenReturn(true);
		when(user.getProperty(UserInfoConstants.PROFILE_GIVEN_NAME_CONSTANT)).thenReturn(vals);
		SearchModel.setWelcomeText("Welcome ${username}");
		SearchModel.init();
		assertEquals("Welcome test", SearchModel.getWelcomeText());
		
	}

}
