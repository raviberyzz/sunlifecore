/*
 *
 */

package ca.sunlife.web.cms.core.models;

import java.text.SimpleDateFormat;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;
import javax.jcr.RepositoryException;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.jcr.resource.api.JcrResourceConstants;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * The Class ArticleModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = { SlingHttpServletRequest.class,
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, adapters = ArticleModel.class, resourceType = "sunlife/core/components/content/article")
public class ArticleModel {

  /** The Constant DOMAIN. */
  private static final String DOMAIN = "domain";

  /** The Constant SOCIAL_MEDIA_IMAGE. */
  private static final String SOCIAL_MEDIA_IMAGE = "socialMediaImage";

  /** The Constant ARTICLE_MINI_DESCRIPTION. */
  private static final String ARTICLE_MINI_DESCRIPTION = "articleMiniDescription";

  /** The Constant AUTHOR_BODY. */
  private static final String AUTHOR_BODY = "authorBody";

  /** The Constant AUTHOR_NAME. */
  private static final String AUTHOR_NAME = "authorName";

  /** The Constant ARTICLE_AUTHOR. */
  private static final String ARTICLE_AUTHOR = "articleAuthor";

  /** The Constant ARTICLE_PUBLISHED_DATE. */
  private static final String ARTICLE_PUBLISHED_DATE = "articlePublishedDate";

  /** The Constant ARTICLE_PAGE_LINK. */
  private static final String ARTICLE_PAGE_LINK = "articlePageLink";

  /** The Constant ARTICLE_MAIN_DESCRIPTION. */
  private static final String ARTICLE_MAIN_DESCRIPTION = "articleMainDescription";

  /** The Constant ARTICLE_IMAGE. */
  private static final String ARTICLE_IMAGE = "articleImage";

  /** The Constant JCR_CONTENT_DATA_MASTER. */
  private static final String JCR_CONTENT_DATA_MASTER = "/jcr:content/data/master";

  /** The Constant ARTICLE_HEADLINE. */
  private static final String ARTICLE_HEADLINE = "articleHeadline";

  /** The Constant LOGGER. */
  private static final Logger LOGGER = LoggerFactory.getLogger(ArticleModel.class);

  /** The fragment path. */
  @ Inject
  @ Via ("resource")
  private String fragmentPath;

  /** The resolver. */
  @ ScriptVariable
  private ResourceResolver resolver;

  /** The article unique ID. */
  @ Inject
  @ Via ("resource")
  private String articleUniqueID;

  /** The checkbox comment. */
  @ Inject
  @ Via ("resource")
  private String checkboxComment;

  /** The checkbox hide date. */
  @ Inject
  @ Via ("resource")
  private String checkboxHideDate;

  /** The resource type. */
  @ Inject
  @ Via ("resource")
  @ Named (JcrResourceConstants.SLING_RESOURCE_TYPE_PROPERTY)
  private String resourceType;

  /** The layout resource type. */
  private String layoutResourceType;

  /** The article ID. */
  @ Inject
  @ Via ("resource")
  private String articleID;

  /** The rating required. */
  @ Inject
  @ Via ("resource")
  private String ratingRequired;

  /** The page url. */
  private String pageUrl;

  /** The og image. */
  private String ogImage;

  /** The og description. */
  private String ogDescription;

  /** The page modified date. */
  private String pageModifiedDate;

  /** The publisher name. */
  private String publisherName;

  /** The publisher logo. */
  private String publisherLogo;

  /** The article image. */
  private String articleImage;

  /**
   * Gets the article image.
   *
   * @return the article image
   */
  public final String getArticleImage() {
    return articleImage;
  }

  /**
   * Gets the layout resource type.
   *
   * @return the layout resource type
   */
  public final String getLayoutResourceType() {
    return layoutResourceType;
  }

  /**
   * Sets the article image.
   *
   * @param articleImage
   *          the new article image
   */
  public final void setArticleImage(final String articleImage) {
    this.articleImage = articleImage;
  }

