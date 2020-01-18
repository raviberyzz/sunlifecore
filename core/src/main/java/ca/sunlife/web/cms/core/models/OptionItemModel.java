package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.Via;
import java.util.List;
import com.adobe.cq.wcm.core.components.internal.models.v1.form.OptionItemImpl;


@Model(adaptables = SlingHttpServletRequest.class,
adapters = OptionItemImpl.class,
resourceType = "sunlife/core/components/form/options")
public class OptionItemModel extends OptionItemImpl{
 	
	public OptionItemModel(SlingHttpServletRequest request, Resource options, Resource option) {
		super(request, options, option);
	}
	
	/** The form options short name. */
	@Inject
	@Via("resource")
	@Optional
	private String shortName;

	public String getShortName() {
		return shortName;
	}
	public void setShortName(String shortName) {
		this.shortName = shortName;
	}
	

	/*public List<OptionItemModel> getItems() {
        throw new UnsupportedOperationException();
    }*/

	
	
	
}
