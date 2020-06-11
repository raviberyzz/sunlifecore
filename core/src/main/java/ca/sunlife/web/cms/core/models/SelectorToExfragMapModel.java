/*
 *
 */

package ca.sunlife.web.cms.core.models;

import java.util.Collection;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;
import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * The Class SelectorToExfragMapModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = { SlingHttpServletRequest.class,
    Resource.class }, resourceType = "sunlife/core/components/content/recommended-products-article", defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SelectorToExfragMapModel {

  /** The items. */
  @ Inject
  @ Via ("resource")
  private List <SelectorExFragMap> items;

  /** The request. */
  @ Self (injectionStrategy = InjectionStrategy.REQUIRED)
  private SlingHttpServletRequest request;

  /** The frag path. */
  private String fragPath;
  
  /** The modified fragment path. */
  private String modifiedFragmentPath;
  
  /** The config service. */
  @ Inject
  private SiteConfigService configService;
  
  /** The current page. */
  @ ScriptVariable
  private Page currentPage;

 
  /** The Constant LOGGER. */
  private static final Logger LOGGER = LoggerFactory.getLogger(SelectorToExfragMapModel.class);

  /**
   * Gets the items.
   *
   * @return the items
   */
  public Collection <SelectorExFragMap> getItems() {
    return null != items ? Collections.unmodifiableCollection(items) : null;
  }

  /**
   * Gets the frag path.
   *
   * @return the frag path
   */
  public String getFragPath() {
    return fragPath;
  }

  /**
   * Sets the frag path.
   *
   * @param fragPath
   *          the new frag path
   */
  public void setFragPath(final String fragPath) {
    this.fragPath = fragPath;
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
	  
    String[] selectors = request.getRequestPathInfo().getSelectors();
    if (selectors.length == 0 || null == items) {
    	LOGGER.debug("Either there are no selectors or the component is not not configured");
    	return;
    }
    if (selectors.length > 0 && !getItems().isEmpty()) {
    	 LOGGER.debug("No of entries {}", getItems().size());
      final Iterator <SelectorExFragMap> itemIterator = items.iterator();
      while (itemIterator.hasNext()) {
        final SelectorExFragMap item = itemIterator.next();
        if (item.getSelector().equals(selectors [ 0 ])) {
          fragPath = item.getExfragPath();
          LOGGER.debug("fragPath is : ", fragPath);
          //Code for language toggle of experience fragment - starts
          String headerPath = "";
          String fragmentSplit = "";
          try {
              if (null == fragPath) {
                return;
              } else if (currentPage.getPath().contains("/content/experience-fragments")) {
                modifiedFragmentPath = fragPath;
              } else {
            	  if (fragPath.contains("header") || fragPath.contains("footer")|| fragPath.contains("breadcrumb")) {
            		  LOGGER.debug("fragPath  contains header or footer or breadcrumb::::");
		              headerPath = configService.getConfigValues("experienceFragmentPath",
		                  currentPage.getPath());
		              LOGGER.debug("Header path is : {}", headerPath);
		              if (null != headerPath && headerPath.length() > 0) {
		                final String [ ] pathSplit = fragPath.split("/");
		                for (final String element : pathSplit) {
		                  if (element.contains("header") || element.contains("footer")|| element.contains("breadcrumb")) {		                	  
		                    fragmentSplit = "/" + element + "/";
		                    break;
		                  }
		                }
		                final String [ ] finalSplit = fragPath.split(fragmentSplit);
		                modifiedFragmentPath = headerPath + fragmentSplit + finalSplit [ 1 ];
		                LOGGER.debug("modifiedFragmentPath : "+modifiedFragmentPath);
		              } else {
		                modifiedFragmentPath = fragPath;
		              }
		            }
		            else {
		              modifiedFragmentPath = fragPath;
		            }
              	}
          } catch (RepositoryException | org.apache.sling.api.resource.LoginException e) {
            LOGGER.error("Error :: init method of Experience fragment model :: {}", e);
        }
          
          //Code for language toggle of experience fragment - ends
      }
    }
  }
 }
}
