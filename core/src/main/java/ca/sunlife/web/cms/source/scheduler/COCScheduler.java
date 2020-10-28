package ca.sunlife.web.cms.source.scheduler;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.jackrabbit.api.security.user.Group;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.commons.scheduler.ScheduleOptions;
import org.apache.sling.commons.scheduler.Scheduler;
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

	/** The resourceResolver. */
	@ Reference
	private CoreResourceResolver resourceResolver;

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
	 */
	@ Activate
	public void activate(CoCConfig coCConfig) {
		this.coCConfig = coCConfig;
		logger.debug("CoCConfig is set. Is enabled? : {}, file path : {}", this.coCConfig.isEnabled(), this.coCConfig.getFilePath());
		addSchedule();
	}

	@ Override
	public void run() {
		logger.debug("COCScheduler is running..");
		Session session = null;
		ResourceResolver resolver = null;
		try {
			resolver = resourceResolver.getResourceResolver();
			if (null == resolver) {
				logger.debug("Resource resolver is null, returning from method");
				return;
			}
			Resource resource = resolver
					.getResource(coCConfig.getFilePath() + "/jcr:content/renditions/original/jcr:content");
			List<String> fileList = null != resource ? IOUtils.readLines(resource.adaptTo(InputStream.class)) : null;
			if (null == fileList) {
				logger.debug("File list is empty, returning from method");
				return;
			}
			session = resolver.adaptTo(Session.class);
			final UserManager userManager = null != session ? AccessControlUtil.getUserManager(session) : null;
			Group denyGroup = null != userManager ? (Group) userManager.getAuthorizable(coCConfig.getDenyGroupName()) : null; // Deny
																																																												// group
																																																												// name
			if (null == denyGroup) {
				logger.debug("Deny group doesn't exist, returning from here : {}", coCConfig.getDenyGroupName());
			}
			fileList.stream().forEach(record -> {
				String[] array = record.split("~");
				logger.debug("array :: {}", Arrays.deepToString(array));
				try {
					if (array[1].equals("Y")) {
						denyGroup.addMember(userManager.getAuthorizable(array[0])); // Add user to the group
					} else {
						denyGroup.removeMember(userManager.getAuthorizable(array[0])); // Remove user from the group
					}
				} catch (RepositoryException e) {
					logger.error("RepositoryException :: {}", e);
				}
			});
			if (null != session) {
				session.save();
			}
		} catch (IOException | LoginException | RepositoryException e) {
			logger.error("Error :: while running scheduler :: {}", e);
		}
		logger.debug("COCScheduler run is complete.");
	}

	private void addSchedule() {
		logger.debug("Entry :: COCScheduler :: addSchedule :: {}", coCConfig);
		if (coCConfig.isEnabled()) {
			ScheduleOptions scheduleOptions = scheduler.EXPR(coCConfig.getScheduleExpression());
			scheduleOptions.name(String.valueOf(coCConfig.getScheduleName()));
			scheduleOptions.canRunConcurrently(false);
			scheduler.schedule(this, scheduleOptions);
			logger.debug("COCScheduler :: schedule added :: {}", coCConfig.getScheduleName());
		}
		logger.debug("Exit :: COCScheduler :: addSchedule");
	}
}
