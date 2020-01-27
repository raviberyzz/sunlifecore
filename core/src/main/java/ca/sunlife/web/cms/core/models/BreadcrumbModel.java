package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.Via;
import com.adobe.cq.wcm.core.components.internal.models.v1.BreadcrumbImpl;
import com.adobe.cq.wcm.core.components.models.Breadcrumb;


/**
 * The Class BreadcrumbModel.
 */
@Model(adaptables = SlingHttpServletRequest.class,adapters = Breadcrumb.class,resourceType = "sunlife/core/components/content/breadcrumb")
public class BreadcrumbModel extends BreadcrumbImpl {
	
	public BreadcrumbModel() {
		super();
	}
	
	/** The social share reqd. */
	@Inject
	@Via("resource")
	@Optional
	private String socialShareReqd;
	 
	/** The social share text. */
	@Inject
	@Via("resource")
	@Optional
	private String socialShareText;	
	
	/**
	 * Gets the social share reqd.
	 *
	 * @return the social share reqd
	 */
	public String getSocialShareReqd() {
		return socialShareReqd;
	}

	/**
	 * Sets the social share reqd.
	 *
	 * @param socialShareReqd the new social share reqd
	 */
	public void setSocialShareReqd(String socialShareReqd) {
		this.socialShareReqd = socialShareReqd;
	}

	/**
	 * Gets the social share text.
	 *
	 * @return the social share text
	 */
	public String getSocialShareText() {
		return socialShareText;
	}

	/**
	 * Sets the social share text.
	 *
	 * @param socialShareText the new social share text
	 */
	public void setSocialShareText(String socialShareText) {
		this.socialShareText = socialShareText;
	}

}
