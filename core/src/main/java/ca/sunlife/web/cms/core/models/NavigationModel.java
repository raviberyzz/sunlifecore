/*
 *
 */

package ca.sunlife.web.cms.core.models;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.wcm.core.components.internal.models.v1.NavigationImpl;
import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * The Class NavigationModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = SlingHttpServletRequest.class, adapters = NavigationModel.class, resourceType = "sunlife/core/components/content/navigation")
public class NavigationModel extends NavigationImpl {

  /**
   * Instantiates a new navigation model.
   */
  public NavigationModel() {
    super();
  }

  /** The Constant log. */
  private static final Logger LOGGER = LoggerFactory.getLogger(NavigationModel.class);

  /** The current page. */
  @ ScriptVariable
  private Page currentPage;

  /** The config service. */
  @ Inject
  private SiteConfigService configService;

  /** The request. */
  @ Self
  private SlingHttpServletRequest request;

  /** The modified items. */
  /* Field to collect the modified items */
  private Collection <NavigationItem> modifiedItems;

  /**
   * Gets the modified items.
   *
   * @return the modified items
   */
  public Collection <NavigationItem> getModifiedItems() {
    return Collections.unmodifiableCollection(modifiedItems);
  }

  /**
   * Sets the updated list.
   *
   * @param modifiedItemList
   *          the new updated list
   */
  public void setUpdatedList(Collection <NavigationItem> modifiedItemList) {
    this.modifiedItems = Collections.unmodifiableCollection(modifiedItemList);
  }

  /**
   * Inits the.
   */
  @ PostConstruct
  private void init() {

    this.modifiedItems = processNavigationList(super.getItems());

  }

  /*
   * Method to iterate the navigation results and add the overview to the pages at each level
   */

  /**
   * Process navigation list.
   *
   * @param navigationItems
   *          the navigation items
   * @return the list
   */
  public List <NavigationItem> processNavigationList(final List <NavigationItem> navigationItems) {

    String title = null;
    try {
    	String expPath = currentPage.getPath();
    	if (null != expPath && expPath.length() > 0 && expPath.contains("experience-fragments")) {
    	expPath = expPath.replace("/experience-fragments", "");
    	expPath = expPath.substring(0, expPath.indexOf("/header"));
    	}
    	
      title = configService.getConfigValues("navigationOverview", expPath);
    } catch (RepositoryException | LoginException e) {
      LOGGER.error("Error :: init method of Left Navigation Model :: {}", e);
    }

    Page parentPage;
    final List <NavigationItem> itemChildren = new ArrayList <>();
    for (final NavigationItem navigationItem : navigationItems) {

      if (! navigationItem.getChildren().isEmpty()) {
        parentPage = currentPage.getPageManager().getPage(navigationItem.getPath());
        final LeftNavItemImpl leftItemImpl = new LeftNavItemImpl(parentPage, false, request,
            navigationItem.getLevel() + 1, itemChildren, title);
        navigationItem.getChildren().add(0, leftItemImpl);

      }
      processNavigationList(navigationItem.getChildren());
    }
    return Collections.unmodifiableList(navigationItems);
  }
}
