/**
 *
 */
package ca.sunlife.web.cms.core.models;

import java.util.Arrays;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;

import org.apache.commons.lang3.StringUtils;
import org.apache.jackrabbit.api.security.user.User;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.jcr.base.util.AccessControlUtil;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.JsonObject;

import ca.sunlife.web.cms.core.constants.UserInfoConstants;

/**
 * The Class UserInfo.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = { SlingHttpServletRequest.class,
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
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
  private String [ ] userGroups;

  /** The acf 2 id. */
  private String acf2Id = StringUtils.EMPTY;
  
  /** The building location. */
  private String buildingLocation = StringUtils.EMPTY;
  
  /** The business group. */
  private String businessGroup = StringUtils.EMPTY;
  
  /** The business unit. */
  private String businessUnit = StringUtils.EMPTY;
  
  /** The job level. */
  private String jobLevel = StringUtils.EMPTY;
  
  /** The family name. */
  private String familyName = StringUtils.EMPTY;
  
  /** The given name. */
  private String givenName = StringUtils.EMPTY;
  
  /** The email. */
  private String email = StringUtils.EMPTY;
  
  /** The language. */
  private String language = StringUtils.EMPTY;
  
  /** The country. */
  private String country = StringUtils.EMPTY;
  
  /** The user name. */
  private String userName = StringUtils.EMPTY;
  
  /** The profile groups. */
  private String profileGroups = StringUtils.EMPTY;
  
  /** The user home. */
  private String userHome = StringUtils.EMPTY;
  
  /** The has user groups. */
  private boolean hasUserGroups = false;

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
  public String [ ] getUserGroups() {
    return null != userGroups ? Arrays.copyOf(userGroups, userGroups.length) : new String [ 0 ];
  }

  /**
   * Sets user groups.
   * 
   * @param userGroups
   *          the userGroups to set
   */
  public void setUserGroups(String [ ] userGroups) {
    this.userGroups = null != userGroups ? userGroups.clone() : null;
  }

  public String getUserValue(User user, String prop) throws RepositoryException  {
    String ret = null;
    if (user.hasProperty(prop)) {
      Value[] val = user.getProperty(prop);
      if (null != val && val.length > 0) {
    	  ret = val[0].getString();
      }
    }
    return null != ret ? ret : "NA";
  }

  /**
   * Inits the user info sling model.
   */
  @ PostConstruct
  public void init() {
    LOG.trace("Entry :: UserInfo :: init request :: {}", request);
    User user = null != request ? request.getResourceResolver().adaptTo(User.class) : null;
    if (null != user) {
      try {
        LOG.debug("Reading details for user: {}", user);
        LOG.debug("Path: {}", user.getPath());
        acf2Id = getUserValue(user, UserInfoConstants.PROFILE_ACF2_CONSTANT);
        buildingLocation = getUserValue(user, UserInfoConstants.PROFILE_BUILDING_LOCATION_CONSTANT);
        businessGroup = getUserValue(user, UserInfoConstants.PROFILE_BUSINESS_GROUP_CONSTANT);
        businessUnit = getUserValue(user, UserInfoConstants.PROFILE_BUSINESS_UNIT_CONSTANT);
        jobLevel = getUserValue(user, UserInfoConstants.PROFILE_JOB_LEVEL_CONSTANT);
        familyName = getUserValue(user, UserInfoConstants.PROFILE_FAMILY_NAME_CONSTANT);
        givenName = getUserValue(user, UserInfoConstants.PROFILE_GIVEN_NAME_CONSTANT);
        email = getUserValue(user, UserInfoConstants.PROFILE_EMAIL_CONSTANT);
        language = getUserValue(user, UserInfoConstants.PROFILE_LANGAUGE_CONSTANT);
        country = getUserValue(user, "./profile/country");
        userName = (givenName + ' ' + familyName).trim();
        Session session = request.getResourceResolver().adaptTo(Session.class);
        if (null != session) {
          final UserManager userManager = AccessControlUtil.getUserManager(session);
          if (null != userGroups) {
            for (String userGroup : userGroups) {
              LOG.debug("user group : {}", userGroup);
              if (null != userManager.getAuthorizable(userGroup)) {
                hasUserGroups = true;
                break;
              }
            }
          }
        }
        JsonObject groups = new JsonObject();
        user.memberOf().forEachRemaining(group -> {
            try {
							groups.addProperty(group.getID(), true);
						} catch (RepositoryException e) {
							LOG.error("RepositoryException :: UserInfo :: iterating json :: {}", e);
						}
        });
        profileGroups = groups.toString();
        userHome = user.getPath();
        JsonObject profileData = new JsonObject();
        profileData.addProperty(UserInfoConstants.ACF2_CONSTANT, acf2Id);
        profileData.addProperty("authorizableId", user.getID());
        profileData.addProperty("displayName", userName);
        profileData.addProperty(UserInfoConstants.EMAIL_CONSTANT, email);
        profileData.addProperty(UserInfoConstants.FAMILY_NAME_CONSTANT, familyName);
        profileData.addProperty(UserInfoConstants.GIVEN_NAME_CONSTANT, givenName);
        profileData.addProperty(UserInfoConstants.BUILDING_LOCATION_CONSTANT, buildingLocation);
        profileData.addProperty(UserInfoConstants.BUSINESS_GROUP_CONSTANT, businessGroup);
        profileData.addProperty(UserInfoConstants.BUSINESS_UNIT_CONSTANT, businessUnit);
        profileData.addProperty(UserInfoConstants.JOB_LEVEL_CONSTANT, jobLevel);
        profileData.addProperty("country", country);
        profileData.addProperty("path", userHome);
        profileData.add("groups", groups);
        profile = profileData.toString();
      } catch (RepositoryException e) {
        LOG.error("RepositoryException :: UserInfo :: init :: {}", e);
      }
    }
    LOG.trace("Exit :: UserInfo :: init :: profile :: {}", profile);
  }

  /**
   * Gets the acf 2 id.
   *
   * @return the acf2Id
   */
  public final String getAcf2Id() {
    return acf2Id;
  }

  /**
   * Gets the building location.
   *
   * @return the buildingLocation
   */
  public final String getBuildingLocation() {
    return buildingLocation;
  }

  /**
   * Gets the business group.
   *
   * @return the businessGroup
   */
  public final String getBusinessGroup() {
    return businessGroup;
  }

  /**
   * Gets the business unit.
   *
   * @return the businessUnit
   */
  public final String getBusinessUnit() {
    return businessUnit;
  }

  /**
   * Gets the job level.
   *
   * @return the jobLevel
   */
  public final String getJobLevel() {
    return jobLevel;
  }

  /**
   * Gets the family name.
   *
   * @return the familyName
   */
  public final String getFamilyName() {
    return familyName;
  }

  /**
   * Gets the given name.
   *
   * @return the givenName
   */
  public final String getGivenName() {
    return givenName;
  }

  /**
   * Gets the email.
   *
   * @return the email
   */
  public final String getEmail() {
    return email;
  }

  /**
   * Gets the language.
   *
   * @return the language
   */
  public final String getLanguage() {
    return language;
  }

  /**
   * Gets the country.
   *
   * @return the country
   */
  public final String getCountry() {
    return country;
  }

  /**
   * Gets the user name.
   *
   * @return the userName
   */
  public final String getUserName() {
    return userName;
  }

  /**
   * Gets the profile groups.
   *
   * @return the profileGroups
   */
  public final String getProfileGroups() {
    return profileGroups;
  }

  /**
   * Gets the checks for user groups.
   *
   * @return the hasUserGroups
   */
  public final boolean getHasUserGroups() {
    return hasUserGroups;
  }

  /**
   * @return the userHome
   */
  public final String getUserHome() {
    return userHome;
  }
}
