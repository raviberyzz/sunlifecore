package com.sunlife.core.models;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;

/**
 * The Interface FormButtonModel.
 */
@Model(adaptables = Resource.class)
public interface FormButtonModel {

	/**
	 * Gets the type.
	 *
	 * @return the type
	 */
	@Inject
	@Optional
	public String getType();

	/**
	 * Gets the title.
	 *
	 * @return the title
	 */
	@Inject
	@Optional
	@Named("jcr:title")
	public String getTitle();

	/**
	 * Gets the name.
	 *
	 * @return the name
	 */
	@Inject
	@Optional
	public String getName();

	/**
	 * Gets the value.
	 *
	 * @return the value
	 */
	@Inject
	@Optional
	public String getValue();

	/**
	 * Gets the buttonstyle.
	 *
	 * @return the buttonstyle
	 */
	@Inject
	@Optional
	public String getButtonstyle();

}
