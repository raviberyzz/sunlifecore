package ca.sunlife.web.cms.core.services.impl;

import ca.sunlife.web.cms.core.beans.v1.ContentFragmentCriteria;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.DAMContentFragmentService;
import com.adobe.cq.dam.cfm.converter.ContentTypeConverter;
import com.adobe.cq.wcm.core.components.internal.models.v1.contentfragment.DAMContentFragmentImpl;
import com.adobe.cq.wcm.core.components.models.contentfragment.DAMContentFragment;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.TagConstants;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Component(service = DAMContentFragmentService.class, immediate = true)
public class DAMContentFragmentServiceImpl implements DAMContentFragmentService {

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    @Reference
    private CoreResourceResolver coreResourceResolver;

    @Override
    public DAMContentFragment getContentFragment(String path, String[] elementNames, ContentTypeConverter contentTypeConverter) {
        LOGGER.debug("Entering getContentFragment : path : {} : elementNames : {} : contentTypeConverter : {}", path, elementNames, contentTypeConverter);
        DAMContentFragment damContentFragment = null;
        try (ResourceResolver resourceResolver = coreResourceResolver.getResourceResolver()) {
            if (null != path) {
                Resource resource = resourceResolver.getResource(path);
                if (null != resource && null != contentTypeConverter) {
                    damContentFragment = new DAMContentFragmentImpl(resource, contentTypeConverter, null, elementNames);
                } else {
                    LOGGER.debug("Resource/contentTypeConverter is null for path : {}", path);
                }
            }
        } catch (LoginException e) {
            LOGGER.error("Error in getContentFragmentList " + e.getMessage(), e);
        }
        LOGGER.debug("Exiting getContentFragment : damContentFragment");
        return damContentFragment;
    }


    @Override
    public List<Resource> getCFResourceList(ContentFragmentCriteria contentFragmentCriteria) {
        LOGGER.debug("Entering getCFResourceList : path : {} : offset : {} : limit : {} : tagNames : {}", contentFragmentCriteria.getPath(), contentFragmentCriteria.getOffset(), contentFragmentCriteria.getLimit(), contentFragmentCriteria.getTagNames());
        List<Resource> resourceList = new ArrayList<>();
        Map<String, String> queryParameterMap = new HashMap<>();
        queryParameterMap.put("path", contentFragmentCriteria.getPath());
        queryParameterMap.put("type", com.day.cq.dam.api.DamConstants.NT_DAM_ASSET);
        queryParameterMap.put("p.limit", Integer.toString(contentFragmentCriteria.getLimit()));
        queryParameterMap.put("p.offset", Integer.toString(contentFragmentCriteria.getOffset()));
        queryParameterMap.put("1_property", JcrConstants.JCR_CONTENT + "/data/cq:model");
        queryParameterMap.put("1_property.value", contentFragmentCriteria.getModelPath());
        queryParameterMap.put("orderby", contentFragmentCriteria.getOrderBy());
        queryParameterMap.put("orderby.sort", contentFragmentCriteria.getOrderBySort());
        String tagNames[] = contentFragmentCriteria.getTagNames();
        if (tagNames != null && tagNames.length > 0) {
            queryParameterMap.put("2_property", JcrConstants.JCR_CONTENT + "/metadata/" + JcrConstants.JCR_MIXINTYPES);
            queryParameterMap.put("2_property.value", TagConstants.NT_TAGGABLE);
            // Check for the actual tags (by default, tag are or'ed)
            queryParameterMap.put("tagid.property", JcrConstants.JCR_CONTENT + "/metadata/cq:tags");
            for (int i = 0; i < tagNames.length; i++) {
                queryParameterMap.put(String.format("tagid.%d_value", i + 1), tagNames[i].trim());
            }
        }
        try (ResourceResolver resourceResolver = coreResourceResolver.getResourceResolver()) {
            SearchResult searchResult = executeQuery(queryParameterMap);
            if (null != searchResult) {
                contentFragmentCriteria.setTotalMatchCount(searchResult.getTotalMatches());
                List<Hit> hits = searchResult.getHits();
                for (Hit hit : hits) {
                    resourceList.add(resourceResolver.getResource(hit.getPath()));
                }
            }
        } catch (LoginException | RepositoryException e) {
            LOGGER.error("Error in getCFResourceList " + e.getMessage(), e);
        }

        return resourceList;
    }

    private SearchResult executeQuery(Map<String, String> queryParameterMap) {
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
            }
        } catch (Exception e) {
            LOGGER.error("Error in processQuery" + e.getMessage(), e);
        }
        return searchResult;
    }

    @Activate
    public void activate() {
        LOGGER.debug("Entry :: activate method of DAMContentFragmentService");
    }
}