package ca.sunlife.web.cms.core.models;

import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * Sling model for Links - regional languages menu.
 *
 * @author MO92
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface LinkModel {

	/**
	 * Gets the link name.
	 *
	 * @return the link name
	 */
	@Inject
	String getLinkName();

	/**
	 * Gets the link url.
	 *
	 * @return the link url
	 */
	@Inject
	String getLinkUrl();

	/**
	 * Gets the link target.
	 *
	 * @return the link target
	 */
	@Inject
	String getLinkTarget();

	/**
	 * Gets the next list.
	 *
	 * @return the next list
	 */
	@Inject
	String getNextList();

	/**
	 * Gets the sub links.
	 *
	 * @return the sub links
	 */
	@Inject
	List<SubLinkModel> getSubLinks();

}
