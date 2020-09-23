/*
 *
 */

package ca.sunlife.web.cms.core.models;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.services.CoreResourceResolver;

/**
 * The Class RelatedArticles.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = { SlingHttpServletRequest.class,
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "sunlife/core/components/content/related-articles")
public class RelatedArticles {

  /** The article fragment path. */
  @ Inject
  @ Via ("resource")
  private String articleFragmentPath;

  /** The current page. */
  @ ScriptVariable
  private Page currentPage;

  /** The core resource resolver. */
  @ Inject
  private CoreResourceResolver coreResourceResolver;

  /** The Constant JCR_CONTENT_DATA_MASTER. */
  private static final String JCR_CONTENT_DATA_MASTER = "/jcr:content/data/master";

  /** The Constant ELEMENT_NAMES. */
  private static final String [ ] ELEMENT_NAMES = { "articlePublishedDate", "articleHeadline",
      "articlePageLink", "articleAuthor", "articleMiniDescription", "articleImage",
      "articleMainDescription", "articleThumbnailImage" };

  /** The article data. */
  private final Map <String, String> articleData = new HashMap <>();

  /** The Constant LOG. */
  private static final Logger LOG = LoggerFactory.getLogger(RelatedArticles.class);

  /**
   * Gets the article fragment path.
   *
   * @return the article fragment path
   */
  public String getArticleFragmentPath() {
    return articleFragmentPath;
  }

  /**
   * Sets the article fragment path.
   *
   * @param articleFragmentPath
   *          the new article fragment path
   */
  public void setArticleFragmentPath(final String articleFragmentPath) {
    this.articleFragmentPath = articleFragmentPath;
  }

  /**
   * Gets the article data.
   *
   * @return the article data
   */
  public final Map <String, String> getArticleData() {
    return Collections.unmodifiableMap(articleData);
  }

  /**
   * Inits the.
   */
  @ PostConstruct
  public void init() {
    if (! StringUtils.isEmpty(getArticleFragmentPath())) {
      getRelatedArticleData();
    }
  }

  /**
   * Gets the related article data.
   *
   */
  public void getRelatedArticleData() {
    ResourceResolver resourceResolver;
    try {
      resourceResolver = coreResourceResolver.getResourceResolver();
      LOG.debug("Reading content fragment {}", getArticleFragmentPath() + JCR_CONTENT_DATA_MASTER);
      final Resource articleResource = resourceResolver
          .getResource(getArticleFragmentPath().concat(JCR_CONTENT_DATA_MASTER));

      if (null != articleResource) {
        LOG.debug("Parsing Article Data");
        final ValueMap articleContent = articleResource.getValueMap();
        for (final String element : ELEMENT_NAMES) {
          articleData.put(element,
              articleContent.containsKey(element) ? articleContent.get(element, String.class)
                  : StringUtils.EMPTY);
        }
      }
      LOG.debug("Article Data {}", articleData);

    } catch (final LoginException e) {
      LOG.error(" Exception in getRelatedArticleData {}", e);
    }

  }
}
