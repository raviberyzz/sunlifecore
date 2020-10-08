package ca.sunlife.web.cms.core.services.impl;

import ca.sunlife.web.cms.core.osgi.config.SiteMapConfig;
import ca.sunlife.web.cms.core.services.SiteMapService;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ Component (service = SiteMapService.class, immediate = true)
@ Designate (ocd = SiteMapConfig.class)
public class SiteMapServiceImpl implements SiteMapService {

	private SiteMapConfig config;
	
	 /** The log. */
	  private final Logger log = LoggerFactory.getLogger(this.getClass());
	
	@Activate
    public void activate(SiteMapConfig siteMapconfig) {
        this.config = siteMapconfig;
        
    }
	
	@Override
	public String getResourceType() {
		return config.getResourceType();
	}

	@Override
	public String getExternalizerDomain() {
		return config.getExternalizerDomain();
	}

	@Override
	public boolean getIncludeLastModified() {
		return config.getIncludeLastModified();
	}

	@Override
	public String[] getChangefreqProperties() {
		
		return config.getChangefreqProperties();
	}

	@Override
	public String[] getPriorityProperties() {
		return config.getPriorityProperties();
	}

	@Override
	public String getDamAssetProperty() {
		
		return config.getDamAssetProperty();
	}

	@Override
	public String[] getDamAssetTypes() {
		
		return config.getDamAssetTypes();
	}

	@Override
	public String[] getExcludeFromSiteMapProperty() {
		
		return config.getExcludeFromSiteMapProperty();
	}

	@Override
	public String[] getUrlRewrites() {
		return config.getUrlRewrites();
	}

	@Override
	public boolean getIncludeInheritValue() {
		return config.getIncludeInheritValue();
	}

	@Override
	public boolean getExtensionlessUrls() {
		return config.getExtensionlessUrls();
	}

	@Override
	public boolean getRemoveTrailingSlash() {
		return config.getRemoveTrailingSlash();
	}

	@Override
	public String getCharacterEncoding() {
		return config.getCharacterEncoding();
	}

	@Override
	public String[] getExcludedPageTemplates() {
		return config.getExcludedPageTemplates();
	}

	@Override
	public boolean getUseVanityUrl() {
		return config.getUseVanityUrl();
	}

}
