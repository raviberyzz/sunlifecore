package ca.sunlife.web.cms.core.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.services.SiteConfigService;

@Model(adaptables = { Resource.class, SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class LegacyLayoutContainerModel {
	/**
	 * the noc.
	 */
	@Inject
	@ Via ("resource")
	private String noc;

	/**
	 * the type
	 */
	@Inject
	@ Via ("resource")
	private String type;

	/**
	 * the siteSelector
	 */
	private String siteSelector;

	/** The Constant siteSelector. */
	private static final String SITE_SELECTOR = "siteSelector";

	/** The config service. */
	@Inject
	private SiteConfigService configService;

	/** The current page. */
	@ScriptVariable
	private Page currentPage;

	/**
	 * Gets the siteSelector.
	 *
	 * @return the siteSelector
	 */
	public String getSiteSelector() {
		return siteSelector;
	}

	/**
	 * Sets the siteSelector.
	 *
	 * @param siteSelector
	 *            the new siteSelector
	 */
	public void setSiteSelector(String siteSelector) {
		this.siteSelector = siteSelector;
	}

	/**
	 * Gets the noc.
	 *
	 * @return the noc
	 */
	public String getNoc() {
		return noc;
	}

	/**
	 * Sets the noc.
	 *
	 * @param noc
	 *            the new noc
	 */
	public void setNoc(String noc) {
		this.noc = noc;
	}

	/**
	 * Gets the type.
	 *
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * Sets the type.
	 *
	 * @param type
	 *            the new type
	 */
	public void setType(String type) {
		this.type = type;
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
	public void initModel() throws LoginException, RepositoryException {
		final String pagePath = currentPage.getPath();
		siteSelector = configService.getConfigValues(SITE_SELECTOR, pagePath);

	}

}
