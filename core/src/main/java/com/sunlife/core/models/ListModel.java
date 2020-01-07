package com.sunlife.core.models;

import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface ListModel.
 */
@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface ListModel {

	/**
	 * Gets the title.
	 *
	 * @return the title
	 */
	@Inject
	String getTitle();

	/**
	 * Gets the links.
	 *
	 * @return the links
	 */
	@Inject
	List<Links> getLinks(); // the name `getLinks` corresponds to the multifield name="./links"

	/**
	 * Links model has a name, url and target.
	 */
	@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
	interface Links {

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
		 * Gets the target.
		 *
		 * @return the target
		 */
		@Inject
		String getTarget();

	}
}