  /**
   * Gets the og image.
   *
   * @return the og image
   */
  public final String getOgImage() {
    return ogImage;
  }

  /**
   * Sets the og image.
   *
   * @param ogImage
   *          the new og image
   */
  public final void setOgImage(final String ogImage) {
    this.ogImage = ogImage;
  }

  /**
   * Gets the og description.
   *
   * @return the og description
   */
  public final String getOgDescription() {
    return ogDescription;
  }

  /**
   * Sets the og description.
   *
   * @param ogDescription
   *          the new og description
   */
  public final void setOgDescription(final String ogDescription) {
    this.ogDescription = ogDescription;
  }

  /**
   * Gets the page modified date.
   *
   * @return the page modified date
   */
  public final String getPageModifiedDate() {
    return pageModifiedDate;
  }

  /**
   * Sets the page modified date.
   *
   * @param pageModifiedDate
   *          the new page modified date
   */
  public final void setPageModifiedDate(final String pageModifiedDate) {
    this.pageModifiedDate = pageModifiedDate;
  }

  /**
   * Gets the publisher name.
   *
   * @return the publisher name
   */
  public final String getPublisherName() {
    return publisherName;
  }

  /**
   * Sets the publisher name.
   *
   * @param publisherName
   *          the new publisher name
   */
  public final void setPublisherName(final String publisherName) {
    this.publisherName = publisherName;
  }

  /**
   * Gets the publisher logo.
   *
   * @return the publisher logo
   */
  public final String getPublisherLogo() {
    return publisherLogo;
  }

  /**
   * Sets the publisher logo.
   *
   * @param publisherLogo
   *          the new publisher logo
   */
  public final void setPublisherLogo(final String publisherLogo) {
    this.publisherLogo = publisherLogo;
  }

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
   * Gets the rating required.
   *
   * @return the rating required
   */
  public final String getRatingRequired() {
    return ratingRequired;
  }

  /**
   * Sets the rating required.
   *
   * @param ratingRequired
   *          the new rating required
   */
  public final void setRatingRequired(final String ratingRequired) {
    this.ratingRequired = ratingRequired;
  }

  /** The config service. */
  @ Inject
  private SiteConfigService configService;

  /** The core resource resolver. */
  @ Inject
  private CoreResourceResolver coreResourceResolver;

  /** The current page. */
  @ ScriptVariable
  private Page currentPage;

  /** The article data. */
  private final Map <String, String> articleData = new HashMap <>();

  /**
   * Gets the article data.
   *
   * @return the article data
   */
  public Map <String, String> getArticleData() {
    return articleData;
  }

  /**
   * Gets the fragment path.
   *
   * @return the fragment path
   */
  public String getFragmentPath() {
    return fragmentPath;
  }

  /**
   * Sets the fragment path.
   *
   * @param fragmentPath
   *          the new fragment path
   */
  public void setFragmentPath(final String fragmentPath) {
    this.fragmentPath = fragmentPath;
  }

  /**
   * Gets the checkbox comment.
   *
   * @return the checkbox comment
   */
  public String getCheckboxComment() {
    return checkboxComment;
  }

  /**
   * Sets the checkbox comment.
   *
   * @param checkboxComment
   *          the new checkbox comment
   */
  public void setCheckboxComment(final String checkboxComment) {
    this.checkboxComment = checkboxComment;
  }

  /**
   * Gets the checkbox hide date.
   *
   * @return the checkbox hide date
   */
  public String getCheckboxHideDate() {
    return checkboxHideDate;
  }

  /**
   * Sets the checkbox hide date.
   *
   * @param checkboxHideDate
   *          the new checkbox hide date
   */
  public void setCheckboxHideDate(final String checkboxHideDate) {
    this.checkboxHideDate = checkboxHideDate;
  }

