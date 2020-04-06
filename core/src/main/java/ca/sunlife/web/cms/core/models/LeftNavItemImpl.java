package ca.sunlife.web.cms.core.models;

import java.util.Collections;
import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.wcm.core.components.internal.models.v1.PageListItemImpl;
import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.day.cq.wcm.api.Page;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * The Class LeftNavItemImpl.
 *
 * @author mo93 The class LeftNavItemImpl
 */
public class LeftNavItemImpl extends PageListItemImpl implements NavigationItem {

  /** The Constant LOGGER. */
  private static final Logger log = LoggerFactory.getLogger(LeftNavigationModal.class);

  /** The children. */
  /* List for getting the childs of the page */
  protected List <NavigationItem> children = Collections.emptyList();

  /** The level. */
  protected int level; // Level of the page

  /** The active. */
  protected boolean active; // checks whether page is active

  /** The nav title. */
  private final String navTitle; // field to capture the Navigation title from config

  /**
   * Instantiates a new left nav item impl.
   *
   * @param page
   *          the page
   * @param active
   *          the active
   * @param request
   *          the request
   * @param level
   *          the level
   * @param children
   *          the children
   * @param navTitle
   *          the nav title
   */
  public LeftNavItemImpl(final Page page, final boolean active,
      final SlingHttpServletRequest request, final int level, final List <NavigationItem> children,
      final String navTitle) {
    super(request, page);
    this.active = active;
    this.level = level;
    this.children = children;
    this.navTitle = navTitle;
  }

  /*
   * (non-Javadoc)
   * @see com.adobe.cq.wcm.core.components.internal.models.v1.PageListItemImpl#getTitle()
   */
  @ Override
  public String getTitle() {
    String title = page.getNavigationTitle();
    if (title == null) {
      title = page.getPageTitle();
    }
    if (title == null) {
      title = page.getTitle();
    }
    if (title == null) {
      title = page.getName();
    }

    if (null != navTitle && navTitle.contains("${title}")) {
      title = navTitle.replace("${title}", title);
    }

    return title;
  }

  /*
   * (non-Javadoc)
   * @see com.adobe.cq.wcm.core.components.models.NavigationItem#getPage()
   */
  @ Deprecated
  @ Override
  @ JsonIgnore
  public Page getPage() {
    return page;
  }

  /*
   * (non-Javadoc)
   * @see com.adobe.cq.wcm.core.components.models.NavigationItem#isActive()
   */
  @ Override
  public boolean isActive() {
    return active;
  }

  /*
   * (non-Javadoc)
   * @see com.adobe.cq.wcm.core.components.models.NavigationItem#getChildren()
   */
  @ Override
  public List <NavigationItem> getChildren() {
    return children;
  }

  /*
   * (non-Javadoc)
   * @see com.adobe.cq.wcm.core.components.models.NavigationItem#getLevel()
   */
  @ Override
  public int getLevel() {
    return level;
  }

}
