/**
 *
 */
package ca.sunlife.web.cms.core.models;

import javax.annotation.PostConstruct;
import javax.jcr.RepositoryException;

import org.apache.jackrabbit.api.security.user.User;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ca.sunlife.web.cms.core.constants.UserInfoConstants;

/**
 * The Class UserInfo.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = { SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class UserInfo {

	/** The Constant LOG. */
	private static final Logger LOG = LoggerFactory.getLogger(UserInfo.class);

	/** The sling request. */
	@ Self
	private SlingHttpServletRequest request;

	/** The user info object. */
	private String profile;

	/**
	 * Gets the profile.
	 * 
	 * @return the profile
	 */
	public String getProfile () {
		return profile;
	}

	/**
	 * Sets profile.
	 * 
	 * @param profile
	 *          the profile to set
	 */
	public void setProfile (String profile) {
		this.profile = profile;
	}

	/**
	 * Inits the user info sling model.
	 * 
	 */
	@ PostConstruct
	public void init () {
		LOG.debug("Entry :: UserInfo :: init");
		User user = null != request ? request.getResourceResolver().adaptTo(User.class)
				: null;
		if (null != user) {
			try {
				LOG.debug("Reading details for user: {}", user);
				LOG.debug("Path: {}", user.getPath());
				String familyName = user.hasProperty(UserInfoConstants.PROFILE_FAMILY_NAME_CONSTANT)
						? user.getProperty(UserInfoConstants.PROFILE_FAMILY_NAME_CONSTANT)[0].getString()
						: null; // Family name
				String givenName = user.hasProperty(UserInfoConstants.PROFILE_GIVEN_NAME_CONSTANT)
						? user.getProperty(UserInfoConstants.PROFILE_GIVEN_NAME_CONSTANT)[0].getString()
						: null; // Given name
				String email = user.hasProperty(UserInfoConstants.PROFILE_EMAIL_CONSTANT)
						? user.getProperty(UserInfoConstants.PROFILE_EMAIL_CONSTANT)[0].getString()
						: null; // Email
				JSONObject userInfoJson = new JSONObject();
				userInfoJson.put(UserInfoConstants.FAMILY_NAME_CONSTANT, familyName);
				userInfoJson.put(UserInfoConstants.GIVEN_NAME_CONSTANT, givenName);
				userInfoJson.put(UserInfoConstants.EMAIL_CONSTANT, email);
				profile = userInfoJson.toString();
			} catch (RepositoryException e) {
				LOG.error("RepositoryException :: UserInfo :: init :: {}", e);
			} catch (JSONException e) {
				LOG.error("JSONException :: UserInfo :: init :: {}", e);
			}
		}
		LOG.debug("Exit :: UserInfo :: init :: profile :: {}", profile);
	}
}
