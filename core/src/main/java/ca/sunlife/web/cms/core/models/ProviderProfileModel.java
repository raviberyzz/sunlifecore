/*
 *
 */

package ca.sunlife.web.cms.core.models;

import java.io.IOException;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.constants.ProviderProfileConstants;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.ProviderProfileService;
import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * The Class ProviderProfileModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = { SlingHttpServletRequest.class,
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ProviderProfileModel {

  /** The Constant LOGGER. */
  private static final Logger LOGGER = LoggerFactory.getLogger(ArticleModel.class);

  /** The fragment path. */
  @ Inject
  @ Via ("resource")
  private String fragmentPath;

  /** The request. */
  @ Self
  private SlingHttpServletRequest request;

  /** The current page. */
  @ Inject
  private Page currentPage;

  /** The core resource resolver. */
  @ Inject
  private CoreResourceResolver coreResourceResolver;

  /** The config service. */
  @ Inject
  private SiteConfigService configService;

  /** The provider profile service. */
  @ Inject
  private ProviderProfileService providerProfileService;

  /** The Constant JCR_CONTENT_DATA_MASTER. */
  private static final String JCR_CONTENT_DATA_MASTER = "/jcr:content/data/master";

  /** The profile HTML. */
  private String profileHTML;

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
   * Gets the profile HTML.
   *
   * @return the profile HTML
   */
  public String getProfileHTML() {
    return profileHTML;
  }

  /**
   * Sets the profile HTML.
   *
   * @param profileHTML
   *          the new profile HTML
   */
  public void setProfileHTML(final String profileHTML) {
    this.profileHTML = profileHTML;
  }

  /**
   * Inits the.
   */
  @ PostConstruct
  public void init() {
    LOGGER.debug("Entry :: ProviderProfileModel :: init :: fragmentPath :: {}", fragmentPath);
    if (null == fragmentPath) {
      LOGGER.info("ProviderProfileModel :: fragment path is null, please configure it.");
      return;
    }
    try {
      final ResourceResolver resourceResolver = coreResourceResolver.getResourceResolver();
      final Resource providerProfileResource = resourceResolver
          .getResource(fragmentPath.concat(JCR_CONTENT_DATA_MASTER));
      if (null != providerProfileResource) {
        final String locale = configService.getConfigValues("pageLocale", currentPage.getPath());
        LOGGER.debug("pageLocale is {}", locale);
        String pageNo = request.getParameter(ProviderProfileConstants.WEB_PARAM_CONSTANT);
        if (null != pageNo && pageNo.length() > 0) {
        	final ValueMap providerProfileContent = providerProfileResource.getValueMap();
          profileHTML = providerProfileService.getProviderProfile(locale,
              request.getParameter(ProviderProfileConstants.WEB_PARAM_CONSTANT),
              providerProfileContent.get(ProviderProfileConstants.FRAGMENT_VAR_CONSTANT,
                  String.class));
        }
      }
      LOGGER.debug("profileHTML :: {}", profileHTML);
    } catch (LoginException | RepositoryException | ApplicationException | SystemException
        | IOException e) {
      LOGGER.error("Error :: ProviderProfileModel :: init :: error :: {}", e);
    }

  }
}
