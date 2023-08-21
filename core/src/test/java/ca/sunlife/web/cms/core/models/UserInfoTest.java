/**
 * 
 */
package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;

import org.apache.jackrabbit.api.security.user.Group;
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
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * @author mo92
 *
 */
@ ExtendWith (AemContextExtension.class)
public class UserInfoTest {

	@ Mock
	private SlingHttpServletRequest request;
	
	@ Mock
	private ResourceResolver resourceResolver;
	
	@ InjectMocks
	private UserInfo userInfo;
	
	@ Mock
	private User user;
	
	@ Mock
	private Session session;
	
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
		when(user.hasProperty(UserInfoConstants.PROFILE_FAMILY_NAME_CONSTANT)).thenReturn(true);
		when(user.getProperty(UserInfoConstants.PROFILE_FAMILY_NAME_CONSTANT)).thenReturn(vals);
		
		when(user.hasProperty(UserInfoConstants.PROFILE_GIVEN_NAME_CONSTANT)).thenReturn(true);
		when(user.getProperty(UserInfoConstants.PROFILE_GIVEN_NAME_CONSTANT)).thenReturn(vals);
		
		when(user.hasProperty(UserInfoConstants.PROFILE_EMAIL_CONSTANT)).thenReturn(true);
		when(user.getProperty(UserInfoConstants.PROFILE_EMAIL_CONSTANT)).thenReturn(vals);
		List<Group> memberOf = new ArrayList<>();
		when(user.memberOf()).thenReturn(memberOf.iterator());
    userInfo.init();
    assertEquals("{\"acf2\":\"NA\",\"authorizableId\":null,\"displayName\":\"test test\",\"email\":\"test\",\"familyName\":\"test\",\"givenName\":\"test\",\"buildingLocation\":\"NA\",\"businessGroup\":\"NA\",\"businessUnit\":\"NA\",\"jobLevel\":\"NA\",\"isManager\":\"NA\",\"country\":\"NA\",\"path\":null,\"groups\":{}}", userInfo.getProfile());
	}
}
