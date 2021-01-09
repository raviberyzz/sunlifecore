package ca.sunlife.web.cms.core.models;
import java.util.List;
import java.util.Arrays;
import java.util.Collections;
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
public class LegacyExperienceFragmentModel extends ExperienceFragmentModel {
	
	/** The request. */
	@Self (injectionStrategy = InjectionStrategy.REQUIRED)
	private SlingHttpServletRequest request;
	

	/** The site selector. */
	private List <String> siteSelector;
	


	/**
	 * Gets the site selector.
	 *
	 * @return the site selector
	 */
	public List<String> getSiteSelector() {
		return Collections.unmodifiableList(siteSelector);
	}

	/**
	 * Sets the site selector.
	 *
	 * @param siteSelector the new site selector
	 */
	public void setSiteSelector(List<String> siteSelector) {
		this.siteSelector = Collections.unmodifiableList(siteSelector);
	}
 
	/**
	 * Inits the model.
	 *
	 * @throws LoginException the login exception
	 * @throws RepositoryException the repository exception
	 */
	@PostConstruct
	public void initModel() throws LoginException, RepositoryException {
		if (request.getRequestPathInfo().getSelectors().length > 0) {
		siteSelector =  Arrays.asList(request.getRequestPathInfo().getSelectors());
		}
	}
	
}
