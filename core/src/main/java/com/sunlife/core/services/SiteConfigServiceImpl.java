package com.sunlife.core.services;

import java.util.HashMap;
import java.util.Map;

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
     
    private Session session;
    
    private Map<String, ValueMap> siteConfigMap;
    
	@Activate
    public void activate(SiteConfig config) throws LoginException, RepositoryException {
		log.info("Entry :: activate method of SiteConfigServiceImpl");
        this.siteConfig = config;
        Map<String, Object> param = new HashMap<String, Object>();
		param.put(ResourceResolverFactory.SUBSERVICE, "migration");
		
		ResourceResolver resolver = null;         
		resolver = resolverFactory.getServiceResourceResolver(param);
		
		String sitePath = siteConfig.getSitePath();
		sitePath = "/content/sunlife/config";
		
		session = resolver.adaptTo(Session.class);
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("path", sitePath);
		map.put("type", "cq:Page");
		map.put("property", "jcr:content/config/sling:resourceType");
		map.put("property.value", "sunlife/core/components/common/configuration");
		
		Query query = builder.createQuery(PredicateGroup.create(map), session);
		SearchResult result = query.getResult();
		
		siteConfigMap = new HashMap<String, ValueMap>();
		
		for(Hit hit : result.getHits()) {
			log.info("\n {}", hit.getPath()+"/jcr:content/config");
			Resource resource = resolver.getResource(hit.getPath()+"/jcr:content/config");
			ValueMap properties = resource.adaptTo(ValueMap.class);
			siteConfigMap.put(properties.get("siteUrl").toString(), properties);
		}
		log.info("Exit :: activate method of SiteConfigServiceImpl");
    }
	
	@Override
	public Object getConfigValues(String name, String pagePath) {
		log.info("SiteConfigServiceImpl :: getConfigValues");
		//pagePath = "/content/sunlife/external/ca/en/home.html";
		while(!siteConfigMap.containsKey(pagePath)) {
			pagePath = pagePath.substring(0, pagePath.lastIndexOf("/"));
		}
		
		log.info("SiteConfigServiceImpl :: getConfigValues :: Page ");
		return siteConfigMap.get(pagePath).get(name);
	}

	public static void main(String[] args) {
		String s = "sunlife/core/components/common/configuration";
		System.out.println(s.substring(0, s.lastIndexOf("/")));
	}
	
}
