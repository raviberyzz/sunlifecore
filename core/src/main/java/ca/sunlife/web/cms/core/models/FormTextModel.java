package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface FormTextModel.
 */
@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface FormTextModel {

	/**
	 * Gets the validation.
	 *
	 * @return the validation
	 */
	@Inject
	String getValidation();

	/**
	 * Gets the required message.
	 *
	 * @return the required message
	 */
	@Inject
	String getRequiredMessage();

	/**
	 * Gets the validation error.
	 *
	 * @return the validation error
	 */
	@Inject
	String getValidationError();
	
	/**
	 * Gets the id.
	 *
	 * @return the id
	 */
	@Inject
	String getId();

}
