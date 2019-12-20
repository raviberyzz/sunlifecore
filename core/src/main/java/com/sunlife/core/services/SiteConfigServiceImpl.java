package com.sunlife.core.services;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
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
import com.sunlife.core.osgi.config.SiteConfig;

@Component(service = SiteConfigService.class, immediate = true)
@Designate(ocd = SiteConfig.class)
public class SiteConfigServiceImpl implements SiteConfigService {

	@Reference
	private ResourceResolverFactory resolverFactory;
	
	private Logger log = LoggerFactory.getLogger(this.getClass());
	
	private SiteConfig siteConfig;
	
	@Reference
    private QueryBuilder builder;
     
    private Map<String, HashMap<String, String>> siteConfigMap;
    
	@Activate
    public void activate(SiteConfig config) throws LoginException, RepositoryException {
		log.info("Entry :: activate method of SiteConfigServiceImpl");
        this.siteConfig = config;
        setConfiguration();
		log.info("Exit :: activate method of SiteConfigServiceImpl");
    }
	
	@Override
	public String getConfigValues(String name, String pagePath) {
		log.info("SiteConfigServiceImpl :: getConfigValues");
		while(!siteConfigMap.containsKey(pagePath)) {
			pagePath = pagePath.substring(0, pagePath.lastIndexOf("/"));
		}
		
		log.info("SiteConfigServiceImpl :: getConfigValues :: Page ");
		return siteConfigMap.get(pagePath).get(name);
	}

	public void setConfiguration() throws LoginException, RepositoryException {
		log.info("Entry :: setConfiguration method of SiteConfigServiceImpl");
		Session session;
		Map<String, Object> param = new HashMap<>();
		param.put(ResourceResolverFactory.SUBSERVICE, "migration");
		
		ResourceResolver resolver = null;         
		resolver = resolverFactory.getServiceResourceResolver(param);
		
		String sitePath = siteConfig.getSitePath();
		
		session = resolver.adaptTo(Session.class);
		
		Map<String, String> map = new HashMap<>();
		map.put("path", sitePath);
		map.put("type", "cq:Page");
		map.put("property", "jcr:content/config/sling:resourceType");
		map.put("property.value", "sunlife/core/components/config/configuration");
		
		Query query = builder.createQuery(PredicateGroup.create(map), session);
		SearchResult result = query.getResult();
		
		siteConfigMap = new HashMap<>();
		
		for(Hit hit : result.getHits()) {
			log.info("\n {}", hit.getPath()+"/jcr:content/config");
			Resource resource = resolver.getResource(hit.getPath()+"/jcr:content/config");
			ValueMap properties = resource.adaptTo(ValueMap.class);
			HashMap<String, String> resultMap = new HashMap<>(); 
			for(Entry<String, Object> e : properties.entrySet()) {
			    String key = e.getKey();
			    Object value = e.getValue();
			    resultMap.put(key, value.toString());
			}
			siteConfigMap.put(properties.get("siteUrl", String.class), resultMap);
		}
		
		resolver.close();
		session.logout();
		log.info("Exit :: setConfiguration method of SiteConfigServiceImpl");
	}
	
}
