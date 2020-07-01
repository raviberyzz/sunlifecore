/*
 *
 */

package ca.sunlife.web.cms.core.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * The Class ExperienceFragmentModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = { SlingHttpServletRequest.class,
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ExperienceFragmentModel {

  /** The Constant log. */
  private static final Logger LOGGER = LoggerFactory.getLogger(ExperienceFragmentModel.class);

  /** The fragment path. */
  @ Inject
  @ Via ("resource")
  private String fragmentPath;

  /** The config service. */
  @ Inject
  private SiteConfigService configService;

  /** The modified fragment path. */
  private String modifiedFragmentPath;

  /** The current page. */
  @ ScriptVariable
  private Page currentPage;

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
   * Gets the modified fragment path.
   *
   * @return the modified fragment path
   */
  public String getModifiedFragmentPath() {
    return modifiedFragmentPath;
  }

  /**
   * Sets the modified fragment path.
   *
   * @param modifiedFragmentPath
   *          the new modified fragment path
   */
  public void setModifiedFragmentPath(final String modifiedFragmentPath) {
    this.modifiedFragmentPath = modifiedFragmentPath;
  }

  /**
   * Inits the.
   */
  @ PostConstruct
  public void init() {

    String headerPath = "";
    String fragmentSplit = "";

    try {
      if (null == fragmentPath) {
        return;
      } else if (currentPage.getPath().contains("/content/experience-fragments")) {
        modifiedFragmentPath = fragmentPath;
      } else {
        if (fragmentPath.contains("header") || fragmentPath.contains("footer")) {

          headerPath = configService.getConfigValues("experienceFragmentPath",
              currentPage.getPath());
          LOGGER.info("Header path is : {}", headerPath);
          if (null != headerPath && headerPath.length() > 0) {
            final String [ ] pathSplit = fragmentPath.split("/");
            for (final String element : pathSplit) {
              if (element.contains("header") || element.contains("footer")) {
                fragmentSplit = "/" + element + "/";
                break;
              }
            }
            final String [ ] finalSplit = fragmentPath.split(fragmentSplit);
            modifiedFragmentPath = headerPath + fragmentSplit + finalSplit [ 1 ];
          } else {
            modifiedFragmentPath = fragmentPath;
          }
        } else {
          modifiedFragmentPath = fragmentPath;
        }
      }

    } catch (RepositoryException | org.apache.sling.api.resource.LoginException e) {
      LOGGER.error("Error :: init method of Experience fragment model :: {}", e);
    }
  }

}
