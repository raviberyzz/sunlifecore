package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * Sling model for sub links in regional languages menu.
 *
 * @author MO92
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface SubLinkModel {

	/**
	 * Gets the sub link name.
	 *
	 * @return the sub link name
	 */
	@Inject
	String getSubLinkName();

	/**
	 * Gets the sub link url.
	 *
	 * @return the sub link url
	 */
	@Inject
	String getSubLinkUrl();

	/**
	 * Gets the sub link target.
	 *
	 * @return the sub link target
	 */
	@Inject
	String getSubLinkTarget();

	/**
	 * Gets the sub link separator.
	 *
	 * @return the sub link separator
	 */
	@Inject
	String getSubLinkSeparator();

	/**
	 * Gets the selected.
	 *
	 * @return the selected
	 */
	@Inject
	String getSelected();
}
