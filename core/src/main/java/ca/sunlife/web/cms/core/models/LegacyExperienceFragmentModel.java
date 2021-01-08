package ca.sunlife.web.cms.core.models;

import javax.annotation.PostConstruct;
import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.Self;


/**
 * The Class LegacyExperienceFragmentModel.
 */
@Model(adaptables = { Resource.class, SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class LegacyExperienceFragmentModel {
	
	/** The request. */
	@Self (injectionStrategy = InjectionStrategy.REQUIRED)
	private SlingHttpServletRequest request;
	

	/** The site selector. */
	private String siteSelector;
	

	/** The Constant DEFAULT_SELECTOR. */
	private static final String DEFAULT_SELECTOR = "content";


	/**
	 * Gets the site selector.
	 *
	 * @return the site selector
	 */
	public String getSiteSelector() {
		return siteSelector;
	}

	/**
	 * Sets the site selector.
	 *
	 * @param siteSelector the new site selector
	 */
	public void setSiteSelector(String siteSelector) {
		this.siteSelector = siteSelector;
	}

	/**
	 * Inits the model.
	 *
	 * @throws LoginException the login exception
	 * @throws RepositoryException the repository exception
	 */
	@PostConstruct
	public void initModel() throws LoginException, RepositoryException {
		siteSelector = null != request.getRequestPathInfo().getSelectors()[0] ? request.getRequestPathInfo().getSelectors()[0] : DEFAULT_SELECTOR;		
	}
	
}
