/**
 *
 */
package ca.sunlife.web.cms.core.services.impl;

import java.io.IOException;
import java.util.Locale;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.ErrorCodes;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.osgi.config.ArticleQueryServiceConfig;
import ca.sunlife.web.cms.core.services.ArticleQueryService;
import ca.sunlife.web.cms.core.services.RestService;

/**
 * The Class ArticleQueryServiceImpl.
 *
 * @author TCS
 * @version 1.0
 */
@ Component (service = ArticleQueryService.class, immediate = true)
@ Designate (ocd = ArticleQueryServiceConfig.class)
public class ArticleQueryServiceImpl implements ArticleQueryService {

  /** The logger. */
  private final Logger logger = LoggerFactory.getLogger(this.getClass());

/** The config. */
private ArticleQueryServiceConfig config;
	
/**
 * Activate.
 *
 * @param ArticleQueryServiceConfig the site mapconfig
 */
@Activate
public void activate(ArticleQueryServiceConfig articleQueryServiceConfig) {
    this.config = articleQueryServiceConfig;
    
}

  @ Override
  @ PostConstruct
  private void initModel() {

    String pageLocaleDefault = StringUtils.EMPTY;
    if (StringUtils.isEmpty(getParentPath())) {
      return;
    }
    final String [ ] selectors = request.getRequestPathInfo().getSelectors();
    index = selectors.length > 0 ? (selectors.length - 1) : 0;
    if (selectors.length > 0 && StringUtils.isNumeric(selectors[index]) && Integer.parseInt(selectors [ index ]) > 1
        && ! getDisplayType().equals("articleList")) {
      return;
    }
    try {
      setDateFormat(configService.getConfigValues("articleDateFormat", currentPage.getPath()));

      final String locale = configService.getConfigValues("pageLocale", currentPage.getPath());
      if (null != locale && locale.length() > 0) { 
        pageLocaleDefault = locale.contains("-") ? locale.split("-")[ 0 ] : locale.split("_")[0];
        }

      setPageLocale(pageLocaleDefault);
      final Session session = resourceResolver.adaptTo(Session.class);
      if (session == null) {
        LOGGER.warn("Session was null therefore no query was executed");
        return;
      }
      final QueryBuilder queryBuilder = resourceResolver.adaptTo(QueryBuilder.class);
      if (queryBuilder == null) {
        LOGGER.warn("Query builder was null therefore no query was executed");
        return;
      }

      final Map <String, String> queryParameterMap = new HashMap <>();
      setQueryParameterMap(selectors, queryParameterMap);

      final PredicateGroup predicateGroup = PredicateGroup.create(queryParameterMap);
      LOGGER.debug("Query Params : {} : predicateGroup {}", queryParameterMap, predicateGroup);
      final Query query = queryBuilder.createQuery(predicateGroup, session);
      LOGGER.debug("Query before search {}", query);
      final SearchResult searchResult = query.getResult();

      LOGGER.debug("Query statement: '{}' : total matches: {}", searchResult.getQueryStatement(),
          searchResult.getTotalMatches());

      setTotalMatch(Integer.parseInt(searchResult.getTotalMatches() + StringUtils.EMPTY));
      // Query builder has a leaking resource resolver, so the following work around
      // is required.
      final Iterator <Resource> resourceIterator = searchResult.getResources();
      while (resourceIterator.hasNext()) {	
    final Resource resource = resourceIterator.next();				
    final DAMContentFragment contentFragmentModel = new DAMContentFragmentImpl(resource,
    contentTypeConverter, null, ELEMENT_NAMES);  
    items.add(contentFragmentModel);
  }
      if (getDisplayType().equals("articleList")) {
        String path = currentPage.getPath();
        path = configService.getPageRelativeUrl(path);
        setPagination(new Pagination(request, getMaxItems(), getTotalMatch(), path));
        setPageUrl(path);
      }
    } catch (LoginException | RepositoryException e) {
      LOGGER.error("Login exception while trying to get resource resolver {}", e);
    }
  }

  /**
   * Sets the query parameter map.
   *
   * @param selectors
   *          the selectors
   * @param queryParameterMap
   *          the query parameter map
   */
  private void setQueryParameterMap(final String [ ] selectors,
      final Map <String, String> queryParameterMap) {
    int offset = 0;
    int limit = getMaxItems();
    if (selectors.length > 0 && StringUtils.isNumeric(selectors[index])) {
      setPageNum(Integer.parseInt(selectors [ index ]));
      offset = (getPageNum() - 1) * getMaxItems(); // Pagination
    } else if (getHideTop() > 0) {
      offset = getHideTop();
      limit = getMaxItems() - getHideTop();
    }
    queryParameterMap.put("path", getParentPath());
    queryParameterMap.put("type", com.day.cq.dam.api.DamConstants.NT_DAM_ASSET);
    queryParameterMap.put("p.limit", Integer.toString(limit));
    queryParameterMap.put("p.offset", Integer.toString(offset));
    queryParameterMap.put("1_property", JcrConstants.JCR_CONTENT + "/data/cq:model");
    queryParameterMap.put("1_property.value",
        "/conf/sunlife/settings/dam/cfm/models/article-model");
    queryParameterMap.put("orderby",
        "@" + JcrConstants.JCR_CONTENT + "/data/master/articlePublishedDate");
    queryParameterMap.put("orderby.sort", "desc");
    if (tagNames != null && tagNames.length > 0) {
      queryParameterMap.put("2_property",
          JcrConstants.JCR_CONTENT + "/metadata/" + JcrConstants.JCR_MIXINTYPES);
      queryParameterMap.put("2_property.value", TagConstants.NT_TAGGABLE);
      // Check for the actual tags (by default, tag are or'ed)
      queryParameterMap.put("tagid.property", JcrConstants.JCR_CONTENT + "/metadata/cq:tags");
      for (int i = 0; i < tagNames.length; i++) {
        queryParameterMap.put(String.format("tagid.%d_value", i + 1), tagNames [ i ].trim());
      }
    }
  }

}