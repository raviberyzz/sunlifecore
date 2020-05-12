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

@ Model (adaptables = SlingHttpServletRequest.class, adapters = NavigationModel.class, resourceType = "sunlife/core/components/content/navigation")
public class NavigationModel extends NavigationImpl {
	
	
	public NavigationModel() {
		super();
	}
	
	  /** The Constant LOGGER. */
	  private static final Logger log = LoggerFactory.getLogger(NavigationModel.class);
	  
	  /** The current page. */
	  @ ScriptVariable
	  private Page currentPage;
	  
	  /** The config service. */
	  @ Inject
	  private SiteConfigService configService;
	  
	  /** The request. */
	  @ Self
	  private SlingHttpServletRequest request;
	  
	  private Collection<NavigationItem> modifiedItems;
	  
	  
	  /**
	   * Gets the navigation list.
	   *
	   * @return the navigation list
	   */
	  public Collection <NavigationItem> getModifiedItems() {
	    return Collections.unmodifiableCollection(modifiedItems);
	  }

	  /**
	   * Sets the navigation list.
	   *
	   * @param updatedList
	   *          the new updated list
	   */
	  public void setUpdatedList(final Collection <NavigationItem> modifiedItems) {
	    this.modifiedItems = Collections.unmodifiableCollection(modifiedItems);
	  }
	  
	  @PostConstruct
		private void init() {
		 
		  modifiedItems = processNavigationList(super.getItems());
		  
	  }
	  
	  
	  public List<NavigationItem> processNavigationList(List<NavigationItem> navigationItems) {
		  
		  String title = null;
		    try {
		      title = configService.getConfigValues("navigationOverview", currentPage.getPath());
		    } catch (RepositoryException | LoginException e) {
		      log.error("Error :: init method of Left Navigation Model :: {}", e);
		    }
		    
		  Page parentPage;
		  final List <NavigationItem> children1 = new ArrayList <>();
		  for (final NavigationItem navigationItem : navigationItems) {
			  
			  if (! navigationItem.getChildren().isEmpty()) {
				  parentPage = currentPage.getPageManager().getPage(navigationItem.getPath());
				  final LeftNavItemImpl leftItemImpl = new LeftNavItemImpl(parentPage,false, request,
				            navigationItem.getLevel() + 1, children1, title);
				  navigationItem.getChildren().add(0, leftItemImpl);
				  
			  }
			  processNavigationList(navigationItem.getChildren());
		  }
		  
		return Collections.unmodifiableList(navigationItems);
		  
		  
	  }
	
	
}