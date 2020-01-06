package com.sunlife.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface Breadcrumb.
 */
@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface Breadcrumb {

	/**
	 * Gets the start level.
	 *
	 * @return the start level
	 */
	@Inject
	public int getStartLevel();

	/**
	 * Gets the show hidden.
	 *
	 * @return the show hidden
	 */
	@Inject
	public boolean getShowHidden();

	/**
	 * Gets the hide current.
	 *
	 * @return the hide current
	 */
	@Inject
	public boolean getHideCurrent();

	/**
	 * Gets the social share reqd.
	 *
	 * @return the social share reqd
	 */
	@Inject
	public boolean getSocialShareReqd();

	/**
	 * Gets the social share text.
	 *
	 * @return the social share text
	 */
	@Inject
	public String getSocialShareText();

}
