package ca.sunlife.web.cms.core.models;

import java.util.Collection;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import com.adobe.cq.wcm.core.components.models.Breadcrumb;
import com.adobe.cq.wcm.core.components.models.NavigationItem;


/**
 * The Class BreadcrumbModel.
 */
@Model(adaptables = SlingHttpServletRequest.class,
adapters = Breadcrumb.class,
resourceType = "sunlife/core/components/content/breadcrumb")
public class BreadcrumbModel implements Breadcrumb{

	/** The breadcrumb. */
	@Self @Via(type = ResourceSuperType.class)
    private Breadcrumb breadcrumb;

	
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
	
	/* (non-Javadoc)
	 * @see com.adobe.cq.wcm.core.components.models.Breadcrumb#getItems()
	 */
	@Override
	public Collection<NavigationItem> getItems() {
       return breadcrumb.getItems();
    }

	/**
	 * Gets the breadcrumb.
	 *
	 * @return the breadcrumb
	 */
	public Breadcrumb getBreadcrumb() {
		return breadcrumb;
	}

	/**
	 * Sets the breadcrumb.
	 *
	 * @param breadcrumb the new breadcrumb
	 */
	public void setBreadcrumb(Breadcrumb breadcrumb) {
		this.breadcrumb = breadcrumb;
	}

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
