package com.sunlife.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface FormContainer.
 */
@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface FormContainer {
	
	/**
	 * Gets the form action.
	 *
	 * @return the form action
	 */
	@Inject
	public String getFormAction();

	/**
	 * Gets the validation.
	 *
	 * @return the validation
	 */
	@Inject
	public String getValidation();

}
