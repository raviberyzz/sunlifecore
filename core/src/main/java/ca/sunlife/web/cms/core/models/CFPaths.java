package ca.sunlife.web.cms.core.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * The Interface Links.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CFPaths {
	
	/** The Constant LOG. */
	private static final Logger LOG = LoggerFactory.getLogger(CFPaths.class);

	/** The article root path. */
	  @ Inject	  
	  private String rootPagePath;
	  /**
		 * Gets the rootPagePath.
		 *
		 * @return the rootPagePath
	  */
	public String getRootPagePath() {
		return rootPagePath;
	}

	/**
	 * Sets the rootPagePath.
	 *
	 * @param rootPagePath
	 */
	public void setRootPagePath(String rootPagePath) {
		this.rootPagePath = rootPagePath;
	}
	/**
	 * Inits the model.
	 *
	 * @throws LoginException
	 *             the login exception
	 * @throws RepositoryException
	 *             the repository exception
	 */
	@PostConstruct
	protected void init() throws LoginException, RepositoryException {
		LOG.debug("Inside Init of CFPaths Model");
	}
}