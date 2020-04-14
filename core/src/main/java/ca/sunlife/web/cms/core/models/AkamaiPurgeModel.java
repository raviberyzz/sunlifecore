package ca.sunlife.web.cms.core.models;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.Node;
import javax.jcr.RepositoryException;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ca.sunlife.web.cms.core.exception.ApplicationException;

/**
 * The Class AkamaiPurgeModel.
 */
@ Model (adaptables = { SlingHttpServletRequest.class,
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, adapters = AkamaiPurgeModel.class, resourceType = "sunlife/core/components/config/akamai-purge")
public class AkamaiPurgeModel {

  /** The paths. */
  @ Inject
  @ Via ("resource")
  private String [ ] paths;

  /** The resource. */
  @ Inject
  private Resource resource;

  /** The akamai cache clear. */
  @ Inject
  private ca.sunlife.web.cms.core.services.AkamaiCacheClear akamaiCacheClear;

  /** The akamai response. */
  private String akamaiResponse;

  /** The Constant LOG. */
  private static final Logger LOG = LoggerFactory.getLogger(AkamaiPurgeModel.class);

  /**
   * Gets the akamai response.
   *
   * @return the akamaiResponse
   */
  public final String getAkamaiResponse() {
    return akamaiResponse;
  }

  /**
   * Sets the akamai response.
   *
   * @param akamaiResponse
   *          the akamaiResponse to set
   */
  public final void setAkamaiResponse(final String akamaiResponse) {
    this.akamaiResponse = akamaiResponse;
  }

  /**
  * @return the paths
  */
  public String[] getPaths() {
	return null != paths ? Arrays.copyOf(paths, paths.length) : new String[0];
  }

  /**
  * @param paths the paths to set
  */
  public void setPaths(String[] paths) {
	this.paths = null != paths ? paths.clone() : null;
  }

  /**
  * @return the akamaiCacheClear
  */
  public ca.sunlife.web.cms.core.services.AkamaiCacheClear getAkamaiCacheClear() {
	return akamaiCacheClear;
  }

  /**
  * @param akamaiCacheClear the akamaiCacheClear to set
  */
  public void setAkamaiCacheClear(ca.sunlife.web.cms.core.services.AkamaiCacheClear akamaiCacheClear) {
	this.akamaiCacheClear = akamaiCacheClear;
  }

  /**
   * Inits the model.
   */
  @ PostConstruct
  public void init() {
    if (null == paths || paths.length < 1) {
      LOG.debug("Exiting the model as no paths set");
      return;
    }
    final List <String> damPaths = new ArrayList <>();
    final List <String> pagePaths = new ArrayList <>();
    for (final String path : paths) {
      if (path.startsWith("/content/dam")) {
        damPaths.add(path);
      } else {
        pagePaths.add(path);
      }
    }
    setAkamaiResponse(StringUtils.EMPTY);
    if (! damPaths.isEmpty()) {
      try {
        LOG.debug("Clearing akamai cache for {} ", damPaths);
        setAkamaiResponse("<pre>"
            + akamaiCacheClear.invalidateAssets(damPaths.toArray(new String [ damPaths.size() ]))
            + "</pre>");
      } catch (final ApplicationException e) {
        setAkamaiResponse("<p style='color:red'>Unable to process below paths ");
        damPaths.forEach(path -> {
          setAkamaiResponse(getAkamaiResponse().concat("<br />" + path));
        });
        setAkamaiResponse(getAkamaiResponse().concat("</p>"));
      }
    }
    if (! pagePaths.isEmpty()) {
      try {
        LOG.debug("Clearing akamai cache for {} ", pagePaths);
        setAkamaiResponse(getAkamaiResponse().concat(
            akamaiCacheClear.invalidatePages(pagePaths.toArray(new String [ pagePaths.size() ]))));
      } catch (final ApplicationException e) {
        setAkamaiResponse("<p style='color:red'>Unable to process below pages ");
        pagePaths.forEach(path -> {
          setAkamaiResponse(getAkamaiResponse().concat("<br />" + path));
        });
        setAkamaiResponse(getAkamaiResponse().concat("</p>"));
      }
    }
    try {
      final Node n = resource.adaptTo(Node.class);
      if (null != n && null != n.getProperty("paths")) {
        n.getProperty("paths").remove();
      }
      resource.getResourceResolver().commit();
    } catch (PersistenceException | RepositoryException e) {
      LOG.error("Error while saving the data {}", e);
    }
  }

}
