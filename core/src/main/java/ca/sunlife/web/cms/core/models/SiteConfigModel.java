/**
 *
 */
package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface SiteConfigModel.
 *
 * @author MO92 Sling model for site specific configuration
 */
@Model(adaptables = {
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "sunlife/core/components/config/configuration")
public interface SiteConfigModel {

	/**
	 * Gets the domain.
	 *
	 * @return the domain
	 */
	@Inject
	String getDomain();

	/**
	 * Gets the site url.
	 *
	 * @return the site url
	 */
	@Inject
	String getSiteUrl();

	/**
	 * Gets the site suffix.
	 *
	 * @return the site suffix
	 */
	@Inject
	String getSiteSuffix();

	/**
	 * Gets the alternate languages.
	 *
	 * @return the alternate languages
	 */
	@Inject
	String getAlternateLanguages();

	/**
	 * Gets the page description.
	 *
	 * @return the page description
	 */
	@Inject
	String getPageDescription();

	/**
	 * Gets the page locale.
	 *
	 * @return the page locale
	 */
	@Inject
	String getPageLocale();

}
