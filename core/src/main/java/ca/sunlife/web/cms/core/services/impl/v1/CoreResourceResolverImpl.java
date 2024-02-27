/*
 *
 */

package ca.sunlife.web.cms.core.services.impl.v1;

import ca.sunlife.web.cms.core.osgi.config.v1.CoreResourceResolverConfig;
import ca.sunlife.web.cms.core.services.v1.CoreResourceResolver;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

@ Component (service = CoreResourceResolver.class, immediate = true)
@ Designate (ocd = CoreResourceResolverConfig.class)
public class CoreResourceResolverImpl implements CoreResourceResolver {

  /** The config. */
  private CoreResourceResolverConfig config;

  /** The log. */
  private static final Logger LOG = LoggerFactory.getLogger(CoreResourceResolverImpl.class);

  /** The resource resolver factory. */
  @ Reference
  private ResourceResolverFactory resourceResolverFactory;

  /**
   * Activate.
   *
   * @param coreResourceResolverConfig
   *          the config
   */
  @ Activate
  public void activate(CoreResourceResolverConfig coreResourceResolverConfig) {
    LOG.debug("Entry :: activate method of CoreResourceResolverImpl");
    this.config = coreResourceResolverConfig;
    LOG.info("Got sub service {}", coreResourceResolverConfig.getSubService());
    LOG.debug("Exit :: activate method of CoreResourceResolverImpl");
  }

  /*
   * (non-Javadoc)
   * @see ca.sunlife.web.cms.core.services.CoreResourceResolver#getResourceResolver()
   */
  @ Override
  public ResourceResolver getResourceResolver() throws LoginException {
    LOG.debug("Entry :: getResourceResolver method of CoreResourceResolverImpl");
    final Map <String, Object> param = new HashMap <>();
    param.put(ResourceResolverFactory.SUBSERVICE, config.getSubService());
    ResourceResolver resolver = null;
    resolver = resourceResolverFactory.getServiceResourceResolver(param);
    LOG.debug("Exit :: getResourceResolver method of CoreResourceResolverImpl {}", resolver);
    return resolver;
  }

  /*
   * (non-Javadoc)
   * @see ca.sunlife.web.cms.core.services.CoreResourceResolver#closeResourceResolver(
   * org.apache.sling.api.resource.ResourceResolver)
   */
  @ Override
  public void closeResourceResolver(final ResourceResolver resourceResolver) {
    if (null != resourceResolver && resourceResolver.isLive()) {
      resourceResolver.close();
    }
  }

}
