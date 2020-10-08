package ca.sunlife.web.cms.core.osgi.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ ObjectClassDefinition (name = "Sun Life - Site Map Configuration", description = "Sun Life - Site Map Configuration")
public @interface SiteMapConfig {
	

	@ AttributeDefinition (name = "Sling Resource Type", description = "Sling Resource Type for the Home Page component or components.")
	  String getResourceType() default "sunlife/core/components/structure/base-page";
	
	@ AttributeDefinition (name = "Externalizer Domain", description = "Must correspond to a configuration of the Externalizer component. If blank the externalization will prepend the current request's scheme combined with the current request's host header.")
	  String getExternalizerDomain() default "publish";
	
	@ AttributeDefinition (name = "Include Last Modified", description = "If true, the last modified value will be included in the sitemap.")
	  boolean getIncludeLastModified() default true;
	
	@ AttributeDefinition (name = "Change Frequency Properties", description = "The set of JCR property names which will contain the change frequency value.")
	String[] getChangefreqProperties();
	
	@ AttributeDefinition (name = "Priority Properties", description = "The set of JCR property names which will contain the priority value.")
	String[] getPriorityProperties();
	
	@ AttributeDefinition (name = "DAM Folder Property", description = "The JCR property name which will contain DAM folders to include in the sitemap.")
	String getDamAssetProperty();
	
	@ AttributeDefinition (name = "DAM Asset MIME Types", description = "MIME types allowed for DAM assets.")
	String[] getDamAssetTypes();
	
	@ AttributeDefinition (name = "Exclude Pages (by properties of boolean values) from Sitemap Property", description = "The boolean [cq:Page]/jcr:content property name which indicates if the Page should be hidden from the Sitemap.")
	String[] getExcludeFromSiteMapProperty();
	
	@ AttributeDefinition (name = "URL Rewrites", description = "Colon separated URL rewrites to adjust the <loc> to match your dispatcher's apache rewrites")
	String[] getUrlRewrites();
	
	@ AttributeDefinition (name = "Include Inherit Value", description = "If true searches for the frequency and priority attribute in the current page if null looks in the parent.")
	boolean getIncludeInheritValue();
	
	@ AttributeDefinition (name = "Extensionless URLs", description = "If true, page links included in sitemap are generated without .html extension and the path is included with a trailing slash, e.g. /content/geometrixx/en/.")
	boolean getExtensionlessUrls();
	
	@ AttributeDefinition (name = "Remove Trailing Slash from Extensionless URLs", description = "Only relevant if Extensionless URLs is selected.  If true, the trailing slash is removed from extensionless page links, e.g. /content/geometrixx/en.")
	boolean getRemoveTrailingSlash();
	
	@ AttributeDefinition (name = "Character Encoding", description = "If not set, the container's default is used (ISO-8859-1 for Jetty)")
	String getCharacterEncoding();
	
	@ AttributeDefinition (name = "Exclude Pages (by Template) from Sitemap", description = "Excludes pages that have a matching value at [cq:Page]/jcr:content@cq:Template")
	String[] getExcludedPageTemplates();
	
	@ AttributeDefinition (name = "Use Vanity URLs", description = "Use the Vanity URL for generating the Page URL")
	boolean getUseVanityUrl();
	
	
	
}
