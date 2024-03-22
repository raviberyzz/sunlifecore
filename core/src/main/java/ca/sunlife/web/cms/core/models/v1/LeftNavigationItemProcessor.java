package ca.sunlife.web.cms.core.models.v1;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import javax.jcr.RepositoryException;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.wcm.core.components.commons.link.LinkManager;
import com.adobe.cq.wcm.core.components.internal.models.v1.NavigationItemImpl;
import com.adobe.cq.wcm.core.components.internal.models.v2.PageImpl;
import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageFilter;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.components.Component;

import ca.sunlife.web.cms.core.models.LeftNavItemImpl;

import ca.sunlife.web.cms.core.services.SiteConfigService;

public class LeftNavigationItemProcessor {

	/** The Constant log. */
	private static final Logger LOGGER = LoggerFactory.getLogger(LeftNavigationItemProcessor.class);
	
	public static final String NAVIGATION_OVERVIEW ="navigationOverview";

	/**
	 * Process navigation list.
	 *
	 * @param navigationItems the navigation items
	 * @return the list
	 */
	public List<NavigationItem> processNavigationList(final List<NavigationItem> navigationItems,
			SiteConfigService configService, Page currentPage, SlingHttpServletRequest request, LinkManager linkManager,
			Component component, ResourceResolver resolver, List<NavigationItem> items) {

		String title = null;
		try {
			title = configService.getConfigValues(NAVIGATION_OVERVIEW, currentPage.getPath());

		} catch (RepositoryException | LoginException e) {
			LOGGER.error("Error :: init method of Left Navigation Model :: {}", e);
		}

		Page parentPage;
		final List<NavigationItem> navchild = new ArrayList<>();
		for (final NavigationItem navigationItem : navigationItems) {

			if (!navigationItem.getChildren().isEmpty()) {
				parentPage = currentPage.getPageManager().getPage(navigationItem.getPath());
				final boolean isSelected = currentPage.equals(parentPage)
						|| currentPageIsRedirectTarget(parentPage, currentPage, resolver);
				final LeftNavItemImpl leftItemImpl = new LeftNavItemImpl(parentPage, isSelected, request,
						navigationItem.getLevel() + 1, navchild, title, linkManager, component);
				navigationItem.getChildren().add(0, leftItemImpl);
			}
			processNavigationList(navigationItem.getChildren(), configService, currentPage, request, linkManager,
					component, resolver, items);
		}
		return Collections.unmodifiableList(items);
	}

	/**
	 * Check selected.
	 *
	 * @param page the page
	 * @return true, if successful
	 */
	private boolean checkSelected(final Page page, Page currentPage, ResourceResolver resolver) {
		return currentPage.equals(page) || currentPage.getPath().startsWith(page.getPath() + "/")
				|| currentPageIsRedirectTarget(page, currentPage, resolver);
	}

	private boolean checkCurrent(final Page page, Page currentPage, ResourceResolver resolver) {
		return currentPage.equals(page) || currentPageIsRedirectTarget(page, currentPage, resolver);
	}

	/**
	 * Current page is redirect target.
	 *
	 * @param page the page
	 * @return true, if successful
	 */
	private boolean currentPageIsRedirectTarget(final Page page, Page currentPage, ResourceResolver resourceResolver) {
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
	 * Gets the relative path.
	 *
	 * @param root  the root
	 * @param child the child
	 * @return the relative path
	 */
	public String getRelativePath(final Page root, final Page child) {
		if (child.equals(root)) {
			return ".";
		} else if ((child.getPath() + "/").startsWith(root.getPath())) {
			return child.getPath().substring(root.getPath().length() + 1);
		}
		return null;
	}

	/**
	 * Gets the level.
	 *
	 * @param page the page
	 * @return the level
	 */
	private int getLevel(final Page page) {
		return StringUtils.countMatches(page.getPath(), "/") - 1;
	}

	/**
	 * Gets the root items.
	 *
	 * @param navigationRoot    the navigation root
	 * @param structureStartVar the structure start
	 * @return the root items
	 */
	public List<NavigationRoot> getRootItems(final NavigationRoot navigationRoot, final int structureStartVar,
			int structureDepth) {
		final LinkedList<NavigationRoot> pages = new LinkedList<>();
		pages.addLast(navigationRoot);
		if (structureStartVar != 0) {
			int level = 1;
			while (level != structureStartVar && !pages.isEmpty()) {
				int size = pages.size();
				while (size > 0) {
					final NavigationRoot item = pages.removeFirst();
					final Iterator<Page> it = item.getPage().listChildren(new PageFilter());
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
	 * Gets the navigation tree.
	 *
	 * @param navigationRoot the navigation root
	 * @return the navigation tree
	 */
	public List<NavigationItem> getNavigationTree(NavigationRoot navigationRoot, LinkManager linkManager,
			Component component, String parentId, int structureStart, int structureDepth, Page currentPage,
			ResourceResolver resolver) {
		List<NavigationItem> itemTree = new ArrayList<>();
		final Iterator<NavigationRoot> it = getRootItems(navigationRoot, structureStart, structureDepth).iterator();
		while (it.hasNext()) {
			final NavigationRoot item = it.next();
			itemTree.addAll(getItems(item, item.getPage(), currentPage, resolver, linkManager, component, parentId,
					structureStart));
		}
		if (structureStart == 0) {
			final boolean isSelected = checkSelected(navigationRoot.getPage(), currentPage, resolver);
			final boolean isCurrent = checkCurrent(navigationRoot.getPage(), currentPage, resolver);
			final NavigationItemImpl root = new NavigationItemImpl(navigationRoot.getPage(), isSelected, isCurrent,
					linkManager, 0, itemTree, parentId, component);
			itemTree = new ArrayList<>();
			itemTree.add(root);
		}
		return itemTree;
	}

	/**
	 * Gets the items.
	 *
	 * @param navigationRoot the navigation root
	 * @param subtreeRoot    the subtree root
	 * @return the items
	 */

	private List<NavigationItem> getItems(final NavigationRoot navigationRoot, final Page subtreeRoot, Page currentPage,
			ResourceResolver resourceresolver, LinkManager linkManager, Component component, String parentId,
			int structureStart) {
		final List<NavigationItem> pages = new ArrayList<>();
		if (navigationRoot.getStructureDepth() == -1 || getLevel(subtreeRoot) < navigationRoot.getStructureDepth()) {
			final Iterator<Page> it = subtreeRoot.listChildren(new PageFilter());
			while (it.hasNext()) {
				final Page page = it.next();
				final int pageLevel = getLevel(page);
				int level = pageLevel - navigationRoot.getStartLevel() - 1;
				final List<NavigationItem> children = getItems(navigationRoot, page, currentPage, resourceresolver,
						linkManager, component, parentId, structureStart);
				final boolean isSelected = checkSelected(page, currentPage, resourceresolver);
				final boolean isCurrent = checkCurrent(page, currentPage, resourceresolver);
				if (structureStart == 0) {
					level = level + 1;
				}
				pages.add(new NavigationItemImpl(page, isSelected, isCurrent, linkManager, level, children, parentId,
						component));
			}
		}
		return pages;
	}

}