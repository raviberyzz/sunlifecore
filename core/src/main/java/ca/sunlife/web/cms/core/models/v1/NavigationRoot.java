package ca.sunlife.web.cms.core.models.v1;

import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;

import com.day.cq.wcm.api.Page;

public class NavigationRoot {

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
    public NavigationRoot(final Page navigationRoot, final int configuredStructureDepth) {
      page = navigationRoot;
      startLevel = getLevel(navigationRoot);
      if (configuredStructureDepth > - 1) {
        structureDepth = configuredStructureDepth + startLevel;
      }
    }

    
    
	/**
	 * Retrieves the resource associated with the current page. If the content
	 * resource exists, returns its parent resource. Otherwise, resolves the
	 * resource at the page's path.
	 * 
	 * @param resourceResolver the ResourceResolver used to resolve resources
	 *
	 * @return an Optional containing the resource associated with the current page
	 */

    public final Optional <Resource> getPageResource(ResourceResolver resourceResolver) {
        return Optional.ofNullable(Optional.of(page)
                // get the parent of the content resource
                .map(Page::getContentResource).map(Resource::getParent)
                // if content resource is missing, resolve resource at page path
                .orElseGet(() -> resourceResolver.getResource(page.getPath())));
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
	 * Gets Current Page
	 *
	 * @return the Page
	 */
	public Page getPage() {
		return page;
	}
	
	/**
	 * Gets the StartLevel
	 *
	 * @return the startLevel
	 */
	public int getStartLevel() {
		return startLevel;
	}

	/**
	 * Gets the Structure Depth
	 *
	 * @return the structure Depth
	 */
	public int getStructureDepth() {
		return structureDepth;
	}

	
}
