package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.Via;

import com.adobe.cq.wcm.core.components.internal.models.v1.NavigationImpl;
import com.adobe.cq.wcm.core.components.models.Navigation;


/**
 * The Class LeftNavigation.
 */
@Model(adaptables = SlingHttpServletRequest.class,
adapters = Navigation.class,
resourceType = "sunlife/core/components/content/left-navigation")
public class LeftNavigation extends NavigationImpl {

	public LeftNavigation() {
		super();
	}
	
	/** The breadcrumb analytics id. */
	@Inject
	@Via("resource")
	@Optional
	private String analyticsId;
	
	/**
	 * Gets the analytics id.
	 *
	 * @return the analytics id
	 */
	public String getAnalyticsId() {
		return analyticsId;
	}
	
	/**
	 * Sets the analytics id.
	 *
	 * @param analyticsId the analytics text
	 */
	public void setAnalyticsId(String analyticsId) {
		this.analyticsId = analyticsId;
	}
	
	
}
