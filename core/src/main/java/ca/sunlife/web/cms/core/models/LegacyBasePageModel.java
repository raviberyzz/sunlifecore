/**
 *
 */
package ca.sunlife.web.cms.core.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.RepositoryException;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.WCMMode;
import com.day.cq.wcm.api.components.ComponentContext;

import ca.sunlife.web.cms.core.services.SiteConfigService;


/**
 * The Class BasePageModel.
 *
 * @author TCS
 * @version 1.0
 */
@Model(adaptables = {
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "sunlife/legacy/components/structure/base-page")
public class LegacyBasePageModel {

	/** The Constant LOG. */
	private static final Logger LOG = LoggerFactory.getLogger(LegacyBasePageModel.class);

	/** The current page. */
	@ScriptVariable
	private Page currentPage;

	/** The config service. */
	@Inject
	private SiteConfigService configService;

	/** The request. */
	@Self
	private SlingHttpServletRequest request;
	

	/** The Constant siteSelector. */
	private static final String SITE_SELECTOR = "siteSelector";

	/** The siteSelector. */
	private String siteSelector;

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
	public void init() throws LoginException, RepositoryException {

		final String pagePath = currentPage.getPath();
		siteSelector = configService.getConfigValues(SITE_SELECTOR, pagePath);

		if ((WCMMode.fromRequest(request).equals(WCMMode.EDIT))
				|| (WCMMode.fromRequest(request).equals(WCMMode.DESIGN))) {
			LOG.debug("Mode is Edit!!!");
		} else {
			LOG.debug("Mode is not Edit or Design");
			request.setAttribute(ComponentContext.BYPASS_COMPONENT_HANDLING_ON_INCLUDE_ATTRIBUTE, false);
		}
	}

}