  /**
   * Gets the article unique ID.
   *
   * @return the article unique ID
   */
  public String getArticleUniqueID() {
    return articleUniqueID;
  }

  /**
   * Sets the article unique ID.
   *
   * @param articleUniqueID
   *          the new article unique ID
   */
  public void setArticleUniqueID(final String articleUniqueID) {
    this.articleUniqueID = articleUniqueID;
  }

  /**
   * Gets the article ID.
   *
   * @return the article ID
   */
  public String getArticleID() {
    return articleID;
  }

  /**
   * Sets the article ID.
   *
   * @param articleID
   *          the new article ID
   */
  public void setArticleID(final String articleID) {
    this.articleID = articleID;
  }

  /**
   * Gets the resource type.
   *
   * @return the resource type
   */
  public String getResourceType() {
    return resourceType;
  }

  /**
   * Sets the resource type.
   *
   * @param resourceType
   *          the new resource type
   */
  public void setResourceType(final String resourceType) {
    this.resourceType = resourceType;
  }

  /**
   * Inits the.
   */
  @ PostConstruct
  public void init() {
    if (StringUtils.isEmpty(getFragmentPath())) {
      return;
    }
    try {
      final ResourceResolver resourceResolver = coreResourceResolver.getResourceResolver();
      LOGGER.debug("Reading content fragment {}", getFragmentPath() + JCR_CONTENT_DATA_MASTER);
      final Resource articleResource = resourceResolver
          .getResource(getFragmentPath().concat(JCR_CONTENT_DATA_MASTER));
      final String pagePath = currentPage.getPath();
      if (null != articleResource) {
        LOGGER.debug("Parsing Article Data");
        final ValueMap articleContent = articleResource.getValueMap();
        articleData.put(ARTICLE_HEADLINE,
            articleContent.containsKey(ARTICLE_HEADLINE)
                ? articleContent.get(ARTICLE_HEADLINE, String.class)
                : StringUtils.EMPTY);
        articleData.put(ARTICLE_IMAGE,
            articleContent.containsKey(ARTICLE_IMAGE)
                ? articleContent.get(ARTICLE_IMAGE, String.class)
                : StringUtils.EMPTY);
        articleData.put(ARTICLE_MAIN_DESCRIPTION,
            articleContent.containsKey(ARTICLE_MAIN_DESCRIPTION)
                ? articleContent.get(ARTICLE_MAIN_DESCRIPTION, String.class)
                : StringUtils.EMPTY);
        articleData.put(ARTICLE_PAGE_LINK,
            articleContent.containsKey(ARTICLE_PAGE_LINK)
                ? articleContent.get(ARTICLE_PAGE_LINK, String.class)
                : StringUtils.EMPTY);
        articleData.put(ARTICLE_MINI_DESCRIPTION,
            articleContent.containsKey(ARTICLE_MINI_DESCRIPTION)
                ? articleContent.get(ARTICLE_MINI_DESCRIPTION, String.class)
                : StringUtils.EMPTY);
        setArticlePublishDate(articleContent);
        setArticleAuthorData(resourceResolver, articleContent);
        setArticleImage(
            configService.getConfigValues(DOMAIN, pagePath).concat(articleData.get(ARTICLE_IMAGE)));
      }
      LOGGER.debug("Article Data {}", articleData);
      final ValueMap pageProperties = currentPage.getProperties();
      layoutResourceType = resourceType.substring(0, resourceType.lastIndexOf('/'))
          .concat("/layout-container");
      setPageUrl(configService.getPageUrl(pagePath));
      setOgImage(configService.getConfigValues(DOMAIN, pagePath)
          .concat(pageProperties.containsKey(SOCIAL_MEDIA_IMAGE)
              ? (String) pageProperties.getOrDefault(SOCIAL_MEDIA_IMAGE, StringUtils.EMPTY)
              : configService.getConfigValues(SOCIAL_MEDIA_IMAGE, pagePath)));
      setOgDescription(pageProperties.containsKey("socialMediaDescripton")
          ? pageProperties.get("socialMediaDescripton", String.class)
          : configService.getConfigValues("pageDescription", pagePath));
      final SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
      setPageModifiedDate(formatter.format(currentPage.getLastModified().getTime()));
      setPublisherName(configService.getConfigValues("articlePublisherName", pagePath));
      setPublisherLogo(configService.getConfigValues(DOMAIN, pagePath)
          .concat(configService.getConfigValues("articlePublisherLogo", pagePath)));
      resourceResolver.close();
    } catch (LoginException | RepositoryException e) {
      LOGGER.error("Login Error while getting resource resolver : {}", e);
    }
  }

