/**
 *
 */

package ca.sunlife.web.cms.core.models;

import java.io.IOException;
import java.text.ParseException;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.beans.NewsDetails;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.services.CNWNewsService;
import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * The Class CNWNewsDetailsModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = { SlingHttpServletRequest.class,
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CNWNewsDetailsModel {

  /** The logger. */
  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  /** The request. */
  @ Self
  private SlingHttpServletRequest request;

  /** The current page. */
  @ Inject
  private Page currentPage;

  /** The news service. */
  @ Inject
  private CNWNewsService newsService;

  /** The news details. */
  private NewsDetails newsDetails;

  /** The config service. */
  @ Inject
  private SiteConfigService configService;

  /** The release id. */
  private String releaseId;

  /**
   * Inits the.
   * CNWNewsDetailsModel - init method for processing the data.
   */
  @ PostConstruct
  public void init() {
    logger.debug("Entry :: CNWNewsDetailsModel :: init ");
    String pageLocaleDefault = null;
    try {
      final String locale = configService.getConfigValues("pageLocale", currentPage.getPath());
      releaseId = request.getRequestPathInfo().getSelectors() [ 0 ];
      if (null != locale && locale.length() > 0) {
        pageLocaleDefault = locale.split("_") [ 0 ];
      }
      newsDetails = newsService.getCNWNewsDetails(releaseId, pageLocaleDefault);
    } catch (IOException | ParseException | ApplicationException | SystemException | LoginException
        | RepositoryException e) {
      logger.error("Error :: CNWNewsDetailsModel :: init :: Exception :: {}", e);
    }
  }

  /**
   * Gets the news details.
   *
   * @return the news details
   */
  public NewsDetails getNewsDetails() {
    return newsDetails;
  }

  /**
   * Sets the news details.
   *
   * @param newsDetails
   *          the new news details
   */
  public void setNewsDetails(final NewsDetails newsDetails) {
    this.newsDetails = newsDetails;
  }

  /**
   * Gets the release id.
   *
   * @return the release id
   */
  public String getReleaseId() {
    return releaseId;
  }

  /**
   * Sets the release id.
   *
   * @param releaseId
   *          the new release id
   */
  public void setReleaseId(final String releaseId) {
    this.releaseId = releaseId;
  }

}
