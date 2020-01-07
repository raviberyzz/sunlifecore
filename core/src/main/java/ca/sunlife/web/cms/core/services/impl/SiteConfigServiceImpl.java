package ca.sunlife.web.cms.core.services.impl;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
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

import ca.sunlife.web.cms.core.osgi.config.SiteConfig;
import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * The Class SiteConfigServiceImpl.
 */
@Component(service = SiteConfigService.class, immediate = true)
@Designate(ocd = SiteConfig.class)
public class SiteConfigServiceImpl implements SiteConfigService {

	/** The resolver factory. */
	@Reference
	private ResourceResolverFactory resolverFactory;

	/** The log. */
	private final Logger log = LoggerFactory.getLogger(this.getClass());

	/** The site config. */
	private SiteConfig siteConfig;

	/** The builder. */
	@Reference
	private QueryBuilder builder;

	/** The site config map. */
	private Map<String, HashMap<String, String>> siteConfigMap;

	/**
	 * Activate.
	 *
	 * @param config the config
	 * @throws LoginException the login exception
	 * @throws RepositoryException the repository exception
	 */
	@Activate
	public void activate(final SiteConfig config) throws LoginException, RepositoryException {
		log.info("Entry :: activate method of SiteConfigServiceImpl");
		this.siteConfig = config;
		setConfiguration();
		log.info("Exit :: activate method of SiteConfigServiceImpl");
	}

	/* (non-Javadoc)
	 * @see ca.sunlife.web.cms.core.services.SiteConfigService#getConfigValues(java.lang.String, java.lang.String)
	 */
	@Override
	public String getConfigValues(final String name, String pagePath) {
		log.info("SiteConfigServiceImpl :: getConfigValues");
		while (!siteConfigMap.containsKey(pagePath)) {
			pagePath = pagePath.substring(0, pagePath.lastIndexOf("/"));
		}

		log.info("SiteConfigServiceImpl :: getConfigValues :: Page ");
		return siteConfigMap.get(pagePath).get(name);
	}

	/* (non-Javadoc)
	 * @see ca.sunlife.web.cms.core.services.SiteConfigService#setConfiguration()
	 */
	@Override
	public void setConfiguration() throws LoginException, RepositoryException {
		log.info("Entry :: setConfiguration method of SiteConfigServiceImpl");
		final Map<String, Object> param = new HashMap<>();
		param.put(ResourceResolverFactory.SUBSERVICE, "migration");

		ResourceResolver resolver = null;
		resolver = resolverFactory.getServiceResourceResolver(param);

		final String sitePath = siteConfig.getSitePath();

		final Map<String, String> map = new HashMap<>();
		map.put("path", sitePath);
		map.put("type", "cq:Page");
		map.put("property", "jcr:content/config/sling:resourceType");
		map.put("property.value", "sunlife/core/components/config/configuration");

		final Query query = builder.createQuery(PredicateGroup.create(map), resolver.adaptTo(Session.class));
		final SearchResult result = query.getResult();

		siteConfigMap = new HashMap<>();

		for (final Hit hit : result.getHits()) {
			log.info("\n {}", hit.getPath() + "/jcr:content/config");
			final Resource resource = resolver.getResource(hit.getPath() + "/jcr:content/config");
			final ValueMap properties = ResourceUtil.getValueMap(resource);
			final HashMap<String, String> resultMap = new HashMap<>();
			for (final Entry<String, Object> e : properties.entrySet()) {
				final String key = e.getKey();
				final Object value = e.getValue();
				resultMap.put(key, value.toString());
			}
			siteConfigMap.put(properties.get("siteUrl", String.class), resultMap);
		}

		resolver.close();
		log.info("Exit :: setConfiguration method of SiteConfigServiceImpl");
	}

}
