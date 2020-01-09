package ca.sunlife.web.cms.core.models;

import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface HeaderModel.
 */
@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface HeaderModel {

	/**
	 * Gets the links.
	 *
	 * @return the links
	 */
	@Inject
	List<Links> getLinks(); // the name `getLinks` corresponds to the multifield name="./links"

	/**
	 * The Interface Links.
	 */
	@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
	interface Links {

		/**
		 * Gets the alt text.
		 *
		 * @return the alt text
		 */
		@Inject
		String getAltText();

		/**
		 * Gets the logo image.
		 *
		 * @return the logo image
		 */
		@Inject
		String getLogoImage();

		/**
		 * Gets the target.
		 *
		 * @return the target
		 */
		@Inject
		String getTarget();

		/**
		 * Gets the link url.
		 *
		 * @return the link url
		 */
		@Inject
		String getLinkUrl();

	}

}
