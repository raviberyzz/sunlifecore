package ca.sunlife.web.cms.core.models;

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
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.dam.cfm.converter.ContentTypeConverter;
import com.adobe.cq.wcm.core.components.internal.models.v1.contentfragment.DAMContentFragmentImpl;
import com.adobe.cq.wcm.core.components.models.contentfragment.DAMContentFragment;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.TagConstants;
import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.beans.Pagination;
import ca.sunlife.web.cms.core.constants.BasePageModelConstants;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * The Class ArticleListModel.
 */
@ Model (adaptables = SlingHttpServletRequest.class, adapters = ArticleListModel.class, resourceType = "sunlife/core/components/content/articleList", defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ArticleListModel {

  /** The logger. */
  private static final Logger logger = LoggerFactory.getLogger(ArticleListModel.class);

  /** The parent path. */
  @ Inject
  @ Via ("resource")
  private String parentPath;

  /** The tag names. */
  @ Inject
  @ Via ("resource")
  private String [ ] tagNames;

  /** The display type. */
  @ Inject
  @ Via ("resource")
  private String displayType;

  /** The hide top. */
  @ Inject
  @ Via ("resource")
  private int hideTop;

  /** The max items. */
  @ Inject
  @ Via ("resource")
  private int maxItems;

  /** The title. */
  @ Inject
  @ Via ("resource")
  private String title;

  /** The title level. */
  @ Inject
  @ Via ("resource")
  private String titleLevel;

  /** The items. */
  private final List <DAMContentFragment> items = new ArrayList <>();

  /** The sling http servlet request. */
  @ Self (injectionStrategy = InjectionStrategy.REQUIRED)
  private SlingHttpServletRequest request;

  /** The content type converter. */
  @ Inject
  private ContentTypeConverter contentTypeConverter;

  /** The core resource resolver. */
  @ Inject
  private CoreResourceResolver coreResourceResolver;

  /** The config service. */
  @ Inject
  private SiteConfigService configService;

  /** The page num. */
  private int pageNum = 0;

  /** The date format. */
  private String dateFormat;

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
   * @return the pageUrl
   */
  public final String getPageUrl() {
    return pageUrl;
  }

  /**
   * Sets the page url.
   *
   * @param pageUrl
   *          the pageUrl to set
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
   *          the pagination to set
   */
  public final void setPagination(final Pagination pagination) {
    this.pagination = pagination;
  }

  /**
   * Gets the total match.
   *
   * @return the totalMatch
   */
  public final int getTotalMatch() {
    return totalMatch;
  }

  /**
   * Gets the date format.
   *
   * @return the dateFormat
   */
  public final String getDateFormat() {
    return dateFormat;
  }

  /**
   * Gets the title.
   *
   * @return the title
   */
  public final String getTitle() {
    return title;
  }

  /**
   * Sets the title.
   *
   * @param title
   *          the title to set
   */
  public final void setTitle(final String title) {
    this.title = title;
  }

  /**
   * Gets the title level.
   *
   * @return the titleLevel
   */
  public final String getTitleLevel() {
    return titleLevel;
  }

  /**
   * Sets the title level.
   *
   * @param titleLevel
   *          the titleLevel to set
   */
  public final void setTitleLevel(final String titleLevel) {
    this.titleLevel = titleLevel;
  }

  /**
   * Sets the date format.
   *
   * @param dateFormat
   *          the dateFormat to set
   */
  public final void setDateFormat(final String dateFormat) {
    this.dateFormat = dateFormat;
  }

  /**
   * Gets the page num.
   *
   * @return the pageNum
   */
  public final int getPageNum() {
    return pageNum;
  }

  /**
   * Sets the page num.
   *
   * @param pageNum
   *          the pageNum to set
   */
  public final void setPageNum(final int pageNum) {
    this.pageNum = pageNum;
  }

  /**
   * Sets the total match.
   *
   * @param totalMatch
   *          the totalMatch to set
   */
  public final void setTotalMatch(final int totalMatch) {
    this.totalMatch = totalMatch;
  }

  /** The total match. */
  private int totalMatch;

  /** The element names. */
  private static final String [ ] ELEMENT_NAMES = { "articlePublishedDate", "articleHeadline",
      "articlePageLink", "articleAuthor", "articleMiniDescription", "articleImage",
      "articleMainDescription", "articleThumbnailImage" };

  /**
   * Gets the parent path.
   *
   * @return the parentPath
   */
  public final String getParentPath() {
    return parentPath;
  }

  /**
   * Sets the parent path.
   *
   * @param parentPath
   *          the parentPath to set
   */
  public final void setParentPath(final String parentPath) {
    this.parentPath = parentPath;
  }

  /**
   * Gets the display type.
   *
   * @return the displayType
   */
  public final String getDisplayType() {
    return displayType;
  }

  /**
   * Sets the display type.
   *
   * @param displayType
   *          the displayType to set
   */
  public final void setDisplayType(final String displayType) {
    this.displayType = displayType;
  }

  /**
   * Gets the hide top.
   *
   * @return the hideTop
   */
  public final int getHideTop() {
    return hideTop;
  }

  /**
   * Sets the hide top.
   *
   * @param hideTop
   *          the hideTop to set
   */
  public final void setHideTop(final int hideTop) {
    this.hideTop = hideTop;
  }

  /**
   * Gets the max items.
   *
   * @return the maxItems
   */
  public final int getMaxItems() {
    return maxItems;
  }

  /**
   * Sets the max items.
   *
   * @param maxItems
   *          the maxItems to set
   */
  public final void setMaxItems(final int maxItems) {
    this.maxItems = maxItems;
  }

  /**
   * Gets the list items.
   *
   * @return the list items
   */
  public Collection <DAMContentFragment> getListItems() {
    return Collections.unmodifiableCollection(items);
  }

  /**
   * Inits the model.
   */
  @ PostConstruct
  private void initModel() {
    if (StringUtils.isEmpty(getParentPath())) {
      return;
    }
    final String [ ] selectors = request.getRequestPathInfo().getSelectors();
    if (selectors.length > 0 && Integer.parseInt(selectors [ 0 ]) > 1
        && ! getDisplayType().equals("articleList")) {
      return;
    }
    ResourceResolver resourceResolver = null;
    try {
      setDateFormat(configService.getConfigValues("articleDateFormat", currentPage.getPath()));
      resourceResolver = coreResourceResolver.getResourceResolver();
      final Session session = resourceResolver.adaptTo(Session.class);
      if (session == null) {
        logger.warn("Session was null therefore no query was executed");
        return;
      }
      final QueryBuilder queryBuilder = resourceResolver.adaptTo(QueryBuilder.class);
      if (queryBuilder == null) {
        logger.warn("Query builder was null therefore no query was executed");
        return;
      }

      final Map <String, String> queryParameterMap = new HashMap <>();
      setQueryParameterMap(selectors, queryParameterMap);

      final PredicateGroup predicateGroup = PredicateGroup.create(queryParameterMap);
      logger.debug("Query Params : {} : predicateGroup {}", queryParameterMap, predicateGroup);
      final Query query = queryBuilder.createQuery(predicateGroup, session);

      final SearchResult searchResult = query.getResult();

      logger.debug("Query statement: '{}' : total matches: {}", searchResult.getQueryStatement(),
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
      String path = currentPage.getPath();
      String siteUrl = configService.getConfigValues(BasePageModelConstants.SITE_URL_CONSTANT, path);
      path = path
          .replace(siteUrl.substring(0,
              siteUrl.lastIndexOf(BasePageModelConstants.SLASH_CONSTANT)), "");
      setPagination(new Pagination(request, getMaxItems(), getTotalMatch(), path));
      setPageUrl(path);
    } catch (LoginException | RepositoryException e) {
      logger.error("Login exception while trying to get resource resolver {}", e);
    } finally {
      if (null != resourceResolver) {
        resourceResolver.close();
      }
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
    if (selectors.length > 0) {
      setPageNum(Integer.parseInt(selectors [ 0 ]));
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
      for (int i = 0 ; i < tagNames.length ; i++ ) {
        queryParameterMap.put(String.format("tagid.%d_value", i + 1), tagNames [ i ]);
      }
    }
  }

}
