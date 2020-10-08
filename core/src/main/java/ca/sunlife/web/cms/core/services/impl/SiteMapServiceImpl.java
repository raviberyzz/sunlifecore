package ca.sunlife.web.cms.core.services.impl;

import ca.sunlife.web.cms.core.osgi.config.SiteMapConfig;
import ca.sunlife.web.cms.core.services.SiteMapService;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.Designate;


/**
 * The Class SiteMapServiceImpl.
 */
@ Component (service = SiteMapService.class, immediate = true)
@ Designate (ocd = SiteMapConfig.class)
public class SiteMapServiceImpl implements SiteMapService {

	/** The config. */
	private SiteMapConfig config;
	
	/**
	 * Activate.
	 *
	 * @param siteMapconfig the site mapconfig
	 */
	@Activate
    public void activate(SiteMapConfig siteMapconfig) {
        this.config = siteMapconfig;
        
    }

	/* (non-Javadoc)
	 * @see ca.sunlife.web.cms.core.services.SiteMapService#getResourceType()
	 */
	@Override
	public String getResourceType() {
		return config.getResourceType();
	}

	/* (non-Javadoc)
	 * @see ca.sunlife.web.cms.core.services.SiteMapService#getExternalizerDomain()
	 */
	@Override
	public String getExternalizerDomain() {
		return config.getExternalizerDomain();
	}

	/* (non-Javadoc)
	 * @see ca.sunlife.web.cms.core.services.SiteMapService#getIncludeLastModified()
	 */
	@Override
	public boolean getIncludeLastModified() {
		return config.getIncludeLastModified();
	}

	/* (non-Javadoc)
	 * @see ca.sunlife.web.cms.core.services.SiteMapService#getChangefreqProperties()
	 */
	@Override
	public String[] getChangefreqProperties() {
		
		return config.getChangefreqProperties();
	}

	/* (non-Javadoc)
	 * @see ca.sunlife.web.cms.core.services.SiteMapService#getPriorityProperties()
	 */
	@Override
	public String[] getPriorityProperties() {
		return config.getPriorityProperties();
	}

	/* (non-Javadoc)
	 * @see ca.sunlife.web.cms.core.services.SiteMapService#getDamAssetProperty()
	 */
	@Override
	public String getDamAssetProperty() {
		
		return config.getDamAssetProperty();
	}

	/* (non-Javadoc)
	 * @see ca.sunlife.web.cms.core.services.SiteMapService#getDamAssetTypes()
	 */
	@Override
	public String[] getDamAssetTypes() {
		
		return config.getDamAssetTypes();
	}

	/* (non-Javadoc)
	 * @see ca.sunlife.web.cms.core.services.SiteMapService#getExcludeFromSiteMapProperty()
	 */
	@Override
	public String[] getExcludeFromSiteMapProperty() {
		
		return config.getExcludeFromSiteMapProperty();
	}

	/* (non-Javadoc)
	 * @see ca.sunlife.web.cms.core.services.SiteMapService#getUrlRewrites()
	 */
	@Override
	public String[] getUrlRewrites() {
		return config.getUrlRewrites();
	}

	/* (non-Javadoc)
	 * @see ca.sunlife.web.cms.core.services.SiteMapService#getIncludeInheritValue()
	 */
	@Override
	public boolean getIncludeInheritValue() {
		return config.getIncludeInheritValue();
	}

	/* (non-Javadoc)
	 * @see ca.sunlife.web.cms.core.services.SiteMapService#getExtensionlessUrls()
	 */
	@Override
	public boolean getExtensionlessUrls() {
		return config.getExtensionlessUrls();
	}

	/* (non-Javadoc)
	 * @see ca.sunlife.web.cms.core.services.SiteMapService#getRemoveTrailingSlash()
	 */
	@Override
	public boolean getRemoveTrailingSlash() {
		return config.getRemoveTrailingSlash();
	}

	/* (non-Javadoc)
	 * @see ca.sunlife.web.cms.core.services.SiteMapService#getCharacterEncoding()
	 */
	@Override
	public String getCharacterEncoding() {
		return config.getCharacterEncoding();
	}

	/* (non-Javadoc)
	 * @see ca.sunlife.web.cms.core.services.SiteMapService#getExcludedPageTemplates()
	 */
	@Override
	public String[] getExcludedPageTemplates() {
		return config.getExcludedPageTemplates();
	}

	/* (non-Javadoc)
	 * @see ca.sunlife.web.cms.core.services.SiteMapService#getUseVanityUrl()
	 */
	@Override
	public boolean getUseVanityUrl() {
		return config.getUseVanityUrl();
	}

}
