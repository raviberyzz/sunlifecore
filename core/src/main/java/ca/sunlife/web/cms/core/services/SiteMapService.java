package ca.sunlife.web.cms.core.services;

public interface SiteMapService {

	 public String getResourceType();
	 public String getExternalizerDomain();

	 public boolean getIncludeLastModified();

	 public String[] getChangefreqProperties();

	 public String[] getPriorityProperties();

	 public String getDamAssetProperty();

	 public String[] getDamAssetTypes();

	 public String[] getExcludeFromSiteMapProperty();

	 public String[] getUrlRewrites();

	 public boolean getIncludeInheritValue();

	 public boolean getExtensionlessUrls();

	 public boolean getRemoveTrailingSlash();

	 public String getCharacterEncoding();

	 public String[] getExcludedPageTemplates();

	 public boolean getUseVanityUrl();
}
