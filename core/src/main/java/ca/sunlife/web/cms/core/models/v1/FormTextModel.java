package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The FormTextModel is a sling model associated with Form Text component.
 *
 * @author Sunlife
 */
@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface FormTextModel {

	@ValueMapValue
	String getValidation();

	@ValueMapValue
	String getRequiredMessage();

	@ValueMapValue
	String getValidationError();

	@ValueMapValue
	String getId();

	@ValueMapValue
	String getSpacing();
	
	@ValueMapValue
    @Default(booleanValues = {false})
    boolean isIconPosition();

}