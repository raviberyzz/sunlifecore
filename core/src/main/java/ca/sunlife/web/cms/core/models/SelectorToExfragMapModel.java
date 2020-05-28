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

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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

  /** The ready to display. */
  private boolean readyToDisplay;

  /** The Constant LOGGER. */
  private static final Logger LOGGER = LoggerFactory.getLogger(SelectorToExfragMapModel.class);

  /**
   * Gets the items.
   *
   * @return the items
   */
  public Collection <SelectorExFragMap> getItems() {
    return Collections.unmodifiableCollection(items);
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
   * Checks if is ready to display.
   *
   * @return true, if is ready to display
   */
  public boolean isReadyToDisplay() {
	return readyToDisplay;
  }

  /**
   * Sets the ready to display.
   *
   * @param readyToDisplay the new ready to display
   */
  public void setReadyToDisplay(boolean readyToDisplay) {
	this.readyToDisplay = readyToDisplay;
  }

/**
   * Inits the.
   */
  @ PostConstruct
  public void init() {
    String[] selectors = request.getRequestPathInfo().getSelectors();
    readyToDisplay = false;
    LOGGER.debug("Selectors in the page {}", selectors.length);
    if (selectors.length == 0 || getItems()==null || getItems().isEmpty()) {
    	LOGGER.debug("Not ready");
    	return;
    }
    if (selectors.length > 0 && ! getItems().isEmpty()) {
    	readyToDisplay = true;
    	 LOGGER.debug("No of entries {}", getItems().size());
      final Iterator <SelectorExFragMap> itemIterator = items.iterator();
      while (itemIterator.hasNext()) {
        final SelectorExFragMap item = itemIterator.next();
        if (item.getSelector().equals(selectors [ 0 ])) {
          fragPath = item.getExfragPath();
        }
      }
    }
  }
}
