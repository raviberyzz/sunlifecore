/**
 *
 */
package ca.sunlife.web.cms.core.models;

import java.util.Arrays;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.jackrabbit.api.security.user.User;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.jcr.base.util.AccessControlUtil;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
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
@ Model (adaptables = { SlingHttpServletRequest.class, Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class UserInfo {

	/** The Constant LOG. */
	private static final Logger LOG = LoggerFactory.getLogger(UserInfo.class);

	/** The sling request. */
	@ Self
	private SlingHttpServletRequest request;

	/** The user info object. */
	private String profile;
	
	/** The user groups. */
	@ Inject
	@ Via ("resource")
	private String[] userGroups;
	
	/**
	 * Gets the profile.
	 * 
	 * @return the profile
	 */
	public String getProfile() {
		return profile;
	}

	/**
	 * Sets profile.
	 * 
	 * @param profile
	 *          the profile to set
	 */
	public void setProfile(String profile) {
		this.profile = profile;
	}

	/**
	 * Gets the user groups.
	 * 
	 * @return the userGroups
	 */
	public String[] getUserGroups() {
		return null != userGroups ? Arrays.copyOf(userGroups, userGroups.length) : new String [ 0 ];
	}

	/**
	 * Sets user groups.
	 * 
	 * @param userGroups 
	 * 					the userGroups to set
	 */
	public void setUserGroups(String[] userGroups) {
		this.userGroups = null != userGroups ? userGroups.clone() : null;
	}

	/**
	 * Inits the user info sling model.
	 * 
	 */
	@ PostConstruct
	public void init() {
		LOG.debug("Entry :: UserInfo :: init request :: {}", request);
		User user = null != request ? request.getResourceResolver().adaptTo(User.class) : null;
		if (null != user) {
			try {
				LOG.debug("Reading details for user: {}", user);
				LOG.debug("Path: {}", user.getPath());
				String acf2Id = user.hasProperty(UserInfoConstants.PROFILE_ACF2_CONSTANT)
						? user.getProperty(UserInfoConstants.PROFILE_ACF2_CONSTANT)[0].getString()
						: "NA"; // ACF2 id
				String buildingLocation = user.hasProperty(UserInfoConstants.PROFILE_BUILDING_LOCATION_CONSTANT)
						? user.getProperty(UserInfoConstants.PROFILE_BUILDING_LOCATION_CONSTANT)[0].getString()
						: "NA"; // building loc
				String businessGroup = user.hasProperty(UserInfoConstants.PROFILE_BUSINESS_GROUP_CONSTANT)
						? user.getProperty(UserInfoConstants.PROFILE_BUSINESS_GROUP_CONSTANT)[0].getString()
						: "NA"; // business group
				String businessUnit = user.hasProperty(UserInfoConstants.PROFILE_BUSINESS_UNIT_CONSTANT)
						? user.getProperty(UserInfoConstants.PROFILE_BUSINESS_UNIT_CONSTANT)[0].getString()
						: "NA"; // business unit
				String jobLevel = user.hasProperty(UserInfoConstants.PROFILE_JOB_LEVEL_CONSTANT)
						? user.getProperty(UserInfoConstants.PROFILE_JOB_LEVEL_CONSTANT)[0].getString()
						: "NA"; // job level
				String familyName = user.hasProperty(UserInfoConstants.PROFILE_FAMILY_NAME_CONSTANT)
						? user.getProperty(UserInfoConstants.PROFILE_FAMILY_NAME_CONSTANT)[0].getString()
						: "NA"; // Family name
				String givenName = user.hasProperty(UserInfoConstants.PROFILE_GIVEN_NAME_CONSTANT)
						? user.getProperty(UserInfoConstants.PROFILE_GIVEN_NAME_CONSTANT)[0].getString()
						: "NA"; // Given name
				String email = user.hasProperty(UserInfoConstants.PROFILE_EMAIL_CONSTANT)
						? user.getProperty(UserInfoConstants.PROFILE_EMAIL_CONSTANT)[0].getString()
						: "NA"; // Email
				String language = user.hasProperty(UserInfoConstants.PROFILE_LANGAUGE_CONSTANT)
						? user.getProperty(UserInfoConstants.PROFILE_LANGAUGE_CONSTANT)[0].getString()
						: "NA"; // Language
				String country = user.hasProperty("./profile/country")
								? user.getProperty("./profile/country")[0].getString()
								: "NA"; // Language
				boolean isUserGroupMatched = false;
				Session session = request.getResourceResolver().adaptTo(Session.class);
				if( null != session ) {
					final UserManager userManager = AccessControlUtil.getUserManager(session);
					if( null != userGroups ) {
						for (String userGroup : userGroups) {
							LOG.debug("user group : {}", userGroup);
							if( null != userManager.getAuthorizable(userGroup) ) {
								isUserGroupMatched = true;
								break;
							}
						}
					}
				}
				JSONObject userInfoJson = new JSONObject();
				userInfoJson.put(UserInfoConstants.ACF2_CONSTANT, acf2Id);
				userInfoJson.put(UserInfoConstants.USER_NAME_CONSTANT, familyName + " " + givenName);
				userInfoJson.put(UserInfoConstants.EMAIL_CONSTANT, email);
				userInfoJson.put(UserInfoConstants.BUILDING_LOCATION_CONSTANT, buildingLocation);
				userInfoJson.put(UserInfoConstants.BUSINESS_GROUP_CONSTANT, businessGroup);
				userInfoJson.put(UserInfoConstants.BUSINESS_UNIT_CONSTANT, businessUnit);
				userInfoJson.put(UserInfoConstants.JOB_LEVEL_CONSTANT, jobLevel);
				userInfoJson.put(UserInfoConstants.LANGAUGE_CONSTANT, language);
				userInfoJson.put("country", country);
				userInfoJson.put("home", user.getPath());
				userInfoJson.put("hasUserGroups", isUserGroupMatched);
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
