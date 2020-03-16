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
 * @author mo93 The class LeftNavItemImpl
 *
 */
public class LeftNavItemImpl extends PageListItemImpl implements NavigationItem  {
	
	/** The Constant LOGGER. */
	private static final Logger log = LoggerFactory.getLogger(LeftNavigationModal.class);
	
	
	/*  List for getting the childs of the page	 */
	 protected List<NavigationItem> children = Collections.emptyList();
	 
	 
	    protected int level;  // Level of the page
	    protected boolean active; //checks whether page is active
		private String navTitle; // field to capture the Navigation title from config

	    public LeftNavItemImpl(Page page, boolean active, SlingHttpServletRequest request, int level, List<NavigationItem> children, String navTitle) {
	        super(request, page);
	        this.active = active;
	        this.level = level;
	        this.children = children;
	        this.navTitle = navTitle;
	    }
	    
	    @Override
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
	        
	        if(null != this.navTitle && this.navTitle.contains("${title}")) {
	             title = this.navTitle.replace("${title}", title);
	        }
	        
	        return title;
	    }
        
	    @Override
	    @JsonIgnore
	    public Page getPage() {
	        return page;
	    }
	    @Override
	    public boolean isActive() {
	        return active;
	    }
	    @Override
	    public List<NavigationItem> getChildren() {
	        return children;
	    }
	    @Override
	    public int getLevel() {
	        return level;
	    }

}