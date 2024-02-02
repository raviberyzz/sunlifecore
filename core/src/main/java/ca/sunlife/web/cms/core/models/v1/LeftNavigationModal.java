/*
 *
 */

package ca.sunlife.web.cms.core.models.v1;

import ca.sunlife.web.cms.core.models.LeftNavItemImpl;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import com.adobe.cq.wcm.core.components.commons.link.LinkManager;
import com.adobe.cq.wcm.core.components.internal.models.v1.NavigationImpl;
import com.adobe.cq.wcm.core.components.internal.models.v1.NavigationItemImpl;
import com.adobe.cq.wcm.core.components.internal.models.v2.PageImpl;
import com.adobe.cq.wcm.core.components.models.Navigation;
import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.day.cq.wcm.api.*;
import com.day.cq.wcm.api.components.Component;
import com.day.cq.wcm.api.designer.Style;
import com.day.cq.wcm.msm.api.LiveRelationship;
import com.day.cq.wcm.msm.api.LiveRelationshipManager;
import com.drew.lang.annotations.Nullable;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.*;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.*;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.RangeIterator;
import javax.jcr.RepositoryException;
import java.util.*;

@ Model (adaptables = SlingHttpServletRequest.class, adapters = LeftNavigationModal.class, resourceType = LeftNavigationModal.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class LeftNavigationModal implements Navigation {

  /** The Constant RESOURCE_TYPE. */
  public static final String RESOURCE_TYPE = "sunlife/core/components/content/core-left-navigation/v1/left-navigation";

  /** The Constant log. */
  private static final Logger LOGGER = LoggerFactory.getLogger(LeftNavigationModal.class);

  /** The request. */
  @ Self
  private SlingHttpServletRequest request;

  /** The resource resolver. */
  @ SlingObject
  private ResourceResolver resourceResolver;

  /** The current page. */
  @ ScriptVariable
  private Page currentPage;

  /** The properties. */
  @ ScriptVariable
  private ValueMap properties;

  /** The current style. */
  @ ScriptVariable
  private Style currentStyle;

  /** The language manager. */
  @ OSGiService
  private LanguageManager languageManager;

  /** The relationship manager. */
  @ OSGiService
  private LiveRelationshipManager relationshipManager;

  /** The accessibility label. */
  @ ValueMapValue (injectionStrategy = InjectionStrategy.OPTIONAL)
  @Getter
  private String accessibilityLabel;

  /** The config service. */
  @ Inject
  private SiteConfigService configService;


  /** The structure depth. */
  private int structureDepth;

  /** The navigation root page. */
  private String navigationRootPage;

  /** The items. */
  private List <NavigationItem> items;

  private static final String ITEM_ID_PREFIX = "item";

  /** The structure start. */
  private int structureStart;

  /** The Skip navigation root */
  @Getter
  @Setter
  private boolean skipNavigationRoot;

  /** The updated list. */
  private List <NavigationItem> updatedList = new ArrayList <>();

  /** The constant for skip nav root. */
  private final static String PN_SKIP_NAVIGATION_ROOT_CONSTANT = "skipNavigationRoot";

  @ Self
  private LinkManager linkManager;

  @ScriptVariable
  @Nullable
  protected Component component;

  /**
   * Gets the updated list.
   *
   * @return the updated list
   */
  public List <NavigationItem> getUpdatedList() {
    return Collections.unmodifiableList(updatedList);
  }

  /**
   * Sets the updated list.
   *
   * @param updatedList
   *          the new updated list
   */
  public void setUpdatedList(final List <NavigationItem> updatedList) {
    this.updatedList = Collections.unmodifiableList(updatedList);
  }

  /**
   * Inits the model.
   */
  @ PostConstruct
  private void initModel() {

    /*
     * As per sunlife requirements leftnavigation should be autopopulated and it should not be read
     * from dialog So the value of structuredepth, Navigation root page and structure start is
     * hardcoded in the code
     */

    final int pageDepth = currentPage.getDepth();
    final int m = pageDepth - 6;
    final Page page = currentPage.getParent(m);

    structureDepth = properties.get(PN_STRUCTURE_DEPTH, currentStyle.get(PN_STRUCTURE_DEPTH, -1));
    boolean collectAllPages = properties.get(PN_COLLECT_ALL_PAGES, currentStyle.get(PN_COLLECT_ALL_PAGES, true));
    if (collectAllPages) {
      structureDepth = -1;
    }
    navigationRootPage = properties.get(PN_NAVIGATION_ROOT, String.class);
    if (currentStyle.containsKey(PN_STRUCTURE_START) || properties.containsKey(PN_STRUCTURE_START)) {
      //workaround to maintain the content of Navigation component of users in case they update to the current i.e. the `structureStart` version.
      structureStart = properties.get(PN_STRUCTURE_START, currentStyle.get(PN_STRUCTURE_START, 1));
    } else {
      skipNavigationRoot = properties.get(PN_SKIP_NAVIGATION_ROOT_CONSTANT, currentStyle.get(PN_SKIP_NAVIGATION_ROOT_CONSTANT, true));
      if (skipNavigationRoot) {
        structureStart = 1;
      } else {
        structureStart = 0;
      }
    }

    if(!(navigationRootPage != null && navigationRootPage.length() > 0) ) {
      structureDepth = 2;
      navigationRootPage = page.getPath();
      structureStart = 0;
    }

    updatedList = processNavigationList(getItems());

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
      title = configService.getConfigValues("navigationOverview", currentPage.getPath());
    } catch (RepositoryException | LoginException e) {
      LOGGER.error("Error :: init method of Left Navigation Model :: {}", e);
    }

    Page parentPage;
    final List <NavigationItem> children1 = new ArrayList <>();
    for (final NavigationItem navigationItem : navigationItems) {

      if (! navigationItem.getChildren().isEmpty()) {
        parentPage = currentPage.getPageManager().getPage(navigationItem.getPath());
        final boolean isSelected = currentPage.equals(parentPage)
                || currentPageIsRedirectTarget(parentPage);
        final LeftNavItemImpl leftItemImpl = new LeftNavItemImpl(parentPage, isSelected, request,
                navigationItem.getLevel() + 1, children1, title,linkManager, component);
        navigationItem.getChildren().add(0, leftItemImpl);
      }
      processNavigationList(navigationItem.getChildren());
    }
    return Collections.unmodifiableList(items);
  }

  /*
   * (non-Javadoc)
   * @see com.adobe.cq.wcm.core.components.internal.models.v1.NavigationImpl#getItems()
   */
  @ Override
  public List <NavigationItem> getItems() {
    if (items == null) {
      final PageManager pageManager = currentPage.getPageManager();
      final Page rootPage = pageManager.getPage(navigationRootPage);
      if (rootPage != null) {
        NavigationRoot navigationRoot = new NavigationRoot(rootPage, structureDepth);
        final Page navigationRootLanguageRoot = navigationRoot.getPageResource()
                .map(languageManager::getLanguageRoot).orElse(null);
        final Page currentPageLanguageRoot = languageManager
                .getLanguageRoot(currentPage.getContentResource());
        RangeIterator liveCopiesIterator = null;
        try {
          liveCopiesIterator = relationshipManager
                  .getLiveRelationships(navigationRoot.page.adaptTo(Resource.class), null, null);
        } catch (final WCMException e) {
          // ignore it
        }
        if (navigationRootLanguageRoot != null && currentPageLanguageRoot != null
                && ! navigationRootLanguageRoot.equals(currentPageLanguageRoot)) {
          // check if there's a language copy of the navigation root
          final Page languageCopyNavigationRoot = pageManager
                  .getPage(ResourceUtil.normalize(currentPageLanguageRoot.getPath() + "/"
                          + getRelativePath(navigationRootLanguageRoot, navigationRoot.page)));
          if (languageCopyNavigationRoot != null) {
            navigationRoot = new NavigationRoot(languageCopyNavigationRoot, structureDepth);
          }
        } else if (liveCopiesIterator != null) {
          while (liveCopiesIterator.hasNext()) {
            final LiveRelationship relationship = (LiveRelationship) liveCopiesIterator.next();
            if (currentPage.getPath().startsWith(relationship.getTargetPath() + "/")) {
              final Page liveCopyNavigationRoot = pageManager.getPage(relationship.getTargetPath());
              if (liveCopyNavigationRoot != null) {
                navigationRoot = new NavigationRoot(liveCopyNavigationRoot, structureDepth);
                break;
              }
            }
          }
        }
        items = getNavigationTree(navigationRoot);
      } else {
        items = Collections.emptyList();
      }
    }
    return Collections.unmodifiableList(items);
  }


  /*
   * (non-Javadoc)
   * @see com.adobe.cq.wcm.core.components.internal.models.v1.NavigationImpl#getExportedType()
   */
  @ Override
  public String getExportedType() {
    return request.getResource().getResourceType();
  }

  /**
   * Gets the items.
   *
   * @param navigationRoot
   *          the navigation root
   * @param subtreeRoot
   *          the subtree root
   * @return the items
   */
  private List <NavigationItem> getItems(final NavigationRoot navigationRoot,
                                         final Page subtreeRoot) {
    final List <NavigationItem> pages = new ArrayList <>();
    if (navigationRoot.structureDepth == - 1
            || getLevel(subtreeRoot) < navigationRoot.structureDepth) {
      final Iterator <Page> it = subtreeRoot.listChildren(new PageFilter());
      while (it.hasNext()) {
        final Page page = it.next();
        final int pageLevel = getLevel(page);
        int level = pageLevel - navigationRoot.startLevel - 1;
        final List <NavigationItem> children = getItems(navigationRoot, page);
        final boolean isSelected = checkSelected(page);
        final boolean isCurrent = checkCurrent(page);
        if (structureStart == 0) {
          level = level + 1;
        }
        pages.add(new NavigationItemImpl(page, isSelected, isCurrent, linkManager, level, children,getId(), component));
      }
    }
    return pages;
  }

  /**
   * Gets the navigation tree.
   *
   * @param navigationRoot
   *          the navigation root
   * @return the navigation tree
   */
  private List <NavigationItem> getNavigationTree(final NavigationRoot navigationRoot) {
    List <NavigationItem> itemTree = new ArrayList <>();
    final Iterator <NavigationRoot> it = getRootItems(navigationRoot, structureStart).iterator();
    while (it.hasNext()) {
      final NavigationRoot item = it.next();
      itemTree.addAll(getItems(item, item.page));
    }
    if (structureStart == 0) {
      final boolean isSelected = checkSelected(navigationRoot.page);
      final boolean isCurrent = checkCurrent(navigationRoot.page);
      final NavigationItemImpl root = new NavigationItemImpl(navigationRoot.page, isSelected, isCurrent, linkManager, 0, itemTree,getId(), component);
      itemTree = new ArrayList <>();
      itemTree.add(root);
    }
    return itemTree;
  }

  /**
   * Gets the root items.
   *
   * @param navigationRoot
   *          the navigation root
   * @param structureStartVar
   *          the structure start
   * @return the root items
   */
  private List <NavigationRoot> getRootItems(final NavigationRoot navigationRoot,
                                             final int structureStartVar) {
    final LinkedList <NavigationRoot> pages = new LinkedList <>();
    pages.addLast(navigationRoot);
    if (structureStartVar != 0) {
      int level = 1;
      while (level != structureStartVar && ! pages.isEmpty()) {
        int size = pages.size();
        while (size > 0) {
          final NavigationRoot item = pages.removeFirst();
          final Iterator <Page> it = item.page.listChildren(new PageFilter());
          while (it.hasNext()) {
            pages.addLast(new NavigationRoot(it.next(), structureDepth));
          }
          size = size - 1;
        }
        level = level + 1;
      }
    }
    return pages;
  }

  /**
   * Check selected.
   *
   * @param page
   *          the page
   * @return true, if successful
   */
  private boolean checkSelected(final Page page) {
    return currentPage.equals(page) || currentPage.getPath().startsWith(page.getPath() + "/")
            || currentPageIsRedirectTarget(page);
  }

  private boolean checkCurrent(final Page page) {
    return this.currentPage.equals(page)
            || currentPageIsRedirectTarget(page);
  }
  /**
   * Current page is redirect target.
   *
   * @param page
   *          the page
   * @return true, if successful
   */
  private boolean currentPageIsRedirectTarget(final Page page) {
    boolean currentPageIsRedirectTarget = false;
    final Resource contentResource = page.getContentResource();
    if (contentResource != null) {
      final ValueMap valueMap = contentResource.getValueMap();
      final String redirectTarget = valueMap.get(PageImpl.PN_REDIRECT_TARGET, String.class);
      if (StringUtils.isNotBlank(redirectTarget)) {
        final PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
        if (pageManager != null) {
          final Page redirectPage = pageManager.getPage(redirectTarget);
          if (currentPage.equals(redirectPage)) {
            currentPageIsRedirectTarget = true;
          }
        }
      }
    }
    return currentPageIsRedirectTarget;
  }

  /**
   * Gets the level.
   *
   * @param page
   *          the page
   * @return the level
   */
  private int getLevel(final Page page) {
    return StringUtils.countMatches(page.getPath(), "/") - 1;
  }

  /**
   * Gets the relative path.
   *
   * @param root
   *          the root
   * @param child
   *          the child
   * @return the relative path
   */
  private String getRelativePath(final Page root, final Page child) {
    if (child.equals(root)) {
      return ".";
    } else if ((child.getPath() + "/").startsWith(root.getPath())) {
      return child.getPath().substring(root.getPath().length() + 1);
    }
    return null;
  }

  /**
   * The Class NavigationRoot.
   *
   * @author TCS
   * @version 1.0
   */
  private final class NavigationRoot {

    /** The page. */
    private final Page page;

    /** The start level. */
    private int startLevel;

    /** The structure depth. */
    private int structureDepth = - 1;

    /**
     * Instantiates a new navigation root.
     *
     * @param navigationRoot
     *          the navigation root
     * @param configuredStructureDepth
     *          the configured structure depth
     */
    private NavigationRoot(final Page navigationRoot, final int configuredStructureDepth) {
      page = navigationRoot;
      startLevel = getLevel(navigationRoot);
      if (configuredStructureDepth > - 1) {
        structureDepth = configuredStructureDepth + startLevel;
      }
    }

    /**
     * Gets the page resource.
     *
     * @return the page resource
     */

    final Optional <Resource> getPageResource() {
      return Optional.ofNullable(Optional.of(page)
              // get the parent of the content resource
              .map(Page::getContentResource).map(Resource::getParent)
              // if content resource is missing, resolve resource at page path
              .orElseGet(() -> resourceResolver.getResource(page.getPath())));
    }
  }

}