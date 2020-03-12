/**
 *
 */
package ca.sunlife.web.cms.core.models;

import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;

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
	List<AlternateLanguageModel> getAlternateLanguages();

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
	
	/**
	 * Gets the social media image path.
	 *
	 * @return the page locale
	 */
	@Inject
	String getSocialMediaImage();
	
	/**
	 * Gets the default reporting language.
	 *
	 * @return the page locale
	 */
	@Inject
	String getDefaultReportingLanguage();
	
	
	/**
	 * Gets the Experience fragment path.
	 *
	 * @return the page locale
	 */
	@Inject
	String getExperienceFragmentPath();
	
	
	/**
	 * Gets the Navigation Overview title.
	 *
	 * @return the page locale
	 */
	@Inject
	String getNavigationOverview();
	
	/**
	 * Gets the UDO tag path.
	 *
	 * @return the page locale
	 */
	@Inject
	String getUdoTagsPath();
	
	/**
	 * Gets the article date format.
	 *
	 * @return the article date format
	 */
	@Inject @Optional
	String getArticleDateFormat();
	
	/**
	 * Gets the article publisher name.
	 *
	 * @return the article publisher name
	 */
	@Inject @Optional
	String getArticlePublisherName();
	
	/**
	 * Gets the article publisher logo.
	 *
	 * @return the article publisher logo
	 */
	@Inject @Optional
	String getArticlePublisherLogo();

}
