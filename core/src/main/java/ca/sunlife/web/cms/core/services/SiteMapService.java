package ca.sunlife.web.cms.core.services;


/**
 * The Interface SiteMapService.
 */
public interface SiteMapService {

	 /**
 	 * Gets the resource type.
 	 *
 	 * @return the resource type
 	 */
 	public String getResourceType();
	 
	 /**
 	 * Gets the externalizer domain.
 	 *
 	 * @return the externalizer domain
 	 */
 	public String getExternalizerDomain();

	 /**
 	 * Gets the include last modified.
 	 *
 	 * @return the include last modified
 	 */
 	public boolean getIncludeLastModified();

	 /**
 	 * Gets the changefreq properties.
 	 *
 	 * @return the changefreq properties
 	 */
 	public String[] getChangefreqProperties();

	 /**
 	 * Gets the priority properties.
 	 *
 	 * @return the priority properties
 	 */
 	public String[] getPriorityProperties();

	 /**
 	 * Gets the dam asset property.
 	 *
 	 * @return the dam asset property
 	 */
 	public String getDamAssetProperty();

	 /**
 	 * Gets the dam asset types.
 	 *
 	 * @return the dam asset types
 	 */
 	public String[] getDamAssetTypes();

	 /**
 	 * Gets the exclude from site map property.
 	 *
 	 * @return the exclude from site map property
 	 */
 	public String[] getExcludeFromSiteMapProperty();

	 /**
 	 * Gets the url rewrites.
 	 *
 	 * @return the url rewrites
 	 */
 	public String[] getUrlRewrites();

	 /**
 	 * Gets the include inherit value.
 	 *
 	 * @return the include inherit value
 	 */
 	public boolean getIncludeInheritValue();

	 /**
 	 * Gets the extensionless urls.
 	 *
 	 * @return the extensionless urls
 	 */
 	public boolean getExtensionlessUrls();

	 /**
 	 * Gets the removes the trailing slash.
 	 *
 	 * @return the removes the trailing slash
 	 */
 	public boolean getRemoveTrailingSlash();

	 /**
 	 * Gets the character encoding.
 	 *
 	 * @return the character encoding
 	 */
 	public String getCharacterEncoding();

	 /**
 	 * Gets the excluded page templates.
 	 *
 	 * @return the excluded page templates
 	 */
 	public String[] getExcludedPageTemplates();

	 /**
 	 * Gets the use vanity url.
 	 *
 	 * @return the use vanity url
 	 */
 	public boolean getUseVanityUrl();
}
