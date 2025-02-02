package ca.sunlife.web.cms.core.models.v1;

import java.util.List;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The FormDropDownModel is a sling model associated with Form dropdown
 * component.
 *
 * @author Sunlife
 */
@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface FormDropdownModel {

	@ValueMapValue
	String getId();

	@ValueMapValue
	String getDataTitle();

	@ValueMapValue
	String getDataValue();

	@ValueMapValue
	String getRequired();

	@ValueMapValue
	String getConstraintMessage();

	@ValueMapValue
	String getName();

	@ValueMapValue
	String getDataSection();

	@ValueMapValue
	String getType();

	@ValueMapValue
	String getHelpMessage();

	@ValueMapValue
	String getAriaLabel();
	
	@ValueMapValue
	String getPlaceholderText();

	@ChildResource
	List<Items> getItems();

	@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
	interface Items {

		@ValueMapValue
		String getText();

		@ValueMapValue
		String getValue();

		@ValueMapValue
		boolean isSelected();

		@ValueMapValue
		String getShortName();

	}

	@ValueMapValue
	String getSpacing();
	
	@ValueMapValue
	String getLabel();

	@ValueMapValue
	String customActionGenerationRequired();

}