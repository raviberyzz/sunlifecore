package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface HiddenFormModel.
 */
@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface HiddenFormModel {

	/**
	 * Gets the name.
	 *
	 * @return the name
	 */
	@Inject
	String getName();

	/**
	 * Gets the id.
	 *
	 * @return the id
	 */
	@Inject
	String getId();

	/**
	 * Gets the value.
	 *
	 * @return the value
	 */
	@Inject
	String getValue();
}
