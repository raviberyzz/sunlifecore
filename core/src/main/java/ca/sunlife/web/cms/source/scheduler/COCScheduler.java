package ca.sunlife.web.cms.source.scheduler;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.jcr.PropertyType;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.jcr.ValueFactory;

import org.apache.jackrabbit.api.security.user.Authorizable;
import org.apache.jackrabbit.api.security.user.Group;
import org.apache.jackrabbit.api.security.user.User;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.commons.scheduler.ScheduleOptions;
import org.apache.sling.commons.scheduler.Scheduler;
import org.apache.sling.jcr.api.SlingRepository;
import org.apache.sling.jcr.base.util.AccessControlUtil;
import org.apache.tika.io.IOUtils;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.source.osgi.config.CoCConfig;

/**
 * The Class COCScheduler.
 *
 * @author TCS
 * @version 1.0
 */
@ Component(immediate = true)
@ Designate(ocd = CoCConfig.class)
public class COCScheduler implements Runnable {

	/** The logger. */
	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	/** The coCConfig. */
	private CoCConfig coCConfig;

	/** The scheduler. */
	@ Reference
	private Scheduler scheduler;

	/** The coreResourceResolver. */
	@ Reference
	private CoreResourceResolver coreResourceResolver;

	/** The repository. */
	@ Reference
	private SlingRepository repository;

	/**
	 * Returns COC config.
	 * 
	 * @return the coCConfig coCConfig
	 */
	public CoCConfig getCoCConfig() {
		return coCConfig;
	}

	/**
	 * @param coCConfig
	 *          the coCConfig to set
	 */
	public void setCoCConfig(CoCConfig coCConfig) {
		this.coCConfig = coCConfig;
	}

	/**
	 * Activates the COC scheduler config.
	 * 
	 * @param coCConfig 
	 * 	the coc config
	 */
	@ Activate
	public void activate(CoCConfig coCConfig) {
		this.coCConfig = coCConfig;
		logger.debug("CoCConfig is set. Is enabled? : {}, file path : {}", this.coCConfig.isEnabled(),
		this.coCConfig.getFilePath());
		addSchedule();
	}

	@ Override
	public void run() {
		logger.trace("COCScheduler is running..");
		ResourceResolver resolver = null;
		try {
			resolver = coreResourceResolver.getResourceResolver();
			if (null == resolver) {
				logger.trace("Resource resolver is null, returning from method");
				return;
			}
			Resource resource = resolver
					.getResource(coCConfig.getFilePath() + "/jcr:content/renditions/original/jcr:content");
			List<String> fileList = null != resource ? IOUtils.readLines(resource.adaptTo(InputStream.class)) : null;
			if (null == fileList) {
				logger.trace("File list is empty, returning from method");
				return;
			}
			final Session session = resolver.adaptTo(Session.class);
			if (null == session) {
				return;
			}
			final UserManager userManager = AccessControlUtil.getUserManager(session);
			Group denyGroup = null != userManager ? (Group) userManager.getAuthorizable(coCConfig.getDenyGroupName()) : null; // Deny
																																																												// group
																																																												// name
			if (null == denyGroup) {
				logger.trace("Deny group doesn't exist, returning from here : {}", coCConfig.getDenyGroupName());
			}
			fileList.stream().forEach(record -> {
				logger.debug("Iterating user :: {}", record);
				try {
					final UserManager userMgr = AccessControlUtil.getUserManager(session);
					Authorizable user = userMgr.getAuthorizable(record);
					logger.trace("Authorizable user :: {}", user);
					if (null == user) {
						User newUser = userMgr.createUser(record, "password");
						ValueFactory valueFactory = session.getValueFactory();
						Value firstNameValue = valueFactory.createValue("", PropertyType.STRING);
						newUser.setProperty("./profile/givenName", firstNameValue);

						Value lastNameValue = valueFactory.createValue("", PropertyType.STRING);
						newUser.setProperty("./profile/familyName", lastNameValue);

						Value emailValue = valueFactory.createValue(record, PropertyType.STRING);
						newUser.setProperty("./profile/email", emailValue);
						session.save();
						logger.trace("New user successfully created :: {}", newUser);
					}
					logger.trace("Remove all members from deny group");
					denyGroup.getMembers().forEachRemaining( member -> {
						UserManager removeUserMgr;
						try {
							removeUserMgr = AccessControlUtil.getUserManager(session);
							denyGroup.removeMember(removeUserMgr.getAuthorizable(member.getID()));
							session.save();
						} catch (RepositoryException e) {
							logger.error("Error :: RepositoryException :: {}", e);
						}
					});
					logger.trace("Remove all members from deny group completed");
					user = userMgr.getAuthorizable(record);
					logger.trace("Before adding user to deny group :: {}", user);
					denyGroup.addMember(user); // Add user to the group
					logger.trace("Iterating user is finished :: {}", record);
					session.save();
				} catch (RepositoryException e) {
					logger.error("RepositoryException :: {}", e);
				}
			});
		} catch (IOException | LoginException | RepositoryException e) {
			logger.error("Error :: while running scheduler :: {}", e);
		}
		logger.trace("COCScheduler run is complete.");
	}

	private void addSchedule() {
		logger.trace("Entry :: COCScheduler :: addSchedule :: {}", coCConfig);
		if (coCConfig.isEnabled()) {
			ScheduleOptions scheduleOptions = scheduler.EXPR(coCConfig.getScheduleExpression());
			scheduleOptions.name(String.valueOf(coCConfig.getScheduleName()));
			scheduleOptions.canRunConcurrently(true);
			scheduler.schedule(this, scheduleOptions);
			logger.trace("COCScheduler :: schedule added :: {}", coCConfig.getScheduleName());
		}
		logger.trace("Exit :: COCScheduler :: addSchedule");
	}
}
