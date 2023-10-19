/*
 *
 */

package ca.sunlife.web.cms.core.models;

import java.util.Collections;
import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import com.day.cq.wcm.api.components.Component;
import com.adobe.cq.wcm.core.components.commons.link.LinkManager;
import com.adobe.cq.wcm.core.components.internal.models.v1.PageListItemImpl;
import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.day.cq.wcm.api.Page;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * The Class LeftNavItemImpl.
 *
 * @author TCS
 * @version 1.0
 */
public class LeftNavItemImpl extends PageListItemImpl implements NavigationItem {

    /** The children. */
    /* List for getting the childs of the page */
    private List <NavigationItem> children = Collections.emptyList();

    /** The level. */
    private int level; // Level of the page

    /** The active. */
    private boolean active; // checks whether page is active

    /** The nav title. */
    private final String navTitle; // field to capture the Navigation title from config


    /**
     * @return the navTitle
     */
    public String getNavTitle() {
        return navTitle;
    }

    /**
     * @param children the children to set
     */
    public void setChildren(List<NavigationItem> children) {
        this.children = Collections.unmodifiableList(children);
    }

    /**
     * @param level the level to set
     */
    public void setLevel(int level) {
        this.level = level;
    }

    /**
     * @param active the active to set
     */
    public void setActive(boolean active) {
        this.active = active;
    }

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
                           final String navTitle, LinkManager linkManager, Component component) {
        super(linkManager, page, navTitle, component);
        this.active = active;
        this.level = level;
        this.children = Collections.unmodifiableList(children);
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
        return Collections.unmodifiableList(children);
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