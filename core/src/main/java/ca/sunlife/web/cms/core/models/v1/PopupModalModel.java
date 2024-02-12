package ca.sunlife.web.cms.core.models.v1;

import ca.sunlife.web.cms.core.models.v1.FormDropdownModel.Items;
import java.util.List;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The PopupModalModel is a sling model associated with Popup Modal component. 
 *
 * @author Sunlife
 */

@Model(adaptables = {Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = PopupModalModel.RESOURCE_TYPE)
public interface PopupModalModel {

	String RESOURCE_TYPE = "sunlife/core/components/content/core-pop-up-modal/v1/pop-up-modal";

	@ValueMapValue
	String getModalID();

	@ValueMapValue
	String getModalTypes();

	@ValueMapValue
	@Default(booleanValues = { false })
	boolean isTrigger();

	@ValueMapValue
	String getHeading();

	@ValueMapValue
	String getContent();

	@ValueMapValue
    String getAdditionalText();

	@ValueMapValue
    String getDataSection();

	@ChildResource
	List<Buttons> getButtons();

	@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
	interface Buttons {

		@ValueMapValue
		String getButtonType();

		@ValueMapValue
		String getButtonText();

		@ValueMapValue
		String getLinkURL();

		@ValueMapValue
		String getLinkTarget();

	}

}