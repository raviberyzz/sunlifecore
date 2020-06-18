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
import javax.jcr.RepositoryException;

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
import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * The Class NewsroomAnnouncementModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = { SlingHttpServletRequest.class,
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, adapters = NewsroomAnnouncementModel.class, resourceType = "sunlife/apac/hk/components/content/newsroom-article")
public class NewsroomAnnouncementModel {

  /** The Constant ARTICLE_PUBLISHED_DATE. */
  private static final String ARTICLE_PUBLISHED_DATE = "articlePublishedDate";

  /** The Constant NEWSROOM_PAGE_PATH. */
  private static final String NEWSROOM_PAGE_PATH = "newsroomPagePath";

  /** The Constant NEWSROOM_CONTENT. */
  private static final String NEWSROOM_CONTENT = "newsroomContent";

  /** The Constant JCR_CONTENT_DATA_MASTER. */
  private static final String JCR_CONTENT_DATA_MASTER = "/jcr:content/data/master";

  /** The Constant NEWSROOM_HEADING. */
  private static final String NEWSROOM_HEADING = "newsroomHeading";

  /** The Constant logger. */
  private static final Logger logger = LoggerFactory.getLogger(NewsroomAnnouncementModel.class);

  /** The fragment path. */
  @ Inject
  @ Via ("resource")
  private String fragmentPath;

  /** The resolver. */
  @ ScriptVariable
  private ResourceResolver resolver;

  /** The checkbox hide date. */
  @ Inject
  @ Via ("resource")
  private String checkboxHideDate;

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
   * Inits the.
   */
  @ PostConstruct
  public void init() {
    if (StringUtils.isEmpty(getFragmentPath())) {
      return;
    }
    try {
      final ResourceResolver resourceResolver = coreResourceResolver.getResourceResolver();
      logger.debug("Reading content fragment {}", getFragmentPath() + JCR_CONTENT_DATA_MASTER);
      final Resource articleResource = resourceResolver
          .getResource(getFragmentPath().concat(JCR_CONTENT_DATA_MASTER));
      if (null != articleResource) {
        logger.debug("Parsing Article Data");
        final ValueMap articleContent = articleResource.getValueMap();
        articleData.put(NEWSROOM_HEADING,
            articleContent.containsKey(NEWSROOM_HEADING)
                ? articleContent.get(NEWSROOM_HEADING, String.class)
                : StringUtils.EMPTY);
        articleData.put(NEWSROOM_CONTENT,
            articleContent.containsKey(NEWSROOM_CONTENT)
                ? articleContent.get(NEWSROOM_CONTENT, String.class)
                : StringUtils.EMPTY);
        articleData.put(NEWSROOM_PAGE_PATH,
            articleContent.containsKey(NEWSROOM_PAGE_PATH)
                ? articleContent.get(NEWSROOM_PAGE_PATH, String.class)
                : StringUtils.EMPTY);
        setArticlePublishDate(articleContent);
      }
      logger.debug("Article Data {}", articleData);
      resourceResolver.close();
    } catch (LoginException | RepositoryException e) {
      logger.error("Login Error while getting resource resolver : {}", e);
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
    final String locale = configService.getConfigValues("pageLocale", currentPage.getPath());
    if (null != locale && locale.length() > 0) {    	
  	  pageLocaleDefault = locale.contains("-") ? locale.split("-")[ 0 ] : locale.split("_")[0];
     }
    logger.debug("Locale is" + pageLocaleDefault);
    if (articleContent.containsKey(ARTICLE_PUBLISHED_DATE)) {
      logger.debug("formatting date to {}",
          configService.getConfigValues("articleDateFormat", currentPage.getPath()));
      final SimpleDateFormat formatter = new SimpleDateFormat(
          configService.getConfigValues("articleDateFormat", currentPage.getPath()),new Locale(pageLocaleDefault));
      
      articlePublishedDate = formatter.format( ((GregorianCalendar) articleContent
          .getOrDefault(ARTICLE_PUBLISHED_DATE, new GregorianCalendar())).getTime());
      logger.debug("after adding locale {}",articlePublishedDate);
    }
    articleData.put(ARTICLE_PUBLISHED_DATE, articlePublishedDate);
  }
}
