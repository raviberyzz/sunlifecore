/*
 *
 */

package ca.sunlife.web.cms.core.services.impl;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.api.resource.ValueMap;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;

import ca.sunlife.web.cms.core.constants.BasePageModelConstants;
import ca.sunlife.web.cms.core.osgi.config.SiteConfig;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * The Class SiteConfigServiceImpl.
 *
 * @author TCS
 * @version 1.0
 */
@ Component (service = SiteConfigService.class, immediate = true)
@ Designate (ocd = SiteConfig.class)
public class SiteConfigServiceImpl implements SiteConfigService {

  /** The resource resolver. */
  @ Reference
  private CoreResourceResolver resourceResolver;

  /** The log. */
  private final Logger log = LoggerFactory.getLogger(this.getClass());

  /** The site config. */
  private SiteConfig siteConfig;

  /** The builder. */
  @ Reference
  private QueryBuilder builder;

  /** The site config map. */
  private Map <String, HashMap <String, String>> siteConfigMap;

  /**
   * Activate.
   *
   * @param config
   *          the config
   * @throws LoginException
   *           the login exception
   * @throws RepositoryException
   *           the repository exception
   */
  @ Activate
  public void activate(final SiteConfig config) throws LoginException, RepositoryException {
    log.debug("Entry :: activate method of SiteConfigServiceImpl");
    siteConfig = config;
    setConfiguration();
    log.debug("Exit :: activate method of SiteConfigServiceImpl");
  }

  /*
   * (non-Javadoc)
   * @see ca.sunlife.web.cms.core.services.SiteConfigService#getConfigValues(java.lang. String,
   * java.lang.String)
   */
  @ Override
  public String getConfigValues(final String name, final String pagePath) {
    log.debug("SiteConfigServiceImpl :: getConfigValues :: name :: {}, pagePath :: {}", name,
        pagePath);
    String key = pagePath;
    while (! siteConfigMap.containsKey(key) && key.lastIndexOf('/') > 1) {
      key = key.substring(0, key.lastIndexOf('/'));
    }
    final String paramValue = siteConfigMap.containsKey(key) ? siteConfigMap.get(key).get(name)
        : StringUtils.EMPTY;
    log.debug("SiteConfigServiceImpl :: getConfigValues :: Page :: value :: {}", paramValue);
    return StringUtils.defaultIfBlank(paramValue, StringUtils.EMPTY);
  }

  /*
   * (non-Javadoc)
   * @see ca.sunlife.web.cms.core.services.SiteConfigService#setConfiguration()
   */
  @ Override
  public void setConfiguration() throws LoginException, RepositoryException {
    log.debug("Entry :: setConfiguration method of SiteConfigServiceImpl");
    final ResourceResolver resolver = resourceResolver.getResourceResolver();

    final String sitePath = siteConfig.getSitePath();

    final Map <String, String> map = new HashMap <>();
    map.put("path", sitePath);
    map.put("type", com.day.cq.wcm.api.NameConstants.NT_PAGE);
    map.put("property", "jcr:content/config/sling:resourceType");
    map.put("property.value", "sunlife/core/components/config/configuration");
    map.put("p.limit", "-1");
    final Query query = builder.createQuery(PredicateGroup.create(map),
        resolver.adaptTo(Session.class));
    final SearchResult result = query.getResult();

    siteConfigMap = new HashMap <>();

    for (final Hit hit : result.getHits()) {
      log.info("\n {}", hit.getPath() + "/jcr:content/config");
      final Resource resource = resolver.getResource(hit.getPath() + "/jcr:content/config");
      final ValueMap properties = ResourceUtil.getValueMap(resource);
      final HashMap <String, String> resultMap = new HashMap <>();
      for (final Entry <String, Object> e : properties.entrySet()) {
        final String key = e.getKey();
        final Object value = e.getValue();
        resultMap.put(key, value.toString());
      }
      final Resource altLangResource = resolver
          .getResource(hit.getPath() + "/jcr:content/config/alternateLanguages");
      if (altLangResource != null) {
        int count = 0;
        for (final Resource currentResource : altLangResource.getChildren()) {
          final ValueMap currentResourceProperties = ResourceUtil.getValueMap(currentResource);
          for (final Entry <String, Object> e : currentResourceProperties.entrySet()) {
            final String key = e.getKey();
            final Object value = e.getValue();
            resultMap.put(currentResource.getName() + "_" + key, value.toString());
          }
          count++;
        }
        resultMap.put("altLangCount", String.valueOf(count));
      }
      siteConfigMap.put(properties.get("siteUrl", String.class), resultMap);	//site content
      siteConfigMap.put(properties.get("experienceFragmentPath", String.class), resultMap);	//site experience fragment
    }

    resolver.close();
    log.debug("Exit :: setConfiguration method of SiteConfigServiceImpl :: siteConfigMap: {}",
        siteConfigMap);
  }

  /*
   * (non-Javadoc)
   * @see ca.sunlife.web.cms.core.services.SiteConfigService#getPageUrl(java.lang. String)
   */
  @ Override
  public String getPageUrl(final String pagePath) {
    final String domain = getConfigValues("domain", pagePath);
    final String siteRootPath = getConfigValues("siteRootPath", pagePath);
    if(StringUtils.isNotEmpty(siteRootPath)) {
      return domain.concat(pagePath.replace(siteRootPath, StringUtils.EMPTY).concat(BasePageModelConstants.SLASH_CONSTANT));
    }
    final String siteUrl = getConfigValues(BasePageModelConstants.SITE_URL_CONSTANT, pagePath);
    if (StringUtils.isNotEmpty(siteUrl)) {
      return domain
          .concat(
              pagePath
                  .replace(siteUrl.substring(0,
                      siteUrl.lastIndexOf(BasePageModelConstants.SLASH_CONSTANT)), "")
                  .concat(BasePageModelConstants.SLASH_CONSTANT));
    }
    return StringUtils.EMPTY;
  }

  /* (non-Javadoc)
   * @see ca.sunlife.web.cms.core.services.SiteConfigService#getAllSites(java.lang.String)
   */
  @ Override
  public Set <String> getAllSites(String propName) {
    Set<String> props = new HashSet<String>();
    siteConfigMap.forEach((key, val) -> {
      String prop = val.getOrDefault(propName, null);
      if (StringUtils.isNotBlank(prop)) {
        props.add(prop);
      }
    });
    return props;
  }

  /* (non-Javadoc)
   * @see ca.sunlife.web.cms.core.services.SiteConfigService#getPageRelativeUrl(java.lang.String)
   */
  @ Override
  public String getPageRelativeUrl(String pagePath) {
    final String siteRootPath = getConfigValues("siteRootPath", pagePath);
    if(StringUtils.isNotEmpty(siteRootPath)) {
      return pagePath.replace(siteRootPath, StringUtils.EMPTY).concat(BasePageModelConstants.SLASH_CONSTANT);
    }
    final String siteUrl = getConfigValues(BasePageModelConstants.SITE_URL_CONSTANT, pagePath);
    if (StringUtils.isNotEmpty(siteUrl)) {
      return pagePath
                  .replace(siteUrl.substring(0,
                      siteUrl.lastIndexOf(BasePageModelConstants.SLASH_CONSTANT)), "")
                  .concat(BasePageModelConstants.SLASH_CONSTANT);
    }
    return StringUtils.EMPTY;
  }

}
