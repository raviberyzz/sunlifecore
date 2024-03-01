/**
 *
 */
package ca.sunlife.web.cms.core.services.impl;

import ca.sunlife.web.cms.core.services.ArticleQueryService;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.TagConstants;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Session;
import java.util.HashMap;
import java.util.Map;


@Component(service = ArticleQueryService.class, immediate = true)
public class ArticleQueryServiceImpl implements ArticleQueryService {

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    @Reference
    private CoreResourceResolver coreResourceResolver;

    @Override
    public SearchResult processQuery(Map<String, String> queryParameterMap) {
        LOGGER.debug("Entering processQuery : queryParameterMap : {}", queryParameterMap);
        SearchResult searchResult = null;
        try (ResourceResolver resourceResolver = coreResourceResolver.getResourceResolver()) {
            Session session = resourceResolver.adaptTo(Session.class);
            QueryBuilder queryBuilder = resourceResolver.adaptTo(QueryBuilder.class);
            PredicateGroup predicateGroup = PredicateGroup.create(queryParameterMap);
            LOGGER.debug("Query Params : {} : predicateGroup {}", queryParameterMap, predicateGroup);
            if (null != queryBuilder) {
                Query query = queryBuilder.createQuery(predicateGroup, session);
                LOGGER.debug("ArticleQueryService Query Predicate: {}", queryParameterMap);
                LOGGER.debug("Executing Query: {}", query.getPredicates().toString());
                searchResult = query.getResult();
                LOGGER.debug("Query Executed, Result Count : {}", searchResult.getHits().size());
                return searchResult;
            }
        } catch (Exception e) {
            LOGGER.error("Error in processQuery" + e.getMessage(), e);
        }
        return searchResult;
    }

    @Override
    public Map<String, String> generateQueryParameterMap(String path, int offset, int limit, String[] tagNames) {
        LOGGER.debug("Entering generateQueryParameterMap : path : {} : offset : {} : limit : {} : tagNames : {}", path, offset, limit, tagNames);
        Map<String, String> queryParameterMap = new HashMap<>();
        queryParameterMap.put("path", path);
        queryParameterMap.put("type", com.day.cq.dam.api.DamConstants.NT_DAM_ASSET);
        queryParameterMap.put("p.limit", Integer.toString(limit));
        queryParameterMap.put("p.offset", Integer.toString(offset));
        queryParameterMap.put("1_property", JcrConstants.JCR_CONTENT + "/data/cq:model");
        queryParameterMap.put("1_property.value", "/conf/sunlife/settings/dam/cfm/models/article-model");
        queryParameterMap.put("orderby", "@" + JcrConstants.JCR_CONTENT + "/data/master/articlePublishedDate");
        queryParameterMap.put("orderby.sort", "desc");
        if (tagNames != null && tagNames.length > 0) {
            queryParameterMap.put("2_property", JcrConstants.JCR_CONTENT + "/metadata/" + JcrConstants.JCR_MIXINTYPES);
            queryParameterMap.put("2_property.value", TagConstants.NT_TAGGABLE);
            // Check for the actual tags (by default, tag are or'ed)
            queryParameterMap.put("tagid.property", JcrConstants.JCR_CONTENT + "/metadata/cq:tags");
            for (int i = 0; i < tagNames.length; i++) {
                queryParameterMap.put(String.format("tagid.%d_value", i + 1), tagNames[i].trim());
            }
        }
        return queryParameterMap;
    }

    @Activate
    public void activate() {
        LOGGER.debug("Entry :: activate method of ArticleQueryService");
    }

}