package ca.sunlife.web.cms.core.services.impl;

import java.util.HashMap;
import java.util.Map;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ca.sunlife.web.cms.core.osgi.config.CoreResourceResolverConfig;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;

/**
 * The Class CoreResourceResolverImpl.
 */
@Component(service = CoreResourceResolver.class, immediate = true)
@Designate(ocd = CoreResourceResolverConfig.class)
public class CoreResourceResolverImpl implements CoreResourceResolver {
	
	/** The config. */
	private CoreResourceResolverConfig config;
	
	/** The log. */
	private final Logger log = LoggerFactory.getLogger(this.getClass());
	
	/** The resource resolver factory. */
	@Reference
	private ResourceResolverFactory resourceResolverFactory;
	
	/**
	 * Activate.
	 *
	 * @param config the config
	 */
	@Activate
	public void activate(final CoreResourceResolverConfig config) {
		log.debug("Entry :: activate method of CoreResourceResolverImpl");
		this.config = config;
		log.info("Got systemuser {}",config.getSystemUser());
		log.debug("Exit :: activate method of CoreResourceResolverImpl");
	}

	/* (non-Javadoc)
	 * @see ca.sunlife.web.cms.core.services.CoreResourceResolver#getResourceResolver()
	 */
	@Override
	public ResourceResolver getResourceResolver() throws LoginException {
		log.debug("Entry :: getResourceResolver method of CoreResourceResolverImpl");
		final Map<String, Object> param = new HashMap<>();
		param.put(ResourceResolverFactory.SUBSERVICE, config.getSystemUser());
		ResourceResolver resolver = null;
		resolver = resourceResolverFactory.getServiceResourceResolver(param);
		log.debug("Exit :: getResourceResolver method of CoreResourceResolverImpl");
		return resolver;
	}

	/* (non-Javadoc)
	 * @see ca.sunlife.web.cms.core.services.CoreResourceResolver#closeResourceResolver(org.apache.sling.api.resource.ResourceResolver)
	 */
	@Override
	public void closeResourceResolver(ResourceResolver resourceResolver) {
		if(null != resourceResolver && resourceResolver.isLive()) {
			resourceResolver.close();
		}
	}

}
