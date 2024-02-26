package ca.sunlife.web.cms.core.models.v1.impl;

 import java.util.ArrayList;
 import java.util.Collection;
 import java.util.Collections;
 import java.util.HashMap;
 import java.util.Iterator;
 import java.util.List;
 import java.util.Map;
 
 import javax.annotation.PostConstruct;
 import javax.inject.Inject;
 import javax.jcr.RepositoryException;
 import javax.jcr.Session;
 
 import org.apache.commons.lang3.StringUtils;
 import org.apache.sling.api.SlingHttpServletRequest;
 import org.apache.sling.api.resource.LoginException;
 import org.apache.sling.api.resource.Resource;
 import org.apache.sling.api.resource.ResourceResolver;
 import org.apache.sling.models.annotations.DefaultInjectionStrategy;
 import org.apache.sling.models.annotations.Exporter;
 import org.apache.sling.models.annotations.Model;
 import org.apache.sling.models.annotations.Via;
 import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
 import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
 import org.apache.sling.models.annotations.injectorspecific.Self;
 import org.apache.sling.models.annotations.injectorspecific.SlingObject;
 import org.slf4j.Logger;
 import org.slf4j.LoggerFactory;
 
 import com.adobe.cq.dam.cfm.converter.ContentTypeConverter;
 import com.adobe.cq.export.json.ComponentExporter;
 import com.adobe.cq.export.json.ExporterConstants;
 import com.adobe.cq.wcm.core.components.internal.models.v1.contentfragment.DAMContentFragmentImpl;
 import com.adobe.cq.wcm.core.components.models.contentfragment.DAMContentFragment;
 import com.day.cq.commons.jcr.JcrConstants;
 import com.day.cq.search.PredicateGroup;
 import com.day.cq.search.Query;
 import com.day.cq.search.QueryBuilder;
 import com.day.cq.search.result.SearchResult;
 import com.day.cq.tagging.TagConstants;
 import com.day.cq.wcm.api.Page;
 import com.fasterxml.jackson.databind.annotation.JsonSerialize;
 import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
 
 import ca.sunlife.web.cms.core.beans.Pagination;
 import ca.sunlife.web.cms.core.models.v1.ArticleList;
 import ca.sunlife.web.cms.core.services.SiteConfigService;
 import lombok.Getter;
 
 @Getter
 @ Model (adaptables = SlingHttpServletRequest.class, adapters = {ComponentExporter.class, ArticleList.class}, resourceType = {
    ArticleListImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
 @ Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
 @ JsonSerialize(as = ArticleListImpl.class)

 public class ArticleListImpl implements ComponentExporter, ArticleList{

   private static final Logger LOGGER = LoggerFactory.getLogger(ArticleListImpl.class);
   
   protected static final String RESOURCE_TYPE = "sunlife/core/components/content/core-articleList/v1/articleList";
 
   @ValueMapValue
   private String parentPath;

   @ValueMapValue
   private String [ ] tagNames;
 
   @ValueMapValue
   private String displayType;
 
   @ValueMapValue
   private int hideTop;
 
   @ValueMapValue
   private int maxItems;

   @ValueMapValue
   private String spacing;

   @ValueMapValue
   private String accessibilityLabel;
  
   @ValueMapValue
   private ContentTypeConverter contentTypeConverter;

 /** The config service. */
  @ Inject
  private SiteConfigService configService;

   /** The resource resolver. */
   @ SlingObject
   private ResourceResolver resourceResolver;
 
   private final List <DAMContentFragment> items = new ArrayList <>();
 
   @ Self (injectionStrategy = InjectionStrategy.REQUIRED)
   private SlingHttpServletRequest request;

   /** The page num. */
    private int pageNum = 0;
   
   /** The selector index */
    private int index = 0;
 
      /** The date format. */
    private String dateFormat;
 
    /** The page locale. */
    private String pageLocale;
 
     /** The current page. */
      @ ScriptVariable
     private Page currentPage;
   
      /** The pagination. */
      private Pagination pagination;

      /** The page url. */
      private String pageUrl;

  /**
   * Gets the page url.
   *
   * @return the page url
   */
  public final String getPageUrl() {
    return pageUrl;
  }

  /**
   * Sets the page url.
   *
   * @param pageUrl
   *          the new page url
   */
  public final void setPageUrl(final String pageUrl) {
    this.pageUrl = pageUrl;
  }

  /**
   * Gets the pagination.
   *
   * @return the pagination
   */
  public final Pagination getPagination() {
    return pagination;
  }

  /**
   * Sets the pagination.
   *
   * @param pagination
   *          the new pagination
   */
  public final void setPagination(final Pagination pagination) {
    this.pagination = pagination;
  }

  /**
   * Gets the total match.
   *
   * @return the total match
   */
  public final int getTotalMatch() {
    return totalMatch;
  }

  /**
   * Gets the date format.
   *
   * @return the date format
   */
  public final String getDateFormat() {
    return dateFormat;
  }

  /**
   * Gets the page locale.
   *
   * @return the page locale
   */
  public final String getPageLocale() {
    return pageLocale;
  }

  /**
   * Sets the date format.
   *
   * @param dateFormat
   *          the new date format
   */
  public final void setDateFormat(final String dateFormat) {
    this.dateFormat = dateFormat;
  }

  /**
   * Sets the page locale.
   *
   * @param pageLocale
   *          the new page locale
   */
  public final void setPageLocale(final String pageLocale) {
    this.pageLocale = pageLocale;
  }

  /**
   * Gets the page num.
   *
   * @return the page num
   */
  public final int getPageNum() {
    return pageNum;
  }

  /**
   * Sets the page num.
   *
   * @param pageNum
   *          the new page num
   */
  public final void setPageNum(final int pageNum) {
    this.pageNum = pageNum;
  }

  /**
   * Sets the total match.
   *
   * @param totalMatch
   *          the new total match
   */
  public final void setTotalMatch(final int totalMatch) {
    this.totalMatch = totalMatch;
  }

  /** The total match. */
  private int totalMatch;
 
   /** The Constant ELEMENT_NAMES. */
   private static final String [ ] ELEMENT_NAMES = { "articlePublishedDate", "articleHeadline",
       "articlePageLink", "articleAuthor", "articleMiniDescription", "articleImage",
       "articleMainDescription", "articleThumbnailImage" };
 
   /**
    * Gets the list items.
    *
    * @return the list items
    */
   public Collection <DAMContentFragment> getListItems() {
     return Collections.unmodifiableCollection(items);
   }
 
  
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
        ResourceResolver leakingResourceResolver = null;
        try {
          // Iterate over the hits if you need special information
          final Iterator <Resource> resourceIterator = searchResult.getResources();
          while (resourceIterator.hasNext()) {
            final Resource resource = resourceIterator.next();
            if (leakingResourceResolver == null) {
              // Get a reference to QB's leaking resource resolver
              leakingResourceResolver = resource.getResourceResolver();
            }
  
            final DAMContentFragment contentFragmentModel = new DAMContentFragmentImpl(resource,
                contentTypeConverter, null, ELEMENT_NAMES);
  
            items.add(contentFragmentModel);
          }
        } finally {
          if (null != leakingResourceResolver) {
            // Always close the leaking query builder resource resolver
            leakingResourceResolver.close();
          }
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
 
   @Override
    public String getParentPath() {
        return parentPath;
    }

    @Override
    public String getDisplayType() {
        return displayType;
    }

    @Override
    public int getHideTop() {
        return hideTop;
    }

    @Override
    public int getMaxItems() {
        return maxItems;
    }

    @Override
    public String getAccessibilityLabel() {
        return accessibilityLabel;
    }

   @Override
   public String getExportedType() {
     return RESOURCE_TYPE;
   }
 }
 