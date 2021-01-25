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
import org.apache.sling.models.annotations.injectorspecific.Self;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * The Class LegacyContainerModel.
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class LegacyContainerModel {
	
	/** the analyticsId. */
	@Inject
	@Via("resource")
	private String analyticsId;

	/** the type. */
	@Inject
	@Via("resource")
	private String type;

	/** the ariaLabel. */
	@Inject
	@Via("resource")
	private String ariaLabel;
	
	/** The request. */
	@Self
	private SlingHttpServletRequest request;

	/** the siteSelector. */
	private String siteSelector;

	/** The config service. */
	@Inject
	private SiteConfigService configService;

	/** The current page. */
	@ScriptVariable
	private Page currentPage;

	/** The Constant siteSelector. */
	private static final String SITE_SELECTOR = "siteSelector";

	/**
	 * Gets the analytics id.
	 *
	 * @return the analytics id
	 */
	public String getAnalyticsId() {
		return analyticsId;
	}

	/**
	 * Sets the analyticsId.
	 *
	 * @param analyticsId
	 *            the new analyticsId
	 */
	public void setAnalyticsId(String analyticsId) {
		this.analyticsId = analyticsId;
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
	 * Gets the ariaLabel.
	 *
	 * @return the ariaLabel
	 */
	public String getAriaLabel() {
		return ariaLabel;
	}

	/**
	 * Sets the ariaLabel.
	 *
	 * @param ariaLabel
	 *            the new ariaLabel
	 */
	public void setAriaLabel(String ariaLabel) {
		this.ariaLabel = ariaLabel;
	}

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
	 * Gets the request.
	 *
	 * @return the request
	 */
	public SlingHttpServletRequest getRequest() {
		return request;
	}

	/**
	 * Sets the request.
	 *
	 * @param request the new request
	 */
	public void setRequest(SlingHttpServletRequest request) {
		this.request = request;
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