  /**
   * Sets the article author data.
   *
   * @param resourceResolver
   *          the resource resolver
   * @param articleContent
   *          the article content
   */
  private void setArticleAuthorData(final ResourceResolver resourceResolver,
      final ValueMap articleContent) {
    if (articleContent.containsKey(ARTICLE_AUTHOR)) {
      final String articleAuthorPath = (String) articleContent.getOrDefault(ARTICLE_AUTHOR,
          StringUtils.EMPTY);
      final Resource authorResource = resourceResolver
          .getResource(articleAuthorPath.concat(JCR_CONTENT_DATA_MASTER));
      if (null != authorResource) {
        final ValueMap authorContent = authorResource.getValueMap();
        articleData.put(AUTHOR_NAME,
            authorContent.containsKey(AUTHOR_NAME) ? authorContent.get(AUTHOR_NAME, String.class)
                : StringUtils.EMPTY);
        articleData.put(AUTHOR_BODY,
            authorContent.containsKey(AUTHOR_BODY) ? authorContent.get(AUTHOR_BODY, String.class)
                : StringUtils.EMPTY);
      } else {
        articleData.put(AUTHOR_NAME, StringUtils.EMPTY);
        articleData.put(AUTHOR_BODY, StringUtils.EMPTY);
      }
    } else {
      articleData.put(AUTHOR_NAME, StringUtils.EMPTY);
      articleData.put(AUTHOR_BODY, StringUtils.EMPTY);
    }
  }

  /**
   * Sets the article publish date.
   *
   * @param articleContent
   *          the new article publish date
   * @throws LoginException
   *           the login exception
   * @throws RepositoryException
   *           the repository exception
   */
  private void setArticlePublishDate(final ValueMap articleContent)
      throws LoginException, RepositoryException {
    String articlePublishedDate = StringUtils.EMPTY;
    String pageLocaleDefault = StringUtils.EMPTY;

    try {
      final String locale = configService.getConfigValues("pageLocale", currentPage.getPath());
      if (null != locale && locale.length() > 0) {    	
    	  pageLocaleDefault = locale.contains("-") ? locale.split("-")[ 0 ] : locale.split("_")[0];
       }
      
      LOGGER.debug("Locale is {}", pageLocaleDefault);
      if (articleContent.containsKey(ARTICLE_PUBLISHED_DATE)) {
        LOGGER.debug("formatting date to {}",
            configService.getConfigValues("articleDateFormat", currentPage.getPath()));
        LOGGER.debug("Before adding locale");
        final SimpleDateFormat formatter = new SimpleDateFormat(
            configService.getConfigValues("articleDateFormat", currentPage.getPath()),
            new Locale(pageLocaleDefault));
        LOGGER.debug("after adding locale");
        articlePublishedDate = formatter.format(((GregorianCalendar) articleContent
            .getOrDefault(ARTICLE_PUBLISHED_DATE, new GregorianCalendar())).getTime());
        LOGGER.debug("After date formatting");
      }
      articleData.put(ARTICLE_PUBLISHED_DATE, articlePublishedDate);
    } catch (RepositoryException | org.apache.sling.api.resource.LoginException e) {
      LOGGER.error("Error ::ArticleModel :: Article published date :: Exception :: {}", e);
    }
  }
}
